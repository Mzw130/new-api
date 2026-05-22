/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { Link } from '@tanstack/react-router'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { IntegrationSlug } from '@/features/docs/guides/integration-types'

export function DocsAppListItem(props: {
  slug: IntegrationSlug
  title: string
  description: string
  className?: string
}) {
  return (
    <Link
      to='/docs/apps/$slug'
      params={{ slug: props.slug }}
      className={cn(
        'border-border bg-card hover:border-primary/30 hover:bg-muted/30 group flex items-start gap-4 rounded-lg border px-4 py-3.5 transition-colors',
        props.className
      )}
    >
      <div className='min-w-0 flex-1'>
        <p className='text-foreground group-hover:text-primary text-[15px] font-semibold transition-colors'>
          {props.title}
        </p>
        <p className='text-muted-foreground mt-1 line-clamp-2 text-sm leading-snug'>
          {props.description}
        </p>
      </div>
      <ChevronRightIcon
        className='text-muted-foreground group-hover:text-primary mt-0.5 size-4 shrink-0 opacity-60 transition-colors'
        aria-hidden
      />
    </Link>
  )
}

export function DocsThreeFieldBox(props: {
  title: string
  items: { label: string; body: string }[]
}) {
  return (
    <div className='border-border bg-muted/20 rounded-lg border px-4 py-4 md:px-5'>
      <p className='text-foreground mb-3 text-sm font-semibold'>{props.title}</p>
      <ol className='space-y-2.5'>
        {props.items.map((item, i) => (
          <li key={item.label} className='flex gap-3 text-sm leading-relaxed'>
            <span className='bg-primary/10 text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold'>
              {i + 1}
            </span>
            <span>
              <span className='text-foreground font-medium'>{item.label}</span>
              <span className='text-muted-foreground'> — {item.body}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
