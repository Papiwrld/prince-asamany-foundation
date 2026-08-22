'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: string;
  duration?: number;
}

export function CountUp({ value, duration = 1.8 }: CountUpProps) {
  const match = /^(\d[\d,]*)(.*)$/.exec(value);
  const target = match ? parseInt(match[1].replace(/,/g, ''), 10) : null;
  const suffix = match ? match[2] : '';
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (target === null || !inView || started.current) return;
    started.current = true;
    if (prefersReduced) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${Math.round(target * eased).toLocaleString('en-US')}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, prefersReduced, target, suffix, value, duration]);

  return <span ref={ref}>{display}</span>;
}