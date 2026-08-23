'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AshantiMap } from '@/components/ui/illustrations';
import { CountUp } from '@/components/ui/CountUp';


// Icons
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
);
const MapPinIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
);

type ThemeColor = 'red' | 'gold' | 'navy' | 'green';

interface Stat {
  value: string;
  label: string;
  description: string;
  theme: ThemeColor;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { value: '800+', label: 'Lives Touched in 2024', description: 'Street children and vulnerable persons reached during the Joy to the Street campaign', theme: 'red', icon: <HeartIcon /> },
  { value: 'Free', label: 'Health Screenings', description: 'Cervical cancer screening and health education with Mansa Memorial Hospital', theme: 'green', icon: <ShieldIcon /> },
  { value: '2025', label: 'Social Change Advocate', description: 'Founder honored by AFLAG for impact-driven community leadership', theme: 'gold', icon: <AwardIcon /> },
  { value: 'Ejisu', label: 'Our Base', description: 'Akyawkrom, Ejisu Municipal Assembly, Ashanti Region', theme: 'navy', icon: <MapPinIcon /> },
];

export function MapImpact() {
  return (
    <section
      className="bg-brand-cream section-padding"
      aria-labelledby="map-heading"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Heading — centered "moment" statement */}
        <div className="mb-12 text-center">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
            Where We Work
          </span>
          <h2
            id="map-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy mt-2 leading-[1.08]"
          >
            Always where others need help.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <AshantiMap />
          </motion.div>

          {/* Stats, stack on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stats.map((stat, i) => {
              const themeClasses = {
                red: 'bg-brand-red text-white border-brand-red',
                gold: 'bg-brand-gold text-brand-navy border-brand-gold',
                navy: 'bg-brand-navy text-white border-brand-navy',
                green: 'bg-brand-green text-white border-brand-green',
              }[stat.theme] || 'bg-white text-brand-navy border-brand-navy/5';

              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                  className={`flex flex-col items-center text-center md:items-start md:text-left p-6 min-h-[10rem] rounded-card-lg border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2 ${themeClasses}`}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4 backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div className="font-display text-3xl md:text-4xl font-black leading-none mb-2">
                    <CountUp value={stat.value} />
                  </div>
                  
                  <div className="w-10 h-1 rounded-full my-3 bg-white/30" aria-hidden="true" />
                  
                  <div className="font-body text-lg font-semibold mb-1.5">{stat.label}</div>
                  <div className={`font-body text-sm leading-relaxed ${stat.theme === 'gold' ? 'text-brand-navy' : 'text-white'}`}>
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
