import type { ReactNode } from "react";
import { AppSidebar, MobileNav } from "./AppSidebar";
import { NowPlayingBar } from "@/components/media/NowPlayingBar";

interface AppLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AppLayout({ title, description, children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <main className="relative flex-1 overflow-y-auto">
          {/* Ambient brand glow at the top of the content area. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-64"
            style={{ backgroundImage: "var(--gradient-glow)" }}
          />
          <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6">
            <header className="mb-8">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              )}
            </header>
            {children}
          </div>
        </main>

        <NowPlayingBar />
        <MobileNav />
      </div>
    </div>
  );
}
