'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GhanaMapSilhouette } from '@/components/ui/illustrations';
import { blurProps } from '@/lib/media';

interface HeroSlide {
  src: string;
  alt: string;
  caption: string;
  position: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    src: '/media/opt/IMG_6871.webp',
    alt: 'Founder Prince Douglas Asamany standing with foundation volunteers, mothers, and smiling children in Ashanti Region',
    caption: 'Community Solidarity, Ashanti Region',
    position: 'object-[center_top] lg:object-[center_24%]',
  },
  {
    src: '/media/opt/IMG_6846.webp',
    alt: 'Prince Douglas Asamany connecting with a mother and child during community outreach in Ejisu',
    caption: 'Direct Family Outreach, Ejisu',
    position: 'object-[center_top] lg:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG_6876.webp',
    alt: 'Foundation team distributing relief packages directly to children in the community',
    caption: 'Joy to the Street Outreach',
    position: 'object-[center_top] lg:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG_6885.webp',
    alt: 'Foundation volunteers and residents gathered during community relief outreach',
    caption: 'Community Relief in Action',
    position: 'object-[center_top] lg:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG-20260727-WA0008.webp',
    alt: 'Students of the Natural Resources Management programme holding health packages during the deworming initiative',
    caption: 'Youth Health & Deworming Outreach',
    position: 'object-[center_top] lg:object-[center_20%]',
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  // Auto-rotate every 6.5 seconds, pausing when the user hovers/focuses
  React.useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section
      className="relative min-h-[100svh] bg-brand-navy overflow-hidden flex flex-col justify-end lg:justify-center"
      aria-label="Hero, Prince Asamany Foundation"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Auto-Rotating Background Photos with Smooth Crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
            }`}
            aria-hidden={idx !== currentIndex}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-cover ${slide.position}`}
              priority={idx === 0}
              quality={88}
              sizes="100vw"
              {...blurProps(slide.src)}
            />
          </div>
        ))}

        {/* --- MOBILE GRADIENTS --- */}
        {/* Soft top vignette so logo & navigation drawer icon remain crisp */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-brand-navy/80 via-brand-navy/30 to-transparent z-[2] lg:hidden" />

        {/* Bottom-up scrim on mobile: Leaves the top half open so faces and smiles are un-obscured,
            while creating a solid, high-contrast navy canvas in the lower half for all text & buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/95 via-50% to-transparent z-[2] lg:hidden" />

        {/* --- DESKTOP GRADIENTS (lg+) --- */}
        {/* Directional left-to-right gradient so typography sits cleanly on the left while photos shine on the right */}
        <div className="hidden lg:block absolute inset-0 bg-brand-navy/30 z-[2]" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/70 to-brand-navy/15 z-[2]" />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent z-[2]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full pt-32 pb-10 sm:pb-14 lg:pt-28 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text Column: Centered on mobile at bottom of screen, left-aligned on desktop */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left gap-4 sm:gap-6 max-w-2xl mx-auto lg:mx-0">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="font-body text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Akyawkrom, Ejisu, Ashanti Region, Ghana
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                Hope,{' '}
                <span className="text-brand-gold brush-underline pb-1">Development</span>{' '}
                &amp; Opportunity{' '}
                <span className="text-white/85">for All.</span>
              </h1>
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="font-body text-sm sm:text-base lg:text-lg leading-relaxed text-white/90 max-w-xl drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]"
            >
              Uplifting underprivileged children, families, and communities across Ghana through vital healthcare, education, and life-changing opportunity.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 w-full sm:w-auto pt-1"
            >
              <Link
                href="/donate"
                id="hero-donate-cta"
                className="micro-press inline-flex items-center justify-center font-body font-semibold text-sm sm:text-base bg-brand-red text-white px-7 py-3.5 sm:py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark shadow-lg shadow-brand-red/25 w-full sm:w-auto"
              >
                Support the Foundation
              </Link>
              <Link
                href="/about"
                id="hero-learn-more"
                className="micro-press inline-flex items-center justify-center font-body font-semibold text-sm sm:text-base bg-white/10 backdrop-blur-sm text-white px-7 py-3.5 sm:py-4 rounded-btn border-2 border-white/40 hover:bg-white/20 hover:border-white/70 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Ghana Map Accent: Desktop only, balance on right */}
          <div className="hidden lg:flex lg:col-span-5 items-center justify-center relative pointer-events-none" aria-hidden="true">
            <div className="relative w-72 h-80 xl:w-80 xl:h-96 text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <GhanaMapSilhouette />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
