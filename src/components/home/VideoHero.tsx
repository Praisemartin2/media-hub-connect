import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Illustration } from "@/components/art/Illustration";
import { heroFilm, photos, plateFallback } from "@/data/photos";

/**
 * Full-viewport hero carousel: rotating media slides (film + photos)
 * behind a constant two-tone condensed headline, with prev / pause /
 * next controls. Auto-advance pauses with the control and under
 * prefers-reduced-motion.
 */

type Slide =
  | { kind: "video"; src: string; fallback: string; label: string }
  | { kind: "image"; id: keyof typeof photos };

const SLIDES: Slide[] = [
  {
    kind: "video",
    src: heroFilm,
    fallback: `${import.meta.env.BASE_URL}media/hero-video.webm`,
    label: "Film of children of varied abilities learning with caring mentors in a sunlit library",
  },
  { kind: "image", id: "community" },
  { kind: "image", id: "outreach" },
  { kind: "image", id: "mentorship" },
];

const ROTATE_MS = 6000;

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoStep, setVideoStep] = useState(0); // 0 = CDN film, 1 = local, 2 = dead
  const [imgFallback, setImgFallback] = useState<Record<string, boolean>>({});

  const captionSrc = `${import.meta.env.BASE_URL}media/hero-video.vtt`;
  const posterSrc = `${import.meta.env.BASE_URL}media/hero-poster.png`;

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setReducedMotion(true);
      setPlaying(false);
    }
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!playing || reducedMotion) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [playing, reducedMotion]);

  // Keep the film in sync with play state / active slide
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (index === 0 && playing && !reducedMotion) v.play().catch(() => {});
    else v.pause();
  }, [index, playing, reducedMotion]);

  const prev = useCallback(() => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % SLIDES.length), []);

  return (
    <section className="relative isolate flex min-h-[calc(100svh-110px)] items-end overflow-hidden bg-brand-blue-deep text-white">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          )}
        >
          {slide.kind === "video" ? (
            videoStep < 2 ? (
              <video
                ref={videoRef}
                src={videoStep === 0 ? slide.src : slide.fallback}
                poster={posterSrc}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="metadata"
                onError={() => setVideoStep((s) => s + 1)}
                aria-label={slide.label}
              >
                <track kind="captions" src={captionSrc} srcLang="en" label="English" default />
              </video>
            ) : (
              <Illustration variant="hero" label="" className="h-full w-full" />
            )
          ) : imgFallback[slide.id] ? (
            <img src={plateFallback(slide.id)} alt="" className="h-full w-full object-cover" />
          ) : (
            <img
              src={photos[slide.id].min}
              alt={photos[slide.id].alt}
              className="h-full w-full object-cover"
              loading={i === 1 ? "eager" : "lazy"}
              onError={() => setImgFallback((f) => ({ ...f, [slide.id]: true }))}
            />
          )}
        </div>
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        aria-hidden
      />

      {/* Statement */}
      <div className="container-cofy relative pb-16 pt-40 lg:pb-24">
        <h1 className="animate-fade-up font-display text-6xl font-medium uppercase leading-[0.9] tracking-[-0.015em] sm:text-8xl lg:text-[9rem]">
          Helping
          <br />
          <span className="text-secondary">Together.</span>
        </h1>
        <p className="mt-3 animate-fade-up font-serif text-sm uppercase tracking-[0.18em] text-white/70">
          (2 Corinthians 1:11)
        </p>
        <div className="mt-8 flex animate-fade-up flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl font-serif text-xl leading-relaxed text-white/90">
            We support youth with special needs and their families through
            educational programs and service providers.
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/get-involved">
                <Heart className="mr-1 h-5 w-5" />
                Donate
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-foreground"
            >
              <Link to="/get-involved#volunteer">
                Get Involved
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel controls: prev / pause / next */}
      <div
        className="absolute right-5 top-5 z-10 flex items-center gap-px"
        role="group"
        aria-label="Hero slideshow controls"
      >
        {[
          { icon: ChevronLeft, label: "Previous slide", onClick: prev },
          {
            icon: playing ? Pause : Play,
            label: playing ? "Pause slideshow" : "Play slideshow",
            onClick: () => setPlaying((p) => !p),
          },
          { icon: ChevronRight, label: "Next slide", onClick: next },
        ].map(({ icon: Icon, label, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center border border-white/40 bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/65 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            <Icon className="h-5 w-5" />
          </button>
        ))}
      </div>

      {/* Slide indicator */}
      <div className="absolute bottom-5 right-5 z-10 flex gap-2" aria-hidden>
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-6 transition-colors",
              i === index ? "bg-secondary" : "bg-white/35",
            )}
          />
        ))}
      </div>
    </section>
  );
}
