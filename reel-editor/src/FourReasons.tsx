import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { SLIDES, Slide, ASSETS_READY, COLORS } from "./reasons-data";

// One slide per frame (fps=1). Render each:
//   npx remotion still FourReasons out/reasons/slide-N.png --frame=N
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
      <AbsoluteFill style={{ background: `linear-gradient(145deg, ${COLORS.espresso}, ${COLORS.cobalt} 60%, ${COLORS.rust})` }} />
    )}
    <AbsoluteFill style={{ background: alpha(COLORS.cobalt, 0.14) }} />
    <AbsoluteFill
      style={{
        background: `linear-gradient(to top, ${alpha(COLORS.ink, 0.92)} 0%, ${alpha(COLORS.ink, 0.5)} 34%, ${alpha(
          COLORS.ink,
          0
        )} 62%)`,
      }}
    />
  </>
);

const PagePill: React.FC<{ n: number }> = ({ n }) => (
  <div
    style={{
      position: "absolute",
      top: PAD,
      right: PAD,
      fontFamily: FONT,
      fontWeight: 800,
      fontSize: 27,
      color: COLORS.cream,
      border: `2px solid ${alpha(COLORS.cream, 0.55)}`,
      borderRadius: 100,
      padding: "7px 18px",
      background: alpha(COLORS.ink, 0.28),
    }}
  >
    {n} / {TOTAL}
  </div>
);

const Handle: React.FC = () => (
  <div style={{ position: "absolute", bottom: 54, left: PAD, fontFamily: FONT, fontWeight: 800, fontSize: 26, letterSpacing: 1, color: alpha(COLORS.cream, 0.85) }}>
    @ekabohome
  </div>
);

const Sub: React.FC<{ lines: string[] }> = ({ lines }) => (
  <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 39, lineHeight: 1.24, color: COLORS.cream, textShadow: "0 3px 14px rgba(0,0,0,0.6)" }}>
    {lines.map((l, i) => (
      <div key={i}>{l}</div>
    ))}
  </div>
);

const Cover: React.FC<{ s: Extract<Slide, { type: "cover" }> }> = ({ s }) => (
  <AbsoluteFill style={{ background: COLORS.ink }}>
    <Bg photo={s.photo} />
    <div style={{ position: "absolute", top: PAD, left: PAD, display: "inline-block", background: COLORS.cobalt, color: COLORS.cream, fontFamily: FONT, fontWeight: 800, fontSize: 28, letterSpacing: 3, padding: "11px 24px", borderRadius: 100 }}>
      {s.kicker}
    </div>
    <PagePill n={1} />
    <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 150 }}>
      <div style={{ height: 8, width: 110, background: COLORS.rust, marginBottom: 22 }} />
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 175, lineHeight: 0.9, letterSpacing: -4, color: COLORS.white, textShadow: "0 6px 30px rgba(0,0,0,0.5)" }}>
        {s.big}
      </div>
      <div style={{ marginTop: 24, fontFamily: FONT, fontWeight: 800, fontSize: 46, lineHeight: 1.12, color: COLORS.cream, textShadow: "0 3px 16px rgba(0,0,0,0.6)" }}>
        <div>{s.sub[0]}</div>
        <div>
          {s.sub[1].split(s.emphasis).map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && <span style={{ color: COLORS.rust }}>{s.emphasis}</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", right: PAD, bottom: 52, fontFamily: FONT, fontWeight: 900, fontStyle: "italic", fontSize: 36, color: COLORS.cream }}>SWIPE →</div>
  </AbsoluteFill>
);

const Reason: React.FC<{ s: Extract<Slide, { type: "reason" }>; n: number }> = ({ s, n }) => (
  <AbsoluteFill style={{ background: COLORS.ink }}>
    <Bg photo={s.photo} />
    <PagePill n={n} />
    <div style={{ position: "absolute", left: PAD, right: PAD, bottom: 120 }}>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontStyle: "italic", fontSize: 96, lineHeight: 0.85, letterSpacing: -3, color: COLORS.rust, textShadow: "0 4px 18px rgba(0,0,0,0.5)", marginBottom: 14 }}>
        {s.num}
      </div>
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 82, lineHeight: 0.98, letterSpacing: -2, color: COLORS.white, textShadow: "0 5px 22px rgba(0,0,0,0.55)", marginBottom: 22 }}>
        {s.title.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <Sub lines={s.sub} />
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
      <div style={{ fontFamily: FONT, fontWeight: 900, fontSize: 96, lineHeight: 0.95, letterSpacing: -2, color: COLORS.white, textShadow: "0 5px 22px rgba(0,0,0,0.55)" }}>
        {s.big.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
      <div style={{ marginTop: 22, marginBottom: 34 }}>
        <Sub lines={s.sub} />
      </div>
      <div style={{ display: "inline-block", background: COLORS.rust, color: COLORS.white, fontFamily: FONT, fontWeight: 800, fontSize: 34, padding: "16px 28px", borderRadius: 16, textShadow: "none" }}>
        <span style={{ fontWeight: 900 }}>{s.ctaBold}</span> {s.cta}
      </div>
    </div>
  </AbsoluteFill>
);

export const FourReasons: React.FC = () => {
  const frame = useCurrentFrame();
  const s = SLIDES[Math.min(frame, SLIDES.length - 1)];
  if (s.type === "cover") return <Cover s={s} />;
  if (s.type === "close") return <Close s={s} />;
  return <Reason s={s} n={frame + 1} />;
};
