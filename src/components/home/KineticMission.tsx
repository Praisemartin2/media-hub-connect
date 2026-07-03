import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const WORDS =
  "We support youth with special needs and their families — helping them thrive in the real world.".split(
    " ",
  );

/**
 * Kinetic mission statement: words reveal progressively as the block
 * scrolls into view. Respects prefers-reduced-motion (renders instantly).
 */
export function KineticMission() {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="border-y border-border bg-background py-24 lg:py-36">
      <div className="container-cofy">
        <p className="eyebrow mb-8 font-display">Our Mission</p>
        <p className="max-w-6xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          {WORDS.map((w, i) => (
            <span
              key={i}
              style={{ transitionDelay: `${i * 55}ms` }}
              className={cn(
                "mr-[0.28em] inline-block transition-all duration-500 ease-smooth",
                on ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0",
                (w === "youth" || w === "thrive") && "text-primary",
                w === "families" && "text-primary",
              )}
            >
              {w}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
