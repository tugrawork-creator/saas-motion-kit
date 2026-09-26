# Variety rules

These are the repetitions that make motion feel generated. Rules marked **[audit]** are checked by `tools/variety_audit.py` from the storyboard ledger. The rest need your eyes.

## Transitions
- **[audit]** Never use the same transition on two consecutive cuts.
- **[audit]** No transition more than twice in a film under 60 s, unless it's marked `motif:`.
- **[audit]** At least **three different transition families** (cut, carry, camera, mask, material, time) in any film with five or more cuts.
- **[audit]** At least one **narrative** transition (cut / carry / camera / mask). "Fade" and "push" alone don't count.
- Every transition must answer "why this one here?" in a few words: continuity, contrast, cause → effect, zoom to detail, time passing.

## Entrances & eases
- **[audit]** Don't use the same text entrance (e.g. `rise+fade`) for more than two headlines in a row.
- **[audit]** Use at least three different eases across the film. No single ease on more than half the rows.
- **[audit]** Alternate entrance directions. Three "from bottom" in a row is a pattern the viewer notices.
- Inside one shot, stagger elements with **different** eases and directions (headline `expo.out` from below, chips `power2.out` from the left, the icon scaling from its centre).

## Rhythm
- **[audit]** Shot lengths must vary: flag if more than 60 % of shots have the same duration (±0.25 s).
- **[audit]** Place a **surprise** at least every 15 s: a row marked `surprise:` (a scale jump, a medium change, a freeze, silence).
- Let the music or the story set the cut points, not a fixed grid.

## Colour
- **[audit]** Keep the accent colour special: it should lead in no more than one third of the shots.
- **[audit]** No more than two accent colours in one shot.
- Plan one **colour event** per act: the first time the accent floods the frame should mean something (the reveal, the fix, the CTA).
- The background can change once or twice per film. Every shot on the same flat background feels like slides.

## Components
- **[audit]** Every film has **at least one new component** (a row with `new_component` filled).
- **[audit]** Don't repeat a component your recent films already used (`--history`) without writing why.
- Reskinning isn't inventing: a new colour on an old card is still the old card.

## Cross-film (with `--history`)
- **[audit]** Items used in your last three films are flagged as "recent": transitions, new components, signature eases, palettes.
- Keep a personal "retired" list: effects you promise not to use for a while.

## Allowed repetition (motifs)
Prefix a value with `motif:` to tell the audit that the repeat is deliberate, for example `motif:logo-dot-return`. A good motif appears two or three times, means the same thing each time, and **evolves**: bigger, faster, or changed in colour on its last appearance.
