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
  priceDropAlerts,
  statusAlerts,
}: {
  priceDropAlerts: PriceDropAlertEntry[]
  statusAlerts: StatusAlertEntry[]
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Active</p>
      <div className="flex w-full flex-col gap-4">
        {priceDropAlerts.map((alert) => (
          <NotepadRow
            key={alert.id}
            avatarImage={priceDrop}
            topLine={{ text: alert.date, size: 'small' }}
            bottomLine={{ text: describeAlert(alert), size: 'large' }}
            background={ROW_BG}
            action={<PencilSimple size={20} />}
          />
        ))}
        {statusAlerts.map((alert) => (
          <NotepadRow
            key={alert.id}
            avatarImage={statusChange}
            topLine={{ text: alert.date, size: 'small' }}
            bottomLine={{ text: describeStatusAlert(alert), size: 'large' }}
            background={ROW_BG}
            action={<PencilSimple size={20} />}
          />
        ))}
        <NotepadRow
          avatarImage={statusChange}
          topLine={{ text: 'Yesterday', size: 'small' }}
          bottomLine={{ text: 'Status Change', size: 'large' }}
          background={ROW_BG}
          action={<PencilSimple size={20} />}
        />
        <NotepadRow
          avatarImage={priceDrop}
          topLine={{ text: 'Aug 14', size: 'small' }}
          bottomLine={{ text: '1% Price Drop', size: 'large' }}
          background={ROW_BG}
          action={<PencilSimple size={20} />}
        />
      </div>
    </div>
  )
}
