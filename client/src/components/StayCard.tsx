// ============================================================
// StayCard — Unique Stays USA
// Design: The Naturalist's Field Catalog
// Three variants: hero (editor's picks), highlight (default), compact (grids)
// ============================================================

import { Star, MapPin, Users, ExternalLink } from 'lucide-react';
import type { Stay, Platform } from '@/lib/stays-data';

export type StayCardVariant = 'hero' | 'highlight' | 'compact';

interface StayCardProps {
  stay: Stay;
  variant?: StayCardVariant;
  accentColor?: string;
  style?: React.CSSProperties;
}

const PLATFORM_STYLES: Record<Platform, { bg: string; text: string; label: string }> = {
  Airbnb: { bg: '#FFE4DE', text: '#FF5A5F', label: 'Airbnb' },
  VRBO:   { bg: '#E0F0FF', text: '#1B5E9E', label: 'VRBO' },
  Wander: { bg: '#E8F5E9', text: '#2E7D32', label: 'Wander' },
  Direct: { bg: 'oklch(0.93 0.025 75)', text: 'oklch(0.40 0.03 60)', label: 'Direct' },
};

const PLATFORM_CTA: Record<Platform, string> = {
  Airbnb: 'Open on Airbnb',
  VRBO:   'Book on VRBO',
  Wander: 'Stay with Wander',
  Direct: 'Book Direct',
};

export default function StayCard({ stay, variant = 'highlight', accentColor, style }: StayCardProps) {
  void accentColor;
  const platform = PLATFORM_STYLES[stay.platform] || PLATFORM_STYLES.Direct;
  const cta = PLATFORM_CTA[stay.platform] || 'View Stay';

  if (variant === 'hero') {
    return <HeroCard stay={stay} platform={platform} cta={cta} style={style} />;
  }
  if (variant === 'compact') {
    return <CompactCard stay={stay} platform={platform} cta={cta} style={style} />;
  }
  return <HighlightCard stay={stay} platform={platform} cta={cta} style={style} />;
}

// ── Hero variant — editorial full-bleed, Editor's Picks ──────
function HeroCard({ stay, platform, cta, style }: {
  stay: Stay; platform: typeof PLATFORM_STYLES[Platform]; cta: string; style?: React.CSSProperties;
}) {
  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
      style={style}
    >
      <div className="stay-card overflow-hidden rounded-2xl border border-[oklch(0.88_0.025_75)] shadow-[0_4px_24px_-4px_rgba(44,30,20,0.14)]">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {stay.editorsPick && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                ✦ Editor's Pick
              </span>
            )}
            {stay.isNew && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'oklch(0.40 0.10 148)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                New
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-bold"
              style={{
                background: platform.bg,
                color: platform.text,
                fontFamily: 'Jost, system-ui, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              {platform.label}
            </span>
          </div>

          {/* Overlaid content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-1.5"
              style={{ color: 'oklch(0.82 0.08 70)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              {stay.category} · {stay.state}
            </p>
            <h3
              className="text-2xl font-bold text-white leading-tight mb-2"
              style={{ fontFamily: 'Bitter, Georgia, serif' }}
            >
              {stay.title}
            </h3>
            <p
              className="text-sm text-white/75 line-clamp-2 mb-4"
              style={{ fontFamily: 'Alegreya, Georgia, serif', fontStyle: 'italic', fontSize: '0.9rem' }}
            >
              {stay.description}
            </p>
            <div className="flex items-center justify-between">
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: 'Bitter, Georgia, serif' }}
              >
                ${stay.price}<span className="text-sm font-normal text-white/60 ml-1">/night</span>
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all group-hover:gap-2"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                {cta} <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Highlight variant — standard card, default ────────────────
function HighlightCard({ stay, platform, cta, style }: {
  stay: Stay; platform: typeof PLATFORM_STYLES[Platform]; cta: string; style?: React.CSSProperties;
}) {
  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
      style={style}
    >
      <div
        className="stay-card overflow-hidden rounded-2xl border border-[oklch(0.88_0.025_75)] shadow-[0_2px_16px_-4px_rgba(44,30,20,0.12)]"
        style={{ background: 'oklch(0.97 0.015 80)' }}
      >
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {stay.editorsPick && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                ✦ Editor's Pick
              </span>
            )}
            {stay.isNew && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'oklch(0.40 0.10 148)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                New
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-bold"
              style={{
                background: platform.bg,
                color: platform.text,
                fontFamily: 'Jost, system-ui, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              {platform.label}
            </span>
          </div>
          <div className="absolute bottom-3 right-3">
            <span
              className="px-2.5 py-1 rounded-lg text-sm font-bold text-white"
              style={{
                background: 'rgba(15,10,5,0.65)',
                backdropFilter: 'blur(4px)',
                fontFamily: 'Jost, system-ui, sans-serif',
              }}
            >
              ${stay.price}<span className="font-normal text-white/80 text-xs">/night</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              {stay.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[oklch(0.72_0.10_40)] text-[oklch(0.72_0.10_40)]" />
              <span
                className="text-xs font-bold"
                style={{ color: 'oklch(0.30 0.02 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                {stay.rating}
              </span>
              <span
                className="text-xs"
                style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                ({stay.reviewCount})
              </span>
            </div>
          </div>

          <h3
            className="font-bold text-lg leading-tight mb-1 group-hover:text-[oklch(0.55_0.14_38)] transition-colors"
            style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
          >
            {stay.title}
          </h3>
          <p
            className="text-sm italic mb-2"
            style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Alegreya, Georgia, serif' }}
          >
            {stay.subtitle}
          </p>

          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'oklch(0.55 0.14 38)' }} />
            <span
              className="text-xs"
              style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              {stay.location}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {stay.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: 'oklch(0.91 0.028 75)',
                  color: 'oklch(0.40 0.03 60)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.88_0.025_75)]">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" style={{ color: 'oklch(0.55 0.03 60)' }} />
              <span
                className="text-xs"
                style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                Sleeps {stay.sleeps} · {stay.bedrooms} bed{stay.bedrooms !== 1 ? 's' : ''}
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-1.5 transition-all"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              {cta}
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Compact variant — dense, for 4-wide grids ─────────────────
function CompactCard({ stay, platform, cta, style }: {
  stay: Stay; platform: typeof PLATFORM_STYLES[Platform]; cta: string; style?: React.CSSProperties;
}) {
  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
      style={style}
    >
      <div
        className="stay-card overflow-hidden rounded-xl border border-[oklch(0.88_0.025_75)] shadow-[0_1px_8px_-2px_rgba(44,30,20,0.10)]"
        style={{ background: 'oklch(0.97 0.015 80)' }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {stay.editorsPick && (
            <div className="absolute top-2 left-2">
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Jost, system-ui, sans-serif',
                }}
              >
                ✦ Pick
              </span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold"
              style={{
                background: platform.bg,
                color: platform.text,
                fontFamily: 'Jost, system-ui, sans-serif',
              }}
            >
              {platform.label}
            </span>
          </div>
          <div className="absolute bottom-2 right-2">
            <span
              className="text-xs font-bold text-white px-2 py-0.5 rounded"
              style={{
                background: 'rgba(15,10,5,0.65)',
                fontFamily: 'Jost, system-ui, sans-serif',
              }}
            >
              ${stay.price}/nt
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              {stay.category}
            </span>
            <div className="flex items-center gap-0.5">
              <Star className="w-3 h-3 fill-[oklch(0.72_0.10_40)] text-[oklch(0.72_0.10_40)]" />
              <span
                className="text-[10px] font-bold"
                style={{ color: 'oklch(0.30 0.02 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
              >
                {stay.rating}
              </span>
            </div>
          </div>

          <h3
            className="font-bold text-sm leading-snug mb-1 group-hover:text-[oklch(0.55_0.14_38)] transition-colors line-clamp-2"
            style={{ fontFamily: 'Bitter, Georgia, serif', color: 'oklch(0.22 0.01 60)' }}
          >
            {stay.title}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(0.55 0.14 38)' }} />
            <span
              className="text-[11px] truncate"
              style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              {stay.location}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[oklch(0.88_0.025_75)]">
            <span
              className="text-[11px]"
              style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              Sleeps {stay.sleeps}
            </span>
            <span
              className="inline-flex items-center gap-0.5 text-[11px] font-semibold group-hover:gap-1 transition-all"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Jost, system-ui, sans-serif' }}
            >
              {cta} <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
