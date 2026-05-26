/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import {
  IconBolt,
  IconShield,
  IconGlobe,
  IconCode,
  IconHistogram,
  IconCoinMoneyStroked,
  IconUserGroup,
  IconGift,
} from '@douyinfe/semi-icons';
import { getHomeCopy } from '../home-copy';

const FEATURE_ICONS = [IconBolt, IconShield, IconGlobe, IconCode];
const EXTRA_ICONS = [
  IconHistogram,
  IconCoinMoneyStroked,
  IconUserGroup,
  IconGift,
];
const FEATURE_SPANS = [
  'md:col-span-2',
  'md:col-span-1',
  'md:col-span-1',
  'md:col-span-2',
];

const MODEL_CHIPS = ['OpenAI', 'Claude', 'Gemini', 'DeepSeek', 'Qwen', 'Llama'];

export default function HomeFeatures({ isChinese }) {
  const copy = getHomeCopy(isChinese);

  return (
    <section className='home-landing-section home-features-section relative overflow-hidden px-4 py-20 md:px-6 md:py-28'>
      <div className='home-features-wash pointer-events-none absolute inset-0' aria-hidden />
      <div className='relative mx-auto max-w-6xl'>
        <div className='mx-auto mb-14 max-w-2xl text-center md:mb-16'>
          <span className='home-section-badge home-section-badge-amber mb-4 inline-flex'>
            {copy.featuresBadge}
          </span>
          <h2 className='text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]'>
            {copy.featuresTitle}
            <br />
            <span className='bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-rose-400'>
              {copy.featuresTitleAccent}
            </span>
          </h2>
          <p className='mt-4 text-pretty text-sm text-semi-color-text-2 md:text-base'>
            {copy.featuresSubtitle}
          </p>
        </div>

        <div className='grid gap-5 md:grid-cols-3'>
          {copy.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div
                key={f.num}
                className={`home-feature-bento group relative overflow-hidden rounded-[1.35rem] border-2 border-indigo-100/40 bg-white/70 shadow-[0_20px_50px_-40px_rgba(99,102,241,0.25)] transition-all duration-500 hover:-translate-y-1 hover:border-indigo-300/40 hover:shadow-[0_28px_60px_-36px_rgba(99,102,241,0.35)] dark:border-white/10 dark:bg-slate-950/40 dark:shadow-black/40 ${FEATURE_SPANS[i]}`}
              >
                <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/[0.06] via-transparent to-teal-500/[0.05]' />
                </div>
                <div className='relative z-10 p-7 md:p-8'>
                  <div className='mb-4 flex flex-wrap items-center gap-3'>
                    <span className='flex size-9 items-center justify-center rounded-xl border border-indigo-100/60 bg-indigo-50/50 font-mono text-[11px] font-bold text-indigo-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-indigo-300'>
                      {f.num}
                    </span>
                    <div className='flex min-w-0 items-center gap-2'>
                      <Icon className='text-indigo-500' />
                      <h3 className='text-base font-semibold'>{f.title}</h3>
                    </div>
                  </div>
                  <p className='text-sm leading-relaxed text-semi-color-text-2'>{f.desc}</p>
                  {i === 0 && (
                    <div className='mt-4 grid grid-cols-3 gap-2'>
                      {MODEL_CHIPS.map((name) => (
                        <div
                          key={name}
                          className='flex items-center justify-center rounded-lg border border-indigo-100/50 bg-indigo-50/30 px-2 py-2 text-xs text-semi-color-text-2 transition-colors hover:border-indigo-300/50 hover:text-indigo-700 dark:border-white/10 dark:bg-white/[0.04] dark:hover:text-indigo-300'
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div className='mt-6 flex justify-center'>
                      <div className='flex size-16 items-center justify-center rounded-2xl border border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-500/20 dark:bg-emerald-500/10'>
                        <IconShield size='extra-large' className='text-emerald-600 dark:text-emerald-400' />
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className='mt-4 space-y-2'>
                      {(isChinese
                        ? ['负载均衡', '速率限制', '费用追踪']
                        : ['Load Balancing', 'Rate Limiting', 'Cost Tracking']
                      ).map((step, si) => (
                        <div key={step} className='flex items-center gap-2 text-xs text-semi-color-text-2'>
                          <span className='flex size-6 items-center justify-center rounded-full border border-indigo-200/60 text-[10px] font-bold'>
                            {si + 1}
                          </span>
                          <span className='flex-1 border-t border-indigo-100/50 dark:border-white/10' />
                          {step}
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 3 && (
                    <div className='mt-4 flex flex-wrap items-center gap-2'>
                      {['API', 'SDK', 'CLI', 'Docs'].map((n) => (
                        <span
                          key={n}
                          className='rounded-full border border-indigo-100/60 bg-white/80 px-3 py-1 text-[10px] font-bold text-indigo-700 dark:border-white/10 dark:bg-white/[0.06] dark:text-indigo-300'
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className='mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
          {copy.featuresExtra.map((f, i) => {
            const Icon = EXTRA_ICONS[i];
            return (
              <div
                key={f.title}
                className='home-feature-mini flex flex-col items-center rounded-2xl border border-dashed border-indigo-200/50 bg-indigo-50/20 px-3 py-7 text-center transition-all duration-300 hover:border-indigo-300/60 hover:bg-white/80 hover:shadow-md dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-slate-950/50'
              >
                <div className='mb-3 flex size-11 items-center justify-center rounded-2xl border border-indigo-100/60 bg-white text-indigo-600 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-indigo-300'>
                  <Icon size='large' />
                </div>
                <h3 className='mb-1 text-sm font-semibold'>{f.title}</h3>
                <p className='max-w-[200px] text-xs leading-relaxed text-semi-color-text-2'>
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
