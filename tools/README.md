# Tools

| Script | What it does |
|---|---|
| `variety_audit.py <STORYBOARD.md> [--history f.json] [--append name --theme NNN]` | Flags repetition and tone mismatches in the storyboard ledger, and remembers your previous films and their themes |
| `pick_themes.py --tone <tone> [--audience words] [--effort low\|med\|high] [--history f.json]` | Shortlists gallery themes for a tone and an audience, and skips the themes of your last five films |
| `history_report.py <history.json> [-o motion-history.html]` | Turns your motion history into a one-page report: what you keep reaching for, and the transitions and themes to try next |
| `breakdown.py <video> --id NN [--creator …] [--url …] [--threshold 0.1]` | Breaks a reference video into shots: cut times, rhythm (cuts per 10 s, the first 3 s), a contact sheet and a draft ledger, with a credit header. Writes to the git-ignored `.references/` |
| `fal_shots.py <shots.json> [--dry-run] [--only id,…] [--force]` | Runs a film's shot list on fal's queue: cast card → stills → clips, chaining outputs with `@step`, caching results and downloading into `assets/footage/` (needs `FAL_KEY`) |
| `screen_track.py <plate.mp4> <out.js> [--var NAME]` | Finds a flat `#00FF00` screen in a plate frame by frame and writes its corners, so the composition can pin real UI onto it |
| `deliver.sh <in> <WxH> [out] [lanczos\|area]` | Downscales a 4K render to its delivery size and loudness-normalises the audio |
| `loop_check.py <video>` | Compares the first and last frames of a loop (under ~3 means seamless) |
| `warm_sfx.py <dir>` | Synthesises warm UI sounds in C major: pop, tick, confirm, reveal, error-soft, whoosh-soft |
| `build_gallery.py` | Rebuilds `docs/index.html` from `docs/themes/data/*.json` |
| `build_transitions.py` | Validates `docs/transitions/data.json` and regenerates `creative/transition-atlas.md` |
| `make_thumbs.py --chrome <path> [--only NNN …]` | Renders the gallery thumbnails, or just the listed ones (serve `docs/` on :8766 first) |

Python tools need `numpy`, `pillow` and `soundfile` (`pip install numpy pillow soundfile`). The shell tools need `ffmpeg` and `ffprobe` on your PATH.
