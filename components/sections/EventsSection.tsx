'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Sparkles, HeartHandshake } from 'lucide-react';
import { EventItem } from '@/lib/events';
import { EventCard } from '@/components/ui/EventCard';

interface EventsSectionProps {
  events: EventItem[];
}

export function EventsSection({ events }: EventsSectionProps) {
  const upcomingEvents = events.slice(0, 3);
  const featuredEvent = upcomingEvents.find((e) => e.featured) || upcomingEvents[0];
  const secondaryEvents = upcomingEvents.filter((e) => e.id !== featuredEvent?.id);

  return (
    <section className="relative overflow-hidden bg-surface-alt section-padding" aria-labelledby="events-heading">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 text-brand-navy border border-brand-gold/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-red" />
            <span className="font-body text-xs font-semibold uppercase tracking-[0.15em]">
              Upcoming Gatherings & Outreaches
            </span>
          </div>
          <h2
            id="events-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy leading-[1.12]"
          >
            Join us on the ground
          </h2>
          <p className="mt-4 font-body text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            From free community health screenings and deworming initiatives to rural farmer workshops - explore our schedules and community actions.
          </p>
        </div>

        {/* Content */}
        {upcomingEvents.length > 0 ? (
          <div className="space-y-8">
            {/* Featured Event Card */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <EventCard event={featuredEvent} featured={true} />
              </motion.div>
            )}

            {/* Secondary Events Grid */}
            {secondaryEvents.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {secondaryEvents.map((evt, idx) => (
                  <motion.div
                    key={evt.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <EventCard event={evt} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* Centered CTA */}
            <div className="mt-12 flex justify-center">
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-brand-navy/15 bg-white hover:bg-brand-navy hover:text-white text-brand-navy font-display text-sm font-bold shadow-sm hover:shadow transition-all duration-200"
              >
                <span>View All Events & Archives</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ) : (
          /* Rich, Balanced Outreach Spotlight */
          <div className="relative rounded-3xl border border-brand-navy/10 bg-white/95 backdrop-blur-sm p-8 sm:p-12 md:p-14 text-center max-w-3xl mx-auto shadow-lg shadow-brand-navy/5 overflow-hidden">
            {/* Tricolor top border accent */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-brand-red via-brand-gold to-brand-green" />

            {/* Active status badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active Field Preparation & Planning</span>
            </div>

            <div className="w-16 h-16 rounded-2xl bg-brand-gold/15 text-brand-navy flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Calendar className="w-8 h-8 text-brand-navy" />
            </div>

            <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-3">
              New Outreaches Currently in Planning
            </h3>
            <p className="font-body text-slate-600 mb-8 max-w-lg mx-auto text-base md:text-lg leading-relaxed">
              Our medical teams and welfare coordinators are actively organizing our next round of healthcare screenings and rural assistance operations in the Ejisu Municipality.
            </p>

            {/* Active focus chips */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-xl mx-auto text-left">
              <div className="p-3.5 rounded-xl bg-surface-alt/70 border border-brand-navy/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-red font-bold text-base shadow-sm shrink-0">
                  🩺
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-brand-navy">Health Screenings</p>
                  <p className="text-[11px] text-slate-500">Ejisu & rural clinics</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-alt/70 border border-brand-navy/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-gold-dark font-bold text-base shadow-sm shrink-0">
                  🌾
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-brand-navy">Farmer Support</p>
                  <p className="text-[11px] text-slate-500">Equipment & training</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-alt/70 border border-brand-navy/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-brand-navy font-bold text-base shadow-sm shrink-0">
                  🎒
                </div>
                <div>
                  <p className="font-display text-xs font-bold text-brand-navy">Youth Welfare</p>
                  <p className="text-[11px] text-slate-500">Relief distribution</p>
                </div>
              </div>
            </div>

            {/* Balanced CTA buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold text-sm shadow-sm transition-all"
              >
                <HeartHandshake className="w-4 h-4 text-brand-gold" />
                <span>Partner or Volunteer</span>
              </Link>
              <Link
                href="/events"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 hover:border-brand-navy/30 bg-white hover:bg-slate-50 text-slate-700 hover:text-brand-navy font-semibold text-sm shadow-sm transition-all"
              >
                <span>Explore All Past Outreaches</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
