# Storyboard: Acme Pulse, the clay cut

Theme: 021 Clay Studio · Format: 1080×1080 · Length: 12 s · Sound: none (silent; motion still sits on a 120 BPM grid, one beat = 0.5 s)

## Message & tone
- **Sentence:** I want to say "Pulse finds the one lumpy tile in the pile, and you decide what to do with it" in a warm, hand-made, trustworthy tone, so the viewer feels relieved that a small, human-sized fix got caught early.
- **Tone arc:** playful → bold → trustworthy → trustworthy → warm
- accent: coral
- **Motif:** the rolling pin. It first rolls *back* over the coral lump when the human presses "Roll back" and kneads it smooth, then comes back full-frame rolling *forward* to flatten the proof into the CTA ("You ship"). Same object, same gesture, bigger and reversed.
- **Motion signature:** every clay object moves on twos (poses quantised to 12 per second) and boils ±1 px / ±0.6° between beats; typography moves smoothly, so the typeset words always read as print on clay.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3 | hook | playful | tile-plop | match-cut-shape | elastic.out(1,.5) | down | felt+teal+coral | locked-top-down | clay-slab+clay-coil+clay-numerals | | none | poster holds 0.4 s; dashboard slabs plop onto the felt on the beat; the coral "38" slab lands last and a thumb presses it down |
| 2 | 0:03 | 1.5 | reveal | bold | squash-release | object-carry | back.in(1.4) | radial | teal+felt | spotlight | logo+plinth+clay-blobs | | none | match cut: the press on the coral slab is released by the teal mark (same centre, size and tilt); blobs burst out, the wordmark presses up |
| 3 | 0:04.5 | 2.4 | proof | trustworthy | slide-in-on-twos | zoom-to-detail | steps(12) | left | coral+felt+ink | locked | clay-slab+sculpting-stick+dent | | none | the mark hops into the "watching" pill; calm slabs boil; the lumpy coral slab thuds in; the stick pokes it at 6.15 s and leaves a dent |
| 4 | 0:06.9 | 2.1 | proof | trustworthy | press-up | rolling-pin-wipe | power2.out | down | ink+teal+felt | push-in | press-in-button+thumbprint | rollback-rolling-pin | none | surprise: pressing "Roll back" leaves a human thumbprint in the clay button and sends a rolling pin backwards over the lump, kneading it smooth into a teal "Rolled back" slab |
| 5 | 0:09 | 3 | cta | warm | pin-flatten-reveal | end | power3.inOut | right | felt+coral+teal | locked | lockup+clay-pill+clay-blobs | | none | motif:rolling-pin returns full-frame and rolls forward; "Start free" squashes onto the 10.5 s downbeat; everything is still from 11.2 s |

## The seven questions
1. **Say / tone:** the sentence above. Clay makes a monitoring product feel touchable; the numbers stay typeset so it never turns childish.
2. **Repeats:** audit is clean. The rolling pin is the only deliberate repeat (motif, reversed direction and 3× scale on its return).
3. **What each transition means:**
   - *match-cut-shape* (3.0 s): the pile's coral "38" slab becomes the teal Acme mark mid-squash, so 38 dashboards turn into one Pulse.
   - *object-carry* (4.5 s): the mark hops off the plinth into the "watching 14 metrics" pill, meaning Pulse is now on duty.
   - *zoom-to-detail* (6.9 s): the camera leans in from the anomaly to the two buttons, because the decision is yours.
   - *rolling-pin-wipe* (9.0 s): the pin rolls forward and leaves a freshly rolled clay sheet with the promise on it, so the fix gives way to the ship.
4. **Colour over time:** coral appears as one crack in the pile (the falling checkout coil), grows into the "38" slab, is swapped for teal at the reveal, owns the frame only once (the lumpy anomaly slab), gets rolled back to teal, and returns just once as the "Start free" pill.
5. **New component:** the *Rollback rolling pin*. Pressing "Roll back" sends a wooden pin backwards across the lumpy coral slab; behind it the clay comes out smooth and teal ("Rolled back · by you · 09:51"). Small companion: the *thumbprint seal*, a real fingerprint pressed into the clay button, showing that a human made the call, while Pulse's stick only leaves a dent.
6. **Surprise:** the rolling pin at 7.65 s. The viewer expects a toast or tick; instead the clay itself gets kneaded flat.
7. **Last film:** first film in this folder; the other five films use other media, so none of their transitions carry over here.

## Frames

### Frame 1 · Hook (0–3 s)
- key visual: a pile of chunky clay dashboard slabs on warm felt; one slab's coil already dips coral
- moves first: slabs drop from above on twos and squash on contact (scaleY 0.82 → 1)
- on-screen words: "How many dashboards today?" + the slab "38 · DASHBOARDS OPEN"
- beat hook: the coral "38" lands on the 2.0 s downbeat; a thumb presses it at 2.7 s

### Frame 2 · Reveal (3–4.5 s)
- key visual: the teal Acme mark springs up out of the press onto a clay plinth under a studio spotlight
- moves first: the mark (stretch 0.82 → 1.03 → 1), then clay blobs burst out and "Acme Pulse" rises out of the felt
- on-screen words: "Acme Pulse"

### Frame 3 · Proof moment (4.5–9 s)
- key visual: three calm slabs with green dots and one lumpy coral slab, "CHECKOUT CONVERSION −18%", "since 09:42 · after deploy #2231"
- new component: the rollback rolling pin (+ the thumbprint seal on the pressed button)
- moves first: the mark hops into the pill, the slabs slide in, the coral slab thuds down, the stick pokes it
- human decides: "Pulse caught it. You decide." The "Roll back" button sinks 6 px with inward shadows and keeps a thumbprint

### Frame 4 · CTA (9–12 s)
- key visual: lockup, "You ship. *Pulse watches.*", coral clay "Start free" pill
- loop note: not a loop; the last 0.8 s is a dead-still hold (the boil stops at 11.2 s)
