/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@douyinfe/semi-ui';
import DocsContentCard from '../../features/docs/components/DocsContentCard';
import { useTranslation } from 'react-i18next';
import DocsArticleShell, { DocsSection } from '../../features/docs/components/DocsArticleShell';
import {
  DocsAppListItem,
  DocsThreeFieldBox,
} from '../../features/docs/components/DocsAppList';
import {
  INTEGRATION_SLUGS,
  SLUG_APP_I18N_KEY,
} from '../../features/docs/guides/integration-types';
import DocsCopyForAiButton from '../../features/docs/components/DocsCopyForAiButton';

const { Paragraph } = Typography;

export default function IntegrationAppsIndexPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const copyContent = [
    `# ${t('docs.appsIndex.title')}`,
    '',
    t('docs.appsIndex.pageSubtitle'),
    '',
    t('docs.shell.appsOverviewBody'),
    '',
    ...INTEGRATION_SLUGS.map((slug) => {
      const appKey = SLUG_APP_I18N_KEY[slug];
      return `## ${t(`docs.integration.apps.${appKey}.title`)}\n${t(`docs.integration.apps.${appKey}.tagline`)}`;
    }),
  ].join('\n');

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
        <DocsContentCard bodyStyle={{ padding: '16px 20px' }}>
          <Paragraph type='secondary' className='!m-0 text-sm leading-relaxed'>
            {t('docs.shell.appsOverviewBody')}
          </Paragraph>
        </DocsContentCard>
      </DocsSection>

      <DocsSection id='apps' title={t('docs.openai.supportedAppsTitle')}>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {INTEGRATION_SLUGS.map((slug) => {
            const appKey = SLUG_APP_I18N_KEY[slug];
            return (
              <DocsAppListItem
                key={slug}
                slug={slug}
                title={t(`docs.integration.apps.${appKey}.title`)}
                description={t(`docs.integration.apps.${appKey}.tagline`)}
              />
            );
          })}
        </div>
      </DocsSection>

      <DocsSection id='guide' title={t('docs.shell.sectionIntegration')}>
        <Paragraph type='secondary' className='mb-4 text-sm leading-relaxed'>
          {t('docs.shell.integrationLead')}
        </Paragraph>
        <DocsThreeFieldBox
          title={t('docs.integration.basics.title')}
          items={threeFields}
        />
        <Paragraph type='secondary' className='mt-4 text-sm'>
          {t('docs.shell.integrationFooter')}{' '}
          <Button
            theme='borderless'
            type='primary'
            size='small'
            className='!px-1 !align-baseline !text-indigo-600 dark:!text-indigo-300'
            onClick={() => navigate('/docs/api')}
          >
            {t('docs.integration.apiReference.handbook')}
          </Button>
        </Paragraph>
      </DocsSection>
    </DocsArticleShell>
  );
}
