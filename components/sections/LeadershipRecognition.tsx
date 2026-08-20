'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function LeadershipRecognition() {
  return (
    <section className="bg-brand-navy section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <div>
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold">
                Leadership & Recognition
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 leading-tight">
                2025 Social Change Advocate Award
              </h2>
            </div>
            <p className="font-body text-lg text-white/80 leading-relaxed">
              Our Founder and President, Prince Douglas Asamany, was recently honored with the prestigious 2025 Social Change Advocate Award by AFLAG at the Philanthropic Awards Charity Night.
            </p>
            <p className="font-body text-lg text-white/80 leading-relaxed">
              This award recognizes his tireless humanitarian efforts across Kumasi and beyond, including the &quot;Joy to the Street&quot; initiative, free cervical cancer screenings, and his strong advocacy for green chemistry education.
            </p>
          </motion.div>

          {/* Media Content */}
          <motion.div 
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            {/* Video */}
            <div className="relative rounded-card-lg overflow-hidden aspect-video shadow-2xl bg-black border-4 border-white/10">
              <video 
                controls 
                preload="metadata"
                className="w-full h-full object-cover"
                poster="/media/FB_IMG_1763729825877.jpg.jpeg"
              >
                <source src="/media/WhatsApp Video 2026-08-19 at 16.21.26.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Supporting Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square rounded-card-lg overflow-hidden border-2 border-white/10 shadow-lg">
                <Image 
                  src="/media/WhatsApp Image 2026-08-20 at 18.25.51.jpeg"
                  alt="Prince Douglas Asamany receiving the 2025 Social Change Advocate Award"
                  fill
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative aspect-square rounded-card-lg overflow-hidden border-2 border-white/10 shadow-lg bg-white/5 flex items-center justify-center p-6 text-center">
                <p className="font-display font-medium text-brand-gold italic text-lg leading-snug">
                  &quot;Driving sustainable human advancement through action.&quot;
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
