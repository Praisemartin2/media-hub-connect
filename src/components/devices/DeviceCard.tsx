import { Tv, Speaker, Gamepad2, Radio, MonitorSpeaker, Cast } from "lucide-react";
import type { Device, DeviceKind } from "@/types/media";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/context/PlayerProvider";
import { useSetDevicePower } from "@/hooks/useMediaHub";
import { cn } from "@/lib/utils";

const kindIcon: Record<DeviceKind, typeof Tv> = {
  tv: Tv,
  speaker: Speaker,
  console: Gamepad2,
  receiver: Radio,
  display: MonitorSpeaker,
};

export function DeviceCard({ device }: { device: Device }) {
  const { nowPlaying, command } = usePlayer();
  const setPower = useSetDevicePower();
  const Icon = kindIcon[device.kind];
  const isActive = nowPlaying?.deviceId === device.id;

  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-xl border border-border bg-card p-4 transition-colors",
        isActive && "border-primary/60 shadow-glow",
        !device.online && "opacity-60",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              isActive ? "bg-gradient-brand text-white" : "bg-secondary text-foreground",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium leading-tight">{device.name}</p>
            <p className="text-xs text-muted-foreground">{device.room}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-1">
          <Switch
            checked={device.online}
            aria-label={`Power ${device.name}`}
            onCheckedChange={(online) =>
              setPower.mutate({ deviceId: device.id, online })
            }
          />
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            {device.online ? "On" : "Standby"}
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Source
        </label>
        <Select
          value={device.source}
          disabled={!device.online}
          onValueChange={(source) =>
            command({ type: "set-source", deviceId: device.id, source })
          }
        >
          <SelectTrigger className="h-9">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {device.sources.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        variant={isActive ? "secondary" : "outline"}
        size="sm"
        disabled={!device.online || isActive}
        onClick={() => command({ type: "set-device", deviceId: device.id })}
      >
        <Cast className="h-4 w-4" />
        {isActive ? "Active output" : "Play here"}
      </Button>
    </div>
  );
}
