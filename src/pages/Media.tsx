import { useMemo, useState } from "react";
import { Video, PenLine, Newspaper, Radio } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/shared/Reveal";
import { MediaCard } from "@/components/cards/MediaCard";
import { SEO } from "@/components/shared/SEO";
import { cn } from "@/lib/utils";
import { mediaItems, mediaFilters, type MediaType } from "@/data/media";

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
        eyebrow="Media Hub"
        title="Daily vlogs, stories & the latest news"
        description="One home for everything happening at COFY — fresh vlogs, helpful blogs and community news, updated all the time."
      >
        <div className="flex flex-wrap gap-4">
          {(Object.keys(typeMeta) as MediaType[]).map((t) => {
            const meta = typeMeta[t];
            return (
              <div
                key={t}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <meta.icon className="h-5 w-5" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-bold text-white">
                    {meta.label}
                  </span>
                  <span className="block text-xs text-white/70">{meta.blurb}</span>
                </span>
              </div>
            );
          })}
        </div>
      </PageHero>

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
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
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
