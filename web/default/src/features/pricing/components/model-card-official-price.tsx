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
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { formatBillingCurrencyFromUSD } from '@/lib/currency'
import { Badge } from '@/components/ui/badge'
import type { ModelOfficialPrice } from '../lib/official-price-map'
import type { TokenUnit } from '../types'

function usdPerUnit(
  perM: number | undefined,
  tokenUnit: TokenUnit
): number | undefined {
  if (perM == null || perM <= 0) return undefined
  return tokenUnit === 'K' ? perM / 1000 : perM
}

function formatOfficial(
  perM: number | undefined,
  tokenUnit: TokenUnit
): string | null {
  const amount = usdPerUnit(perM, tokenUnit)
  if (amount == null) return null
  return formatBillingCurrencyFromUSD(amount, {
    digitsLarge: 4,
    digitsSmall: 4,
  })
}

type ModelCardOfficialPriceProps = {
  official: ModelOfficialPrice
  tokenUnit: TokenUnit
  className?: string
}

export function ModelCardOfficialPrice({
  official,
  tokenUnit,
  className,
}: ModelCardOfficialPriceProps) {
  const { t } = useTranslation()
  const unitLabel = tokenUnit === 'K' ? '1K' : '1M'
  const inputLabel = formatOfficial(official.officialInputPerM, tokenUnit)
  const outputLabel = formatOfficial(official.officialOutputPerM, tokenUnit)

  if (!inputLabel && !outputLabel) {
    return null
  }

  const discount = official.discountPercent
  const showSavings =
    discount != null && !Number.isNaN(discount) && discount > 0.05

  return (
    <div
      className={cn(
        'border-border/60 mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 border-t pt-1.5 text-[11px] sm:mt-2 sm:text-xs',
        className
      )}
    >
      <span className='text-muted-foreground/80 shrink-0 font-medium'>
        {t('Official')}
      </span>
      {inputLabel ? (
        <span className='text-muted-foreground whitespace-nowrap'>
          {t('Input')}{' '}
          <span className='text-muted-foreground/90 font-mono'>
            {inputLabel}
          </span>
          /{unitLabel}
        </span>
      ) : null}
      {outputLabel ? (
        <span className='text-muted-foreground whitespace-nowrap'>
          {t('Output')}{' '}
          <span className='text-muted-foreground/90 font-mono'>
            {outputLabel}
          </span>
          /{unitLabel}
        </span>
      ) : null}
      {showSavings ? (
        <Badge
          variant='secondary'
          className='h-5 px-1.5 text-[10px] font-medium tabular-nums sm:text-[11px]'
        >
          {t('Save {{percent}}%', { percent: discount.toFixed(0) })}
        </Badge>
      ) : null}
    </div>
  )
}
