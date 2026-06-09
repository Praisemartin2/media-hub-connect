# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project status

This is a [Lovable](https://lovable.dev)-generated starter scaffold (Vite + React + TypeScript + shadcn/ui). It is currently a **blank template**: `src/pages/Index.tsx` renders only a placeholder image and is meant to be fully replaced with the real application. Treat `Index.tsx` as a throwaway entry point — replace its entire contents when building features rather than wrapping the placeholder.

## Commands

Package manager: **Bun** is used for the lockfile (`bun.lockb`), but `package-lock.json` is also committed, so `npm` works too. Use whichever is available.

- `npm run dev` — start the Vite dev server on port **8080** (host `::`, HMR overlay disabled)
- `npm run build` — production build
- `npm run build:dev` — build in development mode (unminified, with the Lovable component tagger)
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the production build locally
- `npm run test` — run the Vitest suite once
- `npm run test:watch` — run Vitest in watch mode
- Run a single test file: `npx vitest run src/test/example.test.ts`
- Filter tests by name: `npx vitest run -t "test name substring"`

There is no separate typecheck script; rely on `npm run build` and the editor for type errors.

## Architecture

Standard single-page React app bootstrapped by `src/main.tsx` → `src/App.tsx`. `App.tsx` is the composition root and wires up, in order:

1. `QueryClientProvider` (TanStack Query) — a single `QueryClient` instance for server state / data fetching
2. `TooltipProvider` (Radix)
3. Two toast systems mounted side by side: `Toaster` (shadcn/Radix toast) and `Sonner` (the `sonner` library)
4. `BrowserRouter` with `Routes`

**Routing:** Add new routes in `App.tsx` *above* the catch-all `<Route path="*" element={<NotFound />} />` line — routes after it are unreachable. Pages live in `src/pages/`.

**Directory layout under `src/`:**
- `pages/` — route-level components (`Index`, `NotFound`)
- `components/ui/` — the full shadcn/ui component library (pre-generated; ~50 Radix-based primitives). Prefer composing these over adding new UI dependencies.
- `components/` — app-specific shared components (e.g. `NavLink.tsx`)
- `hooks/` — reusable hooks (`use-mobile`, `use-toast`)
- `lib/utils.ts` — utilities, notably `cn()` for merging Tailwind classes
- `test/` — Vitest setup (`setup.ts`) and tests

## Conventions

- **Imports:** use the `@/` alias for `src/` (e.g. `import { cn } from "@/lib/utils"`). Configured in `vite.config.ts`, `vitest.config.ts`, and `tsconfig.json`.
- **Styling:** Tailwind CSS only. The design system is defined entirely in `src/index.css` as HSL CSS variables and surfaced as Tailwind tokens in `tailwind.config.ts`. Use semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-primary`, etc.) rather than hardcoded colors. **All colors must be HSL.** Dark mode is class-based (`.dark`).
- **Class composition:** always merge conditional/variant classes with `cn(...)` from `@/lib/utils`.
- **Toasts:** two systems coexist — use `useToast()` from `@/hooks/use-toast` for the shadcn toaster, or import from `sonner` for Sonner. Pick one per feature.
- **TypeScript is intentionally loose:** `strictNullChecks`, `noImplicitAny`, `noUnusedLocals`, and `noUnusedParameters` are all relaxed (see `tsconfig.json`). ESLint also disables `@typescript-eslint/no-unused-vars`. Don't fight the config; follow the existing relaxed style.
- **shadcn/ui:** configured via `components.json` (style `default`, base color `slate`, no class prefix). Add new components with the shadcn CLI so they land in `components/ui/` with consistent conventions.

## Testing

Vitest with `jsdom`, globals enabled, and `@testing-library/react` + `@testing-library/jest-dom`. Global setup in `src/test/setup.ts` stubs `window.matchMedia`. Test files match `src/**/*.{test,spec}.{ts,tsx}`.

## Lovable integration

This project syncs with the Lovable platform. The `lovable-tagger` Vite plugin runs only in development mode to tag components for the Lovable editor. Changes pushed to the repo and edits made in Lovable are bidirectional, so keep commits focused and conventional.
