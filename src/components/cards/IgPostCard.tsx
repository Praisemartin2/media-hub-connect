import { useState } from "react";
import { ArrowUpRight, Globe2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sunburst } from "@/components/shared/Sunburst";
import { formatDate } from "@/lib/format";
import { igImageUrl, type IgPost } from "@/data/ig";

/**
 * Card for one daily Opportunity Watch post. Shows the branded image
 * committed by the automation; if a date's PNG is missing, falls back
 * to a compact cobalt band so the card never breaks.
 */
export function IgPostCard({ post }: { post: IgPost }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="relative shrink-0 overflow-hidden">
        {imgOk ? (
          <img
            src={igImageUrl(post.date)}
            alt={`Opportunity Watch — ${post.headline}`}
            width={1080}
            height={1350}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="relative flex aspect-[16/10] items-end overflow-hidden bg-primary p-5">
            <Sunburst className="absolute -top-4 right-4 w-40 text-white/25" />
            <span className="font-display text-sm font-bold uppercase tracking-[0.14em] text-secondary">
              Opportunity Watch
            </span>
          </div>
        )}
        <Badge className="absolute left-4 top-4 gap-1.5 border-0 bg-white/90 font-semibold text-primary backdrop-blur">
          <Globe2 className="h-3.5 w-3.5" />
          {post.region}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <time dateTime={post.date} className="text-xs font-medium text-muted-foreground">
          {formatDate(post.date)}
        </time>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-foreground">
          {post.headline}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.summary}
        </p>
        <a
          href={post.source_url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Source: {post.source_name}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
