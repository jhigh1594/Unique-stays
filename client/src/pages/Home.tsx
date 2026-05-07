// ============================================================
// Home Page — Unique Stays USA
// Design: Wanderer's Postcard Collection
// Sections: Hero, Categories, Featured Stays, Editorial Strip,
//           More Stays, Newsletter, About Teaser
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, ChevronRight, Search, Sparkles, MapPin } from 'lucide-react';
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
    <div className="min-h-screen" style={{ background: 'oklch(0.975 0.012 85)' }}>
      <Navbar />

      {/* ── HERO SECTION ──────────────────────────────────── */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 grain-overlay">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-treehouse-JWbjZXvAKxUiXAg4QS7BnL.webp"
            alt="Enchanted treehouse in redwood forest"
            className="w-full h-full object-cover"
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
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
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
              style={{ fontFamily: 'Fraunces, serif', textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
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
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}
            >
              We find the treehouses, domes, lighthouses, and hidden wonders that turn a trip into a story worth telling.
            </p>

            {/* Search Bar */}
            <div
              className="flex items-center gap-3 p-2 pl-4 rounded-2xl mb-6 max-w-lg"
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
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', color: 'oklch(0.22 0.01 60)' }}
              />
              <Link href={`/directory${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{
                    background: 'oklch(0.55 0.14 38)',
                    color: 'oklch(0.99 0.005 85)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  Find It
                </button>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 flex-wrap">
              {[
                { value: '400+', label: 'Curated Stays' },
                { value: '48', label: 'States Covered' },
                { value: '10', label: 'Categories' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: 'oklch(0.85 0.10 45)', fontFamily: 'Fraunces, serif' }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-sm text-white/70"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-12 z-10 hidden md:flex flex-col items-center gap-2">
          <span
            className="text-xs text-white/60 uppercase tracking-widest"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', writingMode: 'vertical-rl' }}
          >
            Scroll to explore
          </span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 w-full bg-white/80"
              style={{ height: '40%', animation: 'scrollLine 2s ease-in-out infinite' }}
            />
          </div>
        </div>
      </section>

      {/* ── CATEGORIES STRIP ──────────────────────────────── */}
      <section className="py-10 border-b border-[oklch(0.88_0.025_75)]" style={{ background: 'oklch(0.99 0.005 85)' }}>
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <h2
              className="text-sm font-bold uppercase tracking-widest"
              style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Browse by Type
            </h2>
            <div className="flex-1 h-px bg-[oklch(0.88_0.025_75)]" />
            <Link href="/directory">
              <span
                className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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
                  style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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
          {/* Section Header — magazine department number format */}
          <div className="flex items-stretch gap-6 mb-12 fade-up">
            {/* Section number */}
            <div className="flex-shrink-0 flex items-center">
              <span
                className="font-bold leading-none select-none"
                style={{
                  fontFamily: 'Fraunces, serif',
                  fontSize: 'clamp(5rem, 10vw, 8rem)',
                  color: 'oklch(0.88 0.025 75)',
                  lineHeight: 1,
                }}
              >
                01
              </span>
            </div>
            {/* Vertical rule */}
            <div className="w-px self-stretch" style={{ background: 'oklch(0.88 0.025 75)' }} />
            {/* Title + description + CTA */}
            <div className="flex flex-col justify-between py-1 flex-1">
              <div>
                <h2
                  className="text-4xl md:text-5xl font-bold leading-tight mb-2"
                  style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.22 0.01 60)' }}
                >
                  This Week's Stays
                </h2>
                <p
                  className="text-sm"
                  style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                >
                  The places we can't stop thinking about.
                </p>
              </div>
              <Link href="/directory">
                <button
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 border-2 text-sm font-semibold transition-all self-start hover:bg-[oklch(0.55_0.14_38)] hover:text-[oklch(0.99_0.005_85)] hover:border-[oklch(0.55_0.14_38)]"
                  style={{
                    borderRadius: '2px',
                    borderColor: 'oklch(0.55 0.14 38)',
                    color: 'oklch(0.55 0.14 38)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  Browse Everything <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
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
                        className="stamp-badge"
                        style={{
                          background: 'oklch(0.55 0.14 38)',
                          color: 'oklch(0.99 0.005 85)',
                          borderColor: 'oklch(0.72 0.10 40)',
                          fontFamily: 'Plus Jakarta Sans, sans-serif',
                        }}
                      >
                        ✦ Editor's Pick
                      </span>
                      <span
                        className="stamp-badge"
                        style={{ background: '#FFE4DE', color: '#FF5A5F', borderColor: '#FF5A5F', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        Airbnb
                      </span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p
                        className="text-xs font-bold uppercase tracking-widest mb-2"
                        style={{ color: 'oklch(0.85 0.10 45)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {featuredStays[0].category} · {featuredStays[0].state}
                      </p>
                      <h3
                        className="text-3xl font-bold text-white mb-2 leading-tight"
                        style={{ fontFamily: 'Fraunces, serif' }}
                      >
                        {featuredStays[0].title}
                      </h3>
                      <p
                        className="text-sm text-white/75 mb-4 line-clamp-2"
                        style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {featuredStays[0].description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span
                            className="text-2xl font-bold text-white"
                            style={{ fontFamily: 'Fraunces, serif' }}
                          >
                            ${featuredStays[0].price}
                          </span>
                          <span className="text-white/60 text-sm" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                            / night
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all group-hover:gap-3"
                          style={{
                            background: 'oklch(0.55 0.14 38)',
                            color: 'oklch(0.99 0.005 85)',
                            fontFamily: 'Plus Jakarta Sans, sans-serif',
                          }}
                        >
                          Take Me There <ArrowRight className="w-4 h-4" />
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
                  <StayCard stay={stay} index={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL BANNER ──────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden grain-overlay"
        style={{ background: 'oklch(0.38 0.09 155)' }}
      >
        {/* Decorative background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.99 0.005 85) 0%, transparent 50%), radial-gradient(circle at 80% 50%, oklch(0.72 0.10 40) 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="fade-up">
              {/* Stamp-style label */}
              <div className="mb-6">
                <span
                  className="stamp-badge"
                  style={{
                    color: 'oklch(0.85 0.10 45)',
                    borderColor: 'oklch(0.85 0.10 45)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  Our Philosophy
                </span>
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.99 0.005 85)' }}
              >
                Not just a place
                <br />to sleep.
                <br />
                <span style={{ fontStyle: 'italic', color: 'oklch(0.85 0.10 45)' }}>
                  A story to tell.
                </span>
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'oklch(0.85 0.04 155)', fontFamily: 'Plus Jakarta Sans, sans-serif', maxWidth: '440px' }}
              >
                We believe the best travel memories aren't made in hotel rooms — they're made in the places that make you gasp when you arrive. We spend hundreds of hours finding them so you don't have to.
              </p>
            </div>

            {/* Right: Postcard-style image with hard tilt */}
            <div className="fade-up flex justify-center" style={{ transitionDelay: '150ms' }}>
              <div
                className="overflow-hidden shadow-2xl"
                style={{ transform: 'rotate(5deg)', borderRadius: '3px', maxWidth: '420px', width: '100%' }}
              >
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-banner-mhiZ34LNJ6enqJKTL8o9M4.webp"
                  alt="Unique stays collage"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITOR'S PICKS ────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Full-bleed editorial header — no eyebrow, just weight */}
          <div className="mb-12 fade-up flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <h2
              className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
              style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.22 0.01 60)' }}
            >
              Editor's
              <br />
              <span style={{ fontStyle: 'italic', color: 'oklch(0.55 0.14 38)' }}>Picks.</span>
            </h2>
            <p
              className="text-sm max-w-xs pb-2"
              style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif', lineHeight: 1.6 }}
            >
              Hand-reviewed by our team. Every one of these made us say <em>"I need to go here."</em>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {editorsPickStays.map((stay, i) => (
              <div key={stay.id} className="fade-up" style={{ transitionDelay: `${i * 100}ms` }}>
                <StayCard stay={stay} index={i + 2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORY SHOWCASE ─────────────────────────────── */}
      <section
        className="py-20 grain-overlay"
        style={{ background: 'oklch(0.22 0.01 60)' }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-10 fade-up">
            <span
              className="stamp-badge"
              style={{ color: 'oklch(0.72 0.10 40)', borderColor: 'oklch(0.72 0.10 40)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              Every Kind of Extraordinary
            </span>
            <div className="flex-1 h-px" style={{ background: 'oklch(0.99 0.005 85 / 0.1)' }} />
            <Link href="/directory">
              <span
                className="text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                style={{ color: 'oklch(0.72 0.10 40)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                All stays <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {/* Magazine mosaic — varying visual weights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Row 1: two wide tiles */}
            {CATEGORIES.slice(0, 2).map((cat, i) => {
              const palette = [
                { bg: 'oklch(0.55 0.14 38)', text: 'oklch(0.99 0.005 85)', count: 'oklch(0.85 0.10 45)' },
                { bg: 'oklch(0.38 0.09 155)', text: 'oklch(0.99 0.005 85)', count: 'oklch(0.72 0.12 155)' },
              ][i];
              return (
                <Link key={cat.id} href={`/directory?category=${encodeURIComponent(cat.id)}`}>
                  <div
                    className="fade-up group col-span-1 md:col-span-2 p-8 cursor-pointer transition-all duration-300 hover:brightness-110"
                    style={{
                      background: palette.bg,
                      borderRadius: '3px',
                      transitionDelay: `${i * 60}ms`,
                      minHeight: '160px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="text-4xl">{cat.emoji}</div>
                    <div>
                      <div
                        className="text-2xl md:text-3xl font-bold mb-1"
                        style={{ fontFamily: 'Fraunces, serif', color: palette.text }}
                      >
                        {cat.label}
                      </div>
                      <div
                        className="stamp-badge"
                        style={{ color: palette.count, borderColor: palette.count, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {cat.count} stays
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Row 2: four standard tiles */}
            {CATEGORIES.slice(2, 6).map((cat, i) => {
              const palette = [
                { bg: 'oklch(0.30 0.01 60)', text: 'oklch(0.93 0.025 75)', count: 'oklch(0.60 0.02 60)' },
                { bg: 'oklch(0.72 0.10 40)', text: 'oklch(0.15 0.01 60)', count: 'oklch(0.30 0.04 40)' },
                { bg: 'oklch(0.56 0.09 220)', text: 'oklch(0.99 0.005 85)', count: 'oklch(0.82 0.06 220)' },
                { bg: 'oklch(0.30 0.01 60)', text: 'oklch(0.93 0.025 75)', count: 'oklch(0.60 0.02 60)' },
              ][i];
              return (
                <Link key={cat.id} href={`/directory?category=${encodeURIComponent(cat.id)}`}>
                  <div
                    className="fade-up group p-6 cursor-pointer transition-all duration-300 hover:brightness-110"
                    style={{
                      background: palette.bg,
                      borderRadius: '3px',
                      transitionDelay: `${(i + 2) * 60}ms`,
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="text-3xl">{cat.emoji}</div>
                    <div>
                      <div
                        className="text-lg font-bold mb-1"
                        style={{ fontFamily: 'Fraunces, serif', color: palette.text }}
                      >
                        {cat.label}
                      </div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: palette.count, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {cat.count} stays
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Row 3: remaining tiles */}
            {CATEGORIES.slice(6).map((cat, i) => {
              const palette = [
                { bg: 'oklch(0.52 0.08 155)', text: 'oklch(0.99 0.005 85)', count: 'oklch(0.80 0.06 155)' },
                { bg: 'oklch(0.55 0.14 38)', text: 'oklch(0.99 0.005 85)', count: 'oklch(0.85 0.10 45)' },
                { bg: 'oklch(0.88 0.04 75)', text: 'oklch(0.22 0.01 60)', count: 'oklch(0.50 0.03 60)' },
                { bg: 'oklch(0.38 0.09 155)', text: 'oklch(0.99 0.005 85)', count: 'oklch(0.72 0.12 155)' },
              ][i % 4];
              return (
                <Link key={cat.id} href={`/directory?category=${encodeURIComponent(cat.id)}`}>
                  <div
                    className="fade-up group p-6 cursor-pointer transition-all duration-300 hover:brightness-110"
                    style={{
                      background: palette.bg,
                      borderRadius: '3px',
                      transitionDelay: `${(i + 6) * 60}ms`,
                      minHeight: '130px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div className="text-2xl">{cat.emoji}</div>
                    <div>
                      <div
                        className="text-base font-bold mb-1"
                        style={{ fontFamily: 'Fraunces, serif', color: palette.text }}
                      >
                        {cat.label}
                      </div>
                      <div
                        className="text-xs font-semibold uppercase tracking-widest"
                        style={{ color: palette.count, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                      >
                        {cat.count} stays
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HUB & SPOKE COLLECTIONS ─────────────── */}
      <SpokeHubSection />

      {/* ── MORE STAYS GRID ──────────────────── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Ruled editorial header */}
          <div className="mb-12 fade-up">
            <div className="flex items-center gap-4 mb-3">
              <div className="flex-1 h-px" style={{ background: 'oklch(0.88 0.025 75)' }} />
              <span
                className="stamp-badge"
                style={{ color: 'oklch(0.55 0.14 38)', borderColor: 'oklch(0.55 0.14 38)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Keep Exploring
              </span>
              <div className="flex-1 h-px" style={{ background: 'oklch(0.88 0.025 75)' }} />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <h2
                className="text-5xl md:text-6xl font-bold"
                style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.22 0.01 60)' }}
              >
                More
                <span style={{ fontStyle: 'italic', color: 'oklch(0.55 0.14 38)' }}> Wonders</span>
              </h2>
              <Link href="/directory">
                <button
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 text-sm font-semibold transition-all hover:bg-[oklch(0.55_0.14_38)] hover:text-[oklch(0.99_0.005_85)] hover:border-[oklch(0.55_0.14_38)]"
                  style={{
                    borderRadius: '2px',
                    borderColor: 'oklch(0.55 0.14 38)',
                    color: 'oklch(0.55 0.14 38)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  Full Directory <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentStays.map((stay, i) => (
              <div key={stay.id} className="fade-up" style={{ transitionDelay: `${i * 80}ms` }}>
                <StayCard stay={stay} index={i + 5} />
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
            style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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
                  style={{ fontFamily: 'Fraunces, serif', color: p.color }}
                >
                  {p.name}
                </div>
                <div
                  className="text-xs"
                  style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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

        <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6">
          <div className="fade-up">
            <h2
              className="text-5xl md:text-6xl font-bold mb-4 text-left"
              style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.99 0.005 85)', lineHeight: 1.05 }}
            >
              The Weekly
              <br />
              <span style={{ fontStyle: 'italic', color: 'oklch(0.85 0.10 45)' }}>Wanderer.</span>
            </h2>
            <p
              className="text-base mb-8 text-left"
              style={{ color: 'oklch(0.65 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              New extraordinary stays in your inbox every Tuesday.
            </p>

            {/* Email Form */}
            <form
              className="flex flex-col sm:flex-row gap-3"
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
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  '--tw-ring-color': 'oklch(0.55 0.14 38)',
                } as React.CSSProperties}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg flex-shrink-0"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                Send Me Picks
              </button>
            </form>
            <p
              className="text-xs mt-4"
              style={{ color: 'oklch(0.45 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              12,000+ subscribers. New picks every Tuesday. Bail anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ──────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-up">
              <h2
                className="font-bold mb-6"
                style={{
                  fontFamily: 'Fraunces, serif',
                  color: 'oklch(0.22 0.01 60)',
                  fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
                  lineHeight: 1.05,
                }}
              >
                Built by travelers,
                <br />
                <span style={{ fontStyle: 'italic', color: 'oklch(0.38 0.09 155)' }}>
                  for dreamers.
                </span>
              </h2>
              <div className="mb-4">
                <span
                  className="stamp-badge"
                  style={{
                    color: 'oklch(0.55 0.14 38)',
                    borderColor: 'oklch(0.55 0.14 38)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  Est. 2024
                </span>
              </div>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'oklch(0.45 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                We're a small team of obsessive travelers who got tired of scrolling through thousands of boring listings to find the one magical place. So we built the directory we always wanted.
              </p>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ color: 'oklch(0.45 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Every stay in our directory has been personally reviewed. We look for the "wow" factor — the places that make you feel like you've discovered a secret. When you book through our links, we earn a small affiliate commission that keeps this site running.
              </p>
              <Link href="/about">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:gap-3"
                  style={{
                    background: 'oklch(0.38 0.09 155)',
                    color: 'oklch(0.99 0.005 85)',
                    fontFamily: 'Plus Jakarta Sans, sans-serif',
                  }}
                >
                  How We Pick Them <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>

            {/* Right: Two images stacked with offset */}
            <div className="fade-up relative" style={{ transitionDelay: '150ms' }}>
              <div className="relative h-96">
                <div
                  className="absolute top-0 right-0 w-4/5 h-64 overflow-hidden shadow-xl"
                  style={{ transform: 'rotate(5deg)', borderRadius: '3px' }}
                >
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-dome-fNq53JMSCre9pYDm759BF5.webp"
                    alt="Desert dome glamping"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-0 left-0 w-3/5 h-52 overflow-hidden shadow-xl border-[10px] border-white"
                  style={{ transform: 'rotate(-4deg)', borderRadius: '3px' }}
                >
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/86702083/ByQr52J2uJxPcTScSSaduY/hero-houseboat-6e6D3bBeEjwZSSmSxByNAZ.webp"
                    alt="Houseboat on autumn lake"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating postmark badge */}
                <div
                  className="absolute top-1/2 left-1/2 z-10 shadow-lg"
                  style={{
                    transform: 'translate(-50%, -50%) rotate(-10deg)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span
                    className="stamp-badge"
                    style={{
                      background: 'oklch(0.55 0.14 38)',
                      color: 'oklch(0.99 0.005 85)',
                      borderColor: 'oklch(0.72 0.10 40)',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                      fontSize: '0.7rem',
                      padding: '6px 14px',
                      letterSpacing: '0.14em',
                    }}
                  >
                    400+ stays & counting ✦
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / SOCIAL PROOF STRIP ─────────── */}
      <section
        className="py-12 border-y border-[oklch(0.88_0.025_75)]"
        style={{ background: 'oklch(0.975 0.012 85)' }}
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
                  style={{ color: 'oklch(0.35 0.02 60)', fontFamily: 'Fraunces, serif', fontSize: '1rem' }}
                >
                  {t.quote}
                </p>
                <div>
                  <div
                    className="text-sm font-bold"
                    style={{ color: 'oklch(0.22 0.01 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {t.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
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

      {/* Scroll line animation */}
      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
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

// ── Hub & Spoke Collections Section ───────────────────────────
function SpokeHubSection() {
  return (
    <section
      className="py-20"
      style={{ background: 'oklch(0.22 0.01 60)' }}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header — centered stamp rule, no h2 */}
        <div className="mb-12 fade-up">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: 'oklch(0.99 0.005 85 / 0.12)' }} />
            <span
              className="stamp-badge"
              style={{
                color: 'oklch(0.72 0.10 40)',
                borderColor: 'oklch(0.72 0.10 40)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                padding: '5px 16px',
              }}
            >
              Five Collections
            </span>
            <div className="flex-1 h-px" style={{ background: 'oklch(0.99 0.005 85 / 0.12)' }} />
          </div>
          <p
            className="text-sm text-center max-w-lg mx-auto"
            style={{ color: 'oklch(0.55 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            One directory. Five ways to find exactly what you're looking for.
          </p>
        </div>

        {/* Spoke Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {SPOKES.map((spoke, i) => (
            <Link key={spoke.slug} href={`/${spoke.slug}`}>
              <div
                className="fade-up group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                style={{
                  transitionDelay: `${i * 80}ms`,
                  border: '1px solid oklch(0.99 0.005 85 / 0.1)',
                }}
              >
                {/* Background image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={spoke.heroImage}
                    alt={spoke.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to top, oklch(0.12 0.02 60 / 0.95) 0%, oklch(0.12 0.02 60 / 0.4) 60%, transparent 100%)`,
                    }}
                  />
                  {/* Emoji badge */}
                  <div
                    className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: 'oklch(0.99 0.005 85 / 0.15)', backdropFilter: 'blur(8px)' }}
                  >
                    {spoke.heroEmoji}
                  </div>
                  {/* Domain redirect badge */}
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: 'oklch(0.99 0.005 85 / 0.12)',
                      color: 'oklch(0.85 0.01 85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid oklch(0.99 0.005 85 / 0.2)',
                      fontFamily: 'Plus Jakarta Sans, sans-serif',
                    }}
                  >
                    {spoke.externalDomain.split('.')[0]}
                  </div>
                </div>

                {/* Content */}
                <div
                  className="p-4"
                  style={{ background: 'oklch(0.18 0.01 60)' }}
                >
                  <h3
                    className="font-bold mb-1 text-base"
                    style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.99 0.005 85)' }}
                  >
                    {spoke.title}
                  </h3>
                  <p
                    className="text-xs leading-snug mb-3"
                    style={{ color: 'oklch(0.60 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {spoke.tagline}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3">
                      {spoke.stats.slice(0, 2).map((stat, j) => (
                        <div key={j}>
                          <div
                            className="text-sm font-bold"
                            style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.85 0.10 45)' }}
                          >
                            {stat.value}
                          </div>
                          <div
                            className="text-[10px]"
                            style={{ color: 'oklch(0.50 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                      style={{ color: spoke.accentColor, fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    >
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom note about redirects */}
        <div className="text-center mt-10 fade-up">
          <p
            className="text-xs"
            style={{ color: 'oklch(0.40 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            workfriendlystays.com · stayswithpets.com · rvreadystays.com · evreadystays.com — all redirect here
          </p>
        </div>
      </div>
    </section>
  );
}
