# Changelog

## v1.3: hardware ads, for software (2026-10-04)

**Added**
- A new gallery family, **hardware-ad grammar**: minimal hardware product ads translated into films for software. Its first theme is `101 Noise Cancelling` (`docs/themes/101-noise-cancelling.html`, `data/101.json`, `thumbs/101.jpg`). 38 dashboards hum as hairline waveforms, the product opens a quiet zone, and one signal breaks a cut to true silence.
- `examples/spec-apple-tv-tr/`: an unofficial spec film about Apple TV's official launch in Türkiye (September 2026), told in 101's grammar and redesigned for the living room. It runs 24 s at 16:9 with Turkish copy and a new component, the play line. Its brief lists every stated fact with sources. The film carries a "KONSEPT · RESMÎ DEĞİL" tag on every frame and a full disclaimer on the end card, and it uses no Apple logos, typefaces or show artwork. The render is on the v1.3 release.
- `examples/spec-apple-tv-tr/score.py`: a seeded numpy score (noise build, a hard cut to digital silence, calm notes, silence again at the end) that needs no samples and no music licence.
- `docs/spec-apple-tv-tr.jpg`: four key frames for the README.

**Changed**
- `tools/build_gallery.py`: the new family has its own filter, and the page title and headline count the themes instead of hardcoding 100.
- `tools/make_thumbs.py`: `--only NNN` renders just the listed thumbnails.
- `docs/themes/_template.html`: the back link no longer hardcodes the theme count.
- The READMEs lead with v1.3 and fold the v1.2 notes underneath. They also note that the spec film is the only example that names a real product.

## v1.2: same story, six films (2026-09-26)

**Added**
- `examples/six-films/`: one 12-second Acme Pulse script built in six gallery themes (002, 021, 058, 061, 075, 089). Each film has its tone sentence, a ledger that passes the variety audit, its own new component and a README. The folder also holds the shared `BRIEF.md` and a synced 3×2 grid GIF (`docs/six-films.gif`). The renders are on the v1.2 release.
- `tools/pick_themes.py`: shortlists themes for a tone and an audience, and skips the themes of your last five films.
- `tools/history_report.py`: a one-page HTML report of your motion history, with the transitions and themes to try next.
- `.github/workflows/variety-audit.yml`: runs the variety audit on every `STORYBOARD.md` on push and pull request. It also compiles the tools and smoke-tests the theme picker.
- The repository is now a GitHub template (**Use this template**).
- The v1.2 release has an Acme Suite v1-vs-v2 comparison clip.

**Changed**
- `variety_audit.py --append` takes `--theme NNN` (repeatable) and records it in the history.
- The `/saas-motion-video` skill starts stage 3 from `pick_themes.py` and records the theme at delivery. `playbook/03-theme.md` and `creative/README.md` show the new tools.
- The README's "What's new" moved to v1.2; the v1.1 notes are folded underneath.

## v1.1.1: prompt examples (2026-09-26)

- `examples/prompts/`: the exact prompt behind a finished 35 s mascot product promo (1:1, music + SFX), plus a fill-in template and a gate-by-gate account of what happened.

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
