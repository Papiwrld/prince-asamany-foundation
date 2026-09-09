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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/15 text-brand-navy border border-brand-gold/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-red" />
              <span className="font-body text-xs font-semibold uppercase tracking-[0.15em]">
                Upcoming Gatherings & Outreaches
              </span>
            </div>
            <h2
              id="events-heading"
              className="font-display text-4xl md:text-5xl font-bold text-brand-navy leading-[1.12]"
            >
              Join us on the ground
            </h2>
            <p className="mt-4 font-body text-lg text-slate-600 leading-relaxed max-w-xl">
              From free community health screenings and deworming initiatives to rural farmer workshops - explore our upcoming schedules.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/events"
              className="group inline-flex items-center gap-2 font-display text-sm font-bold text-brand-navy hover:text-brand-red transition-colors duration-200"
            >
              <span>View All Events & Archives</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
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
          </div>
        ) : (
          /* Warm Empty State */
          <div className="rounded-3xl border border-brand-navy/10 bg-white p-10 md:p-14 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-brand-gold/15 text-brand-navy flex items-center justify-center mx-auto mb-5">
              <Calendar className="w-8 h-8 text-brand-navy" />
            </div>
            <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">
              New Outreaches in Planning
            </h3>
            <p className="font-body text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
              We are currently coordinating our next round of medical and relief operations in the Ejisu Municipality. Follow our updates or partner with us to sponsor an outreach.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/get-involved"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy/90 text-white font-semibold text-sm transition-colors"
              >
                <HeartHandshake className="w-4 h-4 text-brand-gold" />
                <span>Partner or Volunteer</span>
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 hover:border-brand-navy/30 text-slate-700 hover:text-brand-navy font-semibold text-sm transition-colors"
              >
                <span>View Past Outreaches</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
