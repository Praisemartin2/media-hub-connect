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
import { SEO } from "@/components/shared/SEO";
import { FeaturedEvent } from "@/components/events/FeaturedEvent";
import { events, type COFYEvent } from "@/data/events";
import { isUpcoming, dateParts, formatDateRange, formatPlace } from "@/lib/format";

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
      .filter((e) => isUpcoming(e.date, e.endDate))
      .sort((a, b) => a.date.localeCompare(b.date));
    const pa = events
      .filter((e) => !isUpcoming(e.date, e.endDate))
      .sort((a, b) => b.date.localeCompare(a.date));
    return { upcoming: up, past: pa };
  }, []);

  const featured = upcoming.find((e) => e.featured) ?? upcoming[0];
  const rest = upcoming.filter((e) => e.id !== featured?.id);
  const [pastHighlight, ...pastRest] = past;

  return (
    <>
      <SEO
        title="Events — Upcoming & Past | COFY"
        description="Find upcoming COFY events — workshops, summits, community days and outreach — plus highlights from past gatherings."
      />
      {/* Upcoming */}
      <section className="py-10 lg:py-16">
        <div className="container-cofy">
          <div className="mb-8 flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Upcoming</h2>
          </div>

          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
              {/* Lead slot: the current event */}
              {featured && (
                <Reveal>
                  <FeaturedEvent event={featured} />
                  <p className="mt-6 text-sm font-bold uppercase tracking-wider text-primary">
                    {formatDateRange(featured.date, featured.endDate)}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{formatPlace(featured.venue, featured.location)}</span>
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    {featured.time}
                  </p>
                  <p className="mt-4 font-serif text-base leading-relaxed text-muted-foreground">
                    {featured.description}
                  </p>
                  {featured.registerUrl?.startsWith("http") && (
                    <a
                      href={featured.registerUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Register for ${featured.title}`}
                      className="mt-6 inline-flex items-center gap-1.5 bg-primary px-6 py-3 font-display text-lg font-bold text-white transition-colors hover:bg-brand-blue-dark focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      Register now
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  )}
                </Reveal>
              )}

              {/* Everything else, in date order */}
              <div className="grid grid-cols-1 content-start gap-4">
                {rest.map((event, i) => (
                  <Reveal key={event.id} delay={i * 60}>
                    <EventRow event={event} />
                  </Reveal>
                ))}
              </div>
            </div>
          ) : (
            <p className="py-10 text-muted-foreground">
              Nothing scheduled right now. New events are added often.
            </p>
          )}
        </div>
      </section>

      {/* Past events */}
      <section className="py-10 lg:py-16">
        <div className="container-cofy">
          <div className="mb-8 flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Past events</h2>
          </div>

          <div className="max-w-3xl">
            {pastHighlight && (
              <Reveal>
                <div className="border border-border bg-brand-cream p-6 sm:p-8">
                  <p className="eyebrow font-display">Highlight</p>
                  <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                    {pastHighlight.title}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">
                    {formatDateRange(pastHighlight.date, pastHighlight.endDate)} · {pastHighlight.location}
                  </p>
                  <p className="mt-3 font-serif text-base leading-relaxed text-foreground/75">
                    {pastHighlight.description}
                  </p>
                </div>
              </Reveal>
            )}

            <div className="mt-8 grid grid-cols-1 gap-4">
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
              family, at no cost to them.
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
