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

import { QUOTA_TYPE_TOKEN } from './constants';
import { listOfficialModelKeys } from './models-dev';
import { resolveOfficialModelKey } from './resolve-official-key';

function getMinGroupRatio(enableGroups, groupRatio) {
  let min = Number.POSITIVE_INFINITY;
  for (const group of enableGroups) {
    const r = groupRatio[group];
    if (r !== undefined && r < min) min = r;
  }
  return min === Number.POSITIVE_INFINITY ? 1 : min;
}

export function platformInputUSDPerM(model, groupRatio) {
  if (model.quota_type !== QUOTA_TYPE_TOKEN) return 0;
  const minRatio = getMinGroupRatio(model.enable_groups ?? [], groupRatio);
  return model.model_ratio * 2 * minRatio;
}

function lookupOfficial(canonical, official) {
  if (official.has(canonical)) return official.get(canonical);
  const lower = canonical.toLowerCase();
  for (const [k, v] of official) {
    if (k.toLowerCase() === lower) return v;
  }
  return undefined;
}

export function buildOfficialPriceByModels(models, groupRatio, official) {
  const keys = listOfficialModelKeys(official);
  const map = new Map();

  for (const model of models) {
    if (model.quota_type !== QUOTA_TYPE_TOKEN) continue;
    const name = model.model_name;
    if (!name) continue;

    const canonical = resolveOfficialModelKey(name, keys);
    if (!canonical) continue;

    const off = lookupOfficial(canonical, official);
    if (!off?.input_per_m) continue;

    const platformIn = platformInputUSDPerM(model, groupRatio);
    let discount = null;
    if (off.input_per_m > 0 && platformIn > 0) {
      discount = (1 - platformIn / off.input_per_m) * 100;
    }

    map.set(name, {
      canonicalKey: canonical,
      officialInputPerM: off.input_per_m,
      officialOutputPerM: off.output_per_m,
      discountPercent: discount,
    });
  }

  return map;
}
