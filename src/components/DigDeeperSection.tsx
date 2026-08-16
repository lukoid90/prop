import { ArrowRight } from '@phosphor-icons/react'
import { Tile } from './Tile'
import getComps from '../assets/images/tile-get-comps.png'
import getUnderbuilt from '../assets/images/tile-get-underbuilt.png'

export function DigDeeperSection() {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Dig-in deeper</p>
      <div className="flex w-full gap-2">
        <Tile width={181} imgHeight={179} image={getComps} alt="Get Comps" title="Get Comps" icon={<ArrowRight size={20} />} />
        <Tile
          width={181}
          imgHeight={179}
          image={getUnderbuilt}
          alt="Get Underbuilt"
          title="Get Underbuilt"
          icon={<ArrowRight size={20} />}
        />
      </div>
    </div>
  )
}
