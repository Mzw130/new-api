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
import { fetchModelsDevOfficialPrices } from '@/features/pricing/lib/models-dev'
import type { OfficialPriceEntry } from '@/features/pricing/types-official'
import type { OfficialPriceChange } from '../types-official-price'

const SNAPSHOT_STORAGE_KEY = 'models-dev-official-price-snapshot-v1'

type Snapshot = {
  updated_at: number
  prices: Record<string, { input_per_m: number; output_per_m?: number }>
}

function nearlyEqual(a: number, b: number): boolean {
  return Math.abs(a - b) < 1e-9
}

function loadSnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem(SNAPSHOT_STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Snapshot
  } catch {
    return null
  }
}

function saveSnapshot(prices: Map<string, OfficialPriceEntry>): void {
  const pricesObj: Snapshot['prices'] = {}
  for (const [key, entry] of prices) {
    pricesObj[key] = {
      input_per_m: entry.input_per_m,
      output_per_m: entry.output_per_m,
    }
  }
  const snap: Snapshot = {
    updated_at: Math.floor(Date.now() / 1000),
    prices: pricesObj,
  }
  try {
    localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(snap))
  } catch {
    /* ignore */
  }
}

function detectChanges(
  current: Map<string, OfficialPriceEntry>,
  prev: Snapshot | null
): OfficialPriceChange[] {
  if (!prev?.prices || Object.keys(prev.prices).length === 0) {
    return []
  }
  const changes: OfficialPriceChange[] = []
  for (const [key, now] of current) {
    const old = prev.prices[key]
    if (!old) continue
    if (!nearlyEqual(old.input_per_m, now.input_per_m)) {
      const pct =
        old.input_per_m > 0
          ? ((now.input_per_m - old.input_per_m) / old.input_per_m) * 100
          : 0
      changes.push({
        canonical_key: key,
        field: 'input',
        old_value: old.input_per_m,
        new_value: now.input_per_m,
        change_pct: pct,
        official: now,
      })
    }
    if (
      old.output_per_m != null &&
      now.output_per_m != null &&
      !nearlyEqual(old.output_per_m, now.output_per_m)
    ) {
      const pct =
        old.output_per_m > 0
          ? ((now.output_per_m - old.output_per_m) / old.output_per_m) * 100
          : 0
      changes.push({
        canonical_key: key,
        field: 'output',
        old_value: old.output_per_m,
        new_value: now.output_per_m,
        change_pct: pct,
        official: now,
      })
    }
  }
  changes.sort((a, b) => a.canonical_key.localeCompare(b.canonical_key))
  return changes
}

export async function fetchOfficialPriceChanges(): Promise<OfficialPriceChange[]> {
  const current = await fetchModelsDevOfficialPrices()
  const prev = loadSnapshot()
  return detectChanges(current, prev)
}

export async function acknowledgeOfficialPriceSnapshot(): Promise<void> {
  const current = await fetchModelsDevOfficialPrices()
  saveSnapshot(current)
}
