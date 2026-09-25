---
name: saas-motion-video
description: Make a promo / motion video for a software product with HyperFrames, using the saas-motion-kit 7-stage process (brief → components → theme → storyboard → build → sound → deliver), the clean-or-imaginary component rule and the 100-theme gallery in docs/. Use when someone asks for a launch video, product promo, booth loop, feature reveal or social motion piece for an app, SaaS or developer tool.
---

# saas-motion-video

You are the producer. The user is the creative director. Run the stages in order and **stop at every gate** for a human decision. Keep the user's taste in the loop; that is what makes the film feel human-made.

## Before starting
- The HyperFrames skills must be installed (`npx skills add heygen-com/hyperframes`). If `/hyperframes` is not available, ask the user to install them and restart the session.
- Read `playbook/README.md`. Read each stage file when you reach that stage.

## Stages

1. **Brief** (`playbook/01-brief.md`). Ask at most four questions: the one message, the channel/format, the sound (music, SFX, voice or silent) and the truth source (a URL or docs). Write `BRIEF.md` from `templates/BRIEF.md`. **Gate:** the user confirms the brief.
2. **Components** (`playbook/02-components.md`, `components/README.md`). If there is a URL, run `npx hyperframes capture`. Score the real UI and propose, per component, *real* or *imaginary*. Never invent capabilities, customers or statistics. **Gate:** the user approves the inventory.
3. **Theme** (`playbook/03-theme.md`). Suggest 2–3 themes from `docs/themes/data/*.json` that fit the audience (read their `summary`, `fit` and `best_for`). Redraw each candidate's proof-moment frame in the user's brand as a quick HTML still. **Gate:** the user picks one.
4. **Storyboard** (`playbook/04-storyboard.md`). Write `STORYBOARD.md` (Hook → Reveal → Proof moment → CTA) and a one-page sketch sheet. Keep on-screen words to a minimum. **Gate:** the stills read as a story with the sound off.
5. **Build** (`playbook/05-build.md`). Hand off to the HyperFrames workflow (`/product-launch-video` for a URL-driven promo, `/general-video` for loops and custom pieces). Keep every frame seek-safe and deterministic. Run `lint`, `snapshot` and `check`. **Gate:** the user approves the preview.
6. **Sound** (`playbook/06-sound.md`). Music-driven: build a beat grid first and cut on bars. SFX: use warm tuned timbres (`tools/warm_sfx.py`). Silent is a valid choice. **Gate:** the user approves the mix.
7. **Deliver** (`playbook/07-deliver.md`). Render at 4K, then run `tools/deliver.sh` to downscale. For loops, run `tools/loop_check.py`. Report the actual duration, size and path. **Gate:** the user checks it on the target screen.

## Hard rules
- Official logos only. Never redraw a brand mark.
- For non-Latin characters, bundle `latin-ext` font subsets locally. Write uppercase text yourself instead of relying on CSS `text-transform` (which breaks Turkish i/İ).
- No progress bars, no gradient text, no pure #000/#fff, no bounce or elastic easing on UI.
- Fewer words. If the story needs reading, redesign the frame.
