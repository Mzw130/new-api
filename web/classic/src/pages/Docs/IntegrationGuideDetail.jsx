/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IntegrationGuideView from '../../features/docs/components/IntegrationGuideView';
import {
  SLUG_APP_I18N_KEY,
  isIntegrationSlug,
} from '../../features/docs/guides/integration-types';

export default function IntegrationGuideDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();

  if (!isIntegrationSlug(slug)) {
    return <Navigate to='/docs/apps' replace />;
  }

  const appKey = SLUG_APP_I18N_KEY[slug];
  const title = t(`docs.integration.apps.${appKey}.title`);

  return <IntegrationGuideView slug={slug} title={title} />;
}
