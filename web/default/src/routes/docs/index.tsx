/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { createFileRoute } from '@tanstack/react-router'
import { DocsIndexPage } from '@/features/docs/docs-index-page'

export const Route = createFileRoute('/docs/')({
  component: DocsIndexPage,
})
