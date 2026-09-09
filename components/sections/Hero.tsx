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
    position: 'object-[center_28%] md:object-[center_24%]',
  },
  {
    src: '/media/opt/IMG_6846.webp',
    alt: 'Prince Douglas Asamany connecting with a mother and child during community outreach in Ejisu',
    caption: 'Direct Family Outreach, Ejisu',
    position: 'object-[center_35%] md:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG_6876.webp',
    alt: 'Foundation team distributing relief packages directly to children in the community',
    caption: 'Joy to the Street Outreach',
    position: 'object-[center_30%] md:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG_6885.webp',
    alt: 'Foundation volunteers and residents gathered during community relief outreach',
    caption: 'Community Relief in Action',
    position: 'object-[center_35%] md:object-[center_25%]',
  },
  {
    src: '/media/opt/IMG-20260727-WA0008.webp',
    alt: 'Students of the Natural Resources Management programme holding health packages during the deworming initiative',
    caption: 'Youth Health & Deworming Outreach',
    position: 'object-[center_30%] md:object-[center_20%]',
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
      className="relative min-h-screen bg-brand-navy overflow-hidden flex items-center"
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

        {/* Multi-Layer Editorial Scrims: Calibrated for crystal-clear readability across all rotating photos */}
        {/* 1. Base tint: slightly deeper on mobile where text spans across sunlit clothing */}
        <div className="absolute inset-0 bg-brand-navy/45 md:bg-brand-navy/35 z-[2]" />

        {/* 2. Directional gradient: deeper at top (for navbar/headline) and bottom (for seamless flow into TrustStrip) */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/85 via-brand-navy/45 to-brand-navy/85 md:from-brand-navy/70 md:via-brand-navy/25 md:to-brand-navy/75 z-[2]" />

        {/* 3. Central radial scrim: soft vignette directly behind text for elevated letterform contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-navy/60 via-brand-navy/20 to-transparent pointer-events-none z-[2]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="flex flex-col items-center text-center gap-6 lg:gap-8 max-w-3xl mx-auto">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="font-body text-sm font-semibold uppercase tracking-[0.16em] text-brand-gold drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
              Akyawkrom, Ejisu, Ashanti Region, Ghana
            </span>
          </motion.div>

          {/* Headline - centered on mobile, balanced measure */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.06] max-w-2xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)]">
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
            className="font-body text-lg leading-relaxed text-white/95 max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            Prince Asamany Foundation turns compassion into opportunity: from deworming
            84 schoolchildren this July to welfare outreach for families across Ejisu
            Municipal Assembly.
          </motion.p>

          {/* CTAs - centered on mobile, side-by-side on larger screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center justify-center gap-4"
          >
            <Link
              href="/donate"
              id="hero-donate-cta"
              className="micro-press inline-flex items-center justify-center font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark w-full sm:w-auto sm:px-10 shadow-lg shadow-brand-red/20"
            >
              Support the Foundation
            </Link>
            <Link
              href="/about"
              id="hero-learn-more"
              className="micro-press inline-flex items-center justify-center font-body font-semibold text-base bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-btn border-2 border-white/50 hover:bg-white/20 hover:border-white/80 w-full sm:w-auto"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Ghana map accent - subtle backdrop on desktop, kept out of the centered flow */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        className="hidden lg:flex absolute right-4 xl:right-16 top-1/2 -translate-y-1/2 pointer-events-none z-10"
        aria-hidden="true"
      >
        {/* Soft scrim so the map reads cleanly over any hero photo */}
        <div className="absolute -inset-16 rounded-full bg-brand-navy/40 blur-3xl" aria-hidden="true" />
        {/* Map container */}
        <div className="relative w-72 h-80 xl:w-80 xl:h-96 text-white">
          <GhanaMapSilhouette />
        </div>
      </motion.div>
    </section>
  );
}
