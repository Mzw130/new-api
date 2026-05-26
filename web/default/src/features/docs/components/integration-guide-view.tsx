/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import {
  DocsArticleShell,
  DocsSection,
} from '@/features/docs/components/docs-article-shell'
import { DocsParamTable } from '@/features/docs/components/docs-param-table'
import {
  INTEGRATION_GUIDE_CONTENT,
  pickGuideLang,
  tGuide,
  type IntegrationGuideContent,
} from '@/features/docs/guides/integration-guide-content'
import { getIntegrationMarkdown } from '@/features/docs/guides/integration-markdown'
import { DocsCopyForAiButton } from '@/features/docs/components/docs-copy-for-ai-button'
import { DocsStepFigure } from '@/features/docs/components/docs-step-figure'
import { DOCS_BRAND } from '@/features/docs/guides/docs-brand'
import type { IntegrationSlug } from '@/features/docs/guides/integration-types'

function GuideBody(props: {
  guide: IntegrationGuideContent
  lang: ReturnType<typeof pickGuideLang>
}) {
  const { guide, lang } = props

  return (
    <>
      {guide.officialUrl ? (
        <p className='text-muted-foreground -mt-2 mb-6 text-sm'>
          <a
            href={guide.officialUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary inline-flex items-center gap-1 hover:underline'
          >
            {guide.officialLabel ? tGuide(guide.officialLabel, lang) : guide.officialUrl}
            <ExternalLinkIcon className='size-3.5' aria-hidden />
          </a>
        </p>
      ) : null}

      {guide.sections.map((section) => (
        <DocsSection
          key={section.id}
          id={section.id}
          title={tGuide(section.title, lang)}
        >
          {section.params ? (
            <DocsParamTable
              rows={section.params.map((row) => {
                const val = tGuide(row.value, lang)
                const isMono =
                  val.startsWith('http') ||
                  val.includes('/') ||
                  val.startsWith('Authorization')
                return {
                  field: tGuide(row.field, lang),
                  value: isMono ? (
                    <code className='bg-muted rounded px-1.5 py-0.5 font-mono text-[13px]'>
                      {val}
                    </code>
                  ) : (
                    <span>{val}</span>
                  ),
                  hint: row.hint ? tGuide(row.hint, lang) : undefined,
                }
              })}
            />
          ) : null}

          {section.steps ? (
            <ol className='border-border divide-border divide-y rounded-lg border'>
              {section.steps.map((step, i) => {
                const figures =
                  section.stepFigures?.filter((f) => f.afterStepIndex === i) ?? []
                return (
                  <li key={i} className='text-foreground px-4 py-3 text-sm leading-relaxed'>
                    <div className='flex gap-3'>
                      <span className='text-muted-foreground w-5 shrink-0 tabular-nums font-medium'>
                        {i + 1}.
                      </span>
                      <div className='min-w-0 flex-1'>
                        <span className='whitespace-pre-line'>{tGuide(step, lang)}</span>
                        {figures.map((fig) => (
                          <DocsStepFigure
                            key={fig.src}
                            src={fig.src}
                            alt={tGuide(fig.alt, lang)}
                          />
                        ))}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          ) : null}

          {section.bullets ? (
            <ul className='border-border bg-muted/15 space-y-2 rounded-lg border px-4 py-3 text-sm'>
              {section.bullets.map((b, i) => (
                <li key={i} className='text-muted-foreground flex gap-2 leading-relaxed'>
                  <span className='text-foreground shrink-0 font-medium'>•</span>
                  <span>{tGuide(b, lang)}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </DocsSection>
      ))}
    </>
  )
}

export function IntegrationGuideView(props: { slug: IntegrationSlug; title: string }) {
  const { t, i18n } = useTranslation()
  const lang = pickGuideLang(i18n.language)
  const guide = INTEGRATION_GUIDE_CONTENT[props.slug]
  const copyMd = getIntegrationMarkdown(props.slug, i18n.language)
  const headings = guide.sections.map((s) => ({
    id: s.id,
    text: tGuide(s.title, lang),
    level: 2 as const,
  }))

  return (
    <DocsArticleShell
      breadcrumbs={[
        { label: t('docs.appsIndex.navDocs'), to: '/docs' },
        { label: t('docs.appsIndex.navApps'), to: '/docs/apps' },
        { label: props.title },
      ]}
      title={props.title}
      subtitle={`${DOCS_BRAND} · ${tGuide(guide.subtitle, lang)}`}
      headings={headings}
      headerActions={<DocsCopyForAiButton content={copyMd} />}
      footer={
        <div className='flex flex-wrap gap-3'>
          <Button variant='outline' size='sm' render={<Link to='/docs/apps' />}>
            {t('docs.appsIndex.backToList')}
          </Button>
          <Button variant='outline' size='sm' render={<Link to='/keys' />}>
            {t('docs.integration.apiReference.keys')}
          </Button>
          <Button
            variant='ghost'
            size='sm'
            render={<Link to='/docs/api' />}
          >
            {t('docs.integration.apiReference.handbook')}
          </Button>
        </div>
      }
    >
      <GuideBody guide={guide} lang={lang} />
    </DocsArticleShell>
  )
}
