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

const FEATURE_ACCENTS = [
  {
    icon: 'text-amber-500 dark:text-amber-400',
    num: 'border-amber-200/70 bg-gradient-to-br from-amber-50 to-orange-50/80 text-amber-800 dark:border-amber-500/30 dark:from-amber-500/15 dark:to-orange-500/10 dark:text-amber-200',
    hover: 'from-amber-500/[0.08] via-orange-500/[0.05] to-rose-500/[0.06]',
    chips:
      'border-amber-200/55 bg-amber-50/50 hover:border-amber-400/60 hover:text-amber-700 dark:border-amber-500/25 dark:bg-amber-500/10 dark:hover:text-amber-300',
  },
  {
    icon: 'text-emerald-500 dark:text-emerald-400',
    num: 'border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-teal-50/80 text-emerald-800 dark:border-emerald-500/30 dark:from-emerald-500/15 dark:to-teal-500/10 dark:text-emerald-200',
    hover: 'from-emerald-500/[0.08] via-teal-500/[0.05] to-cyan-500/[0.06]',
    shield:
      'border-emerald-200/70 bg-gradient-to-br from-emerald-50/90 to-teal-50/60 dark:border-emerald-500/30 dark:from-emerald-500/15 dark:to-teal-500/10',
  },
  {
    icon: 'text-sky-500 dark:text-sky-400',
    num: 'border-sky-200/70 bg-gradient-to-br from-sky-50 to-indigo-50/80 text-sky-800 dark:border-sky-500/30 dark:from-sky-500/15 dark:to-indigo-500/10 dark:text-sky-200',
    hover: 'from-sky-500/[0.08] via-indigo-500/[0.05] to-violet-500/[0.06]',
    step: 'border-sky-200/60 text-sky-700 dark:border-sky-500/30 dark:text-sky-300',
    line: 'border-sky-200/50 dark:border-sky-500/20',
  },
  {
    icon: 'text-violet-500 dark:text-violet-400',
    num: 'border-violet-200/70 bg-gradient-to-br from-violet-50 to-fuchsia-50/80 text-violet-800 dark:border-violet-500/30 dark:from-violet-500/15 dark:to-fuchsia-500/10 dark:text-violet-200',
    hover: 'from-violet-500/[0.08] via-fuchsia-500/[0.05] to-pink-500/[0.06]',
    tag: 'border-violet-200/60 bg-gradient-to-r from-violet-50/90 to-fuchsia-50/70 text-violet-700 dark:border-violet-500/25 dark:from-violet-500/15 dark:to-fuchsia-500/10 dark:text-violet-200',
  },
];

const EXTRA_MINI_BORDERS = [
  'border-indigo-200/55 hover:border-indigo-400/60 dark:border-indigo-500/25',
  'border-teal-200/55 hover:border-teal-400/60 dark:border-teal-500/25',
  'border-violet-200/55 hover:border-violet-400/60 dark:border-violet-500/25',
  'border-rose-200/55 hover:border-rose-400/60 dark:border-rose-500/25',
];

export default function HomeFeatures({ isChinese }) {
  const copy = getHomeCopy(isChinese);

  return (
    <section className='home-landing-section home-features-section home-section-blend relative overflow-hidden px-4 py-20 md:px-6 md:py-28'>
      <div className='home-features-wash pointer-events-none absolute inset-0' aria-hidden />
      <div className='relative mx-auto max-w-6xl'>
        <div className='mx-auto mb-14 max-w-2xl text-center md:mb-16'>
          <span className='home-section-badge home-section-badge-amber mb-4 inline-flex shadow-sm shadow-amber-500/10'>
            {copy.featuresBadge}
          </span>
          <h2 className='text-balance text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]'>
            {copy.featuresTitle}
            <br />
            <span className='bg-gradient-to-r from-amber-500 via-orange-500 to-fuchsia-500 bg-clip-text text-transparent dark:from-amber-300 dark:via-orange-400 dark:to-fuchsia-400'>
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
            const accent = FEATURE_ACCENTS[i];
            return (
              <div
                key={f.num}
                className={`home-feature-bento home-feature-bento--${i} group relative overflow-hidden rounded-[1.35rem] bg-white/75 shadow-[0_20px_50px_-40px_rgba(99,102,241,0.28)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_32px_70px_-36px_rgba(99,102,241,0.4)] dark:bg-slate-950/50 dark:shadow-black/45 ${FEATURE_SPANS[i]}`}
              >
                <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${accent.hover}`}
                  />
                </div>
                <div className='relative z-10 p-7 md:p-8'>
                  <div className='mb-4 flex flex-wrap items-center gap-3'>
                    <span
                      className={`flex size-9 items-center justify-center rounded-xl border font-mono text-[11px] font-bold ${accent.num}`}
                    >
                      {f.num}
                    </span>
                    <div className='flex min-w-0 items-center gap-2'>
                      <Icon className={accent.icon} />
                      <h3 className='text-base font-semibold'>{f.title}</h3>
                    </div>
                  </div>
                  <p className='text-sm leading-relaxed text-semi-color-text-2'>{f.desc}</p>
                  {i === 0 && (
                    <div className='mt-4 grid grid-cols-3 gap-2'>
                      {MODEL_CHIPS.map((name) => (
                        <div
                          key={name}
                          className={`flex items-center justify-center rounded-lg border px-2 py-2 text-xs text-semi-color-text-2 transition-colors ${accent.chips}`}
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                  {i === 1 && (
                    <div className='mt-6 flex justify-center'>
                      <div
                        className={`flex size-16 items-center justify-center rounded-2xl border shadow-md shadow-emerald-500/15 ${accent.shield}`}
                      >
                        <IconShield
                          size='extra-large'
                          className='text-emerald-600 dark:text-emerald-400'
                        />
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className='mt-4 space-y-2'>
                      {(isChinese
                        ? ['负载均衡', '速率限制', '费用追踪']
                        : ['Load Balancing', 'Rate Limiting', 'Cost Tracking']
                      ).map((step, si) => (
                        <div
                          key={step}
                          className='flex items-center gap-2 text-xs text-semi-color-text-2'
                        >
                          <span
                            className={`flex size-6 items-center justify-center rounded-full border text-[10px] font-bold ${accent.step}`}
                          >
                            {si + 1}
                          </span>
                          <span
                            className={`flex-1 border-t ${accent.line}`}
                          />
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
                          className={`rounded-full border px-3 py-1 text-[10px] font-bold ${accent.tag}`}
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
                className={`home-feature-mini home-feature-mini--${i} flex flex-col items-center rounded-2xl border border-dashed bg-white/60 px-3 py-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/90 hover:shadow-lg dark:bg-white/[0.04] dark:hover:bg-slate-950/55 ${EXTRA_MINI_BORDERS[i]}`}
              >
                <div className='home-feature-mini-icon mb-3 flex size-11 items-center justify-center rounded-2xl shadow-sm'>
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
