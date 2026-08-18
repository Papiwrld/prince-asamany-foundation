import React from 'react';
import Image from 'next/image';

interface PageHeaderProps {
  overline: string;
  title: string;
  description: string;
  bgImage?: string;
  className?: string;
}

export function PageHeader({ overline, title, description, bgImage, className = '' }: PageHeaderProps) {
  return (
    <section className={`relative bg-brand-navy overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28 ${className}`}>
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
          />
        </div>
      ) : (
        /* Abstract pattern if no image */
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
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
      
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-transparent" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-gold" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
        <div className="max-w-3xl flex flex-col items-start text-left">
          <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-gold mb-3">
            {overline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>
          
          <div className="mt-6 flex gap-5">
            <div className="w-1 rounded-full bg-brand-gold shrink-0 mt-1.5 mb-1.5 opacity-80" aria-hidden="true" />
            <p className="font-body text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
