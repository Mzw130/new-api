/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@douyinfe/semi-ui';
import { IconExternalOpen } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import DocsArticleShell from './DocsArticleShell';
import DocsCopyForAiButton from './DocsCopyForAiButton';
import DocsGuideMarkdown from './DocsGuideMarkdown';
import DocsGuidePlatformNav from './DocsGuidePlatformNav';
import { DOCS_BRAND } from '../guides/docs-brand';
import { getClaudeCodeGuideMarkdown } from '../guides/claude-code-guide-markdown';
import { extractMarkdownHeadings } from '../guides/markdown-heading-outline';

const OFFICIAL_URL = 'https://www.anthropic.com/claude-code';

export default function ClaudeCodeGuideView() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const md = getClaudeCodeGuideMarkdown(i18n.language);
  const headings = extractMarkdownHeadings(md);
  const title = t('docs.integration.apps.claudeCode.title');
  const subtitle = t('docs.integration.apps.claudeCode.guideSubtitle');

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
        <div className='flex flex-wrap gap-2'>
          <Button theme='outline' size='small' onClick={() => navigate('/docs/apps')}>
            {t('docs.appsIndex.backToList')}
          </Button>
          <Button theme='outline' size='small' onClick={() => navigate('/console/token')}>
            {t('docs.integration.apiReference.keys')}
          </Button>
        </div>
      }
    >
      <a
        href={OFFICIAL_URL}
        target='_blank'
        rel='noopener noreferrer'
        className='!text-semi-color-primary -mt-2 mb-4 inline-flex items-center gap-1 text-sm'
      >
        {t('docs.claudeCode.officialLink')}
        <IconExternalOpen size='small' aria-hidden />
      </a>
      <DocsGuidePlatformNav headings={headings} />
      <DocsGuideMarkdown content={md} className='docs-prose' />
    </DocsArticleShell>
  );
}
