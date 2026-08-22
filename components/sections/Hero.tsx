'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GhanaMapSilhouette } from '@/components/ui/illustrations';
import { blurProps } from '@/lib/media';

const HERO_IMAGE = '/media/opt/IMG_4403_2.webp';

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-brand-navy overflow-hidden flex items-center"
      aria-label="Hero, Prince Asamany Foundation"
    >
      {/* Background photo, full bleed, dark overlay */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="Foundation volunteer in a Santa hat handing a holiday gift to a child over a car boot during the Joy to the Street outreach in Kumasi"
          fill
          className="object-cover object-center"
          priority
          quality={82}
          sizes="100vw"
          {...blurProps(HERO_IMAGE)}
        />
        {/* Lightened overlay so image color shows through */}
        <div className="absolute inset-0 bg-brand-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-brand-navy/20 to-transparent" />
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
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
                Akyawkrom, Ejisu, Ashanti Region, Ghana
              </span>
            </motion.div>

            {/* Headline — centered on mobile, balanced measure */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.06] max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
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
              className="font-body text-lg leading-relaxed text-white/90 max-w-xl drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
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

      </div>

      {/* Ghana map accent — subtle backdrop on desktop, kept out of the centered flow */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
        className="hidden lg:flex absolute right-4 xl:right-16 top-1/2 -translate-y-1/2 pointer-events-none"
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
