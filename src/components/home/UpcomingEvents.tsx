import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { Sunburst } from "@/components/shared/Sunburst";
import { events } from "@/data/events";
import { dateParts, formatDateRange, formatPlace, isUpcoming } from "@/lib/format";

/**
 * Prominent homepage block listing every upcoming COFY event, with
 * direct registration links where a form is open.
 */
export function UpcomingEvents() {
  const upcoming = events
    .filter((e) => isUpcoming(e.date))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (upcoming.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-secondary py-20 text-secondary-foreground lg:py-24">
      <Sunburst className="absolute -top-4 right-8 w-56 text-black/20" />
      <div className="container-cofy relative">
        <p className="eyebrow font-display text-black/60">
          Educational Mission — Summer 2026
        </p>
        <h2 className="mt-2 max-w-3xl font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
          What's coming up
        </h2>
        <p className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-black/80">
          Theme: <strong>Teaching How They Learn</strong> (TeachHTL) — reaching
          schools with transformational education. Every COFY event is free of
          charge. Register below.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event, i) => {
            const { month, day } = dateParts(event.date);
            const end = event.endDate ? dateParts(event.endDate) : undefined;
            const canRegister = event.registerUrl?.startsWith("http");
            return (
              <Reveal key={event.id} delay={(i % 3) * 80}>
                <div className="flex h-full flex-col bg-white p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center bg-primary text-white">
                      <span className="text-[11px] font-bold uppercase tracking-widest">
                        {month}
                      </span>
                      <span className="font-display text-2xl font-bold leading-none">
                        {day}
                        {end && <span className="text-base font-semibold">–{end.day}</span>}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        {event.category}
                      </p>
                      <h3 className="mt-1 font-display text-xl font-bold leading-snug text-foreground">
                        {event.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-muted-foreground">
                        {formatDateRange(event.date, event.endDate)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 flex items-start gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{formatPlace(event.venue, event.location)}</span>
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    {event.time}
                  </p>
                  <p className="mt-4 flex-1 font-serif text-sm leading-relaxed text-foreground/75">
                    {event.description}
                  </p>

                  <div className="mt-6">
                    {canRegister ? (
                      <a
                        href={event.registerUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Register for ${event.title}`}
                        className="inline-flex items-center gap-1.5 bg-primary px-5 py-2.5 font-display text-base font-bold text-white transition-colors hover:bg-brand-blue-dark focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        Register
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        to="/events"
                        className="inline-flex items-center gap-1.5 font-display text-base font-bold text-primary hover:underline focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        Event details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            asChild
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
          >
            <Link to="/events">
              View all events
              <ArrowRight className="ml-1 h-5 w-5" />
            </Link>
          </Button>
          <p className="font-serif text-sm text-black/75">
            More information:{" "}
            <a href="tel:+17329174426" className="font-semibold underline underline-offset-4">
              +1 (732) 917-4426
            </a>{" "}
            ·{" "}
            <a href="tel:+2348160975436" className="font-semibold underline underline-offset-4">
              +234 816 097 5436
            </a>{" "}
            ·{" "}
            <a
              href="mailto:Ngozi@cofyouth.org"
              className="font-semibold underline underline-offset-4"
            >
              Ngozi@cofyouth.org
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
