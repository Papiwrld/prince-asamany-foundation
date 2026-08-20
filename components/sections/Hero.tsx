'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GhanaMapSilhouette } from '@/components/ui/illustrations';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-brand-navy overflow-hidden flex items-center"
      aria-label="Hero, Prince Asamany Foundation"
    >
      {/* Background photo, full bleed, dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/media/IMG_4392.jpg"
          alt="Wide shot of a line of women and children in Ejisu waiting during community outreach"
          fill
          className="object-cover object-center"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Centered gradient overlay so text stays legible in the middle */}
        <div className="absolute inset-0 bg-brand-navy/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <div className="flex flex-col items-center text-center gap-6 lg:gap-8 lg:items-start lg:text-left">
            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
                Akyawkrom, Ejisu, Ashanti Region, Ghana
              </span>
            </motion.div>

            {/* Headline — centered on mobile, balanced measure */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.06] max-w-2xl">
                Hope,{' '}
                <span className="text-brand-gold brush-underline pb-1">Development</span>{' '}
                &amp; Opportunity{' '}
                <span className="text-white/80">for All.</span>
              </h1>
            </motion.div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="font-body text-lg leading-relaxed text-white/80 max-w-xl"
            >
              Prince Asamany Foundation works for the social development and integration of
              underprivileged individuals, groups and communities in Ejisu Municipal Assembly.
            </motion.p>

            {/* CTAs — centered on mobile, side-by-side on larger screens */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="flex flex-col w-full sm:w-auto sm:flex-row sm:items-center justify-center gap-4"
            >
              <Link
                href="/donate"
                id="hero-donate-cta"
                className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark transition-all duration-200 active:scale-[0.98] w-full sm:w-auto sm:px-10"
              >
                Support the Foundation
              </Link>
              <Link
                href="/about"
                id="hero-learn-more"
                className="inline-flex items-center justify-center font-body font-semibold text-base bg-transparent text-white px-8 py-4 rounded-btn border-2 border-white/40 hover:bg-white/10 hover:border-white/70 transition-all duration-200 w-full sm:w-auto"
              >
                Learn More
              </Link>
            </motion.div>

          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
            className="hidden lg:flex items-center justify-center relative"
            aria-hidden="true"
          >
            {/* Map container */}
            <div className="relative w-72 h-80 xl:w-80 xl:h-96">
              <GhanaMapSilhouette />
            </div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}
