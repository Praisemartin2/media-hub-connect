import React from "react";
import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  COLORS,
  HOOK,
  CTA,
  TITLE_CARDS,
  BROLL,
  ASSETS_READY,
  VO_SRC,
  MUSIC_SRC,
} from "./ekabo-data";
import captions from "./ekabo-captions.json";

const FONT = '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';

type Word = { w: string; start: number; end: number };
type Cap = { start: number; end: number; text: string; words: Word[] };
const CAPS = captions as Cap[];

const SCRIM =
  "linear-gradient(to top, rgba(17,17,17,0.62) 0%, rgba(17,17,17,0.18) 22%, rgba(17,17,17,0) 38%)";

// ---------- B-roll bed (one clip per segment, Ken-Burns push-in) ----------
const BrollClip: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 }, durationInFrames: 30 });
  const scale = interpolate(s, [0, 1], [1.0, 1.08]);
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <OffthreadVideo
        src={staticFile(src)}
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          filter:
            "contrast(1.06) saturate(1.04) brightness(1.02) sepia(0.06) hue-rotate(-6deg)",
        }}
      />
      <AbsoluteFill style={{ boxShadow: "inset 0 0 320px rgba(76,34,12,0.30)", pointerEvents: "none" }} />
      <AbsoluteFill style={{ background: SCRIM }} />
    </AbsoluteFill>
  );
};

const BrollBed: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      {BROLL.map((b, i) => (
        <Sequence key={i} from={Math.round(b.start * fps)} durationInFrames={Math.round(b.dur * fps)}>
          <BrollClip src={b.src} />
        </Sequence>
      ))}
    </>
  );
};

// Branded fallback so the reel renders/verifies without the heavy media.
const BrandedBg: React.FC = () => {
  const frame = useCurrentFrame();
  const hue = interpolate(frame, [0, 900], [0, 18]);
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${135 + hue}deg, ${COLORS.espresso} 0%, ${COLORS.cobalt} 55%, ${COLORS.rust} 120%)`,
      }}
    >
      <AbsoluteFill style={{ background: SCRIM }} />
    </AbsoluteFill>
  );
};

// ---------- Karaoke captions ----------
const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cap = CAPS.find((c) => t >= c.start && t <= c.end);
  if (!cap) return null;
  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 360, paddingLeft: 70, paddingRight: 70 }}
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
          return (
            <span
              key={i}
              style={{
                color: active ? COLORS.rust : COLORS.white,
                transform: `scale(${active ? 1.06 : 1})`,
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

// ---------- Hook overlay ----------
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
        <div style={{ marginTop: 26, fontFamily: FONT, fontWeight: 700, fontSize: 40, color: COLORS.cream, opacity: 0.85 }}>
          {CTA.sub}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Music bed ducked under the VO for the spoken stretch, lifted at the CTA.
const musicVolume = (f: number, fps: number) => {
  const t = f / fps;
  if (t < 0.5) return interpolate(t, [0, 0.5], [0, 0.22]);
  if (t > CTA.start) return interpolate(t, [CTA.start, CTA.start + 0.6], [0.22, 0.42], { extrapolateRight: "clamp" });
  return 0.22;
};

export const EkaboReel: React.FC = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {ASSETS_READY ? <BrollBed /> : <BrandedBg />}
      {ASSETS_READY && (
        <>
          <Audio src={staticFile(VO_SRC)} />
          <Audio src={staticFile(MUSIC_SRC)} volume={(f) => musicVolume(f, fps)} />
        </>
      )}
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
