// "Subject-to financing" talking-head reel — cult-brand style (same as
// AppraisalReel): warm-graded A-roll + karaoke captions + cobalt/cream title
// cards + b-roll punch-ins + CTA. 1080x1920, 30fps.
//
// Timings for title cards / CTA / b-roll are FRACTIONS of the total duration so
// they auto-fit whatever the real clip length is. Finalize in the egress-enabled
// session: download source.mp4, ffprobe its duration -> set DURATION_SECONDS,
// run scripts/build_subjectto_captions.py, set ASSETS_READY = true, render.
import { COLORS } from "./reel-data";
export { COLORS };

export const FPS = 30;
export const SRC = "source/source.mp4";

// Placeholder until ffprobe in the fresh session. Set to the real A-roll length
// (after silence-cut) and re-render.
export const DURATION_SECONDS = 60;

// Flip true once public/source/source.mp4 exists. When false the reel renders on
// a branded background so the layout is verifiable without the footage.
export const ASSETS_READY = false;

// Opening hook (absolute seconds — always near the start).
export const HOOK = {
  start: 0.3,
  end: 5.0,
  kicker: "CREATIVE FINANCE",
  headline: ["The deal the", "bank never", "saw"],
};

// Full-frame title cards at the story's turning points. `atFrac` = fraction of
// total duration. Alternate cobalt <-> cream; rust reserved for the punchline.
export type TitleCard = { atFrac: number; dur: number; bg: string; fg: string; lines: string[] };
export const TITLE_CARDS: TitleCard[] = [
  { atFrac: 0.1, dur: 0.9, bg: COLORS.cream, fg: COLORS.cobalt, lines: ["WHAT IS", "SUBJECT-TO?"] },
  { atFrac: 0.34, dur: 0.9, bg: COLORS.cobalt, fg: COLORS.cream, lines: ["MY FIRST", "DEAL · 2024"] },
  { atFrac: 0.55, dur: 0.9, bg: COLORS.cobalt, fg: COLORS.cream, lines: ["THE MARKET", "TURNED"] },
  { atFrac: 0.72, dur: 0.9, bg: COLORS.cream, fg: COLORS.cobalt, lines: ["A C+", "NEIGHBORHOOD"] },
  { atFrac: 0.86, dur: 1.0, bg: COLORS.rust, fg: COLORS.cream, lines: ["BASICALLY", "BREAK-EVEN"] },
];

// Closing CTA card.
export const CTA = {
  startFrac: 0.93,
  kicker: "WANT THE PLAYBOOK?",
  big: ["DM me", "‘SUBJECT’"],
  sub: "or tap the link in my bio",
};

// B-roll punch-ins (keyword-synced). atFrac = fraction of total duration; dur in
// seconds. Uses clips already in public/broll/.
export type Broll = { atFrac: number; dur: number; src: string };
export const BROLL: Broll[] = [
  { atFrac: 0.07, dur: 1.6, src: "broll/quadplex.mp4" },   // "a significant loan on the property"
  { atFrac: 0.4, dur: 1.6, src: "broll/clock.mp4" },       // "the market turned ... interest rates so high"
  { atFrac: 0.78, dur: 1.6, src: "broll/contract.mp4" },   // "20% management fee ... break even"
];
