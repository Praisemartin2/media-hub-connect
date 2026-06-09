import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, TITLE_CARDS, HOOK, CTA } from "./reel-data";
import captions from "./captions.json";

const FONT =
  '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';

type Word = { w: string; start: number; end: number };
type Cap = { start: number; end: number; text: string; words: Word[] };
const CAPS = captions as Cap[];

// ---------- Warm editorial grade + scrim ----------
const Grade: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo
      src={staticFile("appraisal.mp4")}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        filter:
          "contrast(1.06) saturate(1.04) brightness(1.02) sepia(0.06) hue-rotate(-6deg)",
      }}
    />
    {/* subtle warm vignette */}
    <AbsoluteFill
      style={{
        boxShadow: "inset 0 0 320px rgba(76,34,12,0.30)",
        pointerEvents: "none",
      }}
    />
    {/* bottom scrim for caption legibility */}
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(to top, rgba(17,17,17,0.62) 0%, rgba(17,17,17,0.18) 22%, rgba(17,17,17,0) 38%)",
      }}
    />
  </AbsoluteFill>
);

// ---------- Karaoke captions ----------
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cap = CAPS.find((c) => t >= c.start && t <= c.end);
  if (!cap) return null;
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 360,
        paddingLeft: 70,
        paddingRight: 70,
      }}
    >
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 70,
          lineHeight: 1.05,
          textAlign: "center",
          letterSpacing: -1,
          textShadow: "0 4px 18px rgba(0,0,0,0.55)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 18px",
        }}
      >
        {cap.words.map((wd, i) => {
          const active = t >= wd.start && t <= wd.end + 0.02;
          const pop = active ? 1.06 : 1;
          return (
            <span
              key={i}
              style={{
                color: active ? COLORS.rust : COLORS.white,
                transform: `scale(${pop})`,
                display: "inline-block",
                transition: "color 0.05s",
              }}
            >
              {wd.w}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Hook overlay (kicker pill + headline) ----------
const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 18 });
  const localEnd = (HOOK.end - HOOK.start) * fps;
  const out = interpolate(frame, [localEnd - 12, localEnd], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(inSpring, [0, 1], [40, 0]);
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: 70,
        paddingBottom: 560,
        opacity: out,
      }}
    >
      <div style={{ transform: `translateY(${y}px)`, opacity: inSpring }}>
        <div
          style={{
            display: "inline-block",
            background: COLORS.cobalt,
            color: COLORS.cream,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 32,
            letterSpacing: 3,
            padding: "10px 22px",
            borderRadius: 100,
            marginBottom: 18,
          }}
        >
          {HOOK.kicker}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: 110,
            lineHeight: 0.98,
            color: COLORS.white,
            letterSpacing: -2,
            textShadow: "0 6px 26px rgba(0,0,0,0.5)",
          }}
        >
          {HOOK.headline.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- Full-frame title card ----------
const Card: React.FC<{ bg: string; fg: string; lines: string[] }> = ({ bg, fg, lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 10 });
  const scale = interpolate(s, [0, 1], [0.86, 1]);
  return (
    <AbsoluteFill style={{ background: bg, justifyContent: "center", alignItems: "flex-start", padding: 90 }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 150,
          lineHeight: 0.95,
          letterSpacing: -3,
          color: fg,
          transform: `scale(${scale})`,
          transformOrigin: "left center",
        }}
      >
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ---------- Closing CTA card ----------
const CtaCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 14 });
  const y = interpolate(s, [0, 1], [50, 0]);
  return (
    <AbsoluteFill style={{ background: COLORS.cobalt, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ transform: `translateY(${y}px)`, opacity: s, textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            background: COLORS.rust,
            color: COLORS.white,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 32,
            letterSpacing: 3,
            padding: "10px 22px",
            borderRadius: 100,
            marginBottom: 28,
          }}
        >
          {CTA.kicker}
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: 150,
            lineHeight: 0.95,
            letterSpacing: -3,
            color: COLORS.cream,
          }}
        >
          {CTA.big.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
        <div
          style={{
            marginTop: 26,
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 40,
            color: COLORS.cream,
            opacity: 0.85,
          }}
        >
          {CTA.sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const AppraisalReel: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <Grade />
      <Captions />
      <Sequence from={Math.round(HOOK.start * fps)} durationInFrames={Math.round((HOOK.end - HOOK.start) * fps)}>
        <Hook />
      </Sequence>
      {TITLE_CARDS.map((c, i) => (
        <Sequence key={i} from={Math.round(c.start * fps)} durationInFrames={Math.round(c.dur * fps)}>
          <Card bg={c.bg} fg={c.fg} lines={c.lines} />
        </Sequence>
      ))}
      <Sequence from={Math.round(CTA.start * fps)} durationInFrames={durationInFrames - Math.round(CTA.start * fps)}>
        <CtaCard />
      </Sequence>
    </AbsoluteFill>
  );
};
