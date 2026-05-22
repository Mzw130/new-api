/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, Bot, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { PublicLayout } from '@/components/layout'
import { DocsSiteFooter } from '@/features/docs/components/docs-site-footer'

type DocsHomeCardProps = {
  to: string
  icon: React.ReactNode
  iconClassName: string
  title: string
  description: string
  cta: string
}

function DocsHomeCard({
  to,
  icon,
  iconClassName,
  title,
  description,
  cta,
}: DocsHomeCardProps) {
  return (
    <Link to={to} className='group block h-full'>
      <Card className='h-full rounded-2xl border-border/80 shadow-sm transition-shadow hover:shadow-md'>
        <CardContent className='flex h-full flex-col p-6 md:p-7'>
          <div
            className={cn(
              'mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl',
              iconClassName,
            )}
          >
            {icon}
          </div>
          <h2 className='mb-2 text-left text-lg font-semibold tracking-tight'>
            {title}
          </h2>
          <p className='mb-6 flex-1 text-left text-sm leading-relaxed text-muted-foreground'>
            {description}
          </p>
          <span className='inline-flex items-center gap-1 text-sm font-medium text-primary'>
            {cta}
            <ArrowRight
              className='size-4 transition-transform group-hover:translate-x-0.5'
              aria-hidden
            />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}

export function DocsIndexPage() {
  const { t } = useTranslation()

  return (
    <PublicLayout showMainContainer={false}>
    <div className='relative mt-[60px] flex min-h-[calc(100vh-8rem)] w-full flex-col bg-background'>
      <div
        className='pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 to-transparent'
        aria-hidden
      />
      <div className='relative z-10 mx-auto flex flex-1 max-w-4xl flex-col items-center justify-center px-4 py-16 md:px-6 md:py-20'>
        <div className='flex w-full flex-col items-center text-center'>
          <span className='mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary'>
            <ShieldCheck className='size-3.5' aria-hidden />
            {t('docs.home.badge')}
          </span>

          <h1 className='mb-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl'>
            {t('docs.home.brand')}
            <br />
            <span className='text-primary'>{t('docs.home.titleDocs')}</span>
          </h1>

          <p className='mb-12 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base'>
            {t('docs.home.subtitle')}
          </p>

          <div className='grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2'>
            <DocsHomeCard
              to='/docs/apps'
              icon={<Bot className='size-5 text-primary' aria-hidden />}
              iconClassName='bg-primary/10'
              title={t('docs.home.agentCard.title')}
              description={t('docs.home.agentCard.description')}
              cta={t('docs.home.agentCard.cta')}
            />
            <DocsHomeCard
              to='/docs/api'
              icon={<BookOpen className='size-5 text-primary-foreground' aria-hidden />}
              iconClassName='bg-primary text-primary-foreground'
              title={t('docs.home.apiCard.title')}
              description={t('docs.home.apiCard.description')}
              cta={t('docs.home.apiCard.cta')}
            />
          </div>
        </div>
      </div>
      <DocsSiteFooter />
    </div>
    </PublicLayout>
  )
}
