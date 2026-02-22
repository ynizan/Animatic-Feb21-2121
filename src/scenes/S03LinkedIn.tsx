import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// S3 -- LinkedIn · Type B · 222 frames (7.4s)

const GOLD = "#D4A574";
const INK = "#3A3830";
const INK_LIGHT = "#6A6660";
const INK_FAINT = "#9A9690";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };

const P0_END = 74;
const P1_START = 74;
const P1_END = 148;
const P2_START = 148;
const P2_END = 215;

function sp(frame: number, start: number) {
  return spring({ frame: frame - start, fps: FPS, from: 0, to: 1, config: SOFT });
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

const CONNECTIONS = [
  { initials: "RB", name: "Ron B.", title: "Managing Partner · Fund", mutual: "3 mutual" },
  { initials: "SM", name: "Sarah M.", title: "Investor · Palo Alto", mutual: "1 mutual" },
  { initials: "TK", name: "Tom K.", title: "Product Manager · Startup", mutual: "12 mutual" },
  { initials: "JW", name: "James W.", title: "VC Associate · SF", mutual: "2 mutual" },
  { initials: "AL", name: "Amy L.", title: "Founder · B2B SaaS", mutual: "8 mutual" },
];

export function S03LinkedIn() {
  const frame = useCurrentFrame();
  const winP = sp(frame, 0);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#E4E0D8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          gap: 28,
          padding: 24,
          width: "100%",
          opacity: winP,
          transform: `translateY(${interpolate(winP, [0, 1], [8, 0])}px)`,
        }}
      >
        {/* LinkedIn window */}
        <div
          style={{
            flex: 1,
            background: "#F2F0EC",
            borderRadius: 8,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
            filter: "saturate(0.25) brightness(0.97)",
          }}
        >
          {/* Chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 16px",
              background: "#E8E4DC",
              borderBottom: "1px solid #D8D4CC",
            }}
          >
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#C8A0A0" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#C8C0A0" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#A8C0A8" }} />
            <div
              style={{
                flex: 1,
                background: "#DDDAD2",
                borderRadius: 5,
                padding: "5px 12px",
                fontSize: 11,
                color: "#777",
                marginLeft: 8,
              }}
            >
              linkedin.com/in/jake-l./connections
            </div>
          </div>

          {/* LI header */}
          <div
            style={{
              background: "#DDD9D0",
              padding: "8px 20px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              borderBottom: "1px solid #CCC9C0",
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 800, color: "#888" }}>in</div>
            <div
              style={{
                background: "#CCCAC2",
                borderRadius: 4,
                padding: "6px 12px",
                display: "flex",
                alignItems: "center",
                gap: 6,
                width: 260,
              }}
            >
              <span style={{ fontSize: 10, color: "#888" }}>🔍</span>
              <span style={{ fontSize: 12, color: "#777" }}>Sequoia Capital investor</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ display: "flex" }}>
            {/* Left profile */}
            <div
              style={{
                width: 180,
                padding: 14,
                borderRight: "1px solid #D8D4CC",
              }}
            >
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: "50%",
                  background: "#C8C4BC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#888",
                  margin: "0 auto 10px",
                }}
              >
                JL
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#555", textAlign: "center" }}>Jake L.</div>
              <div style={{ fontSize: 10, color: "#888", textAlign: "center", marginTop: 2, lineHeight: 1.4 }}>
                Founder (2x) · Angel Investor
              </div>
              <div style={{ height: 1, background: "#D8D4CC", margin: "9px 0" }} />
              {[
                { l: "Connections", v: "500+" },
                { l: "Mutual", v: "47" },
                { l: "Path to gold", v: "???" },
              ].map(({ l, v }) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: "#888" }}>{l}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#666" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Connections list */}
            <div style={{ flex: 1, padding: "12px 14px" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#555",
                  marginBottom: 9,
                  paddingBottom: 6,
                  borderBottom: "1px solid #D8D4CC",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Jake's connections</span>
                <span style={{ fontSize: 10, color: "#AAA" }}>500+ — no signal</span>
              </div>

              {CONNECTIONS.map(({ initials, name, title, mutual }) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "6px 0",
                    borderBottom: "1px solid #E8E4DC",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: "#C8C4BC",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#888",
                    }}
                  >
                    {initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#555" }}>{name}</div>
                    <div style={{ fontSize: 10, color: "#888" }}>{title}</div>
                    <div style={{ fontSize: 9, color: "#AAA" }}>{mutual}</div>
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      color: "#888",
                      border: "1px solid #C8C4BC",
                      borderRadius: 100,
                      padding: "2px 8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Connect
                  </div>
                </div>
              ))}
              <div style={{ textAlign: "center", padding: 10, fontSize: 10, color: "#AAA", fontStyle: "italic" }}>
                490 more... same opaque list
              </div>
            </div>
          </div>
        </div>

        {/* Side phrases */}
        <div
          style={{
            width: 330,
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
              What I saw
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
              500 connections.{" "}
              <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>All familiar.</b>
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
              The realization
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
              I had hit my{" "}
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  color: GOLD,
                  fontSize: 14,
                }}
              >
                network's limits
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
              The trap
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
              <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>No path out.</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
