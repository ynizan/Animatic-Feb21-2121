import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// S4 -- Email Compose · Type B · 195 frames (6.5s)

const GOLD = "#D4A574";
const INK = "#3A3830";
const INK_LIGHT = "#6A6660";
const INK_FAINT = "#9A9690";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };

const P0_END = 65;
const P1_START = 65;
const P1_END = 130;
const P2_START = 130;
const P2_END = 188;

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

export function S04Email() {
  const frame = useCurrentFrame();
  const winP = sp(frame, 0);

  // Staggered body text lines
  const subjectP = sp(frame, 10);
  const line1P = sp(frame, 20);
  const line2P = sp(frame, 30);
  const line3P = sp(frame, 40);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#E8E4DC",
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
          padding: 24,
          width: "100%",
          opacity: winP,
          transform: `translateY(${interpolate(winP, [0, 1], [8, 0])}px)`,
        }}
      >
        {/* Email compose window */}
        <div
          style={{
            flex: 1,
            background: "#FDFBF8",
            borderRadius: 8,
            boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            overflow: "hidden",
          }}
        >
          {/* Chrome */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 16px",
              background: "#EDEAE2",
              borderBottom: "1px solid #DDD9D0",
            }}
          >
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#D4887A" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#D4B87A" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#8ABD8A" }} />
            <div style={{ flex: 1, textAlign: "center", fontSize: 12, fontWeight: 600, color: "#888" }}>
              New Message
            </div>
          </div>

          {/* Fields */}
          <div style={{ padding: "14px 24px 0", borderBottom: "1px solid #F0EDE6" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
                borderBottom: "1px solid #F4F2EE",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#AAA",
                  width: 52,
                  letterSpacing: "0.04em",
                }}
              >
                To
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#EEE",
                  borderRadius: 100,
                  padding: "2px 10px 2px 7px",
                  gap: 5,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#555",
                }}
              >
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "#C8C4BC",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#7A7870",
                  }}
                >
                  J
                </div>
                Jake L.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 0",
                borderBottom: "1px solid #F4F2EE",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#AAA",
                  width: 52,
                  letterSpacing: "0.04em",
                }}
              >
                From
              </div>
              <span style={{ fontSize: 13, color: "#555" }}>yaniv@gmail.com</span>
            </div>
          </div>

          {/* Subject */}
          <div
            style={{
              padding: "12px 24px",
              borderBottom: "1px solid #F0EDE6",
              fontSize: 16,
              fontWeight: 700,
              color: "#3A3830",
              opacity: subjectP,
            }}
          >
            Following up... 🙏
          </div>

          {/* Body */}
          <div style={{ padding: "20px 24px 22px" }}>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontSize: 14,
                lineHeight: 1.9,
                color: "#555",
                maxWidth: 600,
              }}
            >
              <span style={{ opacity: line1P }}>
                Hey Jake,
                <br />
                <br />
                Just following up on my last message.{" "}
                <span
                  style={{
                    background: "rgba(180,60,60,0.12)",
                    borderBottom: "2px solid rgba(180,60,60,0.3)",
                    borderRadius: 2,
                    padding: "0 2px",
                    color: "#7A3030",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  Please
                </span>
                , if you could take a few moments to think about who in your network might introduce me to{" "}
              </span>
              <span style={{ opacity: line1P }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    background: "rgba(212,165,116,0.12)",
                    border: "1.5px solid rgba(212,165,116,0.4)",
                    borderRadius: 100,
                    padding: "2px 9px 2px 6px",
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    color: GOLD,
                    verticalAlign: "middle",
                    position: "relative",
                    top: -1,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: GOLD,
                      boxShadow: "0 0 5px rgba(212,165,116,0.6)",
                    }}
                  />
                  Top Tier investors
                </span>{" "}
                —{" "}
                <span
                  style={{
                    background: "rgba(180,60,60,0.07)",
                    borderBottom: "2px solid rgba(180,60,60,0.2)",
                    borderRadius: 2,
                    padding: "0 2px",
                    color: "#7A4040",
                    fontStyle: "italic",
                  }}
                >
                  it would really mean a lot to me
                </span>
                .
              </span>
              <br />
              <br />
              <span style={{ opacity: line2P }}>
                I know it's a big ask but{" "}
                <span
                  style={{
                    background: "rgba(180,60,60,0.07)",
                    borderBottom: "2px solid rgba(180,60,60,0.2)",
                    borderRadius: 2,
                    padding: "0 2px",
                    color: "#7A4040",
                    fontStyle: "italic",
                  }}
                >
                  even just one name would be amazing
                </span>
                .{" "}
                <span
                  style={{
                    background: "rgba(180,60,60,0.12)",
                    borderBottom: "2px solid rgba(180,60,60,0.3)",
                    borderRadius: 2,
                    padding: "0 2px",
                    color: "#7A3030",
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  No rush... but soon 😅
                </span>
              </span>
              <br />
              <br />
              <span style={{ opacity: line3P }}>Thanks so much 🙏🙏</span>
            </div>
          </div>

          {/* Toolbar */}
          <div
            style={{
              padding: "11px 24px",
              borderTop: "1px solid #F0EDE6",
              display: "flex",
              gap: 10,
            }}
          >
            <div
              style={{
                background: "#7A9AAA",
                color: "#fff",
                borderRadius: 5,
                padding: "7px 16px",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              Send
            </div>
          </div>
        </div>

        {/* Side phrases */}
        <div
          style={{
            width: 260,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 8,
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
              The tone
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
              My follow-ups were{" "}
              <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>embarrassing</b>.
              Begging instead of asking.
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
              The ask
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
              Vague, hopeful. <em style={{ fontStyle: "italic" }}>"Think of anyone."</em> No
              specific name. No reason to act.
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
              The result
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
              Jake reads it. Feels the weight.{" "}
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  color: GOLD,
                  fontSize: 14,
                }}
              >
                Forgets by Friday.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
