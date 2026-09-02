import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks, siteConfig } from '@/lib/site';

const footerLinks = [...navLinks, { label: 'Donate', href: '/donate' }];

const socialIcon = (label: string) => {
  switch (label.toLowerCase()) {
    case 'facebook':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    default:
      return null;
  }
};

// Only render social links that have been given real URLs in lib/site.ts
const socialLinks = Object.entries(siteConfig.social)
  .filter(([, href]) => href)
  .map(([label, href]) => ({ label: label.charAt(0).toUpperCase() + label.slice(1), href, icon: socialIcon(label) }));

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white" role="contentinfo">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Brand */}
        <div className="flex flex-col gap-4 items-center md:items-start text-center md:text-left">
          <Link href="/" aria-label="Prince Asamany Foundation, Home">
            <Image
              src="/media/opt/logo-mark.webp"
              alt="Prince Asamany Foundation"
              width={800}
              height={427}
              sizes="(max-width: 768px) 40vw, 160px"
              className="h-14 w-auto mx-auto md:mx-0"
              priority
            />
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 font-body text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" aria-hidden="true" />
            Registered NGO · Ejisu, Ghana
          </span>
          <p className="font-body text-sm text-white/75 leading-relaxed max-w-xs">
            Working for social development and the integration of underprivileged individuals, groups, and communities across Ghana.
          </p>
          {/* Social links */}
          <div className="flex items-center justify-center md:justify-start gap-3 mt-1">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-btn border border-white/20 text-white/75 hover:text-brand-gold hover:border-brand-gold hover:scale-110 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Navigation */}
        <div className="text-center md:text-left">
          <h3 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-gold mb-5">
            Navigation
          </h3>
          {/* 2-column compact grid on mobile to cut scroll budget, flex column on desktop */}
          <ul
            className="grid grid-cols-2 gap-x-6 gap-y-2 max-w-xs mx-auto md:max-w-none md:flex md:flex-col md:gap-1 list-none m-0 p-0 text-left"
            role="list"
          >
            {footerLinks.map((link) => {
              const isDonate = link.href === '/donate';
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-body text-sm hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 py-1.5 ${
                      isDonate
                        ? 'font-bold text-brand-gold hover:text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isDonate && <span aria-hidden="true">→</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div className="text-center md:text-left">
          <h3 className="font-body text-xs font-bold uppercase tracking-[0.18em] text-brand-gold mb-5">
            Contact Us
          </h3>
          <address className="not-italic flex flex-col gap-4 max-w-xs mx-auto md:max-w-none text-left">
            {/* Postal Address */}
            <div className="flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="font-body text-sm text-white/80 leading-relaxed">
                {siteConfig.address.box}<br />
                {siteConfig.address.line1}<br />
                {siteConfig.address.line2}
              </span>
            </div>

            {/* Telephone */}
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.49 2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.1 6.1l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="font-body text-sm text-white/80 hover:text-brand-gold transition-colors duration-200 inline-block py-1"
              >
                {siteConfig.phone.display}
              </a>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-gold">
                  <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
                </svg>
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-body text-sm text-white/80 hover:text-brand-gold transition-colors duration-200 break-all inline-block py-1"
              >
                {siteConfig.email}
              </a>
            </div>
          </address>
        </div>
      </div>

      {/* Gold bar bottom strip, mirrors flyer footer */}
      <div className="bg-brand-gold">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-body text-xs font-semibold text-brand-navy">
            &copy; {new Date().getFullYear()} Prince Asamany Foundation. All rights reserved.
          </span>
          <span className="font-display text-xs italic text-brand-navy">
            Hope, Development &amp; Opportunity for All
          </span>
        </div>
      </div>
    </footer>
  );
}
