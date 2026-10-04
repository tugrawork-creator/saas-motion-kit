# Storyboard — Apple TV, now in Türkiye (unofficial spec)

Theme: 101 Noise Cancelling, redesigned for the living room · Format: 1920×1080 (rendered at 4K) · Length: 24 s · Sound: synthesised score + SFX (`score.py`), no voice

## Message & tone
- **Sentence:** I want to say "turn off the noise, and the story is what's left: Apple TV is now in Türkiye" in a premium, cinema-quiet tone, so the viewer feels the relief of the moment the scrolling stops.
- **Tone arc:** urgent → bold → mysterious → premium → trustworthy → warm → premium → calm
- accent: ice
- **Motif:** the silent line. Every wave collapses into it at the drop, it runs through every screen in the proof, and in the CTA it bends into a play button.

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 2.0 | hook | urgent | tile-stream | parallax-push | power2.in | left-right | ink+white | push in through the rows | poster-tile rows, scroll timer, corner tag | | hiss, scroll ticks | four rows of untitled, blurred poster tiles stream sideways at different speeds and speed up; the scroll timer runs |
| 2 | 0:02 | 3.0 | hook | bold | word-by-word | hard-cut | expo.out | center | ink+white | locked | noise field, two-tone headline | | pings, detuned drone, riser | 34 white hairline waves swell over the dimmed tiles; "Bu akşam / ne izlesem?" sets word by word |
| 3 | 0:05 | 0.8 | reveal | mysterious | freeze | quiet-zone-iris | none | center | ink | locked | (the frozen frame) | | silence | surprise: the mix cuts to true silence and the frame freezes for 0.8 s |
| 4 | 0:05.8 | 3.7 | reveal | premium | glow-up | object-carry | sine.inOut | radial | ink+ice | slow dolly in | hero screen, quiet zone, anti-noise rings, silent line, wordmark | | one soft note per line | the screen slab glows on, the quiet zone opens from it and every wave goes flat; "Gürültüyü kapat.", then "Apple TV" and "Artık Türkiye'de." |
| 5 | 0:09.5 | 3.0 | proof | trustworthy | line-rise | match-cut | power3.out | bottom-up | ink+white | locked | hero screen, audio & subtitle switch, subtitle line | | soft ticks | "Türkçe dublaj ve altyazı." The screen is carried left and grows; both switches slide to Türkçe and a subtitle line rises on the screen |
| 6 | 0:12.5 | 2.6 | proof | warm | scale-from-pill | whip-pan | power2.out | right | ink+white | locked | plan card | | soft pop | "iCloud+ aboneliğine dahil." The selected Türkçe pill becomes the plan card's "dahil" pill in the same place |
| 7 | 0:15.1 | 3.4 | proof | premium | light-sweep | line-morph | sine.out | left-right | ink+ice | slow truck right | device row, silent line | | six rising plucks | surprise: the silent line threads six generic screens and a light sweep wakes them one by one; "Her ekranda." |
| 8 | 0:18.5 | 5.5 | cta | calm | line-to-play | end | expo.inOut | center | ink+ice | locked | play line, wordmark, recap, disclaimer | play-line | resolving chord, then silence | the line rises and bends into a play triangle; "Apple TV" / "Artık Türkiye'de."; the last 1 s is silent and still |

## The seven questions (answer before you build)
1. **What do I want to say, and in what tone?** The sentence above. Premium and cinema-quiet: dark ground, white type, one ice-blue light, long tails after the drop.
2. **Is anything repeating?** Audit clean (see README). Eight entrances, eight eases, four transition families. The silent line is the declared motif.
3. **What does each transition mean?**
   - tiles → noise, **parallax push**: the camera pushes through the rows of things to watch and into the noise they make.
   - noise → silence, **hard cut**: the film's thesis in one edit. Everything stops.
   - silence → reveal, **quiet-zone iris**: the quiet opens from the screen, so the product is where the calm starts.
   - reveal → proof, **object carry**: the same screen carries into the proof and starts playing, with Turkish subtitles.
   - subtitles → plan, **match cut**: the selected "Türkçe" pill becomes the "dahil" pill. Both say "this is yours already".
   - plan → devices, **whip pan**: the only fast move after the drop, from what you pay to where you watch.
   - devices → CTA, **line morph**: the line that ran through every screen rises and becomes the play button.
4. **What are the colours doing over time?** Noisy greys and dim poster colours in the hook. Pure black at the drop. Ice blue enters with the quiet zone and is the only colour after that, except the dim scene inside the screen. The gradient phrase ("Artık Türkiye'de.") appears twice: reveal and CTA.
5. **Which component have I never made before?** The **play line** (see Frame 4).
6. **Where is the surprise?** 5.0 s: true silence and a frozen frame. 15.1 s: one line wakes six screens in a single sweep.
7. **Did this repeat my last film?** It borrows 101's devices on purpose and changes the palette, the hero object and every transition.

## Frames

### Frame 1 · Hook (0–5 s)
- key visual: endless rows of untitled poster tiles, then a field of white hairline waves over them
- moves first: the rows, sideways at three speeds, accelerating (`power2.in`); the camera pushes in
- on-screen words: "Bu akşam ne izlesem?" (3 words) + the scroll timer
- beat hook: the headline's last word lands at 3.15 s and the noise peaks at 5.0 s, then everything stops

### Frame 2 · Reveal (5–9.5 s)
- key visual: a dark screen slab lit like hardware, the quiet zone opening around it, every wave flattening into one ice-blue line
- moves first: nothing, for 0.8 s; then the screen's glow, then the iris (`expo.out` 0.9 s)
- on-screen words: "Gürültüyü kapat." · "Apple TV" · "Artık Türkiye'de."

### Frame 3 · Proof moment (9.5–18.5 s)
- key visual: the screen playing with Turkish subtitles; an audio and subtitle switch set to Türkçe; a plan card where Apple TV is "dahil"; six screens on one line
- new component: see Frame 4
- moves first: the screen carry (`power3.inOut`), then the pills, one per beat

### Frame 4 · CTA (18.5–24 s)
- key visual: the silent line bent into a play triangle above "Apple TV" and "Artık Türkiye'de."
- new component: **play line**. The film's motif ends as an interface: the flat line opens a gap at its centre and two vertices lift out of it to form a play triangle. Its stroke stays the line's stroke, so the viewer reads it as the same object. Motion signature: the gap opens over 0.5 s (`expo.inOut`), the vertices lift ±78 px over 0.7 s, and the fill fades to 14 % ice once it closes.
- loop note: not a loop; everything settles by 23.0 s, and the last second is silent and still
