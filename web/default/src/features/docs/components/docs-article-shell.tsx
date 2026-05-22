/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { PublicLayout } from '@/components/layout'
import type { DocsHeading } from '@/features/docs/guides/markdown-heading-outline'
import { DocsSiteFooter } from '@/features/docs/components/docs-site-footer'

export type DocsBreadcrumb = {
  label: string
  to?: string
}

type DocsArticleShellProps = {
  breadcrumbs: DocsBreadcrumb[]
  title: string
  subtitle?: string
  headings?: DocsHeading[]
  headerActions?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
}

export function DocsArticleShell(props: DocsArticleShellProps) {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string | undefined>(
    props.headings?.[0]?.id
  )

  useEffect(() => {
    if (!props.headings?.length) return
    const nodes = props.headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[]
    if (!nodes.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    nodes.forEach((n) => observer.observe(n))
    return () => observer.disconnect()
  }, [props.headings, props.title])

  return (
    <PublicLayout showMainContainer={false}>
      <div className='relative z-10 mx-auto w-full max-w-6xl flex-1 px-4 py-10 md:px-6 md:py-12'>
        <nav
          aria-label='Breadcrumb'
          className='text-muted-foreground mb-6 flex flex-wrap items-center gap-1.5 text-sm'
        >
          {props.breadcrumbs.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`} className='inline-flex items-center gap-1.5'>
              {i > 0 && <span className='text-muted-foreground/40'>/</span>}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className='hover:text-foreground inline-flex items-center gap-1 font-medium transition-colors'
                >
                  {i === 0 && <ArrowLeftIcon className='size-3.5' aria-hidden />}
                  {crumb.label}
                </Link>
              ) : (
                <span className='text-foreground font-medium'>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className='lg:grid lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_15rem] xl:gap-14'>
          <div className='min-w-0'>
            <header className='border-border mb-8 border-b pb-6'>
              <h1 className='text-2xl font-semibold tracking-tight md:text-3xl'>
                {props.title}
              </h1>
              {props.subtitle || props.headerActions ? (
                <div className='mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                  {props.subtitle ? (
                    <p className='text-muted-foreground max-w-2xl text-sm leading-relaxed md:text-[15px]'>
                      {props.subtitle}
                    </p>
                  ) : (
                    <span />
                  )}
                  {props.headerActions ? (
                    <div className='shrink-0'>{props.headerActions}</div>
                  ) : null}
                </div>
              ) : null}
            </header>

            <div className='docs-prose space-y-8'>{props.children}</div>

            {props.footer ? (
              <div className='border-border mt-10 border-t pt-6'>{props.footer}</div>
            ) : null}
          </div>

          {props.headings && props.headings.length > 0 ? (
            <aside className='hidden lg:block'>
              <div className='sticky top-24'>
                <p className='text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase'>
                  {t('docs.shell.onThisPage')}
                </p>
                <ul className='space-y-1 text-sm'>
                  {props.headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className={cn(
                          'hover:text-foreground block rounded-md py-1 transition-colors',
                          h.level === 3 && 'ps-3',
                          activeId === h.id
                            ? 'text-foreground bg-muted/60 font-medium'
                            : 'text-muted-foreground'
                        )}
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
      <DocsSiteFooter />
    </PublicLayout>
  )
}

export function DocsSection(props: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={props.id} className={cn('scroll-mt-24', props.className)}>
      <h2 className='text-foreground mb-4 text-lg font-semibold tracking-tight'>
        {props.title}
      </h2>
      {props.children}
    </section>
  )
}
