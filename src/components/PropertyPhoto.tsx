import { Camera } from '@phosphor-icons/react'
import { GlassButton } from './GlassButton'
import propertyPhoto from '../assets/images/property-photo.png'

export function PropertyPhoto() {
  return (
    <div className="relative h-[442px] w-full overflow-hidden rounded-2xl">
      <img src={propertyPhoto} alt="780 Correa Way" className="size-full object-cover" />
      <GlassButton
        variant="dark"
        width={72}
        height={32}
        padding="8px 12px"
        className="absolute bottom-[14px] right-[12px]"
      >
        <Camera size={16} color="var(--content-inverse)" />
        <span className="text-[16px] leading-[1.26] tracking-[0.25px] text-[var(--content-inverse)]">23</span>
      </GlassButton>
    </div>
  )
}
