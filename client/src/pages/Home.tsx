// ============================================================
// Home Page — Unique Stays USA
// Design: The Naturalist's Field Catalog
// Sections: Hero, Categories, Featured Stays, Editorial Quote,
//           Editor's Picks, Category Showcase, Chapter Nav,
//           More Stays, Platform Logos, Newsletter, About Teaser,
//           Testimonials
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronRight, Search, Sparkles } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StayCard from '@/components/StayCard';
import { STAYS, CATEGORIES, SPOKES } from '@/lib/stays-data';

// ── Scroll animation hook ──────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Home() {
  useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  const featuredStays = STAYS.filter((s) => s.featured);
  const editorsPickStays = STAYS.filter((s) => s.editorsPick && !s.featured).slice(0, 3);
  const recentStays = STAYS.filter((s) => !s.featured).slice(0, 6);

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.94 0.022 78)' }}>
      <Navbar />

      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-treehouse-JWbjZXvAKxUiXAg4QS7BnL.webp"
            alt="Enchanted treehouse in redwood forest"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'oklch(0.55 0.14 38 / 0.9)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Sparkles className="w-3 h-3" />
                Curated Stays Across America
              </span>
            </div>

            {/* Main Headline */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.95] mb-6 text-white"
              style={{ fontFamily: 'Bitter, Georgia, serif', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
            >
              Sleep somewhere
              <br />
              <span style={{ color: 'oklch(0.85 0.10 45)', fontStyle: 'italic' }}>
                extraordinary.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg md:text-xl text-white/85 mb-8 max-w-lg leading-relaxed"
              style={{ fontFamily: 'Alegreya, Georgia, serif', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
            >
              We find the treehouses, domes, lighthouses, and hidden wonders that turn a trip into a story worth telling.
            </p>

            {/* Search Bar */}
            <div
              className="flex items-center gap-3 p-2 pl-4 rounded-2xl max-w-lg"
              style={{
                background: 'oklch(0.99 0.005 85 / 0.95)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 40px -8px rgba(0,0,0,0.3)',
              }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.55 0.14 38)' }} />
              <input
                type="text"
                placeholder="Search by state, type, or vibe..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-[oklch(0.65_0.02_60)]"
                style={{ fontFamily: 'Jost, system-ui, sans-serif', color: 'oklch(0.22 0.01 60)' }}
              />
              <Link href={`/directory${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    background: 'oklch(0.55 0.14 38)',
                    color: 'oklch(0.99 0.005 85)',
                    fontFamily: 'Jost, system-ui, sans-serif',
                  }}
                >
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES STRIP ──────────────────────────────── */}
      <section className="py-10 border-b border-[oklch(0.88_0.025_75)]" style={{ background: 'oklch(0.99 0.005 85)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <h2
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              Browse by Type
            </h2>
            <div className="flex-1 h-px bg-[oklch(0.88_0.025_75)]" />
            <Link href="/directory">
              <span
                className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                See all <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Scrollable category pills */}
          <div
            ref={categoryScrollRef}
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <button
              className={`category-pill flex-shrink-0 ${activeCategory === 'All' ? 'active' : 'inactive'}`}
              onClick={() => setActiveCategory('All')}
            >
              🗺️ All Stays
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill flex-shrink-0 ${activeCategory === cat.id ? 'active' : 'inactive'}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span
                  className="ml-1 text-xs opacity-60"
                  style={{ fontFamily: 'Jost, system-ui, sans-serif' }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED STAYS ────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 fade-up">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                ✦ This Week's Favorites
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold leading-tight"
                style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
              >
                Featured
                <br />
                <span style={{ fontStyle: 'italic', color: 'oklch(0.55 0.14 38)' }}>Extraordinary</span> Stays
              </h2>
            </div>
            <Link href="/directory">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all hover:bg-[oklch(0.55_0.14_38)] hover:text-[oklch(0.99_0.005_85)] hover:border-[oklch(0.55_0.14_38)]"
                style={{
                  borderColor: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.55 0.14 38)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                View All Stays <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Featured Grid — asymmetric layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Large featured card */}
            <div className="lg:col-span-2 fade-up" style={{ transitionDelay: '100ms' }}>
              {featuredStays[0] && (
                <a
                  href={featuredStays[0].affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group block"
                >
                  <div
                    className="stay-card relative overflow-hidden rounded-2xl"
                    style={{ height: '480px' }}
                  >
                    <img
                      src={featuredStays[0].image}
                      alt={featuredStays[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 flex gap-2">
                      <span
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{
                          background: 'oklch(0.55 0.14 38)',
                          color: 'oklch(0.99 0.005 85)',
                          fontFamily: 'Jost, system-ui, sans-serif',
                        }}
                      >
                        ✦ Editor's Pick
                      </span>
                      <span
                        className="px-3 py-1.5 rounded-full text-xs font-bold"
                        style={{ background: '#FFE4DE', color: '#FF5A5F', fontFamily: 'Jost, system-ui, sans-serif' }}
                      >
                        Airbnb
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-2"
                        style={{ color: 'oklch(0.85 0.10 45)', fontFamily: 'Jost, system-ui, sans-serif' }}
                      >
                        {featuredStays[0].category} · {featuredStays[0].state}
                      </p>
                      <h3
                        className="text-3xl font-bold text-white mb-2 leading-tight"
                        style={{ fontFamily: 'Bitter, Georgia, serif' }}
                      >
                        {featuredStays[0].title}
                      </h3>
                      <p
                        className="text-sm text-white/75 mb-4 line-clamp-2"
                        style={{ fontFamily: 'Alegreya, Georgia, serif', fontStyle: 'italic' }}
                      >
                        {featuredStays[0].description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: 'Bitter, Georgia, serif' }}
                          >
                            ${featuredStays[0].price}
                          </span>
                          <span className="text-white/60 text-sm" style={{ fontFamily: 'Jost, system-ui, sans-serif' }}>
                            / night
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all group-hover:gap-3"
                          style={{
                            background: 'oklch(0.55 0.14 38)',
                            color: 'oklch(0.99 0.005 85)',
                            fontFamily: 'Jost, system-ui, sans-serif',
                          }}
                        >
                          Book Now <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              )}
            </div>

            {/* Right column — two stacked cards */}
            <div className="flex flex-col gap-6">
              {featuredStays.slice(1, 3).map((stay, i) => (
                <div key={stay.id} className="fade-up" style={{ transitionDelay: `${200 + i * 100}ms` }}>
                  <StayCard stay={stay} variant="highlight" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL QUOTE ───────────────────────────────── */}
      <EditorialQuoteSection />

      {/* ── EDITOR'S PICKS ────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              ✦ Hand-Picked by Our Team
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold"
              style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
            >
              Editor's <span style={{ fontStyle: 'italic', color: 'oklch(0.55 0.14 38)' }}>Picks</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorsPickStays.map((stay, i) => (
              <div key={stay.id} className="fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <StayCard stay={stay} variant="hero" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY SHOWCASE ─────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: 'oklch(0.93 0.025 75)' }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 fade-up">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                Every Kind of Extraordinary
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
              >
                Browse by
                <span style={{ fontStyle: 'italic', color: 'oklch(0.40 0.10 148)' }}> Category</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.id} href={`/directory?category=${encodeURIComponent(cat.id)}`}>
                <div
                  className="fade-up group p-5 rounded-2xl text-center cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: 'oklch(0.99 0.005 85)',
                    transitionDelay: `${i * 50}ms`,
                    border: '1.5px solid oklch(0.88 0.025 75)',
                  }}
                >
                  <div className="text-3xl mb-3">{cat.emoji}</div>
                  <div
                    className="text-sm font-semibold mb-1 group-hover:text-[oklch(0.55_0.14_38)] transition-colors"
                    style={{ fontFamily: 'Jost, system-ui, sans-serif', color: 'oklch(0.25 0.01 60)' }}
                  >
                    {cat.label}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                  >
                    {cat.count} stays
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER NAV — FIVE COLLECTIONS ───────────────── */}
      <ChapterNavSection />

      {/* ── MORE STAYS GRID ──────────────────── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 fade-up">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                Keep Exploring
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold"
                style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
              >
                More
                <span style={{ fontStyle: 'italic', color: 'oklch(0.55 0.14 38)' }}> Wonders</span>
              </h2>
            </div>
            <Link href="/directory">
              <button
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 text-sm font-semibold transition-all hover:bg-[oklch(0.55_0.14_38)] hover:text-[oklch(0.99_0.005_85)] hover:border-[oklch(0.55_0.14_38)]"
                style={{
                  borderColor: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.55 0.14 38)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                Full Directory <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentStays.map((stay, i) => (
              <div key={stay.id} className="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <StayCard stay={stay} variant="highlight" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM LOGOS ────────────────────────────────── */}
      <section
        className="py-12 border-y border-[oklch(0.88_0.025_75)]"
        style={{ background: 'oklch(0.99 0.005 85)' }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-center text-xs font-bold uppercase tracking-widest mb-8"
            style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
          >
            We curate stays from
          </p>
          <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap">
            {[
              { name: 'Airbnb', color: '#FF5A5F', desc: 'Unique homes & experiences' },
              { name: 'VRBO', color: '#1B5E9E', desc: 'Vacation rentals by owner' },
              { name: 'Wander', color: '#2E7D32', desc: 'Smart vacation homes' },
              { name: 'Direct', color: 'oklch(0.55 0.14 38)', desc: 'Owner direct bookings' },
            ].map((p) => (
              <div key={p.name} className="text-center">
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: 'Jost, system-ui, sans-serif', color: p.color }}
                >
                  {p.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                >
                  {p.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ────────────────────────────────────── */}
      <section
        id="newsletter"
        className="py-24 relative overflow-hidden"
        style={{ background: 'oklch(0.22 0.01 60)' }}
      >
        {/* Decorative circles */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-5"
          style={{ background: 'oklch(0.55 0.14 38)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-5"
          style={{ background: 'oklch(0.85 0.10 45)' }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="fade-up">
            <div className="text-4xl mb-5">✉️</div>
            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: 'oklch(0.72 0.10 40)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              The Weekly Wanderer
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.99 0.005 85)' }}
            >
              Get the best stays
              <br />
              <span style={{ fontStyle: 'italic', color: 'oklch(0.85 0.10 45)' }}>
                in your inbox.
              </span>
            </h2>
            <p
              className="text-base mb-8"
              style={{ color: 'oklch(0.65 0.02 60)', fontFamily: 'Alegreya, Georgia, serif' }}
            >
              Every week, we send 5 extraordinary stays you've never seen before. No spam. Just wanderlust.
            </p>

            {/* Email Form */}
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const input = form.querySelector('input') as HTMLInputElement;
                if (input.value) {
                  input.value = '';
                  alert('Thanks! You\'re on the list. 🎉');
                }
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2"
                style={{
                  background: 'oklch(0.30 0.01 60)',
                  color: 'oklch(0.93 0.025 75)',
                  border: '1.5px solid oklch(0.35 0.01 60)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                  '--tw-ring-color': 'oklch(0.55 0.14 38)',
                } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg flex-shrink-0"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                Subscribe Free
              </button>
            </form>
            <p
              className="text-xs mt-4"
              style={{ color: 'oklch(0.45 0.02 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              Join 12,000+ travelers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ──────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                Who We Are
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
              >
                Built by travelers,
                <br />
                <span style={{ fontStyle: 'italic', color: 'oklch(0.40 0.10 148)' }}>
                  for dreamers.
                </span>
              </h2>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'oklch(0.45 0.03 60)', fontFamily: 'Alegreya, Georgia, serif' }}
              >
                We're a small team of obsessive travelers who got tired of scrolling through thousands of boring listings to find the one magical place. So we built the directory we always wanted.
              </p>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: 'oklch(0.45 0.03 60)', fontFamily: 'Alegreya, Georgia, serif' }}
              >
                Every stay in our directory has been personally reviewed. We look for the "wow" factor — the places that make you feel like you've discovered a secret. When you book through our links, we earn a small affiliate commission that keeps this site running.
              </p>
              <Link href="/about">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:gap-3"
                  style={{
                    background: 'oklch(0.40 0.10 148)',
                    color: 'oklch(0.99 0.005 85)',
                    fontFamily: 'Jost, system-ui, sans-serif',
                  }}
                >
                  Our Story <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Right: Two images stacked with offset */}
            <div className="fade-up relative" style={{ transitionDelay: '150ms' }}>
              <div className="relative h-96">
                <div
                  className="absolute top-0 right-0 w-4/5 h-64 rounded-2xl overflow-hidden shadow-xl"
                  style={{ transform: 'rotate(2deg)' }}
                >
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-dome-fNq53JMSCre9pYDm759BF5.webp"
                    alt="Desert dome glamping"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-0 left-0 w-3/5 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-white"
                  style={{ transform: 'rotate(-1.5deg)' }}
                >
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-houseboat-6e6D3bBeEjwZSSmSxByNAZ.webp"
                    alt="Houseboat on autumn lake"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 px-4 py-2 rounded-full shadow-lg"
                  style={{
                    background: 'oklch(0.55 0.14 38)',
                    color: 'oklch(0.99 0.005 85)',
                    fontFamily: 'Bitter, Georgia, serif',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    transform: 'translate(-50%, -50%) rotate(-8deg)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  400+ stays & counting ✦
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / SOCIAL PROOF STRIP ─────────── */}
      <section
        className="py-12 border-y border-[oklch(0.88_0.025_75)]"
        style={{ background: 'oklch(0.94 0.022 78)' }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: '"We stayed in a cave carved into Sedona\'s red rocks. I literally cried when we arrived. This site found it for us."',
                name: 'Sarah M.',
                location: 'Austin, TX',
              },
              {
                quote: '"The treehouse in Oregon was the most magical place I\'ve ever slept. My kids still talk about it two years later."',
                name: 'James & Lisa T.',
                location: 'Seattle, WA',
              },
              {
                quote: '"I\'ve been using this site for every trip since I found it. The curation is impeccable — nothing boring ever makes the list."',
                name: 'Maya R.',
                location: 'Brooklyn, NY',
              },
            ].map((t, i) => (
              <div
                key={i}
                className="fade-up p-6 rounded-2xl"
                style={{
                  background: 'oklch(0.99 0.005 85)',
                  border: '1.5px solid oklch(0.88 0.025 75)',
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-sm" style={{ color: 'oklch(0.72 0.10 40)' }}>★</span>
                  ))}
                </div>
                <p
                  className="text-sm leading-relaxed mb-4 italic"
                  style={{ color: 'oklch(0.35 0.02 60)', fontFamily: 'Alegreya, Georgia, serif', fontSize: '1rem' }}
                >
                  {t.quote}
                </p>
                <div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: 'oklch(0.22 0.01 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                  >
                    {t.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

// ── Editorial Quote Section ────────────────────────────────
function EditorialQuoteSection() {
  return (
    <section className="py-20 overflow-hidden" style={{ background: 'oklch(0.55 0.14 38)' }}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl fade-up">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-8"
            style={{ color: 'oklch(0.85 0.10 45)', fontFamily: 'Jost, system-ui, sans-serif', letterSpacing: '0.15em' }}
          >
            From the collection
          </p>
          <blockquote
            className="editorial-quote text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
            style={{ color: 'oklch(0.99 0.005 85)', fontFamily: 'Bitter, Georgia, serif', fontStyle: 'italic', lineHeight: '1.15' }}
          >
            "A high-design sanctuary suspended in a grove of ancient redwoods. Soaring wood beams, expansive windows, and forest views in every direction."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-8 h-px" style={{ background: 'oklch(0.85 0.10 45)' }} />
            <p
              className="text-sm font-medium"
              style={{ color: 'oklch(0.85 0.10 45)', fontFamily: 'Jost, system-ui, sans-serif', letterSpacing: '0.05em' }}
            >
              Redwood Treehouse Retreat · Mill Valley, California
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Chapter Navigation — Five Collections ─────────────────
const ROMAN = ['I', 'II', 'III', 'IV', 'V'];

function ChapterNavSection() {
  return (
    <section
      className="py-20 border-t border-[oklch(0.88_0.025_75)]"
      style={{ background: 'oklch(0.94 0.022 78)' }}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 fade-up">
          <p
            className="text-xs font-bold uppercase tracking-[0.15em] mb-3"
            style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
          >
            The Collections
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
          >
            Five ways to find your stay.
          </h2>
        </div>

        <div className="divide-y divide-[oklch(0.88_0.025_75)]">
          {SPOKES.map((spoke, i) => (
            <Link key={spoke.slug} href={`/${spoke.slug}`}>
              <div
                className="group flex items-center gap-6 py-6 md:py-8 cursor-pointer transition-all duration-300 hover:pl-3 fade-up"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Roman numeral */}
                <span
                  className="text-sm font-bold w-8 flex-shrink-0 select-none"
                  style={{ color: 'oklch(0.68 0.12 68)', fontFamily: 'Jost, system-ui, sans-serif', letterSpacing: '0.05em' }}
                >
                  {ROMAN[i]}
                </span>

                {/* Rule */}
                <div
                  className="hidden md:block w-px h-10 flex-shrink-0"
                  style={{ background: 'oklch(0.88 0.025 75)' }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[oklch(0.55_0.14_38)] transition-colors"
                    style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
                  >
                    {spoke.title}
                  </h3>
                  <p
                    className="text-sm md:text-base mt-1"
                    style={{ fontFamily: 'Alegreya, Georgia, serif', color: 'oklch(0.50 0.03 60)', fontStyle: 'italic' }}
                  >
                    {spoke.tagline}
                  </p>
                </div>

                {/* Count + Arrow */}
                <div className="flex items-center gap-4 flex-shrink-0">
                  <span
                    className="hidden md:block text-sm"
                    style={{ color: 'oklch(0.60 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                  >
                    {spoke.stats[0]?.value} stays
                  </span>
                  <ArrowRight
                    className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                    style={{ color: 'oklch(0.55 0.14 38)' }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
