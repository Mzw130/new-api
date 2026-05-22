/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';

/**
 * Shared public-page chrome for /docs — matches Home banner gradients & grid.
 */
export default function DocsPublicLayout({ children, className = '' }) {
  return (
    <div
      className={`docs-page-shell relative mt-[60px] flex min-h-[calc(100vh-8rem)] w-full flex-col overflow-x-hidden border-b border-semi-color-border bg-gradient-to-b from-[var(--semi-color-bg-0)] via-indigo-50/[0.35] to-teal-50/[0.25] dark:via-[rgba(99,102,241,0.06)] dark:to-[rgba(15,23,42,0.6)] ${className}`}
    >
      <div className='blur-ball blur-ball-indigo docs-page-blur docs-page-blur-indigo' aria-hidden />
      <div className='blur-ball blur-ball-teal docs-page-blur docs-page-blur-teal' aria-hidden />
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12] [background-image:linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:52px_52px]'
        aria-hidden
      />
      <div className='relative z-10 flex flex-1 flex-col'>{children}</div>
    </div>
  );
}
