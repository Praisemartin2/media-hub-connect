import { useMemo, useState } from "react";
import { Video, PenLine, Newspaper, Radio, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { MediaCard } from "@/components/cards/MediaCard";
import { IgPostCard } from "@/components/cards/IgPostCard";
import { SEO } from "@/components/shared/SEO";
import { cn } from "@/lib/utils";
import { mediaItems, mediaFilters, type MediaType } from "@/data/media";
import { igPosts } from "@/data/ig";

const typeMeta: Record<MediaType, { icon: typeof Video; label: string; blurb: string }> = {
  vlog: { icon: Video, label: "Daily Vlogs", blurb: "Behind-the-scenes moments" },
  blog: { icon: PenLine, label: "Blog", blurb: "Tips, guides & insights" },
  news: { icon: Newspaper, label: "News", blurb: "Announcements & updates" },
};

const Media = () => {
  const [filter, setFilter] = useState<MediaType | "all">("all");

  const featured = useMemo(() => mediaItems.find((m) => m.featured), []);
  const filtered = useMemo(() => {
    const base = mediaItems.filter((m) => m.id !== featured?.id);
    return filter === "all" ? base : base.filter((m) => m.type === filter);
  }, [filter, featured]);

  return (
    <>
      <SEO
        title="Media Hub — Vlogs, Blogs & News | COFY"
        description="Daily vlogs, blogs and news from Creating Opportunities for Youth. Go behind the scenes and stay up to date with our community."
      />
      <PageHero
        eyebrow="Stories"
        title="Daily vlogs, stories & the latest news"
        description="One home for everything happening at COFY — fresh vlogs, helpful blogs and community news, updated all the time."
      >
        <div className="flex flex-wrap gap-4">
          {(Object.keys(typeMeta) as MediaType[]).map((t) => {
            const meta = typeMeta[t];
            return (
              <div
                key={t}
                className="flex items-center gap-3 border border-border bg-card px-4 py-3"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <meta.icon className="h-5 w-5" />
                </span>
                <span className="text-left">
                  <span className="block font-display text-lg font-medium text-foreground">
                    {meta.label}
                  </span>
                  <span className="block font-serif text-sm text-muted-foreground">{meta.blurb}</span>
                </span>
              </div>
            );
          })}
        </div>
      </PageHero>

      {/* Opportunity Watch — auto-updating daily feed */}
      {igPosts.length > 0 && (
        <section className="border-b border-border bg-brand-cream py-16 lg:py-20">
          <div className="container-cofy">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow font-display">Opportunity Watch</p>
                <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                  Daily youth-opportunity news
                </h2>
                <p className="mt-3 max-w-2xl text-muted-foreground">
                  Every day we spotlight one real story about creating
                  opportunities for young people around the world — posted to
                  our Instagram.
                </p>
              </div>
              <a
                href="https://www.instagram.com/cofyinc"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                Follow @cofyinc
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {igPosts.slice(0, 6).map((p, i) => (
                <Reveal key={p.date} delay={(i % 3) * 80}>
                  <IgPostCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured */}
      {featured && (
        <section className="pt-16 lg:pt-20">
          <div className="container-cofy">
            <div className="mb-6 flex items-center gap-2">
              <Radio className="h-5 w-5 text-primary" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-primary">
                Featured · Latest Vlog
              </h2>
            </div>
            <Reveal>
              <MediaCard item={featured} featured />
            </Reveal>
          </div>
        </section>
      )}

      {/* Filter + grid */}
      <section className="py-16 lg:py-20">
        <div className="container-cofy">
          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap items-center gap-2.5">
            {mediaFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={cn(
                  "rounded-none px-5 py-2.5 text-sm font-semibold transition-all",
                  filter === f.value
                    ? "bg-primary text-white shadow-md shadow-primary/25"
                    : "border border-border bg-card text-foreground/70 hover:border-primary/40 hover:text-primary",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item, i) => (
                <Reveal key={item.id} delay={(i % 3) * 80}>
                  <MediaCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="py-16 text-center text-muted-foreground">
              No stories here yet — check back soon!
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Media;
