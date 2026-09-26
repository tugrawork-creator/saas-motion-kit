# Storyboard — Acme Pulse · ⌘K Keyboard Symphony

Theme: 002 ⌘K Keyboard Symphony · Format: 1080×1080 · Length: 12 s · Sound: none (the picture keeps an implied 120 BPM grid: beats every 0.5 s, keys struck on them)

## Message & tone
- **Sentence:** I want to say "Pulse watches every metric, so you only have to make the call" in a crisp, technical-then-trustworthy tone, so the viewer feels in control: one keystroke away from the fix.
- **Tone arc:** technical → bold → trustworthy → bold → warm
- accent: coral
- **Motif:** the keycap strike. ⌘ K opens the palette, ↵ summons Pulse, ⌥ R is the human's decision, and the coral ↵ is the CTA. It evolves from a teal glow to a coral decision to a coral key that stays held down.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3 | hook | technical | poster-hold+key-strike | beat-cut-hold | expo.out | up | ink+paper | locked | palette-modal, motif:keycap-strike, half-visible-row | | none | poster: the question over a blurred wall of dashboards. ⌘ K struck on the beat, "dash" typed one letter per 1/8 note, the count narrows to 38, the list flicks and freezes on "Checkout funnel · not today" |
| 2 | 0:03 | 1.5 | reveal | bold | beat-typed-query | object-carry | back.out(1.4) | radial | teal+paper | locked | fuzzy-match, lockup-row, motif:keycap-strike | | none | hard cut on the downbeat. "pulse" typed in 1/16 notes, the rows FLIP re-rank, ↵ expands the top row into the Acme Pulse lockup, and two teal rings land on the next two beats |
| 3 | 0:04.5 | 2.5 | proof | trustworthy | drop-from-above | dolly-to-keys | power3.out | down | paper+coral | locked | scope-chip, alert-row | metric-stave | none | the lockup shrinks into the "Pulse ›" scope chip. Pulse flags the anomaly with no key pressed; the stave plays and the notes after the coral 09:42 barline fall off the staff while −18% counts in |
| 4 | 0:07 | 2 | decision | bold | slide-select | line-to-horizon | power4.inOut | in | coral+ink | dolly-in | motif:keycap-strike, result-row | | none | surprise: the camera drops onto the ⌥ R keycaps (1.38× scale jump) as the human strikes. The keystroke stamps a teal "09:44 · you" barline into the stave, then the clock ticks 09:44 → 09:47 and the notes climb back |
| 5 | 0:09 | 3 | cta | warm | rise-from-horizon | end | power2.out | up | ink+teal+coral | locked | lockup, cta-row, motif:keycap-strike | | none | the settled stave line becomes the horizon: the tagline rises out of it and the palette unfolds below. The coral ↵ is struck on the last downbeat and stays down; the last 0.8 s is still |

## The seven questions
1. **Say what, in what tone?** The sentence above. The hook is technical (counting on the grid), the proof is trustworthy (one clear chart, one clear action), the CTA is warm.
2. **Anything repeating?** Every cut uses a different transition from a different family (cut → carry → camera → carry). The only repeat is the keycap strike, logged as a motif; it evolves each time.
3. **What each transition means.**
   - *Beat cut with hold-frame* (T04): the overflowing list freezes on the one dashboard nobody opened today, then the downbeat cuts to the answer.
   - *Object carry* (T05): the Acme Pulse lockup shrinks into the scope chip, so "we are now inside Pulse" is shown rather than said.
   - *Dolly to keys* (camera): the lens moves to the human's hand at the moment of the decision.
   - *Line-to-horizon* (T08): once the numbers settle, the stave collapses into one line that becomes the horizon of the CTA.
4. **Colour over time.** Coral appears as a tiny "not today" dot in the hook, lands fully on the anomaly, peaks on the coral R keycap (the one shot coral leads), is overtaken by teal when the stave recovers, and returns once for Start free and the coral ↵.
5. **New component.** The **metric stave**: checkout conversion drawn as notes on a five-line musical staff. Barlines are timestamps; the notes after the 09:42 barline fall off the staff onto ledger lines, and the human's keystroke writes its own barline.
6. **Surprise.** The camera drops onto the ⌥ R keycaps at the decision (a scale jump in an otherwise locked-off film).
7. **Did this repeat my last film?** This is the first film in this history; the other five films in the set use other themes.

## Frames

### Frame 1 · Hook
- key visual: a blurred wall of dashboards, the question in serif, two keycaps waiting
- moves first: ⌘ then K keycaps press (translateY 10 px, 80 ms), the palette springs from 96 % scale
- on-screen words: "How many dashboards today?"
- beat hook: K lands on the kick at 0.75 s; the last letter of "dash" and the "38 results" count land together at 1.75 s

### Frame 2 · Reveal
- key visual: the palette's top row expands into the Acme Pulse lockup
- moves first: the query retypes as "pulse" with coral fuzzy matches, the rows re-rank
- on-screen words: "pulse", "Acme Pulse"

### Frame 3 · Proof moment
- key visual: inside the Pulse scope, "Checkout conversion −18%" · "since 09:42" above "Roll back deploy #2231"; the human strikes ⌥ R
- new component: metric stave
- moves first: the anomaly drops in from above; the playhead sweeps the stave

### Frame 4 · CTA
- key visual: "You ship. *Pulse watches.*" above a three-row palette whose selected row is Start free, with a coral ↵ keycap
- loop note: not a loop; the last 0.8 s holds still
