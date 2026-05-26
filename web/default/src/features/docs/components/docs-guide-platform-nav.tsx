/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { AppleIcon, MonitorIcon, TerminalIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import type { DocsHeading } from '@/features/docs/guides/markdown-heading-outline'

const PLATFORM_MATCHERS = [
  { key: 'windows' as const, test: /windows/i, icon: MonitorIcon },
  { key: 'macos' as const, test: /macos|mac\s*os/i, icon: AppleIcon },
  { key: 'linux' as const, test: /linux/i, icon: TerminalIcon },
]

export function DocsGuidePlatformNav(props: { headings: DocsHeading[] }) {
  const { t } = useTranslation()

  const platforms = PLATFORM_MATCHERS.map((p) => {
    const heading = props.headings.find((h) => h.level === 3 && p.test.test(h.text))
    if (!heading) return null
    return { ...p, id: heading.id, label: t(`docs.guide.platform.${p.key}`) }
  }).filter(Boolean) as {
    key: 'windows' | 'macos' | 'linux'
    id: string
    label: string
    icon: typeof MonitorIcon
  }[]

  if (platforms.length === 0) return null

  return (
    <nav
      aria-label={t('docs.guide.platform.navLabel')}
      className='not-prose border-border bg-muted/20 mb-8 flex flex-wrap gap-2 rounded-xl border p-2'
    >
      {platforms.map((p) => {
        const Icon = p.icon
        return (
          <a
            key={p.key}
            href={`#${p.id}`}
            className={cn(
              'text-foreground hover:bg-background inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              'border-border hover:border-border/80 border border-transparent hover:shadow-sm'
            )}
          >
            <Icon className='text-muted-foreground size-4' aria-hidden />
            {p.label}
          </a>
        )
      })}
    </nav>
  )
}
