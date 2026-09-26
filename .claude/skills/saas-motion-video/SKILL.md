---
name: saas-motion-video
description: Make a promo / motion video for a software product with HyperFrames, using the saas-motion-kit 7-stage process (brief → components → theme → storyboard → build → sound → deliver), the clean-or-imaginary component rule, the creative muscle (tone matrix, variety rules, component forge, transition atlas, variety audit) and the 100-theme gallery in docs/. Use when someone asks for a launch video, product promo, booth loop, feature reveal or social motion piece for an app, SaaS or developer tool.
---

# saas-motion-video

You are the producer. The user is the creative director. Run the stages in order and **stop at every gate** for a human decision. Keep the user's taste in the loop; that is what makes the film feel human-made.

**The one rule of this kit: no two films should feel like the same film.** Don't repeat effects, transitions or components (within the film, or from the user's recent films). Invent at least one new component per film. Decide the message and the tone before choosing any effect. Read `creative/README.md` before stage 4.

## Before starting
- The HyperFrames skills must be installed (`npx skills add heygen-com/hyperframes`). If `/hyperframes` is not available, ask the user to install them and restart the session.
- Read `playbook/README.md`. Read each stage file when you reach that stage.

## Stages

1. **Brief** (`playbook/01-brief.md`). Ask at most four questions: the one message, the channel/format, the sound (music, SFX, voice or silent) and the truth source (a URL or docs). Write `BRIEF.md` from `templates/BRIEF.md`. **Gate:** the user confirms the brief.
2. **Components** (`playbook/02-components.md`, `components/README.md`). If there is a URL, run `npx hyperframes capture`. Score the real UI and propose, per component, *real* or *imaginary*. Never invent capabilities, customers or statistics. **Gate:** the user approves the inventory.
3. **Theme** (`playbook/03-theme.md`). Suggest 2–3 themes from `docs/themes/data/*.json` that fit the audience (read their `summary`, `fit` and `best_for`). Redraw each candidate's proof-moment frame in the user's brand as a quick HTML still. **Gate:** the user picks one.
4. **Storyboard + creative pass** (`playbook/04-storyboard.md`, `creative/`). Write `STORYBOARD.md` from `templates/STORYBOARD.md`: first the **Message & tone** sentence ("I want to say ___ in a ___ tone, so the viewer feels ___"), then the **ledger** (one row per shot: entrance, transition, ease, direction, palette, camera, components, new component, sfx, notes), then the frames. Choose craft from `creative/tone-matrix.md`, transitions from `creative/transition-atlas.md` (plus HyperFrames' stock set), and forge at least one new component with `creative/component-forge.md`. Run `python tools/variety_audit.py STORYBOARD.md --history ~/.motion-ledger.json` and fix every warning, or mark a deliberate repeat as `motif:`. Then draw a one-page sketch sheet. Keep on-screen words to a minimum. **Gate:** the audit is clean (or every remaining warning is explained), and the stills read as a story with the sound off.
5. **Build** (`playbook/05-build.md`). Hand off to the HyperFrames workflow (`/product-launch-video` for a URL-driven promo, `/general-video` for loops and custom pieces). Keep every frame seek-safe and deterministic. Run `lint`, `snapshot` and `check`. **Gate:** the user approves the preview.
6. **Sound** (`playbook/06-sound.md`). Music-driven: build a beat grid first and cut on bars. SFX: use warm tuned timbres (`tools/warm_sfx.py`). Silent is a valid choice. **Gate:** the user approves the mix.
7. **Deliver** (`playbook/07-deliver.md`). Render at 4K, then run `tools/deliver.sh` to downscale. For loops, run `tools/loop_check.py`. Report the actual duration, size and path. Record the film so the next one avoids it: `python tools/variety_audit.py STORYBOARD.md --history ~/.motion-ledger.json --append "<film>"`. **Gate:** the user checks it on the target screen.

## Hard rules
- Official logos only. Never redraw a brand mark.
- For non-Latin characters, bundle `latin-ext` font subsets locally. Write uppercase text yourself instead of relying on CSS `text-transform` (which breaks Turkish i/İ).
- No progress bars, no gradient text, no pure #000/#fff, no bounce or elastic easing on UI.
- Fewer words. If the story needs reading, redesign the frame.
- Every transition must answer "why this one, here?". No transition twice in a row, at least three transition families, one surprise every ~15 s.
