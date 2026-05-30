import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { MediaCard } from "@/components/media/MediaCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useLibrary } from "@/hooks/useMediaHub";
import { cn } from "@/lib/utils";
import type { MediaKind } from "@/types/media";

const filters: { value: MediaKind | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "show", label: "Shows" },
  { value: "music", label: "Music" },
  { value: "podcast", label: "Podcasts" },
];

const Library = () => {
  const { data: library = [], isLoading } = useLibrary();
  const [filter, setFilter] = useState<MediaKind | "all">("all");

  const items = filter === "all" ? library : library.filter((m) => m.kind === filter);

  return (
    <AppLayout title="Library" description="Browse everything available on your hub.">
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              filter === f.value
                ? "border-transparent bg-gradient-brand text-white"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
          Nothing here yet in this category.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((m) => (
            <MediaCard key={m.id} item={m} />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default Library;
