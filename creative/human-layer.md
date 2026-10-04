# The human layer

People make a product film feel like it's about someone. The kit's films have been all interface so far. The human layer brings generated footage of fictional people into them without leaving what the kit is good at.

**The rule: every shot that has a person in it also touches the other two corners of the triangle.**

```
              a person (connection)
                   ▲
                  / \
                 /   \
   3D motion ◀──┘     └──▶ the product teaches one step
```

A face with no product beat is a stock-footage ad. A tutorial with no face is the film we already make. Keep both, plus a camera or 3D move that carries the viewer from one to the other.

## Five formats

| Format | What happens | Generate with (fal) |
|---|---|---|
| **Over-the-shoulder dive** | We watch a person's screen over their shoulder. The screen is the real product UI, pinned onto a green screen in the plate. The camera pushes through it into a 3D, step-by-step tutorial, then pulls back out to their face. **Pilot: [`examples/human-layer-ots`](../examples/human-layer-ots).** | Seedance 2.0 / Kling O3 image-to-video from a locked-off still, plus `tools/screen_track.py` |
| **Portal cards** | Metric cards are windows. Inside the checkout card is the customer whose cart just failed. Their matte steps out of the card into 3D space (out of bounds), and the fix brings them back. | Seedance 2.0 image-to-video + Bria video background removal |
| **Hand to interface** | A real hand reaches toward camera, and its last frame lands on a 3D UI card. The tap match-cuts to the click. | Kling O3 Pro with start and end frames |
| **Diorama presenter** | A small, background-removed presenter walks across a giant 3D UI and points at features while talking. | Veo 3.1 or HeyGen Avatar (lip-sync) + matting |
| **Metric on the face** | A close-up. The anomaly reflects in their glasses, and the fix shows as relief on their face. | Seedance 2.0 + a reflection composite |

## Truth rules (they extend the clean-or-imaginary rule)

1. **Generated people are actors, not customers.** They may act out how the product is used. They may never vouch for it: no names with quotes, no "customer story", no testimonial.
2. **Never a real person's likeness**, not even "in the style of" someone.
3. **Say so in the film.** The end card carries a line: "The people in this film are AI-generated characters."
4. **The product shown is still the product.** The screen in a plate is our HTML UI, never a generated imitation of it. Generated pixels never show a feature.

## Pipeline

1. **Cast card.** Generate one character reference sheet with Nano Banana 2 (front, three-quarter, back, face) and write the wardrobe and props into `CAST.md`. Every later still is an edit of this card, so the person stays the same person.
2. **Stills.** Make the first (and, for Kling, the last) frame of each shot with Nano Banana 2 edit, using the cast card as the reference. Lock the composition here, because the video model will keep it.
3. **Clips.** Use image-to-video with a locked-off camera unless the shot is the camera move. Seedance 2.0 is the default; use Kling O3 Pro when the end frame must land exactly (taps, hand-offs).
4. **Plates for UI.** When a screen must show the product, generate it as flat `#00FF00`. Run `tools/screen_track.py` to get its corners for every frame, and pin the HTML UI onto it with a `matrix3d` (see the pilot's `index.html`).
5. **Mattes.** When a person must stand in front of 3D UI, remove the background with Bria's video background removal, and composite the alpha clip in HyperFrames.
6. **Run it all from a shot list.** `tools/fal_shots.py shots.json` submits every step to fal's queue, chains outputs (`"@cast"`), caches results and downloads them into `assets/footage/`. Use `--dry-run` first, and compare against the endpoint pages, because schemas change.

## Compositing rules

- **Lock the camera** in generated plates. The tracker follows drift, not moves. Make every camera move in HyperFrames, where it's exact and seek-safe.
- **Overscan the screen by about 3 %** so no green fringe shows. Match the UI's brightness to the plate: a laptop at night is not a white page.
- **Cut on actions.** Enter and leave the real footage on a gesture (a tap, a lid closing, a breath), never on dead air.
- **Trim with `data-media-start`**, so the moment you need lands on the beat. Keep each `<video>` a direct child of the root, because HyperFrames times nested videos wrongly.
- **Keep footage out of git.** `assets/footage/` is ignored. Each film keeps its `shots.json`, which is enough to regenerate it, plus a `placeholders.py` so the cut previews before any footage exists.

## Models used here (checked on fal.ai, 2026-10-04)

| Job | Endpoint |
|---|---|
| Character card, stills | `fal-ai/nano-banana-2`, `fal-ai/nano-banana-2/edit` |
| Image to video (default) | `bytedance/seedance-2.0/image-to-video` |
| Image to video with an exact end frame | `fal-ai/kling-video/o3/pro/image-to-video` |
| Video background removal | `bria/video/background-removal` |

References: [best image-to-video APIs 2026](https://fal.ai/learn/tools/best-image-to-video-apis-2026) · [Seedance 2.0 image-to-video](https://fal.ai/models/bytedance/seedance-2.0/image-to-video) · [Kling O3 Pro API](https://fal.ai/docs/model-api-reference/video-generation-api/kling-video-o3-pro-image-to-video) · [Nano Banana 2 edit](https://fal.ai/models/fal-ai/nano-banana-2/edit/api) · [Bria video background removal](https://fal.ai/models/bria/video/background-removal) · [fal queue API](https://docs.fal.ai/model-apis/model-endpoints/queue)
