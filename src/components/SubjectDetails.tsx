import { House, Buildings, SwimmingPool, HouseLine, Tree, Barbell, Phone, Mailbox } from '@phosphor-icons/react'
import { Tag, MoreTag } from './Tag'
import { LISTING_PATTERN_STYLE } from '../lib/listingPattern'
import { sqFtToAcres } from './SpecsSection'

const OWNER_ICON_COLOR = '#ae6a5b'
const LISTING_PRICE = 1_000_000

function formatUSD(n: number) {
  return `$${Math.round(n).toLocaleString('en-US')}`
}

function Stat({ value, unit, label }: { value: string; unit?: string; label: string }) {
  return (
    <div className="flex h-[46px] w-[72px] shrink-0 flex-col items-start gap-0.5">
      <p className="w-full text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]">{value}</p>
      <div className="flex items-start gap-0.5 whitespace-nowrap text-[12px] leading-[1.48] tracking-[0.5px] text-[var(--content-secondary)]">
        {unit && <span>{unit}</span>}
        <span>{label}</span>
      </div>
    </div>
  )
}

export function SubjectDetails({
  bedrooms,
  bathrooms,
  homeSize,
  lotSize,
  onOpenOwners,
  onOpenListing,
  onOpenSpecs,
}: {
  bedrooms: string
  bathrooms: string
  homeSize: string
  lotSize: string
  onOpenOwners: () => void
  onOpenListing: () => void
  onOpenSpecs: () => void
}) {
  const lotSizeAcres = lotSize ? sqFtToAcres(lotSize) : '0'
  const homeSizeNum = Number(homeSize.replace(/,/g, '')) || 0
  const lotSizeAcresNum = Number(lotSizeAcres) || 0
  const perFtHome = homeSizeNum ? formatUSD(LISTING_PRICE / homeSizeNum) : '—'
  const perAcLot = lotSizeAcresNum ? formatUSD(LISTING_PRICE / lotSizeAcresNum) : '—'

  return (
    <div className="flex w-full flex-col items-center gap-6 px-4">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-0.5 text-[var(--content-primary)]">
            <p className="text-[14px] leading-[1.48] tracking-[0.25px]">Ozark Meadows</p>
            <div className="font-[family-name:var(--font-display)] text-[26px] leading-[1.26] tracking-[-0.5px]">
              <p>780 Correa Way, Ozark,</p>
              <p>MO 42802</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Stat value={bedrooms} label="Bed" />
            <Stat value={bathrooms} label="Bath" />
            <Stat value={homeSize} unit="ft²" label="Home" />
            <Stat value={lotSizeAcres} unit="/ac" label="Lot" />
            <Stat value="$150" unit="/mo" label="HOA" />
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-1.5">
          <Tag icon={<House size={12} />} label="Single family" onClick={onOpenSpecs} />
          <Tag icon={<Buildings size={12} />} label="Contemporary" onClick={onOpenSpecs} />
          <Tag icon={<SwimmingPool size={12} />} label="Pool" onClick={onOpenSpecs} />
          <Tag icon={<HouseLine size={12} />} label="ADU" onClick={onOpenSpecs} />
          <Tag icon={<Buildings size={12} weight="bold" />} label="City View" onClick={onOpenSpecs} />
          <Tag icon={<Tree size={12} />} label="Landscaped Garden" onClick={onOpenSpecs} />
          <Tag icon={<Barbell size={12} />} label="Gym" onClick={onOpenSpecs} />
          <MoreTag onClick={onOpenSpecs} />
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenOwners}
        className="flex h-[91px] w-full items-center justify-center rounded-2xl border-[0.5px] p-3 text-left"
        style={{ background: '#f5f0ee', borderColor: '#ead7d2' }}
      >
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="text-[14px] leading-[1.48] tracking-[0.25px] text-[var(--content-tertiary)]">Owner</p>
          <div className="flex items-center gap-2 pt-0.5">
            <p className="text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]">Romelu Bayo</p>
            <div className="flex items-center gap-1">
              <Phone size={18} color={OWNER_ICON_COLOR} />
              <Mailbox size={18} color={OWNER_ICON_COLOR} />
            </div>
          </div>
        </div>
        <MoreTag />
      </button>

      <div className="flex w-full flex-col items-start gap-6">
        <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Listing</p>
        <button
          type="button"
          onClick={onOpenListing}
          className="relative flex w-full flex-col items-center gap-1 overflow-hidden rounded-2xl py-3 text-left"
          style={{ background: 'var(--surface-lighter)' }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-12" style={LISTING_PATTERN_STYLE} />
          <div className="relative flex w-full items-center gap-2 px-4 pt-1 text-[var(--content-primary)]">
            <ListingStat className="w-[108px]" label="Listed for" value={formatUSD(LISTING_PRICE)} />
            <ListingStat className="w-[108px]" label="Per /ft² Home" value={perFtHome} />
            <ListingStat className="w-[102px]" label="Per/ac Lot" value={perAcLot} />
          </div>
          <div className="flex w-full items-center gap-2 px-4 pt-1 text-[var(--content-primary)]">
            <ListingStat className="w-[108px]" label="Listed on" value="May 28" />
            <ListingStat className="w-[108px]" label="DOM" value="104" />
            <div className="flex flex-1 flex-col items-end justify-end self-stretch">
              <MoreTag variant="success" />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

function ListingStat({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex shrink-0 flex-col items-start justify-center gap-px ${className}`}>
      <p className="text-[12px] leading-[1.48] tracking-[0.5px]">{label}</p>
      <p className="text-[16px] leading-[1.48] tracking-[0px]">{value}</p>
    </div>
  )
}
