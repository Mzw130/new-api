/*
Copyright (C) 2025 QuantumNous

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

import { MODELS_DEV_API_URL } from './constants';

function isValidCost(v) {
  return Number.isFinite(v) && v >= 0;
}

function shouldPrefer(cur, next) {
  if (cur.input === 0 && next.input > 0) return true;
  if (next.input > 0 && cur.input > 0 && next.input < cur.input) return true;
  return next.provider < cur.provider;
}

/** Fetch official USD/1M prices from models.dev (browser CORS). */
export async function fetchModelsDevOfficialPrices() {
  const res = await fetch(MODELS_DEV_API_URL, {
    cache: 'default',
    credentials: 'omit',
  });
  if (!res.ok) {
    throw new Error(`models.dev returned ${res.status}`);
  }
  const upstream = await res.json();
  const selected = new Map();

  const providers = Object.keys(upstream).sort();
  for (const provider of providers) {
    const models = upstream[provider]?.models ?? {};
    const names = Object.keys(models).sort();
    for (const modelName of names) {
      const cost = models[modelName]?.cost;
      const input = cost?.input;
      if (input == null || !isValidCost(input)) continue;
      const candidate = {
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
      };
      const cur = selected.get(modelName);
      if (!cur || shouldPrefer(cur, candidate)) {
        selected.set(modelName, candidate);
      }
    }
  }

  const out = new Map();
  for (const [name, c] of selected) {
    out.set(name, {
      input_per_m: c.input,
      output_per_m: c.output,
      cache_read_per_m: c.cache,
      provider: c.provider,
    });
  }
  return out;
}

export function listOfficialModelKeys(prices) {
  return [...prices.keys()].sort((a, b) => b.length - a.length);
}
