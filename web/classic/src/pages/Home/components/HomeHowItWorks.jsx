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
  'from-cyan-400 to-sky-600',
  'from-violet-400 to-fuchsia-600',
  'from-amber-400 to-orange-500',
];
const STEP_ICON_BOX = [
  'border-cyan-200/70 bg-gradient-to-br from-cyan-50/90 to-sky-50/70 text-cyan-700 shadow-cyan-500/20 dark:border-cyan-500/30 dark:from-cyan-500/15 dark:to-sky-500/10 dark:text-cyan-300',
  'border-violet-200/70 bg-gradient-to-br from-violet-50/90 to-fuchsia-50/70 text-violet-700 shadow-violet-500/20 dark:border-violet-500/30 dark:from-violet-500/15 dark:to-fuchsia-500/10 dark:text-violet-300',
  'border-amber-200/70 bg-gradient-to-br from-amber-50/90 to-orange-50/70 text-amber-800 shadow-amber-500/20 dark:border-amber-500/30 dark:from-amber-500/15 dark:to-orange-500/10 dark:text-amber-200',
];

export default function HomeHowItWorks({ isChinese }) {
  const copy = getHomeCopy(isChinese);

  return (
    <section className='home-landing-section home-how-section home-section-blend relative overflow-hidden px-4 py-20 md:px-6 md:py-28'>
      <div className='home-how-wash pointer-events-none absolute inset-0' aria-hidden />
      <div className='relative mx-auto max-w-6xl'>
        <div className='mb-14 text-center md:mb-16'>
          <span className='home-section-badge home-section-badge-violet mb-4 inline-flex shadow-sm shadow-violet-500/10'>
            {copy.howBadge}
          </span>
          <h2 className='text-balance text-3xl font-bold tracking-tight md:text-4xl'>
            <span className='bg-gradient-to-r from-cyan-600 via-violet-600 to-amber-500 bg-clip-text text-transparent dark:from-cyan-400 dark:via-violet-400 dark:to-amber-400'>
              {copy.howTitle}
            </span>
          </h2>
          <p className='mx-auto mt-4 max-w-2xl text-pretty text-sm text-semi-color-text-2 md:text-base'>
            {copy.howSubtitle}
          </p>
        </div>

        <div className='relative grid gap-8 md:grid-cols-3 md:gap-6'>
          <div
            aria-hidden
            className='absolute left-[18%] right-[18%] top-[72px] hidden h-0.5 bg-gradient-to-r from-cyan-400/70 via-fuchsia-500/70 to-amber-400/70 md:block'
          />
          {copy.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <div
                key={step.num}
                className={`home-how-card home-how-card--${i} group relative flex flex-col overflow-hidden rounded-[1.35rem] px-6 py-9 text-center shadow-[0_22px_55px_-38px_rgba(99,102,241,0.35)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_70px_-34px_rgba(99,102,241,0.45)] md:px-8 md:py-10`}
              >
                <div
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${STEP_BARS[i]}`}
                />
                <div className='relative mx-auto mb-7 flex w-fit flex-col items-center'>
                  <div
                    className={`relative flex size-[4.5rem] items-center justify-center rounded-2xl border shadow-lg transition-transform duration-500 group-hover:scale-[1.06] ${STEP_ICON_BOX[i]}`}
                  >
                    <Icon size='extra-large' />
                  </div>
                  <div
                    className={`absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-gradient-to-br ${STEP_BARS[i]} text-sm font-bold text-white shadow-lg ring-2 ring-white dark:ring-slate-900`}
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
