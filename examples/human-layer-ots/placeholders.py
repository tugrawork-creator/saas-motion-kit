"""Write stand-in plates so the cut previews and renders before any footage exists.

Usage: python placeholders.py            (then: python ../../tools/screen_track.py ... as in package.json)

Writes assets/footage/s01-ots.mp4, s02-tap.mp4 and s03-face.mp4: drawn silhouettes with the same framing,
length and green screen as the real shots in shots.json, each stamped "PLACEHOLDER". Running
tools/fal_shots.py later overwrites them with the generated footage. Needs numpy, pillow and ffmpeg.
"""
import math, os, subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H, FPS = 1920, 1080, 30
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "footage")
rng = np.random.default_rng(7)


def glow(size, center, radius, color, strength):
    """A soft radial light as a float RGB layer."""
    yy, xx = np.mgrid[0:size[1], 0:size[0]]
    d = np.sqrt((xx - center[0]) ** 2 + (yy - center[1]) ** 2) / radius
    a = np.clip(1 - d, 0, 1) ** 2 * strength
    return a[..., None] * (np.array(color, dtype=np.float32) / 255)[None, None, :]


def write(name, seconds, draw):
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                          "-r", str(FPS), "-i", "-", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18",
                          os.path.join(OUT, name)], stdin=subprocess.PIPE)
    for i in range(int(seconds * FPS)):
        img = draw(i / FPS)
        a = np.asarray(img).astype(np.int16) + rng.integers(-5, 6, (H, W, 1))  # a little grain
        p.stdin.write(np.clip(a, 0, 255).astype(np.uint8).tobytes())
    p.stdin.close(); p.wait()
    print("wrote", name)


def stamp(img, text):
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([40, 40, 40 + 14 * len(text) + 40, 92], 26, fill=(0, 0, 0))
    d.text((60, 56), text, fill=(255, 210, 120))
    return img


ROOM = glow((W, H), (300, 380), 900, (255, 170, 90), 70)  # warm lamp, left
SPILL = glow((W, H), (1310, 520), 700, (120, 255, 140), 22)  # screen spill
TAP = glow((W, H), (960, 300), 1100, (150, 190, 255), 60)
LAMP3 = glow((W, H), (300, 300), 900, (255, 170, 90), 50)
SCREEN3 = glow((W, H), (960, 1180), 900, (150, 200, 255), 90)


def s01(t):
    drift = (5 * math.sin(t * 1.3), 3 * math.cos(t * 1.1))
    base = np.zeros((H, W, 3), np.float32) + np.array([16, 13, 12], np.float32) + ROOM
    base += SPILL
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(img)
    dx, dy = drift
    d.rectangle([0, 790, W, H], fill=(48, 36, 30))                                   # desk
    q = [(1000 + dx, 300 + dy), (1630 + dx, 345 + dy), (1610 + dx, 720 + dy), (990 + dx, 690 + dy)]
    d.polygon([(q[0][0] - 16, q[0][1] - 16), (q[1][0] + 16, q[1][1] - 14), (q[2][0] + 14, q[2][1] + 16), (q[3][0] - 16, q[3][1] + 16)], fill=(22, 22, 26))
    d.polygon(q, fill=(0, 255, 0))                                                   # the screen: flat #00FF00
    d.polygon([(960, 760), (1680, 790), (1760, 880), (900, 860)], fill=(30, 30, 34))  # keyboard deck
    lean = 18 * min(1, max(0, (t - 1.2) / 1.5))
    d.ellipse([260 + lean, 230 - lean * .3, 760 + lean, 760], fill=(10, 9, 9))       # head, from behind
    d.ellipse([-120 + lean, 640, 980 + lean, 1500], fill=(12, 10, 10))                # shoulders
    if 2.4 < t < 3.4 and int(t * 12) % 2 == 0:
        d.rectangle([1720, 800, 1860, 830], fill=(170, 200, 255))                     # phone buzz
    return stamp(img, "PLACEHOLDER · S01 over-the-shoulder · shots.json")


def s02(t):
    base = np.zeros((H, W, 3), np.float32) + np.array([14, 14, 18], np.float32) + TAP
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([420, 640, 1500, 1200], 40, fill=(58, 58, 64))               # trackpad
    press = min(1, max(0, (t - 2.2) / 0.5))   # the tap lands at 2.7 s, as in the 3 s Kling clip
    y = 120 + 380 * press
    d.rounded_rectangle([860, y - 520, 1060, y + 160], 100, fill=(150, 112, 92))      # finger
    if press >= 1:
        d.ellipse([900, 600, 1020, 680], outline=(255, 255, 255), width=4)
    return stamp(img, "PLACEHOLDER · S02 finger tap · shots.json")


def s03(t):
    screen = 1 - min(1, max(0, (t - 3.6) / 1.4))                                   # the lid closes, screen light fades
    base = np.zeros((H, W, 3), np.float32) + np.array([14, 12, 12], np.float32) + LAMP3
    base += SCREEN3 * screen
    img = Image.fromarray(np.clip(base, 0, 255).astype(np.uint8))
    d = ImageDraw.Draw(img)
    relax = 14 * min(1, max(0, (t - 1.0) / 1.2))
    d.ellipse([560, 1080 - 380 + relax, 1360, 1080 + 600 + relax], fill=(34, 28, 26))  # shoulders
    d.ellipse([740, 190 + relax, 1180, 760 + relax], fill=(int(60 + 60 * screen), int(58 + 70 * screen), int(64 + 90 * screen)))
    return stamp(img.filter(ImageFilter.GaussianBlur(1.2)), "PLACEHOLDER · S03 close-up · shots.json")


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    write("s01-ots.mp4", 6.0, s01)
    write("s02-tap.mp4", 3.0, s02)
    write("s03-face.mp4", 6.0, s03)
