# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UniqueStaysUSA is a curated affiliate directory of unique US vacation rentals (treehouses, domes, houseboats, lighthouses, etc.). It uses a **hub-and-spoke model**: a central homepage links out to 5 themed collection pages, each of which deep-links to listings on Airbnb, VRBO, Wander, and direct booking sites via affiliate URLs.

## Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Start dev server (Vite, port 3000)
pnpm build         # Build frontend (Vite) + server (esbuild) → dist/
pnpm start         # Run production Express server
pnpm check         # TypeScript type-check (no emit)
pnpm format        # Prettier formatting
```

There is no test script configured (vitest is installed but unused).

## Architecture

### Project Layout

```
client/src/          ← React 19 SPA (Vite root)
  pages/             ← One file per route
  components/        ← Navbar, Footer, StayCard, Map, etc.
  lib/stays-data.ts  ← ALL listing data + SPOKES config (single source of truth)
  contexts/          ← ThemeContext (currently locked to light mode)
  index.css          ← Design tokens + global styles (Tailwind v4 @theme inline)
server/index.ts      ← Minimal Express server (production static file serving only)
shared/const.ts      ← Constants shared between client and server
```

### Data Model

All 64 listings live in `client/src/lib/stays-data.ts` as the `STAYS: Stay[]` array — there is no database or CMS in the current implementation. This same file exports:
- `SPOKES: SpokeConfig[]` — metadata for each of the 5 spoke pages (accent colors, hero images, stats, SEO copy)
- `getStaysBySpoke(slug)` — filters `STAYS` by the `spokes` field
- `CATEGORIES`, `REGIONS` — used for directory filters

A `Stay` has a `spokes: SpokeSlug[]` field that determines which spoke pages it appears on. Spoke-specific attributes (`wifiSpeed`, `hasDesk`, `petFriendly`, `petPolicy`, `rvHookup`, `rvDetails`, `evCharger`, `evDetails`) are optional fields on the same object.

### Routing (Wouter)

| Path | Component |
|---|---|
| `/` | `Home` |
| `/unique`, `/work-friendly`, `/pet-friendly`, `/rv-ready`, `/ev-ready` | `SpokePage` (receives `slug` prop) |
| `/directory` | `Directory` |
| `/about` | `About` |
| `/submit` | `Submit` |
| `/design-system` | `DesignSystem` (visual style guide) |

`SpokePage` is a single reusable component that drives its UI entirely from `SPOKES` config + filtered `STAYS`. Adding a new spoke means adding an entry to `SPOKES` and a route in `App.tsx`.

### Server

`server/index.ts` is a thin Express wrapper that only serves the Vite-built static files. It has no API routes. In dev, Vite handles everything directly.

## Design System — "The Naturalist's Field Catalog"

> **Full spec**: see `DESIGN.md` at the repo root.
> **Visual style guide**: run the app and visit `/design-system`.

**Colors** use the oklch color space throughout — always as inline `style={{ color: '...' }}`, never Tailwind arbitrary color utilities:
- Parchment (background): `oklch(0.94 0.022 78)`
- Terracotta (primary): `oklch(0.55 0.14 38)`
- Botanical green (secondary): `oklch(0.40 0.10 148)`
- Ochre (accent): `oklch(0.68 0.12 68)`
- Charcoal (text): `oklch(0.22 0.01 60)`
- Sand (border): `oklch(0.88 0.025 75)`
- Warm white (cards): `oklch(0.99 0.005 85)`

Each spoke has its own `accentColor` and `accentColorLight` in `SpokeConfig`.

**Fonts** — three families with strict role separation. Loaded via Google Fonts in `client/index.html`. Applied via inline `style={{ fontFamily: '...' }}`, not Tailwind classes:
- **Bitter** (`'Bitter', Georgia, serif`) — all headings (H1–H6), card titles, price displays, editorial pull quotes
- **Alegreya** (`'Alegreya', Georgia, serif`) — all body prose: descriptions, subtitles, testimonials, paragraphs
- **Jost** (`'Jost', system-ui, sans-serif`) — all UI chrome: buttons, badges, labels, filters, navigation, metadata

**Never use** Fraunces or Plus Jakarta Sans — both are removed from this codebase.

**StayCard variants**: `hero` (editor's picks, h-64, full overlay), `highlight` (default, h-52, below-image content), `compact` (directory/spoke grids, h-44, dense metadata). Always pass `variant` explicitly for directory/spoke pages.

**Anti-patterns to avoid**: bounce easing (`cubic-bezier` with y > 1), hero metric stat clusters (400+/48/10), identical card grids, gradient text (`bg-clip-text`), heavy glassmorphism, `rotate()` on card hover.

**Tailwind v4** is used with the `@tailwindcss/vite` plugin. There is no `tailwind.config.js` — tokens are declared in `index.css` using `@theme inline`.

**shadcn/ui** components live under `client/src/components/ui/`. Use the `components.json` config when adding new shadcn components.

## Path Aliases

Configured in both `vite.config.ts` and `tsconfig.json`:
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## Key Conventions

- **All affiliate links** use `rel="noopener noreferrer sponsored"` on `<a>` tags.
- **Listing sort order**: editor's picks → featured → rating descending (see `SpokePage` `useMemo`).
- **Scroll reveal**: `.fade-up` class + `IntersectionObserver` pattern is used in `SpokePage` and `Directory`. New sections should follow the same pattern.
- **Dark mode** is intentionally disabled — `ThemeProvider` is instantiated with `defaultTheme="light"` and `switchable` omitted (defaults `false`).
- **Prettier**: double quotes, semicolons, 2-space indent, trailing commas (ES5), LF line endings.

## Adding a New Listing

1. Add a `Stay` object to the `STAYS` array in `client/src/lib/stays-data.ts`.
2. Set the `spokes` array to whichever spoke pages it should appear on.
3. Fill in spoke-specific optional fields (`wifiSpeed`, `petFriendly`, etc.) as applicable.
4. Use a unique `id` (kebab-case, e.g. `airbnb-property-name-location`).
