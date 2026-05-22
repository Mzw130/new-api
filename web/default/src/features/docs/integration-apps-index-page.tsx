/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import {
  DocsArticleShell,
  DocsSection,
} from '@/features/docs/components/docs-article-shell'
import {
  DocsAppListItem,
  DocsThreeFieldBox,
} from '@/features/docs/components/docs-app-list'
import { DocsCopyForAiButton } from '@/features/docs/components/docs-copy-for-ai-button'
import {
  INTEGRATION_SLUGS,
  SLUG_APP_I18N_KEY,
} from '@/features/docs/guides/integration-types'

export function IntegrationAppsIndexPage() {
  const { t } = useTranslation()

  const threeFields = [
    {
      label: t('docs.integration.basics.step1Label'),
      body: t('docs.integration.basics.step1Body'),
    },
    {
      label: t('docs.integration.basics.step2Label'),
      body: t('docs.integration.basics.step2Body'),
    },
    {
      label: t('docs.integration.basics.step3Label'),
      body: t('docs.integration.basics.step3Body'),
    },
  ]

  const copyContent = [
    `# ${t('docs.appsIndex.title')}`,
    '',
    t('docs.appsIndex.pageSubtitle'),
    '',
    t('docs.shell.appsOverviewBody'),
    '',
    ...INTEGRATION_SLUGS.map((slug) => {
      const appKey = SLUG_APP_I18N_KEY[slug]
      return `## ${t(`docs.integration.apps.${appKey}.title`)}\n${t(`docs.integration.apps.${appKey}.tagline`)}`
    }),
  ].join('\n')

  return (
    <DocsArticleShell
      breadcrumbs={[
        { label: t('docs.appsIndex.navDocs'), to: '/docs' },
        { label: t('docs.appsIndex.title') },
      ]}
      title={t('docs.appsIndex.title')}
      subtitle={t('docs.appsIndex.pageSubtitle')}
      headerActions={<DocsCopyForAiButton content={copyContent} />}
      headings={[
        { id: 'overview', text: t('docs.shell.sectionOverview'), level: 2 },
        { id: 'apps', text: t('docs.openai.supportedAppsTitle'), level: 2 },
        { id: 'guide', text: t('docs.shell.sectionIntegration'), level: 2 },
      ]}
    >
      <DocsSection id='overview' title={t('docs.shell.sectionOverview')}>
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {t('docs.shell.appsOverviewBody')}
        </p>
      </DocsSection>

      <DocsSection id='apps' title={t('docs.openai.supportedAppsTitle')}>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {INTEGRATION_SLUGS.map((slug) => {
            const appKey = SLUG_APP_I18N_KEY[slug]
            return (
              <DocsAppListItem
                key={slug}
                slug={slug}
                title={t(`docs.integration.apps.${appKey}.title`)}
                description={t(`docs.integration.apps.${appKey}.tagline`)}
                className='h-full'
              />
            )
          })}
        </div>
      </DocsSection>

      <DocsSection id='guide' title={t('docs.shell.sectionIntegration')}>
        <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
          {t('docs.shell.integrationLead')}
        </p>
        <DocsThreeFieldBox
          title={t('docs.integration.basics.title')}
          items={threeFields}
        />
        <p className='text-muted-foreground mt-4 text-sm'>
          {t('docs.shell.integrationFooter')}{' '}
          <Link
            to='/docs/api'
            className='text-primary font-medium hover:underline'
          >
            {t('docs.integration.apiReference.handbook')}
          </Link>
        </p>
      </DocsSection>
    </DocsArticleShell>
  )
}
