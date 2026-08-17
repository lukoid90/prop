import { Export, Plus } from '@phosphor-icons/react'
import { Tile } from './Tile'
import shareProperty from '../assets/images/tile-share-property.png'
import buyerSearch from '../assets/images/tile-buyer-search.png'

export function SendToClientSection({
  onShareProperty,
  onAddToBuyerSearch,
}: {
  onShareProperty: () => void
  onAddToBuyerSearch: () => void
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Send to a client</p>
      <div className="flex w-full gap-2">
        <Tile
          width={181}
          imgHeight={179}
          image={shareProperty}
          alt="Share Property"
          title={
            <>
              Share
              <br />
              Property
            </>
          }
          icon={<Export size={20} />}
          onClick={onShareProperty}
        />
        <Tile
          width={181}
          imgHeight={179}
          image={buyerSearch}
          alt="Add to Buyer Search"
          title={
            <>
              Add to Buyer
              <br />
              Search
            </>
          }
          icon={<Plus size={20} />}
          onClick={onAddToBuyerSearch}
        />
      </div>
    </div>
  )
}
