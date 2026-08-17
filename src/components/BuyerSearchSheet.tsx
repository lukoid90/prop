import { useState, type ReactNode } from 'react'
import { X, MapPin, MoneyWavy, UserCircle, House } from '@phosphor-icons/react'
import propertyPhoto from '../assets/images/property-photo.png'
import { GlassButton } from './GlassButton'

const SHEET_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SHEET_DURATION_MS = 420

interface BuyerSearch {
  id: string
  date: string
  title: string
  tags: { icon: ReactNode; label: string }[]
}

const BUYER_SEARCHES: BuyerSearch[] = [
  {
    id: 'monte-ozark-luxury',
    date: 'Yesterday',
    title: 'Tracking luxury in Monte Ozark',
    tags: [
      { icon: <MoneyWavy size={14} />, label: '$10m +' },
      { icon: <MapPin size={14} />, label: 'Monte Ozark' },
    ],
  },
  {
    id: 'guy-ozark',
    date: '23 Jul, 2026',
    title: 'Search for Guy in Ozark',
    tags: [
      { icon: <UserCircle size={14} />, label: 'Guy Hawkins' },
      { icon: <House size={14} />, label: '7 properties' },
      { icon: <MapPin size={14} />, label: 'Biscoff' },
    ],
  },
  {
    id: 'jan-alex-condo',
    date: '6 Jun, 2026',
    title: 'Jan & Alex’s Condo',
    tags: [
      { icon: <UserCircle size={14} />, label: 'Jan Mann' },
      { icon: <UserCircle size={14} />, label: 'Alexander Mann' },
      { icon: <House size={14} />, label: '13 properties' },
      { icon: <MapPin size={14} />, label: 'Carrington' },
    ],
  },
]

function Pill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-end gap-1 rounded-full border-[0.5px] border-[rgba(18,18,18,0.24)] px-1.5 py-0.5">
      <span className="opacity-65" style={{ color: 'var(--content-primary)' }}>
        {icon}
      </span>
      <span className="text-[14px] leading-[1.26] tracking-[0.25px]" style={{ color: 'var(--content-primary)' }}>
        {label}
      </span>
    </div>
  )
}

function SearchCard({ search, selected, onSelect }: { search: BuyerSearch; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full flex-col items-start gap-4 rounded-2xl px-3 py-4 text-left transition-colors"
      style={{
        background: '#fdfcfc',
        border: selected ? '1.5px solid var(--content-primary)' : '0.5px solid #cdc7c4',
      }}
    >
      <div className="flex flex-col leading-[1.48]" style={{ color: 'var(--content-primary)' }}>
        <p className="text-[14px] tracking-[0.25px]" style={{ color: 'var(--content-tertiary)' }}>
          {search.date}
        </p>
        <p className="text-[18px] leading-[1.26]">{search.title}</p>
      </div>
      <div className="flex flex-wrap items-start gap-1">
        {search.tags.map((tag) => (
          <Pill key={tag.label} icon={tag.icon} label={tag.label} />
        ))}
      </div>
    </button>
  )
}

export function BuyerSearchSheet({ open, onClose, onAdd }: { open: boolean; onClose: () => void; onAdd?: (searchId: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const canAdd = selectedId !== null

  const handleClose = () => {
    setSelectedId(null)
    onClose()
  }

  return (
    <div className={`absolute inset-0 flex flex-col justify-end ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out"
        style={{ opacity: open ? 1 : 0 }}
        onClick={handleClose}
      />

      <div
        className="relative flex h-[calc(100%-24px)] w-full flex-col overflow-hidden rounded-t-[38px] bg-[#f5f0ee] shadow-[0_-16px_32px_rgba(18,18,18,0.08)] transition-transform"
        style={{
          transform: `translateY(${open ? '0%' : '100%'})`,
          transitionDuration: `${SHEET_DURATION_MS}ms`,
          transitionTimingFunction: SHEET_EASING,
        }}
      >
        <div className="flex h-4 w-full shrink-0 items-center justify-center">
          <div className="h-1 w-12 rounded-full bg-[rgba(18,18,18,0.24)]" />
        </div>

        <div className="flex w-full shrink-0 items-center justify-between px-4 pb-3">
          <GlassButton aria-label="Close" onClick={handleClose} className="size-10">
            <X size={17} color="var(--content-primary)" />
          </GlassButton>
          <GlassButton
            variant="dark"
            onClick={() => {
              if (!canAdd || !selectedId) return
              onAdd?.(selectedId)
              handleClose()
            }}
            disabled={!canAdd}
            className="h-10 px-4"
          >
            <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">Add</span>
          </GlassButton>
        </div>

        <div className="flex w-full shrink-0 items-center gap-4 p-4">
          <img src={propertyPhoto} alt="" className="size-20 shrink-0 rounded-lg object-cover" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-[var(--content-primary)]">
            <p className="text-[14px] leading-[1.48] tracking-[0.25px]">Ozark Meadows</p>
            <div className="font-[family-name:var(--font-display)] text-[20px] leading-[1.26]">
              <p>780 Correa Way, Ozark,</p>
              <p>MO 42802</p>
            </div>
          </div>
        </div>

        <div className="w-full shrink-0 px-4 py-2">
          <div className="h-px w-full bg-[var(--border-dimmer)]" />
        </div>

        <div className="flex w-full shrink-0 items-center justify-center p-4">
          <p className="text-[17px] font-bold leading-[1.26] tracking-[-0.5px] text-[#36312e]">Add to Buyer Search</p>
        </div>

        <div className="flex w-full flex-col gap-4 overflow-y-auto px-4 py-2 pb-8">
          {BUYER_SEARCHES.map((search) => (
            <SearchCard key={search.id} search={search} selected={selectedId === search.id} onSelect={() => setSelectedId(search.id)} />
          ))}
        </div>
      </div>
    </div>
  )
}
