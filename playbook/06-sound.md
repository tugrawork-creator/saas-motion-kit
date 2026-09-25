# 6 · Sound

Choose one identity and commit to it:

- **Music-driven.** Pick or generate the track **first**, extract its beat grid (librosa), then cut scenes on bar lines. Put the reveal on the drop.
- **SFX only.** Use short, warm, tuned sounds (marimba or wood block in one key, 1–2 % room reverb) on UI events. [`tools/warm_sfx.py`](../tools/warm_sfx.py) synthesises a starter set.
- **Silent.** Booth loops and feed autoplay often play muted, so design for that and don't fake audio cues with text.

**Avoid:** pure sine beeps (thin and eerie), alarm tones for "errors" in a friendly brand, hiss beds and metallic risers.

**Locally generated music.** Meta's MusicGen runs on a CPU (about 9 minutes per 30 s with the medium model). Its weights are **CC-BY-NC 4.0**, so use it for drafts and non-commercial work only.

**Loudness for social:** `ffmpeg -af loudnorm=I=-14:TP=-1.5:LRA=11`.

**Gate:** you approve the mix with the picture.
