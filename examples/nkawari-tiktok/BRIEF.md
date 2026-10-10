---
workflow: product-launch-video
format: 1080x1920
duration: 45s
audio: music
loop: false
theme: "055 Bento Grid"
---

# N'Ka Wari — « Dites-le, c'est noté »

**One message:** Dites votre dépense. Elle est déjà notée. (Say your expense out loud, and it's already logged.)

**Audience & channel:** French-speaking people in the FCFA zone (Côte d'Ivoire, Sénégal, Mali, Burkina…) who mean to track their spending but never do. TikTok, 9:16, sound on, but every beat must still read with the sound off (captions are the film's only words; no voiceover).

**Truth source:** https://nkawari.marakadev.online/. Claims and numbers come only from there:
- one spoken sentence can hold several expenses: « deux mille de taxi ce matin et cinq mille de courses » → Taxi · Transport −2 000 F and Courses au marché · Alimentation −5 000 F
- amounts spoken in words are understood
- « Noter une dépense doit prendre trois secondes, sinon on ne le fait pas. »
- works offline: entries queue on the phone and sync when the network returns
- accounts named like in real life: Orange Money, Wave, espèces, compte bancaire
- free to track, forever; 14 days of everything with no card; paid plan from 1 000 FCFA/month, paid by Mobile Money
- voice is transcribed on the phone and never sent
- Android 5.0+, a 47 MB .apk downloaded from the site (not on the Play Store)

**Proof moment:** the dictated sentence appears word by word, then splits into two categorised tiles: 🚕 Taxi −2 000 F and 🧺 Courses −5 000 F.

**Components** (from `capture/`; each is rebuilt in HTML with the captured tokens, never a pasted screenshot. Score = current / calm / on-brand / shows proof, 0–2 each)
| # | Component | Role | Real or imaginary | Score | Notes |
|---|---|---|---|---|---|
| 1 | **Dictation sheet**: « Dictez votre dépense », olive mic, waveform, words lighting up | **proof** | real | 8 | Hero mock on the site. The sentence is the site's own: « deux mille de taxi ce matin et cinq mille de courses ». |
| 2 | **Transaction row**: emoji/icon chip, name, « Transport · Orange Money », terracotta amount | proof payoff | real | 8 | The two rows the sentence becomes: 🚕 Taxi · Transport −2 000 F, 🧺 Courses au marché · Alimentation −5 000 F. |
| 3 | **Action trio**: receipt button, mic button, « + Ajouter » pill | supporting | real | 7 | From the app's bottom bar. The mic is the film's recurring "press" object. |
| 4 | **Solde total card**: olive gradient card, big Clash numeral, Revenus / Dépenses | supporting (giant-number tile) | real | 7 | Uses the app's demo data shape only (« Solde total », FCFA). The figure stays demo-scale and isn't framed as a statistic. |
| 5 | **Répartition donut**: « Total 92k » with category arcs | supporting (micro-motion tile) | real, simplified | 6 | Arcs draw in, with no legend. Only the app's own demo values. |
| 6 | **Receipt ticket**: DOLIPRANE 3 200 … NET À PAYER 12 500 · ESPÈCES 20 000 · RENDU 7 500 → « Retenu : 12 500 F » | supporting (theme's ink-table tile, scan band) | real | 7 | Straight from the site's receipt block. It gets one tile only, to stay on message. |
| 7 | **Offline queue**: three entries stacked « en attente », a signal glyph returns, they sync | supporting | **imaginary** | – | The site states the behaviour but shows no UI for it. A truthful simplification. |
| 8 | **Account chips**: Orange Money · Wave · Espèces · Compte bancaire | supporting | **imaginary** | – | Text chips in brand tokens. **No Orange/Wave logos** (not ours to use). |
| 9 | **Offer tile**: « Gratuit pour compter » + « 14 jours, sans carte » + « Télécharger pour Android » | CTA | real copy | – | Lockup with the official mark and the site URL. |

**Brand elements:** official mark `assets/brand/nkawari-mark.svg` (lifted unchanged from the site) · fonts in `assets/fonts/` (the site's own self-hosted woff2: Clash Display 600/700, Work Sans 400/500/600, subset for French) · palette as below.

*Dropped:* the install steps (01–03), the full pricing table and the privacy section. They're true but off-message for 45 s.

**Brand:** official logo = the site's inline 120×120 SVG mark (lifted as-is, never redrawn) · colours: crème #FAF7EC, crème-2 #F1ECDB, encre #1C1E12, olive #5E6B2E, olive foncé #3F4A18, lime #C3D94F, lime pâle #E6EEBC, dépense (terracotta) #C0562F · fonts: Clash Display (600/700), Work Sans (400/500/600), served locally with latin-ext.

**Do / Don't:**
- On-screen language is French. Write accents and capitals by hand (no `text-transform`). Amounts are written « 2 000 F » with a thin space.
- Don't invent users, ratings, download counts or savings figures.
- Don't imply it's on the Play Store; the CTA is the site.
- Theme 055 is re-skinned in N'Ka Wari's warm lime/olive on crème (no teal/peach). Its "coral anomaly tile" becomes the terracotta *dépense* tile.

**Theme 055 · Bento Grid, adapted** (proof-frame still: `stills/055-proof.png`)
- Shell: **6 × 10** for 9:16 (instead of 6×6). It sits at x 60 / y 150, 880 × 1370, gutter 16, radius 16, and never changes between scenes. It keeps clear of TikTok's right rail (140 px) and the bottom caption zone (400 px).
- Canvas: crème #FAF7EC with soft lime-pâle and terracotta-tint clouds. Tiles are warm white #FFFDF6.
- Labels use Work Sans 600 tracked caps (the brand has no mono font), written uppercase by hand. Numerals are Clash Display.
- The ink tile becomes encre #1C1E12 for the receipt, and the teal scan band is lime instead. The coral anomaly tile becomes a terracotta inset on the newest expense row.
- Clash Display's subset has no U+202F, so amounts use a normal space with `white-space:nowrap`. Clash Display's spaces are very tight, so every Clash headline gets `word-spacing:.14em` (numerals `.06em`).

**Sound:** music-driven, no voiceover. A warm, afro-pop/amapiano-leaning groove at about 112–120 BPM, royalty-free, sourced or generated through /media-use. Cuts land on bars.

**Sound (as built):** an original score composed in code (`sound/score.py`). It uses no samples or licensed material, and the same seed gives an identical result every run. 120 BPM, F minor (Fm9 → D♭maj9 → A♭maj7 → E♭add9), amapiano-leaning: log-drum bass, soft kick, shaker, claps, FM keys. Two stems (`assets/audio/music.m4a`, `assets/audio/sfx.m4a`) play on separate tracks. The mix measures −14.1 LUFS integrated with a −1.9 dBTP peak. To regenerate: `.venv/bin/python sound/score.py`, then encode with the venv's ffmpeg (`imageio-ffmpeg`).

**Deliverables:** `nkawari-dites-le-1080x1920.mp4` (rendered at 4K, downscaled), 45 s ± 0.5 s, under TikTok's size limit.
