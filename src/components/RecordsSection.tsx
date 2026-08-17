import { useState, type ReactNode } from 'react'
import { TrendUp, TrendDown } from '@phosphor-icons/react'
import { LISTING_PATTERN_STYLE } from '../lib/listingPattern'

const SEGMENTS = ['Listings', 'Tax Records', 'Mortgage'] as const
type Segment = (typeof SEGMENTS)[number]

const CARD_BORDER = 'var(--border-dimmer)'
const RUST = '#ae6a5b'
const TREND_GREEN = 'var(--listing-active)'
const TREND_RED = '#c2185b'

function SegmentedControl({ active, onChange }: { active: Segment; onChange: (s: Segment) => void }) {
  return (
    <div className="flex h-9 w-full items-center justify-center gap-0.5 rounded-full p-0.5" style={{ background: 'rgba(18,18,18,0.06)' }}>
      {SEGMENTS.map((s) => {
        const isActive = s === active
        return (
          <button
            key={s}
            type="button"
            onClick={() => onChange(s)}
            className="flex h-8 flex-1 items-center justify-center rounded-full text-[14px] leading-[1.26]"
            style={
              isActive
                ? {
                    background: 'var(--surface-lighter)',
                    color: 'var(--content-primary)',
                    boxShadow: '0 0 2px rgba(0,0,0,0.04), 0 4px 4px rgba(0,0,0,0.06)',
                  }
                : { color: 'var(--content-primary)' }
            }
          >
            {s}
          </button>
        )
      })}
    </div>
  )
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex w-full flex-col gap-1 rounded-2xl border p-3"
      style={{ borderColor: CARD_BORDER, background: 'var(--surface-lighter)' }}
    >
      {children}
    </div>
  )
}

function YearGroup({ year, children }: { year: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <p className="text-[18px] font-bold leading-[1.48]" style={{ color: 'var(--content-primary)' }}>
        {year}
      </p>
      <div className="flex w-full flex-col items-start gap-3">{children}</div>
    </div>
  )
}

function PriceTrend({ dir, percent }: { dir: 'up' | 'down'; percent: string }) {
  const Icon = dir === 'up' ? TrendUp : TrendDown
  return (
    <div className="flex shrink-0 items-center gap-1">
      <Icon size={16} color={dir === 'up' ? TREND_GREEN : TREND_RED} />
      <span className="text-[14px] leading-[1.26]" style={{ color: 'var(--content-secondary)' }}>
        {percent}
      </span>
    </div>
  )
}

function Row({
  label,
  labelBold,
  value,
  valueBold,
  trend,
}: {
  label: string
  labelBold?: boolean
  value: string
  valueBold?: boolean
  trend?: ReactNode
}) {
  return (
    <div className="flex w-full items-start gap-2 py-1">
      <p
        className={`flex-1 text-[15px] leading-[1.26] tracking-[-0.5px] ${labelBold ? '' : 'opacity-65'}`}
        style={{ color: 'var(--content-primary)' }}
      >
        {label}
      </p>
      <div className="flex items-center gap-2">
        <span className={`text-[15px] leading-[1.26] tracking-[-0.5px] ${valueBold ? 'font-bold' : ''}`} style={{ color: 'var(--content-primary)' }}>
          {value}
        </span>
        {trend}
      </div>
    </div>
  )
}

function ListingEventCard({
  date,
  label,
  priceLabel,
  price,
  trend,
  perSqFt,
}: {
  date: string
  label: string
  priceLabel: string
  price: string
  trend?: { dir: 'up' | 'down'; percent: string }
  perSqFt: string
}) {
  return (
    <Card>
      <Row label={date} value={label} valueBold />
      <Row label={priceLabel} value={price} valueBold trend={trend && <PriceTrend {...trend} />} />
      <div className="flex w-full items-start gap-2 py-1">
        <p className="flex-1 text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          Public record
        </p>
        <span className="text-[15px] leading-[1.26] tracking-[-0.5px] opacity-65" style={{ color: 'var(--content-primary)' }}>
          {perSqFt} per ft²
        </span>
      </div>
    </Card>
  )
}

function TaxYearCard({
  propertyTax,
  propertyTaxTrend,
  land,
  additions,
  assessedValue,
  assessedValueTrend,
}: {
  propertyTax: string
  propertyTaxTrend: string
  land: string
  additions: string
  assessedValue: string
  assessedValueTrend: string
}) {
  return (
    <Card>
      <Row label="Property tax" value={propertyTax} trend={<PriceTrend dir="up" percent={propertyTaxTrend} />} />
      <Row label="Land  + Additions" labelBold value={`${land} + ${additions}`} />
      <Row label="Tax assessment" value={assessedValue} valueBold trend={<PriceTrend dir="up" percent={assessedValueTrend} />} />
    </Card>
  )
}

function MortgageEventCard({
  date,
  type,
  loanAmount,
  term,
  lender,
  rate,
  rateType,
  lien,
}: {
  date: string
  type: string
  loanAmount: string
  term: string
  lender: string
  rate: string
  rateType: string
  lien: string
}) {
  return (
    <Card>
      <div className="flex w-full items-start gap-2.5 py-1">
        <p className="flex-1 text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {date}
        </p>
        <p className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {type}
        </p>
      </div>
      <Row label="Loan amount:" value={loanAmount} valueBold />
      <Row label="Term:" value={term} />
      <div className="flex w-full items-start gap-2.5 py-1">
        <p className="flex-1 text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {lender}
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
            {rate}
          </span>
          <span className="text-[14px] leading-[1.26] opacity-65" style={{ color: 'var(--content-primary)' }}>
            •
          </span>
          <span className="text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
            {rateType}
          </span>
          <span className="text-[14px] leading-[1.26] opacity-65" style={{ color: 'var(--content-primary)' }}>
            •
          </span>
          <span className="text-[15px] italic leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-secondary)' }}>
            {lien}
          </span>
        </div>
      </div>
    </Card>
  )
}

function ListingDescriptionCard() {
  return (
    <div className="relative flex w-full flex-col gap-4 overflow-hidden rounded-2xl p-3" style={{ background: 'var(--surface-lighter)' }}>
      <div className="pointer-events-none absolute inset-0 opacity-12" style={LISTING_PATTERN_STYLE} />
      <div className="relative flex w-full flex-col gap-0.5">
        <div
          className="flex h-6 w-fit items-center justify-center rounded-full px-2 py-1"
          style={{ background: 'var(--listing-active)' }}
        >
          <span className="text-[12px] font-bold leading-[1.26] tracking-[0.25px]" style={{ color: 'var(--content-inverse)' }}>
            Active
          </span>
        </div>
        <p className="text-[16px] font-bold leading-[1.48]" style={{ color: 'var(--content-primary)' }}>
          Listing description
        </p>
      </div>
      <div className="flex w-full flex-col items-end gap-2">
        <p className="w-full text-[14px] leading-[1.48] tracking-[0.25px]" style={{ color: 'var(--content-primary)' }}>
          The Spanish Vale - Tucked away above the Sunset Strip, this ultra-private 4-bedroom, 4-bathroom compound
          captures the effortless mystique...
        </p>
        <div className="w-full text-[14px] leading-[1.48] tracking-[0.25px]" style={{ color: 'var(--content-tertiary)' }}>
          <p>Listed by: Miguel Hernandes</p>
          <p>The Ozark Brokers</p>
          <p>Source: OZMLS</p>
        </div>
        <p className="w-full text-right text-[15px] leading-[1.26]" style={{ color: RUST }}>
          Show more
        </p>
      </div>
    </div>
  )
}

// Priced against the 2,000 ft² home size from the Specs tab, ending at the
// current $1,000,000 listing. The 2023 sale/purchase price and 2026 remodel
// (see Specs > Condition: Remodel) match the Mortgage tab below.
function ListingsTab() {
  return (
    <div className="flex w-full flex-col items-start gap-6 pt-6">
      <ListingDescriptionCard />
      <YearGroup year="2026">
        <ListingEventCard
          date="May 28, 2026"
          label="Listed for sale"
          priceLabel="Listed for:"
          price="$1,000,000"
          trend={{ dir: 'up', percent: '+4.2%' }}
          perSqFt="$500"
        />
        <ListingEventCard
          date="Feb 3, 2026"
          label="Price change"
          priceLabel="Listed for:"
          price="$960,000"
          trend={{ dir: 'up', percent: '+12.9%' }}
          perSqFt="$480"
        />
      </YearGroup>
      <YearGroup year="2023">
        <ListingEventCard date="Apr 2, 2023" label="Sold" priceLabel="Sold for:" price="$850,000" perSqFt="$425" />
        <ListingEventCard date="Jan 15, 2023" label="Listed for sale" priceLabel="Listed for:" price="$820,000" perSqFt="$410" />
      </YearGroup>
    </div>
  )
}

// Missouri's effective property tax rate runs ~1.1%; assessed value trails
// market value and grows a few percent a year between reassessments. Land
// value appreciates slowly (~1.5%/yr); additions jump more in 2025 as the
// remodel from the Mortgage tab's equity loan gets reflected in the record.
function TaxRecordsTab() {
  const years = [
    {
      year: '2025',
      propertyTax: '$9,800',
      propertyTaxTrend: '+3.2%',
      land: '$564,000',
      additions: '$326,000',
      assessedValue: '$890,000',
      assessedValueTrend: '+3.5%',
    },
    {
      year: '2024',
      propertyTax: '$9,500',
      propertyTaxTrend: '+3.3%',
      land: '$556,000',
      additions: '$304,000',
      assessedValue: '$860,000',
      assessedValueTrend: '+2.4%',
    },
    {
      year: '2023',
      propertyTax: '$9,200',
      propertyTaxTrend: '+2.2%',
      land: '$548,000',
      additions: '$292,000',
      assessedValue: '$840,000',
      assessedValueTrend: '+2.4%',
    },
    {
      year: '2022',
      propertyTax: '$9,000',
      propertyTaxTrend: '+2.5%',
      land: '$540,000',
      additions: '$280,000',
      assessedValue: '$820,000',
      assessedValueTrend: '+2.5%',
    },
  ]
  return (
    <div className="flex w-full flex-col items-start gap-5 pt-6">
      {years.map(({ year, ...card }) => (
        <YearGroup key={year} year={year}>
          <TaxYearCard {...card} />
        </YearGroup>
      ))}
    </div>
  )
}

// 80% LTV purchase mortgage in 2023 at that year's higher rate environment,
// plus a 2025 home-equity loan (shorter term, typically-higher HELOC rate,
// 2nd lien position behind the 2023 mortgage) that funded the remodel
// reflected in the 2026 listing price above.
function MortgageTab() {
  return (
    <div className="flex w-full flex-col items-start gap-5 pt-6">
      <YearGroup year="2025">
        <MortgageEventCard
          date="Nov 23, 2025"
          type="Equity loan"
          loanAmount="$160,000"
          term="15 yr"
          lender="Bank of America"
          rate="8.0%"
          rateType="Fixed Rate"
          lien="2nd lien"
        />
      </YearGroup>
      <YearGroup year="2023">
        <MortgageEventCard
          date="Apr 2, 2023"
          type="Mortgage"
          loanAmount="$680,000"
          term="30 yr"
          lender="Bank of America"
          rate="6.5%"
          rateType="Fixed Rate"
          lien="1st lien"
        />
      </YearGroup>
    </div>
  )
}

export function RecordsSection() {
  const [segment, setSegment] = useState<Segment>('Listings')

  return (
    <div className="flex w-full flex-col items-start px-4 pb-2">
      <SegmentedControl active={segment} onChange={setSegment} />
      {segment === 'Listings' && <ListingsTab />}
      {segment === 'Tax Records' && <TaxRecordsTab />}
      {segment === 'Mortgage' && <MortgageTab />}
    </div>
  )
}
