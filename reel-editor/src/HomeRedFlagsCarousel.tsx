import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SLIDES, Slide, COLORS } from "./carousel-data";

// One composition, one slide per frame (fps=1). Render each page with:
//   npx remotion still HomeRedFlagsCarousel out/slide-N.png --frame=N
const FONT = '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';
const PAD = 96;

const withAlpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
};

const Footer: React.FC<{ fg: string; page: number }> = ({ fg, page }) => (
  <div
    style={{
      position: "absolute",
      left: PAD,
      right: PAD,
      bottom: 64,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 30,
      letterSpacing: 1,
      color: fg,
      borderTop: `2px solid ${withAlpha(fg, 0.35)}`,
      paddingTop: 22,
    }}
  >
    <span>@ekabohome</span>
    <span style={{ opacity: 0.8 }}>{page} / 7</span>
  </div>
);

const Pill: React.FC<{ bg: string; fg: string; children: React.ReactNode; size?: number }> = ({
  bg,
  fg,
  children,
  size = 30,
}) => (
  <div
    style={{
      display: "inline-block",
      background: bg,
      color: fg,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: size,
      letterSpacing: 3,
      padding: "14px 28px",
      borderRadius: 100,
    }}
  >
    {children}
  </div>
);

const Title: React.FC<{ lines: string[]; color: string; size: number }> = ({ lines, color, size }) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontStyle: "italic",
      fontSize: size,
      lineHeight: 0.96,
      letterSpacing: -2,
      color,
    }}
  >
    {lines.map((l, i) => (
      <div key={i}>{l}</div>
    ))}
  </div>
);

const Cover: React.FC<{ s: Extract<Slide, { type: "cover" }> }> = ({ s }) => (
  <AbsoluteFill style={{ background: s.bg, padding: PAD, justifyContent: "center" }}>
    <div style={{ position: "absolute", top: PAD, left: PAD }}>
      <Pill bg={COLORS.cream} fg={COLORS.cobalt}>
        {s.kicker}
      </Pill>
    </div>
    <div style={{ height: 8, width: 120, background: COLORS.rust, marginBottom: 34 }} />
    <Title lines={s.title} color={s.fg} size={130} />
    <div
      style={{
        marginTop: 40,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 46,
        lineHeight: 1.18,
        color: s.fg,
        maxWidth: 760,
      }}
    >
      {s.sub}
    </div>
    <div
      style={{
        marginTop: 30,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: 1,
        color: COLORS.rust,
        textTransform: "uppercase",
      }}
    >
      {s.tag}
    </div>
    <div
      style={{
        position: "absolute",
        right: PAD,
        bottom: 150,
        fontFamily: FONT,
        fontWeight: 900,
        fontStyle: "italic",
        fontSize: 40,
        color: s.fg,
        opacity: 0.9,
      }}
    >
      SWIPE →
    </div>
    <Footer fg={s.fg} page={1} />
  </AbsoluteFill>
);

const Flag: React.FC<{ s: Extract<Slide, { type: "flag" }>; page: number }> = ({ s, page }) => (
  <AbsoluteFill style={{ background: s.bg, padding: PAD, justifyContent: "center" }}>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontStyle: "italic",
        fontSize: 230,
        lineHeight: 0.8,
        letterSpacing: -6,
        color: s.accent,
        marginBottom: 18,
      }}
    >
      {s.num}
    </div>
    <Title lines={s.title} color={s.fg} size={104} />
    <div
      style={{
        marginTop: 36,
        fontFamily: FONT,
        fontWeight: 500,
        fontSize: 44,
        lineHeight: 1.28,
        color: s.fg,
        maxWidth: 840,
      }}
    >
      {s.body}
    </div>
    <div style={{ height: 4, width: 96, background: s.accent, margin: "44px 0 26px" }} />
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 24,
        letterSpacing: 3,
        color: s.accent,
        marginBottom: 12,
      }}
    >
      WHAT THE AGENT SEES
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 40,
        lineHeight: 1.24,
        color: s.fg,
        maxWidth: 840,
      }}
    >
      {s.tell}
    </div>
    <Footer fg={s.fg} page={page} />
  </AbsoluteFill>
);

const Cta: React.FC<{ s: Extract<Slide, { type: "cta" }> }> = ({ s }) => (
  <AbsoluteFill style={{ background: s.bg, padding: PAD, justifyContent: "center" }}>
    <div style={{ position: "absolute", top: PAD, left: PAD }}>
      <Pill bg={s.fg} fg={s.bg}>
        {s.kicker}
      </Pill>
    </div>
    <Title lines={s.title} color={s.fg} size={120} />
    <div
      style={{
        marginTop: 36,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 46,
        lineHeight: 1.2,
        color: s.fg,
        maxWidth: 800,
        marginBottom: 56,
      }}
    >
      {s.sub}
    </div>
    <Pill bg={COLORS.cobalt} fg={COLORS.cream} size={40}>
      {s.pill}
    </Pill>
    <div
      style={{
        marginTop: 24,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 32,
        color: s.fg,
        opacity: 0.92,
      }}
    >
      {s.pillSub}
    </div>
    <Footer fg={s.fg} page={7} />
  </AbsoluteFill>
);

export const HomeRedFlagsCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const s = SLIDES[Math.min(frame, SLIDES.length - 1)];
  if (s.type === "cover") return <Cover s={s} />;
  if (s.type === "cta") return <Cta s={s} />;
  return <Flag s={s} page={frame + 1} />;
};
