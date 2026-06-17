import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { POSTS, COLORS } from "./news-carousel-data";

// Attention-grabbing photo cover, three treatments to compare:
//   variant "a" = editorial full-bleed (photo + bottom scrim + bold headline)
//   variant "b" = cobalt duotone (brand-washed photo, centered headline)
//   variant "c" = magazine split + circular accent badge (echoes the reference)
// Render: npx remotion still NewsPhotoCover out.png --props='{"post":"A","variant":"a"}'
const FONT = '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';
const PAD = 92;

const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const Pill: React.FC<{ bg: string; fg: string; children: React.ReactNode; size?: number }> = ({
  bg,
  fg,
  children,
  size = 28,
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
      padding: "13px 26px",
      borderRadius: 100,
    }}
  >
    {children}
  </div>
);

const PagePill: React.FC<{ fg: string }> = ({ fg }) => (
  <div
    style={{
      position: "absolute",
      top: PAD,
      right: PAD,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 28,
      color: fg,
      border: `2px solid ${alpha(fg, 0.6)}`,
      borderRadius: 100,
      padding: "8px 20px",
      background: alpha("#111111", 0.25),
    }}
  >
    1 / 5
  </div>
);

const Headline: React.FC<{ lines: string[]; color: string; size: number; align?: "left" | "center" }> = ({
  lines,
  color,
  size,
  align = "left",
}) => (
  <div
    style={{
      fontFamily: FONT,
      fontWeight: 900,
      fontSize: size,
      lineHeight: 0.96,
      letterSpacing: -3,
      color,
      textAlign: align,
      textShadow: "0 6px 30px rgba(0,0,0,0.45)",
    }}
  >
    {lines.map((l, i) => (
      <div key={i}>{l}</div>
    ))}
  </div>
);

export const NewsPhotoCover: React.FC<{ post: string; variant: string }> = ({ post, variant }) => {
  const cover = POSTS[post][0] as Extract<(typeof POSTS)[string][number], { type: "cover" }>;
  const photo = staticFile(`news-photos/post${post}-cover.jpg`);
  const accent = staticFile(`news-photos/post${post}-accent.jpg`);

  // ---------------------------------------------------------------- variant A
  if (variant === "a") {
    return (
      <AbsoluteFill style={{ background: COLORS.ink }}>
        <Img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <AbsoluteFill style={{ background: alpha(COLORS.cobalt, 0.18) }} />
        <AbsoluteFill
          style={{
            background: `linear-gradient(to top, ${alpha(COLORS.ink, 0.92)} 0%, ${alpha(
              COLORS.ink,
              0.55
            )} 30%, ${alpha(COLORS.ink, 0)} 58%)`,
          }}
        />
        <div style={{ position: "absolute", top: PAD, left: PAD }}>
          <Pill bg={COLORS.cream} fg={COLORS.cobalt}>
            {cover.kicker}
          </Pill>
        </div>
        <PagePill fg={COLORS.cream} />
        <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 150 }}>
          <div style={{ height: 8, width: 120, background: COLORS.rust, marginBottom: 26 }} />
          <Headline lines={cover.headline} color={COLORS.white} size={106} />
          <div
            style={{
              marginTop: 30,
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: 1,
              color: COLORS.rust,
              textTransform: "uppercase",
            }}
          >
            {cover.source}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: PAD,
            bottom: 60,
            fontFamily: FONT,
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: 34,
            color: COLORS.cream,
          }}
        >
          SWIPE →
        </div>
      </AbsoluteFill>
    );
  }

  // ---------------------------------------------------------------- variant B
  if (variant === "b") {
    return (
      <AbsoluteFill style={{ background: COLORS.cobalt }}>
        <Img
          src={photo}
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.15) brightness(0.85)" }}
        />
        <AbsoluteFill style={{ background: COLORS.cobalt, mixBlendMode: "color" }} />
        <AbsoluteFill style={{ background: alpha(COLORS.cobalt, 0.55) }} />
        <AbsoluteFill
          style={{
            background: `linear-gradient(to top, ${alpha(COLORS.espresso, 0.6)} 0%, ${alpha(
              COLORS.cobalt,
              0
            )} 55%)`,
          }}
        />
        <div style={{ position: "absolute", top: PAD, left: PAD }}>
          <Pill bg={COLORS.rust} fg={COLORS.cream}>
            {cover.kicker}
          </Pill>
        </div>
        <PagePill fg={COLORS.cream} />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: PAD }}>
          <Headline lines={cover.headline} color={COLORS.cream} size={118} align="center" />
          <div
            style={{
              marginTop: 36,
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 32,
              letterSpacing: 2,
              color: COLORS.rust,
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {cover.source}
          </div>
        </AbsoluteFill>
        <div
          style={{
            position: "absolute",
            right: PAD,
            bottom: 60,
            fontFamily: FONT,
            fontWeight: 900,
            fontStyle: "italic",
            fontSize: 34,
            color: COLORS.cream,
          }}
        >
          SWIPE →
        </div>
      </AbsoluteFill>
    );
  }

  // ---------------------------------------------------------------- variant C
  const SPLIT = 0.6;
  return (
    <AbsoluteFill style={{ background: COLORS.cobalt }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: `${SPLIT * 100}%` }}>
        <Img src={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <AbsoluteFill style={{ background: alpha(COLORS.cobalt, 0.12) }} />
        <div style={{ position: "absolute", top: PAD, left: PAD }}>
          <Pill bg={COLORS.cream} fg={COLORS.cobalt}>
            {cover.kicker}
          </Pill>
        </div>
        <PagePill fg={COLORS.cream} />
      </div>
      {/* circular accent badge straddling the seam */}
      <div
        style={{
          position: "absolute",
          top: `${SPLIT * 100}%`,
          right: 110,
          transform: "translateY(-50%)",
          width: 220,
          height: 220,
          borderRadius: "50%",
          border: `8px solid ${COLORS.rust}`,
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        }}
      >
        <Img src={accent} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: `${SPLIT * 100}%`,
          left: 0,
          right: 0,
          bottom: 0,
          background: COLORS.cobalt,
          padding: PAD,
          paddingTop: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ height: 8, width: 120, background: COLORS.rust, marginBottom: 24 }} />
        <Headline lines={cover.headline} color={COLORS.cream} size={92} />
        <div
          style={{
            marginTop: 26,
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: 30,
            letterSpacing: 1,
            color: COLORS.rust,
            textTransform: "uppercase",
          }}
        >
          {cover.source}
        </div>
      </div>
    </AbsoluteFill>
  );
};
