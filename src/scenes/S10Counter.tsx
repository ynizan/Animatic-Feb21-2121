import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// S10 -- Counter · Type A dark · 162 frames (5.4s)

const GOLD = "#D4A574";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };
const SNAPPY = { damping: 90, stiffness: 260, mass: 0.7 };

function sp(frame: number, start: number, config = SOFT) {
  return spring({ frame: frame - start, fps: FPS, from: 0, to: 1, config });
}

// Word reveal for dark scene
function wordStyle(frame: number, af: number, pastColor = "#444"): React.CSSProperties {
  if (frame < af) return { color: "rgba(255,255,255,0.05)" };
  if (frame < af + 14) {
    const p = Math.min((frame - af) / 6, 1);
    return { color: GOLD, textShadow: `0 0 28px rgba(212,165,116,${(0.55 * p).toFixed(2)})` };
  }
  return { color: pastColor };
}

export function S10Counter() {
  const frame = useCurrentFrame();

  // Left side "0" block
  const leftP = sp(frame, 5);
  // Arrow
  const arrowP = sp(frame, 35);
  // Right "30" pops in with animation
  const rightP = sp(frame, 50, SNAPPY);
  const rightScale = interpolate(rightP, [0, 1], [0.7, 1]);
  // Rule
  const ruleP = sp(frame, 75, SNAPPY);
  const ruleW = interpolate(ruleP, [0, 1], [0, 44]);

  // "From conversations..." words
  const bodyWords = [
    { text: "From", af: 82 },
    { text: "conversations", af: 86 },
    { text: "I", af: 89 },
    { text: "was", af: 92 },
    { text: "already", af: 95 },
    { text: "having.", af: 98 },
  ];

  // Chain
  const chainStart = 110;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0D0D0D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 50%, rgba(212,165,116,0.1) 0%, transparent 55%)",
          pointerEvents: "none",
        }}
      />

      {/* Before / After comparison */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "6vw",
          position: "relative",
          zIndex: 1,
          width: "100%",
          padding: "0 5%",
          boxSizing: "border-box",
        }}
      >
        {/* Left: "0" */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: leftP,
            transform: `translateY(${interpolate(leftP, [0, 1], [8, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#1C1C1C",
            }}
          >
            0
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
              color: "#282828",
            }}
          >
            top tier investor meetings
          </div>
        </div>

        {/* Arrow */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 5,
            opacity: arrowP,
          }}
        >
          <div style={{ fontSize: 44, color: "#1C1C1C" }}>→</div>
          <div
            style={{
              fontFamily: "'IBM Plex Serif', serif",
              fontStyle: "italic",
              fontSize: 12,
              color: "#282828",
              whiteSpace: "nowrap",
            }}
          >
            same conversations
          </div>
        </div>

        {/* Right: "30" */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            opacity: rightP,
            transform: `scale(${rightScale})`,
          }}
        >
          <div
            style={{
              fontSize: 148,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: GOLD,
              textShadow: "0 0 80px rgba(212,165,116,0.4), 0 0 160px rgba(212,165,116,0.15)",
            }}
          >
            30
          </div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textAlign: "center",
              color: "rgba(212,165,116,0.65)",
            }}
          >
            top tier investor meetings
          </div>
        </div>
      </div>

      {/* Rule */}
      <div
        style={{
          width: ruleW,
          height: 1,
          background: "rgba(212,165,116,0.2)",
          margin: "30px 0",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Bottom section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 9,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* "From conversations I was already having." */}
        <div
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontStyle: "italic",
            fontSize: 21,
            color: "#444",
            lineHeight: 1.5,
          }}
        >
          {bodyWords.map(({ text, af }, i) => (
            <span
              key={i}
              style={{
                ...wordStyle(frame, af, i === 1 || i === 5 ? "#888" : "#444"),
                fontStyle: i === 1 || i === 5 ? "normal" : "italic",
                fontWeight: i === 1 || i === 5 ? 500 : undefined,
                marginRight: 6,
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Chain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 9,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {[
            { text: "Advisors", af: chainStart, gold: false },
            { text: "→", af: chainStart + 5, gold: false, sep: true },
            { text: "Connectors", af: chainStart + 8, gold: false },
            { text: "→", af: chainStart + 14, gold: false, sep: true },
            { text: "Top Tier investors", af: chainStart + 17, gold: true },
          ].map(({ text, af, gold, sep }, i) => {
            if (sep) {
              return (
                <span key={i} style={{ ...wordStyle(frame, af, "#1C1C1C") }}>
                  {text}
                </span>
              );
            }
            const p = sp(frame, af);
            const baseStyle: React.CSSProperties = gold
              ? {
                  background: "rgba(212,165,116,0.06)",
                  border: "1px solid rgba(212,165,116,0.3)",
                  borderRadius: 100,
                  padding: "4px 12px",
                  color: GOLD,
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [4, 0])}px)`,
                }
              : {
                  background: "#141414",
                  border: "1px solid #222",
                  borderRadius: 100,
                  padding: "4px 12px",
                  color: "#444",
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [4, 0])}px)`,
                };
            return (
              <div key={i} style={baseStyle}>
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
