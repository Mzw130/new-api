/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Banner, Button, Card, Typography } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import DocsArticleShell, { DocsSection } from '../../features/docs/components/DocsArticleShell';
import {
  DocsAppListItem,
  DocsThreeFieldBox,
} from '../../features/docs/components/DocsAppList';
import { integrationSlugForAppKey } from '../../features/docs/guides/integration-types';

const { Text, Paragraph } = Typography;

const APP_KEYS = [
  'cherry',
  'cursor',
  'claudeCode',
  'codex',
  'openclaw',
  'continue',
  'lobechat',
  'generic',
];

export default function ClientIntegrationDocsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
  ];

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
      <Banner
        type='info'
        className='-mt-2'
        title={t('docs.integration.selfHostedNoteTitle')}
        description={t('docs.integration.selfHostedNoteBody')}
        closeIcon={null}
      />

      <DocsSection id='basics' title={t('docs.integration.basics.title')}>
        <Paragraph type='secondary' className='mb-4 text-sm leading-relaxed'>
          {t('docs.integration.basics.body')}
        </Paragraph>
        <DocsThreeFieldBox
          title={t('docs.integration.endpointExample.title')}
          items={threeFields}
        />
        <Text type='secondary' className='mt-3 block font-mono text-sm'>
          {t('docs.integration.endpointExample.baseUrl')}
        </Text>
      </DocsSection>

      <DocsSection id='apps' title={t('docs.integration.appsSectionTitle')}>
        <Paragraph type='secondary' className='mb-4 text-sm leading-relaxed'>
          {t('docs.integration.appsSectionIntro')}
        </Paragraph>
        <div className='space-y-2'>
          {APP_KEYS.map((key) => {
            const slug = integrationSlugForAppKey(key);
            return (
              <DocsAppListItem
                key={key}
                slug={slug}
                title={t(`docs.integration.apps.${key}.title`)}
                description={t(`docs.integration.apps.${key}.tagline`)}
              />
            );
          })}
        </div>
        <div className='mt-4'>
          <Button
            theme='outline'
            size='small'
            onClick={() => navigate('/docs/apps')}
          >
            {t('docs.integration.linkAllGuides')} →
          </Button>
        </div>
      </DocsSection>

      <DocsSection id='verify' title={t('docs.integration.curlExample.title')}>
        <Paragraph type='secondary' className='mb-3 text-sm'>
          {t('docs.integration.curlExample.caption')}
        </Paragraph>
        <Card
          className='!rounded-xl'
          bodyStyle={{
            padding: 16,
            background: 'var(--semi-color-fill-0)',
          }}
        >
          <Text
            code
            className='block whitespace-pre-wrap break-all !text-[13px] leading-relaxed'
          >
            {`curl -sS https://1router.ai/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hello"}]}'`}
          </Text>
        </Card>
        <Paragraph type='secondary' className='mt-3 text-sm'>
          {t('docs.integration.curlSeeAlso')}{' '}
          <Link
            to='/docs/apps/sdk-and-http'
            className='!text-semi-color-primary'
          >
            {t('docs.integration.apps.generic.title')}
          </Link>
        </Paragraph>
      </DocsSection>

      <DocsSection id='api' title={t('docs.integration.apiReference.handbook')}>
        <Paragraph type='secondary' className='text-sm leading-relaxed'>
          {t('docs.integration.apiReference.intro')}{' '}
          <Link to='/docs/openai-compatible' className='!text-semi-color-primary font-medium'>
            {t('docs.integration.apiReference.handbook')}
          </Link>
          {t('docs.integration.apiReference.mid')}{' '}
          <Link to='/console/token' className='!text-semi-color-primary font-medium'>
            {t('docs.integration.apiReference.keys')}
          </Link>
          {t('docs.integration.apiReference.outro')}
        </Paragraph>
      </DocsSection>
    </DocsArticleShell>
  );
}
