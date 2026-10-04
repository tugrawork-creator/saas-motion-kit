"""Synthesise the film's score: noise that builds, a hard cut to true silence, then a few calm notes.

Usage: python score.py            (writes assets/audio/score.wav, 48 kHz stereo, 24.0 s)
Needs numpy. Everything is seeded, so every run writes the same file. No samples, no music licence.

The cue sheet matches index.html:
  0.0–5.0   scroll ticks, hiss, notification pings, a detuned drone and a riser, all rising
  5.0       hard cut: the mix drops to digital silence (no reverb tail)
  5.8       the first note after the silence; 6.6 / 7.6 / 8.4 one note per line of type
  8.4–18.6  a quiet C-major pad under the proof, with ticks for the switches and pills
  14.85     the whip pan; 15.5–17.6 six rising plucks as the screens wake
  19.5      the resolving chord; everything is silent from 23.0 to the end
"""
import os, wave
import numpy as np

SR = 48000
LENGTH = 24.0
N = int(SR * LENGTH)
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "assets", "audio", "score.wav")
rng = np.random.default_rng(2026)

NOTE = {"C2": 65.41, "C3": 130.81, "G3": 196.00, "C4": 261.63, "D4": 293.66, "E4": 329.63, "G4": 392.00,
        "C5": 523.25, "D5": 587.33, "E5": 659.25, "G5": 783.99, "A5": 880.00, "C6": 1046.50, "E6": 1318.51}

# where the six device screens wake (same formula as index.html)
DEVICE_X = [130, 369, 748, 1067, 1396, 1755]
WAKE = [15.5 + 2.1 * (x + 300) / 2500 for x in DEVICE_X]


def t_axis(n):
    return np.arange(n) / SR


def env(n, attack, decay):
    t = t_axis(n)
    return np.clip(t / max(attack, 1e-4), 0, 1) * np.exp(-t / decay)


def marimba(f, dur=0.9, bright=0.3):
    n = int(SR * dur); t = t_axis(n)
    tone = (np.sin(2 * np.pi * f * t) + bright * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t / 0.03)
            + 0.15 * np.sin(2 * np.pi * f * 10 * t) * np.exp(-t / 0.008))
    return tone * env(n, 0.003, dur / 3.2)


def sine(f, dur, attack=0.01, decay=0.5):
    n = int(SR * dur)
    return np.sin(2 * np.pi * f * t_axis(n)) * env(n, attack, decay)


def woodblock(f, dur=0.06):
    n = int(SR * dur); t = t_axis(n)
    return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.7 * t)) * env(n, 0.0008, 0.012)


def room(x, mix=0.16, size=0.11, seed=3):
    r = np.random.default_rng(seed)
    ir_n = int(SR * size * 4)
    ir = r.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / (SR * size))
    wet = np.convolve(x, ir)[: len(x)]
    return x + mix * wet / (np.abs(wet).max() + 1e-9) * np.abs(x).max()


def place(bus, t0, sig, gain=1.0, pan=0.0):
    """Add a mono signal to a stereo bus at time t0 with constant-power pan (-1 left … 1 right)."""
    i = int(t0 * SR)
    sig = sig[: max(0, N - i)]
    a = (pan + 1) * np.pi / 4
    bus[0, i:i + len(sig)] += gain * np.cos(a) * sig
    bus[1, i:i + len(sig)] += gain * np.sin(a) * sig


def lowpass(x, k):
    return np.convolve(x, np.ones(k) / k, mode="same")


def noise_section():
    bus = np.zeros((2, N))
    end = int(5.0 * SR)
    t = t_axis(end)
    # hiss: soft, rising, decorrelated per channel
    rise = 0.012 + 0.06 * (t / 5.0) ** 2
    for ch in range(2):
        bus[ch, :end] += lowpass(rng.standard_normal(end), 7) * rise
    # scroll ticks: intervals shrink from 0.30 s to 0.055 s
    tt, gap = 0.10, 0.30
    while tt < 4.98:
        place(bus, tt, woodblock(1700 + rng.uniform(-250, 250)), 0.16, rng.uniform(-.7, .7))
        tt += gap
        gap = max(0.055, gap * 0.93)
    # notification pings: denser towards the cut, deliberately out of key
    pings = [1318.5, 1661.2, 1975.5, 1108.7, 1396.9, 1864.7]
    tt = 1.3
    while tt < 4.95:
        f = pings[int(rng.integers(len(pings)))]
        p = rng.uniform(-.8, .8)
        place(bus, tt, sine(f, 0.22, 0.002, 0.05), rng.uniform(.06, .12), p)
        if rng.random() < .3:
            place(bus, tt + 0.09, sine(f * 1.26, 0.2, 0.002, 0.05), .07, p)
        tt += rng.uniform(0.05, 0.42) * (1.15 - (tt / 5.0))
    # detuned drone cluster with tremolo
    d0 = int(1.6 * SR)
    td = t_axis(end - d0)
    drone = np.zeros(end - d0)
    for f in (110.0, 116.54, 164.81):
        for k in range(1, 7):
            drone += np.sin(2 * np.pi * f * k * td + k) / k
    drone *= (td / td[-1]) ** 1.6 * 0.03 * (1 + 0.3 * np.sin(2 * np.pi * 6 * td))
    for ch, det in ((0, 1.0), (1, 1.004)):
        bus[ch, d0:end] += np.interp(np.arange(len(drone)) * det, np.arange(len(drone)), drone)
    # riser: three octaves of an exponential sweep
    r0 = int(3.2 * SR)
    tr = t_axis(end - r0)
    frac = tr / tr[-1]
    riser = sum(np.sin(2 * np.pi * np.cumsum(220 * m * 4 ** frac) / SR) for m in (1, 2, 4)) * frac ** 2 * 0.03
    bus[:, r0:end] += riser
    for ch in range(2):
        bus[ch, :end] = room(bus[ch, :end], 0.12, 0.08, seed=5 + ch)
    # the hard cut: a 4 ms ramp so it doesn't click, then digital silence
    ramp = int(0.004 * SR)
    bus[:, end - ramp:end] *= np.linspace(1, 0, ramp)
    bus[:, end:] = 0
    return bus


def music_section():
    bus = np.zeros((2, N))
    # the first sounds after the silence: one note per line of type
    place(bus, 5.8, marimba(NOTE["C5"], 2.4), .30)
    place(bus, 5.8, sine(NOTE["C3"], 3.0, 0.02, 1.0), .22)
    place(bus, 5.8, sine(NOTE["C6"], 1.6, 0.01, 0.5), .04)
    place(bus, 6.6, marimba(NOTE["G4"], 1.6), .18, -.2)
    place(bus, 7.6, marimba(NOTE["E5"], 1.6), .18, .2)
    place(bus, 8.4, marimba(NOTE["C5"], 1.8), .16, -.1)
    place(bus, 8.4, marimba(NOTE["G5"], 1.8), .12, .1)
    # pad under the proof: C3 G3 D4 E4, slow attack, slight chorus
    p0, p1 = 8.4, 18.6
    n = int((p1 - p0 + 0.9) * SR); t = t_axis(n)
    shape = np.clip(t / 1.6, 0, 1) * np.clip((p1 - p0 + 0.9 - t) / 0.9, 0, 1)
    for i, f in enumerate((NOTE["C3"], NOTE["G3"], NOTE["D4"], NOTE["E4"])):
        for ch, det in ((0, -0.18), (1, 0.18)):
            wob = 1 + 0.12 * np.sin(2 * np.pi * (0.11 + 0.03 * i) * t + i)
            bus[ch, int(p0 * SR):int(p0 * SR) + n] += 0.032 * wob * shape * np.sin(2 * np.pi * (f + det) * t)
    # proof ticks and pops
    place(bus, 9.5, woodblock(1400), .07)
    place(bus, 10.45, woodblock(1800), .06, .4)
    place(bus, 10.95, woodblock(2000), .06, .45)
    place(bus, 11.3, sine(NOTE["E6"], 0.8, 0.005, 0.25), .05, -.2)
    place(bus, 12.5, marimba(NOTE["G5"], 0.5), .13, .3)
    place(bus, 13.3, marimba(NOTE["C6"], 0.4), .09, .3)
    # whip pan: a soft noise swell panned right to left
    w = int(0.45 * SR)
    swell = lowpass(rng.standard_normal(w), 24) * np.sin(np.pi * np.arange(w) / w) ** 2 * 0.5
    place(bus, 14.85, swell[: w // 2], .25, .6)
    place(bus, 14.85 + 0.225, swell[w // 2:], .25, -.6)
    # six screens wake, six rising plucks
    for tw, note, pan in zip(WAKE, ("C5", "D5", "E5", "G5", "A5", "C6"), (-.6, -.4, -.15, .15, .4, .6)):
        place(bus, tw, marimba(NOTE[note], 0.9, 0.2), .11, pan)
    # the line rises, then the resolving chord
    place(bus, 18.6, sine(NOTE["C4"], 1.0, 0.6, 0.6), .05)
    for note, g in (("C4", .16), ("E4", .12), ("G4", .12), ("C5", .12)):
        place(bus, 19.5, marimba(NOTE[note], 3.2, 0.2), g)
    place(bus, 19.5, sine(NOTE["C2"], 3.4, 0.03, 1.2), .2)
    place(bus, 20.1, sine(NOTE["E6"], 1.2, 0.02, 0.4), .03, .2)
    for ch in range(2):
        bus[ch] = room(bus[ch], 0.18, 0.12, seed=9 + ch)
    # real silence from 23.0 s: fade 22.4–23.0, then zeros
    a, b = int(22.4 * SR), int(23.0 * SR)
    bus[:, a:b] *= np.linspace(1, 0, b - a)
    bus[:, b:] = 0
    bus[:, : int(5.8 * SR)] = 0
    return bus


def main():
    mix = noise_section() + 0.5 * music_section()  # the noise peaks louder than any note after it
    mix *= 0.89 / (np.abs(mix).max() + 1e-9)  # peak at -1 dBFS; tools/deliver.sh sets the loudness
    pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with wave.open(OUT, "wb") as f:
        f.setnchannels(2); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes(pcm.tobytes())
    print(f"wrote {OUT} ({LENGTH:.1f} s, {SR} Hz, stereo)")


if __name__ == "__main__":
    main()
