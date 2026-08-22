'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { stories } from '@/lib/content';
import { blurProps } from '@/lib/media';

export function StoryGrid() {
  return (
    <section className="relative overflow-hidden bg-brand-navy section-padding" aria-labelledby="stories-heading">
      {/* Subtle dot texture */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
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
        {/* Heading — centered "moment" statement */}
        <div className="max-w-2xl mx-auto mb-12 md:mb-16 text-center">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Impact Stories
          </span>
          <h2
            id="stories-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 leading-[1.08] max-w-[16ch]"
          >
            Learn the stories of those we&apos;ve already helped
          </h2>
        </div>

        {/* Three equal cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story, i) => (
            <motion.article
              key={story.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className="group flex flex-col overflow-hidden rounded-card-lg bg-white shadow-xl focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-4"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  {...blurProps(story.image)}
                />
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-body font-semibold ${story.tagColor}`}>
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

                <blockquote className="font-display italic text-base text-brand-navy/80 leading-relaxed mt-4">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>

                <Link
                  href={`/stories/${story.id}`}
                  className="mt-6 font-body text-sm font-semibold text-brand-red hover:text-brand-red-dark transition-colors duration-200"
                  aria-label={`Read ${story.name}'s full story`}
                >
                  Read full story →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/stories"
            className="inline-flex items-center justify-center font-body text-sm font-semibold text-white border-2 border-white/40 hover:bg-white hover:text-brand-navy px-6 py-3 rounded-btn transition-colors duration-200"
          >
            View all stories
          </Link>
        </div>
      </div>
    </section>
  );
}
