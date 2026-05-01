// ============================================================
// Navbar — Unique Stays USA
// Design: Wanderer's Postcard Collection
// Thin, editorial nav with terracotta wordmark and minimal links
// ============================================================

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Compass } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Discover' },
    { href: '/directory', label: 'Directory' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[oklch(0.975_0.012_85/0.97)] backdrop-blur-md shadow-[0_1px_0_0_oklch(0.88_0.025_75)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Wordmark */}
            <Link href="/">
              <div className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-full bg-[oklch(0.55_0.14_38)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-4 h-4 text-[oklch(0.99_0.005_85)]" strokeWidth={2} />
                </div>
                <div className="flex flex-col leading-none">
                  <span
                    className="text-[oklch(0.55_0.14_38)] font-bold tracking-tight text-sm"
                    style={{ fontFamily: 'Fraunces, serif', fontSize: '1.1rem', letterSpacing: '-0.01em' }}
                  >
                    Unique Stays
                  </span>
                  <span
                    className="text-[oklch(0.38_0.09_155)] font-semibold tracking-[0.15em] uppercase"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '0.55rem' }}
                  >
                    USA
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`text-sm font-medium transition-colors duration-200 relative group ${
                      location === link.href
                        ? 'text-[oklch(0.55_0.14_38)]'
                        : 'text-[oklch(0.40_0.03_60)] hover:text-[oklch(0.55_0.14_38)]'
                    }`}
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '0.01em' }}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[oklch(0.55_0.14_38)] transition-all duration-300 ${
                        location === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </span>
                </Link>
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              <a
                href="#newsletter"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-[oklch(0.55_0.14_38)] text-[oklch(0.99_0.005_85)] hover:bg-[oklch(0.48_0.14_38)] transition-all duration-200 hover:shadow-md"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
              >
                Get Picks
              </a>
              <button
                className="md:hidden p-2 rounded-lg text-[oklch(0.40_0.03_60)] hover:bg-[oklch(0.93_0.025_75)] transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-[oklch(0.22_0.01_60/0.4)]"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-[oklch(0.975_0.012_85)] shadow-2xl flex flex-col pt-20 px-6 pb-8">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="block py-3 px-4 rounded-xl text-base font-medium text-[oklch(0.30_0.02_60)] hover:bg-[oklch(0.93_0.025_75)] hover:text-[oklch(0.55_0.14_38)] transition-all"
                    style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <a
                href="#newsletter"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-full text-sm font-semibold bg-[oklch(0.55_0.14_38)] text-[oklch(0.99_0.005_85)] hover:bg-[oklch(0.48_0.14_38)] transition-all"
                style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                onClick={() => setMobileOpen(false)}
              >
                Get Weekly Picks
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
