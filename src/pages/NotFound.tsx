import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/cofy-logo.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-blue-deep px-6 text-center text-white">
      <div className="absolute inset-0 bg-hero-radial" aria-hidden />
      <div className="absolute inset-0 bg-grid-soft opacity-[0.12]" aria-hidden />
      <div className="relative max-w-md">
        <img
          src={logo}
          alt="COFY inc. logo"
          className="mx-auto mb-8 h-20 w-20 rounded-2xl shadow-2xl ring-1 ring-white/20"
        />
        <p className="font-display text-7xl font-extrabold text-secondary">404</p>
        <h1 className="mt-4 font-display text-2xl font-bold">
          We couldn't find that page
        </h1>
        <p className="mt-3 text-white/70">
          The page may have moved — but there's plenty of opportunity to explore.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-secondary font-bold text-secondary-foreground hover:bg-brand-yellow-light"
          >
            <Link to="/">
              <Home className="mr-1 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/30 bg-white/5 font-semibold text-white hover:bg-white/15 hover:text-white"
          >
            <Link to="/media">
              <Compass className="mr-1 h-5 w-5" />
              Visit Media Hub
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
