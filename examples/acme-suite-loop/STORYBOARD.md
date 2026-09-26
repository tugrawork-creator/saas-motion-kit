# Storyboard — Acme Suite booth loop (v2)

The shipped version. Compare it with [`STORYBOARD.v1.md`](STORYBOARD.v1.md), the first draft that the variety audit flagged 11 times.

## Message & tone
- **Sentence:** I want to say "five tools, one calm workspace" in a calm, trustworthy tone, so the viewer feels things are under control, with one bold beat so the loop has a peak.
- **Tone arc:** calm → trustworthy → playful → bold → trustworthy → warm
- accent: coral
- **Motif:** the turntable (every product lives on it; the loop ends where it began)

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 4 | hook | calm | hold | turntable-settle | power2.in | up | paper+teal | turntable | turntable | turntable | none | |
| 2 | 0:04 | 6.5 | proof | trustworthy | blur-in-chars | turntable-turn | expo.out | left | paper+teal | turntable | pulse-monitor | pulse-monitor | none | letters resolve out of blur |
| 3 | 0:10.5 | 5 | proof | trustworthy | mask-wipe | type-carry | power4.inOut | right | paper+teal | turntable | ledger-stack | ledger-stack | none | the promise types out; "Acme" is carried into the next shot |
| 4 | 0:15.5 | 5.5 | proof | playful | word-flip | focal-iris | back.out(1.4) | up | paper+teal | whip-turn | sync-cloud | | none | surprise: whip turn with motion blur |
| 5 | 0:21 | 8 | proof | bold | scale-settle | dolly-out | power3.out | center | teal+paper | dolly-in | forecast-bars | strike-through | none | surprise: colour flood from the product + camera dolly + "weeks" struck out |
| 6 | 0:29 | 5 | proof | trustworthy | drop-from-above | fade-left | power4.out | down | paper+teal | turntable | shield | checklist-chips | none | chips tick on like a checklist |
| 7 | 0:34 | 5 | cta | warm | spin-in | loop-seam | expo.out | radial | paper+coral | turntable | lockup | | none | surprise: the mark spins in on the beat |
| 8 | 0:39 | 1 | loop | calm | line-rise | end | power3.out | up | paper+teal | turntable | | | none | identical to 0:00 |

## What changed from v1 (and why)

| v1 | v2 | Why |
|---|---|---|
| every product 6 s | 6.5 / 5 / 5.5 / 8 / 5 s | equal lengths read as a slideshow |
| the same `line-rise` title five times | blur-in letters · mask wipe · word flip (type carry) · scale settle · drop from above | each product gets its own entrance |
| five identical 0.9 s turntable turns | normal · type carry · whip with motion blur · focal iris + dolly · fade | transitions now say something: continuity (carry), energy (whip), emphasis (iris) |
| one ease everywhere (`expo.out`) | six eases | rhythm changes with tone |
| no surprise, no colour event | Forecast floods teal, the camera dollies in, "weeks" is struck out | a peak in the middle of the loop |
