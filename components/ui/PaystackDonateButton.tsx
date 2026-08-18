'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

// Set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in .env.local with your real Paystack key.
const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Paystack inline popup type — matches the global `PaystackPop` object
 * injected by https://js.paystack.co/v1/inline.js
 */
declare global {
  interface Window {
    PaystackPop?: {
      setup(config: {
        key: string;
        email: string;
        amount: number;
        currency: string;
        ref: string;
        onClose: () => void;
        callback: (response: { reference: string }) => void;
      }): { openIframe(): void };
    };
  }
}

const generateReference = () =>
  `donation-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

/** Lazily load the Paystack inline script once. Returns a promise that resolves when ready. */
function loadPaystackScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('SSR'));
  if (window.PaystackPop) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
    if (existing) {
      // Script tag is already in DOM but may still be loading
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Paystack script failed to load')));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Paystack script failed to load'));
    document.head.appendChild(script);
  });
}

export function PaystackDonateButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [processing, setProcessing] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const referenceRef = useRef<string>(generateReference());

  const paystackConfigured = PAYSTACK_PUBLIC_KEY.length > 0;

  const openModal = () => {
    referenceRef.current = generateReference();
    setErrorMsg(
      !paystackConfigured
        ? 'Online payments are not configured yet. Please use the bank or MoMo options below.'
        : ''
    );
    setStatusMsg('');
    setIsOpen(true);
  };

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setErrorMsg('');
    setStatusMsg('');
    setProcessing(false);
    triggerRef.current?.focus();
  }, []);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
    (focusableElements[0] ?? dialog).focus();

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };
    dialog.addEventListener('keydown', handleTab);
    return () => dialog.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  // Escape to close
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  const handlePaymentSuccess = useCallback(async (ref: string) => {
    setProcessing(true);
    setErrorMsg('');
    setStatusMsg('');
    try {
      const res = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: ref }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.verified) {
        setStatusMsg(`Donation confirmed! Reference: ${ref} — thank you.`);
      } else {
        setStatusMsg(`Donation received (reference ${ref}). Confirmation pending — thank you!`);
      }
    } catch {
      setStatusMsg(`Donation received (reference ${ref}). Confirmation pending — thank you!`);
    } finally {
      setProcessing(false);
    }
    referenceRef.current = generateReference();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (processing) return;

    if (!paystackConfigured) {
      setErrorMsg('Online payments are not configured yet. Please use the bank or MoMo options below.');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMsg('Please enter a valid amount.');
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    setProcessing(true);
    setErrorMsg('');
    setStatusMsg('');

    try {
      await loadPaystackScript();
      if (!window.PaystackPop) throw new Error('Paystack not available');

      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: Math.round(parseFloat(amount) * 100), // pesewas
        currency: 'GHS',
        ref: referenceRef.current,
        onClose: () => {
          setProcessing(false);
          setStatusMsg('Payment window closed — no charge was made.');
        },
        callback: (response) => {
          handlePaymentSuccess(response.reference);
        },
      });
      handler.openIframe();
    } catch {
      setProcessing(false);
      setErrorMsg('Unable to start the payment window. Please try again.');
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openModal}
        className="inline-flex items-center justify-center font-body font-semibold text-base bg-brand-gold text-brand-navy px-8 py-4 rounded-btn border-2 border-brand-gold hover:bg-brand-gold-light hover:border-brand-gold-light transition-all duration-300 shadow-lg shadow-brand-gold/20 w-full sm:w-auto"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2" aria-hidden="true">
          <rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="2" y1="10" x2="22" y2="10"></line>
        </svg>
        {paystackConfigured ? 'Donate Online with Paystack' : 'Online Donation'}
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm"
          onKeyDown={handleKeyDown}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="donation-modal-title"
          tabIndex={-1}
        >
          <div className="bg-white rounded-[1.25rem] w-full max-w-md p-8 shadow-2xl relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-brand-cream text-brand-navy hover:bg-brand-gold transition-colors"
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="text-center mb-8">
              <span className="w-12 h-12 bg-brand-gold/20 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-gold">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </span>
              <h3 id="donation-modal-title" className="font-display text-2xl font-bold text-brand-navy">Make a Donation</h3>
              <p className="font-body text-sm text-brand-navy/60 mt-2">Enter your details to proceed with Paystack secure payment.</p>
            </div>

            {statusMsg && (
              <p role="status" className="font-body text-sm text-brand-navy/70 bg-brand-cream rounded-btn px-4 py-3 mb-5 text-center">
                {statusMsg}
              </p>
            )}
            {errorMsg && (
              <p role="alert" className="font-body text-sm text-brand-red bg-brand-red/5 rounded-btn px-4 py-3 mb-5 text-center">
                {errorMsg}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label htmlFor="donor-email" className="block font-body text-sm font-semibold text-brand-navy mb-1.5">Email Address</label>
                <input
                  id="donor-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-btn border-2 border-brand-navy/20 bg-white font-body text-base text-brand-navy placeholder:text-brand-navy/55 focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              <div>
                <label htmlFor="donor-amount" className="block font-body text-sm font-semibold text-brand-navy mb-1.5">Amount (GHS)</label>
                <input
                  id="donor-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setErrorMsg(''); }}
                  placeholder="100.00"
                  className="w-full px-4 py-3 rounded-btn border-2 border-brand-navy/20 bg-white font-body text-base text-brand-navy placeholder:text-brand-navy/55 focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={processing}
                className="w-full font-body font-bold text-lg bg-brand-red text-white py-4 rounded-btn border-2 border-brand-red hover:bg-brand-red-dark transition-all duration-200 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Processing…' : 'Proceed to Pay'}
              </button>
            </form>

            <p className="font-body text-xs text-center text-brand-navy/40 mt-6">
              Secured by <strong className="font-semibold">Paystack</strong>
            </p>
          </div>
        </div>
      )}
    </>
  );
}