import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, Heart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { StatCounter } from "@/components/shared/StatCounter";
import { SEO } from "@/components/shared/SEO";
import { Illustration } from "@/components/art/Illustration";
import { MediaCard } from "@/components/cards/MediaCard";
import { programs } from "@/data/programs";
import { mediaItems } from "@/data/media";

/**
 * Obama.org-style rich program landing page: full-bleed hero,
 * narrative, impact stat, voice from the program, and a clear
 * "how to help" call to action.
 */
const ProgramDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const program = programs.find((p) => p.slug === slug);

  if (!program) return <Navigate to="/programs" replace />;

  const related = mediaItems.slice(0, 3);
  const others = programs.filter((p) => p.slug !== program.slug);

  return (
    <>
      <SEO
        title={`${program.title} — COFY Programs`}
        description={program.summary}
      />

      {/* Full-bleed hero */}
      <section className="relative isolate flex min-h-[62svh] items-end overflow-hidden bg-brand-blue-deep text-white">
        <div className="absolute inset-0">
          <Illustration variant={program.art} label="" />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/50 to-transparent"
          aria-hidden
        />
        <div className="container-cofy relative pb-14 pt-32">
          <Link
            to="/programs"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            All Programs
          </Link>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-secondary text-secondary-foreground shadow-lg">
              <program.icon className="h-7 w-7" />
            </span>
            <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {program.title}
            </h1>
          </div>
          <p className="mt-4 max-w-2xl text-lg text-white/85 sm:text-xl">
            {program.summary}
          </p>
        </div>
      </section>

      {/* Narrative + impact */}
      <section className="py-16 lg:py-24">
        <div className="container-cofy grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                What this program does
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {program.description}
              </p>
              <ul className="mt-8 space-y-4">
                {program.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-lg font-medium text-foreground">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={80}>
              <div className="rounded-lg bg-primary p-8 text-center text-white">
                <p className="font-display text-5xl font-extrabold text-secondary">
                  <StatCounter value={program.stat.value} suffix={program.stat.suffix} />
                </p>
                <p className="mt-2 text-white/85">{program.stat.label}</p>
              </div>
            </Reveal>
            <Reveal delay={140}>
              <figure className="rounded-lg border border-border bg-card p-8">
                <Quote className="h-8 w-8 text-secondary" />
                <blockquote className="mt-3 text-lg leading-relaxed">
                  "{program.quote.text}"
                </blockquote>
                <figcaption className="mt-4 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{program.quote.name}</span>
                  {" · "}
                  {program.quote.role}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How to help */}
      <section className="bg-brand-cream py-16 lg:py-20">
        <div className="container-cofy">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-brand-blue-deep p-8 text-white sm:p-12 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="font-display text-2xl font-bold sm:text-3xl">
                  How you can help
                </h2>
                <p className="mt-3 text-lg text-white/85">{program.engage}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-none bg-secondary px-7 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
                >
                  <Link to="/get-involved">
                    <Heart className="mr-1 h-5 w-5" />
                    Support this program
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-none border-white/35 bg-white/5 px-7 font-semibold text-white hover:bg-white/15 hover:text-white"
                >
                  <Link to="/contact">
                    Ask a question
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 lg:py-24">
        <div className="container-cofy">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              Stories from our community
            </h2>
            <Button asChild variant="outline" className="rounded-none font-semibold">
              <Link to="/media">
                Media Hub
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item, i) => (
              <Reveal key={item.id} delay={i * 80}>
                <MediaCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other programs */}
      <section className="border-t border-border py-14">
        <div className="container-cofy">
          <h2 className="mb-8 font-display text-xl font-bold text-muted-foreground">
            Explore more programs
          </h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {others.map((p) => (
              <Link
                key={p.slug}
                to={`/programs/${p.slug}`}
                className="card-lift group flex items-center gap-4 rounded-lg border border-border bg-card p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="font-display font-bold transition-colors group-hover:text-primary">
                  {p.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramDetail;
