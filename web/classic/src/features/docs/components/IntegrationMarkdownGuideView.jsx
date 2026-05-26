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
import { getIntegrationMarkdown } from '../guides/integration-markdown';
import { SLUG_APP_I18N_KEY } from '../guides/integration-types';
import { extractMarkdownHeadings } from '../guides/markdown-heading-outline';

const GUIDE_LINKS = {
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
  lobechat: [{ labelKey: 'docs.lobechat.docsLink', href: 'https://lobehub.com/docs' }],
};

const PLATFORM_NAV_SLUGS = ['codex-cli', 'claude-code'];

export default function IntegrationMarkdownGuideView({ slug }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const md = getIntegrationMarkdown(slug, i18n.language);
  const headings = extractMarkdownHeadings(md);
  const appKey = SLUG_APP_I18N_KEY[slug];
  const title = t(`docs.integration.apps.${appKey}.title`);
  const subtitle = t(`docs.integration.apps.${appKey}.guideSubtitle`, {
    defaultValue: t(`docs.integration.apps.${appKey}.tagline`),
  });
  const links = GUIDE_LINKS[slug];

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
      {links?.length > 0 ? (
        <div className='-mt-2 mb-6 flex flex-wrap items-center gap-x-4 gap-y-1'>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target='_blank'
              rel='noopener noreferrer'
              className='!text-semi-color-primary inline-flex items-center gap-1 text-sm'
            >
              {t(link.labelKey)}
              <IconExternalOpen size='small' aria-hidden />
            </a>
          ))}
        </div>
      ) : null}

      {PLATFORM_NAV_SLUGS.includes(slug) ? (
        <DocsGuidePlatformNav headings={headings} />
      ) : null}

      <DocsGuideMarkdown content={md} className='docs-prose' />
    </DocsArticleShell>
  );
}
