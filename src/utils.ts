import { spring, interpolate } from "remotion";

// ── Design tokens ─────────────────────────────────────────────────────────────
export const GOLD = "#D4A574";
export const GOLD_DARK = "#C07820";
export const GOLD_GLOW = "rgba(212,165,116,0.55)";
export const INK = "#3A3830";
export const INK_LIGHT = "#6A6660";
export const INK_FAINT = "#9A9690";
export const DARK = "#0D0D0D";

export const FPS = 30;

// ── Spring configs ────────────────────────────────────────────────────────────
export const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };
export const SNAPPY = { damping: 90, stiffness: 260, mass: 0.7 };

// ── Animation helpers ─────────────────────────────────────────────────────────

/** Spring fade-in starting at startFrame, returns 0→1 */
export function fadeIn(frame: number, startFrame: number): number {
  return spring({ frame: frame - startFrame, fps: FPS, from: 0, to: 1, config: SOFT });
}

/** Spring fade-in with snappy config */
export function snapIn(frame: number, startFrame: number): number {
  return spring({ frame: frame - startFrame, fps: FPS, from: 0, to: 1, config: SNAPPY });
}

/** Slide distance (px): 0 when fully in */
export function slideY(frame: number, startFrame: number, distance = 8): number {
  const p = spring({ frame: frame - startFrame, fps: FPS, from: 0, to: 1, config: SOFT });
  return interpolate(p, [0, 1], [distance, 0]);
}

/** Rule draw: returns a percentage string 0%→100% */
export function drawRule(frame: number, startFrame: number): string {
  const p = spring({ frame: frame - startFrame, fps: FPS, from: 0, to: 1, config: SNAPPY });
  return `${interpolate(p, [0, 1], [0, 100])}%`;
}

// ── Word-reveal style (Type A dark scenes) ────────────────────────────────────
/**
 * Returns {color, textShadow?, opacity?} for a single word in a word-reveal
 * sequence. Dark background version (words start almost invisible).
 */
export function wordDark(
  frame: number,
  activationFrame: number,
  pastColor = "#666"
): { color: string; textShadow?: string } {
  if (frame < activationFrame) return { color: "rgba(255,255,255,0.05)" };
  if (frame < activationFrame + 14) {
    const p = Math.min((frame - activationFrame) / 6, 1);
    return {
      color: GOLD,
      textShadow: `0 0 28px rgba(212,165,116,${(0.55 * p).toFixed(2)})`,
    };
  }
  return { color: pastColor };
}

// ── Side-phrase styles (Type B light scenes) ──────────────────────────────────
/**
 * Returns the inline style object for a side-panel Phrase block.
 * state: 'future' (hidden), 'active' (gold highlight), 'past' (faded)
 */
export function phraseStyle(
  frame: number,
  activeStart: number,
  activeEnd: number
): React.CSSProperties {
  const base: React.CSSProperties = {
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 10,
    borderLeft: "2.5px solid transparent",
  };

  if (frame < activeStart) {
    const p = spring({ frame: frame - activeStart, fps: FPS, from: 0, to: 1, config: SOFT });
    return { ...base, opacity: 0, transform: `translateY(6px)` };
  }

  if (frame < activeEnd) {
    const p = spring({ frame: frame - activeStart, fps: FPS, from: 0, to: 1, config: SOFT });
    const y = interpolate(p, [0, 1], [6, 0]);
    return {
      ...base,
      opacity: p,
      transform: `translateY(${y}px)`,
      background: `rgba(212,165,116,${(0.06 * p).toFixed(3)})`,
      borderLeft: `2.5px solid rgba(212,165,116,${p.toFixed(3)})`,
    };
  }

  return {
    ...base,
    opacity: 0.28,
    transform: "translateY(0)",
    background: "transparent",
  };
}

// Need React for CSSProperties type
import React from "react";
