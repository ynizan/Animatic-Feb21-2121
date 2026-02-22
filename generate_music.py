#!/usr/bin/env python3
"""
Generate background music for the InTouch animatic.

Primary method: Procedural synthesis (numpy/scipy) — works fully offline.
  Produces a 85-second ambient pad track in C major (C–Am–F–G progression),
  suitable as subtle background music at volume 0.25.

Alternative: MusicGen via HuggingFace transformers (requires internet access).
  Uncomment the USE_MUSICGEN block below after running:
    pip3 install transformers accelerate

Output:
    audio/music.mp3         (85 seconds, 128kbps MP3)
    public/audio/music.mp3  (copy for Remotion preview)

Re-run anytime to regenerate. Edit CHORD_PROGRESSION or BPM to change style.
"""

import os
import shutil
import sys

import numpy as np
import scipy.io.wavfile
from pydub import AudioSegment

SR          = 44100
BPM         = 72
BEAT_SEC    = 60.0 / BPM          # ~0.833s
CHORD_SEC   = BEAT_SEC * 4        # one chord = 4 beats = ~3.33s
TARGET_SEC  = 85.0
GEN_SEC     = TARGET_SEC + 4      # generate slightly longer, then trim

OUTPUT_MP3  = "audio/music.mp3"
PUBLIC_MP3  = "public/audio/music.mp3"
TMP_WAV     = "/tmp/music_raw.wav"

# ------------------------------------------------------------------
# NOTE UTILITIES
# ------------------------------------------------------------------

_NOTE_SEMITONES = {
    'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3,
    'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8,
    'Ab': 8, 'A': 9, 'A#': 10, 'Bb': 10, 'B': 11,
}

def note_freq(name: str) -> float:
    """Convert note name like 'C4' or 'F#3' to Hz."""
    # Handle sharps/flats before the octave digit
    if len(name) == 2:
        note, octave = name[0], int(name[1])
    else:
        note, octave = name[:2], int(name[2])
    midi = 12 * (octave + 1) + _NOTE_SEMITONES[note]
    return 440.0 * 2.0 ** ((midi - 69) / 12.0)


# ------------------------------------------------------------------
# SYNTHESIS PRIMITIVES
# ------------------------------------------------------------------

HARMONICS_PAD   = [(1, 1.0), (2, 0.45), (3, 0.20), (4, 0.10), (5, 0.04)]
HARMONICS_BASS  = [(1, 1.0), (2, 0.30), (3, 0.08)]


def synth_tone(freq: float, dur: float,
               harmonics=HARMONICS_PAD,
               attack=0.25, sustain_level=0.85, release=0.55) -> np.ndarray:
    """Additive synthesis with ADSR envelope."""
    n = int(SR * dur)
    t = np.linspace(0, dur, n, endpoint=False)

    wave = np.zeros(n)
    for harmonic, amp in harmonics:
        wave += amp * np.sin(2 * np.pi * freq * harmonic * t)

    # Normalise
    peak = np.max(np.abs(wave))
    if peak > 0:
        wave /= peak

    # ADSR envelope
    atk = min(int(SR * attack), n)
    rel = min(int(SR * release), n - atk)
    env = np.full(n, sustain_level)
    env[:atk]  = np.linspace(0.0, sustain_level, atk)
    env[-rel:] = np.linspace(sustain_level, 0.0, rel)
    return wave * env


def render_chord(note_names: list, dur: float, pad_vol=0.32, bass_vol=0.12) -> np.ndarray:
    """Mix pad voices + bass root for one chord."""
    n = int(SR * dur)
    mix = np.zeros(n)

    # Pad voices
    for name in note_names:
        tone = synth_tone(note_freq(name), dur, HARMONICS_PAD)
        mix += tone * pad_vol

    # Bass: root note, one octave down
    root_name = note_names[0]
    octave = int(root_name[-1]) - 1
    if octave >= 0:
        bass_name = root_name[:-1] + str(octave)
        bass_tone = synth_tone(note_freq(bass_name), dur, HARMONICS_BASS,
                               attack=0.10, release=0.40)
        mix += bass_tone * bass_vol

    return mix


# ------------------------------------------------------------------
# REVERB  (Schroeder-style: 4 comb filters + 2 allpass)
# ------------------------------------------------------------------

def _comb(signal: np.ndarray, delay_ms: float, decay: float) -> np.ndarray:
    d = int(SR * delay_ms / 1000)
    out = signal.copy()
    for i in range(d, len(out)):
        out[i] += out[i - d] * decay
    return out


def _allpass(signal: np.ndarray, delay_ms: float, coeff: float) -> np.ndarray:
    d = int(SR * delay_ms / 1000)
    out = signal.copy()
    for i in range(d, len(out)):
        out[i] += -coeff * out[i - d] + coeff * out[i]
    return out


def add_reverb(signal: np.ndarray, wet=0.35) -> np.ndarray:
    comb_params = [(29.7, 0.805), (37.1, 0.827), (41.1, 0.783), (43.7, 0.764)]
    reverb = np.zeros_like(signal, dtype=float)
    for delay_ms, decay in comb_params:
        reverb += _comb(signal.astype(float), delay_ms, decay)
    reverb = _allpass(reverb, 5.0, 0.7)
    reverb = _allpass(reverb, 1.7, 0.7)
    reverb /= max(np.max(np.abs(reverb)), 1e-9)
    return signal.astype(float) * (1 - wet) + reverb * wet


# ------------------------------------------------------------------
# CHORD PROGRESSION
# ------------------------------------------------------------------

# C major, A minor, F major, G major  (4 beats each)
CHORD_PROGRESSION = [
    ['C4', 'E4', 'G4'],    # I   – C major
    ['A3', 'C4', 'E4'],    # vi  – A minor
    ['F3', 'A3', 'C4'],    # IV  – F major
    ['G3', 'B3', 'D4'],    # V   – G major
]


# ------------------------------------------------------------------
# MAIN
# ------------------------------------------------------------------

def generate_track() -> np.ndarray:
    total_samples = int(SR * GEN_SEC)
    track = np.zeros(total_samples, dtype=float)
    pos = 0
    chord_idx = 0

    while pos < total_samples:
        notes   = CHORD_PROGRESSION[chord_idx % len(CHORD_PROGRESSION)]
        samples_left = total_samples - pos
        dur     = min(CHORD_SEC, samples_left / SR)
        if dur < 0.05:
            break

        segment = render_chord(notes, dur)
        end = min(pos + len(segment), total_samples)
        track[pos:end] += segment[:end - pos]
        pos += len(segment)
        chord_idx += 1

    # Reverb
    print("  applying reverb...")
    track = add_reverb(track, wet=0.30)

    # Normalise
    peak = np.max(np.abs(track))
    if peak > 0:
        track = track / peak * 0.88

    # Global fade in (3s) / fade out (4s)
    fi = int(SR * 3.0)
    fo = int(SR * 4.0)
    track[:fi]  *= np.linspace(0.0, 1.0, fi)
    track[-fo:] *= np.linspace(1.0, 0.0, fo)

    return (track * 32767).astype(np.int16)


def main():
    print("Generating background music (procedural synthesis)...")
    print(f"  BPM: {BPM}  |  Chord duration: {CHORD_SEC:.2f}s  |  Target: {TARGET_SEC}s")
    print(f"  Progression: C – Am – F – G (repeating)")

    audio_int16 = generate_track()

    scipy.io.wavfile.write(TMP_WAV, SR, audio_int16)
    print(f"  WAV written to {TMP_WAV}")

    # Trim to target length and export MP3
    seg = AudioSegment.from_wav(TMP_WAV)[:int(TARGET_SEC * 1000)]

    os.makedirs("audio",        exist_ok=True)
    os.makedirs("public/audio", exist_ok=True)

    seg.export(OUTPUT_MP3, format="mp3", bitrate="128k")
    shutil.copy(OUTPUT_MP3, PUBLIC_MP3)

    print(f"\nDone!")
    print(f"  {OUTPUT_MP3}  ({len(seg)/1000:.1f}s)")
    print(f"  {PUBLIC_MP3}  (copy)")
    print("\nNext step: set MUSIC_ENABLED = true in src/Animatic.tsx")


if __name__ == "__main__":
    main()
