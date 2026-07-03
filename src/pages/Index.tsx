import { Link } from "react-router-dom";
import { ArrowRight, Heart, HandHeart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoHero } from "@/components/home/VideoHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { StatCounter } from "@/components/shared/StatCounter";
import { MediaCard } from "@/components/cards/MediaCard";
import { EventCard } from "@/components/cards/EventCard";
import { programs } from "@/data/programs";
import { mediaItems } from "@/data/media";
import { events } from "@/data/events";
import { testimonials } from "@/data/testimonials";
import { impactStats, site } from "@/data/site";
import { isUpcoming } from "@/lib/format";
import { SEO } from "@/components/shared/SEO";
import { cn } from "@/lib/utils";

const base = import.meta.env.BASE_URL;

/** Photo plate for each program (public/media/photos/<art>.png). */
const programPhoto = (art: string) => `${base}media/photos/${art}.png`;

const Index = () => {
  const latestMedia = mediaItems.slice(0, 3);
  const upcoming = events.filter((e) => isUpcoming(e.date)).slice(0, 2);

  return (
    <>
      <SEO
        title="Creating Opportunities for Youth Inc. (COFY) — Helping Together"
        description={site.mission}
      />
      <VideoHero />

      {/* Mission — editorial two-column */}
      <section id="mission" className="scroll-mt-20 border-b border-border py-20 lg:py-28">
        <div className="container-cofy grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.9rem]">
              We support youth with special needs and their families through
              educational programs and service providers.
            </h2>
            <Button
              asChild
              size="lg"
              className="mt-9 rounded-full px-8 font-semibold"
            >
              <Link to="/about">
                Our Vision
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground lg:pt-2">
              <p>{site.aboutIntro}</p>
              <p>{site.aboutSkills}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Programs — alternating photo/text editorial rows */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading align="left" eyebrow="What We Do" title="Our projects" />
          <div className="mt-14 space-y-20 lg:space-y-28">
            {programs.map((program, i) => (
              <Reveal key={program.slug}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <Link
                    to={`/programs/${program.slug}`}
                    className={cn(
                      "group block overflow-hidden rounded-3xl",
                      i % 2 === 1 && "lg:order-2",
                    )}
                  >
                    <img
                      src={programPhoto(program.art)}
                      alt={`${program.title} — COFY program`}
                      width={1200}
                      height={750}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </Link>
                  <div className={cn(i % 2 === 1 && "lg:order-1")}>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <program.icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                      {program.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                      {program.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button asChild className="rounded-full font-semibold">
                        <Link to={`/programs/${program.slug}`}>
                          Learn More
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="rounded-full font-semibold"
                      >
                        <Link to="/get-involved">Donate</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <section className="border-y border-border bg-brand-blue-deep py-14 text-white">
        <div className="container-cofy grid grid-cols-2 gap-8 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-4xl font-extrabold text-secondary sm:text-5xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1.5 text-sm text-white/75">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading eyebrow="Reviews" title="What our community says" />
          <div className="mx-auto mt-14 grid max-w-5xl gap-10 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="flex h-full flex-col border-l-4 border-secondary pl-7">
                  <Quote className="h-8 w-8 text-secondary" aria-hidden />
                  <blockquote className="mt-4 flex-1 text-xl leading-relaxed text-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    — {t.name}, {t.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="border-t border-border py-20 lg:py-28">
        <div className="container-cofy">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Blog"
              title="Vlogs, stories & news"
              className="md:mb-0"
            />
            <Reveal>
              <Button asChild variant="outline" className="rounded-full font-semibold">
                <Link to="/media">
                  Visit the Blog
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {latestMedia.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <MediaCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Events preview */}
      <section className="border-t border-border bg-brand-cream py-20 lg:py-28">
        <div className="container-cofy">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="What's Next"
              title="Upcoming events"
              className="md:mb-0"
            />
            <Reveal>
              <Button asChild variant="outline" className="rounded-full font-semibold">
                <Link to="/events">
                  See all events
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-5">
            {upcoming.map((event, i) => (
              <Reveal key={event.id} delay={i * 80}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-cofy py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-blue-deep px-8 py-16 text-center text-white sm:px-16">
            <div className="absolute inset-0 bg-hero-radial" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Join us in creating brighter futures
              </h2>
              <p className="mt-4 text-lg text-white/80">
                For youth and families in need — every donation counts.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-secondary px-7 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
                >
                  <Link to="/get-involved">
                    <Heart className="mr-1 h-5 w-5" />
                    Donate
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 bg-white/5 px-7 font-semibold text-white hover:bg-white/15 hover:text-white"
                >
                  <Link to="/get-involved#volunteer">
                    <HandHeart className="mr-1 h-5 w-5" />
                    Volunteer
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Index;
