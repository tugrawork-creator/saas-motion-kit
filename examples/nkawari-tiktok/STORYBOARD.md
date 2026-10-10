# Storyboard — N'Ka Wari · « Dites-le, c'est noté »

Theme: 055 Bento Grid (adapted, see BRIEF.md) · Format: 1080x1920 · Length: 45 s · Sound: music (120 BPM, 1 bar = 2 s, drop on bar 5 = 0:08)

## Message & tone
- **Sentence:** I want to say "say your expense out loud and it's already logged" in a warm, quick-witted tone, so the viewer feels "finally, a notebook I'll actually keep".
- **Tone arc:** playful (the pain, which we all recognise) → bold (the drop) → warm (proof by voice) → trustworthy (receipt, offline, accounts) → warm (CTA)
- accent: lime
- Terracotta is functional, not an accent: it only ever means "an expense" (amounts, the newest row).
- **Colour events:** (1) 0:08 the grid collapses and the frame floods olive for the logo, the only olive flood until the CTA; (2) 0:10–0:16 the words light up lime one by one, the accent's first real job; (3) 0:30 the colour drains in offline, and returns at 0:34.
- **Motifs:** `motif:grid-collapse` (0:08 into the mark → 0:38 into the full lockup, bigger and slower the second time) · `motif:mic-ring` (the lime ring around the mic: pressed at the reveal, still working offline, pulsing on the CTA button)

## Ledger

| # | start | dur | beat | tone | entrance | transition_out | ease | direction | palette | camera | components | new_component | sfx | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 0:00 | 4.0 | hook | playful | tile-cascade | motif:cut | power2.out | top-left→bottom-right | creme+encre | locked | pain-tiles, anchor-tile | | soft-tick-per-tile | a bento of everyday spends with « ? » for an amount (Taxi, Pain, Crédit, Tontine, Marché); anchor tile « Je note ça plus tard. » |
| 2 | 0:04 | 4.0 | hook | playful | in-place | beat-cut-hold-frame | sine.inOut | outward | creme+texte-2 | slow-drift-in | pain-tiles | forget-fade | music-thins-out | each tile's words blur and evaporate on the off-beats ("plus tard" = never); surprise: 0:07 freeze + one beat of silence before the drop |
| 3 | 0:08 | 2.0 | reveal | bold | motif:grid-collapse | product-shape-mask | expo.in | radial-in | olive+creme | push-in | logo-mark, motif:mic-ring | | drop + mic-tap | the empty tiles collapse into one hero tile = the official mark on an olive flood; the mic beside it is pressed, its lime ring pulses; « Dites votre dépense. » |
| 4 | 0:10 | 6.0 | proof | warm | mask-open | motif:cut | steps(1) | left→right | creme+lime | locked | dictation-sheet, waveform | | none (music carries) | the mark's rounded square opens onto the dictation sheet; the real sentence appears word by word, one word per 8th note, each lighting lime then settling to ink |
| 5 | 0:16 | 2.0 | proof | warm | punch-in | object-carry | power3.in | down | creme+encre | punch-in | dictation-sheet | phrase-perforee | perforation-ticks + paper-tear | new component: the sentence becomes a paper strip, a perforation stitches in at « et » (steps(6)) and it tears; the two halves fall |
| 6 | 0:18 | 4.0 | proof | warm | slam-nudge | dolly-out-reveal | power4.out | from-above | creme+depense | locked | transaction-row ×2 | | two warm thuds on beats 1 and 3 | each half lands and reflows into its real row: Taxi · Transport −2 000 F, then Courses au marché · Alimentation −5 000 F slams in with the terracotta inset and nudges its neighbour 8 px; « Elle est déjà notée. » |
| 7 | 0:22 | 2.0 | proof | trustworthy | camera-reveal | focal-iris | power2.inOut | pull-back | creme+olive | dolly-out | solde-card, donut, action-trio | | air-whoosh | pull back to the whole bento: the donut draws its arcs (Total 92k), the action trio settles at the bottom; surprise: scale jump from 2 rows to the whole app in 2 s |
| 8 | 0:24 | 6.0 | proof | trustworthy | iris-open | dither-pixel-sort | expo.out | from-receipt-button | encre+lime | macro-push | receipt-ink-tile, giant-number | | scan-sweep + soft-confirm | iris opens from the receipt button onto the ink tile; a lime scan band crosses it; NET À PAYER lights up while ESPÈCES/RENDU dim; « 12 500 » counts in on the giant-number tile; the photo thumbnail dissolves, label « photo effacée » |
| 9 | 0:30 | 4.0 | proof | trustworthy | desaturate | speed-ramp | power1.inOut | stack-up | creme-2+texte-2 | locked | offline-queue, motif:mic-ring | | music low-pass + muffled taps | surprise: the signal drops, the grid goes grey in chunky pixels, music is muffled; three entries stack « en attente » with dotted borders while the mic ring still works; « Sans réseau aussi » |
| 10 | 0:34 | 4.0 | proof | trustworthy | colour-return | motif:grid-collapse | power3.out | right→left | creme+olive | lateral-drift | account-chips | | filter-opens + 4 plucks | signal back on the bar: the queue ramps up and out as « envoyées », colour floods back, the four account chips arrive one per beat: Orange Money · Wave · Espèces · Compte bancaire (text only, no third-party logos) |
| 11 | 0:38 | 7.0 | cta | warm | motif:grid-collapse | end-hold | expo.inOut | center | olive+lime | slow-push-in | lockup, offer-tile, motif:mic-ring | | final hit, then ring-out | the bento collapses for the second time, slower and bigger, into the lockup: mark + N'Ka Wari, « Dites-le. C'est noté. », chips « Gratuit pour compter » · « 14 jours, sans carte », a « Télécharger pour Android » button with the pulsing lime mic ring, nkawari.marakadev.online; hold 2.5 s to read |

## The seven questions
1. **Say what, in what tone?** See the sentence above. Every tile is a real moment of everyday spending in FCFA, in French.
2. **Repeats?** Only the two motifs, both marked. Hard cuts are `motif:cut`, the quiet base, and never appear twice in a row.
3. **Why each transition?**
   - hold-frame: "wait for it" before the drop
   - product-shape mask: the app icon opens onto the app
   - punch-in: zooms into the word that matters (« et »)
   - object carry: the sentence halves *become* the rows (cause → effect)
   - dolly-out: from one action to the whole app
   - focal iris from the receipt button: the button causes the scene
   - dither: the signal breaking down
   - speed ramp: the queue rushing out when the network returns
   - grid collapse: everything resolves into one thing
4. **Colours over time:** crème/ink pain → olive flood at the drop → lime only on the heard words → terracotta only on amounts → ink for the receipt → drained grey offline → full colour returns → olive + lime CTA.
5. **New component:** **Phrase perforée**, the sentence as a ticket strip that tears at « et » into two expenses.
6. **Surprises:** 0:07 freeze + silence · 0:22 scale jump · 0:30 signal loss (colour and music both drop). There's one roughly every 8–15 s.
7. **Last films?** No history yet (`~/.motion-ledger.json` is empty), so this film starts the ledger.

## Frames

### Frame 1 · Hook (0:00–0:08)
- key visual: a bento of five everyday-spend tiles, each with « ? » where the amount should be, around one anchor tile.
- moves first: tiles cascade large→small, scale .92→1, power2.out, 70 ms stagger, big tiles on beats.
- on-screen words: « Je note ça plus tard. » (5 words) + one word per tile (Taxi, Pain, Crédit, Tontine, Marché).
- beat hook: at 0:04 the words start evaporating, one tile per off-beat. At 0:07 everything freezes and the music stops for one beat.

### Frame 2 · Reveal (0:08–0:10)
- key visual: the empty grid collapses (expo.in, landing exactly on the drop) into one olive hero tile, the official N'Ka Wari mark. A mic button beside it is pressed and rings lime.
- moves first: the tiles translate to centre and merge radii.
- on-screen words: « Dites votre dépense. »

### Frame 3 · Proof moment (0:10–0:30)
- key visual: the dictation sheet hears « deux mille de taxi ce matin et cinq mille de courses » word by word. The sentence tears at « et ». The halves fall and become two real rows. Then we pull back to the whole app, then dive into the receipt.
- new component: **Phrase perforée** (0:16–0:18). Its motion signature is the perforation stitching in at `steps(6)`, a two-frame tension wobble, then the tear.
- moves first: words left→right on 8ths. Then the falling halves (power3.in) slam into rows (power4.out).
- on-screen words: the UI's own strings + « Elle est déjà notée. »

### Frame 4 · Offline + accounts (0:30–0:38)
- key visual: grey grid, three dotted « en attente » entries, the mic still ringing. On the bar, colour and music return and the entries rush out. Then the four account names arrive.
- on-screen words: « Sans réseau aussi » + the four account names.

### Frame 5 · CTA (0:38–0:45)
- key visual: the second grid collapse, into the lockup + offer + « Télécharger pour Android » + URL.
- loop note: not a loop. The film ends on a 2.5 s readable hold.
