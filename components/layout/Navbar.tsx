'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks, siteConfig } from '@/lib/site';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close the mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const menu = document.getElementById('mobile-menu');
    if (!menu) return;

    const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(menu.querySelectorAll<HTMLElement>(focusableSelectors));
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus first element when menu opens
    firstElement.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    menu.addEventListener('keydown', handleTab);
    return () => menu.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  const navBg = scrolled
    ? 'bg-brand-navy/98 backdrop-blur-sm shadow-lg shadow-brand-navy/20 border-b border-white/10'
    : 'bg-transparent border-b border-transparent';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <nav
          className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-18"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 shrink-0" aria-label="Prince Asamany Foundation, Home">
            <div className="relative h-12 w-36">
              <Image
                src="/logo.jpeg"
                alt="Prince Asamany Foundation"
                fill
                sizes="144px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm font-medium text-white/85 hover:text-brand-gold transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-brand-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop donate CTA */}
          <div className="hidden md:block">
            <Link
              href="/donate"
              id="nav-donate-cta"
              className="font-body text-sm font-semibold bg-brand-red text-white px-5 py-2.5 rounded-btn hover:bg-brand-red-dark transition-colors duration-200 border-2 border-brand-red hover:border-brand-red-dark"
            >
              Donate
            </Link>
          </div>

          {/* Mobile hamburger, 44px tap target */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-btn text-white"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'
                }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : 'w-6'
                }`}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'
                }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        inert={!menuOpen || undefined}
        className={`fixed inset-0 z-40 bg-brand-navy flex flex-col overflow-y-auto transition-all duration-400 md:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {/* Gold accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" />

        <nav className="px-8 py-16" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-2 list-none m-0 p-0">
            {navLinks.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-center font-display text-4xl font-bold text-white/85 hover:text-brand-gold transition-all duration-200 py-3 border-b border-white/10 last:border-0`}
                  style={{
                    transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                    transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: menuOpen ? 1 : 0,
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/donate"
            onClick={() => setMenuOpen(false)}
            className="mt-10 block w-full text-center font-body font-semibold text-lg bg-brand-red text-white py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-colors duration-200"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : '0ms',
              transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Donate Now
          </Link>

          {/* Contact info at bottom */}
          <div className="mt-10 pt-8 border-t border-white/10 text-center">
            <p className="font-body text-sm text-white/50">{siteConfig.address.box}, {siteConfig.address.city}, Ashanti</p>
            <a href={`tel:${siteConfig.phone.tel}`} className="font-body text-base font-semibold text-brand-gold mt-1 block">
              {siteConfig.phone.display}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
