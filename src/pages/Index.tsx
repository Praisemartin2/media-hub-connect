import { Link } from "react-router-dom";
import { ArrowRight, Heart, HandHeart, Users2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/home/Hero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";
import { MediaCard } from "@/components/cards/MediaCard";
import { EventCard } from "@/components/cards/EventCard";
import { values, programs } from "@/data/programs";
import { mediaItems } from "@/data/media";
import { events } from "@/data/events";
import { testimonials } from "@/data/testimonials";
import { isUpcoming } from "@/lib/format";
import { SEO } from "@/components/shared/SEO";

const Index = () => {
  const latestMedia = mediaItems.slice(0, 3);
  const upcoming = events.filter((e) => isUpcoming(e.date)).slice(0, 2);

  return (
    <>
      <SEO
        title="Creating Opportunities for Youth Inc. — COFY"
        description="COFY provides transformational education and support to youth with developmental delays and their families — empowering them to thrive."
      />
      <Hero />

      {/* Values / mission strip */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading
            eyebrow="Who We Are"
            title="Support that meets every young person where they are"
            description="From the library to the living room, online to the park — we build opportunity around each child's strengths."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => (
              <Reveal key={value.title} delay={i * 80}>
                <div className="card-lift h-full rounded-2xl border border-border bg-card p-7">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Programs preview */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="container-cofy">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="What We Do"
              title="Programs built around opportunity"
              description="Every program removes a barrier between a young person and the future they deserve."
              className="md:mb-0"
            />
            <Reveal>
              <Button asChild variant="outline" className="rounded-full font-semibold">
                <Link to="/programs">
                  View all programs
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </Reveal>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {programs.map((program, i) => (
              <Reveal key={program.slug} delay={i * 80}>
                <Link
                  to="/programs"
                  className="card-lift group flex h-full items-start gap-5 rounded-2xl border border-border bg-card p-7"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand-blue-dark text-white shadow-md">
                    <program.icon className="h-7 w-7" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold transition-colors group-hover:text-primary">
                      {program.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {program.summary}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Learn more
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Media hub preview */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="Media Hub"
              title="Vlogs, stories & news from our community"
              description="Go behind the scenes with daily vlogs, helpful blogs and the latest COFY news."
              className="md:mb-0"
            />
            <Reveal>
              <Button asChild variant="outline" className="rounded-full font-semibold">
                <Link to="/media">
                  Visit the Media Hub
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
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="container-cofy">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              align="left"
              eyebrow="What's Next"
              title="Upcoming events"
              description="Join us in person and online — there's a place for everyone."
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

      {/* Testimonials */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy">
          <SectionHeading
            eyebrow="Voices of COFY"
            title="Stories of opportunity, in their words"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="card-lift flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                  <Quote className="h-9 w-9 text-secondary" />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-display font-bold text-white">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {t.role}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-cofy pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-blue-deep px-8 py-16 text-center text-white sm:px-16">
            <div className="absolute inset-0 bg-hero-radial" aria-hidden />
            <div className="absolute inset-0 bg-grid-soft opacity-10" aria-hidden />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
                Be the opportunity in a young person's story
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Your gift, your time or your voice can change a life. Join the
                COFY community today.
              </p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-secondary px-7 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
                >
                  <Link to="/get-involved">
                    <Heart className="mr-1 h-5 w-5" />
                    Donate Now
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/30 bg-white/5 px-7 font-semibold text-white hover:bg-white/15 hover:text-white"
                >
                  <Link to="/get-involved">
                    <HandHeart className="mr-1 h-5 w-5" />
                    Volunteer
                  </Link>
                </Button>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-white/60">
                <Users2 className="h-4 w-4" />
                Join 40+ mentors already making a difference
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
};

export default Index;
