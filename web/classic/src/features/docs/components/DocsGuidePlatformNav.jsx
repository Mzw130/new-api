/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Apple, Monitor, Terminal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const PLATFORM_MATCHERS = [
  { key: 'windows', test: /windows/i, Icon: Monitor },
  { key: 'macos', test: /macos|mac\s*os/i, Icon: Apple },
  { key: 'linux', test: /linux/i, Icon: Terminal },
];

export default function DocsGuidePlatformNav({ headings }) {
  const { t } = useTranslation();

  const platforms = PLATFORM_MATCHERS.map((p) => {
    const heading = headings.find((h) => h.level === 3 && p.test.test(h.text));
    if (!heading) return null;
    return { ...p, id: heading.id, label: t(`docs.guide.platform.${p.key}`) };
  }).filter(Boolean);

  if (platforms.length === 0) return null;

  return (
    <nav
      aria-label={t('docs.guide.platform.navLabel')}
      className='docs-platform-nav not-prose mb-8 flex flex-wrap gap-2 rounded-xl border border-indigo-200/60 bg-indigo-50/40 p-2 dark:border-indigo-500/25 dark:bg-indigo-950/25'
    >
      {platforms.map((p) => {
        const Icon = p.Icon;
        return (
          <a
            key={p.key}
            href={`#${p.id}`}
            className='docs-platform-nav-link inline-flex items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-semi-color-text-0 transition-colors hover:border-indigo-200/80 hover:bg-white hover:shadow-sm dark:hover:border-indigo-500/30 dark:hover:bg-slate-900/80'
          >
            <Icon className='size-4 text-semi-color-text-2' aria-hidden />
            {p.label}
          </a>
        );
      })}
    </nav>
  );
}
