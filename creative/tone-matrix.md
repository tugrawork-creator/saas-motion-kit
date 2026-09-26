# Tone matrix

Decide the tone before you pick a single effect. Write this sentence at the top of the storyboard:

> **"I want to say** ___ **in a** ___ **tone, so the viewer feels** ___**."**
> *Example: I want to say "problems get caught before customers notice" in a **calm, trustworthy** tone, so the viewer feels **relieved**.*

Then let the tone set the craft choices. The rows below are starting points; break them on purpose, never by accident.

| Tone | Speed & rhythm | Eases | Camera | Colour | Type | Transitions that fit | Sound |
|---|---|---|---|---|---|---|---|
| **Calm** | long holds (2–4 s), few cuts | `sine.inOut`, `power1` | slow push-in, gentle parallax | low contrast, one soft accent | light weights, generous spacing | dissolve, focal iris, parallax slide | airy pads, soft ticks, room for silence |
| **Trustworthy** | even, predictable beats | `power2.out` | locked-off, then precise moves | brand primary dominant, neutral greys | clear sans, numbers in mono | match cut (shape), line-to-horizon, type carry | warm wood/marimba, confirm "ding" |
| **Urgent** | short shots (0.4–1 s), accelerating | `expo.in`/`expo.out`, snaps | whip pans, crash zooms | high contrast, alert colour allowed | condensed, tight, uppercase | whip pan, beat cut with hold-frame, speed ramp | ticking, rising pitch, hard stops |
| **Playful** | bouncy rhythm, syncopated | `back.out(1.7)`, small overshoot (never elastic on UI) | tilt, bobbing, squash-free | saturated secondaries, stickers | rounded, mixed sizes | object carry, paper fold, dither | pops, pluck, 8-bit bleeps |
| **Premium** | slow, deliberate, very few moves | `power3.inOut`, long tails | dolly, rack focus, macro | dark ground, one metallic/brand highlight | serif display, wide tracking | push-through, glass refraction, focal iris | low drones, single piano note, silence |
| **Technical** | grid-locked timing, on the beat | `steps()`, `power4.out` | orthographic, top-down, snap-to-grid | monochrome + one signal colour | mono, tabular numbers | split stack, dither/pixel sort, cursor carry | clicks, data blips, keyboard |
| **Warm / human** | natural, slightly irregular | `power2.inOut` | handheld-feel drift (subtle) | warm neutrals, skin/paper tones | humanist sans, handwriting accents | ink bleed, paper fold, type carry | acoustic, wood, soft hum |
| **Bold / confident** | big beats, big type, hard cuts | `power4.out`, `expo.out` | frontal, symmetrical, big scale jumps | brand colour flood fields | heavy weights, huge scale | graphic match (colour), text mask, beat cut | kick drums, stabs |
| **Mysterious / reveal** | withhold, then release | `power2.in` then `expo.out` | slow reveal from darkness, off-centre | dark, mostly desaturated, one light source | thin, small, then huge | focal iris, text mask, freeze & rewind | swells, reverse cymbals, silence before the drop |
| **Celebratory** | fast payoff, then hold | `back.out`, confetti physics | pull-back reveal | full palette, gold/amber accents | bold display | dolly-out reveal, object carry, time-lapse tick | fanfare, sparkle, crowd-ish pads |
| **Nostalgic** | slower, looping | `sine`, stepped | fixed frame, zoom lines, film gate | faded, grainy, limited palette | era-specific display | dither, film burn (HyperFrames), paper fold | tape wow, chiptune, vinyl crackle |

## Tone mismatches the audit warns about

- **Calm** or **premium** with more than 1.5 cuts per second, or with `back`/`elastic` eases.
- **Urgent** with holds longer than 2 s (except one deliberate pause before the payoff).
- **Trustworthy** with glitch or distortion transitions.
- **Playful** with a monochrome palette and no secondary colours.
- Any tone with **more than two accent colours** in one shot.

## Changing tone inside a film

Tone can (and often should) shift once: pain is *urgent*, the reveal is *bold*, the proof is *trustworthy*, the CTA is *warm*. Record the tone per row in the ledger. The audit checks each row against its own tone, and flags a film that has only one tone for more than 45 s. That isn't wrong, but ask yourself whether it's intended.
