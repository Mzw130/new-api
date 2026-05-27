/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import { Button } from '@douyinfe/semi-ui';
import { IconPlay } from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import { getHomeCopy } from '../home-copy';

export default function HomeCta({ isChinese, isMobile }) {
  const copy = getHomeCopy(isChinese);
  const isLoggedIn = !!localStorage.getItem('user');

  if (isLoggedIn) {
    return null;
  }

  return (
    <section className='home-landing-section home-cta-section home-section-blend relative overflow-hidden px-4 py-20 md:px-6 md:py-28'>
      <div className='home-cta-mesh pointer-events-none absolute inset-0' aria-hidden />
      <div className='home-cta-panel relative mx-auto max-w-2xl rounded-[2rem] px-6 py-12 text-center backdrop-blur-md md:px-12 md:py-14'>
        <h2 className='text-2xl font-bold leading-tight tracking-tight md:text-4xl'>
          {copy.ctaTitle}
          <br />
          <span className='bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-rose-400'>
            {copy.ctaTitleAccent}
          </span>
        </h2>
        <p className='mx-auto mt-5 max-w-md text-sm leading-relaxed text-semi-color-text-2 md:text-base'>
          {copy.ctaDesc}
        </p>
        <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
          <Link to='/register'>
            <Button
              theme='solid'
              type='primary'
              size={isMobile ? 'default' : 'large'}
              className='!rounded-3xl border-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 px-8 shadow-lg shadow-indigo-500/30 hover:from-indigo-500 hover:via-violet-500 hover:to-teal-400'
              icon={<IconPlay />}
            >
              {copy.ctaPrimary}
            </Button>
          </Link>
          <Link to='/pricing'>
            <Button
              size={isMobile ? 'default' : 'large'}
              className='!rounded-3xl border border-violet-200/60 bg-white/80 px-6 !text-violet-700 shadow-sm hover:border-violet-300 hover:bg-violet-50/80 dark:border-violet-500/30 dark:bg-violet-500/10 dark:!text-violet-200 dark:hover:bg-violet-500/20'
            >
              {copy.ctaSecondary}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
