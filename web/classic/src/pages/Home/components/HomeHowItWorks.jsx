/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import { IconSetting, IconBolt, IconHistogram } from '@douyinfe/semi-icons';
import { getHomeCopy } from '../home-copy';

const STEP_ICONS = [IconSetting, IconBolt, IconHistogram];
const STEP_BARS = [
  'from-cyan-500 to-sky-600',
  'from-violet-500 to-fuchsia-600',
  'from-amber-500 to-orange-600',
];

export default function HomeHowItWorks({ isChinese }) {
  const copy = getHomeCopy(isChinese);

  return (
    <section className='home-landing-section home-how-section relative border-t border-indigo-100/40 px-4 py-20 md:px-6 md:py-28 dark:border-white/[0.07]'>
      <div className='home-how-wash pointer-events-none absolute inset-0' aria-hidden />
      <div className='relative mx-auto max-w-6xl'>
        <div className='mb-14 text-center md:mb-16'>
          <span className='home-section-badge home-section-badge-violet mb-4 inline-flex'>
            {copy.howBadge}
          </span>
          <h2 className='text-balance text-3xl font-bold tracking-tight md:text-4xl'>
            {copy.howTitle}
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-pretty text-sm text-semi-color-text-2 md:text-base'>
            {copy.howSubtitle}
          </p>
        </div>

        <div className='relative grid gap-8 md:grid-cols-3 md:gap-6'>
          <div
            aria-hidden
            className='absolute left-[20%] right-[20%] top-[72px] hidden h-px bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/50 to-amber-500/50 md:block'
          />
          {copy.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div
                key={step.num}
                className='home-how-card group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-indigo-100/45 bg-white/75 px-6 py-9 text-center shadow-[0_22px_55px_-38px_rgba(99,102,241,0.3)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-indigo-300/45 hover:shadow-[0_28px_64px_-34px_rgba(99,102,241,0.4)] dark:border-white/10 dark:bg-slate-950/45 md:px-8 md:py-10'
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${STEP_BARS[i]}`}
                />
                <div className='relative mx-auto mb-7 flex w-fit flex-col items-center'>
                  <div className='relative flex size-[4.5rem] items-center justify-center rounded-2xl border border-indigo-100/60 bg-gradient-to-br from-indigo-50/80 to-white text-indigo-700 shadow-lg transition-transform duration-500 group-hover:scale-[1.06] dark:border-white/10 dark:from-slate-900 dark:to-slate-950 dark:text-indigo-300'>
                    <Icon size='extra-large' />
                  </div>
                  <div
                    className={`absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-gradient-to-br ${STEP_BARS[i]} text-sm font-bold text-white shadow-md ring-2 ring-white dark:ring-slate-900`}
                  >
                    {step.num}
                  </div>
                </div>
                <h3 className='mb-3 text-lg font-bold tracking-tight'>{step.title}</h3>
                <p className='mx-auto max-w-[280px] text-sm leading-relaxed text-semi-color-text-2'>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
