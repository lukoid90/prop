import { useState, type ReactNode } from 'react'
import { TrendUp, TrendDown } from '@phosphor-icons/react'
import { LISTING_PATTERN_STYLE } from '../lib/listingPattern'

const SEGMENTS = ['Listings', 'Tax Records', 'Mortgage'] as const
type Segment = (typeof SEGMENTS)[number]

const CARD_BORDER = 'var(--border-dimmer)'
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

function CardDivider() {
  return (
    <div className="relative h-[13px] w-full shrink-0">
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 border-t border-dashed" style={{ borderColor: '#f1e7e4' }} />
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
  labelDim = true,
  labelBold,
  value,
  valueBold,
  trend,
}: {
  label: string
  labelDim?: boolean
  labelBold?: boolean
  value?: ReactNode
  valueBold?: boolean
  trend?: ReactNode
}) {
  return (
    <div className="flex w-full items-start gap-2 py-1">
      <p
        className={`flex-1 text-[15px] leading-[1.26] tracking-[-0.5px] ${labelBold ? 'font-bold' : ''} ${labelDim ? 'opacity-65' : ''}`}
        style={{ color: 'var(--content-primary)' }}
      >
        {label}
      </p>
      <div className="flex items-center gap-2">
        {value !== undefined && (
          <span className={`text-[15px] leading-[1.26] tracking-[-0.5px] ${valueBold ? 'font-bold' : ''}`} style={{ color: 'var(--content-primary)' }}>
            {value}
          </span>
        )}
        {trend}
      </div>
    </div>
  )
}

function ListingEventCard({
  date,
  trend,
  eventLabel,
  price,
  perSqFt,
  source,
}: {
  date: string
  trend?: { dir: 'up' | 'down'; percent: string }
  eventLabel: string
  price: string
  perSqFt: string
  source: string
}) {
  return (
    <Card>
      <Row label={date} labelDim={false} trend={trend && <PriceTrend {...trend} />} />
      <div className="flex w-full items-start gap-2 py-1">
        <p className="flex-1 text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {eventLabel}
        </p>
        <div className="flex items-end gap-1">
          <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
            {price}
          </span>
          <span className="text-[12px] leading-[1.26]" style={{ color: 'var(--content-tertiary)' }}>
            /
          </span>
          <span className="text-[14px] leading-[1.26]" style={{ color: 'var(--content-tertiary)' }}>
            {perSqFt}
          </span>
          <span className="text-[12px] leading-[1.26]" style={{ color: 'var(--content-tertiary)' }}>
            per ft²
          </span>
        </div>
      </div>
      <CardDivider />
      <Row label={source} labelDim={false} />
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
  propertyTaxTrend?: string
  land: string
  additions: string
  assessedValue: string
  assessedValueTrend?: string
}) {
  return (
    <Card>
      <Row label="Property tax:" value={propertyTax} trend={propertyTaxTrend && <PriceTrend dir="up" percent={propertyTaxTrend} />} />
      <Row label="Land  + Additions:" value={`${land} + ${additions}`} />
      <Row label="Tax assessment:" value={assessedValue} trend={assessedValueTrend && <PriceTrend dir="up" percent={assessedValueTrend} />} />
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
      <Row label={date} labelDim={false} labelBold value={type} valueBold />
      <Row label="Loan amount:" value={loanAmount} valueBold />
      <Row label="Term:" value={term} />
      <CardDivider />
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
        <p className="w-full text-right text-[15px] font-bold leading-[1.26]" style={{ color: '#469b70' }}>
          Show more
        </p>
      </div>
    </div>
  )
}

// Priced against the 2,000 ft² home size from the Specs tab, ending at the
// current $1,000,000 listing. The Jan 2023 purchase (bought $820k, briefly
// relisted at $820k, then sold at $850k) and 2026 remodel (see Specs >
// Condition: Remodel) match the Mortgage tab below.
export const LISTING_EVENTS = [
  { year: '2026', date: 'May 28', trend: '+4.2%', eventLabel: 'Listed for sale', price: '$1,000,000', perSqFt: '$500', source: 'OZMLS' },
  { year: '2026', date: 'Feb 3', trend: '+12.9%', eventLabel: 'Price change', price: '$960,000', perSqFt: '$480', source: 'OZMLS' },
  { year: '2023', date: 'Apr 2', trend: '+0.2%', eventLabel: 'Sold', price: '$850,000', perSqFt: '$425', source: 'Public Record' },
  { year: '2023', date: 'Jan 15', trend: '', eventLabel: 'Listed for sale', price: '$820,000', perSqFt: '$410', source: 'OZMLS' },
  { year: '2023', date: 'Jan 1', trend: '', eventLabel: 'Sold', price: '$820,000', perSqFt: '$410', source: 'Public Record' },
] as const

function ListingsTab() {
  const years = [...new Set(LISTING_EVENTS.map((e) => e.year))]
  return (
    <div className="flex w-full flex-col items-start gap-6 pt-6">
      <ListingDescriptionCard />
      {years.map((year) => (
        <YearGroup key={year} year={year}>
          {LISTING_EVENTS.filter((e) => e.year === year).map((e) => (
            <ListingEventCard
              key={e.date}
              date={e.date}
              trend={e.trend ? { dir: 'up', percent: e.trend } : undefined}
              eventLabel={e.eventLabel}
              price={e.price}
              perSqFt={e.perSqFt}
              source={e.source}
            />
          ))}
        </YearGroup>
      ))}
    </div>
  )
}

// Missouri's effective property tax rate runs ~1.1%; assessed value trails
// market value and grows a few percent a year between reassessments. Land
// value appreciates slowly (~1.5%/yr); additions jump more in 2025 as the
// remodel from the Mortgage tab's equity loan gets reflected in the record.
// The earliest year shown has no prior-year baseline, so it omits trends.
export const TAX_YEARS = [
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
    propertyTaxTrend: '',
    land: '$548,000',
    additions: '$292,000',
    assessedValue: '$840,000',
    assessedValueTrend: '',
  },
] as const

function TaxRecordsTab() {
  return (
    <div className="flex w-full flex-col items-start gap-5 pt-6">
      {TAX_YEARS.map(({ year, propertyTaxTrend, assessedValueTrend, ...card }) => (
        <YearGroup key={year} year={year}>
          <TaxYearCard {...card} propertyTaxTrend={propertyTaxTrend || undefined} assessedValueTrend={assessedValueTrend || undefined} />
        </YearGroup>
      ))}
    </div>
  )
}

// 80% LTV purchase mortgage in 2023 at that year's higher rate environment,
// plus a 2025 home-equity loan (shorter term, typically-higher HELOC rate,
// 2nd lien position behind the 2023 mortgage) that funded the remodel
// reflected in the 2026 listing price above.
export const MORTGAGE_EVENTS = [
  {
    year: '2025',
    date: 'Nov 23',
    type: 'Equity loan',
    loanAmount: '$160,000',
    term: '15 yr',
    lender: 'Bank of America',
    rate: '8.0%',
    rateType: 'Fixed Rate',
    lien: '2nd lien',
  },
  {
    year: '2023',
    date: 'Apr 2',
    type: 'Mortgage',
    loanAmount: '$680,000',
    term: '30 yr',
    lender: 'Bank of America',
    rate: '6.5%',
    rateType: 'Fixed Rate',
    lien: '1st lien',
  },
] as const

function MortgageTab() {
  return (
    <div className="flex w-full flex-col items-start gap-5 pt-6">
      {MORTGAGE_EVENTS.map(({ year, ...card }) => (
        <YearGroup key={year} year={year}>
          <MortgageEventCard {...card} />
        </YearGroup>
      ))}
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
