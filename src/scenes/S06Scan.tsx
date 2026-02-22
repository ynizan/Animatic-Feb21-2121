import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// S6 -- Network Scan · Type B · 390 frames (13s)

const GOLD = "#D4A574";
const INK = "#3A3830";
const INK_LIGHT = "#6A6660";
const INK_FAINT = "#9A9690";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };
const SNAPPY = { damping: 90, stiffness: 260, mass: 0.7 };

const P0_END = 130;
const P1_START = 130;
const P1_END = 260;
const P2_START = 260;
const P2_END = 375;

function sp(frame: number, start: number, config = SOFT) {
  return spring({ frame: frame - start, fps: FPS, from: 0, to: 1, config });
}

function phraseStyle(frame: number, activeStart: number, activeEnd: number): React.CSSProperties {
  const base: React.CSSProperties = {
    borderRadius: 8,
    padding: "14px 16px",
    marginBottom: 10,
    borderLeft: "2.5px solid transparent",
  };
  if (frame < activeStart) return { ...base, opacity: 0, transform: "translateY(6px)" };
  if (frame < activeEnd) {
    const p = sp(frame, activeStart);
    return {
      ...base,
      opacity: p,
      transform: `translateY(${interpolate(p, [0, 1], [6, 0])}px)`,
      background: `rgba(212,165,116,${(0.06 * p).toFixed(3)})`,
      borderLeft: `2.5px solid rgba(212,165,116,${p.toFixed(3)})`,
    };
  }
  return { ...base, opacity: 0.28, background: "transparent" };
}

function eyeColor(frame: number, start: number, end: number) {
  return frame >= start && frame < end ? "rgba(212,165,116,0.6)" : INK_FAINT;
}

interface ResultCardProps {
  initials: string;
  bgColor: string;
  name: string;
  role: string;
  detail: string;
  bars: number; // filled bars out of 5
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  borderColor: string;
  warmNote?: string;
  appearFrame: number;
  frame: number;
}

function ResultCard({
  initials, bgColor, name, role, detail, bars,
  badgeText, badgeBg, badgeColor, borderColor,
  warmNote, appearFrame, frame,
}: ResultCardProps) {
  const p = sp(frame, appearFrame);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        background: "#fff",
        borderRadius: 8,
        border: `1px solid #E8EAF0`,
        borderLeft: `3px solid ${borderColor}`,
        marginBottom: 8,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [6, 0])}px)`,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          color: "#fff",
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#2D3748" }}>
          {name}{" "}
          <span style={{ fontSize: 10, fontWeight: 400, color: "#718096" }}>· {role}</span>
        </div>
        <div style={{ fontSize: 10, color: "#A0AEC0", marginTop: 1 }}>{detail}</div>
        {warmNote && (
          <div style={{ fontSize: 9, fontWeight: 700, color: "#5A8A5A", marginTop: 4 }}>
            ● {warmNote}
          </div>
        )}
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 9, color: "#A0AEC0", marginBottom: 3 }}>Signal</div>
        <div style={{ display: "flex", gap: 2 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                width: 6,
                height: 12,
                borderRadius: 2,
                background: i < bars ? GOLD : "#E8E4DC",
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          background: badgeBg,
          color: badgeColor,
          fontSize: 9,
          fontWeight: 700,
          padding: "3px 7px",
          borderRadius: 4,
          flexShrink: 0,
        }}
      >
        {badgeText}
      </div>
    </div>
  );
}

export function S06Scan() {
  const frame = useCurrentFrame();
  const winP = sp(frame, 0);

  // Scan pulse animation
  const scanPulse = Math.sin((frame / 20) * Math.PI) * 0.5 + 0.5;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#EEF0F5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 24,
          padding: 20,
          width: "100%",
          opacity: winP,
          transform: `translateY(${interpolate(winP, [0, 1], [8, 0])}px)`,
        }}
      >
        {/* Scan window */}
        <div
          style={{
            flex: 1,
            maxWidth: 520,
            background: "#FFFFFF",
            borderRadius: 7,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 16px 48px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          {/* Chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 14px",
              background: "#E8EAF0",
              borderBottom: "1px solid #D0D4E0",
            }}
          >
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#C8A0A0" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#C8C0A0" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#A8C0A8" }} />
            <div
              style={{
                flex: 1,
                background: "#D8DCE8",
                borderRadius: 5,
                padding: "5px 12px",
                fontSize: 11,
                color: "#666",
                marginLeft: 8,
              }}
            >
              InTouch · Scanning Jake L. · 500+ connections
            </div>
            <div
              style={{
                background: GOLD,
                color: "#fff",
                fontSize: 9,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 4,
                letterSpacing: "0.05em",
              }}
            >
              ACTIVE
            </div>
          </div>

          {/* Jake profile row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 18px",
              borderBottom: "1px solid #E0E4EC",
              background: "#F4F6FA",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: "#4A5568",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              JL
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#2D3748" }}>Jake L.</div>
              <div style={{ fontSize: 11, color: "#718096" }}>
                Founder (2x) · Angel Investor · 500+ connections
              </div>
            </div>
            <div
              style={{
                marginLeft: "auto",
                fontSize: 10,
                color: GOLD,
                fontWeight: 700,
                opacity: 0.5 + 0.5 * scanPulse,
              }}
            >
              ● Scanning...
            </div>
          </div>

          {/* Results */}
          <div style={{ padding: "12px 18px" }}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#A0AEC0",
                marginBottom: 10,
              }}
            >
              InTouch — High-signal paths found
            </div>

            <ResultCard
              initials="RB"
              bgColor="#744E2A"
              name="Ron B."
              role="Managing Partner"
              detail="Jake intro'd him to 3 of his portfolio founders"
              bars={4}
              badgeText="Top Tier access"
              badgeBg="#FFF3E8"
              badgeColor="#C07820"
              borderColor={GOLD}
              warmNote="High response likelihood — mutual connection bridging"
              appearFrame={40}
              frame={frame}
            />

            <ResultCard
              initials="SM"
              bgColor="#2A5274"
              name="Sascha M."
              role="Angel · ex-Sequoia"
              detail="2° from Sequoia Capital partnership"
              bars={3}
              badgeText="2° Sequoia"
              badgeBg="#EBF4FF"
              badgeColor="#2A6090"
              borderColor="#C8A860"
              appearFrame={70}
              frame={frame}
            />

            <ResultCard
              initials="GM"
              bgColor="#2A5840"
              name="Guy M."
              role="Partner Emeritus · GC"
              detail="Direct General Catalyst relationship — warm path"
              bars={5}
              badgeText="Direct GC"
              badgeBg="#EDFAF1"
              badgeColor="#1A6B3A"
              borderColor="#B89858"
              appearFrame={100}
              frame={frame}
            />

            <div
              style={{
                marginTop: 10,
                fontSize: 9,
                color: "#A0AEC0",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              497 other connections — low signal, filtered out
            </div>
          </div>
        </div>

        {/* Side phrases */}
        <div
          style={{
            width: 270,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div style={phraseStyle(frame, 0, P0_END)}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: eyeColor(frame, 0, P0_END),
                marginBottom: 6,
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              The meeting
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.65,
                color: INK_LIGHT,
              }}
            >
              I was meeting with{" "}
              <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>Jake</b> — a founder
              with deep VC connections.
            </div>
          </div>

          <div style={phraseStyle(frame, P1_START, P1_END)}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: eyeColor(frame, P1_START, P1_END),
                marginBottom: 6,
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              What InTouch did
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.65,
                color: INK_LIGHT,
              }}
            >
              Before the meeting, InTouch{" "}
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  color: GOLD,
                  fontSize: 14,
                }}
              >
                scanned his network
              </span>
              .
            </div>
          </div>

          <div style={phraseStyle(frame, P2_START, P2_END)}>
            <div
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: eyeColor(frame, P2_START, P2_END),
                marginBottom: 6,
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              What it found
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.65,
                color: INK_LIGHT,
              }}
            >
              Who he could reach — and who could connect me{" "}
              <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>up</b>, to investors I
              couldn't access on my own.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
