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
import { formatBillingCurrencyFromUSD, getCurrencyDisplay } from '@/lib/currency'
import type { OfficialPriceCurrency } from '../types-official'
import type { TokenUnit } from '../types'

function perUnitAmount(
  perM: number | undefined,
  tokenUnit: TokenUnit
): number | undefined {
  if (perM == null || perM <= 0) return undefined
  return tokenUnit === 'K' ? perM / 1000 : perM
}

/** Convert vendor-native /1M price to system USD for display formatting. */
export function getUsdExchangeRate(): number {
  const { config } = getCurrencyDisplay()
  const rate = config.usdExchangeRate
  if (Number.isFinite(rate) && rate > 0) return rate
  return 7
}

export function officialUsdPerM(
  perM: number,
  currency: OfficialPriceCurrency | undefined
): number {
  if (currency === 'CNY') {
    return perM / getUsdExchangeRate()
  }
  return perM
}

/**
 * Format official list price per token unit (K or M).
 * Native CNY/USD is normalized to USD first, then shown in the user's selected display currency.
 */
export function formatOfficialPerM(
  perM: number | undefined,
  currency: OfficialPriceCurrency | undefined,
  tokenUnit: TokenUnit
): string | null {
  if (perM == null || perM <= 0) return null
  const amount = perUnitAmount(officialUsdPerM(perM, currency), tokenUnit)
  if (amount == null) return null

  return formatBillingCurrencyFromUSD(amount, {
    digitsLarge: 4,
    digitsSmall: 4,
  })
}
