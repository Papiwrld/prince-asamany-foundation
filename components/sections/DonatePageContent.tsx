'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/lib/site';

const PaystackDonateButton = dynamic(
  () => import('@/components/ui/PaystackDonateButton').then((mod) => mod.PaystackDonateButton),
  { ssr: false }
);

interface DonationRow {
  label: string;
  value: string;
}

function CopyRow({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-transparent hover:bg-brand-gold/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold transition-colors duration-200"
    >
      <span className="block">
        <span className="block font-body text-xs text-brand-navy/70 uppercase tracking-wider mb-0.5">{label}</span>
        <span className="block font-body text-base font-semibold text-brand-navy">{value}</span>
      </span>
      <span
        role="status"
        aria-live="polite"
        className={`shrink-0 px-3 py-1.5 rounded-btn text-xs font-body font-semibold border-2 transition-all duration-200 min-h-[44px] min-w-[80px] text-center ${
          copied
            ? 'bg-brand-green text-white border-brand-green'
            : 'bg-transparent text-brand-navy border-brand-navy'
        }`}
      >
        {copied ? 'Copied' : 'Copy'}
      </span>
    </button>
  );
}

function DonationCard({
  title,
  subtitle,
  rows,
  logo,
}: {
  title: string;
  subtitle: string;
  rows: DonationRow[];
  logo?: React.ReactNode;
}) {
  return (
    <div className="rounded-card-lg overflow-hidden bg-white border border-brand-navy/5 shadow-sm">
      {/* Card header */}
      <div className="p-6 flex items-center gap-4 border-b border-brand-navy/5">
        {logo && <div className="shrink-0">{logo}</div>}
        <div>
          <h3 className="font-display text-xl font-bold text-brand-navy">{title}</h3>
          <p className="font-body text-sm text-brand-navy/60 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-brand-cream">
        {rows.map((row) => (
          <CopyRow key={row.label} value={row.value} label={row.label} />
        ))}
      </div>
    </div>
  );
}

export function DonatePageContent() {
  return (
    <>
      {/* Donation cards */}
      <section className="bg-brand-cream section-padding" aria-labelledby="donate-heading">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="mb-12 text-center">
            <h2 id="donate-heading" className="font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight">
              Choose your donation method
            </h2>
            <p className="font-body text-base text-brand-navy/65 mt-3 leading-relaxed">
              Tap or click any account row to copy it to your clipboard.
            </p>
          </div>

          <div className="flex justify-center mb-16">
            <PaystackDonateButton />
          </div>

          <div id="manual-donation" className="flex items-center gap-4 mb-10">
            <div className="h-px bg-brand-navy/10 flex-1"></div>
            <span className="font-body text-sm font-semibold text-brand-navy/70 uppercase tracking-widest">Or donate manually</span>
            <div className="h-px bg-brand-navy/10 flex-1"></div>
          </div>

          <div className="flex flex-col gap-8">
            {/* GTBank */}
            <DonationCard
              title="Guaranty Trust Bank"
              subtitle={siteConfig.donation.bank.branch}
              logo={
                <div className="w-14 h-14 bg-brand-orange/10 rounded-btn flex items-center justify-center">
                  <span className="font-body text-xs font-bold text-brand-orange text-center leading-tight">GT<br />Bank</span>
                </div>
              }
              rows={[
                { label: 'Account Name', value: siteConfig.donation.bank.accountName },
                ...siteConfig.donation.bank.accounts,
              ]}
            />

            {/* MTN MoMo */}
            <DonationCard
              title="MTN MoMo"
              subtitle={siteConfig.donation.momo.subtitle}
              logo={
                <div className="w-14 h-14 bg-brand-gold/10 rounded-btn flex items-center justify-center">
                  <span className="font-body text-xs font-bold text-brand-gold text-center leading-tight">MTN<br />MoMo</span>
                </div>
              }
              rows={[
                { label: 'MoMo Number', value: siteConfig.donation.momo.number },
                { label: 'Name', value: siteConfig.donation.momo.accountName },
                { label: 'Merchant ID', value: siteConfig.donation.momo.merchantId },
              ]}
            />
          </div>

          {/* Confirmation note */}
          <div className="mt-10 p-6 bg-white rounded-card-lg border border-brand-navy/10 text-center">
            <p className="font-body text-sm text-brand-navy/70 leading-relaxed">
              After making your donation, please contact us at{' '}
              <a href={`tel:${siteConfig.phone.tel}`} className="font-semibold text-brand-red hover:underline">
                {siteConfig.phone.display}
              </a>{' '}
              to confirm your transfer. We would love to thank you personally.
            </p>
          </div>
        </div>
      </section>

      {/* Why donate section */}
      <section className="bg-white section-padding">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative rounded-card-lg overflow-hidden aspect-[4/3]">
              <Image
                src="/media/opt/IMG_6926.webp"
                alt="Overhead view of children sharing a meal from food packs distributed during a Joy to the Street relief event"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col gap-6">
            <div className="text-center">
              <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red">
                Your Contribution
              </span>
              <h2 className="font-display text-3xl font-bold text-brand-navy mt-2 leading-tight">
                Why your support matters
              </h2>
            </div>
              <blockquote className="font-display italic text-lg text-brand-navy/80 leading-relaxed border-l-4 border-brand-gold pl-6">
                &ldquo;The Prince Asamany Foundation stands as a bridge between need and compassion.
                If you have a heart to uplift the less privileged, join hands with us, together we
                can restore hope and change lives.&rdquo;
              </blockquote>
              <ul className="flex flex-col gap-3 list-none m-0 p-0" role="list">
                {[
                  'Directly funds clean water infrastructure in Ejisu communities',
                  'Supports environmental restoration and reforestation',
                  'Enables capacity-building workshops for women and youth',
                  "Sustains the Foundation's operations and community outreach",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-brand-gold shrink-0 flex items-center justify-center mt-0.5" aria-hidden="true">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4l3 3 5-6" className="stroke-brand-navy" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="font-body text-sm text-brand-navy/75 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
