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
import { DocsGuidePlatformNav } from '@/features/docs/components/docs-guide-platform-nav'
import { DOCS_BRAND } from '@/features/docs/guides/docs-brand'
import { getClaudeCodeGuideMarkdown } from '@/features/docs/guides/claude-code-guide-markdown'
import { extractMarkdownHeadings } from '@/features/docs/guides/markdown-heading-outline'

const OFFICIAL_URL = 'https://www.anthropic.com/claude-code'

export function ClaudeCodeGuideView() {
  const { t, i18n } = useTranslation()
  const md = getClaudeCodeGuideMarkdown(i18n.language)
  const headings = extractMarkdownHeadings(md)
  const title = t('docs.integration.apps.claudeCode.title')
  const subtitle = t('docs.integration.apps.claudeCode.guideSubtitle')

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
      <a
        href={OFFICIAL_URL}
        target='_blank'
        rel='noopener noreferrer'
        className='text-muted-foreground hover:text-foreground -mt-2 mb-2 inline-flex items-center gap-1.5 text-sm transition-colors'
      >
        {t('docs.claudeCode.officialLink')}
        <ExternalLinkIcon className='size-3.5' aria-hidden />
      </a>

      <DocsGuidePlatformNav headings={headings} />
      <DocsGuideMarkdown>{md}</DocsGuideMarkdown>
    </DocsArticleShell>
  )
}
