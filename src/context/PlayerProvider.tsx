import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { mediaHubApi } from "@/api/mediaHubApi";
import type { NowPlaying, RemoteCommand } from "@/types/media";

// Live playback state. Seeds from the API, then keeps an authoritative local
// copy that ticks the position forward while playing. All control surfaces
// (remote, now-playing bar, media cards) dispatch through `command`.

interface PlayerContextValue {
  nowPlaying: NowPlaying | null;
  /** True until the initial NowPlaying state has loaded. */
  loading: boolean;
  command: (command: RemoteCommand) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    mediaHubApi.getNowPlaying().then((state) => {
      if (!active) return;
      setNowPlaying(state);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  // Advance playback position once per second while playing.
  useEffect(() => {
    if (nowPlaying?.status !== "playing" || !nowPlaying.item) return;
    const id = window.setInterval(() => {
      setNowPlaying((prev) => {
        if (!prev || !prev.item || prev.status !== "playing") return prev;
        if (prev.position >= prev.item.duration) {
          return { ...prev, position: prev.item.duration, status: "paused" };
        }
        return { ...prev, position: prev.position + 1 };
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [nowPlaying?.status, nowPlaying?.item?.id]);

  // Avoid the optimistic position being overwritten by a slightly stale
  // server echo for seek-sensitive commands.
  const inflight = useRef(0);

  const command = useCallback(async (cmd: RemoteCommand) => {
    inflight.current += 1;
    const result = await mediaHubApi.sendCommand(cmd);
    inflight.current -= 1;
    setNowPlaying(result);
  }, []);

  return (
    <PlayerContext.Provider value={{ nowPlaying, loading, command }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer(): PlayerContextValue {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}
