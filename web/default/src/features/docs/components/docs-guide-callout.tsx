/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { AlertTriangleIcon, InfoIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DocsGuideCallout(props: {
  children: React.ReactNode
  variant?: 'note' | 'warning'
}) {
  const variant = props.variant ?? 'note'
  const Icon = variant === 'warning' ? AlertTriangleIcon : InfoIcon

  return (
    <div
      className={cn(
        'not-prose my-5 flex gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed',
        variant === 'warning'
          ? 'border-amber-500/30 bg-amber-500/8 text-foreground'
          : 'border-border bg-muted/30 text-muted-foreground'
      )}
    >
      <Icon
        className={cn(
          'mt-0.5 size-4 shrink-0',
          variant === 'warning' ? 'text-amber-600 dark:text-amber-400' : 'text-primary'
        )}
        aria-hidden
      />
      <div className='min-w-0 [&_p]:m-0'>{props.children}</div>
    </div>
  )
}
