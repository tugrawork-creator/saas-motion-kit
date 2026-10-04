"""Check that a looping video's last frame matches its first frame.

Usage: python tools/loop_check.py renders/loop-1080p.mp4
Prints the mean absolute pixel difference (0–255). Under ~3 is a seamless seam
(compression noise only); anything larger means something jumps at the loop point.
"""
import subprocess, sys, tempfile, os
import numpy as np
from PIL import Image

if len(sys.argv) != 2:
    sys.exit(__doc__)
src = sys.argv[1]
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", src]).decode().strip())
fps_s = subprocess.check_output(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", src]).decode().strip()
num, den = (int(x) for x in fps_s.split("/"))
last = dur - 1.5 * den / num
tmp = tempfile.mkdtemp()

def grab(t, name):
    p = os.path.join(tmp, name)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", f"{t:.4f}", "-i", src, "-frames:v", "1", p], check=True)
    return np.asarray(Image.open(p).convert("RGB"), dtype=np.float32)

a, b = grab(0, "first.png"), grab(last, "last.png")
d = float(np.abs(a - b).mean())
print(f"first vs last frame: mean abs diff {d:.2f} -> {'seamless' if d < 3 else 'CHECK THE SEAM'}")
