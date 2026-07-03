import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** Light editorial page header: breadcrumb, eyebrow, oversized title. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="border-b border-border bg-background">
      <div className="container-cofy pb-14 pt-12 lg:pb-20 lg:pt-16">
        <nav className="mb-8 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-medium text-foreground">{eyebrow ?? title}</span>
        </nav>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <h1 className="max-w-4xl font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
        {children && <div className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
