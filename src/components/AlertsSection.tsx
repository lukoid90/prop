import { Plus } from '@phosphor-icons/react'
import { Tile } from './Tile'
import priceDrop from '../assets/images/tile-price-drop.png'
import statusChange from '../assets/images/tile-status-change.png'
import priceBump from '../assets/images/tile-price-bump.png'
import listingRefresh from '../assets/images/tile-listing-refresh.png'
import staleListing from '../assets/images/tile-stale-listing.png'
import sellerActivity from '../assets/images/tile-seller-activity.png'

const OTHER_ALERTS = [
  { title: 'Price Bump', image: priceBump },
  { title: 'Listing Refresh', image: listingRefresh },
  { title: 'Stale Listing', image: staleListing },
  { title: 'Seller Activity', image: sellerActivity },
]

export function AlertsSection({
  onOpenPriceDropAlert,
  onOpenStatusAlert,
  hasPriceDropAlert,
  hasStatusAlert,
}: {
  onOpenPriceDropAlert: () => void
  onOpenStatusAlert: () => void
  hasPriceDropAlert: boolean
  hasStatusAlert: boolean
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <p className="w-full px-4 text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Get alerts</p>
      <div className="flex w-full gap-3 overflow-x-auto px-4 [scrollbar-width:none]">
        {!hasPriceDropAlert && (
          <button type="button" onClick={onOpenPriceDropAlert} className="shrink-0 text-left">
            <Tile
              width={166}
              imgHeight={163}
              image={priceDrop}
              alt="Price Drop"
              eyebrow="Get an alert"
              title="Price Drop"
              icon={<Plus size={20} />}
            />
          </button>
        )}
        {!hasStatusAlert && (
          <button type="button" onClick={onOpenStatusAlert} className="shrink-0 text-left">
            <Tile
              width={166}
              imgHeight={163}
              image={statusChange}
              alt="Status Change"
              eyebrow="Get an alert"
              title="Status Change"
              icon={<Plus size={20} />}
            />
          </button>
        )}
        {OTHER_ALERTS.map(({ title, image }) => (
          <Tile
            key={title}
            width={166}
            imgHeight={163}
            image={image}
            alt={title}
            eyebrow="Get an alert"
            title={title}
            icon={<Plus size={20} />}
          />
        ))}
      </div>
    </div>
  )
}
