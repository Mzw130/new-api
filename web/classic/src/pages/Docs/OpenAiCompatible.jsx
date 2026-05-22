/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import DocsArticleShell from '../../features/docs/components/DocsArticleShell';
import DocsContentCard from '../../features/docs/components/DocsContentCard';
import DocsCopyForAiButton from '../../features/docs/components/DocsCopyForAiButton';
import DocsMarkdown from '../../features/docs/components/DocsMarkdown';
import { getOpenAiCompatibleMarkdown } from '../../features/docs/guides/integration-markdown';
import { extractMarkdownHeadings } from '../../features/docs/guides/markdown-heading-outline';

export default function OpenAiCompatibleDocPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const md = getOpenAiCompatibleMarkdown(i18n.language);
  const headings = extractMarkdownHeadings(md);
  const bodyMd = useMemo(() => md.replace(/^#[^\n]+\n+/, ''), [md]);

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
        <div className='flex flex-wrap gap-2'>
          <Button theme='outline' size='small' onClick={() => navigate('/docs/apps')}>
            {t('docs.home.agentCard.title')}
          </Button>
          <Button theme='outline' size='small' onClick={() => navigate('/console/token')}>
            {t('docs.integration.apiReference.keys')}
          </Button>
        </div>
      }
    >
      <DocsContentCard bodyStyle={{ padding: '24px 28px' }}>
        <DocsMarkdown content={bodyMd} className='docs-prose' />
      </DocsContentCard>
    </DocsArticleShell>
  );
}
