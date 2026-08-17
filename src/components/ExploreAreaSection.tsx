import { ArrowsOutSimple } from '@phosphor-icons/react'
import { GlassButton } from './GlassButton'
import mapPreview from '../assets/images/map-preview.jpg'
import propertyPhoto from '../assets/images/property-photo.png'

export function ExploreAreaSection({ onOpenMap }: { onOpenMap: () => void }) {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Explore the area</p>
      <button
        type="button"
        onClick={onOpenMap}
        className="relative h-[270px] w-full overflow-hidden rounded-2xl border border-[var(--border-dimmer)]"
      >
        <img src={mapPreview} alt="Map preview" className="absolute inset-0 size-full object-cover" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex size-12 items-center justify-center overflow-hidden rounded-full border-[3px] border-[var(--border-default)] shadow-[0_0_3px_rgba(0,0,0,0.04),0_12px_12px_rgba(0,0,0,0.08)]">
            <img src={propertyPhoto} alt="" className="size-full object-cover" />
          </div>
        </div>

        <div className="absolute right-[15px] top-[15px]">
          <GlassButton className="size-8">
            <ArrowsOutSimple size={13} color="var(--content-primary)" />
          </GlassButton>
        </div>
      </button>
    </div>
  )
}
