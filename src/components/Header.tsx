import { ArrowLeft, DotsThree } from '@phosphor-icons/react'
import { StatusBar } from './StatusBar'
import { GlassButton } from './GlassButton'
import { PropertyNav } from './PropertyNav'
import { ProgressiveBlur } from './ProgressiveBlur'

export function Header({
  scrollProgress,
  activeTab,
  onTabChange,
}: {
  scrollProgress: number
  activeTab: string
  onTabChange: (tab: string) => void
}) {
  const scrolled = scrollProgress > 0.5

  return (
    <div className="relative w-full" style={{ height: 106 }}>
      {/* Over the hero photo: translucent dark scrim, back/more buttons, address title */}
      <div
        className="absolute inset-0 transition-opacity duration-100 ease-out"
        style={{ opacity: 1 - scrollProgress, pointerEvents: scrolled ? 'none' : 'auto' }}
      >
        <ProgressiveBlur />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(18,18,18,0.16), rgba(18,18,18,0.06) 79%, transparent)',
          }}
        />
        <div className="relative flex flex-col">
          <StatusBar />
          <div className="flex h-[44px] items-center justify-between px-4">
            <GlassButton className="pointer-events-auto size-10 shrink-0">
              <ArrowLeft size={17} color="var(--content-inverse)" />
            </GlassButton>
            <div className="flex flex-col items-center gap-0.5 text-center text-[var(--content-inverse)]">
              <p className="text-[14px] font-bold leading-[1.26] tracking-[-0.5px]">780 Correa Way, MO 42802</p>
              <p className="text-[14px] leading-[1.26] tracking-[-0.5px]">Listed for $1m • May 28</p>
            </div>
            <GlassButton className="pointer-events-auto size-10 shrink-0">
              <DotsThree size={17} weight="bold" color="var(--content-inverse)" />
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Past the hero photo: light frosted bar with the section tabs pinned in place */}
      <div
        className="absolute inset-x-0 top-0 overflow-hidden rounded-b-[24px] transition-opacity duration-100 ease-out"
        style={{ height: 106, opacity: scrollProgress, pointerEvents: scrolled ? 'auto' : 'none' }}
      >
        <ProgressiveBlur />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(253,252,252,0.6), rgba(234,215,210,0.24) 79%)',
          }}
        />
        <div className="relative flex flex-col">
          <StatusBar dark />
          <PropertyNav active={activeTab} onChange={onTabChange} />
        </div>
      </div>
    </div>
  )
}
