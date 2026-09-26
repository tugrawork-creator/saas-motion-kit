# Film brief: the same story, one more theme

Give this brief to your agent (Claude Code with the HyperFrames skills) together with **one theme number** from the [gallery](https://tugrawork-creator.github.io/saas-motion-kit/). It is the brief the six films in this folder were built from, with the paths made relative to the repository root.

## Hard rules

- The brand is the fictional **Acme**, and the product is **Acme Pulse**: an AI that watches product metrics in the background and flags anomalies before customers notice. A human decides.
- Work only inside your own folder, `examples/six-films/<NNN-slug>/`.
- No external assets except the GSAP CDN script (`https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js`).
  - **Fonts:** copy the woff2 files you need from `docs/assets/fonts/` into `assets/fonts/`, together with `OFL.txt` and `LICENSES.md`, and declare `@font-face` locally.
  - **Logo:** copy `docs/assets/brand/acme-mark.svg`. The wordmark is the text "Acme Pulse", typed in Manrope 800 or in the theme's lettering. Never draw any other logo.
- Deterministic and seek-safe:
  - Register one paused GSAP timeline on `window.__timelines["main"]`, and put `class="clip"` with `data-start` and `data-duration` on every timed layer.
  - Never use `Date.now()` or `Math.random()`. Use seeded or index-derived values instead.
  - Tween only transform, opacity, clip-path and filter. Never tween top, left, width, height or letter-spacing.
  - When the same property is tweened more than once, use `tl.to` or `immediateRender: false` so the later tween doesn't overwrite the earlier states.

## The story: 12 s, 1080×1080, 30 fps, silent

| time | beat | content |
|---|---|---|
| 0–3 s | hook | The pain: too many dashboards, or a drop found too late. Put at most about six words on screen, e.g. "38 dashboards. One missed drop." or "How many dashboards today?" |
| 3–4.5 s | reveal | Acme Pulse arrives in the theme's language (the mark and "Acme Pulse"). |
| 4.5–9 s | proof | Pulse catches ONE anomaly, **"Checkout conversion −18%" · "since 09:42"**, and a human presses **"Roll back"** (or "Acknowledge"). This is the key moment, so give it the most craft. |
| 9–12 s | CTA | "You ship. *Pulse watches.*" plus a "Start free" button. Hold the last ~0.8 s still. |

## Look and motion

- **The theme sheet is the design source:** `docs/themes/<NNN-slug>.html` (four key frames, a component kit and motion notes) plus `docs/themes/data/<NNN>.json`. The film must look unmistakably like that theme. Bring its four cells to life instead of making a generic SaaS video.
- **Brand tokens:** `docs/assets/brand/acme.css`.
  - Teal `#0FA3A3` / `#0B6E6E`.
  - Coral `#FF5A4E`, used only for the anomaly and the CTA.
  - Ink `#0E1726` and paper `#F6F5F1`.
  - A theme may reinterpret the palette in its own medium, but the result must stay recognisably Acme.
- **Creative rules:**
  - Follow `creative/README.md`, `creative/tone-matrix.md` and `creative/variety-rules.md`.
  - Pick transitions from `creative/transition-atlas.md`.
  - Invent at least one new component (see `creative/component-forge.md`).

## Process

1. **Scaffold.** In `examples/six-films/`, run `npx hyperframes init "<NNN-slug>" --non-interactive --example=blank --skill=general-video`.
2. **Storyboard.**
   - Write `STORYBOARD.md` from `templates/STORYBOARD.md`: the Message & tone sentence, `accent: coral`, and then the ledger, with one row per shot and at least four rows.
   - Run `python tools/variety_audit.py STORYBOARD.md` and iterate until it prints "no repetition found".
   - Mark deliberate repeats with `motif:`, and mark the surprise in the notes with `surprise:`. In a 12 s film one surprise is enough.
3. **Build.** Write `index.html` at 1080×1080 with `data-duration="12"`. Hold the very first frame as a designed still, because it is the poster.
4. **Verify.**
   - `npx hyperframes lint` must report 0 errors.
   - Run `npx hyperframes snapshot --at 1.5,3.8,6.5,8.5,11.5`, read `snapshots/contact-sheet.jpg`, and fix any clipping, overlap or unreadable text.
   - `npx hyperframes check` must report 0 errors.
5. **Render.** Run `npx hyperframes render --quality high --output renders/film.mp4`, then confirm with ffprobe that the file is 1080×1080 and 12 s long.
6. **Document.** Write a short `README.md` covering:
   - the theme, with a link to its sheet;
   - the tone sentence;
   - the new component you invented;
   - the transitions you used;
   - the audit result.
