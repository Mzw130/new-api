/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IntegrationGuideView from '../../features/docs/components/IntegrationGuideView';
import IntegrationMarkdownGuideView from '../../features/docs/components/IntegrationMarkdownGuideView';
import ClaudeCodeGuideView from '../../features/docs/components/ClaudeCodeGuideView';
import CursorGuideView from '../../features/docs/components/CursorGuideView';
import CcSwitchGuideView from '../../features/docs/components/CcSwitchGuideView';
import {
  SLUG_APP_I18N_KEY,
  isIntegrationSlug,
} from '../../features/docs/guides/integration-types';

const MARKDOWN_GUIDE_SLUGS = ['codex-cli', 'openclaw', 'opencode', 'lobechat'];

export default function IntegrationGuideDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();

  if (slug === 'continue') {
    return <Navigate to='/docs/apps/opencode' replace />;
  }

  if (!isIntegrationSlug(slug)) {
    return <Navigate to='/docs/apps' replace />;
  }

  if (slug === 'claude-code') {
    return <ClaudeCodeGuideView />;
  }

  if (slug === 'cursor') {
    return <CursorGuideView />;
  }

  if (slug === 'cc-switch') {
    return <CcSwitchGuideView />;
  }

  if (MARKDOWN_GUIDE_SLUGS.includes(slug)) {
    return <IntegrationMarkdownGuideView slug={slug} />;
  }

  const appKey = SLUG_APP_I18N_KEY[slug];
  const title = t(`docs.integration.apps.${appKey}.title`);

  return <IntegrationGuideView slug={slug} title={title} />;
}
