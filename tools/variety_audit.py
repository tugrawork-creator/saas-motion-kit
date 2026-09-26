"""Variety audit: catch repetition in a storyboard ledger before you build it.

Usage:
  python tools/variety_audit.py STORYBOARD.md
  python tools/variety_audit.py STORYBOARD.md --history ~/.motion-ledger.json
  python tools/variety_audit.py STORYBOARD.md --history ~/.motion-ledger.json --append "film-name"

Reads the first markdown table in the file that has a `transition_out` column (see templates/STORYBOARD.md)
and checks the rules in creative/variety-rules.md and creative/tone-matrix.md. Values prefixed with
`motif:` are deliberate repeats and are not flagged. Exit code 1 when there are warnings, so it can gate CI.
"""
import argparse, datetime, json, os, re, sys
from collections import Counter

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

FAMILY_KEYWORDS = [
    ("time", ["freeze", "rewind", "ramp", "time-lapse", "timelapse", "tick", "loop-seam", "loop"]),
    ("carry", ["carry", "horizon", "handoff", "hand-off"]),
    ("cut", ["match", "beat-cut", "hard-cut", "cut", "hold-frame"]),
    ("camera", ["push-through", "whip", "dolly", "parallax", "zoom", "orbit", "rack", "fly", "turntable", "turn"]),
    ("mask", ["mask", "iris", "split", "wipe", "blinds", "shutter", "clock"]),
    ("material", ["fold", "ink", "dither", "pixel", "glass", "burn", "glitch", "vhs", "ripple", "leak", "chromatic", "grid-dissolve"]),
    ("stock", ["crossfade", "dissolve", "fade", "push", "slide", "squeeze", "dip", "blur"]),
]
NARRATIVE = {"cut", "carry", "camera", "mask"}
HARSH = ["glitch", "vhs", "chromatic", "distort"]


def family(name, atlas):
    n = name.lower().replace("motif:", "").strip()
    if n in atlas:
        return atlas[n]
    for fam, keys in FAMILY_KEYWORDS:
        if any(k in n for k in keys):
            return fam
    return "other"


def load_atlas():
    """Exact name → family from docs/transitions/data.json when it exists."""
    p = os.path.join(os.path.dirname(__file__), "..", "docs", "transitions", "data.json")
    out = {}
    try:
        for t in json.load(open(p, encoding="utf-8")):
            slug = re.sub(r"[^a-z0-9]+", "-", t["name"].lower()).strip("-")
            out[slug] = t["family"]; out[t["name"].lower()] = t["family"]
    except Exception:
        pass
    return out


def secs(s):
    s = s.strip()
    if not s:
        return None
    if ":" in s:
        m, x = s.split(":", 1)
        return int(m) * 60 + float(x)
    try:
        return float(s)
    except ValueError:
        return None


def parse(path):
    text = open(path, encoding="utf-8").read()
    lines = text.splitlines()
    accent = None
    m = re.search(r"^\s*-?\s*accent:\s*([A-Za-z#0-9-]+)", text, re.M | re.I)
    if m and not m.group(1).startswith("<"):
        accent = m.group(1).lower()
    rows, header = [], None
    for i, ln in enumerate(lines):
        if ln.strip().startswith("|") and "transition_out" in ln.lower():
            header = [c.strip().lower() for c in ln.strip().strip("|").split("|")]
            for ln2 in lines[i + 2:]:
                if not ln2.strip().startswith("|"):
                    break
                cells = [c.strip() for c in ln2.strip().strip("|").split("|")]
                row = dict(zip(header, cells + [""] * (len(header) - len(cells))))
                if all(v in ("", "…", "...") for k, v in row.items() if k not in ("#",)):
                    continue
                if any(v in ("…", "...") for v in row.values()):
                    continue
                rows.append(row)
            break
    if header is None:
        sys.exit("No ledger table with a `transition_out` column found. See templates/STORYBOARD.md.")
    return rows, accent


def audit(rows, accent, history, atlas):
    warn, info = [], []
    W = lambda msg: warn.append(msg)
    I = lambda msg: info.append(msg)
    n = len(rows)
    col = lambda k: [r.get(k, "").strip() for r in rows]
    is_motif = lambda v: v.lower().startswith("motif:")
    durs = [secs(r.get("dur", "")) or 0 for r in rows]
    starts, t = [], 0.0
    for r, d in zip(rows, durs):
        s = secs(r.get("start", ""))
        starts.append(s if s is not None else t)
        t = starts[-1] + d
    total = max((s + d for s, d in zip(starts, durs)), default=0)

    # transitions
    tr = col("transition_out")
    cuts = [(i, v) for i, v in enumerate(tr) if v and v.lower() not in ("-", "none", "end", "loop")]
    for (i, a), (j, b) in zip(cuts, cuts[1:]):
        if a.lower() == b.lower() and not is_motif(a):
            W(f"transition '{a}' used on two consecutive cuts (rows {i+1} and {j+1})")
    limit = 2 if total < 60 else 3
    for v, c in Counter(v.lower() for _, v in cuts if not is_motif(v)).items():
        if c > limit:
            W(f"transition '{v}' used {c}× (limit {limit} for a {total:.0f} s film); swap some or mark it motif:")
    fams = Counter(family(v, atlas) for _, v in cuts)
    real = [f for f in fams if f not in ("stock", "other")]
    if len(cuts) >= 5 and len(real) < 3:
        W(f"only {len(real)} transition famil{'y' if len(real) == 1 else 'ies'} ({', '.join(real) or 'none'}); aim for 3+ of cut/carry/camera/mask/material/time")
    if cuts and not any(f in NARRATIVE for f in fams):
        W("no narrative transition (match cut, carry, camera move or mask); the cuts only move between slides")
    I(f"transitions: {len(cuts)} cuts · families {dict(fams)}")

    # entrances, eases, directions
    ent = col("entrance")
    run = 1
    for i in range(1, n):
        run = run + 1 if ent[i] and ent[i].lower() == ent[i - 1].lower() and not is_motif(ent[i]) else 1
        if run == 3:
            W(f"entrance '{ent[i]}' three times in a row (rows {i-1}–{i+1})")
    eases = [e for e in col("ease") if e]
    ec = Counter(e.lower() for e in eases)
    if eases and len(ec) < 3:
        W(f"only {len(ec)} distinct eases ({', '.join(ec)}); use at least 3")
    if eases and ec.most_common(1)[0][1] > len(eases) / 2 and len(eases) >= 4:
        W(f"ease '{ec.most_common(1)[0][0]}' on {ec.most_common(1)[0][1]}/{len(eases)} rows (> half)")
    dirs = col("direction"); run = 1
    for i in range(1, n):
        run = run + 1 if dirs[i] and dirs[i].lower() == dirs[i - 1].lower() else 1
        if run == 3:
            W(f"direction '{dirs[i]}' three times in a row (rows {i-1}–{i+1}); alternate")

    # rhythm
    ds = [d for d in durs if d]
    if len(ds) >= 4:
        mode = Counter(round(d * 4) / 4 for d in ds).most_common(1)[0][0]
        same = sum(1 for d in ds if abs(d - mode) <= 0.25)
        if same / len(ds) > 0.6:
            W(f"{same}/{len(ds)} shots last ~{mode:g} s; vary shot lengths")
    notes = [r.get("notes", "") + " " + r.get("entrance", "") for r in rows]
    sp = [s for s, nt in zip(starts, notes) if "surprise:" in nt.lower()]
    if total > 15 and not sp:
        W("no row marked 'surprise:'; plan a pattern-breaking moment every ~15 s")
    else:
        marks = [0.0] + sp + [total]
        for a, b in zip(marks, marks[1:]):
            if b - a > 18:
                W(f"no surprise between {a:.0f} s and {b:.0f} s ({b-a:.0f} s)")

    # colour
    pal = col("palette")
    if accent:
        lead = sum(1 for p in pal if p and p.split("+")[0].strip().lower() == accent)
        if pal and lead > max(1, len([p for p in pal if p]) / 3):
            W(f"accent '{accent}' leads {lead}/{len(pal)} shots; keep it for the colour events (≤ 1/3)")
    else:
        I("no 'accent:' line in the Message & tone block; colour rhythm not checked")
    for i, p in enumerate(pal):
        if p and len([c for c in p.split("+") if c.strip()]) > 3:
            W(f"row {i+1}: {len(p.split('+'))} colours in one shot ({p}); background + at most 2 accents")

    # components
    newc = [c for c in col("new_component") if c]
    if not newc:
        W("no new component in this film; forge one (creative/component-forge.md)")

    # tone vs craft
    for i, r in enumerate(rows):
        tone, e, trn, d = r.get("tone", "").lower(), r.get("ease", "").lower(), r.get("transition_out", "").lower(), durs[i]
        if tone in ("calm", "premium") and ("back" in e or "elastic" in e or "bounce" in e):
            W(f"row {i+1}: '{e}' ease fights a {tone} tone")
        if tone in ("calm", "premium") and d and d < 0.7:
            W(f"row {i+1}: {d:g} s shot is too quick for a {tone} tone")
        if tone == "urgent" and d > 2.0 and "surprise:" not in notes[i].lower():
            W(f"row {i+1}: {d:g} s hold slows an urgent beat (mark surprise: if it's the deliberate pause)")
        if tone == "trustworthy" and any(h in trn for h in HARSH):
            W(f"row {i+1}: '{trn}' undermines a trustworthy tone")
    tones = [r.get("tone", "").lower() for r in rows if r.get("tone")]
    if total > 45 and len(set(tones)) == 1:
        I(f"single tone '{tones[0]}' for {total:.0f} s; intended?")

    # cross-film history
    if history is not None:
        recent = history.get("films", [])[-3:]
        used = {"transition": set(), "new_component": set(), "entrance": set()}
        for f in recent:
            for k in used:
                used[k].update(x.lower() for x in f.get(k + "s", []))
        for k, vals in (("transition", [v for _, v in cuts]), ("new_component", newc), ("entrance", [e for e in ent if e])):
            for v in sorted(set(x.lower() for x in vals if not is_motif(x))):
                if v in used[k]:
                    W(f"{k.replace('_', ' ')} '{v}' was already used in your last {len(recent)} films")
        I(f"history: compared with {len(recent)} recent film(s)")
    return warn, info, {"transitions": [v for _, v in cuts], "new_components": newc, "entrances": [e for e in ent if e], "eases": eases}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("storyboard")
    ap.add_argument("--history", help="JSON file that remembers your previous films")
    ap.add_argument("--append", metavar="FILM", help="after delivery: record this film in --history")
    a = ap.parse_args()
    rows, accent = parse(a.storyboard)
    hist_path = os.path.expanduser(a.history) if a.history else None
    history = None
    if hist_path:
        history = json.load(open(hist_path, encoding="utf-8")) if os.path.exists(hist_path) else {"films": []}
    warn, info, summary = audit(rows, accent, history, load_atlas())
    print(f"variety audit · {a.storyboard} · {len(rows)} shots")
    for m in info:
        print("  [info]", m)
    for m in warn:
        print("  [warn]", m)
    print(f"  => {len(warn)} warning(s)" if warn else "  => no repetition found. Now go check it with your eyes.")
    if a.append:
        if not hist_path:
            sys.exit("--append needs --history")
        history["films"].append({"name": a.append, "date": datetime.date.today().isoformat(), **summary})
        json.dump(history, open(hist_path, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        print(f"  recorded '{a.append}' in {hist_path}")
    sys.exit(1 if warn else 0)


if __name__ == "__main__":
    main()
