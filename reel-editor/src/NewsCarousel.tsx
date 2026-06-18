import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { POSTS, NewsSlide, Bullet, COLORS } from "./news-carousel-data";
import { NewsPhotoCover } from "./NewsPhotoCover";

const FONT = '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';
const PAD = 92;

const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const PagePill: React.FC<{ fg: string; n: number; total: number }> = ({ fg, n, total }) => (
  <div
    style={{
      position: "absolute",
      top: PAD,
      right: PAD,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 28,
      letterSpacing: 1,
      color: fg,
      border: `2px solid ${alpha(fg, 0.5)}`,
      borderRadius: 100,
      padding: "8px 20px",
    }}
  >
    {n} / {total}
  </div>
);

const Wordmark: React.FC<{ fg: string }> = ({ fg }) => (
  <div
    style={{
      position: "absolute",
      top: PAD + 4,
      left: PAD,
      fontFamily: FONT,
      fontWeight: 900,
      fontStyle: "italic",
      fontSize: 30,
      letterSpacing: -0.5,
      color: fg,
    }}
  >
    EKABO HOME
  </div>
);

const Footer: React.FC<{ fg: string }> = ({ fg }) => (
  <div
    style={{
      position: "absolute",
      left: PAD,
      right: PAD,
      bottom: 60,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: 28,
      color: fg,
      borderTop: `2px solid ${alpha(fg, 0.3)}`,
      paddingTop: 20,
    }}
  >
    <span>@ekabohome</span>
    <span style={{ opacity: 0.7 }}>real estate, decoded</span>
  </div>
);

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

const RateIcon: React.FC = () => (
  <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
    <polyline points="10,30 90,80 150,55 290,170" stroke={COLORS.rust} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="290,170 250,150 268,186" fill={COLORS.rust} />
    <text x="6" y="150" fontFamily={FONT} fontWeight={900} fontStyle="italic" fontSize="120" fill={alpha(COLORS.cream, 0.16)}>%</text>
  </svg>
);

const CityIcon: React.FC = () => (
  <svg width="320" height="200" viewBox="0 0 320 200" fill="none">
    {[
      [10, 110], [55, 70], [100, 130], [140, 40], [188, 95], [232, 60], [276, 120],
    ].map(([x, y], i) => (
      <rect key={i} x={x} y={y} width="34" height={190 - y} fill={i % 2 ? COLORS.rust : alpha(COLORS.cream, 0.85)} />
    ))}
    <rect x="0" y="190" width="320" height="8" fill={COLORS.rust} />
  </svg>
);

const Segs: React.FC<{ bullet: Bullet; fg: string; bold: string }> = ({ bullet, fg, bold }) => (
  <>
    {bullet.map((s, i) => (
      <span key={i} style={{ color: s.b ? bold : fg, fontWeight: s.b ? 800 : 500 }}>
        {s.t}
      </span>
    ))}
  </>
);

const Cover: React.FC<{ s: Extract<NewsSlide, { type: "cover" }>; total: number }> = ({ s, total }) => (
  <AbsoluteFill style={{ background: s.bg, padding: PAD, justifyContent: "center" }}>
    <div style={{ position: "absolute", top: PAD, left: PAD }}>
      <Pill bg={COLORS.cream} fg={COLORS.cobalt}>
        {s.kicker}
      </Pill>
    </div>
    <PagePill fg={s.fg} n={1} total={total} />
    <div style={{ position: "absolute", top: 250, right: PAD, opacity: 0.95 }}>
      {s.icon === "rate" ? <RateIcon /> : <CityIcon />}
    </div>
    <div style={{ height: 8, width: 120, background: COLORS.rust, marginBottom: 30 }} />
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontSize: 108,
        lineHeight: 0.98,
        letterSpacing: -3,
        color: s.fg,
      }}
    >
      {s.headline.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
    <div
      style={{
        marginTop: 38,
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 34,
        letterSpacing: 0.5,
        color: COLORS.rust,
        textTransform: "uppercase",
      }}
    >
      {s.source}
    </div>
    <div
      style={{
        position: "absolute",
        right: PAD,
        bottom: 110,
        fontFamily: FONT,
        fontWeight: 900,
        fontStyle: "italic",
        fontSize: 38,
        color: s.fg,
        opacity: 0.9,
      }}
    >
      SWIPE →
    </div>
  </AbsoluteFill>
);

const Points: React.FC<{ s: Extract<NewsSlide, { type: "points" }>; n: number; total: number }> = ({ s, n, total }) => {
  const onCream = s.bg === COLORS.cream;
  const bold = onCream ? COLORS.cobalt : COLORS.white;
  return (
    <AbsoluteFill style={{ background: s.bg, padding: PAD, paddingTop: PAD + 70, justifyContent: "center" }}>
      <Wordmark fg={onCream ? COLORS.cobalt : s.fg} />
      <PagePill fg={s.fg} n={n} total={total} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 86,
          letterSpacing: -2,
          color: s.accent,
          marginBottom: 50,
        }}
      >
        {s.title}
      </div>
      {s.bullets.map((b, i) => (
        <div key={i} style={{ display: "flex", marginBottom: 40, maxWidth: 880 }}>
          <div style={{ color: s.accent, fontSize: 44, fontWeight: 900, lineHeight: 1.15, marginRight: 22 }}>•</div>
          <div style={{ fontFamily: FONT, fontSize: 44, lineHeight: 1.26 }}>
            <Segs bullet={b} fg={s.fg} bold={bold} />
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", right: PAD, bottom: 96, color: s.accent, fontSize: 56, fontWeight: 900 }}>→</div>
      <Footer fg={onCream ? COLORS.cobalt : s.fg} />
    </AbsoluteFill>
  );
};

const Stats: React.FC<{ s: Extract<NewsSlide, { type: "stats" }>; n: number; total: number }> = ({ s, n, total }) => (
  <AbsoluteFill style={{ background: s.bg, padding: PAD, paddingTop: PAD + 70, justifyContent: "center" }}>
    <Wordmark fg={COLORS.cobalt} />
    <PagePill fg={s.fg} n={n} total={total} />
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 900,
        fontStyle: "italic",
        fontSize: 86,
        letterSpacing: -2,
        color: s.accent,
        marginBottom: 48,
      }}
    >
      {s.title}
    </div>
    {s.stats.map((st, i) => (
      <div key={i} style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <div style={{ width: 10, height: 64, background: s.accent }} />
          <div style={{ fontFamily: FONT, fontWeight: 900, fontStyle: "italic", fontSize: 96, letterSpacing: -3, color: COLORS.cobalt }}>
            {st.big}
          </div>
        </div>
        <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 38, lineHeight: 1.2, color: s.fg, marginLeft: 30, maxWidth: 820 }}>
          {st.label}
        </div>
      </div>
    ))}
    <Footer fg={COLORS.cobalt} />
  </AbsoluteFill>
);

const PhotoCta: React.FC<{ s: Extract<NewsSlide, { type: "cta" }>; post: string; total: number }> = ({ s, post, total }) => (
  <AbsoluteFill style={{ background: COLORS.ink }}>
    <Img src={staticFile(`news-photos/post${post}-accent.jpg`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: alpha(COLORS.cobalt, 0.22) }} />
    <AbsoluteFill
      style={{
        background: `linear-gradient(to top, ${alpha(COLORS.ink, 0.95)} 0%, ${alpha(COLORS.ink, 0.7)} 40%, ${alpha(
          COLORS.ink,
          0.18
        )} 72%)`,
      }}
    />
    <div style={{ position: "absolute", top: PAD, left: PAD }}>
      <Pill bg={COLORS.rust} fg={COLORS.cream}>
        {s.kicker}
      </Pill>
    </div>
    <div
      style={{
        position: "absolute",
        top: PAD,
        right: PAD,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 28,
        color: COLORS.cream,
        border: `2px solid ${alpha(COLORS.cream, 0.6)}`,
        borderRadius: 100,
        padding: "8px 20px",
        background: alpha(COLORS.ink, 0.25),
      }}
    >
      {total} / {total}
    </div>
    <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 110 }}>
      <div style={{ height: 8, width: 120, background: COLORS.rust, marginBottom: 24 }} />
      <div
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontStyle: "italic",
          fontSize: 100,
          lineHeight: 0.96,
          letterSpacing: -3,
          color: COLORS.white,
          textShadow: "0 6px 30px rgba(0,0,0,0.5)",
        }}
      >
        {s.title.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div
        style={{
          marginTop: 28,
          fontFamily: FONT,
          fontWeight: 700,
          fontSize: 40,
          lineHeight: 1.22,
          color: COLORS.cream,
          maxWidth: 840,
          marginBottom: 40,
        }}
      >
        {s.body}
      </div>
      <Pill bg={COLORS.cobalt} fg={COLORS.cream} size={38}>
        {s.pill}
      </Pill>
      <div style={{ marginTop: 20, fontFamily: FONT, fontWeight: 700, fontSize: 30, color: COLORS.cream, opacity: 0.92 }}>
        {s.pillSub}
      </div>
    </div>
  </AbsoluteFill>
);

export const NewsCarousel: React.FC<{ post: string }> = ({ post }) => {
  const slides = POSTS[post];
  const frame = useCurrentFrame();
  const s = slides[Math.min(frame, slides.length - 1)];
  const total = slides.length;
  const n = frame + 1;
  if (s.type === "cover") return <NewsPhotoCover post={post} variant="a" />;
  if (s.type === "points") return <Points s={s} n={n} total={total} />;
  if (s.type === "stats") return <Stats s={s} n={n} total={total} />;
  return <PhotoCta s={s} post={post} total={total} />;
};
