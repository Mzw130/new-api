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
import { Badge } from '@/components/ui/badge'
import { formatOfficialPerM } from '../lib/format-official-price'
import type { ModelOfficialPrice } from '../lib/official-price-map'
import type { TokenUnit } from '../types'

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
  const inputLabel = formatOfficialPerM(
    official.officialInputPerM,
    official.officialCurrency,
    tokenUnit
  )
  const outputLabel = formatOfficialPerM(
    official.officialOutputPerM,
    official.officialCurrency,
    tokenUnit
  )

  if (!inputLabel && !outputLabel) {
    return null
  }

  const discount = official.discountPercent
  const canShowSavings =
    discount != null && !Number.isNaN(discount)
  const savePercent = canShowSavings ? Math.max(0, discount) : null

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
      {savePercent != null ? (
        <Badge
          variant={savePercent > 0 ? 'default' : 'secondary'}
          className={cn(
            'h-5 px-1.5 text-[10px] font-medium tabular-nums sm:text-[11px]',
            savePercent > 0 && 'bg-emerald-600/90 hover:bg-emerald-600'
          )}
        >
          {t('Save {{percent}}%', { percent: savePercent.toFixed(0) })}
        </Badge>
      ) : null}
    </div>
  )
}
