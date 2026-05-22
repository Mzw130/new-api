/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { getLogo } from '../../../helpers';

const { Title, Paragraph, Text } = Typography;

const NAV_ITEMS = [
  { labelKey: 'docs.footer.nav.home', to: '/' },
  { labelKey: 'docs.footer.nav.console', to: '/console' },
  { labelKey: 'docs.footer.nav.faq', to: '/about' },
  { labelKey: 'docs.footer.nav.pricing', to: '/pricing' },
  { labelKey: 'docs.footer.nav.docs', to: '/docs' },
];

export default function DocsSiteFooter() {
  const { t } = useTranslation();
  const logo = getLogo();
  const brand = t('docs.home.brand');
  const currentYear = new Date().getFullYear();

  return (
    <footer className='docs-site-footer w-full border-t border-indigo-100/50 bg-gradient-to-b from-transparent to-indigo-50/[0.35] dark:border-white/[0.06] dark:to-indigo-950/25'>
      <div className='mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14'>
        <div className='flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16'>
          <div className='max-w-md shrink-0'>
            <Link
              to='/'
              className='inline-flex items-center gap-2.5 no-underline transition-opacity hover:opacity-90'
            >
              <img
                src={logo}
                alt={brand}
                className='h-9 w-9 rounded-lg object-contain ring-1 ring-indigo-400/20'
              />
              <span className='text-base font-semibold text-semi-color-text-0'>
                {brand}
              </span>
            </Link>
            <Paragraph
              type='secondary'
              className='!mt-3 !mb-0 max-w-sm text-sm leading-relaxed'
            >
              {t('docs.footer.tagline')}
            </Paragraph>
          </div>

          <div className='md:min-w-[140px]'>
            <Title heading={6} className='!mb-4 !text-semi-color-text-0'>
              {t('docs.footer.navTitle')}
            </Title>
            <nav className='flex flex-col gap-3' aria-label={t('docs.footer.navTitle')}>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className='text-sm text-semi-color-text-1 no-underline transition-colors hover:text-indigo-600 dark:hover:text-indigo-300'
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Divider margin='24px' className='!border-indigo-100/60 dark:!border-indigo-500/20' />

        <Text type='tertiary' size='small' className='block text-center md:text-left'>
          © {currentYear} {brand}. {t('版权所有')}
        </Text>
      </div>
    </footer>
  );
}
