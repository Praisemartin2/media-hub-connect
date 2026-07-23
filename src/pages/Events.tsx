import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  CalendarClock,
  History,
  Heart,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { Sunburst } from "@/components/shared/Sunburst";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/shared/SEO";
import { events, type COFYEvent } from "@/data/events";
import { isUpcoming, dateParts, formatDate } from "@/lib/format";
import { photos, plateFallback, type PhotoKey } from "@/data/photos";

/** Photo representing each type of event (main square imagery). */
const categoryPhoto: Record<COFYEvent["category"], PhotoKey> = {
  Workshop: "workshop",
  Outreach: "outreach",
  Community: "community",
  Fundraiser: "books",
  Celebration: "volunteers",
};

/** "Aug 5 – 7, 2026" style label for single or multi-day events. */
function rangeLabel(e: COFYEvent): string {
  const start = formatDate(e.date);
  if (!e.endDate) return start;
  const s = new Date(e.date + "T00:00:00");
  const en = new Date(e.endDate + "T00:00:00");
  const sameMonth =
    s.getMonth() === en.getMonth() && s.getFullYear() === en.getFullYear();
  if (sameMonth) {
    return `${s.toLocaleDateString("en-US", { month: "long" })} ${s.getDate()} – ${en.getDate()}, ${en.getFullYear()}`;
  }
  return `${formatDate(e.date, { year: undefined })} – ${formatDate(e.endDate)}`;
}

/** Square date block: month + day (and end day for ranges). */
function DateSquare({ event, past = false }: { event: COFYEvent; past?: boolean }) {
  const { month, day } = dateParts(event.date);
  const end = event.endDate ? dateParts(event.endDate) : undefined;
  return (
    <div
      className={
        past
          ? "flex h-20 w-20 shrink-0 flex-col items-center justify-center border border-border bg-card text-foreground"
          : "flex h-20 w-20 shrink-0 flex-col items-center justify-center bg-secondary text-secondary-foreground"
      }
    >
      <span className="text-[11px] font-bold uppercase tracking-widest">{month}</span>
      <span className="font-display text-2xl font-bold leading-none">
        {day}
        {end && <span className="text-base font-semibold">–{end.day}</span>}
      </span>
    </div>
  );
}

/** One row in the sequential square list. */
function EventRow({ event, past = false }: { event: COFYEvent; past?: boolean }) {
  const canRegister = !past && event.registerUrl?.startsWith("http");
  return (
    <div className="card-lift flex items-stretch gap-0 border border-border bg-card">
      <DateSquare event={event} past={past} />
      <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-3">
        <p className="text-xs font-bold uppercase tracking-wider text-primary">
          {event.category}
        </p>
        <h3 className="mt-0.5 truncate font-display text-lg font-bold leading-snug">
          {event.title}
        </h3>
        <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
          {event.location}
        </p>
      </div>
      {canRegister && (
        <a
          href={event.registerUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Register for ${event.title}`}
          className="flex shrink-0 items-center gap-1.5 self-center border border-primary px-4 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring mr-4"
        >
          Register
          <ArrowUpRight className="h-4 w-4" />
        </a>
      )}
    </div>
  );
}

const Events = () => {
  const { upcoming, past } = useMemo(() => {
    const up = events
      .filter((e) => isUpcoming(e.date))
      .sort((a, b) => a.date.localeCompare(b.date));
    const pa = events
      .filter((e) => !isUpcoming(e.date))
      .sort((a, b) => b.date.localeCompare(a.date));
    return { upcoming: up, past: pa };
  }, []);

  const featured = upcoming[0];
  const featuredPhoto = featured ? photos[categoryPhoto[featured.category]] : undefined;
  const [pastHighlight, ...pastRest] = past;

  return (
    <>
      <SEO
        title="Events — Upcoming & Past | COFY"
        description="Find upcoming COFY events — workshops, summits, community days and outreach — plus highlights from past gatherings."
      />
      <section className="py-10 lg:py-16">
        <div className="container-cofy grid gap-14 lg:grid-cols-2 lg:gap-10">
          {/* Upcoming — left */}
          <div>
            <div className="mb-8 flex items-center gap-2">
              <CalendarClock className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Upcoming</h2>
            </div>

            {/* Main square: next event with type photo */}
            {featured && featuredPhoto && (
              <Reveal>
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={featuredPhoto.min}
                    alt={featuredPhoto.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = plateFallback(
                        categoryPhoto[featured.category],
                      );
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
                    aria-hidden
                  />
                  <Badge className="absolute left-5 top-5 gap-1.5 border-0 bg-secondary font-bold text-secondary-foreground">
                    Next up · {featured.category}
                  </Badge>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7 text-white">
                    <div className="min-w-0">
                      <p className="text-sm font-bold uppercase tracking-wider text-secondary">
                        {rangeLabel(featured)}
                      </p>
                      <h3 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">
                        {featured.title}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-white/85">
                        <MapPin className="h-4 w-4 shrink-0 text-secondary" />
                        <span className="truncate">{featured.venue}, {featured.location}</span>
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-white/85">
                        <Clock className="h-4 w-4 shrink-0 text-secondary" />
                        {featured.time}
                      </p>
                    </div>
                    {featured.registerUrl?.startsWith("http") && (
                      <a
                        href={featured.registerUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex shrink-0 items-center gap-1.5 bg-secondary px-5 py-3 font-display text-base font-bold text-secondary-foreground transition-colors hover:bg-brand-yellow-light"
                      >
                        Register
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="mt-4 font-serif text-base leading-relaxed text-muted-foreground">
                  {featured.description}
                </p>
              </Reveal>
            )}

            {/* Sequential square list */}
            <div className="mt-8 grid gap-4">
              {upcoming.slice(1).map((event, i) => (
                <Reveal key={event.id} delay={i * 60}>
                  <EventRow event={event} />
                </Reveal>
              ))}
              {upcoming.length === 0 && (
                <p className="py-10 text-center text-muted-foreground">
                  Nothing scheduled right now — new events are added often!
                </p>
              )}
            </div>
          </div>

          {/* Past — right */}
          <div>
            <div className="mb-8 flex items-center gap-2">
              <History className="h-5 w-5 text-primary" />
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Past events</h2>
            </div>

            {/* Past highlight */}
            {pastHighlight && (
              <Reveal>
                <div className="border border-border bg-brand-cream p-6 sm:p-8">
                  <p className="eyebrow font-display">Highlight</p>
                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                    {pastHighlight.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {rangeLabel(pastHighlight)} · {pastHighlight.location}
                  </p>
                  <p className="mt-3 font-serif text-base leading-relaxed text-foreground/75">
                    {pastHighlight.description}
                  </p>
                </div>
              </Reveal>
            )}

            <div className="mt-8 grid gap-4">
              {pastRest.map((event, i) => (
                <Reveal key={event.id} delay={i * 60}>
                  <EventRow event={event} past />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Donate band */}
      <section className="relative overflow-hidden bg-primary py-16 text-white lg:py-20">
        <Sunburst className="absolute -top-4 right-8 w-56 text-white/20" />
        <div className="container-cofy relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium sm:text-4xl">
              Every COFY event is free of charge
            </h2>
            <p className="mt-3 font-serif text-lg text-white/85">
              Your gift keeps workshops, summits and outreach open to every
              family — at no cost to them.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 rounded-none bg-secondary px-8 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
          >
            <Link to="/get-involved#donate">
              <Heart className="mr-1 h-5 w-5" />
              Donate
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Events;
