/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { Link } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { DocsArticleShell } from '@/features/docs/components/docs-article-shell'
import { DocsCopyForAiButton } from '@/features/docs/components/docs-copy-for-ai-button'
import { DocsGuideMarkdown } from '@/features/docs/components/docs-guide-markdown'
import { DOCS_BRAND } from '@/features/docs/guides/docs-brand'
import { getCursorGuideMarkdown } from '@/features/docs/guides/cursor-guide-markdown'
import { extractMarkdownHeadings } from '@/features/docs/guides/markdown-heading-outline'

const CURSOR_DOWNLOAD = 'https://cursor.com/download'
const CURSOR_DOCS = 'https://cursor.com/docs'

export function CursorGuideView() {
  const { t, i18n } = useTranslation()
  const md = getCursorGuideMarkdown(i18n.language)
  const headings = extractMarkdownHeadings(md)
  const title = t('docs.integration.apps.cursor.title')
  const subtitle = t('docs.integration.apps.cursor.guideSubtitle')

  return (
    <DocsArticleShell
      breadcrumbs={[
        { label: t('docs.appsIndex.navDocs'), to: '/docs' },
        { label: t('docs.appsIndex.navApps'), to: '/docs/apps' },
        { label: title },
      ]}
      title={title}
      subtitle={`${DOCS_BRAND} · ${subtitle}`}
      headings={headings}
      headerActions={<DocsCopyForAiButton content={md} />}
      footer={
        <div className='flex flex-wrap gap-3'>
          <Button variant='outline' size='sm' render={<Link to='/docs/apps' />}>
            {t('docs.appsIndex.backToList')}
          </Button>
          <Button variant='outline' size='sm' render={<Link to='/keys' />}>
            {t('docs.integration.apiReference.keys')}
          </Button>
        </div>
      }
    >
      <div className='text-muted-foreground -mt-2 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm'>
        <a
          href={CURSOR_DOWNLOAD}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-foreground inline-flex items-center gap-1.5 transition-colors'
        >
          {t('docs.cursor.downloadLink')}
          <ExternalLinkIcon className='size-3.5' aria-hidden />
        </a>
        <a
          href={CURSOR_DOCS}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-foreground inline-flex items-center gap-1.5 transition-colors'
        >
          {t('docs.cursor.docsLink')}
          <ExternalLinkIcon className='size-3.5' aria-hidden />
        </a>
      </div>

      <DocsGuideMarkdown>{md}</DocsGuideMarkdown>
    </DocsArticleShell>
  )
}
