// Ekabo Home — "Why real estate beats saving" (30s vertical reel)
// Same cult-brand look as AppraisalReel (cobalt / rust / cream editorial).
// This reel is b-roll-driven (no talking head): 5 AI b-roll clips run under an
// AI voiceover + music bed, with karaoke captions, title cards and a CTA endcard.
import { COLORS } from "./reel-data";
export { COLORS };

export const FPS = 30;
export const TOTAL_SECONDS = 30;

// Flip to true once the generated media is present in public/ (see README):
//   public/broll/re_skyline.mp4, re_cash.mp4, re_house.mp4, re_keys.mp4, re_interior.mp4
//   public/ekabo-vo.mp3   (Inworld TTS voiceover, full script)
//   public/ekabo-music.mp3 (Sonilo music bed, ~30s)
// When false the reel still renders (branded background) so the layout is
// verifiable without the heavy assets.
export const ASSETS_READY = false;

export const VO_SRC = "ekabo-vo.mp3";
export const MUSIC_SRC = "ekabo-music.mp3";

// Continuous b-roll bed — 5 clips back to back covering the full 30s.
export type Broll = { start: number; dur: number; src: string };
export const BROLL: Broll[] = [
  { start: 0.0, dur: 6.2, src: "broll/re_skyline.mp4" },
  { start: 6.0, dur: 6.2, src: "broll/re_cash.mp4" },
  { start: 12.0, dur: 6.2, src: "broll/re_house.mp4" },
  { start: 18.0, dur: 6.2, src: "broll/re_keys.mp4" },
  { start: 24.0, dur: 6.2, src: "broll/re_interior.mp4" },
];

// Opening hook overlay (kept over the skyline b-roll).
export const HOOK = {
  start: 0.3,
  end: 4.8,
  kicker: "EKABO HOME",
  headline: ["Saving keeps", "you broke"],
};

// Full-frame title cards (brief beats). rust is reserved for the punchline.
export type TitleCard = {
  start: number;
  dur: number;
  bg: string;
  fg: string;
  lines: string[];
};
export const TITLE_CARDS: TitleCard[] = [
  { start: 7.6, dur: 0.9, bg: COLORS.cream, fg: COLORS.cobalt, lines: ["IT PAYS YOU", "3 WAYS"] },
  { start: 23.4, dur: 1.0, bg: COLORS.rust, fg: COLORS.cream, lines: ["OWN THE", "UMBRELLA"] },
];

// Closing CTA endcard.
export const CTA = {
  start: 25.6,
  kicker: "FOLLOW FOR MORE",
  big: ["Follow", "@ekabohome"],
  sub: "new deals every week",
};

// VO script as timed caption lines (seconds). Word-level karaoke timing is
// generated from this by scripts/build_ekabo_captions.py -> ekabo-captions.json.
export type Line = { start: number; end: number; text: string };
export const SCRIPT: Line[] = [
  { start: 0.4, end: 2.2, text: "Here's the truth nobody tells you." },
  { start: 2.3, end: 4.6, text: "Saving money is just going broke slowly." },
  { start: 4.8, end: 7.5, text: "Every year, inflation quietly eats your cash." },
  { start: 8.6, end: 10.7, text: "Real estate pays you three ways at once." },
  { start: 10.9, end: 12.8, text: "Your tenants cover the mortgage." },
  { start: 13.0, end: 15.0, text: "The property climbs in value." },
  { start: 15.2, end: 17.8, text: "And your equity grows while you sleep." },
  { start: 18.0, end: 20.8, text: "Cash sits still. Real estate goes to work." },
  { start: 21.0, end: 23.2, text: "So stop saving for a rainy day." },
  { start: 24.5, end: 25.5, text: "Start owning the umbrella." },
  { start: 25.9, end: 28.6, text: "Follow Ekabo Home for more." },
];
