import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { Sunburst } from "@/components/shared/Sunburst";
import { cn } from "@/lib/utils";

/**
 * Highlight film for an event that has happened.
 *
 * The footage lives on Google Drive (it is far too large to ship with
 * the site), so it plays through Drive's embedded player. The player
 * only loads once the visitor asks for it: until then this is a light
 * branded poster, which keeps the page fast and sends nothing to a
 * third party on load.
 *
 * The frame is portrait-leaning on phones and widescreen on desktop,
 * so footage shot on a phone fills the screen instead of sitting in
 * black bars, and there is always a one-tap way into Drive's own
 * full-screen player.
 */
export function RecapFilm({
  embedUrl,
  label = "Watch the highlight film",
  className,
}: {
  embedUrl: string;
  label?: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const watchUrl = embedUrl.replace("/preview", "/view");

  return (
    <div className={cn("w-full", className)}>
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-brand-blue-deep sm:aspect-video">
        {playing ? (
          <iframe
            src={`${embedUrl}?autoplay=1`}
            title={label}
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 flex w-full flex-col items-center justify-center gap-5 p-6 text-white transition-colors hover:bg-brand-blue-dark focus-visible:outline-dashed focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-secondary"
          >
            <Sunburst className="pointer-events-none absolute -top-6 right-4 w-44 text-white/20" />
            <span className="relative flex h-20 w-20 items-center justify-center bg-secondary text-secondary-foreground">
              <Play className="ml-1 h-9 w-9 fill-current" />
            </span>
            <span className="relative font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
              {label}
            </span>
          </button>
        )}
      </div>

      <a
        href={watchUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Open the film full screen
        <ArrowUpRight className="h-4 w-4" />
      </a>
    </div>
  );
}
