'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks, siteConfig } from '@/lib/site';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

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

  // Focus trap for mobile menu — includes the header hamburger so keyboard
  // users can always Tab back to the close control
  useEffect(() => {
    if (!menuOpen) return;
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    if (!menu || !toggle) return;

    const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = [toggle as HTMLElement, ...Array.from(menu.querySelectorAll<HTMLElement>(focusableSelectors))];

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

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

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [menuOpen]);

  const navBg = scrolled
    ? 'bg-brand-navy/98 backdrop-blur-sm shadow-lg shadow-brand-navy/20 border-b border-white/10'
    : 'bg-transparent border-b border-transparent';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ` + navBg}>
        <nav
          className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-18"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 shrink-0" aria-label="Prince Asamany Foundation, Home">
            <Image
              src="/media/opt/logo-mark.webp"
              alt="Prince Asamany Foundation"
              width={800}
              height={427}
              sizes="160px"
              className="h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={'font-body text-sm font-medium transition-colors duration-200 py-2 border-b-2 ' + (active ? 'text-brand-gold border-brand-gold' : 'text-white/85 border-transparent hover:text-brand-gold hover:border-brand-gold')}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
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
            className="md:hidden relative flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-btn text-white z-[60]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ` + (menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6')}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ` + (menuOpen ? 'opacity-0 w-0' : 'w-6')}
            />
            <span
              className={`block h-0.5 bg-white transition-all duration-300 ` + (menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6')}
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
        className={`fixed inset-0 z-40 bg-brand-navy flex flex-col overflow-y-auto transition-all duration-400 md:hidden ` + (menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')}
      >
        {/* Gold accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" />

        <nav className="flex-1 flex flex-col px-8 pt-28 pb-10" aria-label="Mobile navigation">
          <ul className="flex flex-col list-none m-0 p-0">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block text-center font-display text-4xl font-bold py-4 transition-colors duration-200 ` + (active ? 'text-brand-gold' : 'text-white/85 hover:text-brand-gold')}
                    style={{
                      transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                      transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                      opacity: menuOpen ? 1 : 0,
                    }}
                  >
                    {link.label}
                  </Link>
                  {/* Active indicator dot */}
                  {active && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-brand-gold"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Donate + contact */}
          <div className="mt-auto" style={{ transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : '0ms', opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)' }}>
            <Link
              href="/donate"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center font-body font-semibold text-lg bg-brand-red text-white py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-colors duration-200"
            >
              Donate Now
            </Link>

            {/* Contact info at bottom */}
            <div className="mt-12 pt-8 border-t border-white/15 text-center px-2 pb-4">
              <p className="font-body text-sm text-white/70">{siteConfig.address.box}, {siteConfig.address.city}, Ashanti</p>
              <a href={`tel:` + siteConfig.phone.tel} className="mt-3 inline-flex items-center justify-center gap-2 font-body text-lg font-bold text-brand-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" aria-hidden="true" />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}