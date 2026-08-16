import { Camera } from '@phosphor-icons/react'
import { GlassButton } from './GlassButton'
import propertyPhoto from '../assets/images/property-photo.png'

export function PropertyPhoto() {
  return (
    <div className="relative h-[442px] w-full overflow-hidden rounded-2xl">
      <img src={propertyPhoto} alt="780 Correa Way" className="size-full object-cover" />
      <GlassButton variant="dark" className="absolute bottom-[14px] right-[12px] h-8 gap-1 px-[10px]">
        <Camera size={16} color="var(--content-inverse)" />
        <span className="text-[16px] leading-[1.26] tracking-[0.25px] text-[var(--content-inverse)]">23</span>
      </GlassButton>
    </div>
  )
}
