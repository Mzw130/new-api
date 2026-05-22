/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { createFileRoute } from '@tanstack/react-router'
import { ClientIntegrationDocsPage } from '@/features/docs/client-integration-page'

export const Route = createFileRoute('/docs/integration/')({
  component: ClientIntegrationDocsPage,
})
