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
import { MODELS_DEV_API_URL } from '../constants'
import type { OfficialPriceEntry } from '../types-official'
import { resolveOfficialProvider } from './resolve-official-provider'
import { applyDeepSeekOfficialCnyOverrides } from './vendors/deepseek-official-cny'

type ModelsDevCost = {
  input?: number | null
  output?: number | null
  cache_read?: number | null
}

type ModelsDevPayload = Record<
  string,
  {
    models?: Record<string, { cost?: ModelsDevCost }>
  }
>

function isValidCost(v: number): boolean {
  return Number.isFinite(v) && v >= 0
}

/** Fetch vendor list prices from models.dev (only each model's official provider bucket). */
export async function fetchModelsDevOfficialPrices(): Promise<
  Map<string, OfficialPriceEntry>
> {
  const res = await fetch(MODELS_DEV_API_URL, {
    cache: 'default',
    credentials: 'omit',
  })
  if (!res.ok) {
    throw new Error(`models.dev returned ${res.status}`)
  }
  const upstream = (await res.json()) as ModelsDevPayload
  const selected = new Map<
    string,
    { input: number; output?: number; cache?: number; provider: string }
  >()

  const providers = Object.keys(upstream).sort()
  for (const provider of providers) {
    const models = upstream[provider]?.models ?? {}
    const names = Object.keys(models).sort()
    for (const modelName of names) {
      const officialProvider = resolveOfficialProvider(modelName)
      if (!officialProvider || officialProvider !== provider) continue

      const cost = models[modelName]?.cost
      const input = cost?.input
      if (input == null || !isValidCost(input)) continue
      selected.set(modelName, {
        input,
        output:
          cost?.output != null && isValidCost(cost.output)
            ? cost.output
            : undefined,
        cache:
          cost?.cache_read != null && isValidCost(cost.cache_read)
            ? cost.cache_read
            : undefined,
        provider,
      })
    }
  }

  const out = new Map<string, OfficialPriceEntry>()
  for (const [name, c] of selected) {
    out.set(name, {
      input_per_m: c.input,
      output_per_m: c.output,
      cache_read_per_m: c.cache,
      provider: c.provider,
    })
  }
  applyDeepSeekOfficialCnyOverrides(out)
  return out
}

export function listOfficialModelKeys(prices: Map<string, OfficialPriceEntry>): string[] {
  return [...prices.keys()].sort((a, b) => b.length - a.length)
}
