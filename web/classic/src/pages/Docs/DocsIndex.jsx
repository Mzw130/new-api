/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconBookStroked,
  IconChevronRight,
  IconDesktop,
  IconVerify,
} from '@douyinfe/semi-icons';
import { Card, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import DocsPublicLayout from '../../features/docs/components/DocsPublicLayout';
import DocsSiteFooter from '../../features/docs/components/DocsSiteFooter';

const { Title, Text, Paragraph } = Typography;

function DocsHomeCard({
  icon,
  iconWrapClass,
  title,
  description,
  cta,
  onClick,
}) {
  return (
    <div
      role='link'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className='docs-home-card group cursor-pointer rounded-2xl bg-gradient-to-r from-indigo-500/22 via-violet-500/14 to-teal-500/20 p-px shadow-md shadow-indigo-500/8 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/15 dark:shadow-black/30'
    >
      <Card
        className='h-full !cursor-pointer !rounded-[15px] !border-0 !bg-[var(--semi-color-bg-0)] dark:!bg-[rgba(15,23,42,0.78)]'
        bodyStyle={{ padding: '24px 28px' }}
      >
        <div
          className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ring-1 ring-indigo-400/20 ${iconWrapClass}`}
        >
          {icon}
        </div>
        <Title heading={4} className='!mb-2 !text-left !text-semi-color-text-0'>
          {title}
        </Title>
        <Paragraph
          type='secondary'
          className='!mb-6 !text-left text-sm leading-relaxed'
        >
          {description}
        </Paragraph>
        <span className='inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition-colors group-hover:text-indigo-700 dark:text-indigo-300 dark:group-hover:text-indigo-200'>
          {cta}
          <IconChevronRight
            size='small'
            className='transition-transform group-hover:translate-x-0.5'
            aria-hidden
          />
        </span>
      </Card>
    </div>
  );
}

export default function DocsIndexPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <DocsPublicLayout className='docs-home'>
      <div className='mx-auto flex flex-1 max-w-4xl flex-col items-center justify-center px-4 py-16 md:px-6 md:py-20'>
        <div className='flex w-full flex-col items-center text-center'>
          <span className='mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/90 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 ring-1 ring-indigo-400/25 dark:border-indigo-500/30 dark:bg-indigo-950/40 dark:text-indigo-200'>
            <IconVerify size='small' aria-hidden />
            {t('docs.home.badge')}
          </span>

          <h1 className='mb-4 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl'>
            <span className='hero-home-title-lead block'>{t('docs.home.brand')}</span>
            <span className='hero-home-title-main mt-1 block md:mt-2'>
              {t('docs.home.titleDocs')}
            </span>
          </h1>

          <Text
            type='secondary'
            className='mb-12 max-w-lg text-base leading-relaxed text-semi-color-text-1'
          >
            {t('docs.home.subtitle')}
          </Text>

          <div className='grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2'>
            <DocsHomeCard
              icon={<IconDesktop size='large' className='text-indigo-600 dark:text-indigo-300' />}
              iconWrapClass='bg-indigo-500/10'
              title={t('docs.home.agentCard.title')}
              description={t('docs.home.agentCard.description')}
              cta={t('docs.home.agentCard.cta')}
              onClick={() => navigate('/docs/apps')}
            />
            <DocsHomeCard
              icon={<IconBookStroked size='large' className='text-white' />}
              iconWrapClass='bg-gradient-to-br from-indigo-500 to-violet-600'
              title={t('docs.home.apiCard.title')}
              description={t('docs.home.apiCard.description')}
              cta={t('docs.home.apiCard.cta')}
              onClick={() => navigate('/docs/api')}
            />
          </div>
        </div>
      </div>
      <DocsSiteFooter />
    </DocsPublicLayout>
  );
}
