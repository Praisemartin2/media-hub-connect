import { Link } from "react-router-dom";
import logo from "@/assets/cofy-logo.png";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Show the wordmark text next to the mark */
  showText?: boolean;
  /** Use light text (for dark backgrounds) */
  light?: boolean;
};

export function Logo({ className, showText = true, light = false }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Creating Opportunities for Youth — Home"
      className={cn("group flex items-center gap-3", className)}
    >
      <img
        src={logo}
        alt="COFY inc. logo"
        width={48}
        height={48}
        className="h-11 w-11 rounded-xl object-cover shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12"
      />
      {showText && (
        <span className="leading-tight">
          <span
            className={cn(
              "block font-display text-sm font-extrabold tracking-tight sm:text-base",
              light ? "text-white" : "text-primary",
            )}
          >
            Creating Opportunities
          </span>
          <span
            className={cn(
              "block font-display text-xs font-semibold tracking-wide",
              light ? "text-white/70" : "text-muted-foreground",
            )}
          >
            for Youth Inc.
          </span>
        </span>
      )}
    </Link>
  );
}
