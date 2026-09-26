# Example: Acme Suite booth loop

A silent, seamless **40 s, 1920×1080** loop for an event booth screen. Five fictional Acme products take turns in front on a 3D turntable while the left column introduces each one.

- **Stack:** HyperFrames, GSAP for the text, Three.js for the turntable, rendered on `hf-seek`.
- **Loop:** the turntable ends half a step past product 5, which is the same angle as frame 0. Every ambient motion completes whole cycles in 40 s, and the hero line returns and holds at the end.
- **Components:** all five products are *imaginary components* (see [`components/`](../../components)): a monitor with a live heartbeat line, a stack of reconciled invoices, a syncing cloud, forecast bars and a compliance shield.

| Time | Beat |
|---|---|
| 0–4 s | "Five tools. One calm workspace." The turntable settles on product 1 |
| 4–34 s | five products at 6.5 / 5 / 5.5 / 8 / 5 s, each with its own entrance and its own turn; Forecast is the surprise (teal flood + camera dolly) |
| 34–39 s | Acme Suite lockup and a "Start free" button |
| 39–40 s | the hero line returns (identical to 0 s) |

```bash
npx hyperframes preview                     # Studio preview
npx hyperframes check                       # lint + runtime + contrast
npx hyperframes render --quality delivery --resolution landscape-4k --player-ready-timeout 180000 --output renders/acme-suite-loop-2160.mp4
bash ../../tools/deliver.sh renders/acme-suite-loop-2160.mp4 1920x1080
python ../../tools/loop_check.py renders/acme-suite-loop-2160-1920x1080.mp4
```

Files: `index.html` (layout, copy, GSAP timeline) · `assets/js/stage.js` (3D scene; every pose is a function of `t`) · `BRIEF.md` · `STORYBOARD.md` (v2 ledger) · `STORYBOARD.v1.md` (the first draft).

## The lesson: v1 → v2

We ran the [variety audit](../../tools/variety_audit.py) on our own first draft. It looked fine at first glance, and the audit disagreed:

```text
$ python tools/variety_audit.py examples/acme-suite-loop/STORYBOARD.v1.md
  [warn] transition 'turntable-turn' used on two consecutive cuts (rows 1 and 2)
  ... (×4)
  [warn] transition 'turntable-turn' used 5× (limit 2 for a 40 s film)
  [warn] only 2 transition families (camera, time); aim for 3+
  [warn] entrance 'line-rise' three times in a row (rows 2–4)
  [warn] ease 'expo.out' on 5/8 rows (> half)
  [warn] direction 'up' three times in a row (rows 1–3); alternate
  [warn] 5/8 shots last ~6 s; vary shot lengths
  [warn] no row marked 'surprise:'; plan a pattern-breaking moment every ~15 s
  => 11 warning(s)

$ python tools/variety_audit.py examples/acme-suite-loop/STORYBOARD.md
  => no repetition found. Now go check it with your eyes.
```

| Product | Entrance | How the turntable arrives |
|---|---|---|
| Pulse | letters resolve out of blur | settles from the intro |
| Ledger | the title wipes on, the promise types out | 0.9 s cubic turn |
| Cloud | "Acme" is carried over, only the second word flips in | 0.45 s whip with motion blur |
| Forecast | teal flood from the product, camera dolly in, "weeks" struck out | 1.4 s slow sine turn |
| Shield | the title drops from above, chips tick on like a checklist | 0.9 s turn |

The v2 render is attached to the [v1.1 release](https://github.com/tugrawork-creator/saas-motion-kit/releases/tag/v1.1).
