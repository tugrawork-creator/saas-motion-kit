# 7 · Deliver

1. Render big: `npx hyperframes render --quality delivery --resolution landscape-4k` (or `square-4k`). For heavy 3D scenes add `--player-ready-timeout 180000 --browser-timeout 180`.
2. Downscale and encode: `tools/deliver.sh renders/film-2160.mp4 1920x1080` produces a Lanczos-scaled, `+faststart` H.264 file, with audio loudness-normalised if present.
3. Loops: `python tools/loop_check.py renders/film-1080.mp4` compares the first and last frames. A mean difference close to 0 means a seamless seam.
4. Pixel art: downscale with `flags=area` (an exact 2× box filter) so the pixels stay crisp.
5. Name the masters by use, for example `product-booth-loop-1920x1080.mp4` or `product-linkedin-2048x2048.mp4`.

**Gate:** you watch the delivered file on the target device (the phone for feed, the actual screen for a booth).
