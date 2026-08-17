import { useState, type ReactNode } from 'react'

const WIDTH = 402
const HEIGHT = 874
const BEZEL = 9

const FRAME_GRADIENT =
  'linear-gradient(155deg, #3a3a3d 0%, #1c1c1e 12%, #101012 50%, #1c1c1e 88%, #3a3a3d 100%)'

// Hero photo is 442px tall; the header covers the top 106px of the screen, so
// the photo has fully scrolled past the header once scrollTop reaches 442-106.
const HERO_HEIGHT = 442
const HEADER_HEIGHT = 106
const FADE_SPAN = 70
const FADE_END = HERO_HEIGHT - HEADER_HEIGHT + FADE_SPAN / 2
const FADE_START = FADE_END - FADE_SPAN

function SideButton({ side, top, height }: { side: 'left' | 'right'; top: number; height: number }) {
  return (
    <div
      className="absolute w-[3px] rounded-[2px]"
      style={{
        [side]: -3,
        top,
        height,
        background: 'linear-gradient(90deg, #0a0a0b, #2b2b2e)',
        boxShadow: side === 'left' ? '-1px 0 1px rgba(0,0,0,0.4)' : '1px 0 1px rgba(0,0,0,0.4)',
      }}
      aria-hidden
    />
  )
}

const CONTENT_SCROLLED_THRESHOLD = 8

export function DeviceFrame({
  header,
  dock,
  overlay,
  children,
}: {
  header: (scrollProgress: number, contentScrolled: boolean) => ReactNode
  dock: ReactNode
  overlay?: ReactNode
  children: ReactNode
}) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [contentScrolled, setContentScrolled] = useState(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const y = e.currentTarget.scrollTop
    const t = Math.min(1, Math.max(0, (y - FADE_START) / (FADE_END - FADE_START)))
    setScrollProgress(t)
    setContentScrolled(y > CONTENT_SCROLLED_THRESHOLD)
  }

  return (
    <div
      className="relative shrink-0 rounded-[62px] shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      style={{ width: WIDTH + BEZEL * 2, height: HEIGHT + BEZEL * 2, padding: BEZEL, background: FRAME_GRADIENT }}
    >
      {/* Action button */}
      <SideButton side="left" top={94} height={28} />
      {/* Volume up / down */}
      <SideButton side="left" top={140} height={56} />
      <SideButton side="left" top={204} height={56} />
      {/* Power button */}
      <SideButton side="right" top={168} height={92} />

      <div
        className="relative overflow-hidden rounded-[53px] bg-white ring-1 ring-black/80"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <div
          className="absolute inset-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none]"
          onScroll={handleScroll}
        >
          {children}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">{header(scrollProgress, contentScrolled)}</div>

        <div
          className="absolute left-1/2 top-[11px] z-30 h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">{dock}</div>

        <div className="pointer-events-none absolute inset-0 z-40">{overlay}</div>
      </div>
    </div>
  )
}
