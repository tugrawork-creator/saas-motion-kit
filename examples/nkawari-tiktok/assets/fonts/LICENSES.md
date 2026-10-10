# Fonts

| Font | Files | Licence | In the repo? |
|---|---|---|---|
| Work Sans 400 / 500 / 600 | `WorkSans-*.woff2` | SIL Open Font License 1.1, Copyright 2019 The Work Sans Project Authors (https://github.com/weiweihuanghuang/Work-Sans). Full text: [OFL.txt](OFL.txt) | yes |
| Clash Display 600 / 700 | `ClashDisplay-Semibold.woff2`, `ClashDisplay-Bold.woff2` | ITF Free Font License (Indian Type Foundry, via Fontshare). It allows use but not redistribution of the font files. | **no** (gitignored) |

Both files are the subsets that N'Ka Wari serves from its own site (Latin + French punctuation, woff2).

**Before you render,** put the two Clash Display files here. Either download Clash Display from https://www.fontshare.com/fonts/clash-display and convert the Semibold/Bold weights to woff2 under these names, or fetch the site's own subsets:

```bash
for f in ClashDisplay-Semibold ClashDisplay-Bold; do curl -fL -o "$f.woff2" "https://nkawari.marakadev.online/fonts/$f.woff2"; done
```
