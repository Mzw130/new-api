/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, List, Typography } from '@douyinfe/semi-ui';
import DocsContentCard from './DocsContentCard';
import { IconExternalOpen } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import DocsArticleShell, { DocsSection } from './DocsArticleShell';
import DocsParamTable from './DocsParamTable';
import {
  INTEGRATION_GUIDE_CONTENT,
  pickGuideLang,
  tGuide,
} from '../guides/integration-guide-content';
import { getIntegrationMarkdown } from '../guides/integration-markdown';
import DocsCopyForAiButton from './DocsCopyForAiButton';
import { DOCS_BRAND } from '../guides/docs-brand';

const { Text, Paragraph } = Typography;

function GuideBody({ guide, lang }) {
  return (
    <>
      {guide.officialUrl ? (
        <Paragraph type='secondary' className='-mt-1 mb-6 text-sm'>
          <a
            href={guide.officialUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='!text-semi-color-primary inline-flex items-center gap-1'
          >
            {guide.officialLabel ? tGuide(guide.officialLabel, lang) : guide.officialUrl}
            <IconExternalOpen size='small' aria-hidden />
          </a>
        </Paragraph>
      ) : null}

      {guide.sections.map((section) => (
        <DocsSection
          key={section.id}
          id={section.id}
          title={tGuide(section.title, lang)}
        >
          {section.params ? (
            <DocsParamTable
              rows={section.params.map((row) => {
                const val = tGuide(row.value, lang);
                const isMono =
                  val.startsWith('http') ||
                  val.includes('/') ||
                  val.startsWith('Authorization');
                return {
                  field: tGuide(row.field, lang),
                  value: isMono ? (
                    <Text
                      code
                      className='!text-[13px]'
                      style={{
                        background: 'var(--semi-color-fill-0)',
                        padding: '2px 6px',
                        borderRadius: 4,
                      }}
                    >
                      {val}
                    </Text>
                  ) : (
                    <span>{val}</span>
                  ),
                  hint: row.hint ? tGuide(row.hint, lang) : undefined,
                };
              })}
            />
          ) : null}

          {section.steps ? (
            <DocsContentCard bodyStyle={{ padding: '4px 0' }}>
              <List
                dataSource={section.steps.map((step, i) => ({
                  key: String(i),
                  index: i + 1,
                  text: tGuide(step, lang),
                }))}
                renderItem={(item) => (
                  <List.Item
                    className='!px-4 !py-3'
                    main={
                      <div className='flex gap-3 text-sm leading-relaxed'>
                        <Text type='tertiary' strong className='w-5 shrink-0 tabular-nums'>
                          {item.index}.
                        </Text>
                        <Text>{item.text}</Text>
                      </div>
                    }
                  />
                )}
              />
            </DocsContentCard>
          ) : null}

          {section.bullets ? (
            <DocsContentCard bodyStyle={{ padding: '12px 16px' }}>
              <List
                dataSource={section.bullets.map((b, i) => ({
                  key: String(i),
                  text: tGuide(b, lang),
                }))}
                renderItem={(item) => (
                  <List.Item
                    className='!py-1.5'
                    main={
                      <Text type='secondary' className='text-sm leading-relaxed'>
                        {item.text}
                      </Text>
                    }
                  />
                )}
              />
            </DocsContentCard>
          ) : null}
        </DocsSection>
      ))}
    </>
  );
}

export default function IntegrationGuideView({ slug, title }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = pickGuideLang(i18n.language);
  const guide = INTEGRATION_GUIDE_CONTENT[slug];
  const copyMd = getIntegrationMarkdown(slug, i18n.language);
  const headings = guide.sections.map((s) => ({
    id: s.id,
    text: tGuide(s.title, lang),
    level: 2,
  }));

  return (
    <DocsArticleShell
      breadcrumbs={[
        { label: t('docs.appsIndex.navDocs'), to: '/docs' },
        { label: t('docs.appsIndex.navApps'), to: '/docs/apps' },
        { label: title },
      ]}
      title={title}
      subtitle={`${DOCS_BRAND} · ${tGuide(guide.subtitle, lang)}`}
      headings={headings}
      headerActions={<DocsCopyForAiButton content={copyMd} />}
      footer={
        <div className='flex flex-wrap gap-2'>
          <Button theme='outline' size='small' onClick={() => navigate('/docs/apps')}>
            {t('docs.appsIndex.backToList')}
          </Button>
          <Button
            theme='outline'
            size='small'
            onClick={() => navigate('/console/token')}
          >
            {t('docs.integration.apiReference.keys')}
          </Button>
          <Button
            theme='borderless'
            type='tertiary'
            size='small'
            onClick={() => navigate('/docs/api')}
          >
            {t('docs.integration.apiReference.handbook')}
          </Button>
        </div>
      }
    >
      <GuideBody guide={guide} lang={lang} />
    </DocsArticleShell>
  );
}
