# Components: clean or imaginary

A software promo is only as convincing as the UI it shows. Decide per component, not per product.

## 1. Audit the real UI

Score each candidate screen from 0 to 2 on each question:

| Question | 0 | 1 | 2 |
|---|---|---|---|
| Is it current (shipped and not about to be redesigned)? | legacy | mixed | current |
| Is it calm, with one focal point and room around it? | cluttered | busy | calm |
| Is it on-brand (tokens, type, icons)? | off | partly | yes |
| Does it show the proof moment directly? | no | with effort | yes |

**7–8 → use it for real. 4–6 → use it, simplified. 0–3 → design an imaginary one.**

## 2a. Real components ("clean")

- Capture tokens, fonts, logos and copy with `npx hyperframes capture <url>`.
- **Rebuild** the component in HTML/CSS from those tokens instead of pasting a screenshot. Rebuilt UI stays sharp at 4K and every part of it can be animated: rows can reorder, numbers can count and a toast can slide in.
- Drop what the viewer doesn't need: secondary navigation, settings, footers. Keep the real labels and the real data shape.
- Scale it up for video. Body text 28–42 px, labels at least 18 px, borders 2–4 px.

## 2b. Imaginary components

An imaginary component is **a truthful simplification**: it shows something the product really does, in a cleaner form than today's UI.

Good imaginary components:
- one job each: a flag, a score, a diff, a toast, a stack of processed items,
- drawn in the brand's tokens so they read as "this company's product",
- using plausible, clearly demo-scale data (`Checkout conversion −18% · since 09:42`),
- sharing one visual grammar: the same radius, shadow and icon style.

Never:
- show a capability the product doesn't have,
- use real customer names or logos without permission,
- present invented numbers as statistics ("used by 10,000 teams").

## 3. A starter set of imaginary components

The theme sheets in [`docs/themes`](../docs/themes) contain many of these, drawn in pure HTML/CSS:

| Component | Proves | See |
|---|---|---|
| Anomaly flag card | the product noticed something | 001, 005, 024 |
| Command palette | the product answers instantly | 002 |
| Review / diff block | the change is safe and the human approves | 004, 016 |
| Metric tile + sparkline | the product watches continuously | 055, 063 |
| Toast / notification stack | the product speaks up at the right time | 059, 007 |
| Before → after stacks | chaos becomes order | 050, 057 |
| Multiplayer cursor | a human and the AI work side by side | 003 |
| Timeline scrubber | it happened at a specific moment | 008, 097 |

## 4. Brand elements are never imaginary

Use only the **official** logo files, colours and fonts. Don't redraw a logo. If you need a pixel-art or 3D version, derive it from the official vector (rasterise or extrude it), don't approximate it by hand.
