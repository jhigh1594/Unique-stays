// ============================================================
// StayCard — Unique Stays USA
// Design: Wanderer's Postcard Collection
// Polaroid-style card with platform badge, rating, and affiliate CTA
// ============================================================

import { Star, MapPin, Users, ExternalLink } from 'lucide-react';
import type { Stay } from '@/lib/stays-data';

interface StayCardProps {
  stay: Stay;
  featured?: boolean;
  style?: React.CSSProperties;
}

const PLATFORM_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  Airbnb: { bg: '#FFE4DE', text: '#FF5A5F', label: 'Airbnb' },
  VRBO: { bg: '#E0F0FF', text: '#1B5E9E', label: 'VRBO' },
  Wander: { bg: '#E8F5E9', text: '#2E7D32', label: 'Wander' },
  Direct: { bg: 'oklch(0.93 0.025 75)', text: 'oklch(0.40 0.03 60)', label: 'Direct' },
};

export default function StayCard({ stay, featured = false, style }: StayCardProps) {
  const platform = PLATFORM_STYLES[stay.platform] || PLATFORM_STYLES.Direct;

  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
      style={style}
    >
      <div
        className={`stay-card bg-white overflow-hidden rounded-2xl border border-[oklch(0.92_0.02_75)] ${
          featured ? 'shadow-[0_8px_40px_-8px_rgba(44,30,20,0.18)]' : 'shadow-[0_2px_16px_-4px_rgba(44,30,20,0.12)]'
        }`}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-52'}`}>
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
            {stay.editorsPick && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                ✦ Editor's Pick
              </span>
            )}
            {stay.isNew && (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold"
                style={{
                  background: 'oklch(0.38 0.09 155)',
                  color: 'oklch(0.99 0.005 85)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  letterSpacing: '0.04em',
                }}
              >
                New
              </span>
            )}
          </div>

          {/* Platform badge */}
          <div className="absolute top-3 right-3">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold"
              style={{
                background: platform.bg,
                color: platform.text,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                letterSpacing: '0.05em',
              }}
            >
              {platform.label}
            </span>
          </div>

          {/* Price bottom right */}
          <div className="absolute bottom-3 right-3">
            <span
              className="px-2.5 py-1 rounded-lg text-sm font-bold text-white"
              style={{
                background: 'rgba(15,10,5,0.65)',
                backdropFilter: 'blur(4px)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
              }}
            >
              ${stay.price}<span className="font-normal text-white/80 text-xs">/night</span>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category tag */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {stay.category}
            </span>
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-[oklch(0.72_0.10_40)] text-[oklch(0.72_0.10_40)]" />
              <span
                className="text-xs font-bold"
                style={{ color: 'oklch(0.30 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {stay.rating}
              </span>
              <span
                className="text-xs"
                style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                ({stay.reviewCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold leading-tight mb-1 group-hover:text-[oklch(0.55_0.14_38)] transition-colors ${
              featured ? 'text-xl' : 'text-lg'
            }`}
            style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.22 0.01 60)' }}
          >
            {stay.title}
          </h3>

          {/* Subtitle */}
          <p
            className="text-sm italic mb-2"
            style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Fraunces, serif' }}
          >
            {stay.subtitle}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'oklch(0.55 0.14 38)' }} />
            <span
              className="text-xs"
              style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {stay.location}
            </span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {stay.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  background: 'oklch(0.93 0.025 75)',
                  color: 'oklch(0.40 0.03 60)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.92_0.02_75)]">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" style={{ color: 'oklch(0.55 0.03 60)' }} />
              <span
                className="text-xs"
                style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Sleeps {stay.sleeps} · {stay.bedrooms} bed{stay.bedrooms !== 1 ? 's' : ''}
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              View Stay
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
