"""Synthesise a small set of warm, friendly UI sound effects (no samples, no licences).

Usage: python tools/warm_sfx.py out_dir
Writes 48 kHz mono WAVs: pop, tick, confirm, reveal, whoosh-soft, error-soft.
Everything is tuned to C major and gets a short room reverb, so the set sits together under music.
Needs numpy + soundfile.
"""
import os, sys
import numpy as np
import soundfile as sf

SR = 48000
NOTE = {"C4": 261.63, "E4": 329.63, "G4": 392.00, "A4": 440.00, "C5": 523.25, "E5": 659.25, "G5": 783.99, "C6": 1046.5}

def env(n, attack=0.004, decay=0.25):
    t = np.arange(n) / SR
    a = np.clip(t / attack, 0, 1)
    return a * np.exp(-t / decay)

def marimba(f, dur=0.45, bright=0.35):
    n = int(SR * dur); t = np.arange(n) / SR
    tone = np.sin(2 * np.pi * f * t) + bright * np.sin(2 * np.pi * f * 4 * t) * np.exp(-t / 0.03) + 0.2 * np.sin(2 * np.pi * f * 10 * t) * np.exp(-t / 0.008)
    return tone * env(n, 0.002, dur / 3.5)

def woodblock(f=900, dur=0.12):
    n = int(SR * dur); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.5 * np.sin(2 * np.pi * f * 2.7 * t)) * env(n, 0.001, 0.025)

def room(x, mix=0.14, size=0.09):
    rng = np.random.default_rng(3)                     # seeded → identical output every run
    ir_n = int(SR * size * 4)
    ir = rng.standard_normal(ir_n) * np.exp(-np.arange(ir_n) / (SR * size))
    wet = np.convolve(x, ir)                           # length len(x) + ir_n - 1
    dry = np.pad(x, (0, len(wet) - len(x)))
    y = dry + mix * wet / (np.abs(wet).max() + 1e-9) * np.abs(x).max()
    return y

def seq(*parts):
    """Place (offset_seconds, signal) parts on one timeline."""
    end = max(int(o * SR) + len(s) for o, s in parts)
    out = np.zeros(end)
    for o, s in parts:
        i = int(o * SR); out[i:i + len(s)] += s
    return out

def save(path, x, gain_db=-3):
    x = x / (np.abs(x).max() + 1e-9) * 10 ** (gain_db / 20)
    fade = int(SR * 0.01); x[-fade:] *= np.linspace(1, 0, fade)
    sf.write(path, x.astype(np.float32), SR)

def main(out):
    os.makedirs(out, exist_ok=True)
    sounds = {
        "pop": marimba(NOTE["G5"], 0.3, 0.5),
        "tick": woodblock(1100),
        "confirm": seq((0, marimba(NOTE["E5"], 0.4)), (0.09, marimba(NOTE["G5"], 0.5))),
        "reveal": seq((0, marimba(NOTE["C5"], 0.6)), (0.07, marimba(NOTE["E5"], 0.6)), (0.14, marimba(NOTE["G5"], 0.7)), (0.21, marimba(NOTE["C6"], 0.9))),
        "error-soft": seq((0, marimba(NOTE["A4"], 0.45, 0.2)), (0.12, marimba(NOTE["E4"], 0.55, 0.2))),
    }
    # whoosh-soft: band-limited noise swell, low-passed by averaging (no hiss bed)
    n = int(SR * 0.5); rng = np.random.default_rng(11)
    noise = np.convolve(rng.standard_normal(n), np.ones(40) / 40, mode="same")
    sounds["whoosh-soft"] = noise * np.sin(np.pi * np.arange(n) / n) ** 2
    for name, x in sounds.items():
        save(os.path.join(out, f"{name}.wav"), room(x))
        print("wrote", name)

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "sfx")
