import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, Accessibility, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/cofy-logo.png";
import { impactStats } from "@/data/site";
import { StatCounter } from "@/components/shared/StatCounter";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-blue-deep text-white">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-hero-radial" aria-hidden />
      <div className="absolute inset-0 bg-grid-soft opacity-[0.15]" aria-hidden />
      <div
        className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-primary/40 blur-3xl"
        aria-hidden
      />

      <div className="container-cofy relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
            <Sparkles className="h-4 w-4 text-secondary" />
            Creating Opportunities for Youth Inc.
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Every young person{" "}
            <span className="relative whitespace-nowrap text-secondary">
              deserves
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 9C75 3 225 3 298 9"
                  stroke="hsl(var(--brand-yellow))"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            a real opportunity.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
            We provide transformational education and support to those who need
            it most — empowering youth with developmental delays and their
            families to thrive in the real world.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-secondary px-7 text-base font-bold text-secondary-foreground shadow-lg shadow-black/20 hover:bg-brand-yellow-light"
            >
              <Link to="/get-involved">
                <Heart className="mr-1 h-5 w-5" />
                Support Our Mission
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/30 bg-white/5 px-7 text-base font-semibold text-white backdrop-blur hover:bg-white/15 hover:text-white"
            >
              <Link to="/programs">
                Explore Programs
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Mini trust row */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/70">
            <span className="inline-flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-secondary" />
              Inclusive by design
            </span>
            <span className="inline-flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-secondary" />
              Strengths-based care
            </span>
          </div>
        </div>

        {/* Logo showcase */}
        <div className="relative mx-auto w-full max-w-md animate-fade-in lg:max-w-none">
          <div className="relative aspect-square">
            <div className="absolute inset-6 animate-float rounded-[2.5rem] bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={logo}
                alt="Creating Opportunities for Youth Inc. logo"
                className="w-2/3 rounded-[2rem] shadow-2xl ring-1 ring-white/20"
              />
            </div>
            {/* floating badges */}
            <div className="absolute right-2 top-6 animate-float rounded-2xl bg-white px-4 py-3 text-primary shadow-xl [animation-delay:-2s]">
              <p className="font-display text-2xl font-extrabold leading-none">
                <StatCounter value={350} suffix="+" />
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                Youth supported
              </p>
            </div>
            <div className="absolute bottom-8 left-0 animate-float rounded-2xl bg-secondary px-4 py-3 text-secondary-foreground shadow-xl [animation-delay:-4s]">
              <p className="font-display text-2xl font-extrabold leading-none">
                <StatCounter value={48} />
              </p>
              <p className="text-xs font-semibold">Scholarships</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-black/15 backdrop-blur">
        <div className="container-cofy grid grid-cols-2 gap-6 py-8 lg:grid-cols-4">
          {impactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-extrabold text-secondary sm:text-4xl">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
