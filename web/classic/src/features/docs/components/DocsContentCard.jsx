/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Card } from '@douyinfe/semi-ui';

/**
 * Classic-style content panel: subtle indigo ring + Semi card (matches home CTA blocks).
 */
export default function DocsContentCard({
  children,
  className = '',
  bodyStyle,
  noPadding = false,
}) {
  return (
    <div
      className={`docs-content-card rounded-2xl bg-gradient-to-r from-indigo-500/20 via-violet-500/12 to-teal-500/18 p-px shadow-sm shadow-indigo-500/5 dark:shadow-black/20 ${className}`}
    >
      <Card
        className='!rounded-[15px] !border-0 !bg-[var(--semi-color-bg-0)] dark:!bg-[rgba(15,23,42,0.72)]'
        bodyStyle={
          noPadding
            ? { padding: 0, ...bodyStyle }
            : { padding: '20px 24px', ...bodyStyle }
        }
      >
        {children}
      </Card>
    </div>
  );
}
