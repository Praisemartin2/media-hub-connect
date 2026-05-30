import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/context/PlayerProvider";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export function NowPlayingBar() {
  const { nowPlaying, command } = usePlayer();

  if (!nowPlaying?.item) {
    return (
      <div className="flex h-20 items-center justify-center border-t border-border bg-card px-4 text-sm text-muted-foreground">
        Nothing playing — pick something from your library.
      </div>
    );
  }

  const { item, status, position, volume, muted } = nowPlaying;
  const isPlaying = status === "playing";

  return (
    <div className="border-t border-border bg-card">
      <div className="flex items-center gap-4 px-4 py-3">
        {/* Track */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className={cn(
              "h-12 w-12 shrink-0 rounded-md bg-gradient-to-br",
              item.artwork,
            )}
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{item.title}</p>
            <p className="truncate text-xs text-muted-foreground">{item.creator}</p>
          </div>
        </div>

        {/* Transport */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous"
              onClick={() => command({ type: "previous" })}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              aria-label={isPlaying ? "Pause" : "Play"}
              className="bg-gradient-brand text-white hover:opacity-90"
              onClick={() => command({ type: "toggle" })}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next"
              onClick={() => command({ type: "next" })}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="w-10 text-right text-[11px] tabular-nums text-muted-foreground">
              {formatTime(position)}
            </span>
            <Slider
              className="w-48 lg:w-72"
              value={[Math.min(position, item.duration)]}
              max={item.duration}
              step={1}
              aria-label="Seek"
              onValueChange={([v]) => command({ type: "seek", position: v })}
            />
            <span className="w-10 text-[11px] tabular-nums text-muted-foreground">
              {formatTime(item.duration)}
            </span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden flex-1 items-center justify-end gap-2 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => command({ type: "mute", muted: !muted })}
          >
            {muted || volume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          <Slider
            className="w-28"
            value={[muted ? 0 : volume]}
            max={100}
            step={1}
            aria-label="Volume"
            onValueChange={([v]) => command({ type: "volume", volume: v })}
          />
        </div>
      </div>
    </div>
  );
}
