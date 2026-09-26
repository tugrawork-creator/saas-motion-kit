# 4 · Storyboard

Four beats carry almost every software promo:

| Beat | Job | Typical length |
|---|---|---|
| **Hook** | the viewer's pain, in their words | 0–8 s |
| **Reveal** | the product arrives, on the musical drop | ~1 s moment |
| **Proof moment** | the product doing its one job, with a human deciding | 12–20 s |
| **CTA** | lockup, one line, one action | 6–9 s |

Write `STORYBOARD.md` from [`templates/STORYBOARD.md`](../templates/STORYBOARD.md). Each frame gets its duration, the key visual, what moves first and the on-screen words, which should be as few as possible. Ask for a sketch page (one still per frame) and review the stills, not the prose.

## The creative pass (mandatory)

Before the sketch page, do the creative pass from [`creative/`](../creative):
1. Write the **Message & tone** sentence at the top of `STORYBOARD.md`.
2. Fill the **ledger**: one row per shot, with the entrance, transition, ease, direction, palette, camera, components, new component and sfx.
3. Run `python tools/variety_audit.py STORYBOARD.md --history ~/.motion-ledger.json`. Fix what it flags or mark deliberate repeats as `motif:`.
4. Make sure at least one row has a `new_component` from the [component forge](../creative/component-forge.md), and a `surprise:` at least every ~15 s.

**Gate:** the audit is clean, and the sketch page reads as a story with the sound off.

**Checks**
- Can a viewer follow it without reading? Cut words until they can.
- Is there one frame you'd screenshot and share? That's your proof moment. Protect its time.
- Does every frame have a focal point and at least one element moving?
