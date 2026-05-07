# DESIGN.md — UniqueStaysUSA Design System Specification

> Machine-readable reference for AI agents. Read this instead of reverse-engineering the codebase.
> Theme: **"The Naturalist's Field Catalog"** — tactile, handcrafted, bookish.

---

## 1. Design Philosophy

### Conceptual Frame: Field Guide / Naturalist

The visual language draws from **19th-century field guides, naturalist journals, and traveler's sketchbooks**. Every design decision asks: "Would this feel at home on the pages of an illustrated expedition journal?"

Core principles:
- **Parchment over white.** Background is aged paper (`oklch(0.94 0.022 78)`), not digital white.
- **Terracotta earns real surface area.** Primary accent appears as full section backgrounds, not just small badges.
- **Editorial pull quotes are a first-class visual element.** Large, italic, bold, on terracotta — not decorative flourish.
- **Three-font system with strict role separation.** Bitter (slab serif display) + Alegreya (humanist serif body) + Jost (geometric sans UI). No mixing roles.
- **Ink navy and ochre as neutrals.** The dark/pop contrast comes from these, not pure black.
- **Motion is restrained.** Ease-in-out, gentle translateY, no bounce, no spin, no scale-on-hover beyond 1.05.
- **Grain over gloss.** `.grain-overlay` and warm shadows over glassmorphism or gradients.

### Anti-Feature List (What This Design Is NOT)
- Not minimalist Scandinavian white-space
- Not vibrant startup rainbow palette
- Not dark-mode-first
- Not icon-heavy UI
- Not data-dashboard density

---

## 2. Color Palette

All values are **oklch color space**. Always apply as inline `style={{ color: '...' }}` or CSS custom properties — never Tailwind arbitrary color utilities for brand colors.

### Core Brand Palette

| Token Name | CSS Custom Property | oklch Value | Hex Approx | Semantic Role |
|---|---|---|---|---|
| Parchment | `--color-parchment` | `oklch(0.94 0.022 78)` | `#f2ead8` | Page background, warm aged paper |
| Parchment Dark | `--color-parchment-dark` | `oklch(0.91 0.028 75)` | `#ece1cb` | Section alt background, category showcase |
| Terracotta | `--color-terracotta` | `oklch(0.55 0.14 38)` | `#b5522a` | Primary brand, CTAs, Editor's Pick badge, section BG |
| Terracotta Light | `--color-terracotta-light` | `oklch(0.72 0.10 40)` | `#d48b5e` | Ochre-adjacent highlight, star icons, hover states |
| Botanical Green | `--color-botanical` | `oklch(0.40 0.10 148)` | `#2e6e45` | Secondary accent, "New" badge, botanical spoke |
| Botanical Light | `--color-botanical-light` | `oklch(0.55 0.09 148)` | `#4a9c63` | Botanical hover states |
| Ochre | `--color-ochre` | `oklch(0.68 0.12 68)` | `#c9913a` | Chapter numerals, warm accent, RV spoke |
| Ochre Light | `--color-ochre-light` | `oklch(0.82 0.08 70)` | `#ddb97a` | Spoke subtitle text on dark, ochre spoke light |
| Ink Navy | `--color-ink-navy` | `oklch(0.25 0.06 240)` | `#1a2744` | Work-friendly spoke accent, deep contrast |
| Charcoal | `--color-charcoal` | `oklch(0.22 0.01 60)` | `#302b25` | Primary text, headings on light backgrounds |
| Sand | `--color-sand` | `oklch(0.88 0.025 75)` | `#e0d5c0` | Borders, dividers, input outlines |
| Warm White | `--color-warm-white` | `oklch(0.99 0.005 85)` | `#fdfcfa` | Card backgrounds, popover, modal |
| Muted Text | (no CSS var) | `oklch(0.50 0.03 60)` | `#7a7068` | Secondary text, metadata, captions |
| Muted Stronger | (no CSS var) | `oklch(0.40 0.03 60)` | `#5c5550` | Tertiary text, placeholder hint |

### Semantic / System Palette

| Token | CSS Custom Property | oklch Value | Usage |
|---|---|---|---|
| Background | `--background` | `oklch(0.94 0.022 78)` | `body` background |
| Foreground | `--foreground` | `oklch(0.22 0.01 60)` | Default text |
| Card | `--card` | `oklch(0.97 0.015 80)` | Card surface |
| Card Foreground | `--card-foreground` | `oklch(0.22 0.01 60)` | Text on card |
| Primary | `--primary` | `oklch(0.55 0.14 38)` | Terracotta — buttons, CTA |
| Primary Foreground | `--primary-foreground` | `oklch(0.99 0.005 85)` | Text on primary |
| Secondary | `--secondary` | `oklch(0.40 0.10 148)` | Botanical green |
| Secondary Foreground | `--secondary-foreground` | `oklch(0.99 0.005 85)` | Text on secondary |
| Muted | `--muted` | `oklch(0.93 0.025 75)` | Subtle backgrounds |
| Muted Foreground | `--muted-foreground` | `oklch(0.50 0.03 60)` | De-emphasized text |
| Border | `--border` | `oklch(0.88 0.025 75)` | Default border |
| Ring | `--ring` | `oklch(0.55 0.14 38)` | Focus ring |

### Spoke Accent Colors

Each spoke page (`/unique`, `/work-friendly`, `/pet-friendly`, `/rv-ready`, `/ev-ready`) has its own `accentColor` and `accentColorLight` from `SPOKES` in `stays-data.ts`. These are used for filter pills, hero badge, callout CTA, and cross-link cards.

| Spoke | Accent Color (oklch) | Accent Light (oklch) | Hex Approx |
|---|---|---|---|
| `/unique` | `oklch(0.55 0.14 38)` | `oklch(0.93 0.04 55)` | Terracotta / `#f5ece0` |
| `/work-friendly` | `oklch(0.35 0.09 240)` | `oklch(0.92 0.04 240)` | Ink Navy / `#e8ecf5` |
| `/pet-friendly` | `oklch(0.40 0.10 148)` | `oklch(0.92 0.05 148)` | Botanical / `#e8f5ec` |
| `/rv-ready` | `oklch(0.60 0.12 68)` | `oklch(0.94 0.04 75)` | Ochre / `#f5eddc` |
| `/ev-ready` | `oklch(0.50 0.15 220)` | `oklch(0.92 0.05 220)` | Electric Blue / `#e8f0f8` |

### Platform Badge Colors

| Platform | Background | Text Color | CSS Class |
|---|---|---|---|
| Airbnb | `#FFE4DE` | `#FF5A5F` | `.platform-airbnb` |
| VRBO | `#E0F0FF` | `#1B5E9E` | `.platform-vrbo` |
| Wander | `#E8F5E9` | `#2E7D32` | `.platform-wander` |
| Direct | `oklch(0.93 0.025 75)` | `oklch(0.40 0.03 60)` | `.platform-direct` |

---

## 3. Typography System

### Font Families

Three fonts, strictly separated by role. All applied via inline `style={{ fontFamily: '...' }}` or CSS class `.font-display` / `.font-body` / `.font-ui`. Loaded via Google Fonts in `client/index.html`.

| Family | CSS Declaration | Role |
|---|---|---|
| Bitter | `'Bitter', Georgia, serif` | Display / Headings |
| Alegreya | `'Alegreya', Georgia, serif` | Body prose |
| Jost | `'Jost', system-ui, sans-serif` | UI chrome |

### Font Decision Tree

```
Is this content?
├─ A heading, title, price, pull quote, or editorial label → BITTER
│    • H1–H6 elements
│    • Card titles (.title, h3 in StayCard)
│    • Price displays ("$525")
│    • Editorial blockquotes
│    • Section headings
│    • Footer brand wordmark
│
├─ A description, paragraph, body copy, testimonial, or prose → ALEGREYA
│    • stay.description (italic, size 0.9–1rem)
│    • stay.subtitle (italic)
│    • Page "About" body paragraphs
│    • Testimonial quotes
│    • Taglines on spoke cross-link cards
│    • Footer brand description copy
│
└─ Everything else (UI) → JOST
     • Navigation links
     • Buttons and CTAs
     • Badges and pills (platform, category, stamp)
     • Eyebrow labels (uppercase, tracking-widest)
     • Metadata (location, "Sleeps X", "X stays")
     • Filter pills
     • Footer column headers
     • Form inputs and placeholders
     • Legal/disclosure text
     • Roman numerals in Chapter Nav
     • Modal and dropdown items
```

### Type Scale

| Context | Font | Weight | Size | Leading | Tracking | Notes |
|---|---|---|---|---|---|---|
| H1 hero | Bitter | 700–900 | `4.5–5rem` (`text-7xl`) | `0.95` | `-0.01em` | Often italic last word |
| H1 section | Bitter | 700 | `3–4rem` (`text-5xl`) | `1.1` | `-0.01em` | |
| H2 | Bitter | 700 | `2.5–3rem` (`text-4xl`) | `1.1` | normal | |
| H3 card (hero) | Bitter | 700 | `1.5rem` (`text-2xl`) | tight | normal | |
| H3 card (highlight) | Bitter | 700 | `1.125rem` (`text-lg`) | tight | normal | |
| H3 card (compact) | Bitter | 700 | `0.875rem` (`text-sm`) | snug | normal | `line-clamp-2` |
| Pull quote | Bitter | 700 | `2.5–4rem` | `1.15` | `-0.01em` | italic, on terracotta bg |
| Body large | Alegreya | 400 | `1.125rem` (`text-lg`) | relaxed | normal | Hero sub-copy |
| Body | Alegreya | 400 | `0.875–1rem` | relaxed | normal | Descriptions |
| Body italic (subtitle) | Alegreya | 400 | `0.875rem` | relaxed | normal | `fontStyle: 'italic'` |
| Eyebrow label | Jost | 700 | `0.75rem` (`text-xs`) | — | `0.12–0.15em` | `text-transform: uppercase` |
| UI label/badge | Jost | 600–700 | `0.7–0.8rem` | — | `0.05em` | |
| Button/CTA | Jost | 600 | `0.875rem` (`text-sm`) | — | normal | |
| Metadata/caption | Jost | 400–500 | `0.7–0.75rem` | — | normal | |
| Price display | Bitter | 700 | `1.25–1.5rem` | — | normal | |
| Brand wordmark | Bitter | 700 | `1.1rem` | none | `-0.01em` | |
| Brand sub (USA) | Jost | 600 | `0.55rem` | none | `0.15em` | uppercase |

---

## 4. Component Catalog

### 4.1 StayCard — Three Variants

All in `client/src/components/StayCard.tsx`. Import type: `StayCardVariant = 'hero' | 'highlight' | 'compact'`.

#### `hero` variant — Editor's Picks / Full Bleed
- Image height: `h-64` (256px)
- Card: `rounded-2xl border border-[oklch(0.88_0.025_75)]`
- Shadow: `0 4px 24px -4px rgba(44,30,20,0.14)`
- All content overlaid on image via `absolute bottom-0 p-5`
- Gradient: `bg-gradient-to-t from-black/70 via-black/10 to-transparent`
- Title: Bitter 700, `text-2xl`, white
- Description: Alegreya italic, `0.9rem`, `text-white/75`, `line-clamp-2`
- Category + State eyebrow: Jost 700, uppercase, widest tracking, `oklch(0.82 0.08 70)`
- Price: Bitter 700, `text-xl`, white
- CTA button: terracotta pill, Jost 600, `px-3.5 py-1.5`
- Usage: `Editor's Picks` section on homepage, 3-wide grid

#### `highlight` variant — Default / Featured
- Card bg: `oklch(0.97 0.015 80)` with `rounded-2xl`
- Image height: `h-52` (208px)
- Shadow: `0 2px 16px -4px rgba(44,30,20,0.12)`
- Content below image in `p-4` area
- Category: Jost uppercase, `text-xs`, terracotta color
- Rating: Star icon + Jost `text-xs font-bold`
- Title: Bitter 700, `text-lg`, charcoal (hover → terracotta)
- Subtitle: Alegreya italic, `text-sm`, muted
- Location: MapPin icon + Jost `text-xs`, muted
- Tags: 3 max, sand bg pills, Jost `text-xs`
- Footer row: sleeps count + platform CTA link
- Usage: Homepage featured section, homepage "More Wonders" grid

#### `compact` variant — Dense Directory / Spoke Grids
- Card bg: `oklch(0.97 0.015 80)` with `rounded-xl`
- Image height: `h-44` (176px)
- Shadow: `0 1px 8px -2px rgba(44,30,20,0.10)`
- Content in `p-3` (tighter padding)
- Title: Bitter 700, `text-sm`, `line-clamp-2`
- Location: truncate
- Price: shown inline in image overlay `${stay.price}/nt`
- Footer: sleeps + platform CTA link
- Usage: Spoke page grids (4-wide `xl:grid-cols-4`)

#### Shared Card Behaviors
- Hover: `.stay-card` class → `translateY(-4px)` + shadow via `cubic-bezier(0.22, 1, 0.36, 1)` 350ms
- Image hover: `scale-105` over 700ms (or 500ms compact) standard ease
- Platform badge: top-right corner, `rounded-md`, Jost 700
- Editor's Pick badge: top-left, terracotta rounded-full, `✦ Editor's Pick` (compact: `✦ Pick`)
- New badge: top-left beside Editor's Pick, botanical green
- All `<a>` wrappers use `rel="noopener noreferrer sponsored"`

### 4.2 Platform Badges

Used as `<span>` elements with CSS class `.platform-badge` + variant class. Also applied inline in StayCard.

```html
<span class="platform-badge platform-airbnb">Airbnb</span>
<span class="platform-badge platform-vrbo">VRBO</span>
<span class="platform-badge platform-wander">Wander</span>
<span class="platform-badge platform-direct">Direct</span>
```

Styles: `px-2.5 py-1 rounded-md text-xs font-bold`, Jost, `letter-spacing: 0.05em`, uppercase. Shown in image corner on all card variants.

### 4.3 Category Pills

CSS class: `.category-pill` + `.active` or `.inactive`

```css
.category-pill.active  → bg: oklch(0.55 0.14 38), text: oklch(0.99 0.005 85)
.category-pill.inactive → bg: oklch(0.99 0.005 85), border: 1.5px oklch(0.88 0.025 75), text: oklch(0.40 0.03 60)
.category-pill.inactive:hover → border-color: oklch(0.55 0.14 38), text: oklch(0.55 0.14 38)
```

Shared: `padding: 0.4rem 1rem`, `border-radius: 100px`, `font-size: 0.8rem`, `font-weight: 600`, `letter-spacing: 0.02em`, Jost. Hover: `translateY(-1px)` 200ms ease.

Used in: Homepage category strip, Directory filter bar, Spoke filter bar (spoke pages use their own inline style pills with `accentColor`).

### 4.4 Stamp Badge

CSS class: `.stamp-badge`

```css
border: 2px solid currentColor;
border-radius: 4px;
padding: 2px 8px;
font-size: 0.65rem;
font-weight: 700;
letter-spacing: 0.12em;
text-transform: uppercase;
font-family: 'Jost', system-ui, sans-serif;
```

Usage: `rel="noopener noreferrer sponsored"` disclosure, specialty tags. Color inherits from parent.

### 4.5 Eyebrow Labels

Pattern used throughout: small uppercase label above a heading.

```jsx
<p style={{
  color: 'oklch(0.55 0.14 38)',
  fontFamily: 'Jost, system-ui, sans-serif',
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}}>
  ✦ Hand-Picked by Our Team
</p>
```

On dark backgrounds: use `oklch(0.85 0.10 45)` (ochre light) for the eyebrow.
On terracotta backgrounds: use `oklch(0.85 0.10 45)`.
On parchment backgrounds: use `oklch(0.55 0.14 38)` (terracotta).

### 4.6 Buttons

#### Primary Filled (Terracotta)
```jsx
<button style={{
  background: 'oklch(0.55 0.14 38)',
  color: 'oklch(0.99 0.005 85)',
  fontFamily: 'Jost, system-ui, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 600,
  borderRadius: '9999px',
  padding: '0.625rem 1.5rem',
}}>
  Book Now
</button>
```
Hover: `bg oklch(0.48 0.14 38)` (darken). Used for primary CTA, newsletter subscribe, spoke callout CTA.

#### Outline (Terracotta border)
```jsx
<button style={{
  border: '2px solid oklch(0.55 0.14 38)',
  color: 'oklch(0.55 0.14 38)',
  background: 'transparent',
  fontFamily: 'Jost, system-ui, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 600,
  borderRadius: '9999px',
  padding: '0.625rem 1.25rem',
}}>
  View All Stays
</button>
```
Hover: fill to terracotta bg + white text.

#### "Get Picks" Nav CTA
```jsx
<a style={{
  background: 'oklch(0.55 0.14 38)',
  color: 'oklch(0.99 0.005 85)',
  fontFamily: 'Jost, system-ui, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 600,
  borderRadius: '9999px',
  padding: '0.5rem 1rem',
}}>
  Get Picks
</a>
```
In the Navbar, fixed top-right. Rounded pill, compact padding. Hover: `oklch(0.48 0.14 38)`.

#### Text Link CTA
```jsx
<span style={{
  color: 'oklch(0.55 0.14 38)',
  fontFamily: 'Jost, system-ui, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 600,
}}>
  View All Stays <ChevronRight className="w-4 h-4" />
</span>
```
Used in section header rows. Gap expands on hover (`group-hover:gap-2`).

---

## 5. Layout & Spacing Conventions

### Max Width & Container
```
max-width: 1320px
margin: 0 auto
padding: px-4 sm:px-6 lg:px-8 (16px / 24px / 32px)
```

Always use: `<div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">`

### Card Grid Breakpoints
| Grid | Classes |
|---|---|
| 1-col → 2-col → 3-col → 4-col | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| 1-col → 2-col → 3-col | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Category showcase (5-col max) | `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5` |
| Spoke cross-links (2 → 4-col) | `grid-cols-2 md:grid-cols-4` |

### Section Vertical Rhythm
| Pattern | Tailwind | Pixels |
|---|---|---|
| Standard section | `py-20` | 80px top + bottom |
| Compact section | `py-12` | 48px |
| Hero section | `min-h-[100svh]` or `min-h-[480px]` | — |
| Filter sticky bar | `py-3` | 12px |
| Footer | `py-16` | 64px |

### Spacing Scale Usage
- Gap between cards: `gap-6` (24px)
- Gap between card content elements: `mb-1` to `mb-4`
- Section header → content: `mb-12` (48px)
- Eyebrow → heading: `mb-2` (8px) / heading → body: `mb-4`/`mb-6`

---

## 6. Motion Tokens

### Approved Easing Functions

| Name | Value | Usage |
|---|---|---|
| `ease-card` | `cubic-bezier(0.22, 1, 0.36, 1)` | StayCard hover lift (350ms) |
| `ease-standard` | `ease` / `ease-in-out` | Standard transitions |
| `ease-fast` | `ease` 200ms | Button hover, pill transitions |
| `ease-medium` | `ease` 300ms | Dropdown open/close |

**Never use:** `bounce`, `spring`, `cubic-bezier` with overshoot (y > 1), `ease-in` for reveal animations.

### Duration Tokens

| Token | Duration | Usage |
|---|---|---|
| Instant | `150ms` | Focus rings, opacity |
| Fast | `200ms` | Hover state changes, pill active |
| Standard | `300ms` | Dropdown, nav scroll state |
| Card hover | `350ms` | `.stay-card` translateY + shadow |
| Image zoom | `500–700ms` | `group-hover:scale-105` |
| Scroll reveal | `600ms` | `.fade-up` transition |
| Nav background | `500ms` | Transparent → frosted on scroll |

### Scroll Reveal Pattern

CSS class `.fade-up` (defined in `index.css`):
```css
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

IntersectionObserver hook (used in `SpokePage` and `Directory`):
```ts
const observer = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
```

Stagger delay pattern: `style={{ transitionDelay: `${Math.min(i * 50, 400)}ms` }}` on each card wrapper.

### Hover Micro-interactions
- **Arrow expand:** `gap-1 group-hover:gap-2` on icon+text row
- **Card lift:** `translateY(-4px)` + shadow deepen — via `.stay-card:hover`
- **Chapter Nav indent:** `hover:pl-3` on row + arrow opacity 0→1
- **Category card lift:** `hover:-translate-y-1 hover:shadow-lg`
- **Nav logo scale:** `group-hover:scale-110` on compass circle

---

## 7. Section Patterns

### 7.1 Editorial Quote Block
- Background: `oklch(0.55 0.14 38)` (terracotta — gets real surface area)
- Eyebrow: Jost 700 uppercase, `oklch(0.85 0.10 45)`, `letter-spacing: 0.15em`, mb-8
- Blockquote: Bitter 700 italic, `text-4xl md:text-5xl lg:text-6xl`, `oklch(0.99 0.005 85)`, `line-height: 1.15`
- Attribution line: 8px wide ochre rule + Jost medium, ochre color

```jsx
<section style={{ background: 'oklch(0.55 0.14 38)' }} className="py-20">
  <blockquote className="editorial-quote" style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.99 0.005 85)' }}>
    "..."
  </blockquote>
  <div className="flex items-center gap-3">
    <div className="w-8 h-px" style={{ background: 'oklch(0.85 0.10 45)' }} />
    <p style={{ color: 'oklch(0.85 0.10 45)', fontFamily: 'Jost, system-ui, sans-serif' }}>Attribution</p>
  </div>
</section>
```

### 7.2 Chapter Nav Row
- Background: parchment `oklch(0.94 0.022 78)`
- Each row: `flex items-center gap-6 py-6 md:py-8`, `divide-y divide-[oklch(0.88_0.025_75)]`
- Roman numeral: Jost 700, `oklch(0.68 0.12 68)` (ochre), fixed `w-8`
- Vertical rule: `w-px h-10`, sand color (hidden on mobile)
- Title: Bitter 700, `text-xl md:text-2xl`, hover → terracotta
- Tagline: Alegreya italic, `text-sm md:text-base`, muted
- Arrow: opacity 0 → 1 + `translate-x-1` on group-hover
- Hover entire row: `hover:pl-3` indent

### 7.3 Hero Section
- Min height: `min-h-[100svh]` (homepage) or `min-h-[480px]` (spoke pages)
- Full-bleed background image: `absolute inset-0` with `object-cover`
- Gradient overlay: `bg-gradient-to-b from-black/20 via-black/10 to-black/70` (homepage)
  - Or spoke hero: `linear-gradient(to top, oklch(0.12 0.02 60 / 0.92) 0%, oklch(0.12 0.02 60 / 0.55) 50%, oklch(0.12 0.02 60 / 0.25) 100%)`
- Content positioned: `relative z-10 flex items-end` with `pb-16 md:pb-20`
- Eyebrow badge: terracotta pill with `backdropFilter: blur(8px)`, Jost 700 uppercase
- H1: Bitter 700, `text-5xl md:text-7xl`, `leading-[0.95]`, white with last word in terracotta-light italic
- Sub: Alegreya, `text-lg md:text-xl`, `text-white/85`, `textShadow`
- Search bar: warm white `0.95` opacity + `backdropFilter: blur(12px)`

### 7.4 Spoke Callout Block
- Background: `config.accentColorLight` (spoke-specific light tint)
- Layout: `flex flex-col md:flex-row items-center justify-between gap-6 py-14`
- H2: Bitter 700, `text-3xl`, charcoal
- Body: Alegreya, `text-sm`, muted
- CTA button: spoke `accentColor` filled, Jost 600, rounded-full with ArrowRight icon that expands on hover

### 7.5 Newsletter Section
- Background: `oklch(0.22 0.01 60)` (dark charcoal)
- Decorative circles: absolute positioned, low opacity (0.05), terracotta and ochre fills
- Eyebrow: Jost 700 uppercase, `oklch(0.72 0.10 40)` (ochre), widest tracking
- H2: Bitter 700, `text-4xl md:text-5xl`, warm white, last line italic in `oklch(0.85 0.10 45)`
- Body: Alegreya, `text-base`, `oklch(0.65 0.02 60)`
- Input: dark bg `oklch(0.30 0.01 60)`, sand text, 1.5px border `oklch(0.35 0.01 60)`
- Submit: terracotta filled button, `rounded-xl` (not round-full)

---

## 8. Anti-Pattern Blacklist

The following are explicitly **banned** from this design system. If you see them in the codebase, they are bugs.

### ❌ Bounce / Spring Easing
Do not use `cubic-bezier` values where y1 or y2 > 1.0 (overshoot). No spring physics. No `elastic` easing. The brand is calm and editorial, not playful or bouncy.

**Wrong:** `cubic-bezier(0.34, 1.56, 0.64, 1)` (bounce back)
**Right:** `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out decelerate)

### ❌ Hero Metric Clusters / Stat Badges
Do not place "12,000+ travelers" / "64 stays curated" / "5-star rating" stat badges as a cluster in the hero section. This is a conversion-rate-optimization dark pattern that undermines editorial credibility. Stats belong in prose (`<p>`) or in newsletter social proof, not as hero-section visual elements.

**Wrong:** 3 stat boxes: `{ value: "64", label: "Stays" }` in hero overlay
**Right:** One line of prose — "Every week, we send 5 extraordinary stays..." in newsletter body

### ❌ Identical Uniform Card Grids
Do not create grids where every row and column is the same card size and weight. The featured section intentionally uses an **asymmetric layout**: one large `lg:col-span-2` card + two stacked right-column cards. This visual hierarchy communicates curation and editorial judgment.

**Wrong:** `grid-cols-3` with three identical `highlight` cards for featured section
**Right:** `lg:col-span-2` large card + 2 stacked `highlight` cards on right

### ❌ Gradient Text / Text-Clip Effects
Do not use `background-clip: text` / `-webkit-background-clip: text` gradient text effects. Bitter at display scale does not need decoration. The italic + color shift on the last word of headings is the approved pattern.

**Wrong:** `className="bg-gradient-to-r from-terracotta to-ochre bg-clip-text text-transparent"`
**Right:** `<span style={{ fontStyle: 'italic', color: 'oklch(0.55 0.14 38)' }}>extraordinary.</span>`

### ❌ Glassmorphism
Do not use heavy `backdrop-filter: blur()` + semi-transparent colored backgrounds as a design statement. The only approved uses are:
1. Navbar frosted background when scrolled: `blur(16px)` on near-opaque parchment
2. Hero search bar: `blur(12px)` on near-white `0.95` opacity
3. Spoke hero badge: `blur(8px)` on very low opacity

Never: colored glassy panels, card-level glassmorphism, modal glassmorphism.

### ❌ Stat Badges on Cards
Do not add "Review Count" numeric badges, "X bookings this week" urgency badges, or metric clusters to StayCard. The approved card-level metadata is: rating (star + number), review count in parentheses, price, sleeps, location. No artificial urgency signals.

### ❌ Scale-on-Hover Beyond 1.05
Do not use `hover:scale-110` or greater on cards or buttons. The approved hover interactions are:
- Card: `translateY(-4px)` (lift, not grow)
- Image inside card: `scale(1.05)` over 500–700ms (subtle zoom)
- Nav logo compass: `scale(1.10)` (small icon only, not text)

---

## 9. Font Family Decision Tree (Expanded)

```
What am I rendering?
│
├─ H1, H2, H3, H4, H5, H6 tag
│   └─ → BITTER (Bitter, Georgia, serif)
│
├─ Card title (.title property of a Stay)
│   └─ → BITTER
│
├─ Price display ("$525", "$595/night")
│   └─ → BITTER
│
├─ Editorial pull quote (blockquote)
│   └─ → BITTER italic (use .editorial-quote class)
│
├─ Hero heading, section heading
│   └─ → BITTER
│      └─ Last word of heading often: italic + accentColor inline span
│
├─ Stay description (stay.description)
│   └─ → ALEGREYA, italic, 0.875–0.9rem
│
├─ Stay subtitle (stay.subtitle)
│   └─ → ALEGREYA, italic
│
├─ Body paragraphs (About page, about-teaser section)
│   └─ → ALEGREYA, regular
│
├─ Testimonial quotes
│   └─ → ALEGREYA, italic
│
├─ Spoke tagline text (on cross-link cards)
│   └─ → ALEGREYA, italic, opacity 0.70
│
├─ Navigation links (Navbar)
│   └─ → JOST
│
├─ Button / CTA text
│   └─ → JOST, 600 weight
│
├─ Badge text (platform, Editor's Pick, New, stamp)
│   └─ → JOST, 700 weight
│
├─ Eyebrow label (uppercase, letter-spaced)
│   └─ → JOST, 700 weight, uppercase, letter-spacing 0.12–0.15em
│
├─ Filter pill
│   └─ → JOST, 600 weight
│
├─ Metadata (location, "Sleeps X", review count)
│   └─ → JOST, 400–500 weight
│
├─ Category label (above card title in highlight variant)
│   └─ → JOST, 600 uppercase, tiny tracking
│
├─ Footer column headers
│   └─ → JOST, 700 uppercase, ochre color
│
├─ Footer navigation links
│   └─ → JOST, 400 weight
│
├─ Brand wordmark "Unique Stays"
│   └─ → BITTER, 700
│
├─ Brand sub-label "USA" / "Est. 2024"
│   └─ → JOST, 600, uppercase, wide tracking
│
└─ Input placeholder / form text
    └─ → JOST
```

---

## 10. File Reference Map

| File | Purpose |
|---|---|
| `client/src/index.css` | All CSS custom properties, `.fade-up`, `.stay-card`, `.category-pill`, `.platform-badge`, `.stamp-badge`, `.editorial-quote`, `.hero-overlay` |
| `client/src/lib/stays-data.ts` | `STAYS[]`, `SPOKES[]`, type definitions for `Stay`, `Platform`, `SpokeSlug`, `Category` |
| `client/src/components/StayCard.tsx` | All 3 card variants, `PLATFORM_STYLES`, `PLATFORM_CTA` constants |
| `client/src/components/Navbar.tsx` | Top navigation, mega-dropdown, mobile menu, "Get Picks" CTA |
| `client/src/components/Footer.tsx` | 4-column footer, brand copy, affiliate disclosure |
| `client/src/pages/Home.tsx` | Homepage sections: Hero, Categories, Featured, Editorial Quote, Editor's Picks, Chapter Nav, Newsletter |
| `client/src/pages/SpokePage.tsx` | Reusable spoke page, `SpokeCallout`, scroll reveal hook |
| `client/src/pages/DesignSystem.tsx` | Visual living style guide at `/design-system` |
| `client/index.html` | Google Fonts imports (Bitter, Alegreya, Jost) |
| `DESIGN.md` | This file — machine-readable design spec |
