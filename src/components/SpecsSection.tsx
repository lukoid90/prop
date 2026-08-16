import { useState } from 'react'
import { Plus, Sparkle } from '@phosphor-icons/react'
import iconBed from '../assets/icons/specs/icon-bed.svg'
import iconBathtub from '../assets/icons/specs/icon-bathtub.svg'
import iconFloorplan from '../assets/icons/specs/icon-floorplan.svg'
import iconLot from '../assets/icons/specs/icon-lot.svg'
import iconHoa from '../assets/icons/specs/icon-hoa.svg'
import iconCalendarX from '../assets/icons/specs/icon-calendar-x.svg'
import iconGarage from '../assets/icons/specs/icon-garage.svg'
import iconDatabase from '../assets/icons/specs/icon-database.svg'
import iconPencil from '../assets/icons/specs/icon-pencil.svg'
import iconAiCamera from '../assets/icons/specs/icon-ai-camera.svg'
import iconAirCon from '../assets/icons/specs/icon-air-con.svg'
import iconEvCharger from '../assets/icons/specs/icon-ev-charger.svg'
import iconSecurity from '../assets/icons/specs/icon-security.svg'
import iconAiDetected from '../assets/icons/specs/icon-ai-detected.svg'
import iconAfters from '../assets/icons/specs/icon-afters.svg'
import specPropertyType from '../assets/images/specs/spec-property-type.png'
import specStyle from '../assets/images/specs/spec-style.png'
import specCondition from '../assets/images/specs/spec-condition.png'
import specView from '../assets/images/specs/spec-view.png'
import featureCinemaRoom from '../assets/images/specs/feature-cinema-room.png'
import featureClawfootTub from '../assets/images/specs/feature-clawfoot-tub.png'
import featureMarbleKitchen from '../assets/images/specs/feature-marble-kitchen.png'
import featureOutdoorDining from '../assets/images/specs/feature-outdoor-dining.png'

const AI_BORDER = '#9875a9'
const AI_GRADIENT = 'linear-gradient(203deg, #9875a9 31.8%, #7f5a90 65.8%, #694b77 95.5%)'
const DASHED_BORDER = 'rgba(13,12,12,0.24)'

function formatThousands(raw: string) {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  return Number(digits).toLocaleString('en-US')
}

function Divider() {
  return (
    <div className="w-full py-4">
      <div className="h-px w-full" style={{ background: DASHED_BORDER }} />
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
  photo,
  label,
  value,
  valueSub,
  review,
  italic,
  border = true,
  short,
}: {
  icon?: string
  photo?: string
  label: React.ReactNode
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
      {photo ? (
        <img src={photo} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
      ) : (
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-lg border"
          style={{ background: 'var(--border-default)', borderColor: '#f1e7e4' }}
        >
          <img src={icon} alt="" className="size-5" />
        </div>
      )}
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

function EditableSpecRow({
  icon,
  label,
  value,
  onChange,
  short,
  border = true,
}: {
  icon: string
  label: React.ReactNode
  value: string
  onChange: (value: string) => void
  short?: boolean
  border?: boolean
}) {
  return (
    <div
      className={`flex w-full items-center gap-2.5 ${short ? 'h-12 pb-2' : 'h-14 py-2'} ${border ? 'border-b border-dashed' : ''}`}
      style={border ? { borderColor: DASHED_BORDER } : undefined}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-lg border"
        style={{ background: 'var(--border-default)', borderColor: '#f1e7e4' }}
      >
        <img src={icon} alt="" className="size-5" />
      </div>
      <p className="w-[108px] shrink-0 text-[15px] leading-[1.26] tracking-[-0.5px] opacity-65" style={{ color: 'var(--content-primary)' }}>
        {label}
      </p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode="numeric"
        className="min-w-0 flex-1 border-0 bg-transparent p-0 text-[15px] leading-[1.26] tracking-[-0.5px] outline-none"
        style={{ color: 'var(--content-primary)', caretColor: AI_BORDER }}
      />
    </div>
  )
}

function MlsSearchField() {
  return (
    <div
      className="flex h-12 w-full items-center gap-2 rounded-full border-[0.5px] py-1 pl-3 pr-1"
      style={{ borderColor: 'var(--border-resting)', background: 'var(--surface-lighter)' }}
    >
      <img src={iconDatabase} alt="" className="size-5 shrink-0" />
      <p className="flex-1 truncate text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
        MLS Listing, Aug 16 2026
      </p>
      <button type="button" className="flex size-10 shrink-0 items-center justify-center rounded-lg">
        <img src={iconPencil} alt="" className="size-5" />
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
      <img src={iconAiCamera} alt="" className="size-11 shrink-0" />
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

function FeaturePill({ label, avatar, icon, ai }: { label: string; avatar?: string; icon?: string; ai?: boolean }) {
  return (
    <div
      className="flex min-w-12 shrink-0 items-center justify-center gap-2 rounded-full py-2 pl-2 pr-3"
      style={{ borderWidth: ai ? 1 : 0.5, borderStyle: 'solid', borderColor: ai ? AI_BORDER : 'var(--border-resting)' }}
    >
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="size-8 shrink-0 rounded-full object-cover"
          style={{ boxShadow: `0 0 0 0.8px ${ai ? AI_BORDER : '#f1e7e4'}` }}
        />
      ) : (
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full"
          style={{ background: 'var(--border-default)', borderWidth: 0.8, borderStyle: 'solid', borderColor: '#f1e7e4' }}
        >
          <img src={icon} alt="" className="size-4" />
        </div>
      )}
      <p
        className={`whitespace-nowrap text-[15px] leading-[1.26] ${ai ? 'italic' : ''}`}
        style={{ color: ai ? 'var(--content-tertiary)' : 'var(--content-primary)' }}
      >
        {label}
      </p>
      {ai ? <img src={iconAiDetected} alt="" className="size-4 shrink-0" /> : <img src={iconAfters} alt="" className="h-3 w-4 shrink-0" />}
    </div>
  )
}

const FEATURES: { label: string; avatar?: string; icon?: string; ai?: boolean }[] = [
  { label: 'Cinema room', avatar: featureCinemaRoom, ai: true },
  { label: 'Clawfoot tub', avatar: featureClawfootTub, ai: true },
  { label: 'Air con', icon: iconAirCon },
  { label: 'Marble kitchen', avatar: featureMarbleKitchen },
  { label: 'EV charger', icon: iconEvCharger },
  { label: 'Outdoor dining', avatar: featureOutdoorDining },
  { label: 'Security', icon: iconSecurity },
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
      <DetailRow label="Neighborhood" value="Ozark Meadows" />
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
  const [bedrooms, setBedrooms] = useState('3')
  const [bathrooms, setBathrooms] = useState('2')
  const [homeSize, setHomeSize] = useState('2,000')
  const [lotSize, setLotSize] = useState('24,500')

  return (
    <div className="flex w-full flex-col items-start px-4">
      <div className="w-full pb-4">
        <MlsSearchField />
      </div>
      <div className="w-full pb-4">
        <AiNotepad />
      </div>
      <div className="flex w-full flex-col items-start">
        <EditableSpecRow
          icon={iconBed}
          label="Bedrooms"
          value={bedrooms}
          onChange={(v) => setBedrooms(v.replace(/\D/g, ''))}
          short
        />
        <EditableSpecRow
          icon={iconBathtub}
          label="Bathrooms"
          value={bathrooms}
          onChange={(v) => setBathrooms(v.replace(/\D/g, ''))}
        />
        <EditableSpecRow
          icon={iconFloorplan}
          label={
            <>
              Home size, ft<sup>2</sup>
            </>
          }
          value={homeSize}
          onChange={(v) => setHomeSize(formatThousands(v))}
        />
        <EditableSpecRow
          icon={iconLot}
          label={
            <>
              Lot size, ft<sup>2</sup>
            </>
          }
          value={lotSize}
          onChange={(v) => setLotSize(formatThousands(v))}
        />
        <SpecRow icon={iconHoa} label="HOA fees" value="$200 monthly" valueSub="$1200 billed annually" />
        <SpecRow icon={iconCalendarX} label="Year built" value="2010" />
        <SpecRow photo={specPropertyType} label="Property type" value="Single family" />
        <SpecRow photo={specStyle} label="Style" value="Contemporary" />
        <SpecRow photo={specCondition} label="Condition" value="Remodel" italic review />
        <SpecRow photo={specView} label="View" value="Woodlands" italic review />
        <SpecRow icon={iconGarage} label="Garage spaces" value="4" border={false} />
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
