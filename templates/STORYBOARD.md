# Storyboard — <title>

Theme: <NNN name> · Format: <WxH> · Length: <s> · Sound: <music / sfx / none>

## Message & tone
- **Sentence:** I want to say "<message>" in a <tone> tone, so the viewer feels <feeling>.
- **Tone arc:** <e.g. urgent → bold → trustworthy → warm>
- accent: <the one accent colour, e.g. coral>
- **Motif (optional):** <a deliberate repeat, e.g. the dot of the logo returns 3 times>

## Ledger

One row per shot. Fill it **before** building, then run `python tools/variety_audit.py STORYBOARD.md`.
Use `motif:` for a deliberate repeat, and `surprise:` in *notes* for the pattern-breaking moment.
Transition names come from the [transition atlas](../creative/transition-atlas.md) or HyperFrames (`crossfade`, `push-slide`, `circle-iris`…).
List palette colours lead-first, joined with `+`.

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.5 | hook | urgent | type-slam | beat-cut-hold | expo.out | center | ink+paper | locked | dashboard-wall | | tick-rise | |
| 2 | 0:03.5 | 1.2 | reveal | bold | mask-open | graphic-match-color | power4.out | radial | coral+ink | push-in | logo | | stab | surprise: freeze + silence |
| 3 | 0:04.7 | … | … | … | … | … | … | … | … | … | … | … | … | … |

## The seven questions (answer before you build)
1. What do I want to say, and in what tone? (the sentence above)
2. Is anything repeating? (run the audit)
3. What does each transition *mean*?
4. What are the colours doing over time? Where is the colour event?
5. Which component have I never made before?
6. Where is the surprise (about every 10–15 s)?
7. Did this repeat my last film? (`--history`)

## Frames

### Frame 1 · Hook
- key visual: <the viewer's pain, shown>
- moves first: <element, direction, ease>
- on-screen words: <≤ 6 words>
- beat hook: <what lands on a downbeat>

### Frame 2 · Reveal
- key visual:
- moves first:
- on-screen words:

### Frame 3 · Proof moment
- key visual: <the product doing its one job; a human decides>
- new component: <from the component forge>
- moves first:

### Frame 4 · CTA
- key visual: <lockup + one line + one action>
- loop note: <if looping, how the last frame matches frame 0>
