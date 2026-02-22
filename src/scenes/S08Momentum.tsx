import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// S8 -- Momentum · Type C (full calendar + narrator card) · 270 frames (9s)

const GOLD = "#D4A574";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };
const SNAPPY = { damping: 90, stiffness: 260, mass: 0.7 };

const NARRATOR_IN = 40;
const P0_END = 155;
const P1_START = 155;
const P1_END = 262;

function sp(frame: number, start: number, config = SOFT) {
  return spring({ frame: frame - start, fps: FPS, from: 0, to: 1, config });
}

// Narrator-card phrase: no border/bg, white text, larger font
function ncPhraseStyle(frame: number, activeStart: number, activeEnd: number): React.CSSProperties {
  if (frame < activeStart) return { opacity: 0, transform: "translateY(4px)" };
  if (frame < activeEnd) {
    const p = sp(frame, activeStart);
    return { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [4, 0])}px)` };
  }
  return { opacity: 0.25 };
}

interface CalEvProps {
  name: string;
  time: string;
  detail: string;
  top: number;
  height: number;
  kind: "gray" | "warm" | "gold";
  appearFrame: number;
  frame: number;
}

function CalEv({ name, time, detail, top, height, kind, appearFrame, frame }: CalEvProps) {
  const p = sp(frame, appearFrame, SNAPPY);
  const colors = {
    gray: {
      bg: "#E8E8E8",
      border: "#BDBDBD",
      nameColor: "#5F6368",
      timeColor: "#9AA0A6",
      detailColor: "#BDBDBD",
    },
    warm: {
      bg: "#FFF3E0",
      border: "#FFB300",
      nameColor: "#BF360C",
      timeColor: "#E65100",
      detailColor: "#FF8F00",
    },
    gold: {
      bg: "rgba(212,165,116,0.15)",
      border: GOLD,
      nameColor: "#A07030",
      timeColor: "#C49060",
      detailColor: GOLD,
    },
  }[kind];

  return (
    <div
      style={{
        position: "absolute",
        left: 3,
        right: 3,
        top,
        height,
        borderRadius: 4,
        padding: "4px 8px",
        fontSize: 11,
        overflow: "hidden",
        background: colors.bg,
        borderLeft: `2.5px solid ${colors.border}`,
        border: kind === "gold" ? `1px solid rgba(212,165,116,0.3)` : undefined,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [6, 0])}px)`,
      }}
    >
      <span
        style={{
          fontWeight: kind === "warm" ? 800 : 700,
          color: colors.nameColor,
          display: "block",
          fontSize: kind === "gold" ? 12 : 11,
        }}
      >
        {name}
      </span>
      <span style={{ fontSize: 10, color: colors.timeColor, display: "block", marginTop: 1 }}>
        {time}
      </span>
      <span
        style={{
          fontSize: 9,
          color: colors.detailColor,
          display: "block",
          marginTop: 1,
          fontWeight: 600,
          textTransform: kind === "gold" ? "uppercase" : undefined,
          letterSpacing: kind === "gold" ? "0.04em" : undefined,
        }}
      >
        {detail}
      </span>
    </div>
  );
}

const TIMES = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
const DAYS = [
  { d: "Mon", n: "13" },
  { d: "Tue", n: "14" },
  { d: "Wed", n: "15" },
  { d: "Thu", n: "16" },
  { d: "Fri", n: "17" },
];

export function S08Momentum() {
  const frame = useCurrentFrame();
  const cardP = sp(frame, NARRATOR_IN, SNAPPY);
  const cardY = interpolate(cardP, [0, 1], [100, 0]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F6F8FC",
        position: "relative",
      }}
    >
      {/* Full-screen calendar window */}
      <div
        style={{
          position: "absolute",
          inset: 10,
          background: "#FFFFFF",
          borderRadius: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        {/* Chrome */}
        <div
          style={{
            background: "#FFFFFF",
            padding: "9px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "1px solid #E0E0E0",
          }}
        >
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#E8685C" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#F5BD4F" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#61C554" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "#5F6368" }}> Google Calendar</span>
          <span style={{ fontSize: 16, fontWeight: 400, color: "#202124", marginLeft: 6 }}>
            April 2026
          </span>
          <div style={{ marginLeft: "auto" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(212,165,116,0.1)",
                border: "1.5px solid rgba(212,165,116,0.3)",
                borderRadius: 100,
                padding: "3px 10px",
                fontSize: 9,
                fontWeight: 800,
                color: GOLD,
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: GOLD,
                  boxShadow: "0 0 6px rgba(212,165,116,0.55)",
                }}
              />
              InTouch Active
            </div>
          </div>
        </div>

        {/* Day headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "44px repeat(5, 1fr)",
            borderBottom: "1px solid #E0E0E0",
            padding: "0 12px",
          }}
        >
          <div />
          {DAYS.map(({ d, n }) => (
            <div key={d} style={{ textAlign: "center", padding: "5px 0" }}>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 500,
                  color: "#70757A",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {d}
              </div>
              <div style={{ fontSize: 17, fontWeight: 400, color: "#70757A" }}>{n}</div>
            </div>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "44px repeat(5, 1fr)",
            padding: "0 12px",
            height: 480,
            overflow: "hidden",
          }}
        >
          {/* Time column */}
          <div>
            {TIMES.map((t) => (
              <div
                key={t}
                style={{
                  height: 60,
                  borderBottom: "1px solid #F1F3F4",
                  display: "flex",
                  alignItems: "flex-start",
                  paddingTop: 3,
                }}
              >
                <span style={{ fontSize: 9, color: "#9AA0A6" }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Mon */}
          <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
            <CalEv name="David (advisor)" time="9:00 AM" detail="My network" top={8} height={54} kind="gray" appearFrame={5} frame={frame} />
            <CalEv name="Ron B. — Govtech" time="1:00 PM · via Jake" detail="2° from Top Tier" top={188} height={54} kind="warm" appearFrame={55} frame={frame} />
          </div>

          {/* Tue */}
          <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
            <CalEv name="Sascha M. — Angel" time="10:00 AM · via Jake" detail="2° from Top Tier" top={68} height={54} kind="warm" appearFrame={70} frame={frame} />
            <CalEv name="* Top Tier VC Partner" time="2:00 PM · via Sascha" detail="Sequoia intro" top={248} height={54} kind="gold" appearFrame={110} frame={frame} />
          </div>

          {/* Wed */}
          <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
            <CalEv name="Maya (customer)" time="11:00 AM" detail="My network" top={128} height={54} kind="gray" appearFrame={15} frame={frame} />
            <CalEv name="Enterprise contact" time="3:00 PM · via Maya" detail="2° from Top Tier" top={308} height={54} kind="warm" appearFrame={85} frame={frame} />
          </div>

          {/* Thu */}
          <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
            <CalEv name="Tom (old friend)" time="1:00 PM" detail="My network" top={188} height={54} kind="gray" appearFrame={25} frame={frame} />
            <CalEv name="* GC Partner" time="4:00 PM · via Guy M." detail="General Catalyst" top={368} height={54} kind="gold" appearFrame={125} frame={frame} />
          </div>

          {/* Fri */}
          <div style={{ position: "relative", borderLeft: "1px solid rgba(0,0,0,0.04)" }}>
            <CalEv name="Jake L. (advisor)" time="3:00 PM · origin" detail="Where it started" top={308} height={54} kind="gray" appearFrame={35} frame={frame} />
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(248,249,250,0.95)",
            borderTop: "1px solid #E0E0E0",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {[
            { dot: "#BDBDBD", label: "My network", num: "3", numColor: "#202124" },
            { dot: "#FFB300", label: "Intros generated", num: "5", numColor: GOLD },
            { dot: GOLD, label: "Top Tier in reach", num: "3", numColor: GOLD, glow: true },
          ].map(({ dot, label, num, numColor, glow }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: "50%",
                  background: dot,
                  flexShrink: 0,
                  boxShadow: glow ? "0 0 5px rgba(212,165,116,0.5)" : undefined,
                }}
              />
              <span style={{ fontSize: 10, fontWeight: 600, color: "#5F6368" }}>{label}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: numColor, marginLeft: 3 }}>
                {num}
              </span>
            </div>
          ))}
          <div style={{ marginLeft: "auto", fontFamily: "'IBM Plex Serif', serif", fontStyle: "italic", fontSize: 11, color: "#5F6368" }}>
            Each meeting unlocking the{" "}
            <b style={{ fontStyle: "normal", fontWeight: 500, color: GOLD }}>next door</b>
          </div>
        </div>
      </div>

      {/* Narrator card (slides up from bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          background: "rgba(10,10,10,0.82)",
          borderTop: "1px solid rgba(212,165,116,0.18)",
          padding: "14px 24px 16px",
          zIndex: 20,
          transform: `translateY(${cardY}%)`,
          opacity: cardP,
          borderRadius: "0 0 6px 6px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: GOLD,
              boxShadow: "0 0 7px rgba(212,165,116,0.6)",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(212,165,116,0.55)",
            }}
          >
            InTouch · narrating
          </span>
        </div>

        {/* Phrase 0 */}
        <div style={ncPhraseStyle(frame, NARRATOR_IN + 10, P0_END)}>
          <div
            style={{
              fontFamily: "'IBM Plex Serif', serif",
              fontStyle: "italic",
              fontSize: 17,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <span style={{ fontStyle: "normal", fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(212,165,116,0.55)", display: "block", marginBottom: 4 }}>
              What happened next
            </span>
            Each meeting started generating more intros — to{" "}
            <span
              style={{
                fontStyle: "normal",
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                color: GOLD,
              }}
            >
              investors, founders, and top advisors
            </span>
            .
          </div>
        </div>

        {/* Phrase 1 */}
        <div style={ncPhraseStyle(frame, P1_START, P1_END)}>
          <div
            style={{
              fontFamily: "'IBM Plex Serif', serif",
              fontStyle: "italic",
              fontSize: 17,
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            <span style={{ fontStyle: "normal", fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(212,165,116,0.55)", display: "block", marginBottom: 4 }}>
              The shift
            </span>
            Access was{" "}
            <b style={{ fontStyle: "normal", color: "#fff" }}>opening up</b>.
          </div>
        </div>
      </div>
    </div>
  );
}
