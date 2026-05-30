// Domain types for MediaHub Connect.
// These describe the shape of data returned by the (currently stubbed) API layer.

export type DeviceKind = "tv" | "speaker" | "console" | "receiver" | "display";

export interface Device {
  id: string;
  name: string;
  kind: DeviceKind;
  room: string;
  online: boolean;
  /** Current input/source label, e.g. "HDMI 1", "Bluetooth". */
  source: string;
  /** Available sources that can be switched to. */
  sources: string[];
}

export type MediaKind = "movie" | "show" | "music" | "podcast";

export interface MediaItem {
  id: string;
  title: string;
  /** Artist, director, or show creator. */
  creator: string;
  kind: MediaKind;
  genre: string;
  year: number;
  /** Duration in seconds. */
  duration: number;
  /** Tailwind gradient classes used as cover artwork fallback. */
  artwork: string;
  rating?: number;
}

export type PlaybackStatus = "playing" | "paused" | "stopped";

export interface NowPlaying {
  item: MediaItem | null;
  deviceId: string | null;
  status: PlaybackStatus;
  /** Playback position in seconds. */
  position: number;
  /** 0–100. */
  volume: number;
  muted: boolean;
  shuffle: boolean;
  repeat: boolean;
}

/** Commands the remote control can dispatch to the active device. */
export type RemoteCommand =
  | { type: "play" }
  | { type: "pause" }
  | { type: "toggle" }
  | { type: "stop" }
  | { type: "next" }
  | { type: "previous" }
  | { type: "seek"; position: number }
  | { type: "volume"; volume: number }
  | { type: "mute"; muted: boolean }
  | { type: "shuffle"; shuffle: boolean }
  | { type: "repeat"; repeat: boolean }
  | { type: "dpad"; direction: "up" | "down" | "left" | "right" | "ok" | "back" | "home" }
  | { type: "play-item"; itemId: string }
  | { type: "set-device"; deviceId: string }
  | { type: "set-source"; deviceId: string; source: string };
