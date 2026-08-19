'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function PhotoCollage() {
  return (
    <section
      className="bg-white section-padding overflow-hidden"
      aria-labelledby="collage-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Photo collage */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            {/* Collage: stacked on mobile, overlapping on desktop */}
            <div className="relative">
              {/* Primary photo, full width */}
              <div className="relative rounded-card-lg overflow-hidden aspect-[4/3]">
                <Image
                  src="/story-2.png"
                  alt="Community capacity-building session in Ejisu, Ashanti Region, participants in a training workshop"
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Secondary photo — stacked below on mobile/tablet, overlapped bottom-right at lg+ */}
              <div
                className="relative mt-6 lg:mt-0 lg:absolute lg:-bottom-10 lg:-right-8 lg:w-56 lg:h-44 rounded-card-lg overflow-hidden border-4 border-white"
              >
                <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full">
                  <Image
                    src="/textural-work.png"
                    alt="Artisan hands at work, kente weaving, representing the Foundation's capacity-building and community empowerment programs"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 224px"
                  />
                </div>
              </div>
            </div>
            {/* Spacer so the overlapping photo doesn't clip into the text below */}
            <div className="hidden lg:block h-12" aria-hidden="true" />
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left gap-6"
          >
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">
                Our Work
              </span>
              <h2
                id="collage-heading"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mt-2 leading-[1.12]"
              >
                What we have done with your help?
              </h2>
            </div>

            <p className="font-body text-lg text-brand-navy/70 leading-relaxed">
              The Prince Asamany Foundation stands as a bridge between need and compassion. If you
              are seeking support, do not hesitate to call on us. If you have a heart to uplift the
              less privileged, join hands with us, together we can restore hope and change lives.
            </p>

            <ul className="flex flex-col items-start text-left gap-4 list-none m-0 p-0" role="list">
              {[
                'Providing access to clean water to communities in Ejisu Municipal Assembly',
                'Environmental projects and reforestation in the Ashanti Region',
                'Capacity-building and training for community empowerment',
                'Collaboration with stakeholders to leverage collective impact',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-1 w-5 h-5 rounded-full bg-brand-gold shrink-0 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="#1A3A5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="font-body text-lg text-brand-navy/75 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mt-4">
              <Link
                href="/about"
                className="font-body text-sm font-semibold text-brand-navy border-b-2 border-brand-navy pt-[6px] pb-1 hover:text-brand-red transition-colors duration-200"
              >
                About us →
              </Link>
              <Link
                href="/donate"
                className="font-body text-sm font-semibold bg-brand-navy text-white px-5 py-2.5 rounded-btn border-2 border-brand-navy hover:bg-brand-navy-light hover:border-brand-navy-light transition-all duration-200"
              >
                Donate
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}