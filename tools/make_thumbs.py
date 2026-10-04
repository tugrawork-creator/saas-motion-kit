"""Render a 4-cell thumbnail strip for every theme sheet (docs/themes/thumbs/NNN.jpg).

Usage:  python -m http.server 8766 --directory docs   (in another shell)
        python tools/make_thumbs.py --chrome "<path to chrome>" [--only 101 102]
"""
import argparse, glob, json, os, subprocess, tempfile
from PIL import Image, ImageChops

ap = argparse.ArgumentParser()
ap.add_argument("--chrome", required=True)
ap.add_argument("--base", default="http://127.0.0.1:8766")
ap.add_argument("--only", nargs="+", default=[], metavar="NNN", help="render just these theme ids")
a = ap.parse_args()
root = os.path.join(os.path.dirname(__file__), "..", "docs")
out = os.path.join(root, "themes", "thumbs"); os.makedirs(out, exist_ok=True)
tmp = tempfile.mkdtemp()
for f in sorted(glob.glob(os.path.join(root, "themes", "data", "*.json"))):
    d = json.load(open(f, encoding="utf-8"))
    if a.only and d["id"] not in [x.zfill(3) for x in a.only]:
        continue
    png = os.path.join(tmp, d["id"] + ".png")
    url = f'{a.base}/_thumb.html?f={os.path.basename(d["file"])}'
    subprocess.run([a.chrome, "--headless=new", "--hide-scrollbars", "--window-size=1400,340",
                    "--virtual-time-budget=4000", f"--screenshot={png}", url], check=True,
                   stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    im = Image.open(png).convert("RGB").resize((840, 204), Image.LANCZOS)
    mask = ImageChops.difference(im, Image.new("RGB", im.size, (236, 235, 230))).convert("L").point(lambda p: 255 if p > 18 else 0)
    bb = mask.getbbox()  # trim the empty sheet background under the cells
    if bb: im = im.crop((0, bb[1], im.width, min(im.height, bb[3] + 2)))
    im.save(os.path.join(out, d["id"] + ".jpg"), quality=84)
    print(d["id"], d["name"])
