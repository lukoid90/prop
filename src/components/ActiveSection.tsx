import { PencilSimple } from '@phosphor-icons/react'
import { NotepadRow } from './NotepadRow'
import statusChange from '../assets/images/tile-status-change.png'
import priceDrop from '../assets/images/tile-price-drop.png'
import type { PriceDropAlertEntry, StatusAlertEntry } from '../types'

const ROW_BG = '#eff2f1'

function describeAlert(alert: PriceDropAlertEntry) {
  return alert.unit === '%' ? `${alert.value}% drop` : `$${alert.value.toLocaleString()} drop`
}

function describeStatusAlert(alert: StatusAlertEntry) {
  return alert.statuses.length === 4 ? 'Any status change' : alert.statuses.join(', ')
}

export function ActiveSection({
  priceDropAlert,
  statusAlert,
  onEditPriceDropAlert,
  onEditStatusAlert,
}: {
  priceDropAlert: PriceDropAlertEntry | null
  statusAlert: StatusAlertEntry | null
  onEditPriceDropAlert: () => void
  onEditStatusAlert: () => void
}) {
  if (!priceDropAlert && !statusAlert) return null

  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Active</p>
      <div className="flex w-full flex-col gap-4">
        {priceDropAlert && (
          <NotepadRow
            avatarImage={priceDrop}
            topLine={{ text: priceDropAlert.date, size: 'small' }}
            bottomLine={{ text: describeAlert(priceDropAlert), size: 'large' }}
            background={ROW_BG}
            action={
              <button type="button" onClick={onEditPriceDropAlert} aria-label="Edit price drop alert">
                <PencilSimple size={20} />
              </button>
            }
          />
        )}
        {statusAlert && (
          <NotepadRow
            avatarImage={statusChange}
            topLine={{ text: statusAlert.date, size: 'small' }}
            bottomLine={{ text: describeStatusAlert(statusAlert), size: 'large' }}
            background={ROW_BG}
            action={
              <button type="button" onClick={onEditStatusAlert} aria-label="Edit status change alert">
                <PencilSimple size={20} />
              </button>
            }
          />
        )}
      </div>
    </div>
  )
}
