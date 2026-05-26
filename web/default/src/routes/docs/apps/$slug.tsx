/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { createFileRoute, redirect } from '@tanstack/react-router'
import { IntegrationGuideDetailPage } from '@/features/docs/integration-guide-detail-page'
import { isIntegrationSlug } from '@/features/docs/guides/integration-types'

export const Route = createFileRoute('/docs/apps/$slug')({
  beforeLoad: ({ params }) => {
    if (params.slug === 'continue') {
      throw redirect({ to: '/docs/apps/opencode', replace: true })
    }
    if (!isIntegrationSlug(params.slug)) {
      throw redirect({ to: '/404' })
    }
  },
  component: IntegrationGuideDetailPage,
})
