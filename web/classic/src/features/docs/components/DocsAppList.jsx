/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { IconChevronRight } from '@douyinfe/semi-icons';
import { Card, Typography } from '@douyinfe/semi-ui';

const { Text, Title } = Typography;

export function DocsAppListItem({ slug, title, description, className = '' }) {
  return (
    <Link
      to={`/docs/apps/${slug}`}
      className={`group block h-full no-underline ${className}`}
    >
      <div className='h-full rounded-xl bg-gradient-to-r from-indigo-500/15 via-violet-500/8 to-teal-500/12 p-px transition-all duration-200 hover:from-indigo-500/28 hover:shadow-md hover:shadow-indigo-500/10'>
        <Card
          shadows='hover'
          className='docs-app-card h-full !rounded-[11px] !border-0 !bg-[var(--semi-color-bg-0)] dark:!bg-[rgba(15,23,42,0.75)]'
          bodyStyle={{ padding: '16px 18px' }}
        >
          <div className='flex h-full items-start gap-3'>
            <div className='min-w-0 flex-1'>
              <Title
                heading={6}
                className='!mb-1 !text-semi-color-text-0 group-hover:!text-indigo-600 dark:group-hover:!text-indigo-300'
              >
                {title}
              </Title>
              <Text
                type='secondary'
                className='line-clamp-3 text-sm leading-relaxed'
              >
                {description}
              </Text>
            </div>
            <IconChevronRight
              className='mt-0.5 shrink-0 text-semi-color-text-2 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
              aria-hidden
            />
          </div>
        </Card>
      </div>
    </Link>
  );
}

export function DocsThreeFieldBox({ title, items }) {
  return (
    <div className='rounded-2xl bg-gradient-to-r from-indigo-500/18 via-violet-500/10 to-teal-500/15 p-px shadow-sm'>
      <Card
        className='!rounded-[15px] !border-0 !bg-[var(--semi-color-bg-0)] dark:!bg-[rgba(15,23,42,0.72)]'
        bodyStyle={{ padding: '16px 20px' }}
      >
        <Text strong className='!mb-3 block text-sm text-semi-color-text-0'>
          {title}
        </Text>
        <ol className='m-0 list-none space-y-3 p-0'>
          {items.map((item, i) => (
            <li
              key={item.label}
              className='border-b border-indigo-100/50 pb-3 last:border-0 last:pb-0 dark:border-indigo-500/15'
            >
              <Text strong className='text-sm text-indigo-700/90 dark:text-indigo-300/90'>
                {i + 1}. {item.label}
              </Text>
              <Text type='secondary' className='mt-1 block text-sm leading-relaxed'>
                {item.body}
              </Text>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
