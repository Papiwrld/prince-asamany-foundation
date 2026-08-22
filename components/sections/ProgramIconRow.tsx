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
        {/* Heading row — centered "moment" statement */}
        <div className="flex flex-col items-center text-center gap-6 mb-14">
          <div>
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">
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
            className="font-body text-sm font-semibold text-brand-navy border-b-2 border-brand-gold pb-1 hover:text-brand-red transition-colors duration-200 self-center whitespace-nowrap"
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
              aria-label={`${program.title} — view all programs`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="flex flex-col items-center text-center md:items-start md:text-left gap-4 p-6 rounded-card-lg bg-brand-cream hover:bg-brand-navy hover:-translate-y-1 hover:shadow-lg group transition-all duration-300 h-full no-underline focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2"
            >
              <div className="text-brand-red group-hover:text-brand-gold transition-colors duration-300">
                {program.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-brand-navy group-hover:text-white transition-colors duration-300 leading-tight">
                {program.title}
              </h3>
              <p className="font-body text-lg text-brand-navy/70 group-hover:text-white/70 transition-colors duration-300 leading-relaxed">
                {program.description}
              </p>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}