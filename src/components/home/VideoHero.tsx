import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, Pause, Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/art/Illustration";
import logo from "@/assets/cofy-logo.png";

/**
 * Obama.org-style full-bleed video hero, adapted to COFY's brand and
 * accessibility bar. Plays public/media/hero-video.mp4 when present
 * (muted, looping, captioned); until then it shows the animated brand
 * illustration poster. Motion is disabled for prefers-reduced-motion.
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
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-brand-blue-deep text-white">
      {/* Media layer */}
      <div className="absolute inset-0" aria-hidden={videoOk ? undefined : true}>
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
            aria-label="Youth and mentors learning and playing together at COFY programs"
          >
            <track kind="captions" src={captionSrc} srcLang="en" label="English" default />
          </video>
        ) : (
          <Illustration variant="hero" label="" className="h-full w-full" />
        )}
      </div>

      {/* Legibility scrim */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-blue-deep via-brand-blue-deep/55 to-brand-blue-deep/20"
        aria-hidden
      />

      {/* Content */}
      <div className="container-cofy relative pb-20 pt-36 lg:pb-28">
        <div className="max-w-3xl">
          <img
            src={logo}
            alt="Creating Opportunities for Youth Inc. logo"
            width={72}
            height={72}
            className="mb-7 h-16 w-16 rounded-2xl shadow-2xl ring-1 ring-white/25 sm:h-[72px] sm:w-[72px]"
          />
          <h1 className="font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
            Every young person can{" "}
            <span className="text-secondary">thrive</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">
            COFY gives youth with developmental delays — and their families —
            the education, support and belief they need to thrive in the real
            world.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-secondary px-8 text-base font-bold text-secondary-foreground shadow-lg shadow-black/25 hover:bg-brand-yellow-light"
            >
              <Link to="/get-involved">
                <Heart className="mr-1 h-5 w-5" />
                Donate
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/35 bg-white/5 px-8 text-base font-semibold text-white backdrop-blur hover:bg-white/15 hover:text-white"
            >
              <Link to="/get-involved#volunteer">
                Get Involved
                <ArrowRight className="ml-1 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Video pause control (WCAG 2.2.2) */}
      {videoOk && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="absolute bottom-6 right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
        </button>
      )}

      {/* Scroll cue */}
      <a
        href="#mission"
        aria-label="Scroll to our mission"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-white/70 transition-colors hover:text-white lg:block"
      >
        <ChevronDown className="h-7 w-7 animate-bounce motion-reduce:animate-none" />
      </a>
    </section>
  );
}
