import { Badge } from "@/components/ui/badge";
import { photos, plateFallback, type PhotoKey } from "@/data/photos";
import type { COFYEvent } from "@/data/events";

/** Photo representing each type of event. */
const categoryPhoto: Record<COFYEvent["category"], PhotoKey> = {
  Workshop: "workshop",
  Outreach: "outreach",
  Community: "community",
  Fundraiser: "books",
  Celebration: "volunteers",
};

/**
 * Media for the lead event slot: its promo film when it has one,
 * otherwise a photo of that kind of event. The film keeps its own
 * portrait shape and only loads metadata until the visitor plays it,
 * so the page stays light and the audio works when they choose to.
 */
export function FeaturedEvent({ event }: { event: COFYEvent }) {
  const photo = photos[categoryPhoto[event.category]];

  if (event.video) {
    return (
      <div className="relative mx-auto w-full max-w-[420px] bg-brand-blue-deep">
        <video
          src={event.video}
          className="aspect-[576/816] w-full object-contain"
          controls
          playsInline
          preload="metadata"
          aria-label={`Promotional film for ${event.title}`}
        />
        <Badge className="pointer-events-none absolute left-4 top-4 gap-1.5 border-0 bg-secondary font-bold text-secondary-foreground">
          Happening next · {event.category}
        </Badge>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-brand-blue-deep">
      <img
        src={photo.min}
        alt={photo.alt}
        className="aspect-square w-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = plateFallback(
            categoryPhoto[event.category],
          );
        }}
      />
      <Badge className="absolute left-4 top-4 gap-1.5 border-0 bg-secondary font-bold text-secondary-foreground">
        Happening next · {event.category}
      </Badge>
    </div>
  );
}
