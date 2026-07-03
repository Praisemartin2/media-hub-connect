import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/art/Illustration";

/**
 * Editorial type-first hero: massive statement typography on a white
 * canvas, followed by a full-bleed media band (muted looping video with
 * captions and a pause control; illustrated poster fallback).
 */
export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const videoSrc = `${import.meta.env.BASE_URL}media/hero-video.webm`;
  const posterSrc = `${import.meta.env.BASE_URL}media/hero-poster.png`;
  const captionSrc = `${import.meta.env.BASE_URL}media/hero-video.vtt`;

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    setReducedMotion(!!mq?.matches);
    if (mq?.matches) videoRef.current?.pause();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="bg-background">
      {/* Statement */}
      <div className="container-cofy pb-14 pt-16 sm:pt-24 lg:pb-20 lg:pt-28">
        <p className="eyebrow animate-fade-up">
          Creating Opportunities for Youth Inc.
        </p>
        <h1 className="mt-6 max-w-5xl animate-fade-up font-display text-6xl font-black leading-[0.95] tracking-[-0.03em] text-foreground sm:text-8xl lg:text-[7.5rem]">
          Helping{" "}
          <span className="relative inline-block text-primary">
            Together
            <span
              className="absolute -bottom-1 left-0 h-[0.08em] w-full bg-secondary"
              aria-hidden
            />
          </span>
          .
        </h1>
        <p className="mt-4 animate-fade-up text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          (2 Corinthians 1:11)
        </p>

        <div className="mt-10 flex animate-fade-up flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-xl text-xl leading-relaxed text-muted-foreground sm:text-2xl">
            We support youth with special needs and their families through
            educational programs and service providers.
          </p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-none px-8 text-base font-bold">
              <Link to="/get-involved">
                <Heart className="mr-1.5 h-5 w-5" />
                Donate
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-none border-foreground/25 px-8 text-base font-bold hover:bg-foreground hover:text-background"
            >
              <Link to="/get-involved#volunteer">
                Get Involved
                <ArrowRight className="ml-1.5 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Full-bleed media band */}
      <div className="relative h-[58svh] min-h-[380px] w-full overflow-hidden bg-brand-blue-deep lg:h-[72svh]">
        {videoOk ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            className="h-full w-full object-cover"
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoOk(false)}
            aria-label="COFY brand film: a golden path rises toward a glowing lightbulb"
          >
            <track kind="captions" src={captionSrc} srcLang="en" label="English" default />
          </video>
        ) : (
          <Illustration variant="hero" label="" className="h-full w-full" />
        )}

        {videoOk && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="absolute bottom-5 right-5 z-10 flex h-11 w-11 items-center justify-center border border-white/40 bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
          </button>
        )}
      </div>
    </section>
  );
}
