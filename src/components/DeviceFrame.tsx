import type { ReactNode } from 'react'

const WIDTH = 402
const HEIGHT = 874
const BEZEL = 14

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
      className="relative shrink-0 rounded-[55px] bg-[#1a1a1a] shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      style={{ width: WIDTH + BEZEL * 2, height: HEIGHT + BEZEL * 2, padding: BEZEL }}
    >
      <div
        className="relative overflow-hidden rounded-[41px] bg-white"
        style={{ width: WIDTH, height: HEIGHT }}
      >
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none]">
          {children}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20">{header}</div>

        <div
          className="absolute left-1/2 top-[13px] z-30 h-[32px] w-[100px] -translate-x-1/2 rounded-full bg-black"
          aria-hidden
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">{dock}</div>
      </div>
    </div>
  )
}
