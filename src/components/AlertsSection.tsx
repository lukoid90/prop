import { Plus } from '@phosphor-icons/react'
import { Tile } from './Tile'

const ALERTS = ['Price Drop', 'Status Change', 'Price Bump', 'Listing Refresh', 'Stale Listing', 'Seller Activity']

export function AlertsSection() {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <p className="w-full px-4 text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Get alerts</p>
      <div className="flex w-full gap-3 overflow-x-auto px-4 [scrollbar-width:none]">
        {ALERTS.map((title) => (
          <Tile
            key={title}
            width={166}
            imgHeight={163}
            seed={`alert-${title}`}
            eyebrow="Get an alert"
            title={title}
            icon={<Plus size={20} />}
          />
        ))}
      </div>
    </div>
  )
}
