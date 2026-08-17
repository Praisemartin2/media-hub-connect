import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/art/Illustration";
import { heroFilm } from "@/data/photos";

/**
 * Full-viewport hero: the COFY film behind the two-tone condensed
 * headline, with a play/pause control (WCAG 2.2.2), captions, and a
 * CDN film -> local film -> illustration fallback chain.
 */
export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoStep, setVideoStep] = useState(0); // 0 = CDN film, 1 = local, 2 = illustration

  const localSrc = `${import.meta.env.BASE_URL}media/hero-video.webm`;
  const posterSrc = `${import.meta.env.BASE_URL}media/hero-poster.png`;
  const captionSrc = `${import.meta.env.BASE_URL}media/hero-video.vtt`;
  const sources = [heroFilm, localSrc];

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (mq?.matches) {
      setReducedMotion(true);
      setPlaying(false);
      videoRef.current?.pause();
    }
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="relative isolate flex min-h-[calc(100svh-110px)] items-end overflow-hidden bg-brand-blue-deep text-white">
      <div className="absolute inset-0">
        {videoStep < 2 ? (
          <video
            ref={videoRef}
            src={sources[videoStep]}
            poster={posterSrc}
            className="h-full w-full object-cover"
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoStep((s) => s + 1)}
            aria-label="Film of children of varied abilities learning with caring mentors in a sunlit library"
          >
            <track kind="captions" src={captionSrc} srcLang="en" label="English" default />
          </video>
        ) : (
          <Illustration variant="hero" label="" className="h-full w-full" />
        )}
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
        aria-hidden
      />

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

      {videoStep < 2 && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center border border-white/40 bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-dashed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
      )}
    </section>
  );
}
