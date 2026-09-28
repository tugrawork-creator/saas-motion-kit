"""Bundle the storyboard sheet into one self-contained HTML file (fonts, frames and theme thumbs inlined).

Usage (from this folder, after `node render.cjs frames all`):
  python build_single.py [out.html]
"""
import base64, os, re, sys

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.abspath(os.path.join(here, "..", "..", "..", ".."))
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, "agentic-payroll-storyboards.html")


def data_uri(path, mime):
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode("ascii")


html = open(os.path.join(here, "index.html"), encoding="utf-8").read()
html = re.sub(r'url\("assets/fonts/([^"]+)"\)', lambda m: f'url("{data_uri(os.path.join(here, "assets", "fonts", m.group(1)), "font/woff2")}")', html)

frames = {f[:-4]: data_uri(os.path.join(here, "frames", f), "image/jpeg") for f in sorted(os.listdir(os.path.join(here, "frames"))) if f.endswith(".jpg")}
thumbs = sorted(set(re.findall(r'"(\d{3})"', html.split("const THEMES")[1].split("};")[0])))
thumb_uris = {n: data_uri(os.path.join(root, "docs", "themes", "thumbs", n + ".jpg"), "image/jpeg") for n in thumbs}

inline = "const IMG = " + repr(frames).replace("'", '"') + ";\nconst THUMB = " + repr(thumb_uris).replace("'", '"') + ";\n"
html = html.replace("const img = (id) => `frames/${id}.jpg`;", inline + "const img = (id) => IMG[id];")
html = html.replace("const thumb = (n) => `../../../../docs/themes/thumbs/${n}.jpg`;", "const thumb = (n) => THUMB[n];")
if "IMG[id]" not in html or "THUMB[n]" not in html:
    sys.exit("index.html changed: update the img()/thumb() replacements in build_single.py")

open(out, "w", encoding="utf-8").write(html)
print(f"wrote {out} ({os.path.getsize(out) / 1e6:.1f} MB, {len(frames)} frames, {len(thumb_uris)} theme thumbs)")
