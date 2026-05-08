# Spec: Scale UniqueStaysUSA to 200–300 Listings

**Date:** 2026-05-07  
**Status:** Approved  
**Goal:** Reach 200–300 total published listings in `client/src/lib/stays-data.ts`

---

## Problem

UniqueStaysUSA.com launched with 72 curated listings. That's enough to prove the concept but not enough to feel like a credible, browsable directory. The platform mix is also unbalanced: 57 Airbnb / 8 VRBO / 6 Wander / 4 Direct. VRBO carries the best affiliate commissions and is under-indexed. Regional coverage has gaps: Midwest (2 listings) and Southwest (6) are thin.

---

## Approach: Category Deep-Dive + Multi-Source Harvest

10 category-focused sessions, one per property type. Each session: Claude searches all 4 data sources, filters to the quality bar, enforces geographic diversity, outputs TypeScript `Stay` objects ready to paste into `stays-data.ts`.

### Data Sources (priority order)

1. **Airbnb category pages** — `airbnb.com/united-states/stays/[type]` — highest signal for structural uniqueness
2. **VRBO keyword search** — entire home, 4.5+ stars — best affiliate commission, currently under-indexed
3. **Wander.com** — full property catalog (~150 properties total; check all relevant ones in Sessions 1–4)
4. **Direct booking operators** — category-specific boutique brands

### Direct Booking Operators by Category

| Category | Operators |
|----------|-----------|
| Glamping | AutoCamp, Under Canvas, Collective Retreats, Glamping Hub, Tentrr |
| Treehouses | TreeHouse Point (WA), Out n About Treesort (OR) |
| A-Frame Cabins | Loge Camps |
| Tiny Homes | Getaway House |
| Lighthouses | Individual lighthouse keeper rental sites |
| Castles & Estates | Castle in the Clouds (NH), individual historic estates |

---

## Quality Bar

- Rating ≥ 4.7 stars, reviews ≥ 15 *(Wander and direct booking operators exempt — they operate off-platform)*
- Entire home/unit — no shared spaces
- Genuine structural or experiential uniqueness
- Professional photos (10+ on listing page)

---

## Session Plan

| # | Category | New listings | Running total |
|---|----------|-------------|---------------|
| 1 | Treehouses | 25 | ~97 |
| 2 | Glamping (yurts, tents, safari, Airstreams) | 25 | ~122 |
| 3 | A-Frame Cabins | 22 | ~144 |
| 4 | Geodesic Domes | 22 | ~166 |
| 5 | Converted Structures | 20 | ~186 |
| 6 | Tiny Homes | 18 | ~204 |
| 7 | Houseboats & Floating Homes | 15 | ~219 |
| 8 | Cave Dwellings & Earth Homes | 10 | ~229 |
| 9 | Lighthouses & Water Towers | 10 | ~239 |
| 10 | Castles & Estates | 10 | ~249 |

**Soft-launch threshold:** Sessions 1–4 (~166 total) is a credible launch inventory.

---

## TypeScript Output Format

All listings conform to the `Stay` interface in `client/src/lib/stays-data.ts`:

```typescript
{
  id: 'slug-descriptor-state-abbrev',
  title: 'Property Name',
  subtitle: 'Punchy 5–10 word evocative line',
  location: 'City, State',
  state: 'State Name',
  region: 'West' | 'Southwest' | 'South' | 'Midwest' | 'Northeast' | 'Southeast',
  category: 'Treehouses',
  platform: 'Airbnb' | 'VRBO' | 'Wander' | 'Direct',
  affiliateUrl: 'https://...',
  image: 'https://...',
  price: 275,
  priceUnit: 'night',
  rating: 4.95,
  reviewCount: 183,
  sleeps: 4,
  bedrooms: 2,
  tags: ['Tag One', 'Tag Two', 'Tag Three', 'Tag Four', 'Tag Five'],
  description: '30–50 word editorial description.',
  spokes: ['unique'],
}
```

**ID format:** `[property-hint]-[location-abbrev]` — e.g., `treehouse-redwood-canopy-ca`  
**Platform targets per session:** ~40% Airbnb / ~30% VRBO / ~15% Wander / ~15% Direct  
**Geographic constraint:** ≥5 of 6 US regions per category session

---

## Verification (after each session)

1. `pnpm tsc --noEmit` — zero TypeScript errors required before next session
2. `pnpm dev` — new listings appear in Directory page
3. Spot-check 3–4 affiliate URLs per session
4. Filter test: category filter on `/directory` shows new listings correctly

---

## Notes

- Affiliate tracking parameters added separately once affiliate accounts are activated — URLs in stays-data.ts are clean canonical links
- VRBO and Direct listings should be prioritized to rebalance platform mix
- Wander catalog is finite; check all relevant properties in Sessions 1–4, skip in later sessions
