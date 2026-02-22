import React from "react";
import { Audio, staticFile, useCurrentFrame } from "remotion";
import { SCENE_FRAMES } from "./Root";
import { S01Opening } from "./scenes/S01Opening";

// Background music toggle -- set to true once audio/music.mp3 is placed in public/audio/
const MUSIC_ENABLED = false;

// Calculate cumulative start frames for each scene
const startFrames: number[] = [];
let acc = 0;
SCENE_FRAMES.forEach((f) => {
  startFrames.push(acc);
  acc += f;
});

export function Animatic() {
  const frame = useCurrentFrame();

  // Determine which scene we're in
  let sceneIndex = 0;
  for (let i = startFrames.length - 1; i >= 0; i--) {
    if (frame >= startFrames[i]) {
      sceneIndex = i;
      break;
    }
  }

  const sceneFrame = frame - startFrames[sceneIndex];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Background music -- drop public/audio/music.mp3 and set MUSIC_ENABLED=true */}
      {MUSIC_ENABLED && (
        <Audio src={staticFile("audio/music.mp3")} volume={0.25} />
      )}

      {/* Scene router */}
      {sceneIndex === 0 && (
        <S01Opening frame={sceneFrame} totalFrames={SCENE_FRAMES[0]} />
      )}

      {/* S2-S11 will be added as Remotion components in subsequent sessions */}
      {sceneIndex > 0 && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F5F3EE",
            fontFamily: "'Manrope', sans-serif",
            fontSize: 24,
            color: "#888",
          }}
        >
          Scene {sceneIndex + 1} — coming soon
        </div>
      )}
    </div>
  );
}
