"""Tile dev frames into one labelled contact sheet: python tools/sheet.py snapshots/dev out.jpg [cols] [width]"""
import sys, os, glob
from PIL import Image, ImageDraw, ImageFont
src, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 3
tw = int(sys.argv[4]) if len(sys.argv) > 4 else 640
files = sorted(glob.glob(os.path.join(src, "t*.jpg")))
th = tw * 9 // 16
rows = (len(files) + cols - 1) // cols
sheet = Image.new("RGB", (cols * tw + (cols + 1) * 6, rows * (th + 26) + 6), (24, 24, 28))
d = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 16)
except OSError:
    font = ImageFont.load_default()
for i, f in enumerate(files):
    r, c = divmod(i, cols)
    x, y = 6 + c * (tw + 6), 6 + r * (th + 26)
    im = Image.open(f).convert("RGB").resize((tw, th), Image.LANCZOS)
    sheet.paste(im, (x, y + 20))
    d.text((x + 2, y + 1), os.path.basename(f)[1:-4] + " s", fill=(230, 230, 230), font=font)
sheet.save(out, quality=86)
print(out, sheet.size)
