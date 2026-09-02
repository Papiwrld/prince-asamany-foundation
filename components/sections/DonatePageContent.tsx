'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { siteConfig } from '@/lib/site';
import { pressItems } from '@/lib/content';
import { GIVE_TIERS } from '@/components/ui/PaystackDonateButton';

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
          <p className="font-body text-sm text-brand-navy/75 mt-0.5">{subtitle}</p>
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
            <p className="font-body text-base text-brand-navy/80 mt-3 leading-relaxed">
              Give online in minutes, or use the bank and MoMo details below. Every gift funds
              health, education, environment and welfare programs across Ejisu Municipal Assembly.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <PaystackDonateButton />
          </div>

          {/* Impact-anchored giving tiers */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16 list-none m-0 p-0" aria-label="What your gift can provide">
            {GIVE_TIERS.map((tier) => (
              <li
                key={tier.amount}
                className="rounded-card-lg bg-white border border-brand-navy/5 shadow-sm px-5 py-6 text-center transition-all duration-200 hover:shadow-md"
              >
                <span className="block font-display text-xl font-bold text-brand-navy">{tier.label}</span>
                <span className="block w-8 h-0.5 bg-brand-gold mx-auto my-2.5" aria-hidden="true" />
                <span className="block font-body text-sm text-brand-navy/75 leading-relaxed">{tier.impact}</span>
              </li>
            ))}
          </ul>

          <div id="manual-donation" className="flex items-center gap-4 mb-10">
            <div className="h-px bg-brand-navy/10 flex-1"></div>
            <span className="font-body text-sm font-semibold text-brand-navy/70 uppercase tracking-widest text-center">Or donate manually: tap any row to copy</span>
            <div className="h-px bg-brand-navy/10 flex-1"></div>
          </div>

          <div className="flex flex-col gap-8">
            {/* GTBank */}
            <DonationCard
              title="Guaranty Trust Bank"
              subtitle={siteConfig.donation.bank.branch}
              logo={
                <div className="w-14 h-14 bg-brand-orange/10 rounded-btn flex items-center justify-center" aria-hidden="true">
                  <span className="font-body text-xs font-bold text-brand-navy text-center leading-tight">GT<br />Bank</span>
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
                <div className="w-14 h-14 bg-brand-gold/10 rounded-btn flex items-center justify-center" aria-hidden="true">
                  <span className="font-body text-xs font-bold text-brand-navy text-center leading-tight">MTN<br />MoMo</span>
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
              <a href={`tel:${siteConfig.phone.tel}`} className="font-semibold text-brand-red-dark hover:underline">
                {siteConfig.phone.display}
              </a>{' '}
              to confirm your transfer. We would love to thank you personally.
            </p>
          </div>

          {/* Trust markers beside the ask */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <span className="inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-btn bg-brand-navy/10 text-brand-navy flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <span className="font-body text-sm font-semibold text-brand-navy/75">Registered NGO · Ejisu Municipal Assembly, Ghana</span>
            </span>
            <a
              href={pressItems[0]?.href ?? 'https://www.choicenewsonline.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 group"
              aria-label="Read our coverage on Choice News Online (opens in a new tab)"
            >
              <span className="w-9 h-9 rounded-btn bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                  <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" />
                </svg>
              </span>
              <span className="font-body text-sm font-semibold text-brand-navy/75 group-hover:text-brand-red-dark transition-colors duration-200">
                Featured by Choice News Online
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="inline-block ml-1 -mt-0.5">
                  <path d="M7 17 17 7" /><path d="M7 7h10v10" />
                </svg>
              </span>
            </a>
            <span className="inline-flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-btn bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </span>
              <span className="font-body text-sm font-semibold text-brand-navy/75">2025 Social Change Advocate · AFLAG</span>
            </span>
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
              <div>
                <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">
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

      {/* Donation FAQs — objection handling near the ask */}
      <section className="bg-brand-cream section-padding" aria-labelledby="donate-faq-heading">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <span className="font-body text-sm font-semibold uppercase tracking-[0.15em] text-brand-red-dark">Good to Know</span>
            <h2 id="donate-faq-heading" className="font-display text-3xl md:text-4xl font-bold text-brand-navy mt-2 leading-tight">
              Donation questions, answered
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                q: 'Where does my money go?',
                a: 'Gifts fund our programs directly: free health screenings and deworming exercises, clean water access, environmental restoration, education support and welfare outreach such as "Joy to the Street" across Ejisu Municipal Assembly.',
              },
              {
                q: 'Is my online donation secure?',
                a: 'Yes. Online payments are processed by Paystack, a PCI-DSS compliant payment provider. Your card or mobile money credentials are entered on Paystack\u2019s secure page and are never stored on our website.',
              },
              {
                q: 'Can I give monthly, or support in other ways?',
                a: 'Absolutely. You can set up a recurring transfer with your bank using the account details above, or contact us to give goods and services in kind, or volunteer your time and skills.',
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group rounded-card-lg bg-white border border-brand-navy/10 px-6 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-body font-semibold text-base text-brand-navy select-none focus-visible:outline-2 focus-visible:outline-brand-navy focus-visible:outline-offset-2 rounded-btn">
                  {faq.q}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                    className="shrink-0 text-brand-gold transition-transform duration-200 group-open:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="mt-3 font-body text-sm text-brand-navy/70 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
