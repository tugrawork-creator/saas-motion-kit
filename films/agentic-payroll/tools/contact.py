"""Contact sheet of a rendered film at scene midpoints.
   python tools/contact.py renders/film.mp4 preview/keyframes.jpg [t1,t2,...]"""
import os, subprocess, sys, tempfile
from PIL import Image, ImageDraw, ImageFont

src, out = sys.argv[1], sys.argv[2]
# scene midpoints from STORYBOARD.md (frames 1–7, with 5 and 6 split at their beats)
times = [float(x) for x in sys.argv[3].split(",")] if len(sys.argv) > 3 else [2.6, 4.6, 10.0, 12.6, 17.0, 23.5, 30.3, 35.5, 41.8, 45.2, 49.0, 57.0]
cols, tw, pad = 4, 470, 8
th = tw * 9 // 16
rows = (len(times) + cols - 1) // cols
sheet = Image.new("RGB", (cols * tw + (cols + 1) * pad, rows * (th + 30) + pad), (10, 14, 26))
d = ImageDraw.Draw(sheet)
font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 17)
with tempfile.TemporaryDirectory() as tmp:
    for i, t in enumerate(times):
        f = os.path.join(tmp, f"{i}.png")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", src, "-frames:v", "1", f], check=True)
        r, c = divmod(i, cols)
        x, y = pad + c * (tw + pad), pad + r * (th + 30)
        sheet.paste(Image.open(f).convert("RGB").resize((tw, th), Image.LANCZOS), (x, y + 26))
        d.text((x + 2, y + 3), f"{t:.1f} sn".replace(".", ","), fill=(210, 220, 240), font=font)
sheet.save(out, quality=84, optimize=True)
print(out, sheet.size)
