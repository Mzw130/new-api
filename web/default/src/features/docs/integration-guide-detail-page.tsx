/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useTranslation } from 'react-i18next'
import { useParams } from '@tanstack/react-router'
import {
  SLUG_APP_I18N_KEY,
  type IntegrationSlug,
} from '@/features/docs/guides/integration-types'
import { ClaudeCodeGuideView } from '@/features/docs/components/claude-code-guide-view'
import { CcSwitchGuideView } from '@/features/docs/components/cc-switch-guide-view'
import { CursorGuideView } from '@/features/docs/components/cursor-guide-view'
import { IntegrationGuideView } from '@/features/docs/components/integration-guide-view'
import { IntegrationMarkdownGuideView } from '@/features/docs/components/integration-markdown-guide-view'

const MARKDOWN_GUIDE_SLUGS: IntegrationSlug[] = [
  'codex-cli',
  'openclaw',
  'opencode',
  'lobechat',
]

export function IntegrationGuideDetailPage() {
  const { t } = useTranslation()
  const { slug } = useParams({
    from: '/docs/apps/$slug',
  }) as { slug: IntegrationSlug }

  if (slug === 'claude-code') {
    return <ClaudeCodeGuideView />
  }

  if (slug === 'cursor') {
    return <CursorGuideView />
  }

  if (slug === 'cc-switch') {
    return <CcSwitchGuideView />
  }

  if (MARKDOWN_GUIDE_SLUGS.includes(slug)) {
    return <IntegrationMarkdownGuideView slug={slug} />
  }

  const appKey = SLUG_APP_I18N_KEY[slug]
  const title = t(`docs.integration.apps.${appKey}.title`)

  return <IntegrationGuideView slug={slug} title={title} />
}
