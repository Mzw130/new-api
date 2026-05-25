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
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'
import { formatBillingCurrencyFromUSD } from '@/lib/currency'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { OfficialPriceChange } from '../../types-official-price'

function formatUsd(value: number): string {
  return formatBillingCurrencyFromUSD(value, {
    digitsLarge: 4,
    digitsSmall: 4,
  })
}

function ChangeRow({ change }: { change: OfficialPriceChange }) {
  const { t } = useTranslation()
  const up = change.new_value > change.old_value
  const fieldLabel =
    change.field === 'output'
      ? t('Output price')
      : t('Input price')

  return (
    <li className='rounded-lg border px-3 py-2.5 text-sm'>
      <div className='flex flex-wrap items-start justify-between gap-2'>
        <div className='min-w-0'>
          <p className='font-medium'>{change.canonical_key}</p>
          <p className='text-muted-foreground text-xs'>{fieldLabel}</p>
        </div>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium tabular-nums',
            up ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
          )}
        >
          {up ? (
            <TrendingUp className='size-3.5' />
          ) : (
            <TrendingDown className='size-3.5' />
          )}
          {change.change_pct > 0 ? '+' : ''}
          {change.change_pct.toFixed(1)}%
        </div>
      </div>
      <div className='text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs tabular-nums'>
        <span>
          {t('Previous')}: {formatUsd(change.old_value)}
        </span>
        <span>
          {t('Current')}: {formatUsd(change.new_value)}
        </span>
      </div>
    </li>
  )
}

type OfficialPriceAlertDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  changes: OfficialPriceChange[]
  onAcknowledge: () => void
  onDismiss: () => void
  isAcking?: boolean
}

export function OfficialPriceAlertDialog({
  open,
  onOpenChange,
  changes,
  onAcknowledge,
  onDismiss,
  isAcking,
}: OfficialPriceAlertDialogProps) {
  const { t } = useTranslation()

  const handleDismiss = () => {
    onDismiss()
    onOpenChange(false)
  }

  const handleAck = () => {
    onAcknowledge()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[85dvh] max-w-lg overflow-hidden sm:max-w-xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <AlertTriangle className='size-5 text-amber-500' />
            {t('Official price change alert')}
          </DialogTitle>
          <DialogDescription>
            {t(
              'Vendor list prices on models.dev changed since your last acknowledged baseline. Review before updating ratios.'
            )}
          </DialogDescription>
        </DialogHeader>

        <ul className='hover-scrollbar max-h-[50dvh] space-y-2 overflow-y-auto pr-1'>
          {changes.map((change) => (
            <ChangeRow
              key={`${change.canonical_key}-${change.field}`}
              change={change}
            />
          ))}
        </ul>

        <DialogFooter className='gap-2 sm:gap-0'>
          <Button type='button' variant='outline' onClick={handleDismiss}>
            {t('Dismiss for now')}
          </Button>
          <Button type='button' onClick={handleAck} disabled={isAcking}>
            {t('Acknowledge and update baseline')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
