# 061 · Dark Keynote: "Same story, six films"

**Theme:** [061 Dark Keynote](../../../docs/themes/061-dark-keynote.html) · 1080×1080 · 12 s · 30 fps · silent

A cinematic navy keynote stage. There's one light at a time, and the story moves from light to darkness and back: a spotlight finds the question, the teal edge glow ignites around Pulse, a follow-spot pins the anomaly, and the house lights drop before the last spot clicks on.

## Tone
> I want to say "Pulse catches the drop your dashboards miss, then hands the decision to a human" in a premium, keynote-calm tone, so the viewer feels the quiet confidence of a stage where the light always lands on what matters.

Tone arc: mysterious → premium → trustworthy → premium → warm. The accent is coral, and it leads only the catch.

## Beats
| time | beat | what happens |
|---|---|---|
| 0–3 s | hook | Frame 0 is the poster: a spotlight on "38 dashboards. One *missed* drop." with blurred dashboard cards drifting in depth. The words go dark, but the coral full stop survives and glides upward while the cone narrows onto it. |
| 3–4.5 s | reveal | The Acme mark grows out of the carried dot, so the dot becomes the mark's own coral dot. The edge glow ignites in four layers, inside→out. A diagonal light sweep uncovers "Acme Pulse". |
| 4.5–9 s | proof | Dolly-out: the glowing frame recedes into a tilted Pulse panel in front of the soft team board, and the lockup settles into the panel header. Checks light up. Then the **spot cue** fires: coral iris, "Checkout conversion −18%", "since 09:42 · after deploy #2231", and a light thread to the same cell on the team board. A cursor presses **Roll back** and the cue releases to teal. |
| 9–12 s | CTA | The house lights drop to navy and hold for a beat, then the spot clicks on with a flicker. Lockup, "You ship. *Pulse watches.*", and a coral **Start free** over a warm floor glow. Everything settles by 11.2 s, and the last 0.8 s is held still. |

## New component: spot cue
A keynote lighting cue used as a UI state. When Pulse flags a metric it "calls a cue":
1. the house dims: other rows fall to 30 %, the team board blurs and dims;
2. a warm follow-spot clicks on from above with a flicker-settle (opacity 0 → 1 → .3 → 1 → .65 → 1 in 0.4 s) and pins the one row that needs a human;
3. the edge glow turns coral through an iris that opens from that row outward.

When the human answers (Roll back), the cue releases: house up, spot out, glow back to teal. The attention itself becomes the interface. It's the theme's spotlight used as the product's "look here".

## Transitions
| cut | transition | why |
|---|---|---|
| hook → reveal | **T05 Object Carry** | The coral full stop of "One missed drop." is the drop nobody saw. It glides into the Acme mark and becomes its dot, so the problem is now held by Pulse. |
| reveal → proof | **T11 Dolly-Out Reveal** | The glowing frame we were inside turns out to be one panel floating on the team's stage, so Pulse is shown at work in context. |
| scan → catch | **T15 Focal Iris** | The coral state opens from the Checkout row, so the cause is where the colour change starts. |
| proof → CTA | **House-lights cut** (custom, closest to T04 Beat Cut with Hold-frame) | Lights down, a held beat of navy, then the spot clicks on. This is the film's one surprise: a hard stop in a film of slow tails. |

The spotlight is the declared motif (`motif:spotlight-cone`). It finds the question, pins the anomaly, and lands on the CTA, getting warmer each time.

## Theme fidelity
Navy radial stage with vignette and fixed-seed grain (no full-frame linear gradients), spotlight cone and floor pool, conic teal edge glow with blurred bloom and a slow rotation while the agent works, a floating dark-glass panel tilted 8° with depth-of-field (foreground card at 9 px blur, team board at 3.5 px), a focus pull when the panel lands, and a single coral moment.

## Variety audit
```
variety audit · STORYBOARD.md · 5 shots
  [info] transitions: 4 cuts · families {'carry': 1, 'camera': 1, 'mask': 1, 'cut': 1}
  => no repetition found. Now go check it with your eyes.
```

## Verify and render
```bash
npx hyperframes lint                       # 0 errors (8 structure warnings: single-file composition)
npx hyperframes check --timeout 60000      # passed: layout 0 issues, contrast 25/25 AA
npx hyperframes render --quality high --output renders/film.mp4   # 1080×1080, 12.0 s, 360 frames
```

Assets: Manrope, Instrument Serif and JetBrains Mono (SIL OFL 1.1, `assets/fonts/OFL.txt`) and the Acme mark, all copied locally. GSAP is the only external script.
