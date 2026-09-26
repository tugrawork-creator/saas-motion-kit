# Storyboard — Acme Pulse · 8-Bit Sidekick

Theme: 075 8-Bit Sidekick · Format: 1080×1080 · Length: 12 s · Sound: none (silent; the beat grid is 120 BPM, sprites step at 12 fps)

## Message & tone
- **Sentence:** I want to say "while you're lost in dashboards, Pulse spots the drop, and you make the call" in a playful, nostalgic 8-bit tone, so the viewer feels like Player 1 with a sidekick who has their back.
- **Tone arc:** nostalgic → playful → urgent → trustworthy → celebratory → warm
- accent: coral
- **Motif:** none. The only coral before the anomaly is one blinking bar in the maze: the drop that the player walks past.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.0 | hook | nostalgic | poster-hold | dither-pixel-sort | steps(1) | right | navy+teal+mint | snap-pan, one room per 8th note | dashboard-maze, hud-counter, dialog-box, p1-sprite | | none | poster frame holds 0.5 s; the counter ticks 32 → 38 as the camera snaps room to room; P1 walks past the one room with a coral bar |
| 2 | 0:03 | 1.3 | reveal | playful | drop-3-frames | parallax-slide | steps(3) | down | navy+paper+amber | locked, 1-frame landing shake | pulse-sprite, logo-lockup, player-tags | | none | PLAYER 2 HAS JOINED blinks; Pulse drops in 3 frames with no easing; the lockup slides in on steps(4) |
| 3 | 0:04.3 | 1.45 | proof | urgent | count-slam | rpg-box-wipe | power2.in@12fps | up | coral+navy+teal | parallax arrival, then locked + 1-frame shake | metric-platforms, alert-bang, hud-readout | | none | the checkout platform crumbles (debris under gravity, sampled at 12 fps); the red ! pops two frames later; −18% counts in |
| 4 | 0:05.75 | 2.0 | proof | trustworthy | typewriter-3cpf | freeze-rewind-scrub | steps(4) | center | ink+paper+coral | locked | choice-box, p1-gamepad | p1-gamepad: an 8-bit controller inside the choice box; a real skin-tone thumb comes up from below the frame and presses A = ROLL BACK | none | box opens with a 4-frame vertical wipe that lands on the 6 s downbeat; SINCE 09:42 · DEPLOY #2231 types 3 characters per frame and pauses on the dot; the cursor blinks on ROLL BACK until the thumb presses A at 7.5 s; ROLL BACK flashes twice, then a 3-frame freeze |
| 5 | 0:07.75 | 1.25 | proof | celebratory | reverse-scrub | match-cut-motion | expo.out@12fps | reverse | teal+navy+mint | locked, scanline jitter | rewind-glyph | | none | surprise: ROLL BACK literally rewinds the level for 12 frames (◀◀ ROLLING BACK #2231, scanline jitter): the text un-types, the box closes, −18% counts back, the debris flies back into the platform, which flashes mint; Pulse jumps for joy |
| 6 | 0:09 | 3.0 | cta | warm | tile-wipe | end | back.out@12fps | down | coral+navy+amber | locked | stage-clear, cta-button, hearts, lockup | | none | Pulse's jump continues across the cut and lands next to P1; teal dawn dither on the horizon; START FREE flashes twice; the last 0.8 s is still |

## The seven questions
1. **Say / tone:** the sentence above. Game grammar does the explaining: "!" means noticed, a choice box means *you* decide.
2. **Repeats:** every row has its own entrance, ease and transition family (material → camera → mask → time → cut).
3. **Transition meaning:**
   - *dither* dissolves the old world of dashboards into the night where the new player spawns.
   - *parallax slide* is the side-scroller moving on to the next level, the metrics.
   - *box wipe* hands the screen from the world to the human's decision.
   - *freeze & rewind* is the rollback itself: time runs backwards and undoes the crumble we just watched.
   - *match cut on motion* carries Pulse's jump of joy into the stage-clear screen.
4. **Colour over time:** teal and navy until the anomaly. Coral floods the platform and HUD at 5 s (colour event 1). Mint and teal flash on the rebuilt platform (colour event 2). Coral comes back only for the START FREE button.
5. **New component:** the P1 gamepad with a real thumb pressing A. It's the literal "human presses Roll back".
6. **Surprise:** the rewind at 7.75 s. The film plays backwards for twelve frames (1 s).
7. **Last film:** the only 8-bit film in the set; nothing is borrowed from the other five.

## Frames

### Frame 1 · Hook
- key visual: a maze of 38 dashboard rooms; a tiny lost player, sweating
- moves first: the camera, snapping one room to the right on every 8th note
- on-screen words: DASHBOARDS 38 · SOMETHING DROPPED. BUT WHERE?
- beat hook: the counter reaches 38 on the last snap; the player looks left, right, left

### Frame 2 · Reveal
- key visual: night sky, brick ground, P1 at left, Pulse landing big in the middle
- moves first: PLAYER 2 HAS JOINED blinks, then Pulse drops in three frames
- on-screen words: PLAYER 2 HAS JOINED · ACME PULSE

### Frame 3 · Proof moment
- key visual: metrics as platforms; CHECKOUT crumbles, the ! pops, −18% since 09:42, and a thumb presses ROLL BACK
- new component: P1 gamepad (component forge: verb *decides* → ritual *pressing A* → primitive *choice box* → twist: the thumb comes from outside the frame, the only non-pixel-world object)
- moves first: debris flies up at 12 fps

### Frame 4 · CTA
- key visual: STAGE CLEAR · RESOLVED IN 6 MIN, "YOU SHIP. PULSE WATCHES.", START FREE, P1 and Pulse side by side
- loop note: not a loop; the final 0.8 s is a still hold
