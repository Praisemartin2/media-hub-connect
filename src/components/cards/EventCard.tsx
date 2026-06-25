import { MapPin, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { dateParts, formatDate } from "@/lib/format";
import type { COFYEvent } from "@/data/events";

export function EventCard({ event, past = false }: { event: COFYEvent; past?: boolean }) {
  const { month, day } = dateParts(event.date);
  return (
    <article
      className={cn(
        "card-lift group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6",
        past && "opacity-95",
      )}
    >
      {/* Date chip */}
      <div
        className={cn(
          "flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md",
          event.gradient,
        )}
      >
        <span className="text-xs font-bold uppercase tracking-wider opacity-90">
          {month}
        </span>
        <span className="font-display text-3xl font-extrabold leading-none">
          {day}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="border-0 bg-primary/10 font-semibold text-primary"
          >
            {event.category}
          </Badge>
          {past ? (
            <Badge variant="outline" className="font-medium text-muted-foreground">
              Past event
            </Badge>
          ) : (
            <Badge className="border-0 bg-secondary font-semibold text-secondary-foreground">
              Upcoming
            </Badge>
          )}
        </div>
        <h3 className="font-display text-xl font-bold text-foreground transition-colors group-hover:text-primary">
          {event.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-primary" />
            {formatDate(event.date)}
            {event.endDate ? ` – ${formatDate(event.endDate)}` : ""} · {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-primary" />
            {event.location}
          </span>
        </div>
      </div>

      {/* Action */}
      {!past && (
        <div className="shrink-0 sm:self-center">
          <Button
            asChild
            className="rounded-full font-semibold shadow-sm shadow-primary/20"
          >
            <a href={event.registerUrl ?? "#"}>
              Register
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}
    </article>
  );
}
