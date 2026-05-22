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
import { IntegrationGuideView } from '@/features/docs/components/integration-guide-view'

export function IntegrationGuideDetailPage() {
  const { t } = useTranslation()
  const { slug } = useParams({
    from: '/docs/apps/$slug',
  }) as { slug: IntegrationSlug }
  const appKey = SLUG_APP_I18N_KEY[slug]
  const title = t(`docs.integration.apps.${appKey}.title`)

  return <IntegrationGuideView slug={slug} title={title} />
}
