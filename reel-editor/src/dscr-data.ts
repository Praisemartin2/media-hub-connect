// "DSCR loans" reel — overlays our cult-brand style on the user's already-edited
// footage (which already has Higgsfield b-roll). We DON'T re-grade or add b-roll,
// just: rust karaoke captions + cobalt/cream title cards + CTA. 1080x1920.
// Title-card timings are FRACTIONS of total duration (auto-fit any length).
import { COLORS } from "./reel-data";
export { COLORS };

export const FPS = 30;
export const SRC = "source/source_full.mp4"; // full-quality original from fetch_drive_video.sh
export const DURATION_SECONDS = 80; // placeholder; set from ffprobe in the fresh session
export const ASSETS_READY = false;  // flip true once source_full.mp4 is present

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
