'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { blurProps } from '@/lib/media';

export function FounderHighlight() {
  return (
    <section id="founder" className="bg-brand-navy text-white section-padding overflow-hidden relative">
      {/* Subtle background texture/pattern */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="founder-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#founder-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
          
          {/* Left Column: Portrait & Moments */}
          <motion.div 
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-4"
          >
            {/* Primary portrait — the founder award moment. Video lives on the About page (LeadershipRecognition). */}
            <div className="relative aspect-square rounded-card-lg overflow-hidden border-4 border-white/10 shadow-2xl group">
              <Image
                src="/media/opt/FB_IMG_1763729825877.webp"
                alt="Prince Douglas Asamany in a tuxedo seated at the Philanthropic Awards & Charity Night gala dinner"
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                {...blurProps('/media/opt/FB_IMG_1763729825877.webp')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] rounded-card-lg overflow-hidden border-2 border-white/10 shadow-lg group">
                <Image
                  src="/media/opt/IMG-20251115-WA0160.webp"
                  alt="Prince Douglas Asamany speaking with attendees at a foundation event"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  {...blurProps('/media/opt/IMG-20251115-WA0160.webp')}
                />
              </div>
              <div className="relative aspect-[4/3] rounded-card-lg overflow-hidden border-2 border-white/10 shadow-lg group">
                <Image
                  src="/media/opt/IMG-20251118-WA0044.webp"
                  alt="Prince Douglas Asamany with the foundation team at the awards night"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  {...blurProps('/media/opt/IMG-20251118-WA0044.webp')}
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text Content — stretched to share one height with the imagery */}
          <motion.div 
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center justify-between gap-8 text-center lg:items-start lg:text-left"
          >
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold mb-3 block">
                Meet Our Founder
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                Prince Douglas Asamany
              </h2>
            </div>

            <blockquote className="border-l-4 border-brand-gold pl-6 text-left">
              <p className="font-display text-2xl italic leading-snug text-white/95">
                &ldquo;Our mission is simple: to stand as a bridge between need and compassion, bringing hope to those who need it most.&rdquo;
              </p>
            </blockquote>

            <p className="font-body text-lg text-white/75 leading-relaxed max-w-xl text-left">
              Awarded the 2025 Social Change Advocate Award, Prince Asamany has dedicated his life to uplifting communities across the Ashanti Region through initiatives like &ldquo;Joy to the Street&rdquo; and preventive healthcare programs.
            </p>

            <div className="border-t border-white/15 pt-6 pb-2 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-5 w-full">
              <div className="sm:text-left">
                <p className="font-display text-xl font-bold text-brand-gold">2025</p>
                <p className="font-body text-xs uppercase tracking-wider text-white/60 mt-1">Social Change Advocate honoree</p>
              </div>
              <div className="sm:text-left">
                <p className="font-display text-xl font-bold text-brand-gold">Ashanti Region</p>
                <p className="font-body text-xs uppercase tracking-wider text-white/60 mt-1">Communities uplifted</p>
              </div>
              <div className="sm:text-left">
                <p className="font-display text-xl font-bold text-brand-gold">Joy to the Street</p>
                <p className="font-body text-xs uppercase tracking-wider text-white/60 mt-1">Signature outreach</p>
              </div>
            </div>

            <Link 
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold bg-brand-gold text-brand-navy px-6 py-3 rounded-btn hover:bg-white transition-colors duration-300"
            >
              Read Full Story
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 3.33334L12.6667 8L8 12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
