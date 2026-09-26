# Storyboard — Acme Pulse, the comic page

Theme: 089 Pop-Art Ben-Day · Format: 1080×1080 · Length: 12 s · Sound: none (silent)

## Message & tone
- **Sentence:** I want to say "Pulse catches the drop before your customers do, and you make the call" in a punchy, wry comic-book tone, so the viewer feels the small thrill of a hero turning up just in time.
- **Tone arc:** wry → bold → urgent → trustworthy → decisive → warm
- accent: coral
- **Motif (optional):** the Acme mark is the comic's character. It bursts onto the splash page, catches the coral anomaly dot in its own dot and speaks the alert, then speaks the tagline on the last page.

## Ledger

The camera reads the film like a guided-view comic: it moves from panel to panel on real pages, and every move is logged as the shot's transition.

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 3.0 | hook | wry | poster-hold | focal-iris | sine.inOut | center | paper+teal | slow-push-in | comic-panel, monitor-wall, thought-balloon, caption-box | | none | the first frame is the poster. Ink ticks stamp five teal monitors while the coral one is skipped and its line keeps sinking. A burst-shaped iris opens from that missed monitor (cause → effect) |
| 2 | 0:03 | 1.4 | reveal | bold | burst-bang | whip-pan | back.out(2) | radial | coral+amber | locked+shake | onomatopoeia-burst, action-lines, acme-mark, caption-box | | none | splash page: coral burst, then amber burst, then the mark, then PULSE! with a 4-frame shake. Caption "Enter… Acme Pulse". The whip uses comic speed lines and a horizontal-only blur |
| 3 | 0:04.4 | 1.6 | proof | urgent | print-sweep | object-carry | steps(12) | right | teal+paper | push-in | halftone-chart, deploy-marker, zap-burst, pencil-panels | halftone-chart | none | the metric prints as Ben-Day dots, one column step at a time like a press roller. At deploy #2231 the line plunges, the ink thins to small coral dots and ZAP! bangs. The unfinished panels below are still blue pencil |
| 4 | 0:06 | 1.3 | proof | trustworthy | balloon-inflate | beat-cut-hold | back.out(1.7) | down | paper+coral | tilt-down | speech-balloon, acme-mark | | none | the coral anomaly dot is carried into the mark's own dot, the panel inks in, and the mark speaks: "Checkout conversion −18% · since 09:42". A 0.4 s freeze, then a hard cut |
| 5 | 0:07.3 | 0.9 | proof | decisive | hand-press | dolly-out | power3.out | up | paper+coral | locked | comic-button, pointing-hand, caption-box | pointing-hand | none | "Your call!". A Lichtenstein-style dotted hand presses ROLL BACK!: the face drops onto its ink shadow (10 → 0) and CLICK! |
| 6 | 0:08.2 | 0.85 | proof | trustworthy | re-ink-sweep | paper-fold | power3.inOut | out | paper+teal | dolly-out | comic-page, halftone-chart | | none | surprise: the camera pulls back and the three close-ups turn out to be one comic page. The chart re-inks teal and ZAP! deflates |
| 7 | 0:09.05 | 2.95 | cta | warm | drop-land | end | power2.out | down | amber+coral | locked | speech-balloon, onomatopoeia-burst, comic-button, wordmark | | none | the page turns to "Next Friday…". The mark says "You ship. Pulse watches.", START FREE drops in and lands, and the last 0.8 s hold still |

## The seven questions (answer before you build)
1. **What do I want to say, and in what tone?** Pulse catches the drop and a human makes the call, told as a wry, punchy comic.
2. **Is anything repeating?** The audit is clean. The two camera moves (whip, dolly-out) are separated by a carry and a hard cut, and every entrance is different.
3. **What does each transition mean?**
   - The burst iris opens from the unchecked monitor: the missed drop summons Pulse.
   - The whip pan says "meanwhile, at 09:42".
   - The object carry says the anomaly goes into Pulse.
   - The freeze and hard cut say "your turn".
   - The dolly-out shows it was one story all along.
   - The page turn says "next Friday".
4. **What are the colours doing over time?** Paper and teal rule the hook. The one coral flood is the reveal burst, which is the colour event. After that coral only marks the anomaly and the two buttons, and the final page turns warm amber.
5. **Which component have I never made before?** The **halftone chart**: the metric is printed as Ben-Day dots and the dot size carries the value, so a drop literally thins the ink. Also the **pointing hand**, a dotted pop-art finger that presses the decision.
6. **Where is the surprise?** At 8.2 s the camera pulls back and the close-ups turn out to be panels of one page, with a scale jump from 1.0 to 0.5.
7. **Did this repeat my last film?** This is the first film in this ledger. No history file was used.

## Frames

### Frame 1 · Hook
- key visual: a teal-dotted panel of six monitors, a thought balloon and an amber caption box. The coral monitor's line sinks.
- moves first: ink ticks draw onto the monitors left→right, and the camera creeps in (sine.inOut).
- on-screen words: "Friday, 5:58 PM…" · "38 dashboards today?!" (6 words)
- beat hook: the burst-shaped iris opens from the one monitor nobody ticked.

### Frame 2 · Reveal
- key visual: amber splash page with action lines, a coral burst, an amber burst, the Acme mark and PULSE!
- moves first: the coral burst (scale 0 → 1.1 → 1 plus a 4-frame shake).
- on-screen words: "PULSE!" · "Enter… Acme Pulse"

### Frame 3 · Proof moment
- key visual: three panels. (a) The halftone chart prints and ZAP! lands on deploy #2231. (b) The mark catches the coral dot and says "Checkout conversion −18% · since 09:42". (c) "Your call!" and a hand presses ROLL BACK!
- new component: halftone chart (the value is the dot size; motion signature is a steps(12) press-roller print and a re-ink sweep), plus a pointing hand.
- moves first: the chart's line draws while the dot columns print in steps behind it.

### Frame 4 · CTA
- key visual: amber-dot page. The mark speaks "You ship. Pulse watches." in front of a teal burst, with a START FREE comic button and the "Acme Pulse" wordmark.
- loop note: not a loop. The last 0.8 s hold still.
