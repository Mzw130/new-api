/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  DocsArticleShell,
  DocsSection,
} from '@/features/docs/components/docs-article-shell'
import {
  DocsAppListItem,
  DocsThreeFieldBox,
} from '@/features/docs/components/docs-app-list'
import { integrationSlugForAppKey } from '@/features/docs/guides/integration-types'

const APP_KEYS = [
  'cherry',
  'cursor',
  'claudeCode',
  'codex',
  'openclaw',
  'opencode',
  'lobechat',
  'ccSwitch',
] as const

export function ClientIntegrationDocsPage() {
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

  return (
    <DocsArticleShell
      breadcrumbs={[{ label: t('docs.shell.navDocumentation') }]}
      title={t('docs.integration.pageTitle')}
      subtitle={t('docs.integration.pageSubtitle')}
      headings={[
        { id: 'basics', text: t('docs.integration.basics.title'), level: 2 },
        { id: 'apps', text: t('docs.integration.appsSectionTitle'), level: 2 },
        { id: 'verify', text: t('docs.integration.curlExample.title'), level: 2 },
        { id: 'api', text: t('docs.integration.apiReference.handbook'), level: 2 },
      ]}
    >
      <Alert className='-mt-2'>
        <AlertTitle>{t('docs.integration.selfHostedNoteTitle')}</AlertTitle>
        <AlertDescription>{t('docs.integration.selfHostedNoteBody')}</AlertDescription>
      </Alert>

      <DocsSection id='basics' title={t('docs.integration.basics.title')}>
        <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
          {t('docs.integration.basics.body')}
        </p>
        <DocsThreeFieldBox
          title={t('docs.integration.endpointExample.title')}
          items={threeFields}
        />
        <p className='text-muted-foreground mt-3 font-mono text-sm'>
          {t('docs.integration.endpointExample.baseUrl')}
        </p>
      </DocsSection>

      <DocsSection id='apps' title={t('docs.integration.appsSectionTitle')}>
        <p className='text-muted-foreground mb-4 text-sm leading-relaxed'>
          {t('docs.integration.appsSectionIntro')}
        </p>
        <div className='space-y-2'>
          {APP_KEYS.map((key) => {
            const slug = integrationSlugForAppKey(key)
            return (
              <DocsAppListItem
                key={key}
                slug={slug}
                title={t(`docs.integration.apps.${key}.title`)}
                description={t(`docs.integration.apps.${key}.tagline`)}
              />
            )
          })}
        </div>
        <p className='mt-4'>
          <Link
            to='/docs/apps'
            className='text-primary text-sm font-medium hover:underline'
          >
            {t('docs.integration.linkAllGuides')} →
          </Link>
        </p>
      </DocsSection>

      <DocsSection id='verify' title={t('docs.integration.curlExample.title')}>
        <p className='text-muted-foreground mb-3 text-sm'>
          {t('docs.integration.curlExample.caption')}
        </p>
        <pre className='bg-muted border-border overflow-x-auto rounded-lg border p-4 font-mono text-[13px] leading-relaxed'>
          <code>{`curl -sS https://1router.ai/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}'`}</code>
        </pre>
        <p className='text-muted-foreground mt-3 text-sm'>
          {t('docs.integration.curlSeeAlso')}{' '}
          <Link
            to='/docs/apps/$slug'
            params={{ slug: 'cc-switch' }}
            className='text-primary hover:underline'
          >
            {t('docs.integration.apps.ccSwitch.title')}
          </Link>
        </p>
      </DocsSection>

      <DocsSection
        id='api'
        title={t('docs.integration.apiReference.handbook')}
      >
        <p className='text-muted-foreground text-sm leading-relaxed'>
          {t('docs.integration.apiReference.intro')}{' '}
          <Link
            to='/docs/openai-compatible'
            className='text-primary font-medium hover:underline'
          >
            {t('docs.integration.apiReference.handbook')}
          </Link>
          {t('docs.integration.apiReference.mid')}{' '}
          <Link to='/keys' className='text-primary font-medium hover:underline'>
            {t('docs.integration.apiReference.keys')}
          </Link>
          {t('docs.integration.apiReference.outro')}
        </p>
      </DocsSection>
    </DocsArticleShell>
  )
}
