import { ArrowLeft, DotsThree } from '@phosphor-icons/react'
import { StatusBar } from './StatusBar'
import { GlassButton } from './GlassButton'
import { PropertyNav } from './PropertyNav'
import { ProgressiveBlur } from './ProgressiveBlur'

const DARK_HEIGHT = 106
const LIGHT_HEIGHT = 158

function TrailingButton({
  activeTab,
  specsDirty,
  onSaveChanges,
}: {
  activeTab: string
  specsDirty: boolean
  onSaveChanges: () => void
}) {
  if (activeTab === 'Specs') {
    return (
      <button
        type="button"
        onClick={onSaveChanges}
        disabled={!specsDirty}
        className="pointer-events-auto flex h-10 items-center justify-center rounded-full px-4"
        style={specsDirty ? { background: 'var(--button-background-primary,#121212)' } : undefined}
      >
        <span
          className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px]"
          style={{ color: specsDirty ? 'var(--content-inverse)' : 'var(--content-tertiary)' }}
        >
          Save changes
        </span>
      </button>
    )
  }

  return null
}

export function Header({
  scrollProgress,
  contentScrolled,
  activeTab,
  onTabChange,
  onOpenMenu,
  specsDirty,
  onSaveChanges,
}: {
  scrollProgress: number
  contentScrolled: boolean
  activeTab: string
  onTabChange: (tab: string) => void
  onOpenMenu: () => void
  specsDirty: boolean
  onSaveChanges: () => void
}) {
  const scrolled = scrollProgress > 0.5
  const showTitleBarRow = activeTab === 'Specs' || activeTab === 'Records' || activeTab === 'Owners'

  return (
    <div className="relative w-full" style={{ height: LIGHT_HEIGHT }}>
      {/* Over the hero photo: translucent dark scrim, back/more buttons, address title */}
      <div
        className="absolute inset-x-0 top-0 transition-opacity duration-100 ease-out"
        style={{ height: DARK_HEIGHT, opacity: 1 - scrollProgress, pointerEvents: scrolled ? 'none' : 'auto' }}
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
              <ArrowLeft size={17} color="var(--content-primary)" />
            </GlassButton>
            <div className="flex flex-col items-center gap-0.5 text-center text-[var(--content-inverse)]">
              <p className="text-[14px] font-bold leading-[1.26] tracking-[-0.5px]">780 Correa Way, MO 42802</p>
              <p className="text-[14px] leading-[1.26] tracking-[-0.5px]">Listed for $1m • May 28</p>
            </div>
            <GlassButton onClick={onOpenMenu} aria-label="More options" className="pointer-events-auto size-10 shrink-0">
              <DotsThree size={17} weight="bold" color="var(--content-primary)" />
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Past the hero photo: light bar with the section tabs pinned in place. The
          frosted fill only shows once content has actually scrolled underneath it. */}
      <div
        className="absolute inset-x-0 top-0 overflow-hidden rounded-b-[24px] transition-opacity duration-100 ease-out"
        style={{ height: LIGHT_HEIGHT, opacity: scrollProgress, pointerEvents: scrolled ? 'auto' : 'none' }}
      >
        <div className="absolute inset-0 transition-opacity duration-200 ease-out" style={{ opacity: contentScrolled ? 1 : 0 }}>
          <ProgressiveBlur startBlur={20} endBlur={10} yStart={0} yEnd={100} />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(253,252,252,0.6), rgba(234,215,210,0.24) 100%)',
            }}
          />
        </div>
        <div className="relative flex flex-col">
          <StatusBar dark />
          {showTitleBarRow && (
            <div className="flex items-center justify-between px-3 pb-2 pt-3">
              <GlassButton className="pointer-events-auto size-10 shrink-0">
                <ArrowLeft size={17} color="var(--content-primary)" />
              </GlassButton>
              <TrailingButton activeTab={activeTab} specsDirty={specsDirty} onSaveChanges={onSaveChanges} />
            </div>
          )}
          <PropertyNav active={activeTab} onChange={onTabChange} />
        </div>
      </div>
    </div>
  )
}
