/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  ScrollList,
  ScrollItem,
  Tag,
} from '@douyinfe/semi-ui';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
  IconBolt,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getHomeCopy } from '../home-copy';
import HomeApiPanel from './HomeApiPanel';

export default function HomeHero({
  serverAddress,
  endpointItems,
  isMobile,
  isDemoSiteMode,
  statusState,
  docsLink,
  isChinese,
  onCopyBaseURL,
}) {
  const { t } = useTranslation();
  const copy = getHomeCopy(isChinese);
  const [endpointIndex, setEndpointIndex] = useState(0);
  const isLoggedIn = !!localStorage.getItem('user');

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  const currentUrl = `${serverAddress}${endpointItems[endpointIndex]?.value ?? ''}`;

  return (
    <div className='relative w-full overflow-x-hidden border-b border-semi-color-border bg-gradient-to-b from-[var(--semi-color-bg-0)] via-indigo-50/[0.35] to-teal-50/[0.25] dark:via-[rgba(99,102,241,0.06)] dark:to-[rgba(15,23,42,0.6)]'>
      <div className='blur-ball blur-ball-indigo' />
      <div className='blur-ball blur-ball-teal' />
      <div className='blur-ball blur-ball-violet' aria-hidden />
      <div className='pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.14] [background-image:linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:52px_52px]' />

      <div className='relative mx-auto flex w-full max-w-[1800px] flex-col px-4 pb-14 pt-10 sm:px-6 md:pb-16 md:pt-12 lg:min-h-[min(78vh,720px)] lg:justify-center lg:pb-20 lg:pt-16 xl:px-10 2xl:max-w-[1920px] 2xl:px-14'>
        <div className='flex w-full flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-14 2xl:gap-20'>
          <div className='flex min-w-0 flex-1 flex-col items-center text-center lg:items-start lg:text-left'>
            <Tag
              size='large'
              color='indigo'
              className='home-landing-badge mb-6 !rounded-full !px-4 !py-1.5'
              prefixIcon={<IconBolt />}
            >
              {copy.badge}
            </Tag>

            <h1
              className={`w-full text-4xl font-bold leading-[1.08] md:text-5xl lg:text-6xl 2xl:text-7xl ${isChinese ? 'tracking-wide md:tracking-wider' : ''}`}
            >
              <span className='hero-home-title-lead block max-w-4xl text-balance'>
                {t('统一的')}
              </span>
              <span className='hero-home-title-main mt-1 block max-w-4xl text-balance md:mt-2'>
                {t('大模型接口网关')}
              </span>
            </h1>

            <p className='mt-4 max-w-xl text-base text-semi-color-text-1 md:mt-6 md:text-lg lg:max-w-2xl xl:text-xl 2xl:leading-relaxed'>
              {t('更好的价格，更好的稳定性，只需要将模型基址替换为：')}
            </p>

            <div className='mx-auto mt-4 flex w-full max-w-xl flex-col items-stretch gap-3 md:mt-6 lg:mx-0 lg:max-w-2xl 2xl:max-w-3xl'>
              <div className='rounded-2xl bg-gradient-to-r from-indigo-500/25 via-violet-500/20 to-teal-500/25 p-[2px] shadow-lg shadow-indigo-500/10 dark:shadow-black/40'>
                <Input
                  readonly
                  value={currentUrl}
                  className='!rounded-[14px] !border-0 !bg-[var(--semi-color-bg-0)] dark:!bg-[rgba(15,23,42,0.85)]'
                  size={isMobile ? 'default' : 'large'}
                  suffix={
                    <div className='flex items-center gap-2'>
                      <ScrollList
                        bodyHeight={32}
                        style={{ border: 'unset', boxShadow: 'unset' }}
                      >
                        <ScrollItem
                          mode='wheel'
                          cycled
                          list={endpointItems}
                          selectedIndex={endpointIndex}
                          onSelect={({ index }) => setEndpointIndex(index)}
                        />
                      </ScrollList>
                      <Button
                        type='primary'
                        onClick={() => onCopyBaseURL(endpointIndex)}
                        icon={<IconCopy />}
                        className='!rounded-full'
                      />
                    </div>
                  }
                />
              </div>
            </div>

            <div className='mt-6 flex flex-row flex-wrap items-center justify-center gap-3 lg:mt-8 lg:justify-start'>
              {isLoggedIn ? (
                <Link to='/console'>
                  <Button
                    theme='solid'
                    type='primary'
                    size={isMobile ? 'default' : 'large'}
                    className='!rounded-3xl border-0 bg-gradient-to-r from-indigo-600 to-violet-600 px-8 shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 2xl:px-10'
                    icon={<IconPlay />}
                  >
                    {t('控制台')}
                  </Button>
                </Link>
              ) : (
                <Link to='/register'>
                  <Button
                    theme='solid'
                    type='primary'
                    size={isMobile ? 'default' : 'large'}
                    className='!rounded-3xl border-0 bg-gradient-to-r from-indigo-600 to-violet-600 px-8 shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-violet-500 2xl:px-10'
                    icon={<IconPlay />}
                  >
                    {copy.ctaPrimary}
                  </Button>
                </Link>
              )}
              <Link to='/pricing'>
                <Button
                  size={isMobile ? 'default' : 'large'}
                  className='!rounded-3xl px-6'
                >
                  {copy.ctaSecondary}
                </Button>
              </Link>
              <Link to='/docs'>
                <Button
                  size={isMobile ? 'default' : 'large'}
                  className='!rounded-3xl px-6'
                >
                  {copy.viewDocs}
                </Button>
              </Link>
              {isDemoSiteMode && statusState?.status?.version ? (
                <Button
                  size={isMobile ? 'default' : 'large'}
                  className='!rounded-3xl px-6'
                  icon={<IconGithubLogo />}
                  onClick={() =>
                    window.open('https://github.com/QuantumNous/new-api', '_blank')
                  }
                >
                  {statusState.status.version}
                </Button>
              ) : (
                docsLink && (
                  <Button
                    size={isMobile ? 'default' : 'large'}
                    className='!rounded-3xl px-6'
                    icon={<IconFile />}
                    onClick={() => window.open(docsLink, '_blank')}
                  >
                    {t('文档')}
                  </Button>
                )
              )}
            </div>
          </div>

          <HomeApiPanel serverAddress={serverAddress} isChinese={isChinese} />
        </div>
      </div>
    </div>
  );
}
