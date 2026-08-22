'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CTACard, StatCard } from '@/components/ui/Card';
import { blurProps } from '@/lib/media';

export function AsymmetricCards() {
  return (
    <section
      className="bg-brand-cream section-padding"
      aria-labelledby="impact-cards-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Section heading — centered "moment" statement */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">
            Our Impact
          </span>
          <h2
            id="impact-cards-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mt-2 leading-[1.08]"
          >
            Building futures, one{' '}
            <span className="brush-underline">community</span>{' '}
            at a time
          </h2>
        </div>

        {/*
          Asymmetric card grid, inspired by ui body inspiration.jpeg
          Desktop: [Big Stat] [Photo tall] [Photo short + CTA stacked]
          Mobile: single column, stat card visually dominant at top
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

          {/* Col 1: Large stat card, most visually dominant */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:row-span-2"
          >
            <StatCard
              stat="3"
              label="Core Programs Running"
              sublabel="Economic empowerment, healthcare interventions, and social welfare across Ejisu Municipal Assembly"
              variant="navy"
              className="h-full min-h-64 md:min-h-0"
            />
          </motion.div>

          {/* Col 2: Tall photo card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="group md:row-span-2 relative overflow-hidden rounded-[2rem] w-full h-[24rem] sm:h-[28rem] md:h-auto md:min-h-[30rem] flex flex-col items-center justify-center"
          >
            <Image
              src="/media/opt/IMG_6848.webp"
              alt="Close-up of a community member's hands during a foundation event"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
              {...blurProps('/media/opt/IMG_6848.webp')}
            />
            {/* Gradient scrim — stronger toward the bottom-left where text sits,
                 fading to clean toward the top-right, for an Apple-like focal balance. */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy via-brand-navy/55 to-transparent" aria-hidden="true" />
            
            {/* Overlay content — horizontally centered, anchored to the bottom */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-end px-8 pb-10 pt-20 text-center md:px-12 md:pb-12">
              <div className="flex flex-col items-center max-w-md">
                <span className="w-10 h-0.5 bg-brand-gold rounded-full opacity-90 shadow-sm" aria-hidden="true"></span>
                <p className="mt-6 font-display text-white text-2xl leading-[1.25] md:text-4xl lg:text-[2.75rem] lg:leading-[1.18] font-medium italic drop-shadow-xl">
                  Driving sustainable human advancement.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Col 3 top: Smaller stat card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <StatCard
              stat="4"
              label="Focus Areas"
              sublabel="Healthcare, social welfare, economic empowerment, and environmental projects"
              variant="gold"
              className="h-full min-h-44"
            />
          </motion.div>

          {/* Col 3 bottom: CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            <CTACard
              title="Join hands with us"
              description="If you have a heart to uplift the less privileged, together we can restore hope and change lives."
              linkLabel="Get Involved"
              linkHref="/get-involved"
              className="h-full min-h-44"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
