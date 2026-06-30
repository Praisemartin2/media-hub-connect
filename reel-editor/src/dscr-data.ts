// "DSCR loans" reel — overlays our cult-brand style on the user's already-edited
// footage (which already has Higgsfield b-roll). We DON'T re-grade or add b-roll,
// just: rust karaoke captions + cobalt/cream title cards + CTA. 1080x1920.
// Title-card timings are FRACTIONS of total duration (auto-fit any length).
import { COLORS } from "./reel-data";
export { COLORS };

export const FPS = 30;
export const SRC = "source/source_full.mp4"; // 1080x1920, 30fps, 70.71s talking-head A-roll
export const DURATION_SECONDS = 70.71;
export const ASSETS_READY = true;

export const HOOK = {
  start: 0.3,
  end: 4.8,
  kicker: "INVESTOR FINANCING",
  headline: ["No W-2?", "No problem"],
};

export type TitleCard = { atFrac: number; dur: number; bg: string; fg: string; lines: string[] };
export const TITLE_CARDS: TitleCard[] = [
  { atFrac: 0.04, dur: 0.9, bg: COLORS.cream, fg: COLORS.cobalt, lines: ["FORGET", "YOUR W-2"] },
  { atFrac: 0.311, dur: 0.9, bg: COLORS.cobalt, fg: COLORS.cream, lines: ["1.2x", "COVERAGE"] },
  { atFrac: 0.685, dur: 0.9, bg: COLORS.cream, fg: COLORS.cobalt, lines: ["CREDIT", "680+"] },
  { atFrac: 0.864, dur: 1.0, bg: COLORS.rust, fg: COLORS.cream, lines: ["AS LOW AS", "15% DOWN"] },
];

export const CTA = {
  startFrac: 0.94,
  kicker: "BUY & HOLD?",
  big: ["DM us", "‘DSCR’"],
  sub: "Ekabo Home Team · @ekabohome",
};

// B-roll punch-ins (repo real-estate clips; swap for Higgsfield once allowlisted).
export type Broll = { atFrac: number; dur: number; src: string };
export const BROLL: Broll[] = [
  { atFrac: 0.13, dur: 1.8, src: "broll/dscr_property.mp4" }, // income the property brings in
  { atFrac: 0.4, dur: 1.8, src: "broll/dscr_income.mp4" },    // cover the mortgage / reserves
  { atFrac: 0.62, dur: 1.8, src: "broll/dscr_loan.mp4" },     // DSCR loans / terms / credit
  { atFrac: 0.82, dur: 1.8, src: "broll/dscr_keys.mp4" },     // type of property / closing
];
