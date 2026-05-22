/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { Markdown } from '@/components/ui/markdown'
import { cn } from '@/lib/utils'

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fff]+/gu, '-')
    .replace(/^-+|-+$/g, '')
}

function headingText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) {
    return children.map((c) => (typeof c === 'string' ? c : '')).join('')
  }
  return ''
}

export function DocsMarkdown(props: { children: string; className?: string }) {
  return (
    <Markdown
      components={{
        h2: ({ children }) => {
          const text = headingText(children)
          const id = slugifyHeading(text)
          return (
            <h2 id={id} className='text-foreground mb-3 text-lg font-semibold tracking-tight'>
              {children}
            </h2>
          )
        },
        h3: ({ children }) => {
          const text = headingText(children)
          const id = slugifyHeading(text)
          return (
            <h3 id={id} className='text-foreground mb-2 mt-4 text-base font-semibold'>
              {children}
            </h3>
          )
        },
        table: ({ children }) => (
          <div className='border-border my-4 overflow-hidden rounded-lg border'>
            <table className='w-full text-sm'>{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className='bg-muted/50 border-border border-b'>{children}</thead>
        ),
        th: ({ children }) => (
          <th className='text-muted-foreground px-4 py-2 text-start text-xs font-semibold uppercase'>
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className='text-muted-foreground border-border border-b px-4 py-2.5 last:border-b-0'>
            {children}
          </td>
        ),
      }}
      className={cn(
        'prose-sm max-w-none',
        'prose-headings:scroll-mt-24 prose-h2:mb-3 prose-h2:mt-0 prose-h2:text-lg prose-h2:font-semibold',
        'prose-h3:mb-2 prose-h3:mt-4 prose-h3:text-base',
        'prose-p:text-muted-foreground prose-p:text-sm prose-p:leading-relaxed',
        'prose-li:text-muted-foreground prose-li:text-sm',
        'prose-table:text-sm',
        props.className
      )}
    >
      {props.children}
    </Markdown>
  )
}
