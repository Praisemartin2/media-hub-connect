import { useEffect, useRef, useState } from "react";

type StatCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

/** Counts up from 0 to `value` once it scrolls into view. */
export function StatCounter({ value, suffix = "", duration = 1600 }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutExpo
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setDisplay(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setDisplay(value);
      started.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && run(),
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
