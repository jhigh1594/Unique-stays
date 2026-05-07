// ============================================================
// Directory Page — Unique Stays USA
// Design: The Naturalist's Field Catalog
// Full filterable/searchable directory of all curated stays
// ============================================================

import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'wouter';
import { Search, SlidersHorizontal, X, MapPin, ChevronDown } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StayCard from '@/components/StayCard';
import { STAYS, CATEGORIES, REGIONS, type Category, type Region } from '@/lib/stays-data';

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function Directory() {
  useScrollReveal();
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [activeRegion, setActiveRegion] = useState<Region>('All');
  const [activePlatform, setActivePlatform] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [showFilters, setShowFilters] = useState(false);

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    const q = params.get('q');
    if (cat) setActiveCategory(cat as Category);
    if (q) setSearchQuery(q);
  }, [location]);

  const filtered = useMemo(() => {
    let results = [...STAYS];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.location.toLowerCase().includes(q) ||
          s.state.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q)) ||
          s.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (activeCategory !== 'All') {
      results = results.filter((s) => s.category === activeCategory);
    }

    // Region
    if (activeRegion !== 'All') {
      results = results.filter((s) => s.region === activeRegion);
    }

    // Platform
    if (activePlatform !== 'All') {
      results = results.filter((s) => s.platform === activePlatform);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      default:
        results.sort((a, b) => {
          if (a.editorsPick && !b.editorsPick) return -1;
          if (!a.editorsPick && b.editorsPick) return 1;
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
    }

    return results;
  }, [searchQuery, activeCategory, activeRegion, activePlatform, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setActiveRegion('All');
    setActivePlatform('All');
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery || activeCategory !== 'All' || activeRegion !== 'All' || activePlatform !== 'All';

  return (
    <div className="min-h-screen" style={{ background: 'oklch(0.94 0.022 78)' }}>
      <Navbar />

      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <section
        className="pt-28 pb-12 relative overflow-hidden"
        style={{ background: 'oklch(0.22 0.01 60)' }}
      >
        {/* Decorative */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 -translate-y-1/2 translate-x-1/2"
          style={{ background: 'oklch(0.55 0.14 38)' }}
        />

        <div className="relative z-10 max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-widest mb-3"
                style={{ color: 'oklch(0.72 0.10 40)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                <MapPin className="w-3 h-3 inline mr-1" />
                The Full Collection
              </p>
              <h1
                className="text-5xl md:text-6xl font-bold leading-tight"
                style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.99 0.005 85)' }}
              >
                Every
                <span style={{ fontStyle: 'italic', color: 'oklch(0.85 0.10 45)' }}> Extraordinary</span>
                <br />Stay, In One Place
              </h1>
            </div>
            <div
              className="text-right"
              style={{ color: 'oklch(0.60 0.02 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              <div
                className="text-4xl font-bold"
                style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.85 0.10 45)' }}
              >
                {filtered.length}
              </div>
              <div className="text-sm">stays found</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH + FILTERS ────────────────────────────── */}
      <section
        className="sticky top-16 md:top-20 z-30 py-4 border-b border-[oklch(0.88_0.025_75)]"
        style={{ background: 'oklch(0.94 0.022 78 / 0.97)', backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className="flex items-center gap-2 flex-1 max-w-sm px-3 py-2 rounded-xl"
              style={{ background: 'oklch(0.99 0.005 85)', border: '1.5px solid oklch(0.88 0.025 75)' }}
            >
              <Search className="w-4 h-4 flex-shrink-0" style={{ color: 'oklch(0.55 0.14 38)' }} />
              <input
                type="text"
                placeholder="Search stays..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ fontFamily: 'Jost, system-ui, sans-serif', color: 'oklch(0.22 0.01 60)' }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-4 h-4" style={{ color: 'oklch(0.55 0.03 60)' }} />
                </button>
              )}
            </div>

            {/* Filter Toggle */}
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: showFilters ? 'oklch(0.55 0.14 38)' : 'oklch(0.99 0.005 85)',
                color: showFilters ? 'oklch(0.99 0.005 85)' : 'oklch(0.40 0.03 60)',
                border: '1.5px solid oklch(0.88 0.025 75)',
                fontFamily: 'Jost, system-ui, sans-serif',
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: showFilters ? 'oklch(0.99 0.005 85)' : 'oklch(0.55 0.14 38)' }}
                />
              )}
            </button>

            {/* Sort */}
            <div className="relative hidden sm:block">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl text-sm font-medium outline-none"
                style={{
                  background: 'oklch(0.99 0.005 85)',
                  color: 'oklch(0.40 0.03 60)',
                  border: '1.5px solid oklch(0.88 0.025 75)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                <option value="featured">Featured First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown
                className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: 'oklch(0.55 0.03 60)' }}
              />
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                className="text-sm font-medium transition-colors hover:text-[oklch(0.55_0.14_38)]"
                style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                onClick={clearFilters}
              >
                Clear all
              </button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-[oklch(0.88_0.025_75)] grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Category */}
              <div>
                <label
                  className="text-xs font-bold uppercase tracking-widest mb-2 block"
                  style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                >
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`category-pill ${activeCategory === 'All' ? 'active' : 'inactive'}`}
                    onClick={() => setActiveCategory('All')}
                  >
                    All
                  </button>
                  {CATEGORIES.slice(0, 5).map((cat) => (
                    <button
                      key={cat.id}
                      className={`category-pill ${activeCategory === cat.id ? 'active' : 'inactive'}`}
                      onClick={() => setActiveCategory(cat.id)}
                    >
                      {cat.emoji} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Region */}
              <div>
                <label
                  className="text-xs font-bold uppercase tracking-widest mb-2 block"
                  style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                >
                  Region
                </label>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((region) => (
                    <button
                      key={region}
                      className={`category-pill ${activeRegion === region ? 'active' : 'inactive'}`}
                      onClick={() => setActiveRegion(region)}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>

              {/* Platform */}
              <div>
                <label
                  className="text-xs font-bold uppercase tracking-widest mb-2 block"
                  style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
                >
                  Platform
                </label>
                <div className="flex flex-wrap gap-2">
                  {['All', 'Airbnb', 'VRBO', 'Wander', 'Direct'].map((p) => (
                    <button
                      key={p}
                      className={`category-pill ${activePlatform === p ? 'active' : 'inactive'}`}
                      onClick={() => setActivePlatform(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── RESULTS GRID ────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🗺️</div>
              <h3
                className="text-2xl font-bold mb-2"
                style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
              >
                No stays found
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Alegreya, Georgia, serif' }}
              >
                Try adjusting your filters or search terms
              </p>
              <button
                className="px-5 py-2.5 rounded-full text-sm font-semibold"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((stay, i) => (
                <div
                  key={stay.id}
                  className="fade-up"
                  style={{ transitionDelay: `${Math.min(i * 50, 400)}ms` }}
                >
                  <StayCard stay={stay} variant="compact" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
