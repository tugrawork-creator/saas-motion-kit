"""Suggest themes from the 100-theme gallery for a tone and an audience, skipping what you used recently.

Usage:
  python tools/pick_themes.py --tone playful --audience "developers b2b"
  python tools/pick_themes.py --tone premium --effort med --history ~/.motion-ledger.json -n 5

Scoring is transparent on purpose: each theme gets points for tone words and audience words found in its
name, summary, look and best_for, plus its trust/readability fit. Themes recorded in your --history
(via `variety_audit.py --append ... --theme NNN`) within the last 5 films are skipped.
"""
import argparse, glob, json, os, re, sys

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

TONE_WORDS = {
    "calm": ["calm", "quiet", "soft", "minimal", "restrained", "gentle", "slow", "museum", "specimen", "paper"],
    "trustworthy": ["trust", "clear", "precise", "editorial", "data", "hud", "review", "audit", "grid", "clean"],
    "urgent": ["alert", "ticker", "split-flap", "radar", "sonar", "air-traffic", "scan", "countdown", "siren", "fast"],
    "playful": ["playful", "clay", "sticker", "character", "mascot", "pop", "pixel", "game", "puppet", "toy", "blob"],
    "premium": ["premium", "dark", "cinematic", "glass", "keynote", "light", "noir", "chrome", "deco", "engraving"],
    "technical": ["terminal", "code", "diff", "command", "ascii", "blueprint", "oscilloscope", "grid", "cursor", "spreadsheet"],
    "warm": ["warm", "hand", "paper", "felt", "stitch", "clay", "marker", "collage", "human", "craft"],
    "bold": ["bold", "poster", "brutalist", "pop-art", "constructivist", "type", "big", "loud", "memphis", "graphic"],
    "mysterious": ["noir", "darkroom", "x-ray", "sonar", "shadow", "night", "microscope", "uv", "reveal", "long-exposure"],
    "celebratory": ["confetti", "party", "firework", "memphis", "pop", "celebrat", "bright", "rainbow", "deco", "marquee"],
    "nostalgic": ["retro", "8-bit", "y2k", "riso", "vhs", "95", "deco", "vintage", "receipt", "dot-matrix", "split-flap"],
}
PAGES = "https://tugrawork-creator.github.io/saas-motion-kit/"


def load_themes():
    root = os.path.join(os.path.dirname(__file__), "..", "docs", "themes", "data")
    return [json.load(open(f, encoding="utf-8")) for f in sorted(glob.glob(os.path.join(root, "*.json")))]


def text_of(t):
    parts = [t.get("name", ""), t.get("slug", ""), t.get("summary", ""), t.get("look", ""), " ".join(t.get("best_for", []))]
    parts += [c.get("name", "") for c in t.get("components", [])]
    return " ".join(parts).lower()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--tone", required=True, choices=sorted(TONE_WORDS))
    ap.add_argument("--audience", default="", help="free words, e.g. 'developers fintech booth'")
    ap.add_argument("--effort", choices=["low", "med", "high"], help="maximum build effort")
    ap.add_argument("--history", help="the JSON file variety_audit.py --append writes")
    ap.add_argument("-n", type=int, default=5)
    a = ap.parse_args()

    recent = set()
    if a.history and os.path.exists(os.path.expanduser(a.history)):
        films = json.load(open(os.path.expanduser(a.history), encoding="utf-8")).get("films", [])
        for f in films[-5:]:
            recent.update(str(x).zfill(3) for x in f.get("themes", []))

    effort_rank = {"low": 0, "med": 1, "high": 2}
    words = TONE_WORDS[a.tone]
    aud = [w for w in re.split(r"[\s,]+", a.audience.lower()) if len(w) > 2]
    scored = []
    for t in load_themes():
        if t["id"] in recent:
            continue
        fit = t.get("fit", {})
        if a.effort and effort_rank.get(fit.get("effort", "med"), 1) > effort_rank[a.effort]:
            continue
        body = text_of(t)
        tone_hits = [w for w in words if w in body]
        aud_hits = [w for w in aud if w in body]
        score = 3 * len(tone_hits) + 2 * len(aud_hits) + fit.get("readability", 2) * 0.6
        if a.tone == "trustworthy":
            score += fit.get("trust", 2) * 1.5
        if score > 0:
            scored.append((score, t, tone_hits, aud_hits))
    scored.sort(key=lambda s: -s[0])
    if not scored:
        sys.exit("No theme matched. Try fewer constraints.")
    print(f"themes for a {a.tone} film" + (f" · audience: {a.audience}" if a.audience else "") + (f" · skipped {len(recent)} recent" if recent else ""))
    for score, t, th, ah in scored[: a.n]:
        why = ", ".join(th + ah) or "fit scores"
        fit = t.get("fit", {})
        print(f"\n  {t['id']} · {t['name']}  (score {score:.1f})")
        print(f"      {t.get('summary', '')}")
        print(f"      why: {why} · readability {fit.get('readability', '?')}/3 · effort {fit.get('effort', '?')}")
        print(f"      {PAGES}{t.get('file', '')}")


if __name__ == "__main__":
    main()
