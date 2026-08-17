import { X } from '@phosphor-icons/react'
import { StatusBar } from './StatusBar'
import { GlassButton } from './GlassButton'
import propertyPhoto from '../assets/images/property-photo.png'

export function PhotoViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`absolute inset-0 bg-[#121212] transition-opacity duration-200 ease-out ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="flex flex-col">
        <StatusBar />
        <div className="flex h-[44px] items-center px-3">
          <GlassButton variant="dark" aria-label="Close" onClick={onClose} className="size-10">
            <X size={17} color="var(--content-inverse)" />
          </GlassButton>
        </div>
      </div>

      <div className="absolute inset-x-0 overflow-hidden" style={{ top: 216, height: 442 }}>
        <img src={propertyPhoto} alt="780 Correa Way" className="size-full object-cover" />
      </div>

      <div className="absolute inset-x-6 flex flex-col gap-1 text-[var(--content-inverse)]" style={{ top: 690 }}>
        <p className="text-[18px] font-bold leading-[1.48]">1 of 23</p>
        <p className="text-[18px] leading-[1.48]">Updated May 7, 2026</p>
      </div>
    </div>
  )
}
