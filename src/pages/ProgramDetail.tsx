import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, ArrowLeft, ArrowUpRight, CheckCircle2, Heart, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { StatCounter } from "@/components/shared/StatCounter";
import { SEO } from "@/components/shared/SEO";
import { photos, plateFallback } from "@/data/photos";
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

      {/* Light header + photo band */}
      <section className="border-b border-border bg-background">
        <div className="container-cofy pb-10 pt-12 lg:pt-16">
          <Link
            to="/programs"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Projects
          </Link>
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center bg-secondary text-secondary-foreground">
              <program.icon className="h-7 w-7" />
            </span>
            <h1 className="font-display text-4xl font-medium tracking-tight sm:text-6xl lg:text-7xl">
              {program.title}
            </h1>
          </div>
          <p className="mt-5 max-w-2xl font-serif text-xl leading-relaxed text-muted-foreground">
            {program.summary}
          </p>
        </div>
        <div className="h-[42svh] min-h-[300px] w-full overflow-hidden lg:h-[56svh]">
          <img
            src={photos[program.art as keyof typeof photos]?.min ?? plateFallback(program.art as never)}
            alt={photos[program.art as keyof typeof photos]?.alt ?? ""}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = plateFallback(program.art as never);
            }}
          />
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
            <div className="flex flex-col items-start justify-between gap-6 bg-brand-sky p-8 sm:p-12 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-medium sm:text-4xl">
                  How you can help
                </h2>
                <p className="mt-3 font-serif text-lg text-foreground/80">{program.engage}</p>
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
                {program.campaign && (
                  <Button asChild size="lg" variant="outline">
                    <Link to={program.campaign.to}>
                      {program.campaign.label}
                      <ArrowRight className="ml-1 h-5 w-5" />
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  size="lg"
                  variant="outline"
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

      {/* Find help in New Jersey */}
      {program.resources && program.resources.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="container-cofy">
            <Reveal>
              <div className="max-w-3xl">
                <p className="eyebrow font-display">Find Help in New Jersey</p>
                <h2 className="mt-2 font-display text-3xl font-medium sm:text-4xl">
                  Resources you can reach today
                </h2>
                <p className="mt-4 font-serif text-lg text-muted-foreground">
                  Trusted New Jersey organizations and state services related to
                  this program. Every link opens the organization's own site.
                </p>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {program.resources.map((r, i) => (
                <Reveal key={r.url} delay={(i % 2) * 80}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="card-lift group flex h-full flex-col rounded-lg border border-border bg-card p-7 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-primary">
                        {r.name}
                      </h3>
                      <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {r.blurb}
                    </p>
                    <span className="mt-4 text-xs font-semibold text-primary">
                      {new URL(r.url).hostname.replace("www.", "")}
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stories */}
      <section className="border-t border-border py-16 lg:py-24">
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
