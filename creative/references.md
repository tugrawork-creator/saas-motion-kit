# References: learn from real videos, credit the people who made them

The fastest way to get better at motion is to study films people loved: the launch video everyone shared, the ad you watched three times. The kit now has a way to do that openly. You bring real videos as references, measure what makes them work, borrow the grammar, and name the people you learned from, in the repo and when you post.

**The rule: every reference is credited by name and link, and only grammar is borrowed. Never assets.**

## What you may borrow, and what you may not

| Borrow (grammar) | Don't take (assets) |
|---|---|
| Rhythm: cuts per 10 s, how fast the first 3 s go, where the hold is | Their footage, frames or screen recordings |
| Structure: hook → reveal → proof → CTA, where the surprise sits | Their music, sound design or voice-over |
| A transition *type* (a match cut on a shape, a whip into a UI) | Their characters, mascots, logos or copy |
| A camera idea (an over-the-shoulder dive, a dolly-out reveal) | A signature look so close it could pass for theirs |

Use a reference to set a target ("our hook should cut as fast as theirs"), then make the film your own: your product, your component, your tone. The variety audit still applies. Mixing two or three references is healthier than copying one.

## Credit, in three places

1. **`REFERENCES.md`** next to the storyboard: one row per reference with the id, the creator, the title, a link to the original and what you borrowed. Start from [`templates/REFERENCES.md`](../templates/REFERENCES.md).
2. **The ledger:** write `ref:<id>` in the notes of every shot that borrows from a reference. `tools/variety_audit.py`, and the GitHub Action with it, fails when a `ref:` has no credited row with a creator and a link.
3. **When you post:** a credit line like "Rhythm inspired by @handle's launch film (link). Made with saas-motion-kit." Tag them. People like to be told their work taught someone.

## Keep their work theirs

- Link to the original. Never re-upload it, and never commit the video or its frames. `tools/breakdown.py` writes into `.references/`, which is git-ignored.
- Study videos you can watch legally. Downloading may be against a platform's terms. If you want their actual footage in your film, ask them for permission.
- Don't present a reference as yours, and don't present your film as theirs.

## The loop

```
pick 2–5 videos you love  →  tools/breakdown.py on each  →  fill REFERENCES.md
        →  set targets in the storyboard (ref:<id> in the notes)  →  variety audit  →  credit when you post
```

```bash
python tools/breakdown.py launch.mp4 --id 01 --creator "@handle" --title "v2 launch" --url https://x.com/handle/status/…
# → .references/01/breakdown.md (rhythm, shot list, draft ledger) and sheet.jpg (one frame per shot)
```

`breakdown.py` measures hard cuts. With its default threshold of 0.1, it found every hard cut in the kit's own films with no false ones. Dissolves, whips and fades through black aren't cuts, so split those shots by hand while you annotate the draft ledger.
