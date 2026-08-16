import type { ReactNode } from 'react'
import {
  Database,
  PencilSimple,
  Bed,
  Bathtub,
  Ruler,
  MapTrifold,
  CurrencyDollar,
  CalendarX,
  House,
  Buildings,
  Wrench,
  Binoculars,
  Car,
  Plus,
  Sparkle,
  CaretRight,
} from '@phosphor-icons/react'

const AI_BORDER = '#9875a9'
const AI_GRADIENT = 'linear-gradient(203deg, #9875a9 31.8%, #7f5a90 65.8%, #694b77 95.5%)'
const DASHED_BORDER = 'rgba(13,12,12,0.24)'

function Divider() {
  return (
    <div className="w-full py-4">
      <div className="h-px w-full" style={{ background: DASHED_BORDER }} />
    </div>
  )
}

function SpecIcon({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border"
      style={{ background: 'var(--border-default)', borderColor: '#f1e7e4' }}
    >
      {children}
    </div>
  )
}

function ReviewButton() {
  return (
    <button
      type="button"
      className="flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border px-3"
      style={{ borderColor: AI_BORDER }}
    >
      <Sparkle size={14} weight="fill" color={AI_BORDER} />
      <span className="bg-clip-text text-[14px] leading-[1.26] text-transparent" style={{ backgroundImage: AI_GRADIENT }}>
        Review
      </span>
    </button>
  )
}

function SpecRow({
  icon,
  label,
  value,
  valueSub,
  review,
  italic,
  border = true,
  short,
}: {
  icon: ReactNode
  label: ReactNode
  value: string
  valueSub?: string
  review?: boolean
  italic?: boolean
  border?: boolean
  short?: boolean
}) {
  return (
    <div
      className={`flex w-full items-center gap-2.5 ${short ? 'h-12 pb-2' : 'h-14 py-2'} ${border ? 'border-b border-dashed' : ''}`}
      style={border ? { borderColor: DASHED_BORDER } : undefined}
    >
      <SpecIcon>{icon}</SpecIcon>
      <p className="w-[108px] shrink-0 text-[15px] leading-[1.26] tracking-[-0.5px] opacity-65" style={{ color: 'var(--content-primary)' }}>
        {label}
      </p>
      <div className="flex min-w-0 flex-1 flex-col items-start">
        <p
          className={`truncate text-[15px] leading-[1.26] tracking-[-0.5px] ${italic ? 'italic' : ''}`}
          style={{ color: italic ? 'var(--content-tertiary)' : 'var(--content-primary)' }}
        >
          {value}
        </p>
        {valueSub && (
          <p className="truncate text-[15px] leading-[1.26] tracking-[-0.5px] opacity-50" style={{ color: 'var(--content-primary)' }}>
            {valueSub}
          </p>
        )}
      </div>
      {review && <ReviewButton />}
    </div>
  )
}

function MlsSearchField() {
  return (
    <div
      className="flex h-12 w-full items-center gap-2 rounded-full border-[0.5px] py-1 pl-3 pr-1"
      style={{ borderColor: 'var(--border-resting)', background: 'var(--surface-lighter)' }}
    >
      <Database size={20} color="var(--content-primary)" />
      <p className="flex-1 truncate text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
        MLS Listing, Aug 16 2026
      </p>
      <button type="button" className="flex size-10 shrink-0 items-center justify-center rounded-lg">
        <PencilSimple size={20} color="var(--content-primary)" />
      </button>
    </div>
  )
}

function AiNotepad() {
  return (
    <div
      className="flex w-full items-center gap-3 rounded-lg border p-3"
      style={{
        borderColor: 'var(--border-default)',
        backgroundImage:
          'linear-gradient(90deg, rgba(253,252,252,0.6) 0%, rgba(253,252,252,0.6) 100%), linear-gradient(191deg, #e0d9e7 31.8%, #cec4da 65.8%, #b6a7c8 95.5%)',
      }}
    >
      <div className="flex size-11 shrink-0 items-center justify-center">
        <Sparkle size={24} weight="fill" color={AI_BORDER} />
      </div>
      <p className="flex-1 text-[14px] leading-[1.48] tracking-[0.25px]" style={{ color: 'var(--content-primary)' }}>
        Our AI has detected features from listing photos. There&rsquo;s{' '}
        <span className="bg-clip-text font-bold text-transparent" style={{ backgroundImage: AI_GRADIENT }}>
          6 to review
        </span>
        .
      </p>
    </div>
  )
}

function FeaturePill({ label, icon, ai }: { label: string; icon: ReactNode; ai?: boolean }) {
  return (
    <div
      className="flex min-w-12 shrink-0 items-center justify-center gap-2 rounded-full border py-2 pl-2 pr-3"
      style={{ borderColor: ai ? AI_BORDER : 'var(--border-resting)' }}
    >
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-full border"
        style={{ background: 'var(--border-default)', borderColor: ai ? AI_BORDER : '#f1e7e4' }}
      >
        {icon}
      </div>
      <p
        className={`whitespace-nowrap text-[15px] leading-[1.26] ${ai ? 'italic' : ''}`}
        style={{ color: ai ? 'var(--content-tertiary)' : 'var(--content-primary)' }}
      >
        {label}
      </p>
      <CaretRight size={12} color="var(--content-primary)" style={{ opacity: 0.4 }} />
    </div>
  )
}

const FEATURES: { label: string; icon: ReactNode; ai?: boolean }[] = [
  { label: 'Cinema room', icon: <Sparkle size={16} weight="fill" color={AI_BORDER} />, ai: true },
  { label: 'Clawfoot tub', icon: <Bathtub size={16} color={AI_BORDER} />, ai: true },
  { label: 'Air con', icon: <Wrench size={16} color="var(--content-primary)" /> },
  { label: 'Marble kitchen', icon: <House size={16} color="var(--content-primary)" /> },
  { label: 'EV charger', icon: <CurrencyDollar size={16} color="var(--content-primary)" /> },
  { label: 'Outdoor dining', icon: <MapTrifold size={16} color="var(--content-primary)" /> },
  { label: 'Security', icon: <Buildings size={16} color="var(--content-primary)" /> },
]

function FeaturesAmenities() {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex h-11 w-full items-center gap-2">
        <p className="flex-1 text-[15px] font-bold leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
          Features &amp; Amenities
        </p>
        <button
          type="button"
          className="flex h-9 shrink-0 items-center justify-center gap-1 rounded-full border px-3"
          style={{ borderColor: 'var(--content-primary)' }}
        >
          <Plus size={14} color="var(--content-primary)" />
          <span className="text-[15px] leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
            Add
          </span>
        </button>
      </div>
      <div className="flex w-full flex-wrap items-start gap-2">
        {FEATURES.map((f) => (
          <FeaturePill key={f.label} {...f} />
        ))}
      </div>
    </div>
  )
}

function DetailRow({ label, value, valueLines, border = true }: { label: string; value?: string; valueLines?: string[]; border?: boolean }) {
  return (
    <div
      className={`flex w-full items-center gap-2.5 py-2 ${border ? 'border-b border-dashed' : ''}`}
      style={border ? { borderColor: DASHED_BORDER } : undefined}
    >
      <p className="w-[132px] shrink-0 text-[15px] leading-[1.26] tracking-[-0.5px] opacity-65" style={{ color: 'var(--content-primary)' }}>
        {label}
      </p>
      <div className="flex min-w-0 flex-1 flex-col items-start">
        {valueLines
          ? valueLines.map((line) => (
              <p key={line} className="text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
                {line}
              </p>
            ))
          : (
            <p className="truncate text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
              {value}
            </p>
          )}
      </div>
    </div>
  )
}

function AddressSection() {
  return (
    <div className="flex w-full flex-col items-start">
      <p className="w-full py-3 text-[15px] font-bold leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
        Address
      </p>
      <DetailRow label="First line" value="780 Correa Way" />
      <DetailRow label="First line" value="780 Correa Way" />
      <DetailRow label="Full" valueLines={['780 Correa Way, Ozark,', 'MO 42802']} border={false} />
    </div>
  )
}

function IdentifierRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center gap-2 py-2 opacity-65">
      <p className="w-[140px] shrink-0 text-[15px] leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
        {label}
      </p>
      <p className="flex-1 truncate text-right text-[15px] leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
        {value}
      </p>
    </div>
  )
}

function IdentifiersSection() {
  return (
    <div className="flex w-full flex-col items-start">
      <p className="w-full py-3 text-[15px] font-bold leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
        Identifiers
      </p>
      <IdentifierRow label="APN" value="8334812103" />
      <IdentifierRow label="Zone" value="RA2784" />
      <IdentifierRow label="MLS ID" value="43667346328764" />
    </div>
  )
}

export function SpecsSection() {
  return (
    <div className="flex w-full flex-col items-start gap-4 px-4">
      <MlsSearchField />
      <AiNotepad />
      <div className="flex w-full flex-col items-start">
        <SpecRow icon={<Bed size={20} color="var(--content-primary)" />} label="Bedrooms" value="3" short />
        <SpecRow icon={<Bathtub size={20} color="var(--content-primary)" />} label="Bathrooms" value="2" />
        <SpecRow
          icon={<Ruler size={20} color="var(--content-primary)" />}
          label={
            <>
              Home size, ft<sup>2</sup>
            </>
          }
          value="2,000"
        />
        <SpecRow
          icon={<MapTrifold size={20} color="var(--content-primary)" />}
          label={
            <>
              Lot size, ft<sup>2</sup>
            </>
          }
          value="24,500"
        />
        <SpecRow
          icon={<CurrencyDollar size={20} color="var(--content-primary)" />}
          label="HOA fees"
          value="$200 monthly"
          valueSub="$1200 billed annually"
        />
        <SpecRow icon={<CalendarX size={20} color="var(--content-primary)" />} label="Year built" value="2010" />
        <SpecRow icon={<House size={20} color="var(--content-primary)" />} label="Property type" value="Single family" />
        <SpecRow icon={<Buildings size={20} color="var(--content-primary)" />} label="Style" value="Contemporary" />
        <SpecRow icon={<Wrench size={20} color="var(--content-primary)" />} label="Condition" value="Remodel" italic review />
        <SpecRow icon={<Binoculars size={20} color="var(--content-primary)" />} label="View" value="Woodlands" italic review />
        <SpecRow icon={<Car size={20} color="var(--content-primary)" />} label="Garage spaces" value="4" border={false} />
      </div>
      <Divider />
      <FeaturesAmenities />
      <Divider />
      <AddressSection />
      <Divider />
      <IdentifiersSection />
    </div>
  )
}
