import { Export, Plus } from '@phosphor-icons/react'
import { Tile } from './Tile'

export function SendToClientSection() {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Send to a client</p>
      <div className="flex w-full gap-2">
        <Tile
          width={181}
          imgHeight={179}
          seed="share-property"
          title={
            <>
              Share
              <br />
              Property
            </>
          }
          icon={<Export size={20} />}
        />
        <Tile
          width={181}
          imgHeight={179}
          seed="buyer-search"
          title={
            <>
              Add to Buyer
              <br />
              Search
            </>
          }
          icon={<Plus size={20} />}
        />
      </div>
    </div>
  )
}
