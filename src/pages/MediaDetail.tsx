import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/shared/Reveal";
import { SEO } from "@/components/shared/SEO";
import { Illustration } from "@/components/art/Illustration";
import { MediaCard, typeIcon, typeLabel } from "@/components/cards/MediaCard";
import { formatDate } from "@/lib/format";
import { photos, plateFallback } from "@/data/photos";
import { mediaItems } from "@/data/media";

/**
 * Story/article page for a Media Hub item: light header, photo or
 * illustration banner, article body, original-source callout when the
 * piece lives on cofyouth.org, CTA band, and related stories.
 */
const MediaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const item = mediaItems.find((m) => m.id === id);

  if (!item) return <Navigate to="/media" replace />;

  const Icon = typeIcon[item.type];
  const photo = item.art in photos ? photos[item.art as keyof typeof photos] : undefined;
  const related = mediaItems
    .filter((m) => m.id !== item.id)
    .sort((a, b) => Number(b.type === item.type) - Number(a.type === item.type))
    .slice(0, 3);

  return (
    <>
      <SEO title={`${item.title} — COFY Stories`} description={item.excerpt} />

      {/* Header */}
      <section className="border-b border-border bg-background">
        <div className="container-cofy pb-10 pt-12 lg:pt-16">
          <Link
            to="/media"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Stories
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-muted-foreground">
            <Badge className="gap-1.5 border-0 bg-primary/10 font-semibold text-primary">
              <Icon className="h-3.5 w-3.5" />
              {typeLabel[item.type]}
            </Badge>
            <span className="font-semibold text-primary">{item.category}</span>
            <span aria-hidden>•</span>
            <time dateTime={item.date}>{formatDate(item.date)}</time>
            {item.readTime && (
              <>
                <span aria-hidden>•</span>
                <span>{item.readTime}</span>
              </>
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl">
            {item.title}
          </h1>
          <p className="mt-5 text-sm font-medium text-muted-foreground">By {item.author}</p>
        </div>

        {/* Banner */}
        {photo ? (
          <div className="h-[42svh] min-h-[280px] w-full overflow-hidden lg:h-[52svh]">
            <img
              src={photo.min}
              alt={photo.alt}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = plateFallback(item.art as never);
              }}
            />
          </div>
        ) : (
          <div
            className={cn(
              "relative h-[38svh] min-h-[260px] w-full overflow-hidden bg-gradient-to-br",
              item.gradient,
            )}
          >
            <Illustration variant={item.art} label="" className="h-full w-full" />
          </div>
        )}
      </section>

      {/* Body */}
      <section className="py-16 lg:py-20">
        <div className="container-cofy">
          <Reveal>
            <div className="max-w-3xl">
              {(item.body ?? [item.excerpt]).map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mt-6 first:mt-0 font-serif text-lg leading-relaxed text-foreground/80"
                >
                  {p}
                </p>
              ))}

              {item.sourceUrl && (
                <div className="mt-10 rounded-lg border border-border bg-card p-6">
                  <p className="font-display text-lg font-bold">
                    This is an excerpt.
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    The full post lives on our main site.
                  </p>
                  <Button asChild variant="outline" className="mt-4 h-auto whitespace-normal py-2.5 text-left">
                    <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                      Read the original on cofyouth.org
                      <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-cream py-16 lg:py-20">
        <div className="container-cofy">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 bg-brand-sky p-8 sm:p-12 lg:flex-row lg:items-center">
              <div className="max-w-2xl">
                <h2 className="font-display text-3xl font-medium sm:text-4xl">
                  Be part of the next story
                </h2>
                <p className="mt-3 font-serif text-lg text-foreground/80">
                  Donate, volunteer or partner with us to create opportunities
                  for youth and their families.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="rounded-none bg-secondary px-7 font-bold text-secondary-foreground hover:bg-brand-yellow-light"
                >
                  <Link to="/get-involved">Get Involved</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/contact">
                    Contact us
                    <ArrowRight className="ml-1 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      <section className="py-16 lg:py-24">
        <div className="container-cofy">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              More stories
            </h2>
            <Button asChild variant="outline" className="rounded-none font-semibold">
              <Link to="/media">
                Media Hub
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((m, i) => (
              <Reveal key={m.id} delay={i * 80}>
                <MediaCard item={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default MediaDetail;
