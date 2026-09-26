# 058 · Hand-Drawn Marker

One of the six films in [Same story, six films](../). The story is the same in every film: 12 s, 1080×1080, silent. This one is built from the theme sheet [058 Hand-Drawn Marker](../../../docs/themes/058-hand-drawn-marker.html) (data: [`058.json`](../../../docs/themes/data/058.json)).

> **Tone:** I want to say "Pulse catches the drop you would have missed, and you make the call" in a warm, human tone, so the viewer feels relieved that checking dashboards is no longer their job.

The theme's rule sets the structure: **mess = problem, clean = product.** Red marker, a highlighter and a messy ring belong only to the hook. An eraser wipes them off. After that only neat teal ticks and one coral ring are left.

| time | beat | what happens |
|---|---|---|
| 0–2.6 s | hook | Poster frame: "38 dashboards." over 38 pencil thumbnails. 37 red marker strikes cascade and speed up, a loop arrow sends you back to the top, and the one skipped tile gets a messy ring. Then "One *missed* drop." |
| 2.6–4.1 s | reveal | A giant block eraser scrubs the page in four zigzag passes and leaves crumbs. The Acme mark and "Acme Pulse" are inked over pencil guides behind it. |
| 4.1–9 s | proof | The page turns. A graphite wireframe draws, and a seam walks across it turning the sketch into the real Pulse panel. Teal ticks go on the healthy rows. The seismograph dips coral at 09:42, the value flips to **−18%**, and one coral double ring closes. "since 09:42" is handwritten next to it. A sticky note slaps on ("Roll back? your call."), and a human cursor presses **Roll back**. |
| 9–12 s | CTA | The recovered line flattens into the underline of "You ship. *Pulse watches.*", then the lockup and **Start free** appear. Holds still from 10.9 s. |

**New component: the fineliner seismograph.** A teal pen, driven by Pulse, sketches checkout conversion live inside the panel. Its line dips coral at 09:42, climbs back teal after the human rolls back, and then leaves the panel to become the CTA underline. All strokes are generated from a seeded PRNG (overshooting Rough.js-style lines and lumpy ellipses). They draw on with `stroke-dashoffset` (`pathLength="1"`), and a re-seeded `feTurbulence` displacement gives them a 1–2 px line boil.

**Transitions (from the [atlas](../../../creative/transition-atlas.md)):**
- **eraser-wipe** (mask): the chores are wiped away, so Pulse arriving is the cause and the clean page is the effect.
- **paper-fold** (material; T17 as a 3D page turn): from the promise to the evidence, on the next page of the notebook.
- **zoom-to-ring** (camera push-in to 1.06): leans in to the one number that matters, then steps back to decide.
- **line-to-horizon** (carry; T08): the metric line settles and becomes the underline of the promise.

**Motif:** the marker ring. It is messy and too late in the hook, then clean and on time around −18%.

**Variety audit:** `python tools/variety_audit.py STORYBOARD.md` returns "no repetition found" (6 shots; 4 cuts across the mask, material, camera and carry families). `hyperframes lint` reports 0 errors and `hyperframes check` passes with 0 errors.

Render: `npx hyperframes render --quality high --output renders/film.mp4` (1080×1080, 30 fps, 12.0 s).
