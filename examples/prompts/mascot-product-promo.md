# Prompt: mascot product promo (1:1, 35 s)

This is the prompt behind a real 35 s LinkedIn promo made with this kit. The page it used was HubSpot's AEO product page, and the film features an original mascot, "Scout". It's reproduced here as a worked example of the process.

> Unofficial example. This repo is not affiliated with or endorsed by HubSpot. Use your own product URL and your own brand assets.

## Setup (once)

```bash
git clone https://github.com/tugrawork-creator/saas-motion-kit && cd saas-motion-kit
npx skills add heygen-com/hyperframes
```

Open Claude Code in the repo folder, attach your official logo file, and paste the prompt below.

## The prompt (as used)

```text
/saas-motion-video

Let's make a promo video for https://www.hubspot.com/products/aeo

Format & delivery
- 1:1 LinkedIn, 35 seconds. Render at 4K, deliver at 2048×2048.
- On-screen text in English, and as little of it as possible. The story must work without reading.
- Cheerful, curious music plus warm SFX tied to the character's actions. No voiceover.

Story
- Message: "Buyers ask AI first. HubSpot AEO shows how AI sees your brand, and what to do to show up in the answer."
- Opening: a buyer asks an AI chat "what's the best software?", and our brand isn't in the answer.
- Ending: the same answer comes back, and this time our brand is on the list.

Mascot
- Design an original, simple, likeable character that stands for "your brand".
- Don't derive it from the HubSpot logo. You may borrow from the page's icon language.
- Keep the character on screen for the whole film, so the scenes change around it.

Brand & components
- Capture the colours, fonts and icons from the page. The official logo is attached; never redraw it.
- HubSpot's UI is clean, so rebuild its real components (gauge, prompt list, citations, recommendations) in HTML rather than using screenshots.
- Facts only from the page (3 AI engines, 25 prompts, the recommendation types). UI values are illustrative, and competitor names are fictional.

Creative pass (the repo's creative/ rules)
- First write the "I want to say ___ in a ___ tone" sentence and a tone arc.
- Fill the storyboard ledger and get a clean variety_audit.py run:
  - no transition or entrance repeated,
  - at least 3 transition families,
  - a surprise roughly every 15 s,
  - the accent colour leads only at key moments,
  - at least one newly invented component.

Gates
- First propose the plan as a table.
- Then show the static sketch sheet, and don't animate before I approve it.
- In the final frame, the logo and the CTA button share the same width and alignment.
```

## The same prompt as a template

```text
/saas-motion-video

Let's make a promo video for <PRODUCT URL>

Format & delivery
- <1:1 LinkedIn | 16:9 booth loop | 9:16 story>, <length> seconds. Render at 4K, deliver at <size>.
- On-screen text in <language>, as little as possible. The story must work without reading.
- <music + SFX | SFX only | silent>. No voiceover.

Story
- Message: "<one sentence: the pain, and what the product changes>"
- Opening: <the viewer's pain, shown in their own words>
- Ending: <the same moment, resolved: a callback to the opening>

Mascot
- Design an original, simple, likeable character that stands for <who/what>.
- Don't derive it from the logo. You may borrow from the product's icon language.
- Keep the character on screen for the whole film.

Brand & components
- Capture colours, fonts and icons from the page. The official logo is attached; never redraw it.
- <If the UI is clean: rebuild its real components in HTML> <If not: design truthful imaginary components>.
- Facts only from the page. Illustrative values are marked as such, and competitors are fictional.

Creative pass (creative/ rules)
- Write the "I want to say ___ in a ___ tone" sentence and a tone arc.
- Fill the ledger and get a clean variety_audit.py run: no repeated transition or entrance, 3+ transition families, a surprise every ~15 s, the accent only at key moments, at least one new component.

Gates
- Plan as a table → static sketch sheet → animate only after approval.
- <Any layout rule you care about, e.g. logo and CTA share the same width and alignment>
```

## What happened behind the scenes

1. **Brief:** Claude asked three questions (format, language, sound) and wrote `BRIEF.md`.
2. **Capture:** HyperFrames captured the page: the plum + orange palette, HubSpot Serif and Sans, the official logo, and the icon language (rounded strokes ending in a dot).
3. **Storyboard + creative pass:** a 7-scene plan with a tone arc (mysterious → bold → trustworthy → celebratory). The ledger went through `variety_audit.py`, and its one warning (a tone mismatch) was fixed. The result has 6 cuts with 6 different transitions: the mascot's antenna dot floods the frame, a gauge is carried from scene to scene, and the orange "Your brand" row turns into the CTA button.
4. **Sketch approval:** the mascot and all 7 frames were approved as a static sheet. The only revision: align the logo and the CTA button.
5. **Build:** one HyperFrames composition, every beat on a seek-safe GSAP timeline, rendered at 4K.
6. **Sound:** locally generated music (MusicGen, CC-BY-NC, so swap in licensed music for commercial use) plus 69 synthesised SFX cues, mixed to −14 LUFS and downscaled to 2K.
