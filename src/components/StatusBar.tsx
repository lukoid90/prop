import { CellSignalFull, WifiHigh, BatteryFull } from '@phosphor-icons/react'

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'var(--content-primary)' : 'var(--content-inverse)'
  return (
    <div className="flex h-[44px] w-full shrink-0 items-center justify-between px-[22px] pt-[14px]" style={{ color }}>
      <span className="text-[15px] font-bold tracking-[-0.3px]">9:41</span>
      <div className="flex items-center gap-[6px]">
        <CellSignalFull size={17} weight="fill" />
        <WifiHigh size={17} weight="fill" />
        <BatteryFull size={20} weight="fill" />
      </div>
    </div>
  )
}
