"""Run a film's shot list against fal's queue API and download what comes back.

Usage:
  python tools/fal_shots.py examples/human-layer-ots/shots.json --dry-run
  FAL_KEY=... python tools/fal_shots.py examples/human-layer-ots/shots.json [--only cast,s01] [--force]

shots.json holds an "out_dir" (relative to the file) and a list of "steps". Each step has an "id", a fal
"endpoint" (e.g. bytedance/seedance-2.0/image-to-video), an "input" object sent as the request body, and
an "out" file name. Inside "input", a string "@<step-id>" becomes the URL of that earlier step's output,
and "file:<path>" becomes a data URI of a local file. Finished steps are cached in
<out_dir>/fal-results.json, so a rerun only does what is missing (use --force to redo).
Needs FAL_KEY in the environment and network access to queue.fal.run and the fal media CDN.
Standard library only.
"""
import argparse, base64, json, mimetypes, os, sys, time, urllib.error, urllib.request

QUEUE = "https://queue.fal.run/"


def http(url, data=None, key=None, timeout=60):
    headers = {"Accept": "application/json"}
    if key:
        headers["Authorization"] = "Key " + key
    body = None
    if data is not None:
        body = json.dumps(data).encode()
        headers["Content-Type"] = "application/json"
    req = urllib.request.Request(url, data=body, headers=headers, method="POST" if body is not None else "GET")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return json.loads(r.read().decode() or "{}")
    except urllib.error.HTTPError as e:
        sys.exit(f"fal answered {e.code} for {url}: {e.read().decode()[:600]}")


def resolve(value, done, base):
    """Replace @step references and file: paths inside a request body."""
    if isinstance(value, dict):
        return {k: resolve(v, done, base) for k, v in value.items()}
    if isinstance(value, list):
        return [resolve(v, done, base) for v in value]
    if isinstance(value, str) and value.startswith("@"):
        ref = value[1:]
        if ref not in done:
            sys.exit(f"step needs '{ref}', which has not run yet (order the steps, or run it first)")
        return done[ref]["url"]
    if isinstance(value, str) and value.startswith("file:"):
        path = os.path.join(base, value[5:])
        mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
        return f"data:{mime};base64," + base64.b64encode(open(path, "rb").read()).decode()
    return value


def first_media_url(result):
    """fal results put media under video/image/images/audio; take the first URL found."""
    for key in ("video", "image", "images", "audio", "file"):
        v = result.get(key)
        if isinstance(v, list) and v:
            v = v[0]
        if isinstance(v, dict) and v.get("url"):
            return v["url"]
    for v in result.values():
        if isinstance(v, dict) and isinstance(v.get("url"), str):
            return v["url"]
    sys.exit("no media URL in the result: " + json.dumps(result)[:400])


def run(step, body, key, poll=4, limit=1800):
    sub = http(QUEUE + step["endpoint"], body, key)
    status_url, response_url = sub["status_url"], sub["response_url"]
    t0 = time.time()
    while True:
        st = http(status_url, key=key)
        if st.get("status") == "COMPLETED":
            break
        if time.time() - t0 > limit:
            sys.exit(f"{step['id']}: still {st.get('status')} after {limit} s; request {sub['request_id']}")
        time.sleep(poll)
    return http(response_url, key=key)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("shots")
    ap.add_argument("--only", help="comma-separated step ids")
    ap.add_argument("--force", action="store_true", help="redo steps that already have results")
    ap.add_argument("--dry-run", action="store_true", help="print the requests without calling fal")
    a = ap.parse_args()

    spec = json.load(open(a.shots, encoding="utf-8"))
    base = os.path.dirname(os.path.abspath(a.shots))
    out_dir = os.path.join(base, spec.get("out_dir", "assets/footage"))
    cache_path = os.path.join(out_dir, "fal-results.json")
    done = json.load(open(cache_path, encoding="utf-8")) if os.path.exists(cache_path) else {}
    only = set(a.only.split(",")) if a.only else None
    key = os.environ.get("FAL_KEY")
    if not a.dry_run and not key:
        sys.exit("FAL_KEY is not set. Add it as an environment variable (never paste it into a file in the repo).")

    os.makedirs(out_dir, exist_ok=True)
    for step in spec["steps"]:
        sid = step["id"]
        if only and sid not in only:
            continue
        if sid in done and not a.force:
            print(f"  {sid}: cached -> {done[sid]['file']}")
            continue
        if a.dry_run:
            body = json.dumps(step["input"], ensure_ascii=False)
            print(f"  {sid}: POST {QUEUE}{step['endpoint']}\n      {body[:300]}{'…' if len(body) > 300 else ''}\n      -> {step['out']}")
            done.setdefault(sid, {"url": f"<url of {sid}>", "file": step["out"]})
            continue
        body = resolve(step["input"], done, base)
        print(f"  {sid}: {step['endpoint']} …", flush=True)
        result = run(step, body, key)
        url = first_media_url(result)
        path = os.path.join(out_dir, step["out"])
        urllib.request.urlretrieve(url, path)
        done[sid] = {"url": url, "file": step["out"], "endpoint": step["endpoint"]}
        json.dump(done, open(cache_path, "w", encoding="utf-8"), indent=2)
        print(f"      wrote {os.path.relpath(path)}")


if __name__ == "__main__":
    main()
