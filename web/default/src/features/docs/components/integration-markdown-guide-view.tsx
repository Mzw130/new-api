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
import { getIntegrationGuideMarkdown } from '@/features/docs/guides/integration-guide-markdown'
import type { IntegrationSlug } from '@/features/docs/guides/integration-types'
import { SLUG_APP_I18N_KEY } from '@/features/docs/guides/integration-types'
import { extractMarkdownHeadings } from '@/features/docs/guides/markdown-heading-outline'

export type GuideExternalLink = { labelKey: string; href: string }

const GUIDE_LINKS: Partial<Record<IntegrationSlug, GuideExternalLink[]>> = {
  'codex-cli': [
    { labelKey: 'docs.codex.officialLink', href: 'https://chatgpt.com/codex' },
    { labelKey: 'docs.codex.githubLink', href: 'https://github.com/openai/codex' },
  ],
  openclaw: [
    { labelKey: 'docs.openclaw.githubLink', href: 'https://github.com/openclaw/openclaw' },
    { labelKey: 'docs.openclaw.docsLink', href: 'https://docs.openclaw.ai' },
  ],
  opencode: [
    { labelKey: 'docs.opencode.docsLink', href: 'https://opencode.ai/docs' },
    { labelKey: 'docs.opencode.githubLink', href: 'https://github.com/opencode-ai/opencode' },
  ],
  lobechat: [
    { labelKey: 'docs.lobechat.docsLink', href: 'https://lobehub.com/docs' },
  ],
}

const PLATFORM_NAV_SLUGS: IntegrationSlug[] = ['codex-cli']

export function IntegrationMarkdownGuideView(props: { slug: IntegrationSlug }) {
  const { t, i18n } = useTranslation()
  const md = getIntegrationGuideMarkdown(props.slug, i18n.language)
  const headings = extractMarkdownHeadings(md)
  const appKey = SLUG_APP_I18N_KEY[props.slug]
  const title = t(`docs.integration.apps.${appKey}.title`)
  const subtitleKey = `docs.integration.apps.${appKey}.guideSubtitle` as const
  const subtitle = t(subtitleKey, { defaultValue: t(`docs.integration.apps.${appKey}.tagline`) })
  const links = GUIDE_LINKS[props.slug]

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
      {links && links.length > 0 ? (
        <div className='text-muted-foreground -mt-2 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm'>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='hover:text-foreground inline-flex items-center gap-1.5 transition-colors'
            >
              {t(link.labelKey)}
              <ExternalLinkIcon className='size-3.5' aria-hidden />
            </a>
          ))}
        </div>
      ) : null}

      {PLATFORM_NAV_SLUGS.includes(props.slug) ? (
        <DocsGuidePlatformNav headings={headings} />
      ) : null}

      <DocsGuideMarkdown>{md}</DocsGuideMarkdown>
    </DocsArticleShell>
  )
}
