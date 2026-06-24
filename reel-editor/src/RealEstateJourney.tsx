import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./reel-data";

// "The real estate investing journey" — journey line-graph infographic
// (1080x1350, IG 4:5), Ekabo cult-brand: deep near-black + rust line + cream.
// Modeled on the reference: slow start, first-deal spike, a setback crash,
// then a steady climb to generational wealth.
const FONT = '"Helvetica Neue", Helvetica, "Arial Black", Arial, sans-serif';
const BG = "#15110E"; // warm near-black (espresso-tinted)

type Node = {
  x: number;
  y: number;
  lines: string[];
  pos: "above" | "below";
  align: "left" | "center" | "right";
  dx?: number;
};

// height 0..1 (bottom..top) of the arc at each step
const HEIGHTS = [0.12, 0.22, 0.72, 0.16, 0.4, 0.48, 0.58, 0.7, 0.86];
const LABELS: { lines: string[]; pos: "above" | "below"; align: "left" | "center" | "right"; dx?: number }[] = [
  { lines: ["Deciding", "to start"], pos: "below", align: "left", dx: 40 },
  { lines: ["Learning the", "strategies"], pos: "above", align: "left", dx: -60 },
  { lines: ["First deal", "closes"], pos: "above", align: "center" },
  { lines: ["A deal", "falls through"], pos: "below", align: "center" },
  { lines: ["Trying", "again"], pos: "above", align: "center" },
  { lines: ["Analyzing", "every deal"], pos: "below", align: "center" },
  { lines: ["Building", "your team"], pos: "below", align: "center" },
  { lines: ["Becoming a", "pro investor"], pos: "above", align: "center" },
  { lines: ["Generational", "wealth"], pos: "above", align: "right", dx: -40 },
];

const X0 = 92;
const X1 = 988;
const Y_BOTTOM = 1150;
const Y_RANGE = 620;
const W = 1080;
const H = 1350;

const nodes: Node[] = HEIGHTS.map((h, i) => ({
  x: Math.round(X0 + (i * (X1 - X0)) / (HEIGHTS.length - 1)),
  y: Math.round(Y_BOTTOM - h * Y_RANGE),
  ...LABELS[i],
}));

const Label: React.FC<{ n: Node }> = ({ n }) => {
  const boxW = 260;
  const lineH = 40;
  const blockH = n.lines.length * lineH;
  const top = n.pos === "above" ? n.y - 34 - blockH : n.y + 28;
  let left = n.x - boxW / 2 + (n.dx ?? 0);
  left = Math.max(16, Math.min(left, W - 16 - boxW));
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: boxW,
        textAlign: n.align,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 31,
        lineHeight: 1.12,
        letterSpacing: 0.3,
        color: COLORS.cream,
      }}
    >
      {n.lines.map((l, i) => (
        <div key={i}>{l}</div>
      ))}
    </div>
  );
};

export const RealEstateJourney: React.FC = () => {
  const linePts = `0,${nodes[0].y} ` + nodes.map((n) => `${n.x},${n.y}`).join(" ");
  return (
    <AbsoluteFill style={{ background: BG }}>
      {/* subtle warm vignette + glow */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 80% at 50% 8%, ${alpha("#3A2412", 0.55)} 0%, ${alpha("#3A2412", 0)} 55%)`,
        }}
      />
      <AbsoluteFill style={{ boxShadow: "inset 0 0 360px rgba(0,0,0,0.7)" }} />

      {/* top rule */}
      <div style={{ position: "absolute", top: 60, left: 70, right: 70, height: 3, background: COLORS.rust, opacity: 0.9 }} />

      {/* kicker + headline */}
      <div
        style={{
          position: "absolute",
          top: 92,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: 7,
          color: COLORS.rust,
        }}
      >
        THE REAL ESTATE INVESTING JOURNEY
      </div>
      <div
        style={{
          position: "absolute",
          top: 142,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 116,
          lineHeight: 0.92,
          letterSpacing: -2,
          color: COLORS.cream,
          transform: "scaleX(0.92)",
        }}
      >
        <div>BUILDING WEALTH</div>
        <div>TAKES TIME</div>
      </div>

      {/* line + nodes */}
      <svg width={W} height={H} style={{ position: "absolute", left: 0, top: 0 }}>
        <polyline points={linePts} fill="none" stroke={COLORS.rust} strokeWidth={7} strokeLinejoin="round" strokeLinecap="round" />
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={16} fill={COLORS.rust} />
            <circle cx={n.x} cy={n.y} r={8} fill={BG} />
            <circle cx={n.x} cy={n.y} r={3.5} fill={COLORS.rust} />
          </g>
        ))}
      </svg>

      {/* labels */}
      {nodes.map((n, i) => (
        <Label key={i} n={n} />
      ))}

      {/* footer wordmark */}
      <div
        style={{
          position: "absolute",
          bottom: 46,
          left: 0,
          right: 0,
          textAlign: "center",
          fontFamily: FONT,
          fontWeight: 800,
          fontSize: 26,
          letterSpacing: 2,
          color: alpha(COLORS.cream, 0.75),
        }}
      >
        @ekabohome
      </div>
    </AbsoluteFill>
  );
};

function alpha(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}
