import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Undo2,
  Power,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Plus,
  Minus,
  Shuffle,
  Repeat,
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlayer } from "@/context/PlayerProvider";
import { useDevices, useSetDevicePower } from "@/hooks/useMediaHub";
import { cn } from "@/lib/utils";
import type { RemoteCommand } from "@/types/media";

export function RemoteControl() {
  const { nowPlaying, command } = usePlayer();
  const { data: devices = [] } = useDevices();
  const setPower = useSetDevicePower();

  const activeDevice = devices.find((d) => d.id === nowPlaying?.deviceId) ?? null;
  const isPlaying = nowPlaying?.status === "playing";
  const volume = nowPlaying?.volume ?? 0;
  const muted = nowPlaying?.muted ?? false;

  const send = (cmd: RemoteCommand) => command(cmd);
  const nudgeVolume = (delta: number) => send({ type: "volume", volume: volume + delta });

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-border bg-card p-6 shadow-glow">
      {/* Header: target device + power */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Controlling
          </p>
          <Select
            value={nowPlaying?.deviceId ?? undefined}
            onValueChange={(deviceId) => send({ type: "set-device", deviceId })}
          >
            <SelectTrigger className="h-8 border-0 bg-transparent px-0 text-base font-semibold focus:ring-0">
              <SelectValue placeholder="Select a device" />
            </SelectTrigger>
            <SelectContent>
              {devices.map((d) => (
                <SelectItem key={d.id} value={d.id} disabled={!d.online}>
                  {d.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="icon"
          aria-label="Toggle power"
          className={cn(
            "rounded-full",
            activeDevice?.online && "border-accent/50 text-accent",
          )}
          disabled={!activeDevice}
          onClick={() =>
            activeDevice &&
            setPower.mutate({ deviceId: activeDevice.id, online: !activeDevice.online })
          }
        >
          <Power className="h-4 w-4" />
        </Button>
      </div>

      {/* Source selector */}
      {activeDevice && (
        <div className="mb-6">
          <Select
            value={activeDevice.source}
            disabled={!activeDevice.online}
            onValueChange={(source) =>
              send({ type: "set-source", deviceId: activeDevice.id, source })
            }
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {activeDevice.sources.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* D-pad */}
      <div className="relative mx-auto mb-6 aspect-square w-56">
        <div className="absolute inset-0 rounded-full border border-border bg-secondary/40" />
        <DpadButton
          className="left-1/2 top-2 -translate-x-1/2"
          label="Up"
          onClick={() => send({ type: "dpad", direction: "up" })}
        >
          <ChevronUp className="h-5 w-5" />
        </DpadButton>
        <DpadButton
          className="bottom-2 left-1/2 -translate-x-1/2"
          label="Down"
          onClick={() => send({ type: "dpad", direction: "down" })}
        >
          <ChevronDown className="h-5 w-5" />
        </DpadButton>
        <DpadButton
          className="left-2 top-1/2 -translate-y-1/2"
          label="Left"
          onClick={() => send({ type: "dpad", direction: "left" })}
        >
          <ChevronLeft className="h-5 w-5" />
        </DpadButton>
        <DpadButton
          className="right-2 top-1/2 -translate-y-1/2"
          label="Right"
          onClick={() => send({ type: "dpad", direction: "right" })}
        >
          <ChevronRight className="h-5 w-5" />
        </DpadButton>
        <button
          type="button"
          aria-label="OK"
          onClick={() => send({ type: "dpad", direction: "ok" })}
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-brand text-sm font-semibold text-white shadow-glow transition-transform active:scale-95"
        >
          OK
        </button>
      </div>

      {/* Back / Home */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => send({ type: "dpad", direction: "back" })}>
          <Undo2 className="h-4 w-4" />
          Back
        </Button>
        <Button variant="secondary" onClick={() => send({ type: "dpad", direction: "home" })}>
          <Home className="h-4 w-4" />
          Home
        </Button>
      </div>

      {/* Transport */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Previous"
          onClick={() => send({ type: "previous" })}
        >
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          aria-label={isPlaying ? "Pause" : "Play"}
          className="h-14 w-14 rounded-full bg-gradient-brand text-white hover:opacity-90"
          onClick={() => send({ type: "toggle" })}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Next"
          onClick={() => send({ type: "next" })}
        >
          <SkipForward className="h-5 w-5" />
        </Button>
      </div>

      {/* Modes */}
      <div className="mb-6 flex items-center justify-center gap-2">
        <Button
          variant={nowPlaying?.shuffle ? "secondary" : "ghost"}
          size="sm"
          aria-pressed={nowPlaying?.shuffle}
          onClick={() => send({ type: "shuffle", shuffle: !nowPlaying?.shuffle })}
        >
          <Shuffle className={cn("h-4 w-4", nowPlaying?.shuffle && "text-accent")} />
          Shuffle
        </Button>
        <Button
          variant={nowPlaying?.repeat ? "secondary" : "ghost"}
          size="sm"
          aria-pressed={nowPlaying?.repeat}
          onClick={() => send({ type: "repeat", repeat: !nowPlaying?.repeat })}
        >
          <Repeat className={cn("h-4 w-4", nowPlaying?.repeat && "text-accent")} />
          Repeat
        </Button>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-between gap-2 rounded-full border border-border bg-secondary/40 p-1.5">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Volume down"
          className="rounded-full"
          onClick={() => nudgeVolume(-5)}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label={muted ? "Unmute" : "Mute"}
          className="rounded-full"
          onClick={() => send({ type: "mute", muted: !muted })}
        >
          {muted || volume === 0 ? (
            <VolumeX className="h-4 w-4 text-destructive" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
        <span className="min-w-10 text-center text-sm font-medium tabular-nums">
          {muted ? "—" : volume}
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Volume up"
          className="rounded-full"
          onClick={() => nudgeVolume(5)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function DpadButton({
  className,
  label,
  onClick,
  children,
}: {
  className?: string;
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground active:scale-95",
        className,
      )}
    >
      {children}
    </button>
  );
}
