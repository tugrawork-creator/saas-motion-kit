# 021 · Clay Studio: the clay cut of "Same story, six films"

Theme sheet: [021 Clay Studio](../../../docs/themes/021-clay-studio.html) · 12 s · 1080×1080 · 30 fps · silent

> I want to say "Pulse finds the one lumpy tile in the pile, and you decide what to do with it" in a warm, hand-made, trustworthy tone, so the viewer feels relieved that a small, human-sized fix got caught early.

| Time | Beat | What happens |
|---|---|---|
| 0–3 s | Hook | "How many dashboards *today?*" Clay dashboard slabs plop onto the felt on the beat; the coral "38 · DASHBOARDS OPEN" slab lands last and a thumb presses it flat |
| 3–4.5 s | Reveal | Match cut: the teal Acme mark releases the same squash on a plinth under a studio light; blobs burst out and "Acme Pulse" presses up out of the table |
| 4.5–9 s | Proof | The mark hops into the "watching 14 metrics" pill. Calm slabs boil; the lumpy coral slab reads "CHECKOUT CONVERSION −18% · since 09:42 · after deploy #2231". The sculpting stick pokes it and leaves a dent. "Pulse caught it. *You* decide." The human presses **Roll back**, and a rolling pin kneads the lump into a smooth teal "Rolled back · by you · 09:51" slab |
| 9–12 s | CTA | The pin comes back full-frame and rolls forward, leaving a fresh clay sheet: lockup, "You ship. *Pulse watches.*", coral "Start free" pill. Dead still from 11.2 s |

## How it gets the clay feel (CSS + SVG only)
- **Stop-motion on twos:** every clay move runs through a `twos()` ease wrapper that quantises any GSAP ease to 12 poses per second. Typography stays smooth, so the words read as print on clay.
- **Boil:** idle slabs are re-posed every 1/12 s by ±1.3 px / ±0.6°, driven by a deterministic hash used *as an ease* (no callbacks and no `Math.random`, so every frame is seek-safe). All boils end on a neutral pose at 11.2 s for the still hold.
- **Squash & stretch:** landings hold a scaleY 0.8 contact pose, then settle with `elastic.out(1,.5)`.
- **Material:** claymorphism slab shadows from the sheet, a feTurbulence fingerprint grain in multiply, real thumbprints (an SVG ridge symbol) pressed into a few slabs, and a lumpy border-radius plus bumps for the one slab that's wrong.

## New component
**Rollback rolling pin.** Pressing "Roll back" sends a wooden pin *backwards* across the lumpy coral slab. Two clip-paths stay locked to the pin's centre, so the clay behind it comes out smooth and deep teal. Its companion is the **thumbprint seal**: the pressed button keeps a human fingerprint, while Pulse's stick only leaves a dent. The pin is also the film's motif: it returns full-frame and rolls *forward* for the CTA wipe.

## Transitions
| Cut | Transition | Meaning |
|---|---|---|
| 3.0 s | T01 Match Cut: Shape (+ motion) | the pressed coral "38" becomes the teal mark mid-squash: 38 dashboards, one Pulse |
| 4.5 s | T05 Object Carry | the mark hops off the plinth into the "watching" pill: Pulse is on duty |
| 6.9 s | zoom-to-detail (camera push-in) | the camera leans from the anomaly toward the two buttons: the decision is yours |
| 9.0 s | rolling-pin wipe (new, mask family) | the fix gives way to the ship; the motif reverses direction |

## Checks
- `python ../../../tools/variety_audit.py STORYBOARD.md` → **no repetition found** (4 cuts across the cut, carry, camera and mask families; 5 eases; one surprise)
- `npx hyperframes lint` → 0 errors · `npx hyperframes check` → passed (0 errors; contrast clean)
- Render: `renders/film.mp4`, 1080×1080, 30 fps, 360 frames, 12.0 s (renders are gitignored)

Files: `index.html` (the whole film: layout, CSS and the GSAP timeline) · `STORYBOARD.md` (tone, ledger, seven questions) · `assets/` (fonts under OFL, Acme mark)
