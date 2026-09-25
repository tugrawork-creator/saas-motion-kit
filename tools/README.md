# Tools

| Script | What it does |
|---|---|
| `deliver.sh <in> <WxH> [out] [lanczos\|area]` | Downscales a 4K render to its delivery size and loudness-normalises the audio |
| `loop_check.py <video>` | Compares the first and last frames of a loop (under ~3 means seamless) |
| `warm_sfx.py <dir>` | Synthesises warm UI sounds in C major: pop, tick, confirm, reveal, error-soft, whoosh-soft |
| `build_gallery.py` | Rebuilds `docs/index.html` from `docs/themes/data/*.json` |
| `make_thumbs.py --chrome <path>` | Renders the gallery thumbnails (serve `docs/` on :8766 first) |

Python tools need `numpy`, `pillow` and `soundfile` (`pip install numpy pillow soundfile`). The shell tools need `ffmpeg` and `ffprobe` on your PATH.
