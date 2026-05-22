/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { createFileRoute } from '@tanstack/react-router'
import { OpenAiCompatibleDocPage } from '@/features/docs/openai-compatible-doc-page'

export const Route = createFileRoute('/docs/api/')({
  component: OpenAiCompatibleDocPage,
})
