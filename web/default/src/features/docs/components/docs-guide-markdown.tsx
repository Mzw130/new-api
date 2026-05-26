/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { Link } from '@tanstack/react-router'
import type { Components } from 'react-markdown'
import { Markdown } from '@/components/ui/markdown'
import { DocsGuideCallout } from '@/features/docs/components/docs-guide-callout'
import { DocsGuideHero } from '@/features/docs/components/docs-guide-hero'
import { DocsStepFigure } from '@/features/docs/components/docs-step-figure'
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

function isCalloutQuote(text: string): boolean {
  return (
    text.includes('注意') ||
    text.includes('Note:') ||
    text.includes('After setting') ||
    text.includes('All models route') ||
    text.includes('Cursor Pro') ||
    text.includes('free plan')
  )
}

function isIntroQuote(text: string): boolean {
  return (
    text.includes('教程') ||
    text.includes('Connect Anthropic') ||
    text.includes('CC Switch') ||
    text.includes('cross-platform AI CLI')
  )
}

function stepMeta(text: string): { index: string; title: string } | null {
  const m = /^(\d+)\.\s*(.+)$/.exec(text.trim())
  if (!m) return null
  return { index: m[1], title: m[2] }
}

const guideComponents: Components = {
  div: ({ className, children, ...rest }) => {
    if (className?.includes('docs-platform-card')) {
      return (
        <section
          className={cn(
            'docs-platform-card border-border scroll-mt-24 overflow-hidden rounded-xl border shadow-sm',
            className
          )}
          {...rest}
        >
          {children}
        </section>
      )
    }
    if (className?.includes('docs-platform-body')) {
      return <div className={cn('docs-platform-body', className)}>{children}</div>
    }
    if (className?.includes('docs-figure-grid')) {
      return <div className={cn('docs-figure-grid not-prose', className)}>{children}</div>
    }
    return (
      <div className={className} {...rest}>
        {children}
      </div>
    )
  },
  blockquote: ({ children }) => {
    const text = headingText(children)
    if (isIntroQuote(text)) {
      return <DocsGuideHero>{children}</DocsGuideHero>
    }
    if (isCalloutQuote(text)) {
      return <DocsGuideCallout variant='warning'>{children}</DocsGuideCallout>
    }
    return <DocsGuideCallout>{children}</DocsGuideCallout>
  },
  h2: ({ children }) => {
    const text = headingText(children)
    const id = slugifyHeading(text)
    return (
      <h2
        id={id}
        className='text-foreground border-border scroll-mt-24 mb-4 border-t pt-10 text-lg font-semibold tracking-tight first:border-t-0 first:pt-0'
      >
        {children}
      </h2>
    )
  },
  h3: ({ children }) => {
    const text = headingText(children)
    const id = slugifyHeading(text)
    return (
      <h3
        id={id}
        className='text-foreground border-border bg-muted/30 mb-0 flex items-center gap-2 border-b px-4 py-3.5 text-base font-semibold md:px-5'
      >
        {children}
      </h3>
    )
  },
  h4: ({ children }) => {
    const text = headingText(children)
    const step = stepMeta(text)
    const id = slugifyHeading(text)
    if (step) {
      return (
        <h4
          id={id}
          className='text-foreground mt-6 mb-3 flex scroll-mt-24 items-start gap-3 text-sm font-semibold md:text-[15px]'
        >
          <span className='bg-primary/10 text-primary flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular-nums'>
            {step.index}
          </span>
          <span className='pt-0.5 leading-snug'>{step.title}</span>
        </h4>
      )
    }
    return (
      <h4 id={id} className='text-foreground mt-5 mb-2 scroll-mt-24 text-sm font-semibold'>
        {children}
      </h4>
    )
  },
  p: ({ children }) => (
    <p className='text-muted-foreground my-2.5 text-sm leading-relaxed last:mb-0'>{children}</p>
  ),
  strong: ({ children }) => (
    <strong className='text-foreground font-semibold'>{children}</strong>
  ),
  ul: ({ children }) => (
    <ul className='text-muted-foreground my-3 list-disc space-y-1.5 ps-5 text-sm leading-relaxed'>
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className='text-muted-foreground my-3 list-decimal space-y-1.5 ps-5 text-sm leading-relaxed'>
      {children}
    </ol>
  ),
  pre: ({ children }) => (
    <pre className='border-border bg-muted/40 text-foreground my-4 overflow-x-auto rounded-lg border p-4 text-[13px] leading-relaxed'>
      {children}
    </pre>
  ),
  code: ({ className, children, ...rest }) => {
    const isBlock = Boolean(className)
    if (isBlock) {
      return (
        <code className={cn('font-mono text-[13px]', className)} {...rest}>
          {children}
        </code>
      )
    }
    return (
      <code
        className='bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[12px]'
        {...rest}
      >
        {children}
      </code>
    )
  },
  table: ({ children }) => (
    <div className='border-border my-5 overflow-hidden rounded-xl border shadow-sm'>
      <table className='w-full text-sm'>{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className='bg-muted/60 border-border border-b'>{children}</thead>
  ),
  th: ({ children }) => (
    <th className='text-foreground px-4 py-3 text-start text-xs font-semibold tracking-wide'>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className='text-muted-foreground border-border border-b px-4 py-3 align-top last:border-b-0'>
      {children}
    </td>
  ),
  tr: ({ children }) => <tr className='even:bg-muted/15'>{children}</tr>,
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null
    return <DocsStepFigure src={src} alt={alt ?? ''} />
  },
  a: ({ href, children, className }) => {
    if (href?.startsWith('/')) {
      return (
        <Link
          to={href}
          className={cn('text-primary font-medium hover:underline', className)}
        >
          {children}
        </Link>
      )
    }
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className={cn('text-primary font-medium hover:underline', className)}
      >
        {children}
      </a>
    )
  },
}

export function DocsGuideMarkdown(props: { children: string; className?: string }) {
  return (
    <Markdown
      components={guideComponents}
      className={cn('docs-guide-prose max-w-none', props.className)}
    >
      {props.children}
    </Markdown>
  )
}
