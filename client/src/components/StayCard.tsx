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
  accentColor?: string;
}

const PLATFORM_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  Airbnb: { bg: '#FFE4DE', text: '#FF5A5F', label: 'Airbnb' },
  VRBO: { bg: '#E0F0FF', text: '#1B5E9E', label: 'VRBO' },
  Wander: { bg: '#E8F5E9', text: '#2E7D32', label: 'Wander' },
  Direct: { bg: 'oklch(0.93 0.025 75)', text: 'oklch(0.40 0.03 60)', label: 'Direct' },
};

export default function StayCard({ stay, featured = false, style, accentColor }: StayCardProps) {
  void accentColor; // available for future use
  const platform = PLATFORM_STYLES[stay.platform] || PLATFORM_STYLES.Direct;

  return (
    <a
      href={stay.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block"
      style={style}
    >
      {/* Polaroid frame — white mat, square-ish corners, thick bottom */}
      <div
        className="stay-card bg-white"
        style={{
          padding: '9px 9px 32px 9px',
          borderRadius: '3px',
          boxShadow: '0 6px 28px -4px rgba(44, 30, 20, 0.22), 0 2px 8px rgba(44, 30, 20, 0.09)',
        }}
      >
        {/* Photo */}
        <div className={`relative overflow-hidden ${featured ? 'h-64' : 'h-52'}`} style={{ borderRadius: '1px' }}>
          <img
            src={stay.image}
            alt={stay.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
            {stay.editorsPick && (
              <span
                className="stamp-badge"
                style={{
                  background: 'oklch(0.55 0.14 38)',
                  color: 'oklch(0.99 0.005 85)',
                  borderColor: 'oklch(0.72 0.10 40)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                ✦ Pick
              </span>
            )}
            {stay.isNew && (
              <span
                className="stamp-badge"
                style={{
                  background: 'oklch(0.38 0.09 155)',
                  color: 'oklch(0.99 0.005 85)',
                  borderColor: 'oklch(0.52 0.08 155)',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                }}
              >
                New
              </span>
            )}
          </div>

          {/* Platform badge */}
          <div className="absolute top-3 right-3">
            <span
              className="stamp-badge"
              style={{
                background: platform.bg,
                color: platform.text,
                borderColor: platform.text,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                opacity: 0.92,
              }}
            >
              {platform.label}
            </span>
          </div>

          {/* Price bottom right */}
          <div className="absolute bottom-3 right-3">
            <span
              className="px-2.5 py-1 text-sm font-bold text-white"
              style={{
                background: 'rgba(15,10,5,0.65)',
                backdropFilter: 'blur(4px)',
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                borderRadius: '2px',
              }}
            >
              ${stay.price}<span className="font-normal text-white/80 text-xs">/night</span>
            </span>
          </div>
        </div>

        {/* Caption zone — lives inside the polaroid white mat */}
        <div className="pt-3 px-1">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {stay.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[oklch(0.72_0.10_40)] text-[oklch(0.72_0.10_40)]" />
              <span
                className="text-xs font-bold"
                style={{ color: 'oklch(0.30 0.02 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                {stay.rating}
              </span>
              <span
                className="text-xs"
                style={{ color: 'oklch(0.60 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                ({stay.reviewCount})
              </span>
            </div>
          </div>

          <h3
            className={`font-bold leading-tight mb-1 group-hover:text-[oklch(0.55_0.14_38)] transition-colors ${
              featured ? 'text-xl' : 'text-base'
            }`}
            style={{ fontFamily: 'Fraunces, serif', color: 'oklch(0.22 0.01 60)' }}
          >
            {stay.title}
          </h3>

          <div className="flex items-center gap-1 mb-2.5">
            <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: 'oklch(0.55 0.14 38)' }} />
            <span
              className="text-xs"
              style={{ color: 'oklch(0.50 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {stay.location}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" style={{ color: 'oklch(0.60 0.03 60)' }} />
              <span
                className="text-xs"
                style={{ color: 'oklch(0.55 0.03 60)', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Sleeps {stay.sleeps}
              </span>
            </div>
            <span
              className="inline-flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all uppercase tracking-wider"
              style={{ color: 'oklch(0.55 0.14 38)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.65rem' }}
            >
              See This Place
              <ExternalLink className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
