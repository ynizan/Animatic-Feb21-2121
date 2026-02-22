import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";

// ── Design tokens
const GOLD = "#C07820";
const GOLD_LIGHT = "#D4A574";
const GRAY_TEXT = "#6B6860";
const DARK = "#1A1916";
const BG = "#F5F3EE";
const FPS = 30;

const SOFT = { damping: 80, stiffness: 180, mass: 0.8 };
const SNAPPY = { damping: 90, stiffness: 260, mass: 0.7 };

function useSlideUp(frame: number, startFrame: number, distance = 8) {
  const p = spring({ frame: frame - startFrame, fps: FPS, from: 0, to: 1, config: SOFT });
  return interpolate(p, [0, 1], [distance, 0]);
}

// ── Animation schedule (all in frames at 30fps)
// S1 is 120 frames = 4 seconds
//
//  0-20   "A true story" eyebrow fades + rises
//  12-50  Title line 1 fades + rises
//  35-68  "Sequoia" gold color transition
//  48-78  Title line 2 fades + rises
//  68-92  Horizontal rule draws left-to-right
//  88-105 Legend gray item fades + rises
//  103-113 Connector "--but I needed--" fades in
//  110-122 Gold "Top Tier investors" fades + scales
//  110-122 Gold dot pulse

export function S01Opening() {
  const frame = useCurrentFrame();

  // Eyebrow
  const eyebrowOpacity = spring({ frame, fps: FPS, from: 0, to: 1, config: SOFT });
  const eyebrowY = useSlideUp(frame, 0);

  // Title line 1
  const titleL1Opacity = spring({ frame: frame - 12, fps: FPS, from: 0, to: 1, config: SOFT });
  const titleL1Y = useSlideUp(frame, 12, 6);

  // "Sequoia" highlight color: neutral → gold, then scale subtle pop
  const seqProgress = spring({ frame: frame - 35, fps: FPS, from: 0, to: 1, config: SNAPPY });
  const seqColor = `rgb(${lerp(136, 192, seqProgress)}, ${lerp(136, 120, seqProgress)}, ${lerp(136, 32, seqProgress)})`;
  const seqScale = interpolate(seqProgress, [0, 0.5, 1], [1, 1.03, 1]);

  // Title line 2
  const titleL2Opacity = spring({ frame: frame - 48, fps: FPS, from: 0, to: 1, config: SOFT });
  const titleL2Y = useSlideUp(frame, 48, 6);

  // Rule line — draw width 0 → 100%
  const ruleProgress = spring({ frame: frame - 68, fps: FPS, from: 0, to: 1, config: SNAPPY });
  const ruleWidth = `${interpolate(ruleProgress, [0, 1], [0, 100])}%`;

  // Legend gray item
  const lgOpacity = spring({ frame: frame - 88, fps: FPS, from: 0, to: 1, config: SOFT });
  const lgY = useSlideUp(frame, 88, 6);

  // Connector text
  const connOpacity = spring({ frame: frame - 103, fps: FPS, from: 0, to: 1, config: SOFT });

  // Gold "Top Tier investors" item
  const goldOpacity = spring({ frame: frame - 110, fps: FPS, from: 0, to: 1, config: SOFT });
  const goldScale = spring({ frame: frame - 110, fps: FPS, from: 0.94, to: 1, config: SNAPPY });

  // Gold dot pulse
  const dotScale = spring({ frame: frame - 110, fps: FPS, from: 0.4, to: 1, config: SNAPPY });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: BG,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: 740,
          padding: "0 40px",
        }}
      >
        {/* "A true story" eyebrow */}
        <div
          style={{
            opacity: eyebrowOpacity,
            transform: `translateY(${eyebrowY}px)`,
            fontFamily: "'Manrope', sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: GRAY_TEXT,
            marginBottom: 20,
          }}
        >
          A true story
        </div>

        {/* Main headline */}
        <div
          style={{
            fontFamily: "'IBM Plex Serif', serif",
            fontSize: 44,
            fontWeight: 300,
            lineHeight: 1.3,
            color: DARK,
          }}
        >
          {/* Line 1 */}
          <div
            style={{
              opacity: titleL1Opacity,
              transform: `translateY(${titleL1Y}px)`,
            }}
          >
            How I got the intro with{" "}
            <span
              style={{
                color: seqColor,
                transform: `scale(${seqScale})`,
                display: "inline-block",
                fontStyle: "italic",
              }}
            >
              Sequoia
            </span>
          </div>
          {/* Line 2 */}
          <div
            style={{
              opacity: titleL2Opacity,
              transform: `translateY(${titleL2Y}px)`,
            }}
          >
            that led to my Seed Round
          </div>
        </div>

        {/* Horizontal rule */}
        <div
          style={{
            marginTop: 28,
            marginBottom: 24,
            height: 1,
            width: ruleWidth,
            background: "#D8D4CC",
            borderRadius: 1,
            alignSelf: "center",
          }}
        />

        {/* Legend */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontFamily: "'Manrope', sans-serif",
            fontSize: 13,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Gray item */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: lgOpacity,
              transform: `translateY(${lgY}px)`,
              color: GRAY_TEXT,
            }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#9A9690",
                flexShrink: 0,
              }}
            />
            My friends kept connecting me to people just like me
          </div>

          {/* Connector */}
          <div
            style={{
              opacity: connOpacity,
              color: "#A0998E",
              fontStyle: "italic",
              fontSize: 12,
            }}
          >
            -- but I needed --
          </div>

          {/* Gold item */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: goldOpacity,
              transform: `scale(${goldScale})`,
              color: GOLD,
              fontWeight: 700,
            }}
          >
            {/* Gold dot with pulse */}
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: GOLD_LIGHT,
                flexShrink: 0,
                transform: `scale(${dotScale})`,
              }}
            />
            Top Tier investors
          </div>
        </div>
      </div>
    </div>
  );
}

// Linear interpolation helper
function lerp(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * Math.min(Math.max(t, 0), 1));
}
