// ============================================================
// DesignSystem — Unique Stays USA
// Visual living style guide at /design-system
// Self-contained: no external data imports from stays-data
// All colors as oklch inline styles, Tailwind for layout only
// ============================================================

import { useState, useEffect } from "react";
import { ExternalLink, MapPin, Star, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Sample stay for StayCard demos ───────────────────────────
const SAMPLE_STAY = {
  id: "design-system-sample",
  title: "Redwood Canopy Treehouse",
  subtitle: "A high-design sanctuary suspended among ancient firs",
  location: "Mill Valley, California",
  state: "California",
  region: "West" as const,
  category: "Treehouses" as const,
  platform: "Airbnb" as const,
  affiliateUrl: "#",
  image:
    "https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-treehouse-JWbjZXvAKxUiXAg4QS7BnL.webp",
  price: 385,
  priceUnit: "night" as const,
  rating: 4.97,
  reviewCount: 218,
  sleeps: 4,
  bedrooms: 2,
  tags: ["Soaking Tub", "Forest View", "Fire Pit"],
  description:
    "Soaring wood beams, expansive windows, and uninterrupted forest views in every direction. This is what a treehouse grows up to be.",
  featured: true,
  editorsPick: true,
  isNew: false,
  spokes: ["unique" as const],
};

// ── Sidebar nav sections ──────────────────────────────────────
const SECTIONS = [
  { id: "colors", label: "Colors" },
  { id: "typography", label: "Typography" },
  { id: "spacing", label: "Spacing & Layout" },
  { id: "staycard", label: "StayCard Variants" },
  { id: "badges", label: "Badges & Pills" },
  { id: "buttons", label: "Buttons & CTAs" },
  { id: "motion", label: "Motion" },
  { id: "patterns", label: "Section Patterns" },
  { id: "antipatterns", label: "Anti-patterns" },
];

// ── Color palette data ────────────────────────────────────────
const COLORS = [
  {
    name: "Parchment",
    oklch: "oklch(0.94 0.022 78)",
    hex: "#f2ead8",
    role: "Page background",
    cssVar: "--color-parchment",
  },
  {
    name: "Parchment Dark",
    oklch: "oklch(0.91 0.028 75)",
    hex: "#ece1cb",
    role: "Section alt background",
    cssVar: "--color-parchment-dark",
  },
  {
    name: "Terracotta",
    oklch: "oklch(0.55 0.14 38)",
    hex: "#b5522a",
    role: "Primary brand, CTAs, Editor's Pick",
    cssVar: "--color-terracotta",
  },
  {
    name: "Terracotta Light",
    oklch: "oklch(0.72 0.10 40)",
    hex: "#d48b5e",
    role: "Stars, hover highlights",
    cssVar: "--color-terracotta-light",
  },
  {
    name: "Botanical Green",
    oklch: "oklch(0.40 0.10 148)",
    hex: "#2e6e45",
    role: "Secondary accent, New badge",
    cssVar: "--color-botanical",
  },
  {
    name: "Botanical Light",
    oklch: "oklch(0.55 0.09 148)",
    hex: "#4a9c63",
    role: "Botanical hover states",
    cssVar: "--color-botanical-light",
  },
  {
    name: "Ochre",
    oklch: "oklch(0.68 0.12 68)",
    hex: "#c9913a",
    role: "Chapter numerals, warm accent",
    cssVar: "--color-ochre",
  },
  {
    name: "Ochre Light",
    oklch: "oklch(0.82 0.08 70)",
    hex: "#ddb97a",
    role: "Text on dark/terracotta backgrounds",
    cssVar: "--color-ochre-light",
  },
  {
    name: "Ink Navy",
    oklch: "oklch(0.25 0.06 240)",
    hex: "#1a2744",
    role: "Work-friendly spoke accent",
    cssVar: "--color-ink-navy",
  },
  {
    name: "Charcoal",
    oklch: "oklch(0.22 0.01 60)",
    hex: "#302b25",
    role: "Primary text, headings",
    cssVar: "--color-charcoal",
  },
  {
    name: "Sand",
    oklch: "oklch(0.88 0.025 75)",
    hex: "#e0d5c0",
    role: "Borders, dividers",
    cssVar: "--color-sand",
  },
  {
    name: "Warm White",
    oklch: "oklch(0.99 0.005 85)",
    hex: "#fdfcfa",
    role: "Card backgrounds, modal",
    cssVar: "--color-warm-white",
  },
  {
    name: "Muted Text",
    oklch: "oklch(0.50 0.03 60)",
    hex: "#7a7068",
    role: "Secondary text, metadata",
    cssVar: "(inline only)",
  },
  {
    name: "Muted Stronger",
    oklch: "oklch(0.40 0.03 60)",
    hex: "#5c5550",
    role: "Tertiary text, placeholders",
    cssVar: "(inline only)",
  },
];

// ── Scroll reveal hook ────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        }),
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );
    document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ── Motion demo box ───────────────────────────────────────────
function MotionBox({
  label,
  easing,
  duration,
  demo,
}: {
  label: string;
  easing: string;
  duration: string;
  demo: "lift" | "fade" | "expand";
}) {
  const [active, setActive] = useState(false);

  const style: React.CSSProperties = {
    background: "oklch(0.55 0.14 38)",
    color: "oklch(0.99 0.005 85)",
    width: "120px",
    height: "80px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontFamily: "Jost, system-ui, sans-serif",
    fontSize: "0.75rem",
    fontWeight: 700,
    transition: `all ${duration} ${easing}`,
    transform:
      demo === "lift" && active
        ? "translateY(-8px)"
        : demo === "expand" && active
          ? "scale(1.05)"
          : "none",
    opacity: demo === "fade" && active ? 0.4 : 1,
    boxShadow:
      demo === "lift" && active ? "0 16px 40px rgba(44,30,20,0.22)" : "none",
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={style}
        onClick={() => {
          setActive(true);
          setTimeout(() => setActive(false), 600);
        }}
      >
        Click me
      </div>
      <p
        style={{
          fontFamily: "Jost, system-ui, sans-serif",
          fontSize: "0.7rem",
          color: "oklch(0.50 0.03 60)",
          marginTop: "8px",
        }}
      >
        {label}
      </p>
    </div>
  );
}

// ── Section wrapper ───────────────────────────────────────────
function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 border-b border-[oklch(0.88_0.025_75)]">
      <div className="fade-up">
        <p
          className="text-xs font-bold uppercase mb-2"
          style={{
            color: "oklch(0.55 0.14 38)",
            fontFamily: "Jost, system-ui, sans-serif",
            letterSpacing: "0.12em",
          }}
        >
          {eyebrow}
        </p>
        <h2
          className="text-3xl font-bold mb-8"
          style={{
            fontFamily: "Bitter, Georgia, serif",
            color: "oklch(0.22 0.01 60)",
          }}
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

// ── Inline StayCard implementations (no import from stays-data) ─
function HeroCardDemo() {
  const stay = SAMPLE_STAY;
  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
    >
      <div className="stay-card overflow-hidden rounded-2xl border border-[oklch(0.88_0.025_75)] shadow-[0_4px_24px_-4px_rgba(44,30,20,0.14)]">
        <div className="relative h-64 overflow-hidden">
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                background: "oklch(0.55 0.14 38)",
                color: "oklch(0.99 0.005 85)",
                fontFamily: "Jost, system-ui, sans-serif",
                letterSpacing: "0.04em",
              }}
            >
              ✦ Editor's Pick
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-bold"
              style={{
                background: "#FFE4DE",
                color: "#FF5A5F",
                fontFamily: "Jost, system-ui, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Airbnb
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1.5"
              style={{
                color: "oklch(0.82 0.08 70)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              {stay.category} · {stay.state}
            </p>
            <h3
              className="text-2xl font-bold text-white leading-tight mb-2"
              style={{ fontFamily: "Bitter, Georgia, serif" }}
            >
              {stay.title}
            </h3>
            <p
              className="text-sm text-white/75 line-clamp-2 mb-4"
              style={{
                fontFamily: "Alegreya, Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.9rem",
              }}
            >
              {stay.description}
            </p>
            <div className="flex items-center justify-between">
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "Bitter, Georgia, serif" }}
              >
                ${stay.price}
                <span className="text-sm font-normal text-white/60 ml-1">
                  /night
                </span>
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: "oklch(0.55 0.14 38)",
                  color: "oklch(0.99 0.005 85)",
                  fontFamily: "Jost, system-ui, sans-serif",
                }}
              >
                Open on Airbnb <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

function HighlightCardDemo() {
  const stay = SAMPLE_STAY;
  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
    >
      <div
        className="stay-card overflow-hidden rounded-2xl border border-[oklch(0.88_0.025_75)] shadow-[0_2px_16px_-4px_rgba(44,30,20,0.12)]"
        style={{ background: "oklch(0.97 0.015 80)" }}
      >
        <div className="relative h-52 overflow-hidden">
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
              style={{
                background: "oklch(0.55 0.14 38)",
                color: "oklch(0.99 0.005 85)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              ✦ Editor's Pick
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-bold"
              style={{
                background: "#FFE4DE",
                color: "#FF5A5F",
                fontFamily: "Jost, system-ui, sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              Airbnb
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span
              className="px-2.5 py-1 rounded-lg text-sm font-bold text-white"
              style={{
                background: "rgba(15,10,5,0.65)",
                backdropFilter: "blur(4px)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              ${stay.price}
              <span className="font-normal text-white/80 text-xs">/night</span>
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{
                color: "oklch(0.55 0.14 38)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              {stay.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[oklch(0.72_0.10_40)] text-[oklch(0.72_0.10_40)]" />
              <span
                className="text-xs font-bold"
                style={{
                  color: "oklch(0.30 0.02 60)",
                  fontFamily: "Jost, system-ui, sans-serif",
                }}
              >
                {stay.rating}
              </span>
              <span
                className="text-xs"
                style={{
                  color: "oklch(0.55 0.03 60)",
                  fontFamily: "Jost, system-ui, sans-serif",
                }}
              >
                ({stay.reviewCount})
              </span>
            </div>
          </div>
          <h3
            className="font-bold text-lg leading-tight mb-1 group-hover:text-[oklch(0.55_0.14_38)] transition-colors"
            style={{
              fontFamily: "Bitter, Georgia, serif",
              color: "oklch(0.22 0.01 60)",
            }}
          >
            {stay.title}
          </h3>
          <p
            className="text-sm italic mb-2"
            style={{
              color: "oklch(0.50 0.03 60)",
              fontFamily: "Alegreya, Georgia, serif",
            }}
          >
            {stay.subtitle}
          </p>
          <div className="flex items-center gap-1 mb-3">
            <MapPin
              className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: "oklch(0.55 0.14 38)" }}
            />
            <span
              className="text-xs"
              style={{
                color: "oklch(0.50 0.03 60)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              {stay.location}
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stay.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: "oklch(0.91 0.028 75)",
                  color: "oklch(0.40 0.03 60)",
                  fontFamily: "Jost, system-ui, sans-serif",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.88_0.025_75)]">
            <div className="flex items-center gap-1">
              <Users
                className="w-3.5 h-3.5"
                style={{ color: "oklch(0.55 0.03 60)" }}
              />
              <span
                className="text-xs"
                style={{
                  color: "oklch(0.50 0.03 60)",
                  fontFamily: "Jost, system-ui, sans-serif",
                }}
              >
                Sleeps {stay.sleeps} · {stay.bedrooms} beds
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-1.5 transition-all"
              style={{
                color: "oklch(0.55 0.14 38)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              Open on Airbnb <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

function CompactCardDemo() {
  const stay = SAMPLE_STAY;
  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
    >
      <div
        className="stay-card overflow-hidden rounded-xl border border-[oklch(0.88_0.025_75)] shadow-[0_1px_8px_-2px_rgba(44,30,20,0.10)]"
        style={{ background: "oklch(0.97 0.015 80)" }}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-2 left-2">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold"
              style={{
                background: "oklch(0.55 0.14 38)",
                color: "oklch(0.99 0.005 85)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              ✦ Pick
            </span>
          </div>
          <div className="absolute top-2 right-2">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{
                background: "#FFE4DE",
                color: "#FF5A5F",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              Airbnb
            </span>
          </div>
          <div className="absolute bottom-2 right-2">
            <span
              className="text-xs font-bold text-white px-2 py-0.5 rounded"
              style={{
                background: "rgba(15,10,5,0.65)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              ${stay.price}/nt
            </span>
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{
                color: "oklch(0.55 0.14 38)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              {stay.category}
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-[oklch(0.72_0.10_40)] text-[oklch(0.72_0.10_40)]" />
              <span
                className="text-[10px] font-bold"
                style={{
                  color: "oklch(0.30 0.02 60)",
                  fontFamily: "Jost, system-ui, sans-serif",
                }}
              >
                {stay.rating}
              </span>
            </div>
          </div>
          <h3
            className="font-bold text-sm leading-snug mb-1 group-hover:text-[oklch(0.55_0.14_38)] transition-colors line-clamp-2"
            style={{
              fontFamily: "Bitter, Georgia, serif",
              color: "oklch(0.22 0.01 60)",
            }}
          >
            {stay.title}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <MapPin
              className="w-3 h-3 flex-shrink-0"
              style={{ color: "oklch(0.55 0.14 38)" }}
            />
            <span
              className="text-[11px] truncate"
              style={{
                color: "oklch(0.50 0.03 60)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              {stay.location}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-[oklch(0.88_0.025_75)]">
            <span
              className="text-[11px]"
              style={{
                color: "oklch(0.55 0.03 60)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              Sleeps {stay.sleeps}
            </span>
            <span
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold group-hover:gap-1 transition-all"
              style={{
                color: "oklch(0.55 0.14 38)",
                fontFamily: "Jost, system-ui, sans-serif",
              }}
            >
              Open on Airbnb <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function DesignSystem() {
  useScrollReveal();
  const [activeSection, setActiveSection] = useState("colors");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.94 0.022 78)" }}
    >
      <Navbar />

      {/* ── PAGE HERO ─────────────────────────── */}
      <div
        className="pt-24 pb-12 border-b border-[oklch(0.88_0.025_75)]"
        style={{ background: "oklch(0.22 0.01 60)" }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-xs font-bold uppercase mb-3"
            style={{
              color: "oklch(0.68 0.12 68)",
              fontFamily: "Jost, system-ui, sans-serif",
              letterSpacing: "0.15em",
            }}
          >
            The Naturalist's Field Catalog
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{
              fontFamily: "Bitter, Georgia, serif",
              color: "oklch(0.99 0.005 85)",
              lineHeight: "1.0",
            }}
          >
            Design System
            <br />
            <span
              style={{
                fontStyle: "italic",
                color: "oklch(0.82 0.08 70)",
              }}
            >
              Reference
            </span>
          </h1>
          <p
            className="text-lg max-w-xl"
            style={{
              fontFamily: "Alegreya, Georgia, serif",
              color: "oklch(0.65 0.02 60)",
            }}
          >
            A visual living style guide for UniqueStaysUSA. Tactile, handcrafted,
            bookish. All colors in oklch. Three fonts, strict roles.
          </p>
        </div>
      </div>

      {/* ── LAYOUT: sidebar + content ─────────── */}
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12 relative">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <nav className="sticky top-24 pt-10">
              <p
                className="text-[10px] font-bold uppercase mb-4"
                style={{
                  color: "oklch(0.55 0.03 60)",
                  fontFamily: "Jost, system-ui, sans-serif",
                  letterSpacing: "0.12em",
                }}
              >
                Contents
              </p>
              <ul className="space-y-1">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      style={{
                        display: "block",
                        padding: "0.375rem 0.75rem",
                        borderRadius: "6px",
                        fontSize: "0.8rem",
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontWeight: activeSection === s.id ? 700 : 400,
                        color:
                          activeSection === s.id
                            ? "oklch(0.55 0.14 38)"
                            : "oklch(0.50 0.03 60)",
                        background:
                          activeSection === s.id
                            ? "oklch(0.93 0.04 55)"
                            : "transparent",
                        transition: "all 0.15s ease",
                        textDecoration: "none",
                      }}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 pb-24">

            {/* ══ COLORS ══════════════════════════════════ */}
            <Section id="colors" eyebrow="01 · Foundation" title="Color Palette">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {COLORS.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center gap-4 p-3 rounded-xl border border-[oklch(0.88_0.025_75)]"
                    style={{ background: "oklch(0.99 0.005 85)" }}
                  >
                    <div
                      style={{
                        width: "56px",
                        height: "56px",
                        borderRadius: "10px",
                        background: c.oklch,
                        flexShrink: 0,
                        border: "1.5px solid oklch(0.88 0.025 75)",
                      }}
                    />
                    <div className="min-w-0">
                      <p
                        style={{
                          fontFamily: "Bitter, Georgia, serif",
                          fontWeight: 700,
                          fontSize: "0.875rem",
                          color: "oklch(0.22 0.01 60)",
                          marginBottom: "2px",
                        }}
                      >
                        {c.name}
                      </p>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          color: "oklch(0.50 0.03 60)",
                          marginBottom: "2px",
                        }}
                      >
                        {c.oklch}
                      </p>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.65rem",
                          color: "oklch(0.65 0.03 60)",
                        }}
                      >
                        {c.hex} · {c.cssVar}
                      </p>
                      <p
                        style={{
                          fontFamily: "Alegreya, Georgia, serif",
                          fontSize: "0.75rem",
                          fontStyle: "italic",
                          color: "oklch(0.45 0.03 60)",
                          marginTop: "2px",
                        }}
                      >
                        {c.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spoke accent colors */}
              <div className="mt-8">
                <p
                  className="text-xs font-bold uppercase mb-4"
                  style={{
                    color: "oklch(0.50 0.03 60)",
                    fontFamily: "Jost, system-ui, sans-serif",
                    letterSpacing: "0.1em",
                  }}
                >
                  Spoke Accent Colors
                </p>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    {
                      spoke: "Unique",
                      accent: "oklch(0.55 0.14 38)",
                      light: "oklch(0.93 0.04 55)",
                    },
                    {
                      spoke: "Work",
                      accent: "oklch(0.35 0.09 240)",
                      light: "oklch(0.92 0.04 240)",
                    },
                    {
                      spoke: "Pet",
                      accent: "oklch(0.40 0.10 148)",
                      light: "oklch(0.92 0.05 148)",
                    },
                    {
                      spoke: "RV",
                      accent: "oklch(0.60 0.12 68)",
                      light: "oklch(0.94 0.04 75)",
                    },
                    {
                      spoke: "EV",
                      accent: "oklch(0.50 0.15 220)",
                      light: "oklch(0.92 0.05 220)",
                    },
                  ].map((s) => (
                    <div key={s.spoke} className="text-center">
                      <div
                        style={{
                          width: "100%",
                          height: "40px",
                          background: s.accent,
                          borderRadius: "8px 8px 0 0",
                        }}
                      />
                      <div
                        style={{
                          width: "100%",
                          height: "24px",
                          background: s.light,
                          borderRadius: "0 0 8px 8px",
                          border: "1.5px solid oklch(0.88 0.025 75)",
                          borderTop: "none",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.40 0.03 60)",
                          marginTop: "6px",
                        }}
                      >
                        {s.spoke}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* ══ TYPOGRAPHY ═══════════════════════════════ */}
            <Section id="typography" eyebrow="02 · Typography" title="Font System">
              {/* Font family specimens */}
              <div className="space-y-8">
                {/* Bitter */}
                <div
                  className="p-6 rounded-2xl border border-[oklch(0.88_0.025_75)]"
                  style={{ background: "oklch(0.99 0.005 85)" }}
                >
                  <p
                    className="text-xs font-bold uppercase mb-4"
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color: "oklch(0.55 0.14 38)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Bitter — Display / Headings
                  </p>
                  <p
                    style={{
                      fontFamily: "Bitter, Georgia, serif",
                      fontSize: "3.5rem",
                      fontWeight: 700,
                      color: "oklch(0.22 0.01 60)",
                      lineHeight: 1.0,
                      marginBottom: "12px",
                    }}
                  >
                    Sleep somewhere{" "}
                    <span
                      style={{
                        fontStyle: "italic",
                        color: "oklch(0.55 0.14 38)",
                      }}
                    >
                      extraordinary.
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "Bitter, Georgia, serif",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "oklch(0.22 0.01 60)",
                      marginBottom: "8px",
                    }}
                  >
                    Redwood Canopy Treehouse
                  </p>
                  <p
                    style={{
                      fontFamily: "Bitter, Georgia, serif",
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "oklch(0.22 0.01 60)",
                    }}
                  >
                    $385 / night
                  </p>
                  <div
                    className="mt-4 pt-4 border-t border-[oklch(0.88_0.025_75)]"
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.75rem",
                      color: "oklch(0.55 0.03 60)",
                    }}
                  >
                    Used for: H1–H6, card titles, prices, editorial pull quotes,
                    section headings, brand wordmark
                  </div>
                </div>

                {/* Alegreya */}
                <div
                  className="p-6 rounded-2xl border border-[oklch(0.88_0.025_75)]"
                  style={{ background: "oklch(0.99 0.005 85)" }}
                >
                  <p
                    className="text-xs font-bold uppercase mb-4"
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color: "oklch(0.40 0.10 148)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Alegreya — Body Prose
                  </p>
                  <p
                    style={{
                      fontFamily: "Alegreya, Georgia, serif",
                      fontSize: "1.125rem",
                      color: "oklch(0.35 0.02 60)",
                      lineHeight: 1.7,
                      marginBottom: "12px",
                    }}
                  >
                    We find the treehouses, domes, lighthouses, and hidden wonders
                    that turn a trip into a story worth telling. Every stay has been
                    personally reviewed for the "wow" factor.
                  </p>
                  <p
                    style={{
                      fontFamily: "Alegreya, Georgia, serif",
                      fontSize: "0.9rem",
                      fontStyle: "italic",
                      color: "oklch(0.50 0.03 60)",
                    }}
                  >
                    "A high-design sanctuary suspended in a grove of ancient
                    redwoods." — testimonial quote, stay subtitle
                  </p>
                  <div
                    className="mt-4 pt-4 border-t border-[oklch(0.88_0.025_75)]"
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.75rem",
                      color: "oklch(0.55 0.03 60)",
                    }}
                  >
                    Used for: descriptions, subtitles, body paragraphs, testimonials,
                    spoke taglines
                  </div>
                </div>

                {/* Jost */}
                <div
                  className="p-6 rounded-2xl border border-[oklch(0.88_0.025_75)]"
                  style={{ background: "oklch(0.99 0.005 85)" }}
                >
                  <p
                    className="text-xs font-bold uppercase mb-4"
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      color: "oklch(0.25 0.06 240)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    Jost — UI Chrome
                  </p>
                  <div className="space-y-3">
                    <div
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "oklch(0.55 0.14 38)",
                      }}
                    >
                      ✦ This Week's Favorites — eyebrow label
                    </div>
                    <div
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "oklch(0.40 0.03 60)",
                      }}
                    >
                      Collections · Full Directory · About · Submit a Stay — nav
                    </div>
                    <div
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        color: "oklch(0.55 0.03 60)",
                      }}
                    >
                      Sleeps 4 · Mill Valley, CA · 218 reviews — metadata
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {["Filter pill", "Active state", "Badge label"].map(
                        (l, i) => (
                          <span
                            key={l}
                            style={{
                              fontFamily: "Jost, system-ui, sans-serif",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              padding: "4px 12px",
                              borderRadius: "100px",
                              background:
                                i === 1
                                  ? "oklch(0.55 0.14 38)"
                                  : "oklch(0.99 0.005 85)",
                              color:
                                i === 1
                                  ? "oklch(0.99 0.005 85)"
                                  : "oklch(0.40 0.03 60)",
                              border:
                                i !== 1
                                  ? "1.5px solid oklch(0.88 0.025 75)"
                                  : "none",
                            }}
                          >
                            {l}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                  <div
                    className="mt-4 pt-4 border-t border-[oklch(0.88_0.025_75)]"
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.75rem",
                      color: "oklch(0.55 0.03 60)",
                    }}
                  >
                    Used for: nav, buttons, badges, eyebrows, filter pills, metadata,
                    footer headers, inputs
                  </div>
                </div>
              </div>
            </Section>

            {/* ══ SPACING & LAYOUT ═════════════════════════ */}
            <Section id="spacing" eyebrow="03 · Structure" title="Spacing & Layout">
              {/* Max width demo */}
              <div
                className="p-5 rounded-2xl border border-[oklch(0.88_0.025_75)] mb-8"
                style={{ background: "oklch(0.99 0.005 85)" }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "oklch(0.55 0.03 60)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  Container
                </p>
                <div
                  style={{
                    background: "oklch(0.93 0.04 55)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.8rem",
                      color: "oklch(0.40 0.03 60)",
                    }}
                  >
                    max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8
                  </p>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: "oklch(0.55 0.03 60)",
                      marginTop: "4px",
                    }}
                  >
                    Padding: 16px (mobile) → 24px (sm) → 32px (lg)
                  </p>
                </div>
              </div>

              {/* Spacing scale */}
              <div
                className="p-5 rounded-2xl border border-[oklch(0.88_0.025_75)] mb-8"
                style={{ background: "oklch(0.99 0.005 85)" }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "oklch(0.55 0.03 60)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "16px",
                  }}
                >
                  Section Vertical Rhythm
                </p>
                <div className="space-y-3">
                  {[
                    { label: "py-20 — Standard section", px: 80, color: "oklch(0.55 0.14 38)" },
                    { label: "py-16 — Footer", px: 64, color: "oklch(0.40 0.10 148)" },
                    { label: "py-12 — Compact section", px: 48, color: "oklch(0.60 0.12 68)" },
                    { label: "py-3 — Filter bar", px: 12, color: "oklch(0.50 0.15 220)" },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3">
                      <div
                        style={{
                          width: `${s.px}px`,
                          maxWidth: "80px",
                          height: "20px",
                          background: s.color,
                          borderRadius: "4px",
                          flexShrink: 0,
                          opacity: 0.7,
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.8rem",
                          color: "oklch(0.40 0.03 60)",
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grid demos */}
              <p
                style={{
                  fontFamily: "Jost, system-ui, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "oklch(0.55 0.03 60)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                }}
              >
                Card Grid Breakpoints
              </p>
              <div className="space-y-4">
                {[
                  { cols: 2, label: "2-col (sm:grid-cols-2)" },
                  { cols: 3, label: "3-col (lg:grid-cols-3)" },
                  { cols: 4, label: "4-col (xl:grid-cols-4)" },
                ].map((g) => (
                  <div key={g.label}>
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.7rem",
                        color: "oklch(0.55 0.03 60)",
                        marginBottom: "6px",
                      }}
                    >
                      {g.label}
                    </p>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${g.cols}, 1fr)`,
                        gap: "8px",
                      }}
                    >
                      {Array.from({ length: g.cols }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            background: "oklch(0.93 0.04 55)",
                            border: "1.5px solid oklch(0.82 0.08 55 / 0.5)",
                            borderRadius: "8px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Jost, system-ui, sans-serif",
                              fontSize: "0.65rem",
                              color: "oklch(0.55 0.14 38)",
                              fontWeight: 700,
                            }}
                          >
                            col {i + 1}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* ══ STAYCARD VARIANTS ════════════════════════ */}
            <Section id="staycard" eyebrow="04 · Components" title="StayCard Variants">
              <div className="space-y-10">
                {/* Hero variant */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="stamp-badge"
                      style={{
                        color: "oklch(0.55 0.14 38)",
                        borderColor: "oklch(0.55 0.14 38)",
                      }}
                    >
                      hero
                    </span>
                    <p
                      style={{
                        fontFamily: "Alegreya, Georgia, serif",
                        fontSize: "0.875rem",
                        fontStyle: "italic",
                        color: "oklch(0.50 0.03 60)",
                      }}
                    >
                      Full-bleed editorial — Editor's Picks, homepage
                      3-wide grid
                    </p>
                  </div>
                  <div className="max-w-sm">
                    <HeroCardDemo />
                  </div>
                </div>

                {/* Highlight variant */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="stamp-badge"
                      style={{
                        color: "oklch(0.40 0.10 148)",
                        borderColor: "oklch(0.40 0.10 148)",
                      }}
                    >
                      highlight
                    </span>
                    <p
                      style={{
                        fontFamily: "Alegreya, Georgia, serif",
                        fontSize: "0.875rem",
                        fontStyle: "italic",
                        color: "oklch(0.50 0.03 60)",
                      }}
                    >
                      Standard card with content below image — homepage
                      featured, "More Wonders"
                    </p>
                  </div>
                  <div className="max-w-sm">
                    <HighlightCardDemo />
                  </div>
                </div>

                {/* Compact variant */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="stamp-badge"
                      style={{
                        color: "oklch(0.60 0.12 68)",
                        borderColor: "oklch(0.60 0.12 68)",
                      }}
                    >
                      compact
                    </span>
                    <p
                      style={{
                        fontFamily: "Alegreya, Georgia, serif",
                        fontSize: "0.875rem",
                        fontStyle: "italic",
                        color: "oklch(0.50 0.03 60)",
                      }}
                    >
                      Dense for 4-wide grids — spoke pages, directory
                    </p>
                  </div>
                  <div className="max-w-xs">
                    <CompactCardDemo />
                  </div>
                </div>
              </div>
            </Section>

            {/* ══ BADGES & PILLS ═══════════════════════════ */}
            <Section id="badges" eyebrow="05 · Components" title="Badges & Pills">
              {/* Platform badges */}
              <div
                className="p-5 rounded-2xl border border-[oklch(0.88_0.025_75)] mb-6"
                style={{ background: "oklch(0.99 0.005 85)" }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.03 60)",
                    marginBottom: "12px",
                  }}
                >
                  Platform Badges
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span className="platform-badge platform-airbnb">Airbnb</span>
                  <span className="platform-badge platform-vrbo">VRBO</span>
                  <span className="platform-badge platform-wander">Wander</span>
                  <span className="platform-badge platform-direct">Direct</span>
                </div>
                <div className="mt-4 space-y-1">
                  {[
                    { name: "Airbnb", bg: "#FFE4DE", text: "#FF5A5F" },
                    { name: "VRBO", bg: "#E0F0FF", text: "#1B5E9E" },
                    { name: "Wander", bg: "#E8F5E9", text: "#2E7D32" },
                    {
                      name: "Direct",
                      bg: "oklch(0.93 0.025 75)",
                      text: "oklch(0.40 0.03 60)",
                    },
                  ].map((p) => (
                    <div
                      key={p.name}
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.7rem",
                        color: "oklch(0.55 0.03 60)",
                      }}
                    >
                      {p.name}: bg {p.bg} · text {p.text}
                    </div>
                  ))}
                </div>
              </div>

              {/* Category pills */}
              <div
                className="p-5 rounded-2xl border border-[oklch(0.88_0.025_75)] mb-6"
                style={{ background: "oklch(0.99 0.005 85)" }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.03 60)",
                    marginBottom: "12px",
                  }}
                >
                  Category Pills
                </p>
                <div className="flex gap-3 flex-wrap">
                  <button className="category-pill active">🌲 Treehouses</button>
                  <button className="category-pill inactive">🔮 Geodesic Domes</button>
                  <button className="category-pill inactive">⛵ Houseboats</button>
                  <button className="category-pill inactive">🏡 A-Frame Cabins</button>
                </div>
              </div>

              {/* Stamp badge */}
              <div
                className="p-5 rounded-2xl border border-[oklch(0.88_0.025_75)] mb-6"
                style={{ background: "oklch(0.99 0.005 85)" }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.03 60)",
                    marginBottom: "12px",
                  }}
                >
                  Stamp Badge (.stamp-badge)
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span
                    className="stamp-badge"
                    style={{
                      color: "oklch(0.55 0.14 38)",
                      borderColor: "oklch(0.55 0.14 38)",
                    }}
                  >
                    hero
                  </span>
                  <span
                    className="stamp-badge"
                    style={{
                      color: "oklch(0.40 0.10 148)",
                      borderColor: "oklch(0.40 0.10 148)",
                    }}
                  >
                    highlight
                  </span>
                  <span
                    className="stamp-badge"
                    style={{
                      color: "oklch(0.60 0.12 68)",
                      borderColor: "oklch(0.60 0.12 68)",
                    }}
                  >
                    compact
                  </span>
                  <span
                    className="stamp-badge"
                    style={{
                      color: "oklch(0.50 0.15 220)",
                      borderColor: "oklch(0.50 0.15 220)",
                    }}
                  >
                    new
                  </span>
                </div>
              </div>

              {/* In-image overlay badges */}
              <div
                className="p-5 rounded-2xl border border-[oklch(0.88_0.025_75)]"
                style={{ background: "oklch(0.99 0.005 85)" }}
              >
                <p
                  style={{
                    fontFamily: "Jost, system-ui, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.03 60)",
                    marginBottom: "12px",
                  }}
                >
                  Card Overlay Badges
                </p>
                <div className="flex gap-3 flex-wrap">
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: "oklch(0.55 0.14 38)",
                      color: "oklch(0.99 0.005 85)",
                      fontFamily: "Jost, system-ui, sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    ✦ Editor's Pick
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: "oklch(0.40 0.10 148)",
                      color: "oklch(0.99 0.005 85)",
                      fontFamily: "Jost, system-ui, sans-serif",
                    }}
                  >
                    New
                  </span>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: "oklch(0.55 0.14 38)",
                      color: "oklch(0.99 0.005 85)",
                      fontFamily: "Jost, system-ui, sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    ✦ Curated by Unique Stays USA
                  </span>
                </div>
              </div>
            </Section>

            {/* ══ BUTTONS & CTAS ════════════════════════════ */}
            <Section id="buttons" eyebrow="06 · Components" title="Buttons & CTAs">
              <div
                className="p-6 rounded-2xl border border-[oklch(0.88_0.025_75)] space-y-6"
                style={{ background: "oklch(0.99 0.005 85)" }}
              >
                {/* Primary filled */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "10px",
                    }}
                  >
                    Primary Filled
                  </p>
                  <button
                    style={{
                      background: "oklch(0.55 0.14 38)",
                      color: "oklch(0.99 0.005 85)",
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderRadius: "9999px",
                      padding: "0.625rem 1.5rem",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Book Now
                  </button>
                  <span
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: "oklch(0.65 0.03 60)",
                      marginLeft: "12px",
                    }}
                  >
                    background: oklch(0.55 0.14 38) → hover: oklch(0.48 0.14 38)
                  </span>
                </div>

                {/* Outline */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "10px",
                    }}
                  >
                    Outline
                  </p>
                  <button
                    style={{
                      border: "2px solid oklch(0.55 0.14 38)",
                      color: "oklch(0.55 0.14 38)",
                      background: "transparent",
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      borderRadius: "9999px",
                      padding: "0.5rem 1.25rem",
                      cursor: "pointer",
                    }}
                  >
                    View All Stays →
                  </button>
                  <span
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: "oklch(0.65 0.03 60)",
                      marginLeft: "12px",
                    }}
                  >
                    hover: fill terracotta + white text
                  </span>
                </div>

                {/* Text link */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "10px",
                    }}
                  >
                    Text Link CTA
                  </p>
                  <span
                    style={{
                      color: "oklch(0.55 0.14 38)",
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    See all
                    <span style={{ fontSize: "1rem" }}>›</span>
                  </span>
                  <span
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: "oklch(0.65 0.03 60)",
                      marginLeft: "12px",
                    }}
                  >
                    gap expands on hover: gap-1 → gap-2
                  </span>
                </div>

                {/* Get Picks nav CTA */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "10px",
                    }}
                  >
                    "Get Picks" Nav CTA
                  </p>
                  <a
                    href="#newsletter"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.5rem 1rem",
                      borderRadius: "9999px",
                      background: "oklch(0.55 0.14 38)",
                      color: "oklch(0.99 0.005 85)",
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Get Picks
                  </a>
                  <span
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: "oklch(0.65 0.03 60)",
                      marginLeft: "12px",
                    }}
                  >
                    Navbar top-right. Compact padding. Rounded pill.
                  </span>
                </div>

                {/* Spoke callout CTA */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "10px",
                    }}
                  >
                    Spoke Callout CTA (with icon expand)
                  </p>
                  <button
                    className="group"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.875rem 1.5rem",
                      borderRadius: "9999px",
                      background: "oklch(0.40 0.10 148)",
                      color: "oklch(0.99 0.005 85)",
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      border: "none",
                      cursor: "pointer",
                      transition: "all 300ms ease",
                    }}
                  >
                    Get Listed →
                  </button>
                  <span
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      color: "oklch(0.65 0.03 60)",
                      marginLeft: "12px",
                    }}
                  >
                    Uses spoke accentColor. gap-2 → gap-3 on hover.
                  </span>
                </div>
              </div>
            </Section>

            {/* ══ MOTION ═══════════════════════════════════ */}
            <Section id="motion" eyebrow="07 · Animation" title="Motion Tokens">
              <div className="space-y-8">
                {/* Interactive demo */}
                <div
                  className="p-6 rounded-2xl border border-[oklch(0.88_0.025_75)]"
                  style={{ background: "oklch(0.99 0.005 85)" }}
                >
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "20px",
                    }}
                  >
                    Click to trigger — approved easing demos
                  </p>
                  <div className="flex gap-8 flex-wrap">
                    <MotionBox
                      label="Card hover lift"
                      easing="cubic-bezier(0.22, 1, 0.36, 1)"
                      duration="350ms"
                      demo="lift"
                    />
                    <MotionBox
                      label="Image scale"
                      easing="ease"
                      duration="700ms"
                      demo="expand"
                    />
                    <MotionBox
                      label="Fade transition"
                      easing="ease"
                      duration="200ms"
                      demo="fade"
                    />
                  </div>
                </div>

                {/* Token table */}
                <div
                  className="rounded-2xl border border-[oklch(0.88_0.025_75)] overflow-hidden"
                  style={{ background: "oklch(0.99 0.005 85)" }}
                >
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ background: "oklch(0.94 0.022 78)" }}>
                        {["Token", "Value", "Usage"].map((h) => (
                          <th
                            key={h}
                            className="px-4 py-3 text-left"
                            style={{
                              fontFamily: "Jost, system-ui, sans-serif",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: "oklch(0.50 0.03 60)",
                            }}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          token: "ease-card",
                          value: "cubic-bezier(0.22, 1, 0.36, 1) 350ms",
                          usage: ".stay-card hover lift",
                        },
                        {
                          token: "ease-standard",
                          value: "ease 300ms",
                          usage: "Dropdown, nav scroll state",
                        },
                        {
                          token: "ease-fast",
                          value: "ease 200ms",
                          usage: "Button hover, pill active",
                        },
                        {
                          token: "image-zoom",
                          value: "ease 500–700ms scale(1.05)",
                          usage: "Card image on group-hover",
                        },
                        {
                          token: "scroll-reveal",
                          value: "ease 600ms opacity + translateY(24px→0)",
                          usage: ".fade-up.visible",
                        },
                        {
                          token: "stagger",
                          value: "transitionDelay: i*50ms, max 400ms",
                          usage: "Card grid entrance",
                        },
                      ].map((row, i) => (
                        <tr
                          key={row.token}
                          style={{
                            borderTop: i > 0 ? "1px solid oklch(0.88 0.025 75)" : "none",
                          }}
                        >
                          <td
                            className="px-4 py-3"
                            style={{
                              fontFamily: "Jost, system-ui, sans-serif",
                              fontSize: "0.78rem",
                              fontWeight: 700,
                              color: "oklch(0.55 0.14 38)",
                            }}
                          >
                            {row.token}
                          </td>
                          <td
                            className="px-4 py-3"
                            style={{
                              fontFamily: "Jost, system-ui, sans-serif",
                              fontSize: "0.75rem",
                              color: "oklch(0.35 0.02 60)",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            {row.value}
                          </td>
                          <td
                            className="px-4 py-3"
                            style={{
                              fontFamily: "Alegreya, Georgia, serif",
                              fontSize: "0.85rem",
                              fontStyle: "italic",
                              color: "oklch(0.50 0.03 60)",
                            }}
                          >
                            {row.usage}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Banned easing callout */}
                <div
                  className="p-4 rounded-xl border"
                  style={{
                    background: "oklch(0.97 0.01 20)",
                    borderColor: "oklch(0.85 0.08 25)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "oklch(0.50 0.12 25)",
                    }}
                  >
                    Never use: bounce easing · spring overshoot ·
                    cubic-bezier with y &gt; 1.0 · rotate hover · scale &gt; 1.05 on
                    cards
                  </p>
                </div>
              </div>
            </Section>

            {/* ══ SECTION PATTERNS ═════════════════════════ */}
            <Section
              id="patterns"
              eyebrow="08 · Patterns"
              title="Section Patterns"
            >
              <div className="space-y-8">
                {/* Editorial quote block */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "8px",
                    }}
                  >
                    Editorial Quote Block (terracotta bg)
                  </p>
                  <div
                    style={{
                      background: "oklch(0.55 0.14 38)",
                      borderRadius: "16px",
                      padding: "36px 32px",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "oklch(0.85 0.10 45)",
                        marginBottom: "20px",
                      }}
                    >
                      From the collection
                    </p>
                    <blockquote
                      className="editorial-quote"
                      style={{
                        fontFamily: "Bitter, Georgia, serif",
                        fontSize: "1.75rem",
                        fontWeight: 700,
                        fontStyle: "italic",
                        color: "oklch(0.99 0.005 85)",
                        lineHeight: 1.15,
                        marginBottom: "20px",
                      }}
                    >
                      "A high-design sanctuary suspended in a grove of ancient
                      redwoods."
                    </blockquote>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "1px",
                          background: "oklch(0.85 0.10 45)",
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.8rem",
                          color: "oklch(0.85 0.10 45)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Redwood Treehouse Retreat · Mill Valley, California
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chapter nav row */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "8px",
                    }}
                  >
                    Chapter Nav Row
                  </p>
                  <div
                    style={{
                      background: "oklch(0.94 0.022 78)",
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1.5px solid oklch(0.88 0.025 75)",
                    }}
                  >
                    {[
                      {
                        num: "I",
                        title: "Uniquely Extraordinary Stays",
                        tagline: "Treehouses, domes, houseboats & more",
                        count: "64",
                      },
                      {
                        num: "II",
                        title: "Work-Friendly Stays",
                        tagline: "Fast WiFi, dedicated desks, no distractions",
                        count: "22",
                      },
                      {
                        num: "III",
                        title: "Pet-Friendly Stays",
                        tagline: "Your dog's next adventure awaits",
                        count: "30",
                      },
                    ].map((row, i) => (
                      <div
                        key={row.num}
                        className="group"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "24px",
                          padding: "20px 24px",
                          borderTop:
                            i > 0 ? "1px solid oklch(0.88 0.025 75)" : "none",
                          cursor: "pointer",
                          transition: "padding-left 300ms ease",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "Jost, system-ui, sans-serif",
                            fontSize: "0.875rem",
                            fontWeight: 700,
                            color: "oklch(0.68 0.12 68)",
                            letterSpacing: "0.05em",
                            width: "24px",
                            flexShrink: 0,
                          }}
                        >
                          {row.num}
                        </span>
                        <div
                          style={{
                            width: "1px",
                            height: "36px",
                            background: "oklch(0.88 0.025 75)",
                            flexShrink: 0,
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontFamily: "Bitter, Georgia, serif",
                              fontSize: "1.125rem",
                              fontWeight: 700,
                              color: "oklch(0.22 0.01 60)",
                              marginBottom: "2px",
                            }}
                          >
                            {row.title}
                          </h3>
                          <p
                            style={{
                              fontFamily: "Alegreya, Georgia, serif",
                              fontSize: "0.875rem",
                              fontStyle: "italic",
                              color: "oklch(0.50 0.03 60)",
                            }}
                          >
                            {row.tagline}
                          </p>
                        </div>
                        <span
                          style={{
                            fontFamily: "Jost, system-ui, sans-serif",
                            fontSize: "0.8rem",
                            color: "oklch(0.60 0.03 60)",
                          }}
                        >
                          {row.count} stays →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hero gradient overlay */}
                <div>
                  <p
                    style={{
                      fontFamily: "Jost, system-ui, sans-serif",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "oklch(0.55 0.03 60)",
                      marginBottom: "8px",
                    }}
                  >
                    Hero Gradient Overlay
                  </p>
                  <div
                    style={{
                      position: "relative",
                      height: "180px",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background:
                        "linear-gradient(to bottom, oklch(0.60 0.05 150), oklch(0.30 0.05 150))",
                    }}
                  >
                    <div className="hero-overlay absolute inset-0" />
                    <div
                      style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "24px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.82 0.08 70)",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                        }}
                      >
                        Treehouses · California
                      </p>
                      <h3
                        style={{
                          fontFamily: "Bitter, Georgia, serif",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: "oklch(0.99 0.005 85)",
                        }}
                      >
                        Redwood Canopy Treehouse
                      </h3>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.65rem",
                        color: "oklch(0.80 0.01 85)",
                        background: "rgba(0,0,0,0.4)",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                    >
                      .hero-overlay class applied
                    </div>
                  </div>
                </div>
              </div>
            </Section>

            {/* ══ ANTI-PATTERNS ════════════════════════════ */}
            <Section
              id="antipatterns"
              eyebrow="09 · Governance"
              title="Anti-patterns"
            >
              <p
                style={{
                  fontFamily: "Alegreya, Georgia, serif",
                  fontSize: "1rem",
                  fontStyle: "italic",
                  color: "oklch(0.45 0.03 60)",
                  marginBottom: "24px",
                }}
              >
                These patterns are explicitly banned from this design system. Side-by-side comparisons below.
              </p>

              <div className="space-y-8">
                {/* 1. Bounce easing */}
                <div
                  className="rounded-2xl overflow-hidden border border-[oklch(0.88_0.025_75)]"
                >
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "oklch(0.94 0.022 78)",
                      borderBottom: "1px solid oklch(0.88 0.025 75)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "oklch(0.40 0.03 60)",
                      }}
                    >
                      Bounce / Spring Easing
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-0">
                    <div
                      style={{
                        padding: "20px",
                        background: "oklch(0.98 0.01 20)",
                        borderRight: "1px solid oklch(0.88 0.025 75)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.55 0.14 20)",
                          marginBottom: "12px",
                        }}
                      >
                        ❌ Wrong
                      </p>
                      <div
                        style={{
                          background: "oklch(0.55 0.14 38)",
                          color: "oklch(0.99 0.005 85)",
                          borderRadius: "12px",
                          padding: "10px 20px",
                          display: "inline-block",
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.8rem",
                          transition: "transform 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.transform = "translateY(-8px) scale(1.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = "none")
                        }
                      >
                        Hover me (bounce)
                      </div>
                      <p
                        style={{
                          fontFamily: "Alegreya, Georgia, serif",
                          fontSize: "0.75rem",
                          fontStyle: "italic",
                          color: "oklch(0.55 0.03 60)",
                          marginTop: "10px",
                        }}
                      >
                        cubic-bezier(0.34, 1.56, 0.64, 1) — overshoots, bouncy
                      </p>
                    </div>
                    <div style={{ padding: "20px", background: "oklch(0.97 0.01 148)" }}>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.40 0.10 148)",
                          marginBottom: "12px",
                        }}
                      >
                        ✓ Correct
                      </p>
                      <div
                        style={{
                          background: "oklch(0.55 0.14 38)",
                          color: "oklch(0.99 0.005 85)",
                          borderRadius: "12px",
                          padding: "10px 20px",
                          display: "inline-block",
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.8rem",
                          transition: "transform 350ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 350ms ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = "0 16px 40px rgba(44,30,20,0.22)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "none";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        Hover me (ease-out)
                      </div>
                      <p
                        style={{
                          fontFamily: "Alegreya, Georgia, serif",
                          fontSize: "0.75rem",
                          fontStyle: "italic",
                          color: "oklch(0.50 0.03 60)",
                          marginTop: "10px",
                        }}
                      >
                        cubic-bezier(0.22, 1, 0.36, 1) + translateY(-4px) only
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Gradient text */}
                <div className="rounded-2xl overflow-hidden border border-[oklch(0.88_0.025_75)]">
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "oklch(0.94 0.022 78)",
                      borderBottom: "1px solid oklch(0.88 0.025 75)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "oklch(0.40 0.03 60)",
                      }}
                    >
                      Gradient Text / Text Clip
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-0">
                    <div
                      style={{
                        padding: "20px",
                        background: "oklch(0.98 0.01 20)",
                        borderRight: "1px solid oklch(0.88 0.025 75)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.55 0.14 20)",
                          marginBottom: "12px",
                        }}
                      >
                        ❌ Wrong
                      </p>
                      <h3
                        style={{
                          fontFamily: "Bitter, Georgia, serif",
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          background: "linear-gradient(to right, oklch(0.55 0.14 38), oklch(0.68 0.12 68))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        Sleep somewhere extraordinary.
                      </h3>
                    </div>
                    <div style={{ padding: "20px", background: "oklch(0.97 0.01 148)" }}>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.40 0.10 148)",
                          marginBottom: "12px",
                        }}
                      >
                        ✓ Correct
                      </p>
                      <h3
                        style={{
                          fontFamily: "Bitter, Georgia, serif",
                          fontSize: "1.75rem",
                          fontWeight: 700,
                          color: "oklch(0.22 0.01 60)",
                          lineHeight: 1.1,
                        }}
                      >
                        Sleep somewhere{" "}
                        <span
                          style={{
                            fontStyle: "italic",
                            color: "oklch(0.55 0.14 38)",
                          }}
                        >
                          extraordinary.
                        </span>
                      </h3>
                    </div>
                  </div>
                </div>

                {/* 3. Hero metric cluster */}
                <div className="rounded-2xl overflow-hidden border border-[oklch(0.88_0.025_75)]">
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "oklch(0.94 0.022 78)",
                      borderBottom: "1px solid oklch(0.88 0.025 75)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "oklch(0.40 0.03 60)",
                      }}
                    >
                      Hero Metric Clusters / Stat Badges
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-0">
                    <div
                      style={{
                        padding: "20px",
                        background: "oklch(0.98 0.01 20)",
                        borderRight: "1px solid oklch(0.88 0.025 75)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.55 0.14 20)",
                          marginBottom: "12px",
                        }}
                      >
                        ❌ Wrong — stat cluster in hero
                      </p>
                      <div style={{ display: "flex", gap: "12px" }}>
                        {[
                          { value: "64+", label: "Stays" },
                          { value: "4.97", label: "Rating" },
                          { value: "12k", label: "Travelers" },
                        ].map((s) => (
                          <div
                            key={s.label}
                            style={{
                              background: "rgba(255,255,255,0.15)",
                              backdropFilter: "blur(8px)",
                              border: "1px solid rgba(255,255,255,0.3)",
                              borderRadius: "12px",
                              padding: "10px 16px",
                              textAlign: "center",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Bitter, Georgia, serif",
                                fontSize: "1.25rem",
                                fontWeight: 700,
                                color: "oklch(0.22 0.01 60)",
                              }}
                            >
                              {s.value}
                            </div>
                            <div
                              style={{
                                fontFamily: "Jost, system-ui, sans-serif",
                                fontSize: "0.65rem",
                                color: "oklch(0.50 0.03 60)",
                              }}
                            >
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "20px", background: "oklch(0.97 0.01 148)" }}>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.40 0.10 148)",
                          marginBottom: "12px",
                        }}
                      >
                        ✓ Correct — stats in prose or newsletter
                      </p>
                      <p
                        style={{
                          fontFamily: "Alegreya, Georgia, serif",
                          fontSize: "0.95rem",
                          color: "oklch(0.45 0.03 60)",
                          lineHeight: 1.6,
                        }}
                      >
                        Every week, we send 5 extraordinary stays you've never seen before.
                        Join 12,000+ travelers. No spam.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Glassmorphism */}
                <div className="rounded-2xl overflow-hidden border border-[oklch(0.88_0.025_75)]">
                  <div
                    style={{
                      padding: "12px 16px",
                      background: "oklch(0.94 0.022 78)",
                      borderBottom: "1px solid oklch(0.88 0.025 75)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Jost, system-ui, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "oklch(0.40 0.03 60)",
                      }}
                    >
                      Glassmorphism Cards
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-0">
                    <div
                      style={{
                        padding: "20px",
                        background: "oklch(0.98 0.01 20)",
                        borderRight: "1px solid oklch(0.88 0.025 75)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.55 0.14 20)",
                          marginBottom: "12px",
                        }}
                      >
                        ❌ Wrong — glassy card panel
                      </p>
                      <div
                        style={{
                          background: "rgba(255, 255, 255, 0.12)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255,255,255,0.25)",
                          borderRadius: "16px",
                          padding: "16px",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Jost, system-ui, sans-serif",
                            fontSize: "0.85rem",
                            color: "oklch(0.35 0.02 60)",
                          }}
                        >
                          Glassy card — not brand aligned
                        </p>
                      </div>
                    </div>
                    <div style={{ padding: "20px", background: "oklch(0.97 0.01 148)" }}>
                      <p
                        style={{
                          fontFamily: "Jost, system-ui, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "oklch(0.40 0.10 148)",
                          marginBottom: "12px",
                        }}
                      >
                        ✓ Correct — warm white card, subtle shadow
                      </p>
                      <div
                        style={{
                          background: "oklch(0.97 0.015 80)",
                          border: "1.5px solid oklch(0.88 0.025 75)",
                          borderRadius: "16px",
                          padding: "16px",
                          boxShadow: "0 2px 16px -4px rgba(44,30,20,0.12)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Jost, system-ui, sans-serif",
                            fontSize: "0.85rem",
                            color: "oklch(0.35 0.02 60)",
                          }}
                        >
                          Warm white, sand border, warm shadow
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
