import { Link } from "react-router-dom";
import { Play, Clock, ArrowUpRight, Newspaper, PenLine, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/lib/format";
import { Illustration } from "@/components/art/Illustration";
import type { MediaItem, MediaType } from "@/data/media";

export const typeIcon: Record<MediaType, typeof Video> = {
  vlog: Video,
  blog: PenLine,
  news: Newspaper,
};

export const typeLabel: Record<MediaType, string> = {
  vlog: "Vlog",
  blog: "Blog",
  news: "News",
};

export function MediaCard({ item, featured = false }: { item: MediaItem; featured?: boolean }) {
  const Icon = typeIcon[item.type];
  return (
    <Link
      to={`/media/${item.id}`}
      className={cn(
        "card-lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card",
        "focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        featured && "lg:flex-row",
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          "relative flex shrink-0 items-end overflow-hidden bg-brand-sky p-5",
          featured ? "min-h-56 lg:w-1/2" : "aspect-[16/10]",
        )}
      >
        <div className="absolute inset-0">
          <Illustration variant={item.art} label="" />
        </div>
        <Badge className="absolute left-4 top-4 gap-1.5 border-0 bg-white font-semibold text-primary">
          <Icon className="h-3.5 w-3.5" />
          {typeLabel[item.type]}
        </Badge>
        {item.type === "vlog" && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center bg-white text-primary">
              <Play className="ml-1 h-7 w-7 fill-current" />
            </span>
          </div>
        )}
        {item.duration && (
          <span className="relative z-10 inline-flex items-center gap-1 bg-black/70 px-2 py-1 text-xs font-medium text-white">
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
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
