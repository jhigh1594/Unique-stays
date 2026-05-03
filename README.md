# UniqueStaysUSA.com

> A curated directory of unique, memorable short-term rental homes across the USA — treehouses, geodesic domes, houseboats, cave dwellings, converted barns, lighthouses, and more.

## Overview

UniqueStaysUSA is a hub-and-spoke affiliate directory that curates the best unique vacation rentals from Airbnb, VRBO, Wander, and direct booking platforms. The site is organized around 5 "spoke" collections:

- **Unique Stays** (`/unique`) — Treehouses, domes, caves, converted structures
- **Work-Friendly** (`/work-friendly`) — WiFi-verified, desk-equipped remote work stays
- **Pet-Friendly** (`/pet-friendly`) — Dog/cat-friendly with fenced yards and pet amenities
- **RV-Ready** (`/rv-ready`) — Properties with RV hookups and van parking
- **EV-Ready** (`/ev-ready`) — Properties with on-site EV chargers

## Tech Stack

- **Frontend:** React 19 + TypeScript + Tailwind CSS 4
- **Routing:** Wouter
- **UI Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Build Tool:** Vite

## Design System

**"The Wanderer's Postcard Collection"**
- Palette: Warm cream (#FAF7F2), Terracotta (#C4622D), Forest Green (#2D5016), Deep Navy (#1A2744)
- Headlines: Fraunces (editorial serif)
- Body: Plus Jakarta Sans
- Aesthetic: Polished-yet-whimsical, handcrafted editorial feel

## Project Structure

```
client/
  src/
    pages/          ← Home, Directory, About, Submit, SpokePage, NotFound
    components/     ← Navbar, StayCard, Footer + shadcn/ui
    lib/
      stays-data.ts ← All 64 curated listings with real booking URLs
    index.css       ← Design tokens and global styles
```

## Getting Started

```bash
pnpm install
pnpm dev
```

## Content Architecture (Planned)

See `uniquestays-content-architecture.md` for the full scaling architecture:
- **CMS:** Payload CMS 3.0 (open-source, self-hosted)
- **Database:** Neon PostgreSQL
- **Search:** Typesense
- **CDN:** Cloudflare Pages + Images
- **Target:** 10,000+ listings, p95 < 300ms, ~$53/month at 100k MAU

## Affiliate Programs

- VRBO: [CJ.com affiliate program](https://www.cj.com)
- Wander: [Impact.com affiliate program](https://impact.com)
- Airbnb: [Airbnb Creators on Impact.com](https://creators.withairbnb.com)
- Booking.com: [Booking.com affiliate](https://www.booking.com/affiliate-program)

---

*Built with the Wanderer's spirit — every stay tells a story.*
