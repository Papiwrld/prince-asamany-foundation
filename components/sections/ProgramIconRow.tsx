'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { programs } from '@/lib/content';

const MotionLink = motion.create(Link);

export function ProgramIconRow() {
  return (
    <section
      className="bg-white section-padding"
      aria-labelledby="programs-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Heading row - centered "moment" statement */}
        <div className="flex flex-col items-center text-center gap-6 mb-14">
          <div>
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
              What We Do
            </span>
            <h2
              id="programs-heading"
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mt-2 leading-[1.12]"
            >
              Our Key Program Areas
            </h2>
          </div>
          <Link
            href="/programs"
            className="font-body text-sm font-semibold text-brand-navy border-b-2 border-brand-gold pb-1 py-1 hover:text-brand-red-dark transition-colors duration-200 self-center whitespace-nowrap"
          >
            All programs →
          </Link>
        </div>

        {/* Icon grid, 1 col mobile, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {programs.map((program, i) => (
            <MotionLink
              key={program.title}
              href={program.href}
              aria-label={`${program.title}: view all programs`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="spotlight-card relative flex flex-col items-center text-center md:items-start md:text-left gap-4 p-8 rounded-card-lg bg-brand-cream border border-brand-navy/10 hover:bg-brand-navy hover:border-brand-gold/40 hover:-translate-y-1.5 hover:shadow-2xl group transition-all duration-300 h-full no-underline focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2 overflow-hidden"
            >
              {/* Top specular highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" aria-hidden="true" />
              <div className="w-14 h-14 rounded-2xl bg-brand-red/10 text-brand-red-dark group-hover:bg-brand-gold group-hover:text-brand-navy group-hover:scale-110 group-hover:shadow-md transition-all duration-300 flex items-center justify-center shrink-0 mb-1">
                {program.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy group-hover:text-white transition-colors duration-300 leading-tight">
                {program.title}
              </h3>
              <p className="font-body text-lg text-brand-navy/70 group-hover:text-white/70 transition-colors duration-300 leading-relaxed">
                {program.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1.5 font-body text-xs font-semibold text-brand-red-dark group-hover:text-brand-gold transition-colors duration-300 pt-2">
                Learn more
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </span>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}

