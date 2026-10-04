"""Break a reference video down into shots, rhythm and a draft ledger, with the creator credited.

Usage:
  python tools/breakdown.py ref.mp4 --id 01 --creator "@handle" --title "Launch film" --url https://…
  python tools/breakdown.py ref.mp4 --id 01 --threshold 0.25 --out .references/01-launch

Finds the cuts (ffmpeg scene detection), then writes into the output folder (default .references/<id>/,
which is git-ignored):
  breakdown.md  the credit, rhythm numbers (cuts per 10 s, shot lengths, the first three seconds),
                a shot list and a draft ledger in the templates/STORYBOARD.md format, to study and annotate
  sheet.jpg     one frame from the middle of every shot, with timestamps

Use it on videos you can watch legally, keep the video and its frames on your machine, and credit the
creator wherever you use what you learned (see creative/references.md). Needs ffmpeg, ffprobe and pillow.
"""
import argparse, json, os, re, statistics, subprocess, sys
from PIL import Image, ImageDraw


def duration(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", path])
    return float(json.loads(out)["format"]["duration"])


def cuts(path, threshold):
    """Scene-change times in seconds, from ffmpeg's select filter."""
    p = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", path, "-an", "-vf",
                        f"select='gt(scene,{threshold})',showinfo", "-f", "null", "-"],
                       capture_output=True, text=True)
    times = [float(m.group(1)) for m in re.finditer(r"pts_time:([0-9.]+)", p.stderr)]
    out = []
    for t in times:  # drop flashes: two "cuts" closer than 4 frames are one
        if not out or t - out[-1] > 0.13:
            out.append(t)
    return out


def frame(path, t, w=320):
    p = subprocess.run(["ffmpeg", "-v", "error", "-ss", f"{t:.3f}", "-i", path, "-frames:v", "1", "-vf",
                        f"scale={w}:-2", "-f", "image2pipe", "-vcodec", "png", "-"], capture_output=True)
    from io import BytesIO
    return Image.open(BytesIO(p.stdout)).convert("RGB") if p.stdout else None


def sheet(path, shots, out, cols=6):
    tiles = [(s, frame(path, s + d / 2)) for s, d in shots[:48]]
    tiles = [(s, im) for s, im in tiles if im]
    if not tiles:
        return
    w, h = tiles[0][1].size
    rows = (len(tiles) + cols - 1) // cols
    img = Image.new("RGB", (cols * (w + 6) + 6, rows * (h + 6) + 6), (24, 24, 28))
    d = ImageDraw.Draw(img)
    for i, (s, im) in enumerate(tiles):
        x, y = 6 + (i % cols) * (w + 6), 6 + (i // cols) * (h + 6)
        img.paste(im, (x, y))
        d.rectangle([x, y, x + 64, y + 16], fill=(0, 0, 0))
        d.text((x + 4, y + 3), f"{i + 1:02d} {s:5.2f}s", fill=(255, 220, 120))
    img.save(out, quality=85)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("video")
    ap.add_argument("--id", required=True, help="reference id, the one you write as ref:<id> in the ledger")
    ap.add_argument("--creator", default="", help="who made it, e.g. '@handle' or 'Studio Name'")
    ap.add_argument("--title", default="")
    ap.add_argument("--url", default="", help="where people can watch the original")
    ap.add_argument("--threshold", type=float, default=0.1, help="scene-change sensitivity, 0–1 (lower finds more cuts; 0.1 found every hard cut in the kit's own films)")
    ap.add_argument("--out", help="output folder (default .references/<id>/)")
    a = ap.parse_args()
    if not os.path.exists(a.video):
        sys.exit(f"no such file: {a.video}")

    total = duration(a.video)
    cs = [t for t in cuts(a.video, a.threshold) if 0.05 < t < total - 0.05]
    starts = [0.0] + cs
    shots = [(s, (starts[i + 1] if i + 1 < len(starts) else total) - s) for i, s in enumerate(starts)]
    lens = [d for _, d in shots]
    out = a.out or os.path.join(".references", a.id)
    os.makedirs(out, exist_ok=True)
    sheet(a.video, shots, os.path.join(out, "sheet.jpg"))

    first3 = sum(1 for t in cs if t < 3)
    lines = [
        f"# Reference {a.id}: {a.title or os.path.basename(a.video)}",
        "",
        f"- **Creator:** {a.creator or 'TODO: who made it'}",
        f"- **Original:** {a.url or 'TODO: link to where people can watch it'}",
        "- **Credit line:** " + (f"Inspired by {a.creator}" if a.creator else "Inspired by TODO") + (f" ({a.url})" if a.url else ""),
        "",
        "Keep this file, the video and `sheet.jpg` on your machine. Copy what you learned into `REFERENCES.md`.",
        "",
        "## Rhythm",
        "",
        f"| length | shots | cuts per 10 s | median shot | shortest | longest | cuts in the first 3 s | first cut |",
        "|---|---|---|---|---|---|---|---|",
        f"| {total:.1f} s | {len(shots)} | {10 * len(cs) / total:.1f} | {statistics.median(lens):.2f} s | {min(lens):.2f} s | {max(lens):.2f} s | {first3} | "
        + (f"{cs[0]:.2f} s" if cs else "none") + " |",
        "",
        "![contact sheet](sheet.jpg)",
        "",
        "## Draft ledger",
        "",
        "Start and length are measured from hard cuts. Dissolves, whips and fades through black are not cuts: split those shots by hand. "
        "Fill the rest while you watch, then mark the shots you borrow from as `ref:" + a.id + "` in your own ledger's notes.",
        "",
        "| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |",
        "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|",
    ]
    for i, (s, d) in enumerate(shots):
        lines.append(f"| {i + 1} | {int(s // 60)}:{s % 60:04.1f} | {d:.2f} | | | | {'end' if i == len(shots) - 1 else '?'} | | | | | | | | |")
    open(os.path.join(out, "breakdown.md"), "w", encoding="utf-8").write("\n".join(lines) + "\n")
    print(f"{len(shots)} shots in {total:.1f} s ({10 * len(cs) / total:.1f} cuts per 10 s, {first3} in the first 3 s)")
    print(f"wrote {out}/breakdown.md and {out}/sheet.jpg")


if __name__ == "__main__":
    main()
