# Creative muscle

> **The one rule of this kit: no two films should feel like the same film.**
> Don't repeat effects, transitions or components. Don't be afraid to invent a new component. Decide the message and the tone before you decide anything else.

Tools make it easy to produce motion. They also make it easy to produce *the same* motion: a fade-up title, a push transition, a card grid, the same ease on everything. Viewers read that sameness as "AI-made", even when they can't say why.

This folder is about the habit that prevents it: before and during every storyboard, **stop and ask yourself questions** the way a good motion director does.

## The seven questions (ask them at every storyboard)

| # | Question | What a good answer looks like |
|---|---|---|
| 1 | **What exactly do I want to say, and in what tone?** | One sentence: *"I want to say ___ in a ___ tone, so the viewer feels ___."* Write it at the top of `STORYBOARD.md`. Then check every choice against it using the [tone matrix](tone-matrix.md). |
| 2 | **Is anything repeating?** | Look down the ledger column by column: transitions, text entrances, eases, directions, shot lengths. The same thing twice in a row is almost always laziness. See the [variety rules](variety-rules.md). |
| 3 | **How does each transition carry meaning?** | Every cut should *say* something (continuity, contrast, cause → effect, zoom into detail). If it's only "a way to get to the next slide", pick a narrative one from the [transition atlas](transition-atlas.md). |
| 4 | **What are the colours doing over time?** | Colour is a timeline too. Where does the accent first appear? Is there one "colour event" per act, or is the accent everywhere and therefore nowhere? |
| 5 | **Which component have I never made before?** | Every film ships **at least one new component**. It can't be a reskin of an old one. Use the [component forge](component-forge.md). |
| 6 | **Where is the surprise?** | Roughly one moment every 10–15 s that breaks the pattern the viewer has just learned: a change of scale, a change of medium, a hard stop, silence. |
| 7 | **Did this repeat my last film?** | Compare with your history (`tools/variety_audit.py --history`). What you used in your last three films goes to the back of the queue. |

## The loop

```
write message + tone  →  draft the storyboard ledger  →  run the variety audit
        ↑                                                          │
        └──── swap the repeats, invent one component, add a surprise ┘
```

1. Fill in the **Message & tone** block and the **ledger table** in [`templates/STORYBOARD.md`](../templates/STORYBOARD.md). There's one row per shot: entrance, transition, ease, direction, palette, camera, component, sound.
2. Run the audit:
   ```bash
   python tools/variety_audit.py STORYBOARD.md --history ~/.motion-ledger.json
   ```
3. Fix what it flags, or write down *why* the repetition is intentional (a **motif**; see below).
4. After delivery, record the film and its theme so the next one avoids them:
   ```bash
   python tools/variety_audit.py STORYBOARD.md --history ~/.motion-ledger.json --append "film-name" --theme 055
   ```
5. Every few films, look at the pattern instead of the single film:
   ```bash
   python tools/history_report.py ~/.motion-ledger.json -o motion-history.html
   ```
   The report shows what you keep reaching for, and lists the atlas transitions and gallery themes you have never used, starting with the least-used families.

To see the rule in practice, watch [Same story, six films](../examples/six-films): one script told in six themes, each with its own component.

## Motif vs. repetition

Repetition isn't always wrong. A **motif** is a repetition you *chose*: a signature element that returns, for example a shape that opens the film and comes back to close it, or a sound that means "problem solved". The difference:

- a motif is **rare** (two or three appearances), **meaningful** (it marks the same idea each time) and **evolving** (it comes back changed);
- a repetition is **default**: it's there because it was the easiest option.

Mark motifs in the ledger (`motif:` prefix) and the audit won't flag them.

## Files

- [tone-matrix.md](tone-matrix.md): message and tone mapped to speed, eases, camera, colour, type, transitions and sound
- [variety-rules.md](variety-rules.md): the anti-repetition rules the audit enforces, and the ones only a human can
- [transition-atlas.md](transition-atlas.md): 24 narrative transitions (the [live demos](https://tugrawork-creator.github.io/saas-motion-kit/transitions/) loop in the browser)
- [component-forge.md](component-forge.md): how to invent a new, truthful component in 15 minutes

## People in the film

When a film needs a person, read [the human layer](human-layer.md). Every shot with a person still has a 3D move and a product beat, and generated people are actors, never customers.

## Learning from other people's films

Study real videos you love with [references](references.md): measure them with `tools/breakdown.py`, borrow the grammar, never the assets, and credit the creators by name and link (`REFERENCES.md`, enforced by the audit).
