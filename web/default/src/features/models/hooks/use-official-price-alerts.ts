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
import { useCallback, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  acknowledgeOfficialPriceSnapshot,
  fetchOfficialPriceChanges,
} from '../lib/models-dev-snapshot'
import type { OfficialPriceChange } from '../types-official-price'
import { modelsQueryKeys } from '../lib/query-keys'

const DISMISS_STORAGE_KEY = 'official-price-alerts-dismissed'

function fingerprintChanges(changes: OfficialPriceChange[]): string {
  return changes
    .map(
      (c) =>
        `${c.canonical_key}:${c.field}:${c.old_value}:${c.new_value}`
    )
    .join('|')
}

function readDismissedFingerprint(): string | null {
  try {
    return localStorage.getItem(DISMISS_STORAGE_KEY)
  } catch {
    return null
  }
}

function writeDismissedFingerprint(fp: string) {
  try {
    localStorage.setItem(DISMISS_STORAGE_KEY, fp)
  } catch {
    /* ignore */
  }
}

export function useOfficialPriceAlerts(enabled: boolean) {
  const queryClient = useQueryClient()
  const [dismissedFp, setDismissedFp] = useState<string | null>(() =>
    readDismissedFingerprint()
  )

  const query = useQuery({
    queryKey: modelsQueryKeys.officialPriceAlerts(),
    queryFn: fetchOfficialPriceChanges,
    enabled,
    staleTime: 5 * 60 * 1000,
  })

  const changes = useMemo(
    () => query.data ?? [],
    [query.data]
  )

  const fp = useMemo(() => fingerprintChanges(changes), [changes])

  const shouldShowAlert =
    enabled &&
    changes.length > 0 &&
    fp.length > 0 &&
    dismissedFp !== fp

  const ackMutation = useMutation({
    mutationFn: acknowledgeOfficialPriceSnapshot,
    onSuccess: () => {
      writeDismissedFingerprint(fp)
      setDismissedFp(fp)
      void queryClient.invalidateQueries({
        queryKey: modelsQueryKeys.officialPriceAlerts(),
      })
    },
  })

  const dismiss = useCallback(() => {
    writeDismissedFingerprint(fp)
    setDismissedFp(fp)
  }, [fp])

  const acknowledge = useCallback(() => {
    ackMutation.mutate()
  }, [ackMutation])

  return {
    changes,
    shouldShowAlert,
    isLoading: query.isLoading,
    isAcking: ackMutation.isPending,
    dismiss,
    acknowledge,
    refetch: query.refetch,
  }
}
