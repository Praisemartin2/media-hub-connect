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
import { COLORS, TITLE_CARDS, HOOK, CTA, ASSETS_READY, SRC } from "./dscr-data";
import captions from "./dscr-captions.json";

const FONT = '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';
const SCRIM =
  "linear-gradient(to top, rgba(17,17,17,0.60) 0%, rgba(17,17,17,0.16) 22%, rgba(17,17,17,0) 38%)";

type Word = { w: string; start: number; end: number };
type Cap = { start: number; end: number; text: string; words: Word[] };
const CAPS = captions as Cap[];

// A-roll: user's already-edited footage. NO color filter (preserve their look).
const Aroll: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(SRC)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: SCRIM }} />
  </AbsoluteFill>
);

const BrandedBg: React.FC = () => {
  const frame = useCurrentFrame();
  const hue = interpolate(frame, [0, 1800], [0, 18]);
  return (
    <AbsoluteFill style={{ background: `linear-gradient(${135 + hue}deg, ${COLORS.espresso} 0%, ${COLORS.cobalt} 55%, ${COLORS.rust} 120%)` }}>
      <AbsoluteFill style={{ background: SCRIM }} />
    </AbsoluteFill>
  );
};

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cap = CAPS.find((c) => t >= c.start && t <= c.end);
  if (!cap) return null;
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 360, paddingLeft: 70, paddingRight: 70 }}>
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 70,
          lineHeight: 1.05,
          textAlign: "center",
          letterSpacing: -1,
          textShadow: "0 4px 18px rgba(0,0,0,0.6)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 18px",
        }}
      >
        {cap.words.map((wd, i) => {
          const active = t >= wd.start && t <= wd.end + 0.02;
          return (
            <span key={i} style={{ color: active ? COLORS.rust : COLORS.white, transform: `scale(${active ? 1.06 : 1})`, display: "inline-block" }}>
              {wd.w}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const inSpring = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 18 });
  const localEnd = (HOOK.end - HOOK.start) * fps;
  const out = interpolate(frame, [localEnd - 12, localEnd], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y = interpolate(inSpring, [0, 1], [40, 0]);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "flex-start", padding: 70, paddingBottom: 560, opacity: out }}>
      <div style={{ transform: `translateY(${y}px)`, opacity: inSpring }}>
        <div style={{ display: "inline-block", background: COLORS.cobalt, color: COLORS.cream, fontFamily: FONT, fontWeight: 800, fontSize: 32, letterSpacing: 3, padding: "10px 22px", borderRadius: 100, marginBottom: 18 }}>
          {HOOK.kicker}
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 110, lineHeight: 0.98, color: COLORS.white, letterSpacing: -2, textShadow: "0 6px 26px rgba(0,0,0,0.55)" }}>
          {HOOK.headline.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Card: React.FC<{ bg: string; fg: string; lines: string[] }> = ({ bg, fg, lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 10 });
  const scale = interpolate(s, [0, 1], [0.86, 1]);
  return (
    <AbsoluteFill style={{ background: bg, justifyContent: "center", alignItems: "flex-start", padding: 90 }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontStyle: "italic", fontSize: 150, lineHeight: 0.95, letterSpacing: -3, color: fg, transform: `scale(${scale})`, transformOrigin: "left center" }}>
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

const CtaCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 14 });
  const y = interpolate(s, [0, 1], [50, 0]);
  return (
    <AbsoluteFill style={{ background: COLORS.cobalt, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ transform: `translateY(${y}px)`, opacity: s, textAlign: "center" }}>
        <div style={{ display: "inline-block", background: COLORS.rust, color: COLORS.white, fontFamily: FONT, fontWeight: 800, fontSize: 32, letterSpacing: 3, padding: "10px 22px", borderRadius: 100, marginBottom: 28 }}>
          {CTA.kicker}
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 900, fontStyle: "italic", fontSize: 150, lineHeight: 0.95, letterSpacing: -3, color: COLORS.cream }}>
          {CTA.big.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
        <div style={{ marginTop: 26, fontFamily: FONT, fontWeight: 700, fontSize: 38, color: COLORS.cream, opacity: 0.85 }}>
          {CTA.sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const DSCRReel: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const ctaFrom = Math.round(CTA.startFrac * durationInFrames);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {ASSETS_READY ? <Aroll /> : <BrandedBg />}
      <Captions />
      <Sequence from={Math.round(HOOK.start * fps)} durationInFrames={Math.round((HOOK.end - HOOK.start) * fps)}>
        <Hook />
      </Sequence>
      {TITLE_CARDS.map((c, i) => (
        <Sequence key={i} from={Math.round(c.atFrac * durationInFrames)} durationInFrames={Math.round(c.dur * fps)}>
          <Card bg={c.bg} fg={c.fg} lines={c.lines} />
        </Sequence>
      ))}
      <Sequence from={ctaFrom} durationInFrames={durationInFrames - ctaFrom}>
        <CtaCard />
      </Sequence>
    </AbsoluteFill>
  );
};
