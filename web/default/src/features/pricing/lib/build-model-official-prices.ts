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
import { QUOTA_TYPE_VALUES } from '../constants'
import { getUsdExchangeRate } from './format-official-price'
import type { OfficialCompareRow, OfficialPriceEntry } from '../types-official'
import type { PricingModel } from '../types'
import type { ModelOfficialPrice } from './official-price-map'
import { listOfficialModelKeys } from './models-dev'
import { resolveOfficialModelKey } from './resolve-official-key'

function platformInputInOfficialCurrency(
  platformUsd: number,
  official: OfficialPriceEntry
): number {
  if (official.currency === 'CNY') {
    return platformUsd * getUsdExchangeRate()
  }
  return platformUsd
}

function officialDiscountPercent(
  platformUsd: number,
  official: OfficialPriceEntry
): number | null {
  if (!official.input_per_m || official.input_per_m <= 0 || platformUsd <= 0) {
    return null
  }
  const platformComparable = platformInputInOfficialCurrency(platformUsd, official)
  return (1 - platformComparable / official.input_per_m) * 100
}

function getMinGroupRatio(
  enableGroups: string[],
  groupRatio: Record<string, number>
): number {
  let min = Number.POSITIVE_INFINITY
  for (const group of enableGroups) {
    const r = groupRatio[group]
    if (r !== undefined && r < min) min = r
  }
  return min === Number.POSITIVE_INFINITY ? 1 : min
}

export function platformInputUSDPerM(
  model: PricingModel,
  groupRatio: Record<string, number>
): number {
  if (model.quota_type !== QUOTA_TYPE_VALUES.TOKEN) return 0
  const minRatio = getMinGroupRatio(model.enable_groups ?? [], groupRatio)
  return model.model_ratio * 2 * minRatio
}

export function platformOutputUSDPerM(
  model: PricingModel,
  groupRatio: Record<string, number>
): number | undefined {
  if (model.quota_type !== QUOTA_TYPE_VALUES.TOKEN) return undefined
  const input = platformInputUSDPerM(model, groupRatio)
  return input * model.completion_ratio
}

function lookupOfficial(
  canonical: string,
  official: Map<string, OfficialPriceEntry>
): OfficialPriceEntry | undefined {
  if (official.has(canonical)) return official.get(canonical)
  const lower = canonical.toLowerCase()
  for (const [k, v] of official) {
    if (k.toLowerCase() === lower) return v
  }
  return undefined
}

export function buildOfficialPriceByModels(
  models: PricingModel[],
  groupRatio: Record<string, number>,
  official: Map<string, OfficialPriceEntry>
): Map<string, ModelOfficialPrice> {
  const keys = listOfficialModelKeys(official)
  const map = new Map<string, ModelOfficialPrice>()

  for (const model of models) {
    if (model.quota_type !== QUOTA_TYPE_VALUES.TOKEN) continue
    const name = model.model_name
    if (!name) continue

    const canonical = resolveOfficialModelKey(name, keys)
    if (!canonical) continue

    const off = lookupOfficial(canonical, official)
    if (!off?.input_per_m) continue

    const platformIn = platformInputUSDPerM(model, groupRatio)
    const discount = officialDiscountPercent(platformIn, off)

    map.set(name, {
      canonicalKey: canonical,
      officialInputPerM: off.input_per_m,
      officialOutputPerM: off.output_per_m,
      officialCurrency: off.currency,
      discountPercent: discount,
    })
  }

  return map
}

export function buildOfficialCompareRows(
  models: PricingModel[],
  groupRatio: Record<string, number>,
  official: Map<string, OfficialPriceEntry>
): OfficialCompareRow[] {
  const keys = listOfficialModelKeys(official)
  type Agg = {
    row: OfficialCompareRow
    variants: Map<string, { model_name: string; input_per_m: number; output_per_m?: number }>
  }
  const groups = new Map<string, Agg>()

  for (const model of models) {
    if (model.quota_type !== QUOTA_TYPE_VALUES.TOKEN) continue
    const name = model.model_name
    if (!name) continue

    const canonical = resolveOfficialModelKey(name, keys) ?? name
    const off = lookupOfficial(canonical, official)
    const inUsd = platformInputUSDPerM(model, groupRatio)
    const outUsd = platformOutputUSDPerM(model, groupRatio)

    let g = groups.get(canonical)
    if (!g) {
      g = {
        row: {
          canonical_key: canonical,
          official: off
            ? {
                input_per_m: off.input_per_m,
                output_per_m: off.output_per_m,
                cache_read_per_m: off.cache_read_per_m,
                provider: off.provider,
                currency: off.currency,
              }
            : null,
          platform_input_per_m: inUsd,
          platform_output_per_m: outUsd,
          variant_count: 0,
          variants: [],
          quota_type: model.quota_type,
          vendor_icon: model.vendor_icon,
        },
        variants: new Map(),
      }
      groups.set(canonical, g)
    }

    g.variants.set(name, {
      model_name: name,
      input_per_m: inUsd,
      output_per_m: outUsd,
    })
    if (g.row.platform_input_per_m === 0 || inUsd < g.row.platform_input_per_m) {
      g.row.platform_input_per_m = inUsd
      g.row.platform_output_per_m = outUsd
      if (model.vendor_icon) g.row.vendor_icon = model.vendor_icon
    }
    if (!g.row.official && off) {
      g.row.official = {
        input_per_m: off.input_per_m,
        output_per_m: off.output_per_m,
        cache_read_per_m: off.cache_read_per_m,
        provider: off.provider,
        currency: off.currency,
      }
    }
  }

  const rows: OfficialCompareRow[] = []
  for (const g of groups.values()) {
    g.row.variant_count = g.variants.size
    g.row.variants = [...g.variants.values()].sort((a, b) =>
      a.model_name.localeCompare(b.model_name)
    )
    if (g.row.official?.input_per_m && g.row.platform_input_per_m > 0) {
      g.row.discount_percent = officialDiscountPercent(
        g.row.platform_input_per_m,
        g.row.official
      )
    }
    rows.push(g.row)
  }

  rows.sort((a, b) => a.canonical_key.localeCompare(b.canonical_key))
  return rows
}
