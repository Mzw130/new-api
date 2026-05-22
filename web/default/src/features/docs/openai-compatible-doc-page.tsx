/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DocsArticleShell } from '@/features/docs/components/docs-article-shell'
import { DocsCopyForAiButton } from '@/features/docs/components/docs-copy-for-ai-button'
import { DocsMarkdown } from '@/features/docs/components/docs-markdown'
import { getOpenAiCompatibleMarkdown } from '@/features/docs/guides/integration-markdown'
import { extractMarkdownHeadings } from '@/features/docs/guides/markdown-heading-outline'

export function OpenAiCompatibleDocPage() {
  const { t, i18n } = useTranslation()
  const md = getOpenAiCompatibleMarkdown(i18n.language)
  const headings = extractMarkdownHeadings(md)
  const bodyMd = useMemo(() => md.replace(/^#[^\n]+\n+/, ''), [md])

  return (
    <DocsArticleShell
      breadcrumbs={[
        { label: t('docs.appsIndex.navDocs'), to: '/docs' },
        { label: t('docs.openai.pageTitle') },
      ]}
      title={t('docs.openai.pageTitle')}
      subtitle={t('docs.openai.pageSubtitle')}
      headings={headings}
      headerActions={<DocsCopyForAiButton content={md} />}
      footer={
        <div className='flex flex-wrap gap-3'>
          <Button variant='outline' size='sm' render={<Link to='/docs/apps' />}>
            {t('docs.home.agentCard.title')}
          </Button>
          <Button variant='outline' size='sm' render={<Link to='/keys' />}>
            {t('docs.integration.apiReference.keys')}
          </Button>
        </div>
      }
    >
      <Card>
        <CardContent className='docs-prose p-6 md:p-8'>
          <DocsMarkdown>{bodyMd}</DocsMarkdown>
        </CardContent>
      </Card>
    </DocsArticleShell>
  )
}
