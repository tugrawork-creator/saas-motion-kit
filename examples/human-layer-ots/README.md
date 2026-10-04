# Acme Pulse · Over-the-Shoulder Dive (human layer pilot)

**Format:** [human layer](../../creative/human-layer.md), over-the-shoulder dive · 1920×1080 · 27 s · 30 fps

The first kit film with people in it. We watch Deniz, on call at 23:40, over their shoulder. The laptop shows the real Acme Pulse UI, pinned frame by frame onto a generated plate. The camera pushes through the screen into a three-step 3D tutorial (connect, watch, decide). A real finger taps Roll back, and we pull back out to Deniz's face as the screen light leaves it.

The people are generated with fal, and nothing generated is committed. `shots.json` describes every shot, so the footage can be regenerated. `placeholders.py` writes stand-in plates, so the cut previews and renders before any footage exists.

## Make it

```bash
# 1. stand-in plates (no keys needed), or skip to 2 if you have a FAL_KEY
python placeholders.py

# 2. generate the real shots on fal (FAL_KEY in the environment; network access to queue.fal.run and the fal media CDN)
python ../../tools/fal_shots.py shots.json --dry-run      # compare with each endpoint's API page first
python ../../tools/fal_shots.py shots.json                # cast card → stills → clips, into assets/footage/

# 3. find the green screen in the plate, every frame
python ../../tools/screen_track.py assets/footage/s01-ots.mp4 assets/footage/s01-screen.js --var S01_SCREEN

# 4. check and render
npx hyperframes check --timeout 180000
npx hyperframes render --quality delivery --resolution landscape-4k --output renders/film-2160.mp4
```

## Shots

| shot | slot | what | how |
|---|---|---|---|
| S01 | 0–5.4 s | over the shoulder, a locked-off plate with a green screen; Pulse UI tracked onto it, then the push-through | Nano Banana 2 still → Seedance 2.0 image-to-video, `tools/screen_track.py` |
| — | 5–16 s | the tutorial in 3D: six sources become rows, an exploded view with the Pulse scan, the coral row and Roll back | HTML/GSAP |
| S02 | 13.4–14.7 s | a real finger taps the trackpad; the tap becomes the UI ripple | Kling O3 Pro with start and end frames, trimmed with `data-media-start` |
| S03 | 15.9–21.9 s | close-up: relief, the lid closes, the screen light leaves the face | Seedance 2.0 image-to-video |
| — | 21.6–27 s | lockup, "You ship. *Pulse watches.*", Start free, and the AI credit | HTML/GSAP |

## New component: tracked screen
The product's real HTML UI is pinned onto the green screen of a generated plate. `tools/screen_track.py` finds the screen's four corners in every frame and smooths them. The composition turns each frame's quad into a CSS `matrix3d` homography, so the UI follows the plate's drift exactly and stays crisp at 4K. Generated pixels never show the product.

## Variety audit
```
variety audit · examples/human-layer-ots/STORYBOARD.md · 8 shots
  [info] transitions: 7 cuts · families {'camera': 2, 'mask': 1, 'carry': 1, 'cut': 2, 'stock': 1}
  => no repetition found. Now go check it with your eyes.
```

## Verified with the stand-in plates
`hyperframes check` passes (runtime 0, layout 0 issues, contrast 18/18 AA), and a draft render shows the screen pinned to the drifting plate with no green fringe. `screen_track.py` was also tested on a synthetic plate with known corners: mean error 1.3 px, worst case 4 px, which the 3 % overscan covers.

Cast and truth rules: [CAST.md](CAST.md) · Brief: [BRIEF.md](BRIEF.md)
