import { Camera } from '@phosphor-icons/react'
import { GlassButton } from './GlassButton'
import propertyPhoto from '../assets/images/property-photo.png'

export function PropertyPhoto({ onOpen }: { onOpen: () => void }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen()}
      className="relative h-[442px] w-full cursor-pointer overflow-hidden rounded-2xl"
    >
      <img src={propertyPhoto} alt="780 Correa Way" className="size-full object-cover" />
      <div className="absolute bottom-[14px] right-[12px]">
        <GlassButton variant="dark" className="h-8 gap-1 px-[10px]">
          <Camera size={16} color="var(--content-inverse)" />
          <span className="text-[16px] leading-[1.26] tracking-[0.25px] text-[var(--content-inverse)]">23</span>
        </GlassButton>
      </div>
    </div>
  )
}
