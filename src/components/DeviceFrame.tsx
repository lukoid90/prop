import type { ReactNode } from 'react'

const WIDTH = 402
const HEIGHT = 874
const BEZEL = 13

const FRAME_GRADIENT =
  'linear-gradient(155deg, #f4f3f1 0%, #d8d6d2 8%, #b7b4ae 22%, #d4d1cc 38%, #c2bfb9 52%, #e6e4e0 68%, #b0ada7 84%, #dedcd7 100%)'

function SideButton({ side, top, height }: { side: 'left' | 'right'; top: number; height: number }) {
  return (
    <div
      className="absolute w-[3.5px] rounded-[2px]"
      style={{
        [side]: -3.5,
        top,
        height,
        background: 'linear-gradient(90deg, #8f8c86, #e2dfda, #a09d97)',
        boxShadow: side === 'left' ? '-1px 0 1px rgba(0,0,0,0.25)' : '1px 0 1px rgba(0,0,0,0.25)',
      }}
      aria-hidden
    />
  )
}

export function DeviceFrame({
  header,
  dock,
  children,
}: {
  header: ReactNode
  dock: ReactNode
  children: ReactNode
}) {
  return (
    <div
      className="relative shrink-0 rounded-[64px] shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      style={{
        width: WIDTH + BEZEL * 2,
        height: HEIGHT + BEZEL * 2,
        padding: BEZEL,
        background: FRAME_GRADIENT,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.5), inset 0 1px 3px rgba(255,255,255,0.6), 0 30px 60px rgba(0,0,0,0.35)',
      }}
    >
      {/* Action button */}
      <SideButton side="left" top={94} height={28} />
      {/* Volume up / down */}
      <SideButton side="left" top={140} height={56} />
      <SideButton side="left" top={204} height={56} />
      {/* Power button */}
      <SideButton side="right" top={168} height={92} />

      <div
        className="relative overflow-hidden rounded-[51px] bg-white"
        style={{ width: WIDTH, height: HEIGHT, boxShadow: 'inset 0 0 0 2.5px #000' }}
      >
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none]">
          {children}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">{header}</div>

        <div
          className="absolute left-1/2 top-[11px] z-30 flex h-[37px] w-[126px] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-2"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
          aria-hidden
        >
          <div
            className="size-[9px] rounded-full"
            style={{
              background: 'radial-gradient(circle at 35% 30%, #6b7c8c 0%, #26313a 45%, #0a0d10 100%)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">{dock}</div>
      </div>
    </div>
  )
}
