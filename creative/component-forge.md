# Component forge: invent one new component per film

A component is any visual unit that carries meaning: a card, a meter, a character, a machine, a ritual. Kits run dry because people only pick from them. This page is about **making** components.

**Rule:** every film ships at least one component you have never made before. Log it in the ledger (`new_component`) and it enters your history.

## The 15-minute recipe

**1. Verb.** What does the product *do* in the proof moment? Pick one verb.
> audits · reconciles · forecasts · syncs · approves · protects · translates · schedules · warns · untangles

**2. Metaphor.** What physical thing or ritual does that verb in the real world? List five, keep the least obvious one that is still instantly readable.
> audits → a proofreader's red pen · airport X-ray belt · a sommelier tasting · a metal detector · **a lighthouse beam**

**3. Primitive.** Which UI primitive will carry it? (card, row, chip, meter, chart, cursor, toast, avatar, timeline, map, document)
> lighthouse beam + **table rows**

**4. Twist.** One unexpected property that makes it memorable: a material, a physics rule, a character trait, a scale change.
> the beam **leaves rows glowing** where it passed, and the row with the problem **refuses to glow**

**5. Truth check.** Does it show something the product really does? Is the data demo-scale and plausible? Could a customer point at the real feature?

**6. Motion signature.** Give it one motion only it has (not a generic fade), and write it down in the ledger.
> rows light up in a sweep at `steps(12)`, and the faulty row flickers twice, then turns coral

## Forge prompts (combine any two)

| Axis | Prompts |
|---|---|
| **Material** | paper, clay, glass, neon tube, thread, liquid, sand, LEGO-like bricks, receipt paper, magnets |
| **Physics** | gravity piles, springs, magnetism, conveyor belt, pendulum, domino chain, balance scale, pressure gauge |
| **Character** | a UI element with eyes · a tired spreadsheet · a boss enemy made of the old process · a helpful drone · a sticker that peels off |
| **Scale** | macro (one pixel, one digit) · micro-world diorama · city made of dashboards · a planet of tasks |
| **Ritual** | stamping, signing, sealing, weighing, sorting mail, tuning an instrument, a relay-race hand-off |
| **Game** | item boxes, health bars, level map, boss fight, combo counter, achievement toast, save point |
| **Data** | a chart that becomes a landscape · numbers that fall like rain · a diff as a road with lanes · a heatmap as weather |

## Examples of forged components

| Product verb | Component | Why it works |
|---|---|---|
| flags anomalies | **Lighthouse rows**: a beam sweeps a table, the faulty row stays dark | the metaphor is readable in one second, and "the one that doesn't light up" is the story |
| replaces a manual process | **Boss enemy made of the old process** (paper wings, calculator belly) with a health bar | the pain becomes a character the viewer wants beaten, with no text needed |
| organises chaos | **Item boxes → heap → four tidy stacks** with ticks | before and after in one continuous shot |
| syncs across devices | **Beads on an orbit** travelling between a cloud and a window | the motion *is* the sync |
| forecasts | **Bars that grow only when they face the camera** | attention creates the forecast, a small magic trick |

## Anti-patterns
- A new colour on an old card ("reskin") isn't a new component.
- A metaphor that needs a caption to explain it. If it needs the caption, pick the next metaphor on your list.
- A component that implies a capability the product doesn't have.
