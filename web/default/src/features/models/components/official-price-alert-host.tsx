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
import { useEffect, useState } from 'react'
import { useOfficialPriceAlerts } from '../hooks/use-official-price-alerts'
import { OfficialPriceAlertDialog } from './dialogs/official-price-alert-dialog'

type OfficialPriceAlertHostProps = {
  enabled: boolean
}

export function OfficialPriceAlertHost({ enabled }: OfficialPriceAlertHostProps) {
  const {
    changes,
    shouldShowAlert,
    dismiss,
    acknowledge,
    isAcking,
  } = useOfficialPriceAlerts(enabled)

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (shouldShowAlert) {
      setOpen(true)
    }
  }, [shouldShowAlert])

  if (!enabled || changes.length === 0) {
    return null
  }

  return (
    <OfficialPriceAlertDialog
      open={open}
      onOpenChange={setOpen}
      changes={changes}
      onDismiss={dismiss}
      onAcknowledge={acknowledge}
      isAcking={isAcking}
    />
  )
}
