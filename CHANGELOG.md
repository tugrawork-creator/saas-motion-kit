# Changelog

## v1.3: hardware ads, for software (2026-10-04)

**Added**
- A new gallery family, **hardware-ad grammar**: minimal hardware product ads translated into films for software. Its first theme is `101 Noise Cancelling` (`docs/themes/101-noise-cancelling.html`, `data/101.json`, `thumbs/101.jpg`). 38 dashboards hum as hairline waveforms, the product opens a quiet zone, and one signal breaks a cut to true silence.
- `docs/theme-101.jpg`: theme 101's four key frames for the README.
- `creative/human-layer.md`: the human layer. Every shot with a fictional, generated person also has a 3D move and a product beat. It covers five formats, truth rules (actors, never customers or testimonials; an AI credit on the end card), the fal pipeline and compositing rules.
- `examples/human-layer-ots/`: the pilot, Over-the-Shoulder Dive (27 s, 16:9). It includes a fal `shots.json`, `CAST.md`, `placeholders.py` stand-in plates and a composition that pins the real Pulse UI onto the plate's screen with a per-frame homography.
- `tools/fal_shots.py`: runs a shot list on fal's queue API, chaining outputs, caching results and downloading media. It uses only the standard library.
- `tools/screen_track.py`: tracks a green screen frame by frame (tested at 1.3 px mean error) and writes its corners for HyperFrames.
- `.gitignore`: `assets/footage/` stays local.

**Changed**
- `tools/build_gallery.py`: the new family has its own filter, and the page title and headline count the themes instead of hardcoding 100.
- `tools/make_thumbs.py`: `--only NNN` renders just the listed thumbnails.
- `docs/themes/_template.html`: the back link no longer hardcodes the theme count.
- The READMEs lead with v1.3 and fold the v1.2 notes underneath, and the theme counts and family table include 101.

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
