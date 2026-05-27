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

import { getUsdExchangeRate } from '../render';

/** Convert vendor-native /1M price to system USD for display formatting. */
export function officialUsdPerM(perM, currency) {
  if (currency === 'CNY') {
    return perM / getUsdExchangeRate();
  }
  return perM;
}

/**
 * Format official list price using the same token unit and currency selector as platform prices.
 * Native CNY/USD is normalized to USD first, then passed through `displayPrice`.
 */
export function formatOfficialTokenPrice(
  perM,
  tokenUnit,
  displayPrice,
  currency,
  precision = 4,
) {
  if (perM == null || perM <= 0) return null;
  const unitDivisor = tokenUnit === 'K' ? 1000 : 1;
  const usdPerM = officialUsdPerM(perM, currency);
  const rawDisplayPrice = displayPrice(usdPerM);
  const match = rawDisplayPrice.match(/^([^\d]*)([\d.]+)/);
  if (!match) return rawDisplayPrice;
  const symbol = match[1];
  const numericPrice = parseFloat(match[2]) / unitDivisor;
  return `${symbol}${numericPrice.toFixed(precision)}`;
}
