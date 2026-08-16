export const NAV_TABS = ['Summary', 'Specs', 'Records', 'Owners', 'Photos', 'Map']

export function PropertyNav({ active, onChange }: { active: string; onChange: (tab: string) => void }) {
  const TABS = NAV_TABS
  return (
    <div className="flex w-full items-center gap-1 overflow-x-auto px-4 py-1 [scrollbar-width:none]">
      {TABS.map((tab) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            type="button"
            onClick={() => onChange(tab)}
            className="h-9 shrink-0 rounded-full px-4 text-[14px] leading-[1.26] transition-colors"
            style={
              isActive
                ? { background: 'var(--content-primary)', color: 'var(--content-inverse)' }
                : { border: '1px solid var(--overlay-sm-shade)', color: 'var(--content-primary)', opacity: 0.75 }
            }
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}
