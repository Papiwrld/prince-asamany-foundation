'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';

export function StoryGrid() {
  const [showAllMobile, setShowAllMobile] = useState(false);
  return (
    <section className="relative overflow-hidden bg-brand-navy section-padding" aria-labelledby="stories-heading">
      {/* Subtle dot texture with Aceternity radial falloff mask */}
      <div className="absolute inset-0 opacity-15 radial-mask-falloff pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="storyDotPattern" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#storyDotPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Heading - centered "moment" statement */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 text-center">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Impact Stories
          </span>
          <h2
            id="stories-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 leading-[1.08] max-w-[20ch]"
          >
            Stories that show our impact
          </h2>
        </div>

        {/* Three-card grid on desktop, progressive disclosure on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {stories.slice(0, 3).map((story, i) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className={`spotlight-card group relative flex flex-col overflow-hidden rounded-card-lg bg-white border border-brand-navy/5 hover:border-brand-gold/40 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 focus-within:outline-2 focus-within:outline-brand-navy focus-within:outline-offset-4 ${
                i > 0 ? (showAllMobile ? 'flex' : 'hidden sm:flex') : 'flex'
              }`}
            >
              {/* Top specular highlight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" aria-hidden="true" />
              <div className="relative h-56 overflow-hidden shrink-0">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  {...blurProps(story.image)}
                />
                <div className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-body font-semibold backdrop-blur-sm shadow-sm ${story.tagColor}`}>
                  {story.tag}
                </div>
              </div>

              <div className="flex flex-col flex-grow p-6 text-center">
                <h3 className="font-display text-xl font-bold text-brand-navy leading-snug">
                  {story.name}
                </h3>
                <div className="font-body text-xs text-brand-navy/70 mt-1">
                  {story.role}
                </div>
                {story.date && (
                  <div className="font-body text-xs font-semibold text-brand-red-dark mt-1">{story.date}</div>
                )}

                {story.location && (
                  <div className="font-body text-xs text-brand-navy/50 mt-1 flex items-center justify-center gap-1">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {story.location}
                  </div>
                )}
                <blockquote className="font-display italic text-base text-brand-navy/80 leading-relaxed mt-4">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <Link
                  href={`/stories/${story.id}`}
                  className="mt-6 font-body text-sm font-semibold text-brand-red-dark transition-colors duration-200 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none inline-flex items-center justify-center gap-1.5"
                  aria-label={`Read ${story.name}'s full story`}
                >
                  <span>Read full story</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">→</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Actions / CTA: Exactly one button on mobile */}
        <div className="mt-6 sm:mt-12 flex justify-center">
          {!showAllMobile ? (
            <>
              {/* Mobile-only single button when collapsed */}
              <button
                type="button"
                onClick={() => setShowAllMobile(true)}
                className="sm:hidden w-full max-w-xs inline-flex items-center justify-center gap-2 py-3 px-6 rounded-btn bg-white/10 hover:bg-white/15 border border-white/20 text-white font-body text-sm font-semibold transition-colors duration-200"
              >
                <span>View more stories</span>
                <ChevronDown className="w-4 h-4 text-brand-gold" />
              </button>

              {/* Desktop button */}
              <Link
                href="/stories"
                className="hidden sm:inline-flex micro-press items-center justify-center font-body text-sm font-semibold text-white border-2 border-white/40 hover:bg-white hover:text-brand-navy px-6 py-3 rounded-btn"
              >
                View all stories
              </Link>
            </>
          ) : (
            /* Follow-up button shown after expanding on mobile (and on desktop) */
            <Link
              href="/stories"
              className="micro-press inline-flex items-center justify-center font-body text-sm font-semibold text-white border-2 border-white/40 hover:bg-white hover:text-brand-navy px-6 py-3 rounded-btn w-full max-w-xs sm:w-auto"
            >
              View all stories
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}



