"""Track a green screen in a plate, frame by frame, and write its corners for a HyperFrames composition.

Usage:
  python tools/screen_track.py assets/footage/s01-ots.mp4 assets/footage/s01-screen.js --var S01_SCREEN

Generate the plate with the laptop screen showing flat #00FF00 and a locked-off camera. For every frame
this finds the green area and its four corners (top-left, top-right, bottom-right, bottom-left), smooths
them over 5 frames and writes:

  window.S01_SCREEN = {"w": 1920, "h": 1080, "fps": 30, "frames": [[x0,y0,x1,y1,x2,y2,x3,y3], ...]};

The composition loads that file with a <script> tag and pins its UI onto the quad with a CSS matrix3d,
so the screen stays locked to small camera drift. Needs numpy and ffmpeg/ffprobe.
"""
import argparse, json, subprocess, sys
import numpy as np


def probe(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                                   "stream=width,height,r_frame_rate", "-of", "json", path])
    s = json.loads(out)["streams"][0]
    num, den = (int(x) for x in s["r_frame_rate"].split("/"))
    return s["width"], s["height"], num / den


def corners(mask):
    ys, xs = np.nonzero(mask)
    if len(xs) < 50:
        return None
    s, d = xs + ys, xs - ys
    pick = lambda i: (float(xs[i]), float(ys[i]))
    return [*pick(s.argmin()), *pick(d.argmax()), *pick(s.argmax()), *pick(d.argmin())]


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("plate")
    ap.add_argument("out")
    ap.add_argument("--var", default="SCREEN")
    ap.add_argument("--scale", type=int, default=2, help="analyse at 1/scale resolution (faster)")
    a = ap.parse_args()

    w, h, fps = probe(a.plate)
    aw, ah = w // a.scale, h // a.scale
    proc = subprocess.Popen(["ffmpeg", "-v", "error", "-i", a.plate, "-vf", f"scale={aw}:{ah}", "-f", "rawvideo",
                             "-pix_fmt", "rgb24", "-"], stdout=subprocess.PIPE)
    frames, last, missing = [], None, 0
    while True:
        buf = proc.stdout.read(aw * ah * 3)
        if len(buf) < aw * ah * 3:
            break
        img = np.frombuffer(buf, np.uint8).reshape(ah, aw, 3).astype(np.int16)
        r, g, b = img[..., 0], img[..., 1], img[..., 2]
        c = corners((g > 110) & (g > r * 1.35) & (g > b * 1.35))
        if c is None:
            missing += 1
            c = last
        last = c
        frames.append(c)
    proc.wait()
    if not any(frames):
        sys.exit("no green screen found in the plate; was it generated with a flat #00FF00 screen?")
    first = next(f for f in frames if f)
    frames = [f or first for f in frames]
    arr = np.array(frames) * a.scale
    k = 2  # 5-frame moving median against matte flicker
    smooth = np.array([np.median(arr[max(0, i - k):i + k + 1], axis=0) for i in range(len(arr))])
    data = {"w": w, "h": h, "fps": round(fps, 3), "frames": [[round(v, 1) for v in f] for f in smooth.tolist()]}
    with open(a.out, "w", encoding="utf-8") as f:
        f.write(f"window.{a.var} = {json.dumps(data, separators=(',', ':'))};\n")
    print(f"wrote {a.out}: {len(frames)} frames at {fps:g} fps" + (f", {missing} without green (held)" if missing else ""))


if __name__ == "__main__":
    main()
