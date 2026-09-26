# 075 · 8-Bit Sidekick

One of six films that tell the same Acme Pulse story, 12 s at 1080×1080 and silent. This one is built from the theme sheet **[075 8-Bit Sidekick](../../../docs/themes/075-8-bit-sidekick.html)**: Pulse is a pixel sidekick in a little side-scroller, metrics are platforms you stand on, and Player 1 makes the call.

**Tone:** I want to say "while you're lost in dashboards, Pulse spots the drop, and you make the call" in a playful, nostalgic 8-bit tone, so the viewer feels like Player 1 with a sidekick who has their back.

| Time | Beat |
|---|---|
| 0–3 s | **Hook.** A maze of dashboard rooms. The camera hard-cuts one room per 8th note while `DASHBOARDS` ticks 32 → 38, and a tiny lost player walks past the one room with a coral bar. The dialog box says *SOMETHING DROPPED. BUT WHERE?* The first 0.5 s is the poster. |
| 3–4.3 s | **Reveal.** *PLAYER 2 HAS JOINED* blinks. Pulse drops in three stepped frames with no easing, and the mark and ACME PULSE slide in on `steps(4)`. |
| 4.3–7.75 s | **Proof.** A parallax slide takes us to the metrics level. The CHECKOUT platform crumbles, the red **!** pops two frames later and **CHECKOUT CONVERSION −18%** counts in. The RPG box types **SINCE 09:42 · DEPLOY #2231**, and a real thumb comes up from below the frame and presses A on **ROLL BACK**. |
| 7.75–9 s | **Rollback.** The world rewinds for 12 frames under a ◀◀ ROLLING BACK #2231 label. The text un-types, −18% counts back, the debris flies back into the platform and it flashes mint. |
| 9–12 s | **CTA.** Pulse's jump of joy carries across the cut. *STAGE CLEAR · RESOLVED IN 6 MIN* stamps in, then *YOU SHIP. PULSE WATCHES.* and **START FREE** (which flashes twice). Hearts pop up in quarter notes, and the last 0.8 s is a still hold. |

## How it's built
- **True pixel art.** The whole world is drawn by `render(t)` on a 180×180 canvas, then upscaled ×6 with `imageSmoothingEnabled = false`, so every pixel is a crisp 6 px block. `render(t)` is a pure function of time. It's called from the paused GSAP timeline (a proxy tween's setter plus `onUpdate`) and on `hf-seek`, and it never reads a clock. Stars, rooms, debris and grass come from seeded PRNGs.
- **Motion on 2s.** Sprites, debris and the typewriter step at 12 fps (`floor(t·12)`). The camera scroll moves at 30 fps but snaps to the pixel grid. GSAP handles the DOM type with `steps()` eases and a `back.out` sampled at 12 fps.
- **Type.** JetBrains Mono 600 with hard pixel shadows, as the sheet asks (mono for readability, not a bitmap font). It's bundled locally under the SIL OFL (`assets/fonts/OFL.txt`). The logo is the official `acme-mark.svg`.

## New component: the P1 gamepad
An NES-style controller that sits inside the choice box, with a skin-tone **thumb** that rises from below the frame and presses **A = ROLL BACK**. It's the only thing in the film that doesn't belong to the pixel world: the human hand reaching in to make the decision. It's forged from *verb: decides → ritual: pressing A → primitive: choice box → twist: the thumb comes from outside the screen*.

## Transitions
Each one comes from a different family:

| Cut | Transition | Why |
|---|---|---|
| hook → reveal | **T19 Dither / Pixel Sort** (4-frame Bayer dissolve in 18 px blocks) | the old world of dashboards breaks apart and the new player spawns |
| reveal → proof | **T12 Parallax Slide** (stars 0.3×, ground 1×, grass 1.4×) | the side-scroller moves on to the next level, the metrics |
| detect → decide | **RPG box wipe** (the theme's 4-frame vertical wipe, a mask) | the screen is handed to the human's decision |
| decide → rollback | **T21 Freeze & Rewind Scrub** | the rollback *is* a rewind: it reverses the crumble we just watched |
| rollback → CTA | **T02 Match Cut: Motion** | Pulse's jump continues on the same arc into the stage-clear screen |

## Checks
- `python ../../../tools/variety_audit.py STORYBOARD.md` → **no repetition found** (6 shots, 5 cuts in 5 families: material, camera, mask, time, cut)
- `npx hyperframes lint` → 0 errors (warnings: single-file composition, one repeated logo `<img>`)
- `npx hyperframes check` → passed: 0 runtime, layout or motion issues, and 21/21 text checks pass WCAG AA
- `npx hyperframes render --quality high --output renders/film.mp4` → 1080×1080, 30 fps, 360 frames, 12.0 s

Files: `index.html` (the whole film) · `STORYBOARD.md` (message, tone and the ledger) · `assets/` (font, OFL licence, Acme mark).
