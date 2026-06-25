import { Play, Clock, ArrowUpRight, Newspaper, PenLine, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/lib/format";
import type { MediaItem, MediaType } from "@/data/media";

const typeIcon: Record<MediaType, typeof Video> = {
  vlog: Video,
  blog: PenLine,
  news: Newspaper,
};

const typeLabel: Record<MediaType, string> = {
  vlog: "Vlog",
  blog: "Blog",
  news: "News",
};

export function MediaCard({ item, featured = false }: { item: MediaItem; featured?: boolean }) {
  const Icon = typeIcon[item.type];
  return (
    <article
      className={cn(
        "card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card",
        featured && "lg:flex-row",
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          "relative flex shrink-0 items-end overflow-hidden bg-gradient-to-br p-5",
          item.gradient,
          featured ? "min-h-56 lg:w-1/2" : "aspect-[16/10]",
        )}
      >
        <div className="absolute inset-0 bg-grid-soft opacity-30 mix-blend-overlay" aria-hidden />
        <Badge className="absolute left-4 top-4 gap-1.5 border-0 bg-white/90 font-semibold text-primary backdrop-blur">
          <Icon className="h-3.5 w-3.5" />
          {typeLabel[item.type]}
        </Badge>
        {item.type === "vlog" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </div>
        )}
        {item.duration && (
          <span className="relative z-10 inline-flex items-center gap-1 rounded-md bg-black/55 px-2 py-1 text-xs font-medium text-white backdrop-blur">
            <Clock className="h-3 w-3" />
            {item.duration}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="font-semibold text-primary">{item.category}</span>
          <span aria-hidden>•</span>
          <time dateTime={item.date}>{formatDateShort(item.date)}</time>
          {item.readTime && (
            <>
              <span aria-hidden>•</span>
              <span>{item.readTime}</span>
            </>
          )}
        </div>
        <h3
          className={cn(
            "font-display font-bold leading-snug text-foreground transition-colors group-hover:text-primary",
            featured ? "text-2xl" : "text-lg",
          )}
        >
          {item.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">
            By {item.author}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
            {item.type === "vlog" ? "Watch" : "Read"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}
