/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowLeft } from '@douyinfe/semi-icons';
import { Anchor, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import DocsPublicLayout from './DocsPublicLayout';
import DocsSiteFooter from './DocsSiteFooter';

const { Title, Text } = Typography;

const breadcrumbLinkClass =
  'inline-flex items-center gap-1 font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200';

export function DocsSection({ id, title, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-28 ${className}`}>
      <Title
        heading={4}
        className='!mb-4 !border-l-4 !border-indigo-500/70 !pl-3 !text-semi-color-text-0'
      >
        {title}
      </Title>
      {children}
    </section>
  );
}

export default function DocsArticleShell({
  breadcrumbs,
  title,
  subtitle,
  headings,
  headerActions,
  children,
  footer,
}) {
  const { t } = useTranslation();

  return (
    <DocsPublicLayout>
      <div className='mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10'>
        <nav
          aria-label='Breadcrumb'
          className='mb-6 flex flex-wrap items-center gap-1.5 text-sm'
        >
          {breadcrumbs.map((crumb, i) => (
            <span
              key={`${crumb.label}-${i}`}
              className='inline-flex items-center gap-1.5'
            >
              {i > 0 ? (
                <span className='text-semi-color-text-2 opacity-50'>/</span>
              ) : null}
              {crumb.to ? (
                <Link to={crumb.to} className={breadcrumbLinkClass}>
                  {i === 0 ? <IconArrowLeft size='small' aria-hidden /> : null}
                  {crumb.label}
                </Link>
              ) : (
                <span className='font-medium text-semi-color-text-0'>
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        <div className='lg:grid lg:grid-cols-[minmax(0,1fr)_11.5rem] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_13rem] xl:gap-10'>
          <div className='min-w-0'>
            <header className='docs-page-header mb-8 border-b border-indigo-100/60 pb-6 dark:border-indigo-500/20'>
              <Title heading={2} className='!mb-0 !text-semi-color-text-0 md:!text-3xl'>
                {title}
              </Title>
              {subtitle || headerActions ? (
                <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                  {subtitle ? (
                    <Text
                      type='secondary'
                      className='max-w-2xl text-sm leading-relaxed md:text-[15px]'
                    >
                      {subtitle}
                    </Text>
                  ) : (
                    <span />
                  )}
                  {headerActions ? (
                    <div className='shrink-0'>{headerActions}</div>
                  ) : null}
                </div>
              ) : null}
            </header>

            <div className='docs-page-body space-y-8'>{children}</div>

            {footer ? (
              <div className='docs-page-footer mt-10 border-t border-indigo-100/50 pt-6 dark:border-indigo-500/15'>
                {footer}
              </div>
            ) : null}
          </div>

          {headings?.length > 0 ? (
            <aside className='hidden lg:block'>
              <div className='docs-toc-panel sticky top-24 rounded-2xl border border-indigo-100/70 bg-[var(--semi-color-bg-0)]/90 p-4 shadow-sm ring-1 ring-indigo-400/15 backdrop-blur-sm dark:border-indigo-500/25 dark:bg-[rgba(15,23,42,0.65)]'>
                <Text
                  type='tertiary'
                  size='small'
                  strong
                  className='mb-3 block text-xs font-semibold tracking-wide text-indigo-600/90 dark:text-indigo-300/90'
                >
                  {t('docs.shell.onThisPage')}
                </Text>
                <Anchor railTheme targetOffset={96} scrollMotion>
                  {headings.map((h) => (
                    <Anchor.Link
                      key={h.id}
                      href={`#${h.id}`}
                      title={h.text}
                      style={h.level === 3 ? { paddingLeft: 12 } : undefined}
                    />
                  ))}
                </Anchor>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
      <DocsSiteFooter />
    </DocsPublicLayout>
  );
}
