import React from 'react';
import Image from 'next/image';
import { blurProps } from '@/lib/media';

interface PageHeaderProps {
  overline: string;
  title: string;
  description: string;
  bgImage?: string;
  tone?: 'navy' | 'green';
  className?: string;
}

const toneClasses = {
  navy: {
    bg: 'bg-brand-navy',
    // Bottom-heaviest scrim: content is centered, so protect the middle/bottom
    // and let the top breathe.
    overlay: 'bg-gradient-to-b from-brand-navy/60 via-brand-navy/80 to-brand-navy/95',
  },
  green: {
    bg: 'bg-brand-green',
    overlay: 'bg-gradient-to-b from-brand-green/60 via-brand-green/80 to-brand-green/95',
  },
};

export function PageHeader({ overline, title, description, bgImage, tone = 'navy', className = '' }: PageHeaderProps) {
  const toneCls = toneClasses[tone];
  return (
    <section className={`relative ${toneCls.bg} overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 ${className}`}>
      {/* Background Image / Overlay */}
      {bgImage ? (
        <div className="absolute inset-0 opacity-20">
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden="true"
            {...blurProps(bgImage)}
          />
        </div>
      ) : (
        /* Abstract pattern if no image */
        <div className="absolute inset-0 opacity-[0.06] radial-mask-falloff pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
      )}
      
      <div className={`absolute inset-0 ${toneCls.overlay}`} aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold mb-3">
            {overline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>

          <div className="mt-5 h-1 w-12 rounded-full bg-brand-gold opacity-80" aria-hidden="true" />

          <p className="mt-6 font-body text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl text-center">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

