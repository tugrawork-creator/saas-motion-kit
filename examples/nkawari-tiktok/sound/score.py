"""N'Ka Wari · « Dites-le, c'est noté » — original score, composed in code.

Usage: .venv/bin/python sound/score.py           (from examples/nkawari-tiktok)
Writes 48 kHz stereo WAV stems to sound/out/: music.wav, sfx.wav, mix.wav.

120 BPM, 1 beat = 0.5 s, 1 bar = 2 s, F minor. An amapiano-leaning groove (log-drum bass,
soft four-on-the-floor kick, 16th shaker, claps on 2 & 4, FM electric-piano stabs), scored
to STORYBOARD.md: thinning from 4 s, true silence at 7.0–7.5, an inhale into the drop at 8.0,
a one-bar tension during the tear (16–18), a low-pass "no network" bus (30–34) that opens on
the bar, a break before the final hit (37.5–38) and a ring-out to 45 s.
Everything is synthesised (no samples, nothing licensed) and seeded, so every run is identical.
"""
import os
import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt

SR = 48000
DUR = 45.0
N = int(SR * DUR)
BEAT = 0.5
BAR = 2.0
OUT = os.path.join(os.path.dirname(__file__), "out")
rng = np.random.default_rng(2026)


def hz(m): return 440.0 * 2 ** ((m - 69) / 12)
def tt(n): return np.arange(n) / SR
def bp(x, lo, hi, order=2): return sosfilt(butter(order, [lo, hi], "bandpass", fs=SR, output="sos"), x)
def lp(x, f, order=2): return sosfilt(butter(order, f, "lowpass", fs=SR, output="sos"), x)
def hp(x, f, order=2): return sosfilt(butter(order, f, "highpass", fs=SR, output="sos"), x)


def place(bus, t0, sig, gain=1.0, pan=0.0):
    """Add a mono signal to a stereo bus at time t0 with constant-power pan (-1..1)."""
    i = int(round(t0 * SR))
    if i >= len(bus) or i + len(sig) <= 0:
        return
    s = sig
    if i < 0:
        s, i = s[-i:], 0
    s = s[: len(bus) - i]
    a = (pan + 1) * np.pi / 4
    bus[i:i + len(s), 0] += s * gain * np.cos(a)
    bus[i:i + len(s), 1] += s * gain * np.sin(a)


def env(n, attack, decay):
    t = tt(n)
    return np.clip(t / max(attack, 1e-4), 0, 1) * np.exp(-t / decay)


# ---------------------------------------------------------------- instruments
def epiano(m, dur=0.9, bright=1.0):
    """FM electric piano: 1:1 carrier/modulator, index decaying fast → bell attack, warm body."""
    n = int(SR * dur); t = tt(n); f = hz(m)
    index = (0.4 + 2.2 * bright * np.exp(-t / 0.05))
    tone = np.sin(2 * np.pi * f * t + index * np.sin(2 * np.pi * f * t))
    tine = 0.15 * np.sin(2 * np.pi * f * 7.0 * t) * np.exp(-t / 0.012)
    return (tone + tine) * env(n, 0.003, dur / 2.6)


def chord(notes, dur=0.9, bright=1.0):
    return sum(epiano(m, dur, bright) for m in notes) / len(notes)


def log_drum(m, dur=0.42):
    """Amapiano log drum: pitched sine that dives into its note, 2nd harmonic, tanh warmth."""
    n = int(SR * dur); t = tt(n); f = hz(m)
    fi = f * (1 + 0.9 * np.exp(-t / 0.018))
    ph = 2 * np.pi * np.cumsum(fi) / SR
    x = np.sin(ph) + 0.35 * np.sin(2 * ph) * np.exp(-t / 0.08)
    return np.tanh(1.8 * x * env(n, 0.002, dur / 3.0)) * 0.8


def kick(dur=0.35):
    n = int(SR * dur); t = tt(n)
    fi = 48 + 70 * np.exp(-t / 0.03)
    x = np.sin(2 * np.pi * np.cumsum(fi) / SR)
    click = rng.standard_normal(n) * np.exp(-t / 0.002) * 0.15
    return (x + click) * env(n, 0.001, 0.11)


def shaker(accent=1.0):
    n = int(SR * 0.07)
    x = hp(rng.standard_normal(n), 6000) * env(n, 0.004, 0.018)
    return x * accent


def clap():
    n = int(SR * 0.25); x = np.zeros(n)
    for k, d in enumerate([0.0, 0.009, 0.019]):
        i = int(d * SR); m = n - i
        x[i:] += rng.standard_normal(m) * np.exp(-tt(m) / (0.006 if k < 2 else 0.06))
    return bp(x, 900, 3200) * 0.9


def marimba(m, dur=0.45, bright=0.35):
    n = int(SR * dur); t = tt(n); f = hz(m)
    tone = (np.sin(2 * np.pi * f * t) + bright * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t / 0.03)
            + 0.2 * np.sin(2 * np.pi * f * 10 * t) * np.exp(-t / 0.008))
    return tone * env(n, 0.002, dur / 3.5)


def woodblock(f=900, dur=0.12):
    n = int(SR * dur); t = tt(n)
    return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.7 * t)) * env(n, 0.001, 0.025)


def noise_swell(dur, lo, hi, rise=True):
    n = int(SR * dur)
    x = bp(rng.standard_normal(n), lo, hi)
    shape = np.linspace(0, 1, n) ** 2 if rise else np.linspace(1, 0, n) ** 2
    return x * shape / (np.abs(x).max() + 1e-9)


def thud(m=29):
    n = int(SR * 0.4); t = tt(n)
    x = np.sin(2 * np.pi * hz(m) * t * (1 + 0.5 * np.exp(-t / 0.02)))
    return x * env(n, 0.002, 0.09)


def paper_tear():
    n = int(SR * 0.3); t = tt(n)
    grit = rng.standard_normal(n) * (0.4 + 0.6 * (rng.random(n) > 0.82))
    x = bp(grit, 1200, 7000) * np.clip(t / 0.01, 0, 1) * np.exp(-t / 0.09)
    return x / (np.abs(x).max() + 1e-9)


def room(x, mix=0.16, size=0.09):
    ir_n = int(SR * size * 4)
    ir = np.random.default_rng(3).standard_normal(ir_n) * np.exp(-np.arange(ir_n) / (SR * size))
    wet = np.convolve(x, ir)[: len(x)]
    return x + mix * wet / (np.abs(wet).max() + 1e-9) * (np.abs(x).max() + 1e-9)


# ---------------------------------------------------------------- harmony (one chord per bar)
FM9 = dict(root=41, voicing=[56, 60, 63, 67])     # Fm9
DB9 = dict(root=37, voicing=[53, 56, 60, 63])     # D♭maj9
AB7 = dict(root=44, voicing=[55, 60, 63, 68])     # A♭maj7
EB9 = dict(root=39, voicing=[55, 58, 63, 65])     # E♭add9
CYCLE = [FM9, DB9, AB7, EB9]
PROG = [CYCLE[b % 4] for b in range(23)]
PROG[19], PROG[20], PROG[21], PROG[22] = AB7, DB9, EB9, AB7   # end bright, resolve on A♭


def bar_t(b, beat): return b * BAR + beat * BEAT


# ---------------------------------------------------------------- arrangement
music = np.zeros((N, 2))
drums = np.zeros((N, 2))

STAB = [0.0, 1.5, 3.0]                    # syncopated stabs: 1, &-of-2, 4
LOG = [0.0, 0.75, 1.5, 2.25, 3.0, 3.5]    # log-drum rhythm in beats
LOG_STEP = [0, 0, 7, 0, 3, 5]             # semitone offsets over the root
SH_ACC = [1.0, 0.35, 0.6, 0.35]

for b in range(23):
    c = PROG[b]
    # keys: every bar except the true-silence/inhale bar is handled by envelopes below
    bright = 0.6 if b < 4 else 1.0
    for s in STAB:
        place(music, bar_t(b, s), chord(c["voicing"], 0.95, bright), 0.55, pan=-0.25)
        place(music, bar_t(b, s) + 0.012, chord(c["voicing"], 0.95, bright), 0.35, pan=0.35)   # width
    drums_on = (4 <= b <= 7) or (9 <= b <= 18) or (19 <= b <= 20)
    log_on = drums_on or b == 21
    if log_on:
        for s, step in zip(LOG, LOG_STEP):
            place(music, bar_t(b, s), log_drum(c["root"] + 12 + step), 0.55)
    if drums_on:
        for k in range(4):
            place(drums, bar_t(b, k), kick(), 0.6)
        if b >= 6:
            for k in (1, 3):
                place(drums, bar_t(b, k), clap(), 0.32, pan=0.1)
    if b >= 0 and (b <= 2 or drums_on):
        for k in range(16):
            place(drums, bar_t(b, k * 0.25), shaker(SH_ACC[k % 4]), 0.22, pan=0.45 if k % 2 else 0.3)

# tension bar during the tear (16–18): one long log drum on the root, shaker ticking
place(music, 16.0, log_drum(PROG[8]["root"] + 12, 1.6), 0.5)
for k in range(16):
    place(drums, 16.0 + k * 0.125 * 2, shaker(SH_ACC[k % 4]), 0.18, pan=0.4)
place(drums, 17.75, clap(), 0.3)                        # pickup into the rows

# the inhale: a reversed Fm9 swell that lands exactly on the drop
inh = room(chord(FM9["voicing"] + [72], 0.6, 1.0))[::-1]
inh *= np.linspace(0, 1, len(inh)) ** 1.5
place(music, 8.0 - len(inh) / SR, inh, 0.9)

# final chord ring-out (44 → 45)
place(music, 44.0, chord(AB7["voicing"] + [72], 2.5, 0.7), 0.8)
place(music, 44.0, log_drum(AB7["root"] + 12, 1.2), 0.5)

bus = music + drums

# --- envelopes (time → gain), linear between points
def curve(points):
    ts, gs = zip(*points)
    return np.interp(tt(N), ts, gs)

# "no network" (30–34): crossfade to a muffled copy, open on the bar
muffled = np.stack([lp(bus[:, 0], 380, 4), lp(bus[:, 1], 380, 4)], 1) * 0.8
thin = np.stack([lp(bus[:, 0], 1100, 2), lp(bus[:, 1], 1100, 2)], 1)
mix_muf = curve([(0, 0), (29.95, 0), (30.1, 1), (33.5, 1), (34.0, 0), (DUR, 0)])[:, None]
mix_thin = curve([(0, 0), (4.0, 0), (5.5, 1), (7.0, 1), (7.01, 0), (DUR, 0)])[:, None]
bus = bus * (1 - mix_muf - mix_thin) + muffled * mix_muf + thin * mix_thin

# gain: the hook sits low, thins out, true silence 7.0–7.5, break before the final hit
g = curve([(0, 0.7), (4.0, 0.7), (6.8, 0.25), (6.99, 0.0), (7.5, 0.0), (7.51, 1.0),
           (37.48, 1.0), (37.5, 0.0), (37.55, 0.0), (DUR, 0.0)])
# re-open after the break: the inhale-like swell and the final hit live outside that mute
g2 = curve([(0, 0), (37.99, 0), (38.0, 1.0), (42.0, 1.0), (45.0, 0.0)])
bus = bus * np.maximum(g, g2)[:, None]
# the inhale must survive the silence window: re-add it on its own
place(bus, 8.0 - len(inh) / SR, inh, 0.9)

# break swell into the final hit (37.5 → 38.0)
place(bus, 37.5, noise_swell(0.5, 600, 5000) * 0.35, 1.0)
rev = room(chord(AB7["voicing"], 0.5, 1.0))[::-1] * np.linspace(0, 1, int(SR * 0.5)) ** 1.5
place(bus, 38.0 - len(rev) / SR, rev, 0.8)

# ---------------------------------------------------------------- SFX stem (tuned to the key)
sfx = np.zeros((N, 2))
F4, AB4, C5, EB5, F5, AB5, C6 = 65, 68, 72, 75, 77, 80, 84

for t0, m in zip([0.0, 0.5, 1.0, 1.25, 1.5, 1.75], [F4, AB4, C5, EB5, F5, AB5]):      # tile cascade
    place(sfx, t0, room(marimba(m, 0.35, 0.3)), 0.35, pan=-0.2 + 0.08 * (m - F4) / 3)
for i in range(5):                                                                     # evaporating tiles
    place(sfx, 4.25 + i * 0.5, noise_swell(0.5, 2500, 9000, rise=False) * 0.12, 1.0, pan=-0.4 + 0.2 * i)
for t0, m in zip([8.0, 8.07, 8.14, 8.21], [AB4, C5, EB5, AB5]):                          # reveal chime
    place(sfx, t0, room(marimba(m, 0.8)), 0.5)
place(sfx, 8.5, room(woodblock(820)), 0.45)                                             # mic press
place(sfx, 14.5, room(marimba(C5, 0.6, 0.2)), 0.3)                                      # « et » swells
for k in range(6):                                                                      # perforation
    place(sfx, 16.05 + k * 0.075, woodblock(1500, 0.05), 0.22, pan=-0.1)
place(sfx, 16.75, paper_tear(), 0.55)                                                   # the tear
place(sfx, 16.85, room(marimba(C5, 0.3)), 0.18)
place(sfx, 17.05, room(marimba(AB4, 0.35)), 0.15)                                       # « et » falls
for t0, m in [(18.0, F5), (19.0, AB5)]:                                                 # rows land
    place(sfx, t0, thud(), 0.55)
    place(sfx, t0, room(marimba(m, 0.5)), 0.35)
place(sfx, 20.5, room(woodblock(1050)), 0.2); place(sfx, 21.0, room(woodblock(1250)), 0.2)
place(sfx, 22.0, noise_swell(1.1, 300, 2500) * 0.25, 1.0)                               # air whoosh (dolly-out)
place(sfx, 23.7, room(woodblock(900)), 0.35)                                            # receipt button
for k in range(6):                                                                      # receipt prints
    for j in range(3):
        place(sfx, 24.3 + k * 0.12 + j * 0.025, woodblock(2200 + 120 * j, 0.03), 0.1, pan=0.2)
scan = noise_swell(1.5, 1500, 6000)
scan *= np.sin(np.linspace(0, np.pi, len(scan)))
place(sfx, 25.5, scan * 0.25, 1.0)                                                      # scan sweep
place(sfx, 26.0, room(marimba(C5, 0.4)), 0.35); place(sfx, 26.09, room(marimba(EB5, 0.5)), 0.35)
place(sfx, 28.5, noise_swell(0.6, 200, 1500, rise=False) * 0.25, 1.0)                   # photo deleted
drng = np.random.default_rng(31)
for k in range(14):                                                                     # dither clicks
    place(sfx, 29.45 + drng.random() * 0.45, woodblock(1800 + drng.random() * 1600, 0.03), 0.12, pan=drng.uniform(-0.6, 0.6))
for t0 in (30.65, 31.4, 32.15):                                                         # muffled mic taps
    place(sfx, t0, lp(woodblock(700), 900), 0.4)
for t0, m in zip([33.5, 33.57, 33.64], [F5, AB5, C6]):                                  # signal back
    place(sfx, t0, room(marimba(m, 0.5)), 0.35)
place(sfx, 33.75, noise_swell(0.5, 800, 7000) * 0.3, 1.0)                               # queue rushes out
place(sfx, 34.25, room(marimba(EB5, 0.4)), 0.3); place(sfx, 34.34, room(marimba(AB5, 0.5)), 0.3)
for t0, m in zip([34.75, 35.25, 35.75, 36.25], [AB4, C5, EB5, AB5]):                     # account plucks
    place(sfx, t0, room(marimba(m, 0.45)), 0.3, pan=0.3)
place(sfx, 38.0, thud(), 0.6)                                                           # final hit
for t0, m in zip([38.0, 38.07, 38.14, 38.21], [AB4, C5, EB5, AB5 + 4]):
    place(sfx, t0, room(marimba(m, 1.0)), 0.5)
place(sfx, 41.0, room(marimba(AB5, 0.5)), 0.3)                                          # CTA button

# ---------------------------------------------------------------- master
def limit(x, ceiling=0.84):
    return np.tanh(x / ceiling) * ceiling

edge = int(SR * 0.005)
for x in (bus, sfx):
    x[:edge] *= np.linspace(0, 1, edge)[:, None]

mix = limit(bus + sfx)
os.makedirs(OUT, exist_ok=True)
peak = max(np.abs(bus).max(), np.abs(sfx).max(), 1e-9)
sf.write(os.path.join(OUT, "music.wav"), limit(bus).astype(np.float32), SR)
sf.write(os.path.join(OUT, "sfx.wav"), limit(sfx).astype(np.float32), SR)
sf.write(os.path.join(OUT, "mix.wav"), mix.astype(np.float32), SR)
print("wrote", OUT, "| peaks music %.2f sfx %.2f mix %.2f" % (np.abs(bus).max(), np.abs(sfx).max(), np.abs(mix).max()))
