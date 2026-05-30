import { Link } from "react-router-dom";
import { Pause, Play, Gamepad2, MonitorSpeaker, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MediaCard } from "@/components/media/MediaCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { usePlayer } from "@/context/PlayerProvider";
import { useDevices, useLibrary } from "@/hooks/useMediaHub";
import { formatTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const Index = () => {
  const { nowPlaying, command } = usePlayer();
  const { data: devices = [] } = useDevices();
  const { data: library = [], isLoading } = useLibrary();

  const onlineCount = devices.filter((d) => d.online).length;
  const item = nowPlaying?.item;
  const isPlaying = nowPlaying?.status === "playing";
  const progress = item ? (Math.min(nowPlaying!.position, item.duration) / item.duration) * 100 : 0;
  const activeDevice = devices.find((d) => d.id === nowPlaying?.deviceId);

  return (
    <AppLayout title="Welcome back" description="Here's what's playing across your home.">
      {/* Featured now playing */}
      <section className="mb-10 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center">
          <div
            className={cn(
              "h-36 w-36 shrink-0 rounded-xl bg-gradient-to-br",
              item?.artwork ?? "from-secondary to-muted",
            )}
          />
          <div className="min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
              <Sparkles className="h-3 w-3 text-accent" />
              {isPlaying ? "Now playing" : "Paused"}
              {activeDevice && ` · ${activeDevice.name}`}
            </span>
            <h2 className="mt-3 truncate text-2xl font-semibold">
              {item?.title ?? "Nothing playing"}
            </h2>
            <p className="truncate text-muted-foreground">
              {item?.creator ?? "Pick something from your library to get started."}
            </p>

            {item && (
              <div className="mt-4 max-w-md">
                <Progress value={progress} className="h-1.5" />
                <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-muted-foreground">
                  <span>{formatTime(nowPlaying!.position)}</span>
                  <span>{formatTime(item.duration)}</span>
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                className="bg-gradient-brand text-white hover:opacity-90"
                disabled={!item}
                onClick={() => command({ type: "toggle" })}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button variant="outline" asChild>
                <Link to="/remote">
                  <Gamepad2 className="h-4 w-4" />
                  Open remote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard label="Devices online" value={`${onlineCount}/${devices.length}`} icon={MonitorSpeaker} to="/devices" />
        <StatCard label="In your library" value={`${library.length}`} icon={Sparkles} to="/library" />
        <StatCard
          label="Active output"
          value={activeDevice?.name ?? "None"}
          icon={Gamepad2}
          to="/remote"
        />
      </section>

      {/* Library highlights */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Jump back in</h3>
          <Button variant="link" asChild className="text-muted-foreground">
            <Link to="/library">View library</Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
              ))
            : library.slice(0, 8).map((m) => <MediaCard key={m.id} item={m} />)}
        </div>
      </section>
    </AppLayout>
  );
};

function StatCard({
  label,
  value,
  icon: Icon,
  to,
}: {
  label: string;
  value: string;
  icon: typeof Sparkles;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
        <Icon className="h-5 w-5 text-accent" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-lg font-semibold leading-tight">{value}</p>
        <p className="truncate text-xs text-muted-foreground">{label}</p>
      </div>
    </Link>
  );
}

export default Index;
