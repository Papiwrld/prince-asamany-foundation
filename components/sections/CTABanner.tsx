'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site';

export function CTABanner() {
  return (
    <section
      className="relative bg-brand-navy overflow-hidden py-20 md:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Background texture image, low opacity */}
      <div className="absolute inset-0 opacity-15" aria-hidden="true">
        <Image
          src="/about-community.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-navy/75" aria-hidden="true" />

      {/* Gold top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-gold" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
            Join Our Action
          </span>
          <h2
            id="cta-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]"
          >
            Everyone can help.
          </h2>
          <p className="font-body text-lg text-white/75 max-w-xl leading-relaxed">
            The Prince Asamany Foundation stands as a bridge between need and compassion. Whether
            you give, volunteer, or simply share, your contribution restores hope.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Link
            href="/donate"
            id="cta-donate-btn"
            className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-red text-white px-8 py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark transition-all duration-200 active:scale-[0.98] w-full sm:w-auto"
          >
            Donate Now
          </Link>
          <Link
            href="/get-involved"
            id="cta-volunteer-btn"
            className="inline-flex items-center justify-center font-body font-semibold text-base bg-transparent text-white px-8 py-4 rounded-btn border-2 border-brand-gold hover:bg-brand-gold hover:text-brand-navy transition-all duration-200 w-full sm:w-auto"
          >
            Become a Volunteer
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-body text-sm text-white/70"
        >
          Contact us: <a href={`tel:${siteConfig.phone.tel}`} className="text-brand-gold hover:text-brand-gold-light transition-colors duration-200">{siteConfig.phone.display}</a>
        </motion.div>
      </div>
    </section>
  );
}
