# Changelog

## v1.1: the creative muscle (2026-09-26)

The kit's one rule is now explicit: **no two films should feel like the same film.**

**Added**
- `creative/`: the seven storyboard questions, the tone matrix, the variety rules and the component forge.
- Transition atlas: 24 narrative transitions with live demos (`docs/transitions/`, source in `docs/transitions/data.json`, markdown in `creative/transition-atlas.md`).
- `tools/variety_audit.py`: audits a storyboard ledger for repetition and tone mismatches. `--history` / `--append` remember your previous films.
- `examples/acme-suite-loop/STORYBOARD.v1.md` (the audited first draft, 11 warnings) and `STORYBOARD.md` (v2, clean).

**Changed**
- `templates/STORYBOARD.md` opens with a Message & tone block and a one-row-per-shot ledger.
- The `/saas-motion-video` skill runs a creative pass (tone sentence, ledger, variety audit, one new component) before any build, and records the film in the history at delivery.
- The Acme Suite example was rebuilt to v2. Each product has its own entrance and turn, the shot lengths are uneven, and Forecast gets a colour-flood-plus-dolly surprise. The render is attached to the v1.1 release.

## v1.0: first release (2026-09-25)

- 7-stage playbook, clean-or-imaginary component rule, 100-theme gallery, `/saas-motion-video` skill, templates, delivery tools, and the Acme Suite 3D booth-loop example.
