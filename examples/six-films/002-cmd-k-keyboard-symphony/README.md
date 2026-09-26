# 002 · ⌘K Keyboard Symphony

One of six films that tell the same 12-second Acme Pulse story in six different themes.
Theme sheet: [⌘K Keyboard Symphony](../../../docs/themes/002-cmd-k-keyboard-symphony.html) (data: [`002.json`](../../../docs/themes/data/002.json)).

1080×1080 · 12 s · 30 fps · silent. The picture keeps an implied 120 BPM grid: the keycaps are the percussion.

## Tone
> I want to say "Pulse watches every metric, so you only have to make the call" in a crisp, technical-then-trustworthy tone, so the viewer feels in control: one keystroke away from the fix.

Tone arc: technical → bold → trustworthy → bold → warm.

## The film
| time | beat | what happens |
|---|---|---|
| 0–3 s | hook | Poster: "How many dashboards *today?*" over a blurred wall of dashboards. ⌘ K is struck, the palette springs open, "dash" types one letter per 1/8 note while the count narrows to 38, and the list flicks and freezes on "Checkout funnel · not today". |
| 3–4.5 s | reveal | Hard cut on the downbeat. "pulse" types with coral fuzzy matches, the results re-rank, ↵ expands the top row into the Acme Pulse lockup, and two teal rings land on the next beats. |
| 4.5–7 s | proof | The lockup shrinks into the "Pulse ›" scope chip. With no key pressed, Pulse flags "Checkout conversion −18%" · "since 09:42 · after deploy #2231", and the metric stave plays. |
| 7–9 s | the call | The palette makes room for "Roll back deploy #2231", the camera drops onto the ⌥ R keycaps, the human strikes, and the stave recovers as the clock ticks 09:44 → 09:47. |
| 9–12 s | CTA | The settled stave line becomes the horizon: "You ship. *Pulse watches.*" rises out of it, the palette unfolds below with Start free selected, and the coral ↵ is struck and stays down. The last 0.8 s is still. |

## New component: the metric stave
Checkout conversion drawn as notes on a five-line musical staff, one note every 30 s. Barlines are timestamps. After the coral 09:42 barline the notes fall off the staff onto ledger lines while "−18%" counts in, and a playhead "plays" the data. The human's ⌥ R stamps its own teal barline ("09:44 · you") into the music, and the notes after it climb back. At the end the notes settle onto the middle line, which becomes the CTA's horizon.

## Transitions
- **T04 Beat cut with hold-frame** (hook → reveal): the overflowing list freezes on the dashboard nobody opened, and the downbeat cuts to the answer.
- **T05 Object carry** (reveal → proof): the Acme Pulse lockup shrinks into the scope chip, showing that we are now inside Pulse.
- **Dolly to keys** (camera, proof → the call): a 1.38× push onto the ⌥ R keycaps at the moment of decision. This is the film's surprise.
- **T08 Line-to-horizon** (the call → CTA): the recovered stave settles into one line that becomes the horizon of the CTA.

Motif: the keycap strike (⌘ K → ↵ → ⌥ R → coral ↵), which goes from a teal glow to a coral decision to a key that stays held down.

## Variety audit
`python tools/variety_audit.py STORYBOARD.md` → **no repetition found** (5 shots, 4 cuts, families: cut 1 · carry 2 · camera 1). See [STORYBOARD.md](STORYBOARD.md).

## Build
```bash
npx hyperframes lint            # 0 errors
npx hyperframes check           # passes: 0 errors, contrast 42/42 WCAG AA
npx hyperframes render --quality high --output renders/film.mp4
```
Fonts (Manrope, Instrument Serif, JetBrains Mono; SIL OFL 1.1) and the Acme mark are bundled in `assets/`. The ⌘, ⌥ and ↵ glyphs are drawn as inline SVG so they never fall back to a system font.
