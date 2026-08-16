function SignalIcon({ color }: { color: string }) {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
      <rect x="0" y="7" width="3" height="5" rx="1" fill={color} />
      <rect x="5" y="5" width="3" height="7" rx="1" fill={color} />
      <rect x="10" y="2.5" width="3" height="9.5" rx="1" fill={color} />
      <rect x="15" y="0" width="3" height="12" rx="1" fill={color} />
    </svg>
  )
}

function WifiIcon({ color }: { color: string }) {
  return (
    <svg width="17" height="13" viewBox="0 0 17 13" fill="none">
      <path d="M8.5 12.4a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Z" fill={color} />
      <path
        d="M4.8 7.9a5.4 5.4 0 0 1 7.4 0"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M1.4 4.4a10.2 10.2 0 0 1 14.2 0"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function BatteryIcon({ color }: { color: string }) {
  return (
    <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
      <rect x="0.75" y="0.75" width="21.5" height="11.5" rx="3.25" stroke={color} strokeOpacity="0.4" />
      <rect x="2.25" y="2.25" width="18.5" height="8.5" rx="2" fill={color} />
      <path d="M23.5 4.5c.83 0 1.5.9 1.5 2s-.67 2-1.5 2v-4Z" fill={color} fillOpacity="0.4" />
    </svg>
  )
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  const color = dark ? 'var(--content-primary)' : 'var(--content-inverse)'
  return (
    <div className="flex h-[62px] w-full shrink-0 items-center justify-between px-[22px] pt-[14px]" style={{ color }}>
      <span className="text-[15px] font-bold tracking-[-0.3px]">9:41</span>
      <div className="flex items-center gap-[7px]">
        <SignalIcon color={color} />
        <WifiIcon color={color} />
        <BatteryIcon color={color} />
      </div>
    </div>
  )
}
