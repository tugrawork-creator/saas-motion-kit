# Storyboard — Acme Pulse · Dark Keynote

Theme: 061 Dark Keynote · Format: 1080×1080 · Length: 12 s · Sound: none (silent)

## Message & tone
- **Sentence:** I want to say "Pulse catches the drop your dashboards miss, then hands the decision to a human" in a premium, keynote-calm tone, so the viewer feels the quiet confidence of a stage where the light always lands on what matters.
- **Tone arc:** mysterious → premium → trustworthy → premium → warm
- accent: coral
- **Motif:** the spotlight cone (`motif:spotlight-cone`). It finds the question in the hook, returns as the follow-spot that pins the anomaly, and clicks on one last time over the CTA with a warm coral floor. Each return is narrower in meaning and warmer in colour.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.0 | hook | mysterious | poster-hold | object-carry | sine.inOut | center | navy+paper | slow parallax push on the cards | motif:spotlight-cone, floor-pool, dof-dashboard-cards, serif-headline | | none | frame 0 is the poster: the spot is already on "38 dashboards. One missed drop."; the words dim, the coral full stop survives and glides into the Acme mark |
| 2 | 0:03 | 1.5 | reveal | premium | grow-from-dot | dolly-out-reveal | power3.out | radial | teal+navy | locked | acme-mark, edge-glow-ignition, light-sweep | | none | the mark grows around the carried dot; four glow layers ignite inside→out; a diagonal light sweep uncovers "Acme Pulse" |
| 3 | 0:04.5 | 1.6 | proof | trustworthy | row-rise+check-pop | focal-iris | power3.inOut | bottom-up | navy+teal | dolly-out to an 8° tilt, then focus pull | floating-panel, dof-team-table, header-flip | | none | the frame's glow ring recedes and becomes the Pulse panel; the lockup settles into its header; checks light up, Checkout stays pending |
| 4 | 0:06.1 | 2.9 | proof | premium | count-down+typewriter | house-lights-cut | power2.inOut | top-down | coral+navy | locked, rack from table to panel | motif:spotlight-cone, light-thread, cursor, roll-back-button | spot-cue | none | coral iris opens from the Checkout row: −18% · since 09:42; a human presses Roll back and the cue releases to teal |
| 5 | 0:09 | 3.0 | cta | warm | spot-click+blur-rise | end | expo.out | bottom-up | navy+coral | locked | motif:spotlight-cone, lockup, floor-glow, start-free | | none | surprise: the house lights cut to navy for 0.3 s of stillness, then the spot clicks on with a flicker-settle; last 0.8 s held |

## The seven questions (answer before you build)
1. **What do I want to say, and in what tone?** The sentence above. Premium means very few moves, long tails (`power3.inOut`), dark ground, one light at a time.
2. **Is anything repeating?** Audit clean (see README). Five different entrances, five eases, four transition families. The only repeat is the spotlight, and it's a declared motif.
3. **What does each transition mean?**
   - hook → reveal, **object carry**: the coral full stop of "One missed drop." is the drop nobody saw. It glides into the Acme mark and becomes its dot: the problem is now held by Pulse.
   - reveal → proof, **dolly-out reveal**: the glowing frame we were inside turns out to be one panel floating on the team's stage, so Pulse is shown at work in context.
   - scan → catch, **focal iris**: the coral state opens from the Checkout row outward, so the cause (that row) is where the colour change starts.
   - proof → CTA, **house-lights cut** (custom, closest to T04 beat cut with hold-frame): lights down, a held beat of navy, then the spot clicks on. The keynote's own grammar for "and now, the point".
4. **What are the colours doing over time?** Navy and paper in the hook with a single coral dot. Teal takes over at the reveal. The one coral event is the catch (glow, row, iris). Teal returns when the human acts. Coral comes back once more, warm, on the CTA floor and button.
5. **Which component have I never made before?** The **spot cue** (see Frame 3).
6. **Where is the surprise?** 9.0–9.55 s: the house lights drop to navy and nothing moves for 0.3 s, then the spot clicks on with a flicker. It's the one hard stop in a film of slow tails.
7. **Did this repeat my last film?** Not against the other five six-films themes; each owns its own transitions.

## Frames

### Frame 1 · Hook (0–3 s)
- key visual: a keynote stage in the dark, one spotlight on the question, out-of-focus dashboard cards floating around it
- moves first: the blurred cards drift outward on slow parallax (`sine.inOut`); the coral dot pulses once at 1.05 s
- on-screen words: "38 dashboards. One missed drop." (5 words)
- beat hook: at 2.05 s the words dim, the cone narrows onto the coral dot and the dot glides to where the mark will be

### Frame 2 · Reveal (3–4.5 s)
- key visual: the Acme mark grown around the carried dot, framed by the teal edge glow, "Acme Pulse" uncovered by a light sweep
- moves first: the mark square scales out of the dot (`power3.out`), then the glow ignites inside→out in four layers over one beat
- on-screen words: "Acme Pulse"

### Frame 3 · Proof moment (4.5–9 s)
- key visual: the glowing Pulse panel floating in front of the soft team board; one row turns coral: "Checkout conversion −18%" · "since 09:42 · after deploy #2231"; a human presses **Roll back**
- new component: **spot cue**. A keynote lighting cue as a UI state. When Pulse flags a metric it calls a cue: the house dims to about a third, a warm follow-spot clicks on with a flicker-settle and pins the one row that needs a human, and the edge glow turns coral outward from that row. When the human answers, the cue releases: house up, spot out, glow back to teal. Motion signature: flicker-settle opacity [0 → 1 → .3 → 1 → .65 → 1] in 0.4 s, then a 0.5 s house dim.
- moves first: the dolly-out (`power3.inOut`, 0.85 s); on the catch, the spot, then the iris, then the count

### Frame 4 · CTA (9–12 s)
- key visual: one spotlight, the lockup, "You ship. *Pulse watches.*" and a coral **Start free** with a warm floor glow
- loop note: not a loop; everything settles by 11.2 s and the last 0.8 s is held still
