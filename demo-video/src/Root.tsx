import { Composition, CalculateMetadataFunction, staticFile } from "remotion";
import { PromoVideo, PromoVideoProps } from "./PromoVideo";
import React from "react";
import { getAudioDuration } from "./get-audio-duration";

export const calculateMetadata: CalculateMetadataFunction<PromoVideoProps> = async ({ props }) => {
  const fps = 60;
  
  // The user requested exactly 1 minute and 30 seconds
  const totalFrames = 90 * fps;

  // Divide into: Intro (10s), Skills (15s), Projects (25s), Demo (30s), Outro (10s)
  const sceneDurations = [
    10 * fps,
    15 * fps,
    25 * fps,
    30 * fps,
    10 * fps
  ];

  return {
    durationInFrames: totalFrames,
    props: {
      ...props,
      sceneDurations,
    },
  };
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PromoVideo"
        component={PromoVideo}
        durationInFrames={900}
        fps={60}
        width={1920}
        height={1080}
        calculateMetadata={calculateMetadata}
        defaultProps={{
          sceneDurations: [150, 240, 390, 120]
        }}
      />
    </>
  );
};
