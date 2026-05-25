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
import { useState } from 'react'
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { formatBillingCurrencyFromUSD } from '@/lib/currency'
import { getLobeIcon } from '@/lib/lobe-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty'
import { Skeleton } from '@/components/ui/skeleton'
import type { OfficialCompareRow } from '../types-official'

function formatUsdPerM(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value) || value <= 0) return '—'
  return formatBillingCurrencyFromUSD(value, { digitsLarge: 4, digitsSmall: 4 })
}

function SavingsBadge({ percent }: { percent: number | null | undefined }) {
  const { t } = useTranslation()
  if (percent == null || Number.isNaN(percent)) return null
  const positive = percent > 0
  return (
    <Badge
      variant={positive ? 'default' : 'secondary'}
      className={cn(
        'tabular-nums',
        positive && 'bg-emerald-600/90 hover:bg-emerald-600'
      )}
    >
      {positive
        ? t('Save {{percent}}%', { percent: percent.toFixed(1) })
        : t('{{percent}}% vs official', { percent: percent.toFixed(1) })}
    </Badge>
  )
}

function ModelCell({ row }: { row: OfficialCompareRow }) {
  const { t } = useTranslation()
  const Icon = getLobeIcon(row.canonical_key)
  return (
    <div className='flex min-w-0 items-center gap-2.5'>
      {Icon ? (
        <Icon className='size-7 shrink-0 rounded-md' />
      ) : (
        <div className='bg-muted size-7 shrink-0 rounded-md' />
      )}
      <div className='min-w-0'>
        <p className='truncate font-medium'>{row.canonical_key}</p>
        {row.variant_count > 1 && (
          <p className='text-muted-foreground text-xs'>
            {t('{{count}} routed variants', { count: row.variant_count })}
          </p>
        )}
      </div>
    </div>
  )
}

function VariantList({ row }: { row: OfficialCompareRow }) {
  const { t } = useTranslation()
  const variants = row.variants ?? []
  if (variants.length <= 1) return null

  return (
    <ul className='text-muted-foreground border-t bg-muted/30 space-y-1 px-4 py-2 text-xs'>
      {variants.map((v) => (
        <li
          key={v.model_name}
          className='flex flex-wrap items-center justify-between gap-2'
        >
          <span className='font-mono'>{v.model_name}</span>
          <span className='tabular-nums'>
            {t('Platform')}: {formatUsdPerM(v.input_per_m)}
          </span>
        </li>
      ))}
    </ul>
  )
}

type OfficialCompareTableProps = {
  rows: OfficialCompareRow[]
  isLoading: boolean
  source?: string
}

export function OfficialCompareTable({
  rows,
  isLoading,
  source,
}: OfficialCompareTableProps) {
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  if (isLoading) {
    return (
      <div className='space-y-2 rounded-xl border p-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className='h-14 w-full' />
        ))}
      </div>
    )
  }

  if (rows.length === 0) {
    return (
      <Empty className='rounded-xl border py-16'>
        <EmptyHeader>
          <EmptyTitle>{t('No models to compare')}</EmptyTitle>
          <EmptyDescription>
            {t(
              'No token-based models matched official pricing data. Try another search.'
            )}
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <div className='overflow-hidden rounded-xl border'>
      <div className='bg-muted/40 flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5 text-xs'>
        <span className='text-muted-foreground'>
          {t('Official prices from {{source}}', {
            source: source || 'models.dev',
          })}
        </span>
        <Button variant='ghost' size='sm' className='h-7 gap-1 text-xs' asChild>
          <a
            href='https://models.dev'
            target='_blank'
            rel='noopener noreferrer'
          >
            models.dev
            <ExternalLink className='size-3' />
          </a>
        </Button>
      </div>

      <div className='hidden md:grid md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))_auto] md:gap-4 md:border-b md:px-4 md:py-2.5'>
        <span className='text-muted-foreground text-xs font-medium'>
          {t('Model')}
        </span>
        <span className='text-muted-foreground text-xs font-medium'>
          {t('Official input / 1M')}
        </span>
        <span className='text-muted-foreground text-xs font-medium'>
          {t('Platform input / 1M')}
        </span>
        <span className='text-muted-foreground text-xs font-medium'>
          {t('Official output / 1M')}
        </span>
        <span className='text-muted-foreground text-right text-xs font-medium'>
          {t('Savings')}
        </span>
      </div>

      <ul className='divide-y'>
        {rows.map((row) => {
          const hasVariants = (row.variants?.length ?? 0) > 1
          const isOpen = expanded[row.canonical_key]
          return (
            <li key={row.canonical_key}>
              <div
                className={cn(
                  'grid gap-3 px-4 py-3 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))_auto] md:items-center md:gap-4',
                  hasVariants && 'cursor-pointer'
                )}
                onClick={() => {
                  if (!hasVariants) return
                  setExpanded((prev) => ({
                    ...prev,
                    [row.canonical_key]: !prev[row.canonical_key],
                  }))
                }}
                onKeyDown={(e) => {
                  if (!hasVariants || e.key !== 'Enter') return
                  setExpanded((prev) => ({
                    ...prev,
                    [row.canonical_key]: !prev[row.canonical_key],
                  }))
                }}
                role={hasVariants ? 'button' : undefined}
                tabIndex={hasVariants ? 0 : undefined}
              >
                <div className='flex items-center gap-1'>
                  {hasVariants ? (
                    isOpen ? (
                      <ChevronDown className='text-muted-foreground size-4 shrink-0' />
                    ) : (
                      <ChevronRight className='text-muted-foreground size-4 shrink-0' />
                    )
                  ) : (
                    <span className='size-4 shrink-0' />
                  )}
                  <ModelCell row={row} />
                </div>
                <div className='md:contents'>
                  <div className='flex justify-between gap-2 md:block'>
                    <span className='text-muted-foreground text-xs md:hidden'>
                      {t('Official input / 1M')}
                    </span>
                    <span className='tabular-nums text-sm font-medium'>
                      {formatUsdPerM(row.official?.input_per_m)}
                    </span>
                  </div>
                  <div className='flex justify-between gap-2 md:block'>
                    <span className='text-muted-foreground text-xs md:hidden'>
                      {t('Platform input / 1M')}
                    </span>
                    <span className='tabular-nums text-sm font-medium'>
                      {formatUsdPerM(row.platform_input_per_m)}
                    </span>
                  </div>
                  <div className='flex justify-between gap-2 md:block'>
                    <span className='text-muted-foreground text-xs md:hidden'>
                      {t('Official output / 1M')}
                    </span>
                    <span className='tabular-nums text-sm'>
                      {formatUsdPerM(row.official?.output_per_m)}
                    </span>
                  </div>
                  <div className='flex justify-end md:items-center'>
                    {row.official ? (
                      <SavingsBadge percent={row.discount_percent} />
                    ) : (
                      <Badge variant='outline' className='text-xs'>
                        {t('No official match')}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              {isOpen && hasVariants ? (
                <VariantList row={row} />
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
