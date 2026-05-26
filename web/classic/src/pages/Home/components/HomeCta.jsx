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
    <section className='home-landing-section home-cta-section relative overflow-hidden px-4 py-20 md:px-6 md:py-28'>
      <div className='home-cta-mesh pointer-events-none absolute inset-0 opacity-25 dark:opacity-[0.12]' aria-hidden />
      <div className='relative mx-auto max-w-2xl text-center'>
        <h2 className='text-2xl font-bold leading-tight tracking-tight md:text-4xl'>
          {copy.ctaTitle}
          <br />
          <span className='bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-600 bg-clip-text text-transparent dark:from-indigo-400 dark:via-violet-400 dark:to-teal-400'>
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
              className='!rounded-3xl border-0 bg-gradient-to-r from-indigo-600 to-violet-600 px-8 shadow-lg shadow-indigo-500/25'
              icon={<IconPlay />}
            >
              {copy.ctaPrimary}
            </Button>
          </Link>
          <Link to='/pricing'>
            <Button size={isMobile ? 'default' : 'large'} className='!rounded-3xl px-6'>
              {copy.ctaSecondary}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
