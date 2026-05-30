import type { Device, MediaItem, NowPlaying, RemoteCommand } from "@/types/media";
import { seedDevices, seedLibrary } from "./mockData";

/**
 * Stubbed MediaHub API client.
 *
 * Every method returns a Promise and simulates network latency so the UI behaves
 * exactly as it would against a real backend. To go live, replace the bodies of
 * these methods with `fetch`/websocket calls — the signatures and the returned
 * types are the contract the rest of the app depends on.
 */

const LATENCY_MS = 220;

function delay<T>(value: T, ms = LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// --- In-memory state (stand-in for server state) ---------------------------

let devices: Device[] = structuredClone(seedDevices);
const library: MediaItem[] = structuredClone(seedLibrary);

const nowPlaying: NowPlaying = {
  item: library[0],
  deviceId: "dev-living-tv",
  status: "paused",
  position: 1240,
  volume: 42,
  muted: false,
  shuffle: false,
  repeat: false,
};

function findItem(id: string): MediaItem | undefined {
  return library.find((m) => m.id === id);
}

function clampVolume(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

// --- Public API ------------------------------------------------------------

export const mediaHubApi = {
  getDevices(): Promise<Device[]> {
    return delay(structuredClone(devices));
  },

  getLibrary(): Promise<MediaItem[]> {
    return delay(structuredClone(library));
  },

  getNowPlaying(): Promise<NowPlaying> {
    return delay(structuredClone(nowPlaying));
  },

  /**
   * Dispatch a remote command to the active device and return the resulting
   * NowPlaying state. Mirrors a typical "command + state echo" backend.
   */
  sendCommand(command: RemoteCommand): Promise<NowPlaying> {
    switch (command.type) {
      case "play":
        nowPlaying.status = "playing";
        break;
      case "pause":
        nowPlaying.status = "paused";
        break;
      case "toggle":
        nowPlaying.status = nowPlaying.status === "playing" ? "paused" : "playing";
        break;
      case "stop":
        nowPlaying.status = "stopped";
        nowPlaying.position = 0;
        break;
      case "seek":
        nowPlaying.position = Math.max(0, command.position);
        break;
      case "volume":
        nowPlaying.volume = clampVolume(command.volume);
        nowPlaying.muted = false;
        break;
      case "mute":
        nowPlaying.muted = command.muted;
        break;
      case "shuffle":
        nowPlaying.shuffle = command.shuffle;
        break;
      case "repeat":
        nowPlaying.repeat = command.repeat;
        break;
      case "next":
      case "previous": {
        if (nowPlaying.item) {
          const idx = library.findIndex((m) => m.id === nowPlaying.item!.id);
          const step = command.type === "next" ? 1 : -1;
          const nextIdx = (idx + step + library.length) % library.length;
          nowPlaying.item = library[nextIdx];
          nowPlaying.position = 0;
          nowPlaying.status = "playing";
        }
        break;
      }
      case "play-item": {
        const item = findItem(command.itemId);
        if (item) {
          nowPlaying.item = item;
          nowPlaying.position = 0;
          nowPlaying.status = "playing";
        }
        break;
      }
      case "set-device":
        nowPlaying.deviceId = command.deviceId;
        break;
      case "set-source":
        devices = devices.map((d) =>
          d.id === command.deviceId ? { ...d, source: command.source } : d,
        );
        break;
      case "dpad":
        // Navigation is a no-op against the stub but accepted for parity.
        break;
    }

    return delay(structuredClone(nowPlaying), 90);
  },

  /** Toggle a device's online/standby state. */
  setDevicePower(deviceId: string, online: boolean): Promise<Device[]> {
    devices = devices.map((d) => (d.id === deviceId ? { ...d, online } : d));
    return delay(structuredClone(devices));
  },
};
