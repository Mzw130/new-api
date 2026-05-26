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
import { getCcSwitchGuideMarkdown } from '../guides/cc-switch-guide-markdown';
import { extractMarkdownHeadings } from '../guides/markdown-heading-outline';

const GITHUB_URL = 'https://github.com/farion1231/cc-switch';

export default function CcSwitchGuideView() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const md = getCcSwitchGuideMarkdown(i18n.language);
  const headings = extractMarkdownHeadings(md);
  const title = t('docs.integration.apps.ccSwitch.title');
  const subtitle = t('docs.integration.apps.ccSwitch.guideSubtitle');

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
      <div className='-mt-2 mb-4 flex flex-wrap items-center gap-x-4 gap-y-1'>
        <a
          href={GITHUB_URL}
          target='_blank'
          rel='noopener noreferrer'
          className='!text-semi-color-primary inline-flex items-center gap-1 text-sm'
        >
          {t('docs.ccSwitch.githubLink')}
          <IconExternalOpen size='small' aria-hidden />
        </a>
      </div>
      <DocsGuideMarkdown content={md} className='docs-prose' />
    </DocsArticleShell>
  );
}
