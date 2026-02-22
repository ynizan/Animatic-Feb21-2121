import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// S11 -- End Card · Type A dark · 165 frames (5.5s)

const GOLD = "#D4A574";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };
const SNAPPY = { damping: 90, stiffness: 260, mass: 0.7 };

function sp(frame: number, start: number, config = SOFT) {
  return spring({ frame: frame - start, fps: FPS, from: 0, to: 1, config });
}

function wordStyle(frame: number, af: number, pastColor = "#fff"): React.CSSProperties {
  if (frame < af) return { color: "rgba(255,255,255,0.05)" };
  if (frame < af + 14) {
    const p = Math.min((frame - af) / 6, 1);
    return { color: GOLD, textShadow: `0 0 28px rgba(212,165,116,${(0.55 * p).toFixed(2)})` };
  }
  return { color: pastColor };
}

export function S11EndCard() {
  const frame = useCurrentFrame();

  const logoP = sp(frame, 5);
  const ruleP = sp(frame, 78, SNAPPY);
  const ruleW = interpolate(ruleP, [0, 1], [0, 38]);
  const ctaP = sp(frame, 93);
  const urlP = sp(frame, 108);
  const footerP = sp(frame, 123);

  // Primary headline words: "Stop networking in circles."
  const priWords = [
    { text: "Stop", af: 18 },
    { text: "networking", af: 23 },
    { text: "in", af: 27 },
    { text: "circles.", af: 31 },
  ];

  // Secondary: "Find the path out."
  const secWords = [
    { text: "Find", af: 50, special: false },
    { text: "the", af: 55, special: false },
    { text: "path", af: 58, special: true },
    { text: "out.", af: 62, special: false },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0D0D0D",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.9) 100%)",
          pointerEvents: "none",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(212,165,116,0.06) 0%, transparent 50%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Corner accents */}
      {[
        { top: 32, left: 32, borderWidth: "1px 0 0 1px" },
        { top: 32, right: 32, borderWidth: "1px 1px 0 0" },
        { bottom: 32, left: 32, borderWidth: "0 0 1px 1px" },
        { bottom: 32, right: 32, borderWidth: "0 1px 1px 0" },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 34,
            height: 34,
            borderColor: "rgba(212,165,116,0.12)",
            borderStyle: "solid",
            borderWidth: style.borderWidth,
            ...(style.top !== undefined ? { top: style.top } : {}),
            ...(style.bottom !== undefined ? { bottom: style.bottom } : {}),
            ...(style.left !== undefined ? { left: style.left } : {}),
            ...(style.right !== undefined ? { right: style.right } : {}),
            zIndex: 2,
          }}
        />
      ))}

      {/* Main content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 13,
            marginBottom: 28,
            opacity: logoP,
            transform: `translateY(${interpolate(logoP, [0, 1], [8, 0])}px)`,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="4" width="40" height="40" rx="8" fill="#FFF" />
            <path d="M22 14L28 11V37H22V18L18 20V14H22Z" fill="#0D0D0D" />
          </svg>
          <div
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 800,
              fontSize: 42,
              color: "#FFF",
              letterSpacing: "-0.02em",
            }}
          >
            InTouch
          </div>
        </div>

        {/* Primary headline */}
        <div
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
            marginBottom: 7,
          }}
        >
          {priWords.map(({ text, af }, i) => (
            <span key={i} style={{ ...wordStyle(frame, af, "#FFF"), marginRight: 6 }}>
              {text}
            </span>
          ))}
        </div>

        {/* Secondary */}
        <div
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontStyle: "italic",
            fontSize: 19,
          }}
        >
          {secWords.map(({ text, af, special }, i) => (
            <span
              key={i}
              style={{
                ...wordStyle(frame, af, special ? GOLD : "#444"),
                fontStyle: special ? "normal" : "italic",
                fontWeight: special ? 500 : undefined,
                marginRight: 5,
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Rule */}
        <div
          style={{
            width: ruleW,
            height: 1,
            background: "rgba(212,165,116,0.35)",
            margin: "28px 0",
          }}
        />

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: ctaP,
            transform: `translateY(${interpolate(ctaP, [0, 1], [6, 0])}px)`,
          }}
        >
          <div
            style={{
              background: GOLD,
              color: "#0D0D0D",
              borderRadius: 100,
              padding: "12px 32px",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Request access →
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#333",
              textDecoration: "underline",
              textDecorationColor: "#222",
              textUnderlineOffset: 4,
            }}
          >
            Watch a walkthrough
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 40,
            fontSize: 11,
            fontWeight: 600,
            color: "#222",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            opacity: urlP,
          }}
        >
          intouch.ai
        </div>
      </div>

      {/* Footer legend */}
      <div
        style={{
          position: "absolute",
          bottom: 38,
          left: "50%",
          transform: `translateX(-50%)`,
          display: "flex",
          alignItems: "center",
          gap: 20,
          zIndex: 3,
          opacity: footerP,
        }}
      >
        {[
          { dot: "#222", label: "My network", gold: false },
          { dot: "#5A3A18", label: "Getting closer", gold: false },
          { dot: GOLD, label: "Top Tier investors", gold: true },
        ].map(({ dot, label, gold }, i) => (
          <React.Fragment key={label}>
            {i > 0 && <div style={{ width: 1, height: 11, background: "#181818" }} />}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 9,
                fontWeight: 700,
                color: gold ? "rgba(212,165,116,0.35)" : "#1C1C1C",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: dot,
                  flexShrink: 0,
                  boxShadow: gold ? "0 0 5px rgba(212,165,116,0.5)" : undefined,
                }}
              />
              {label}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
