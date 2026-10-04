# Storyboard — Acme Pulse · Over-the-Shoulder Dive

Format: human layer, over-the-shoulder dive ([creative/human-layer.md](../../creative/human-layer.md)) · 1920×1080 · 27 s · 30 fps · Sound: room tone from the generated plates; score to come

## Message & tone
- **Sentence:** I want to say "Pulse watches the metrics so the person on call can stop watching tabs, and the decision stays theirs" in a warm, quietly reassuring tone, so the viewer recognises the 23:40 feeling and then the relief.
- **Tone arc:** mysterious → trustworthy → technical → premium → warm → calm → warm → calm
- accent: coral
- **Motif:** the screen. We look at it over Deniz's shoulder, dive into it, learn inside it, and leave through it to see the face it lights.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 4.0 | hook | mysterious | plate-fade | push-through | sine.inOut | center | ink+amber | locked over-the-shoulder | S01 plate, tracked screen, tab chaos, toasts | tracked-screen | room tone, phone buzz | REAL S01: Deniz, on call, 23:40; the laptop shows 38 tabs of noise |
| 2 | 0:04 | 4.2 | proof | trustworthy | screen-takeover | exploded-split | expo.in | radial | paper+teal | dive into the screen, then a 3D tilt | step chips, source tiles, Pulse window | | | step 1: six sources fly into the window and become rows |
| 3 | 0:08.2 | 3.0 | proof | technical | layer-explode | object-carry | power3.inOut | bottom-up | paper+teal | exploded view, slow orbit | window layers, scanline, callouts | | | step 2: base, Pulse and alert layers separate; the scan passes; they settle |
| 4 | 0:11.2 | 2.2 | proof | premium | coral-row | match-cut | power3.out | left-right | coral+paper | slow push | anomaly row, context line, Roll back | | | step 3: checkout −18% since 09:42 after deploy #2231 asks for a human |
| 5 | 0:13.4 | 1.2 | proof | warm | hard-cut-in | ripple-match | none | top-down | ink+skin | locked macro | S02 insert | | trackpad tap | surprise: the real finger taps; the tap becomes the UI ripple on Roll back |
| 6 | 0:14.6 | 1.4 | proof | calm | ripple | dolly-out-reveal | power2.out | radial | paper+teal | locked | fixed row, recovered sparkline | | | the row turns teal; the line recovers |
| 7 | 0:16 | 5.5 | resolve | warm | dissolve-in | crossfade | sine.out | center | ink+amber | slow settle 1.12→1 | S03 close-up, caption | | room tone | REAL S03: relief, the lid closes, the screen light leaves the face |
| 8 | 0:21.5 | 5.5 | cta | calm | lockup-rise | end | expo.out | center | paper+coral | locked | lockup, tagline, Start free, AI credit | | | the credit says the people are AI-generated characters |

## The seven questions (answer before you build)
1. **What do I want to say, and in what tone?** The sentence above. Warm, not urgent: the night is already long, so the film itself shouldn't shout.
2. **Is anything repeating?** Audit clean (see README). The screen is the declared motif.
3. **What does each transition mean?**
   - plate → tutorial, **push-through**: we stop watching Deniz and go where Deniz is looking.
   - step 1 → 2, **exploded split**: the window opens to show what is inside it.
   - step 2 → 3, **object carry**: the same window settles and carries the problem row forward.
   - step 3 → finger, **match cut**: the decision moves from the interface to a person.
   - finger → UI, **ripple match**: the tap becomes the click.
   - UI → face, **dolly-out reveal**: we leave the screen and see who it was for.
4. **What are the colours doing over time?** Amber night and noisy greys in the plate, paper and teal inside the product, a single coral row, then amber again on the face, and coral once more for the CTA.
5. **Which component have I never made before?** The **tracked screen**: the real product UI pinned onto a generated plate's green screen, frame by frame, with `tools/screen_track.py`.
6. **Where is the surprise?** 13.4 s: a real finger enters a film that has been all interface for nine seconds.
7. **Did this repeat my last film?** It is the first human-layer film; the tutorial grammar is new for the kit.

## Frames

### Frame 1 · Hook (0–4 s)
- key visual: Deniz from behind, lamp-lit, the laptop showing 38 tabs and three alert toasts
- moves first: the toasts, one by one; the phone buzzes in the plate
- on-screen words: "DENIZ · ON CALL · 23:40"

### Frame 2 · Reveal (4–5.4 s)
- key visual: the camera pushes through the screen until the product fills the frame
- moves first: plate and screen scale together around the screen's centre (`expo.in` 1.3 s)

### Frame 3 · Proof moment (5.4–16 s)
- key visual: a three-step tutorial in 3D — connect, watch, decide — then a real finger presses Roll back
- new component: **tracked screen** (see question 5)
- moves first: the step chip, then the headline, then the window

### Frame 4 · CTA (16–27 s)
- key visual: Deniz's face as the screen light leaves it, then the lockup, "You ship. *Pulse watches.*" and Start free
- loop note: not a loop
