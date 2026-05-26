/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React, { useEffect, useRef, useCallback } from 'react';
import { getHomeCopy } from '../home-copy';

const STAT_ACCENTS = [
  'from-teal-500 to-cyan-400',
  'from-sky-500 to-indigo-500',
  'from-amber-500 to-rose-500',
  'from-emerald-500 to-lime-400',
];

function StatCounter({ end, suffix = '', duration = 1400 }) {
  const ref = useRef(null);
  const startedRef = useRef(false);

  const animate = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      el.textContent = `${Math.round(eased * end)}${suffix}`;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, suffix, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = `${end}${suffix}`;
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate, end, suffix]);

  return (
    <span ref={ref} className='tabular-nums'>
      0{suffix}
    </span>
  );
}

export default function HomeStats({ isChinese }) {
  const copy = getHomeCopy(isChinese);

  return (
    <section className='home-landing-section home-stats-section relative px-4 py-14 md:px-6 md:py-20'>
      <div className='home-stats-grid-bg pointer-events-none absolute inset-0' aria-hidden />
      <div className='relative mx-auto max-w-6xl'>
        <div className='home-stats-panel rounded-[2rem] border border-indigo-100/50 bg-white/75 p-6 shadow-[0_24px_80px_-48px_rgba(99,102,241,0.35)] ring-1 ring-indigo-500/[0.06] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45 dark:ring-indigo-400/10 md:p-10'>
          <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
            {copy.stats.map((s, i) => (
              <div
                key={s.label}
                className='home-stat-card group relative flex flex-col rounded-2xl border border-indigo-100/45 bg-gradient-to-br from-white/90 to-indigo-50/30 px-4 py-6 transition-all duration-300 hover:border-indigo-300/50 hover:shadow-lg dark:border-white/10 dark:from-slate-900/50 dark:to-indigo-950/20 md:px-5 md:py-8'
              >
                <div
                  aria-hidden
                  className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b ${STAT_ACCENTS[i]} opacity-70 group-hover:opacity-100`}
                />
                <div className='relative z-10 pl-3 text-left'>
                  <span
                    className={`bg-gradient-to-br ${STAT_ACCENTS[i]} bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-5xl`}
                  >
                    <StatCounter end={s.end} suffix={s.suffix} />
                  </span>
                  <span className='mt-2 block text-xs font-medium text-semi-color-text-2 md:text-sm'>
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
