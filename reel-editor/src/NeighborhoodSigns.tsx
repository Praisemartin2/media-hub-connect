import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { SLIDES, Slide, ASSETS_READY, COLORS } from "./signs-data";

// One slide per frame (fps=1):
//   npx remotion still NeighborhoodSigns out/signs/slide-N.png --frame=N
const FONT = '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';
const PAD = 84;
const TOTAL = SLIDES.length;

const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

const Bg: React.FC<{ photo: string }> = ({ photo }) => (
  <>
    {ASSETS_READY ? (
      <Img src={staticFile(photo)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    ) : (
      <AbsoluteFill style={{ background: `linear-gradient(150deg, ${COLORS.espresso}, ${COLORS.cobalt} 60%, ${COLORS.rust})` }} />
    )}
    <AbsoluteFill style={{ background: alpha(COLORS.cobalt, 0.12) }} />
    <AbsoluteFill style={{ background: `linear-gradient(to top, ${alpha(COLORS.ink, 0.93)} 0%, ${alpha(COLORS.ink, 0.45)} 36%, ${alpha(COLORS.ink, 0)} 64%)` }} />
  </>
);

const PagePill: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ position: "absolute", top: PAD, right: PAD, fontFamily: FONT, fontWeight: 800, fontSize: 27, color: COLORS.cream, border: `2px solid ${alpha(COLORS.cream, 0.55)}`, borderRadius: 100, padding: "7px 18px", background: alpha(COLORS.ink, 0.28) }}>
    {n} / {TOTAL}
  </div>
);

const Handle: React.FC = () => (
  <div style={{ position: "absolute", bottom: 52, right: PAD, fontFamily: FONT, fontWeight: 800, fontSize: 25, letterSpacing: 1, color: alpha(COLORS.cream, 0.8) }}>@ekabohome</div>
);

const Cover: React.FC<{ s: Extract<Slide, { type: "cover" }> }> = ({ s }) => (
  <AbsoluteFill style={{ background: COLORS.ink }}>
    <Bg photo={s.photo} />
    <div style={{ position: "absolute", top: PAD, left: PAD, display: "inline-block", background: COLORS.cobalt, color: COLORS.cream, fontFamily: FONT, fontWeight: 800, fontSize: 24, letterSpacing: 2, padding: "11px 22px", borderRadius: 100 }}>
      {s.kicker}
    </div>
    <PagePill n={1} />
    <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 150 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 22, marginBottom: 8 }}>
        <span style={{ fontFamily: FONT, fontWeight: 900, fontStyle: "italic", fontSize: 240, lineHeight: 0.8, color: COLORS.rust, textShadow: "0 6px 30px rgba(0,0,0,0.5)" }}>5</span>
        <span style={{ fontFamily: FONT, fontWeight: 900, fontSize: 130, letterSpacing: -3, color: COLORS.white, textShadow: "0 6px 30px rgba(0,0,0,0.5)" }}>SIGNS</span>
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 58, lineHeight: 1.02, color: COLORS.cream, textShadow: "0 4px 18px rgba(0,0,0,0.6)" }}>
        {s.sub.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div style={{ marginTop: 22, fontFamily: FONT, fontWeight: 700, fontSize: 32, letterSpacing: 0.5, color: COLORS.rust, textTransform: "uppercase" }}>{s.tag}</div>
    </div>
    <div style={{ position: "absolute", right: PAD, bottom: 52, fontFamily: FONT, fontWeight: 900, fontStyle: "italic", fontSize: 36, color: COLORS.cream }}>SWIPE →</div>
  </AbsoluteFill>
);

const Sign: React.FC<{ s: Extract<Slide, { type: "sign" }>; n: number }> = ({ s, n }) => (
  <AbsoluteFill style={{ background: COLORS.ink }}>
    <Bg photo={s.photo} />
    <div style={{ position: "absolute", top: PAD, left: PAD, display: "inline-block", background: COLORS.rust, color: COLORS.white, fontFamily: FONT, fontWeight: 900, fontSize: 30, letterSpacing: 4, padding: "12px 26px", borderRadius: 100 }}>
      {s.tag}
    </div>
    <PagePill n={n} />
    <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 120 }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 88, lineHeight: 0.97, letterSpacing: -2, color: COLORS.white, textShadow: "0 5px 22px rgba(0,0,0,0.55)", marginBottom: 20 }}>
        {s.title.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 38, lineHeight: 1.26, color: COLORS.cream, textShadow: "0 3px 14px rgba(0,0,0,0.6)", marginBottom: 20, maxWidth: 900 }}>
        {s.body}
      </div>
      <div style={{ display: "inline-block", fontFamily: FONT, fontWeight: 800, fontSize: 33, color: COLORS.rust, textShadow: "0 3px 12px rgba(0,0,0,0.6)" }}>
        ✓ {s.spot}
      </div>
    </div>
    <Handle />
  </AbsoluteFill>
);

const Close: React.FC<{ s: Extract<Slide, { type: "close" }> }> = ({ s }) => (
  <AbsoluteFill style={{ background: COLORS.ink }}>
    <Bg photo={s.photo} />
    <PagePill n={TOTAL} />
    <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 140 }}>
      <div style={{ height: 8, width: 110, background: COLORS.rust, marginBottom: 22 }} />
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 100, lineHeight: 0.95, letterSpacing: -2, color: COLORS.white, textShadow: "0 5px 22px rgba(0,0,0,0.55)" }}>
        {s.big.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div style={{ marginTop: 22, marginBottom: 34, fontFamily: FONT, fontWeight: 600, fontSize: 39, lineHeight: 1.24, color: COLORS.cream, textShadow: "0 3px 14px rgba(0,0,0,0.6)" }}>
        {s.sub.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div style={{ display: "inline-block", background: COLORS.rust, color: COLORS.white, fontFamily: FONT, fontWeight: 800, fontSize: 34, padding: "16px 28px", borderRadius: 16 }}>
        <span style={{ fontWeight: 900 }}>{s.ctaBold}</span> {s.cta}
      </div>
    </div>
  </AbsoluteFill>
);

export const NeighborhoodSigns: React.FC = () => {
  const frame = useCurrentFrame();
  const s = SLIDES[Math.min(frame, SLIDES.length - 1)];
  if (s.type === "cover") return <Cover s={s} />;
  if (s.type === "close") return <Close s={s} />;
  return <Sign s={s} n={frame + 1} />;
};
