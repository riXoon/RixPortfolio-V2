import { AbsoluteFill, Img, Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Easing, OffthreadVideo, Interactive } from "remotion";
import { staticFile } from "remotion";
import React from "react";
import { Audio } from "@remotion/media";

const Theme = {
  colors: {
    bg1: "#0f172a",
    bg2: "#1e1b4b",
    textPrimary: "#ffffff",
    textSecondary: "#94a3b8",
  },
  spring: {
    bouncy: { damping: 12, mass: 0.5, stiffness: 100 },
    smooth: { damping: 20, mass: 1, stiffness: 100 },
  }
};

const Vignette: React.FC = () => (
  <div style={{
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    background: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
    pointerEvents: "none", zIndex: 100,
  }} />
);

const Grain: React.FC = () => (
  <div style={{
    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.06, pointerEvents: "none", zIndex: 99,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
  }} />
);

const BgMesh: React.FC = () => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 900], [0, 180]);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(${rotate}deg, ${Theme.colors.bg1}, ${Theme.colors.bg2})` }} />
  );
};

const AnimatedText: React.FC<{ text: string; delay?: number; style?: React.CSSProperties }> = ({ text, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", ...style }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 3; // tighter stagger
        const opacity = interpolate(frame - wordDelay, [0, 10], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
        const translateY = spring({ frame: frame - wordDelay, fps, config: Theme.spring.bouncy, from: 30, to: 0 });
        const scale = spring({ frame: frame - wordDelay, fps, config: Theme.spring.bouncy, from: 0.8, to: 1 });
        return (
          <span key={i} style={{ opacity, translate: `0 ${translateY}px`, scale, display: "inline-block", marginRight: "0.25em" }}>
            {word}
          </span>
        );
      })}
    </div>
  );
};

export type PromoVideoProps = {
  sceneDurations: number[];
};

export const PromoVideo: React.FC<PromoVideoProps> = ({ sceneDurations = [600, 900, 1500, 1800, 600] }) => {
  const [intro, skills, projects, demo, outro] = sceneDurations;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: Theme.colors.bg1,
        color: Theme.colors.textPrimary,
        fontFamily: "sans-serif",
        rotate: "-0.35099 -0.936299 0.012257 4.271895deg",
        scale: 1.001,
        translate: "1.4px 2.1px"
      }}
    >
      <BgMesh />
      <Audio src={staticFile("voiceover/full.mp3")} />
      <Sequence from={0} durationInFrames={intro}>
        <Intro durationInFrames={intro} />
      </Sequence>
      <Sequence from={intro} durationInFrames={skills}>
        <Skills durationInFrames={skills} />
      </Sequence>
      <Sequence from={intro + skills} durationInFrames={projects}>
        <Projects durationInFrames={projects} />
      </Sequence>
      <Sequence from={intro + skills + projects} durationInFrames={demo}>
        <Demo durationInFrames={demo} />
      </Sequence>
      <Sequence from={intro + skills + projects + demo} durationInFrames={outro}>
        <Outro durationInFrames={outro} />
      </Sequence>
      <Grain />
      <Vignette />
    </AbsoluteFill>
  );
};

const Intro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const logoScale = spring({ frame, fps, config: Theme.spring.bouncy, from: 0, to: 1 });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  
  // Slide up to exit
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateRight: "clamp" });
  const exitY = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, -100], { extrapolateRight: "clamp", easing: Easing.in(Easing.exp) });
  
  const idleY = Math.sin(frame / 15) * 8; // idle breathing

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exitOpacity, translate: `0 ${exitY}px` }}>
      <Img 
        src={staticFile("assets/rix-logo.png")} 
        style={{ width: 300, scale: logoScale, opacity: logoOpacity, translate: `0 ${idleY}px`, filter: "drop-shadow(0px 10px 30px rgba(255, 255, 255, 0.2))" }} 
      />
      <AnimatedText text="Hi, I'm Erixon" delay={20} style={{ fontSize: 80, marginTop: 40, fontWeight: "bold" }} />
      <AnimatedText text="Full-Stack Developer" delay={40} style={{ fontSize: 40, color: Theme.colors.textSecondary, marginTop: 20 }} />
    </AbsoluteFill>
  );
}

const Skills: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Slide up to enter, slide up to exit
  const enterY = interpolate(frame, [0, 20], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) });
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateRight: "clamp" });
  const exitY = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, -100], { extrapolateRight: "clamp", easing: Easing.in(Easing.exp) });
  
  const logos = [
    "assets/logos/reactjs-logo.png",
    "assets/logos/nextjs-logo.png",
    "assets/logos/nodejs-logo.png",
    "assets/logos/tailwind-logo.png",
    "assets/logos/typescript-logo.png",
  ];

  const underlineWidth = spring({ frame: frame - 15, fps, config: Theme.spring.bouncy, from: 0, to: 400 });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exitOpacity, translate: `0 ${enterY + exitY}px` }}>
      <AnimatedText text="Building with Modern Technologies" delay={0} style={{ fontSize: 60, marginBottom: 20, fontWeight: "bold" }} />
      <div style={{ width: underlineWidth, height: 6, backgroundColor: Theme.colors.textPrimary, borderRadius: 3, marginBottom: 80 }} />
      
      <div style={{ display: "flex", gap: "60px" }}>
        {logos.map((src, i) => {
          const logoScale = spring({ frame: frame - (i * 5 + 15), fps, config: Theme.spring.bouncy, from: 0, to: 1 });
          const idleY = Math.sin((frame + i * 10) / 10) * 10;
          return (
            <Img 
              key={src} 
              src={staticFile(src)} 
              style={{ width: 120, height: 120, objectFit: "contain", scale: logoScale, translate: `0 ${idleY}px`, filter: "drop-shadow(0px 0px 20px rgba(255, 255, 255, 0.5))" }} 
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
}

const Projects: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const slideDuration = Math.ceil(durationInFrames / 3);

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={slideDuration}>
        <ProjectSlide src="assets/banners/erixon-banner.png" title="Personal Portfolio" durationInFrames={slideDuration} />
      </Sequence>
      <Sequence from={slideDuration} durationInFrames={slideDuration}>
        <ProjectSlide src="assets/banners/zentry-banner.png" title="Zentry Clone" durationInFrames={slideDuration} />
      </Sequence>
      <Sequence from={slideDuration * 2} durationInFrames={durationInFrames - slideDuration * 2}>
        <ProjectSlide src="assets/banners/furniro-banner.png" title="Furniro E-Commerce" durationInFrames={durationInFrames - slideDuration * 2} />
      </Sequence>
    </AbsoluteFill>
  );
}

const ProjectSlide: React.FC<{ src: string, title: string, durationInFrames: number }> = ({ src, title, durationInFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateRight: "clamp" });
  
  // Professional Ken Burns effect (slow scale up + pan)
  const scaleValue = interpolate(frame, [0, durationInFrames], [1, 1.08], { extrapolateRight: "clamp" });
  const panY = interpolate(frame, [0, durationInFrames], [0, -30], { extrapolateRight: "clamp" });

  // Title slide in from side
  const { fps } = useVideoConfig();
  const titleX = spring({ frame: frame - 10, fps, config: Theme.spring.smooth, from: -100, to: 0 });

  return (
    <AbsoluteFill style={{ opacity: exitOpacity, justifyContent: "center", alignItems: "center" }}>
      <AbsoluteFill style={{ opacity }}>
        <Img 
          src={staticFile(src)} 
          style={{ width: "100%", height: "100%", objectFit: "cover", scale: scaleValue, translate: `0 ${panY}px` }} 
        />
        <div style={{ position: "absolute", bottom: 0, width: "100%", height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", bottom: 100, width: "100%", translate: `${titleX}px 0` }}>
        <AnimatedText text={title} delay={15} style={{ fontSize: 70, fontWeight: "bold", textShadow: "2px 2px 10px rgba(0,0,0,0.8)" }} />
      </div>
    </AbsoluteFill>
  );
}

const Demo: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enterY = interpolate(frame, [0, 20], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) });
  const exitOpacity = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], { extrapolateRight: "clamp" });
  const exitY = interpolate(frame, [durationInFrames - 15, durationInFrames], [0, -100], { extrapolateRight: "clamp", easing: Easing.in(Easing.exp) });

  // 30 seconds total, divide into 3 cuts of 10 seconds
  const cutDuration = Math.ceil(durationInFrames / 3);

  // Cuts start from different parts of the video (0s, 15s, 30s)
  // Assuming video_demo.mp4 has at least 45 seconds of content
  const cuts = [
    { startFrom: 0 * fps, title: "Modern Design" },
    { startFrom: 15 * fps, title: "Seamless Interactions" },
    { startFrom: 30 * fps, title: "Responsive Layouts" }
  ];

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: exitOpacity, translate: `0 ${enterY + exitY}px` }}>
      {cuts.map((cut, i) => (
        <Sequence key={i} from={i * cutDuration} durationInFrames={cutDuration}>
          <DemoCut startFrom={cut.startFrom} title={cut.title} durationInFrames={cutDuration} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const DemoCut: React.FC<{ startFrom: number, title: string, durationInFrames: number }> = ({ startFrom, title, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Div
      name="Demo Cut Container"
      style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        perspective: 1200
      }}
    >
      <Interactive.Div
        name="Browser Window"
        style={{
          width: "75%",
          height: "65%",
          backgroundColor: "#1e1e1e",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 100px rgba(255,255,255,0.1)",
          scale: interpolate(frame, [0, durationInFrames], [0.9, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          rotateX: interpolate(frame, [0, durationInFrames], ["15deg", "0deg"], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          rotateY: interpolate(frame, [0, durationInFrames], ["-15deg", "0deg"], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
          border: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          transformOrigin: "center"
        }}
      >
        <Interactive.Div name="Browser Header" style={{ height: 40, backgroundColor: "#2d2d2d", display: "flex", alignItems: "center", padding: "0 20px", gap: 8, borderBottom: "1px solid rgba(0,0,0,0.5)" }}>
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#ff5f56" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#27c93f" }} />
          <div style={{ marginLeft: 20, backgroundColor: "#1e1e1e", padding: "4px 20px", borderRadius: 10, fontSize: 14, color: "#888", fontFamily: "sans-serif" }}>erixon.dev</div>
        </Interactive.Div>
        <OffthreadVideo 
          name="Demo Footage"
          src={staticFile("video_demo.mp4")}
          startFrom={startFrom}
          endAt={startFrom + durationInFrames}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Interactive.Div>

      <Interactive.Div 
        name="Cut Title"
        style={{ 
          position: "absolute", 
          bottom: 80, 
          width: "100%", 
          textAlign: "center", 
          translate: `0 ${spring({ frame: frame - 10, fps, config: Theme.spring.smooth, from: 50, to: 0 })}px`,
          opacity: interpolate(frame - 10, [0, 15], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" })
        }}
      >
        <AnimatedText text={title} delay={15} style={{ fontSize: 75, fontWeight: "bold", textShadow: "0px 10px 30px rgba(0,0,0,0.8)" }} />
      </Interactive.Div>
    </Interactive.Div>
  );
};

const Outro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const logoScale = spring({ frame: frame - 20, fps, config: Theme.spring.bouncy, from: 0, to: 1 });
  const idleY = Math.sin((frame - 20) / 15) * 8;
  const enterY = interpolate(frame, [0, 20], [100, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.out(Easing.exp) });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", translate: `0 ${enterY}px` }}>
      <AnimatedText text="Let's Build Something Amazing" delay={0} style={{ fontSize: 80, fontWeight: "bold", marginBottom: 60 }} />
      <Img 
        src={staticFile("assets/rix-logo.png")} 
        style={{ width: 250, scale: logoScale, translate: `0 ${idleY}px`, filter: "drop-shadow(0px 0px 30px rgba(255, 255, 255, 0.4))" }} 
      />
    </AbsoluteFill>
  );
}
