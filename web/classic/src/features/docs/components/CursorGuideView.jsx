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
import { DOCS_BRAND } from '../guides/docs-brand';
import { getCursorGuideMarkdown } from '../guides/cursor-guide-markdown';
import { extractMarkdownHeadings } from '../guides/markdown-heading-outline';

const OFFICIAL_URL = 'https://cursor.com/download';

export default function CursorGuideView() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const md = getCursorGuideMarkdown(i18n.language);
  const headings = extractMarkdownHeadings(md);
  const title = t('docs.integration.apps.cursor.title');
  const subtitle = t('docs.integration.apps.cursor.guideSubtitle');

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
        {t('docs.cursor.downloadLink')}
        <IconExternalOpen size='small' aria-hidden />
      </a>
      <DocsGuideMarkdown content={md} className='docs-prose' />
    </DocsArticleShell>
  );
}
