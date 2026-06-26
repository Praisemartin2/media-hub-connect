import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-blue-deep text-white">
      <div className="absolute inset-0 bg-hero-radial" aria-hidden />
      <div className="absolute inset-0 bg-grid-soft opacity-[0.12]" aria-hidden />
      <div className="container-cofy relative py-16 lg:py-24">
        <nav className="mb-5 flex items-center gap-1.5 text-sm text-white/60">
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/90">{eyebrow ?? title}</span>
        </nav>
        {eyebrow && (
          <span className="eyebrow mb-4 bg-white/15 text-white">{eyebrow}</span>
        )}
        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
