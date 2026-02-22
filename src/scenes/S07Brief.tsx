import React from "react";
import { spring, interpolate, useCurrentFrame } from "remotion";

// S7 -- Strategic Ask Brief · Type B · 276 frames (9.2s)

const GOLD = "#D4A574";
const GOLD_DARK = "#C07820";
const INK = "#3A3830";
const INK_LIGHT = "#6A6660";
const INK_FAINT = "#9A9690";
const FPS = 30;
const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };

const P0_END = 92;
const P1_START = 92;
const P1_END = 184;
const P2_START = 184;
const P2_END = 265;
const LEG_START = 230;

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

interface IntroCardProps {
  name: string;
  nameAccentColor: string;
  role: string;
  why: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  borderColor: string;
  warmNote?: string;
  appearFrame: number;
  frame: number;
}

function IntroCard({
  name, nameAccentColor, role, why,
  badgeText, badgeBg, badgeColor, borderColor,
  warmNote, appearFrame, frame,
}: IntroCardProps) {
  const p = sp(frame, appearFrame);
  return (
    <div
      style={{
        borderRadius: 5,
        border: "1px solid #E8E8E8",
        borderLeft: `3px solid ${borderColor}`,
        padding: "9px 12px",
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 7,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [6, 0])}px)`,
        position: "relative",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#202124", paddingRight: 100 }}>
          {name.split(" — ")[0]} —{" "}
          <span style={{ color: nameAccentColor }}>{name.split(" — ")[1]}</span>
        </div>
        <div style={{ fontSize: 11, color: "#70757A", marginTop: 1, marginBottom: 5 }}>{role}</div>
        <div
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontSize: 11,
            color: "#70757A",
            lineHeight: 1.5,
            paddingTop: 5,
            borderTop: "1px solid #F4F4F4",
          }}
        >
          {why}
        </div>
        {warmNote && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 9,
              fontWeight: 700,
              color: "#5A8A5A",
              marginTop: 4,
            }}
          >
            ● {warmNote}
          </div>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: 9,
          right: 9,
          display: "inline-flex",
          alignItems: "center",
          borderRadius: 100,
          padding: "3px 8px",
          fontSize: 9,
          fontWeight: 800,
          letterSpacing: "0.04em",
          background: badgeBg,
          color: badgeColor,
          border: `1px solid ${borderColor}`,
          whiteSpace: "nowrap",
        }}
      >
        {badgeText}
      </div>
    </div>
  );
}

export function S07Brief() {
  const frame = useCurrentFrame();
  const winP = sp(frame, 0);
  const legP = sp(frame, LEG_START);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#F5F3EE",
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
        {/* Brief window */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            borderRadius: 7,
            boxShadow: "0 2px 8px rgba(0,0,0,0.12), 0 16px 48px rgba(0,0,0,0.07)",
            overflow: "hidden",
          }}
        >
          {/* Chrome */}
          <div
            style={{
              background: "#F6F6F4",
              padding: "9px 14px",
              display: "flex",
              alignItems: "center",
              gap: 7,
              borderBottom: "1px solid #E4E4E0",
            }}
          >
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#E8685C" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#F5BD4F" }} />
            <div style={{ width: 11, height: 11, borderRadius: "50%", background: "#61C554" }} />
            <div style={{ marginLeft: "auto" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: "rgba(212,165,116,0.1)",
                  border: "1.5px solid rgba(212,165,116,0.3)",
                  borderRadius: 100,
                  padding: "4px 12px",
                  fontSize: 10,
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
                Strategic Ask Brief · InTouch
              </div>
            </div>
          </div>

          {/* Email header */}
          <div
            style={{
              padding: "14px 20px 10px",
              borderBottom: "1px solid #E8E8E4",
            }}
          >
            <div style={{ fontSize: 17, fontWeight: 500, color: "#202124", marginBottom: 10 }}>
              Strategic Ask Brief — Your meeting with Jake L. today 5:30pm
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(212,165,116,0.15)",
                  border: "1.5px solid rgba(212,165,116,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                📬
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#202124" }}>InTouch</div>
                <div style={{ fontSize: 11, color: "#70757A" }}>gordy@intouch123.com</div>
              </div>
              <div style={{ fontSize: 11, color: "#70757A", marginLeft: "auto" }}>Today, 2:41 PM</div>
            </div>
          </div>

          {/* Jake context row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              margin: "12px 20px",
              paddingBottom: 12,
              borderBottom: "1px solid #F0F0F0",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: "#E8E8E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontWeight: 700,
                color: "#888",
                flexShrink: 0,
              }}
            >
              JL
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#202124" }}>Jake L.</div>
              <div style={{ fontSize: 11, color: "#70757A", marginTop: 2 }}>
                Founder (2x acquired) · Angel · Palo Alto
              </div>
            </div>
            <div
              style={{
                fontFamily: "'IBM Plex Serif', serif",
                fontSize: 12,
                color: "#70757A",
                lineHeight: 1.55,
                marginLeft: "auto",
                maxWidth: 280,
                textAlign: "right",
                fontStyle: "italic",
              }}
            >
              Serial founder turned active angel. Strong network into early-stage B2B investors —
              Govtech and enterprise SaaS.
            </div>
          </div>

          {/* Section label */}
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#70757A",
              padding: "0 20px 8px",
            }}
          >
            Your path out — ask for these intros
          </div>

          {/* Intro cards */}
          <div style={{ padding: "0 20px 14px" }}>
            <IntroCard
              name="Ron B. — Govtech Fund"
              nameAccentColor={GOLD}
              role="Managing Partner · San Francisco"
              why="GovTech-focused VC, directly aligned with Jake's background. Shaul O. (also in today's meeting) is a mutual connection."
              badgeText="• 1° from Top Tier"
              badgeBg="rgba(212,165,116,0.12)"
              badgeColor={GOLD}
              borderColor={GOLD}
              warmNote="High response likelihood — mutual connection bridging"
              appearFrame={20}
              frame={frame}
            />
            <IntroCard
              name="Sascha M. — Angel Investor"
              nameAccentColor="#B89040"
              role="3 Exits ($1B+) · SF"
              why="Highly aligned founder-to-investor profile. Jake likely knows them from the SF ecosystem."
              badgeText="• 2° from Top Tier"
              badgeBg="rgba(200,168,96,0.08)"
              badgeColor="#B89040"
              borderColor="#C8A860"
              appearFrame={40}
              frame={frame}
            />
            <IntroCard
              name="Guy M. — Miasnik Ventures"
              nameAccentColor="#988040"
              role="4x CEO/Founder · Investor"
              why="55 mutual connections to you. Active investor — a bridge deeper into the network."
              badgeText="• 3° from Top Tier"
              badgeBg="rgba(180,148,80,0.06)"
              badgeColor="#988040"
              borderColor="#B89858"
              appearFrame={60}
              frame={frame}
            />
          </div>
        </div>

        {/* Side panel */}
        <div
          style={{
            width: 270,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
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
              What changed
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
              Then InTouch sent me a{" "}
              <span
                style={{
                  fontStyle: "normal",
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: 800,
                  color: GOLD,
                  fontSize: 14,
                }}
              >
                Strategic Ask Brief
              </span>
              .
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
              Three paths out
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
              <b style={{ fontStyle: "normal", fontWeight: 700, color: INK }}>
                Specific people. Specific reasons.
              </b>{" "}
              Ordered by how close they are to Top Tier.
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
              I walk in knowing
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
              <em>Exactly</em> who to ask for. Jake said yes before I finished the sentence.
            </div>
          </div>

          {/* Degree legend */}
          <div
            style={{
              marginTop: 8,
              opacity: legP,
              transform: `translateY(${interpolate(legP, [0, 1], [4, 0])}px)`,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 7,
                padding: "11px 14px",
                background: "rgba(0,0,0,0.03)",
                borderRadius: 8,
              }}
            >
              {[
                { label: "1° — direct path to Top Tier", barColor: GOLD, textColor: "#A07838" },
                { label: "2° — one hop away", barColor: "#B89040", textColor: "#8A7030" },
                { label: "3° — bridge deeper in", barColor: "#988040", textColor: "#7A6028" },
              ].map(({ label, barColor, textColor }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 10,
                    fontWeight: 600,
                    color: textColor,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 4,
                      borderRadius: 2,
                      background: barColor,
                      flexShrink: 0,
                    }}
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
