import { useMemo, useState } from "react";
import { CalendarDays, History, CalendarClock } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { EventCard } from "@/components/cards/EventCard";
import { SEO } from "@/components/shared/SEO";
import { cn } from "@/lib/utils";
import { events } from "@/data/events";
import { isUpcoming } from "@/lib/format";

const Events = () => {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const { upcoming, past } = useMemo(() => {
    const up = events
      .filter((e) => isUpcoming(e.date))
      .sort((a, b) => a.date.localeCompare(b.date));
    const pa = events
      .filter((e) => !isUpcoming(e.date))
      .sort((a, b) => b.date.localeCompare(a.date));
    return { upcoming: up, past: pa };
  }, []);

  const list = tab === "upcoming" ? upcoming : past;

  return (
    <>
      <SEO
        title="Events — Upcoming & Past | COFY"
        description="Find upcoming COFY events — workshops, fundraisers, community days and outreach — plus highlights from past gatherings."
      />
      <PageHero
        eyebrow="Events"
        title="Gather, learn & celebrate with us"
        description="From learning camps to our annual gala, there's always a way to connect with the COFY community — in person and online."
      >
        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <CalendarClock className="h-4 w-4 text-secondary" />
            {upcoming.length} upcoming
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <History className="h-4 w-4 text-secondary" />
            {past.length} past events
          </span>
        </div>
      </PageHero>

      <section className="py-16 lg:py-24">
        <div className="container-cofy">
          {/* Tab switcher */}
          <div className="mb-10 inline-flex rounded-full border border-border bg-card p-1.5">
            {([
              { key: "upcoming", label: "Upcoming", icon: CalendarDays },
              { key: "past", label: "Past Events", icon: History },
            ] as const).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                aria-pressed={tab === t.key}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  tab === t.key
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "text-foreground/65 hover:text-primary",
                )}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid gap-5">
            {list.map((event, i) => (
              <Reveal key={event.id} delay={i * 60}>
                <EventCard event={event} past={tab === "past"} />
              </Reveal>
            ))}
          </div>

          {list.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              Nothing here right now — new events are added often!
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;
