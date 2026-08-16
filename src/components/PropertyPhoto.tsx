import { Camera } from '@phosphor-icons/react'
import { PhotoPlaceholder } from './Placeholders'
import { GlassButton } from './GlassButton'

export function PropertyPhoto() {
  return (
    <div className="relative h-[442px] w-full overflow-hidden rounded-2xl">
      <PhotoPlaceholder seed="property-hero" className="size-full" iconSize={56} />
      <GlassButton variant="dark" className="absolute bottom-[14px] right-[12px] h-8 gap-1 px-[10px]">
        <Camera size={16} color="var(--content-inverse)" />
        <span className="text-[16px] leading-[1.26] tracking-[0.25px] text-[var(--content-inverse)]">23</span>
      </GlassButton>
    </div>
  )
}
