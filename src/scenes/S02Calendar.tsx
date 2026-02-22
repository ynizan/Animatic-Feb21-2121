import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// ── Design tokens
const GOLD = "#D4A574";
const INK = "#3A3830";
const INK_LIGHT = "#6A6660";
const INK_FAINT = "#9A9690";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };

// S2 -- Calendar · Type B · 300 frames (10s)
// Phrase timing: 0 active, 100 active, 200 active; legend 220+
const P0_END = 100;
const P1_START = 100;
const P1_END = 200;
const P2_START = 200;
const P2_END = 290;
const LEG_START = 215;

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
  if (frame < activeStart) {
    return { ...base, opacity: 0, transform: "translateY(6px)" };
  }
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

function eyeStyle(frame: number, activeStart: number, activeEnd: number): React.CSSProperties {
  const isActive = frame >= activeStart && frame < activeEnd;
  return {
    fontSize: 9,
    fontWeight: 800,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: isActive ? "rgba(212,165,116,0.6)" : INK_FAINT,
    marginBottom: 6,
    fontFamily: "'Manrope', sans-serif",
  };
}

interface CalEventProps {
  name: string;
  time: string;
  top: number;
  height: number;
  kind: "real" | "ghost";
  appearFrame: number;
  frame: number;
}

function CalEvent({ name, time, top, height, kind, appearFrame, frame }: CalEventProps) {
  const p = sp(frame, appearFrame);
  const opacity = p;
  const y = interpolate(p, [0, 1], [4, 0]);

  if (kind === "ghost") {
    return (
      <div
        style={{
          position: "absolute",
          left: 3,
          right: 3,
          top,
          height,
          borderRadius: 4,
          border: "1.5px dashed rgba(212,165,116,0.3)",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
          gap: 4,
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(212,165,116,0.35)",
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(212,165,116,0.35)" }}>
          Top Tier investor?
        </span>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        left: 3,
        right: 3,
        top,
        height,
        borderRadius: 4,
        background: "#D8D4CC",
        borderLeft: "3px solid #9A9690",
        padding: "5px 8px",
        fontSize: 11,
        overflow: "hidden",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <span style={{ fontWeight: 700, color: "#5A5652", display: "block" }}>{name}</span>
      <span style={{ fontSize: 10, color: "#AAA", display: "block", marginTop: 1 }}>{time}</span>
    </div>
  );
}

export function S02Calendar() {
  const frame = useCurrentFrame();
  const winP = sp(frame, 0);

  // Legend
  const legP = sp(frame, LEG_START);

  const TIMES = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#EEEAE2",
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
        {/* Calendar window */}
        <div
          style={{
            flex: 1,
            background: "#FAFAF7",
            borderRadius: 8,
            boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
            overflow: "hidden",
          }}
        >
          {/* Window chrome */}
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
              Google Calendar — April 2026
            </div>
          </div>

          {/* Month header */}
          <div
            style={{
              padding: "12px 20px 8px",
              borderBottom: "1px solid #EEE",
              fontSize: 17,
              fontWeight: 800,
              color: "#444",
            }}
          >
            April 2026
          </div>

          {/* Day headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "46px repeat(5, 1fr)",
              padding: "6px 16px",
              borderBottom: "1px solid #F0EDE6",
            }}
          >
            <div />
            {[
              { d: "Mon", n: "13" },
              { d: "Tue", n: "14" },
              { d: "Wed", n: "15" },
              { d: "Thu", n: "16" },
              { d: "Fri", n: "17" },
            ].map(({ d, n }) => (
              <div key={d} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#AAA",
                  }}
                >
                  {d}
                </div>
                <div style={{ fontSize: 19, fontWeight: 700, color: "#666" }}>{n}</div>
              </div>
            ))}
          </div>

          {/* Grid */}
          <div style={{ height: 340, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                display: "grid",
                gridTemplateColumns: "46px repeat(5, 1fr)",
                padding: "0 16px",
              }}
            >
              {/* Time column */}
              <div>
                {TIMES.map((t) => (
                  <div
                    key={t}
                    style={{
                      height: 56,
                      borderBottom: "1px solid #F4F2EE",
                      display: "flex",
                      alignItems: "flex-start",
                      paddingTop: 4,
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#CCC" }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* Mon */}
              <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.05)" }}>
                <CalEvent name="David (advisor)" time="10:00 AM" top={56} height={50} kind="real" appearFrame={15} frame={frame} />
                <CalEvent name="Top Tier investor?" time="" top={224} height={44} kind="ghost" appearFrame={85} frame={frame} />
              </div>

              {/* Tue */}
              <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.05)" }}>
                <CalEvent name="Top Tier investor?" time="" top={8} height={44} kind="ghost" appearFrame={100} frame={frame} />
              </div>

              {/* Wed */}
              <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.05)" }}>
                <CalEvent name="Maya (customer)" time="11:00 AM" top={112} height={50} kind="real" appearFrame={30} frame={frame} />
              </div>

              {/* Thu */}
              <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.05)" }}>
                <CalEvent name="Tom (old friend)" time="12:30 PM" top={168} height={50} kind="real" appearFrame={45} frame={frame} />
                <CalEvent name="Top Tier investor?" time="" top={224} height={44} kind="ghost" appearFrame={115} frame={frame} />
              </div>

              {/* Fri */}
              <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.05)" }}>
                <CalEvent name="Jake (advisor)" time="2:30 PM" top={280} height={50} kind="real" appearFrame={60} frame={frame} />
              </div>
            </div>
          </div>
        </div>

        {/* Side phrases */}
        <div
          style={{
            width: 240,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            paddingTop: 4,
          }}
        >
          {/* Phrase 0 */}
          <div style={phraseStyle(frame, 0, P0_END)}>
            <div style={eyeStyle(frame, 0, P0_END)}>The situation</div>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.65,
                color: INK_LIGHT,
              }}
            >
              I was raising a{" "}
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  color: GOLD,
                  fontSize: 14,
                }}
              >
                seed round
              </span>
              .
            </div>
          </div>

          {/* Phrase 1 */}
          <div style={phraseStyle(frame, P1_START, P1_END)}>
            <div style={eyeStyle(frame, P1_START, P1_END)}>Every week</div>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.65,
                color: INK_LIGHT,
              }}
            >
              A few meetings — advisors, friends, customers.{" "}
              <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>Familiar faces.</b>
            </div>
          </div>

          {/* Phrase 2 */}
          <div style={phraseStyle(frame, P2_START, P2_END)}>
            <div style={eyeStyle(frame, P2_START, P2_END)}>But</div>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.65,
                color: INK_LIGHT,
              }}
            >
              They <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>never</b> led to{" "}
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  color: GOLD,
                  fontSize: 14,
                }}
              >
                investor intros
              </span>
              . I was stuck in my closed garden.
            </div>
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: "10px 14px",
              background: "rgba(0,0,0,0.03)",
              borderRadius: 8,
              marginTop: 4,
              opacity: legP,
              transform: `translateY(${interpolate(legP, [0, 1], [4, 0])}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 600, color: "#8A8680" }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#9A9690", flexShrink: 0 }} />
              My network
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 10, fontWeight: 600, color: "#8A8680" }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  border: "1.5px dashed rgba(212,165,116,0.4)",
                  flexShrink: 0,
                }}
              />
              Top Tier investors (out of reach)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
