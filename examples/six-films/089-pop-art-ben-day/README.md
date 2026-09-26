# 089 · Pop-Art Ben-Day: "Acme Pulse, the comic page"

One of the six films that tell the same 12 s Acme Pulse story in different themes.
Theme sheet: [089 Pop-Art Ben-Day](../../../docs/themes/089-pop-art-ben-day.html). The film is 1080×1080, 30 fps, 12 s and silent.

**Tone:** I want to say "Pulse catches the drop before your customers do, and you make the call" in a punchy, wry comic-book tone, so the viewer feels the small thrill of a hero turning up just in time.

The film reads like a guided-view comic. Every page is a real comic page, authored at 2× and only ever shown at scale ≤ 1 so the Ben-Day dots stay crisp. The camera travels from panel to panel.

| time | beat | what happens |
|---|---|---|
| 0–3 s | hook | Poster frame: "Friday, 5:58 PM…" and a thought balloon, "38 dashboards *today?!*". Ink ticks stamp five teal monitors. The coral one is skipped and its line keeps sinking. |
| 3–4.5 s | reveal | Splash page: a coral burst, then an amber burst, the Acme mark and **PULSE!**, with the caption "Enter… Acme Pulse". |
| 4.5–9 s | proof | Three panels, one page. First, the chart prints and **ZAP!** lands on deploy #2231. Next, the mark catches the anomaly dot and says "Checkout conversion **−18%** · since 09:42". Last, "Your call!" and a dotted pop-art hand presses **ROLL BACK!** The camera then pulls back, the chart re-inks teal and a check lands. |
| 9–12 s | CTA | The page turns to "Next Friday…". The mark says "You ship. *Pulse watches.*", **START FREE** drops in and lands, and the last 0.8 s hold still. |

## New components
- **Halftone chart.** The metric is printed as Ben-Day dots and the dot size carries the value: big teal dots before the deploy, small coral dots after the drop, so the drop visibly thins the ink. Its motion signature is a press-roller print that reveals dot columns in `steps(12)` behind the drawn line. After the roll back, a `steps(8)` re-ink sweep replaces the coral with teal column by column.
- **Pointing hand.** A Lichtenstein-style hand with coral Ben-Day skin and a teal Acme cuff. The press is shown by pushing the hand and the button face into the hard ink shadow (offset 10 → 0), followed by CLICK!

## Transitions
| cut | transition | why |
|---|---|---|
| hook → reveal | **focal iris (burst-shaped)** | the iris opens from the one monitor nobody ticked, so the missed drop summons Pulse (cause → effect) |
| reveal → proof | **whip pan** | comic speed lines plus a horizontal-only SVG blur across the page spread, meaning "meanwhile, at 09:42" |
| chart → mark | **object carry** | the coral anomaly dot flies into the coral dot of the Acme mark while the camera tilts down |
| mark → button | **beat cut with hold-frame** | a 0.35 s freeze on "−18%", then a hard cut to "Your call!" |
| button → page | **dolly-out** | the surprise: the three close-ups turn out to be one comic page |
| page → CTA | **paper fold (page turn)** | the page lifts toward the reader (3D rotateY) and reveals the next page, "Next Friday…" |

## Checks
- Variety audit (`python tools/variety_audit.py STORYBOARD.md`): **no repetition found** (7 shots; families mask, camera ×2, carry, cut, material).
- `npx hyperframes lint`: 0 errors. `npx hyperframes check`: passed, 0 errors, with contrast 22/22 WCAG AA.

## Assets
- Acme mark: `assets/acme-mark.svg`, copied from `docs/assets/brand`.
- Fonts (all SIL OFL 1.1, bundled locally): Manrope, Instrument Serif (italic) and Bangers, which comes from `@fontsource/bangers`. See [assets/fonts/LICENSES.md](assets/fonts/LICENSES.md).
- The only external script is GSAP 3.14.2 from jsDelivr.
