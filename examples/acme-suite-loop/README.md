# Example: Acme Suite booth loop

A silent, seamless **40 s, 1920×1080** loop for an event booth screen. Five fictional Acme products take turns in front on a 3D turntable while the left column introduces each one.

- **Stack:** HyperFrames, GSAP for the text, Three.js for the turntable, rendered on `hf-seek`.
- **Loop:** the turntable ends half a step past product 5, which is the same angle as frame 0. Every ambient motion completes whole cycles in 40 s, and the hero line returns and holds at the end.
- **Components:** all five products are *imaginary components* (see [`components/`](../../components)): a monitor with a live heartbeat line, a stack of reconciled invoices, a syncing cloud, forecast bars and a compliance shield.

| Time | Beat |
|---|---|
| 0–4 s | "Five tools. One calm workspace." The turntable settles on product 1 |
| 4–34 s | 5 × 6 s: each product turns to the front with its name, a one-line promise and three chips |
| 34–39 s | Acme Suite lockup and a "Start free" button |
| 39–40 s | the hero line returns (identical to 0 s) |

```bash
npx hyperframes preview                     # Studio preview
npx hyperframes check                       # lint + runtime + contrast
npx hyperframes render --quality delivery --resolution landscape-4k --player-ready-timeout 180000 --output renders/acme-suite-loop-2160.mp4
bash ../../tools/deliver.sh renders/acme-suite-loop-2160.mp4 1920x1080
python ../../tools/loop_check.py renders/acme-suite-loop-2160-1920x1080.mp4
```

Files: `index.html` (layout, copy, GSAP timeline) · `assets/js/stage.js` (3D scene; every pose is a function of `t`) · `BRIEF.md`.
