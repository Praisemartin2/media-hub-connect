import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoHero } from "@/components/home/VideoHero";
import { KineticMission } from "@/components/home/KineticMission";
import { Sunburst } from "@/components/shared/Sunburst";
import { Reveal } from "@/components/shared/Reveal";
import { MediaCard } from "@/components/cards/MediaCard";
import { programs } from "@/data/programs";
import { mediaItems } from "@/data/media";
import { events } from "@/data/events";
import { testimonials } from "@/data/testimonials";
import { site } from "@/data/site";
import { formatDate, isUpcoming } from "@/lib/format";
import { SEO } from "@/components/shared/SEO";
import { PhotoImg } from "@/components/shared/PhotoImg";
import { toast } from "sonner";

const [featureProgram, ...cardPrograms] = programs;

const Index = () => {
  const stories = mediaItems.slice(0, 3);
  const nextEvents = events.filter((e) => isUpcoming(e.date)).slice(0, 3);

  return (
    <>
      <SEO
        title="Creating Opportunities for Youth Inc. (COFY) — Helping Together"
        description={site.mission}
      />
      <VideoHero />

      {/* 2 — Split feature: who we are */}
      <section id="mission" className="scroll-mt-24 py-20 lg:py-28">
        <div className="container-cofy grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="bg-brand-sky p-5 sm:p-8">
              <PhotoImg id="community" loading="eager" className="w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
              Who we are
            </h2>
            <p className="mt-6 font-serif text-lg leading-relaxed text-foreground/75">
              {site.aboutIntro}
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-foreground/75">
              {site.aboutSkills}
            </p>
            <Button asChild variant="outline" className="mt-8">
              <Link to="/about">
                Our Vision
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* 3 — Cobalt feature block: flagship program */}
      <section className="relative overflow-hidden bg-primary py-20 text-white lg:py-28">
        <Sunburst className="absolute -top-6 right-8 w-56 text-white/25" />
        <div className="container-cofy grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4 font-display text-white/80">Featured Project</p>
            <h2 className="font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
              {featureProgram.title}
            </h2>
            <p className="mt-6 max-w-xl font-serif text-lg leading-relaxed text-white/90">
              {featureProgram.description}
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-8 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link to={`/programs/${featureProgram.slug}`}>
                Learn more
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={100}>
            <div className="bg-white p-5 sm:p-8">
              <PhotoImg id="disability" className="w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4 — 3-up program cards */}
      <section className="py-20 lg:py-28">
        <div className="container-cofy">
          <div className="grid gap-10 md:grid-cols-3">
            {cardPrograms.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to={`/programs/${p.slug}`} className="group block">
                  <div className="overflow-hidden">
                    <PhotoImg
                      id={p.art as "education" | "outreach" | "mentorship"}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="eyebrow mt-5 font-display text-foreground/60">Projects</p>
                  <h3 className="mt-2 font-display text-3xl font-medium leading-tight tracking-tight group-hover:text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-3 font-serif leading-relaxed text-foreground/70">
                    {p.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 font-display text-lg text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Kinetic mission statement */}
      <KineticMission />

      {/* 6 — Sky-blue Latest block + story cards */}
      <section className="bg-brand-sky py-20 lg:py-24">
        <div className="container-cofy">
          <div className="relative overflow-hidden">
            <Sunburst className="absolute -top-4 right-0 w-48 text-black/20" />
            <p className="eyebrow font-display text-foreground/70">Latest</p>
            <h2 className="mt-2 max-w-3xl font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
              Stories from our community
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {stories.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <MediaCard item={item} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="outline">
              <Link to="/media">
                View all stories
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 7 — Newsletter (cream, two-column, underline inputs) */}
      <section className="bg-brand-cream py-20 lg:py-28">
        <div className="container-cofy grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <h2 className="font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
              Be an insider
            </h2>
            <p className="mt-6 max-w-md font-serif text-lg leading-relaxed text-foreground/75">
              Get vlogs, stories and event news from COFY in your inbox — and
              be the first to hear about workshops and volunteer days.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                toast.success("You're an insider!", {
                  description: "Thanks for joining the COFY community.",
                });
                form.reset();
              }}
              className="space-y-8"
            >
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="font-display text-lg">First name</span>
                  <input
                    required
                    name="firstName"
                    autoComplete="given-name"
                    className="mt-1 w-full border-0 border-b-2 border-foreground/40 bg-transparent py-2 font-serif outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="font-display text-lg">Last name</span>
                  <input
                    required
                    name="lastName"
                    autoComplete="family-name"
                    className="mt-1 w-full border-0 border-b-2 border-foreground/40 bg-transparent py-2 font-serif outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>
              <label className="block">
                <span className="font-display text-lg">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="mt-1 w-full border-0 border-b-2 border-foreground/40 bg-transparent py-2 font-serif outline-none transition-colors focus:border-primary"
                />
              </label>
              <div className="grid gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="font-display text-lg">
                    Zip Code <span className="text-sm text-muted-foreground">(optional)</span>
                  </span>
                  <input
                    name="zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className="mt-1 w-full border-0 border-b-2 border-foreground/40 bg-transparent py-2 font-serif outline-none transition-colors focus:border-primary"
                  />
                </label>
                <label className="block">
                  <span className="font-display text-lg">
                    Phone <span className="text-sm text-muted-foreground">(optional)</span>
                  </span>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="mt-1 w-full border-0 border-b-2 border-foreground/40 bg-transparent py-2 font-serif outline-none transition-colors focus:border-primary"
                  />
                </label>
              </div>
              <p className="font-serif text-sm leading-relaxed text-muted-foreground">
                By sharing your phone number you agree to receive occasional
                text updates from COFY. Message and data rates may apply;
                reply STOP to opt out.
              </p>
              <label className="flex items-start gap-3 font-serif">
                <input required type="checkbox" name="terms" className="mt-1 h-5 w-5 accent-primary" />
                <span>Yes, I agree to the Terms of Service.</span>
              </label>
              <Button type="submit" size="lg">
                Submit
                <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* 8 — Yellow Programs block + program cards (spec section 8) */}
      <section className="relative overflow-hidden bg-secondary py-20 text-secondary-foreground lg:py-24">
        <Sunburst className="absolute -top-4 left-8 w-48 text-black/20" />
        <div className="container-cofy">
          <p className="eyebrow font-display text-black/60">Programs</p>
          <h2 className="mt-2 max-w-3xl font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
            Empowering the next generation
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {cardPrograms.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Link to={`/programs/${p.slug}`} className="group block bg-white p-4">
                  <div className="overflow-hidden">
                    <PhotoImg
                      id={p.art as "education" | "outreach" | "mentorship"}
                      className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-medium leading-tight tracking-tight text-foreground group-hover:text-primary">
                    {p.title}
                  </h3>
                  <span className="mb-1 mt-2 inline-flex items-center gap-2 font-display text-lg text-primary">
                    Learn more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <Link to="/programs">
                View all projects
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              <Link to="/events">
                What's on{nextEvents[0] ? ` — next: ${formatDate(nextEvents[0].date, { month: "short", day: "numeric", year: undefined })}` : ""}
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border bg-background py-20 lg:py-24">
        <div className="container-cofy">
          <p className="eyebrow font-display">Reviews</p>
          <h2 className="mt-2 max-w-3xl font-display text-5xl font-medium leading-none tracking-tight sm:text-6xl">
            What our community says
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <figure className="border-l-4 border-secondary pl-6">
                  <blockquote className="font-serif text-xl leading-relaxed">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-4 font-display text-lg uppercase tracking-wide text-muted-foreground">
                    — {t.name}, {t.role}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9 — DONATE TODAY banner (cobalt) */}
      <section className="relative overflow-hidden bg-primary py-24 text-center text-white lg:py-32">
        <Sunburst className="absolute -top-8 left-1/2 w-72 -translate-x-1/2 text-white/20" />
        <div className="container-cofy relative">
          <h2 className="font-display text-6xl font-medium uppercase leading-[0.9] tracking-[-0.01em] sm:text-8xl lg:text-[8.5rem]">
            Donate Today
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-serif text-xl leading-relaxed text-white/90">
            Join us in creating brighter futures for youth and families in
            need. Every donation counts.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-9 border-white bg-white text-primary hover:bg-transparent hover:text-white"
          >
            <Link to="/get-involved">
              <Heart className="mr-1 h-5 w-5" />
              Donate
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
