import { Play, Star, Film, Tv, Music, Mic } from "lucide-react";
import type { MediaItem, MediaKind } from "@/types/media";
import { usePlayer } from "@/context/PlayerProvider";
import { formatDuration } from "@/lib/format";
import { cn } from "@/lib/utils";

const kindIcon: Record<MediaKind, typeof Film> = {
  movie: Film,
  show: Tv,
  music: Music,
  podcast: Mic,
};

export function MediaCard({ item }: { item: MediaItem }) {
  const { nowPlaying, command } = usePlayer();
  const Icon = kindIcon[item.kind];
  const isActive = nowPlaying?.item?.id === item.id;

  return (
    <button
      type="button"
      onClick={() => command({ type: "play-item", itemId: item.id })}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isActive && "border-primary/60 shadow-glow",
      )}
    >
      <div className={cn("relative aspect-[4/3] w-full bg-gradient-to-br", item.artwork)}>
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
        <Icon className="absolute left-3 top-3 h-4 w-4 text-white/80" />
        {item.rating != null && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            <Star className="h-3 w-3 fill-current" />
            {item.rating.toFixed(1)}
          </span>
        )}
        <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-gradient-brand text-white opacity-0 shadow-glow transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <Play className="h-4 w-4 fill-current" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-0.5 p-3">
        <p className="truncate text-sm font-medium">{item.title}</p>
        <p className="truncate text-xs text-muted-foreground">{item.creator}</p>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground/80">
          {item.genre} · {formatDuration(item.duration)}
        </p>
      </div>
    </button>
  );
}
