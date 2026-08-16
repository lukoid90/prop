import type { ReactNode } from 'react'

const WIDTH = 402
const HEIGHT = 874
const BEZEL = 9

const FRAME_GRADIENT =
  'linear-gradient(155deg, #3a3a3d 0%, #1c1c1e 12%, #101012 50%, #1c1c1e 88%, #3a3a3d 100%)'

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

export function DeviceFrame({
  header,
  dock,
  overlay,
  children,
}: {
  header: ReactNode
  dock: ReactNode
  overlay?: ReactNode
  children: ReactNode
}) {
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
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none]">
          {children}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">{header}</div>

        <div
          className="absolute left-1/2 top-[11px] z-30 h-[37px] w-[126px] -translate-x-1/2 rounded-full bg-black"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">{dock}</div>

        {overlay && <div className="absolute inset-0 z-40">{overlay}</div>}
      </div>
    </div>
  )
}
