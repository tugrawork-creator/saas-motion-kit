# 3 · Theme

Open the [gallery](https://tugrawork-creator.github.io/saas-motion-kit/) and shortlist **two or three** themes that fit the audience and the channel.

| If your audience is… | Try |
|---|---|
| developers | 002 ⌘K Keyboard Symphony, 004 Code Review Diff, 082 Kaomoji Terminal |
| finance / ops buyers | 053 Editorial Data, 005 Light-Mode Data HUD, 019 Guilloche Banknote |
| broad B2B, a friendly tone | 021 Clay Studio, 055 Bento Grid, 062 Mascot Agent |
| booth / big screen | 052 Depth / 3D, 057 Isometric World, 089 Pop-Art Ben-Day |
| premium / keynote | 061 Dark Keynote, 024 Glass Loupe, 100 Rack Focus |

Or let the picker do the first pass. It scores every theme against the tone and the audience words and skips the themes of your last five films:

```bash
python tools/pick_themes.py --tone warm --audience "finance ops" --history ~/.motion-ledger.json
```

Ask the agent to redraw the key frame (cell 3, the proof moment) of each shortlisted theme **in your brand and with your components**. Choose one from those redrawn frames, not from the Acme versions.

**Gate:** you pick one theme and write its number and any changes into the brief.
