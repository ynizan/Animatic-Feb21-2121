import React, { useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { Animatic } from "../Animatic";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "../Root";

export function PlayerShell() {
  const playerRef = useRef<PlayerRef>(null);
  const [showControls, setShowControls] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#111",
        minHeight: "100vh",
        padding: "20px 0",
      }}
    >
      <div style={{ position: "relative" }}>
        <Player
          ref={playerRef}
          component={Animatic}
          durationInFrames={TOTAL_FRAMES}
          fps={FPS}
          compositionWidth={WIDTH}
          compositionHeight={HEIGHT}
          style={{ width: "min(100vw, 1280px)" }}
          controls={showControls}
          autoPlay={false}
          loop={false}
        />

        {/* Debug controls toggle */}
        <button
          onClick={() => setShowControls((v) => !v)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: showControls ? "#D4A574" : "rgba(255,255,255,0.15)",
            color: showControls ? "#1A1916" : "#fff",
            border: "none",
            borderRadius: 6,
            padding: "5px 12px",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.06em",
            cursor: "pointer",
            textTransform: "uppercase",
            transition: "background 0.2s",
          }}
        >
          {showControls ? "Controls ON" : "Controls OFF"}
        </button>
      </div>
    </div>
  );
}
