# 5 · Build (HyperFrames)

Install the skills once with `npx skills add heygen-com/hyperframes`, then let Claude Code build with `/general-video` or `/product-launch-video`.

**The composition contract**
- One paused GSAP timeline registered on `window.__timelines["main"]`.
- Timed elements get `class="clip"` plus `data-start` and `data-duration`.
- Animate transforms and opacity. Avoid tweening layout properties such as `top`, `left` or `letter-spacing`.
- Everything is a function of time: no `Date.now()`, no unseeded `Math.random()`, no network calls at render.

**Three.js (3D)**
- Render from the `hf-seek` event (`e.detail.time`) and from `window.__hfThreeTime`, and resolve `window.__hf.buildReady[...]` once the scene is compiled.
- Compute every pose from `t` (see [`examples/acme-suite-loop/assets/js/stage.js`](../examples/acme-suite-loop/assets/js/stage.js)).
- `NeutralToneMapping` keeps brand colours from washing out to pastel.

**Canvas / pixel art** works the same way: draw the whole frame in `render(t)`, and call it from a proxy tween's `onUpdate` and from `hf-seek`.

**Loops**
- Make frame 0 and the last frame identical: hold the end state, or animate back to the start state.
- Ambient motion uses whole cycles per loop: `sin(2π · n · t / LOOP)`.

**Verify on every change**
```bash
npx hyperframes lint
npx hyperframes snapshot --at 2,8,15,30 --timeout 60000   # look at the stills
npx hyperframes check                                     # lint + runtime + contrast
```

**Gate:** you approve the preview's timing (`npx hyperframes preview`).
