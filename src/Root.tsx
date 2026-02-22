import React from "react";
import { Composition } from "remotion";
import { Animatic } from "./Animatic";

// Composition constants
export const FPS = 30;
export const WIDTH = 1280;
export const HEIGHT = 720;

// Scene durations in frames (converted from ms at 30fps)
export const SCENE_FRAMES = [
  120,  // S1  -- Opening        4000ms
  300,  // S2  -- Closed Garden  10000ms
  222,  // S3  -- Network Limits 7400ms
  195,  // S4  -- Desperate Ask  6500ms
  105,  // S5  -- Then InTouch   3500ms
  390,  // S6  -- Network Scan   13000ms
  276,  // S7  -- Strategic Ask  9200ms
  270,  // S8  -- Momentum       9000ms
  186,  // S9  -- Compounded     6200ms
  162,  // S10 -- The Number     5400ms
  165,  // S11 -- End Card       5500ms
];

export const TOTAL_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);

export function Root() {
  return (
    <>
      <Composition
        id="Animatic"
        component={Animatic}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
}
