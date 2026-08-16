import { useState, type ReactNode } from 'react'
import { TrendUp } from '@phosphor-icons/react'

const SEGMENTS = ['Listings', 'Tax Records', 'Mortgage'] as const
type Segment = (typeof SEGMENTS)[number]

const CARD_BORDER = 'var(--border-dimmer)'
const DASHED = 'rgba(13,12,12,0.24)'
const RUST = '#ae6a5b'
const TREND_GREEN = 'var(--listing-active)'

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

function DividerRow({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div
      className={`flex w-full items-start gap-2.5 ${border ? 'border-b border-dashed pb-3' : ''}`}
      style={border ? { borderColor: DASHED } : undefined}
    >
      <p className="flex-1 text-[15px] leading-[1.26] tracking-[-0.5px] opacity-65" style={{ color: 'var(--content-primary)' }}>
        {label}
      </p>
      <p className="text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
        {value}
      </p>
    </div>
  )
}

function TrendRow({ percent }: { percent: string }) {
  return (
    <div className="flex w-full items-center justify-end gap-1">
      <TrendUp size={17} color={TREND_GREEN} />
      <span className="text-[14px] leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
        {percent}
      </span>
    </div>
  )
}

function PriceValue({ price, priceSub }: { price: string; priceSub?: string }) {
  return (
    <div className="flex flex-1 items-center justify-end gap-1">
      <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
        {price}
      </span>
      {priceSub && (
        <>
          <span className="text-[14px] leading-[1.26] opacity-65" style={{ color: 'var(--content-primary)' }}>
            /
          </span>
          <span className="text-[14px] leading-[1.26] opacity-65" style={{ color: 'var(--content-primary)' }}>
            {priceSub}
          </span>
        </>
      )}
    </div>
  )
}

function ListingEventCard({
  date,
  label,
  price,
  priceSub,
  trend,
}: {
  date: string
  label: string
  price?: string
  priceSub?: string
  trend?: string
}) {
  return (
    <Card>
      <p className="w-full text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
        {date}
      </p>
      <div className="flex w-full items-start gap-2.5">
        <p className="flex-1 text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {label}
        </p>
        {price && <PriceValue price={price} priceSub={priceSub} />}
      </div>
      {trend && <TrendRow percent={trend} />}
    </Card>
  )
}

function TaxYearCard({
  taxes,
  assessedValue,
  assessedValueSub,
  trend,
}: {
  taxes: string
  assessedValue: string
  assessedValueSub: string
  trend: string
}) {
  return (
    <Card>
      <DividerRow label="Property taxes:" value={taxes} border />
      <div className="flex w-full items-start gap-2.5 pt-1">
        <p className="flex-1 text-[15px] leading-[1.26] tracking-[-0.5px] opacity-65" style={{ color: 'var(--content-primary)' }}>
          Assessed value:
        </p>
        <PriceValue price={assessedValue} priceSub={assessedValueSub} />
      </div>
      <TrendRow percent={trend} />
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
}: {
  date: string
  type: string
  loanAmount: string
  term: string
  lender: string
  rate: string
  rateType: string
}) {
  return (
    <div
      className="flex w-full flex-col gap-1 rounded-2xl border px-3 pb-5 pt-3"
      style={{ borderColor: CARD_BORDER, background: 'var(--surface-lighter)' }}
    >
      <div className="flex w-full items-start gap-2.5">
        <p className="flex-1 text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {date}
        </p>
        <p className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {type}
        </p>
      </div>
      <DividerRow label="Loan amount:" value={loanAmount} border />
      <div className="flex w-full items-start gap-2.5 pt-1">
        <p className="flex-1 text-[15px] leading-[1.26] tracking-[-0.5px] opacity-65" style={{ color: 'var(--content-primary)' }}>
          Term:
        </p>
        <p className="text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {term}
        </p>
      </div>
      <div className="flex w-full items-start gap-2.5 pt-1">
        <p className="flex-1 text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
          {lender}
        </p>
        <div className="flex items-center gap-1">
          <span className="text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
            {rate}
          </span>
          <span className="text-[14px] leading-[1.26] opacity-65" style={{ color: 'var(--content-primary)' }}>
            •
          </span>
          <span className="text-[15px] leading-[1.26] tracking-[-0.5px]" style={{ color: 'var(--content-primary)' }}>
            {rateType}
          </span>
        </div>
      </div>
    </div>
  )
}

function ListingDescriptionCard() {
  return (
    <div
      className="flex w-full flex-col gap-4 rounded-2xl border p-3"
      style={{ borderColor: CARD_BORDER, background: 'var(--surface-lighter)' }}
    >
      <div className="flex w-full flex-col gap-0.5">
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
        <ListingEventCard date="May 28, 2026" label="Listed for sale" price="$1,000,000" priceSub="$500 per ft²" trend="+4.2%" />
        <ListingEventCard date="Feb 3, 2026" label="Price change" price="$960,000" priceSub="$480 per ft²" trend="+12.9%" />
      </YearGroup>
      <YearGroup year="2023">
        <ListingEventCard date="Apr 2, 2023" label="Sold" price="$850,000" priceSub="$425 per ft²" />
        <ListingEventCard date="Jan 15, 2023" label="Listed for sale" price="$820,000" priceSub="$410 per ft²" />
      </YearGroup>
    </div>
  )
}

// Missouri's effective property tax rate runs ~1.1%; assessed value trails
// market value and grows a few percent a year between reassessments.
function TaxRecordsTab() {
  const years = [
    { year: '2025', taxes: '$9,800', assessedValue: '$890,000', assessedValueSub: '$445 per ft²', trend: '+3.5%' },
    { year: '2024', taxes: '$9,500', assessedValue: '$860,000', assessedValueSub: '$430 per ft²', trend: '+2.4%' },
    { year: '2023', taxes: '$9,200', assessedValue: '$840,000', assessedValueSub: '$420 per ft²', trend: '+2.4%' },
    { year: '2022', taxes: '$9,000', assessedValue: '$820,000', assessedValueSub: '$410 per ft²', trend: '+2.5%' },
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
// plus a 2025 home-equity loan (shorter term, typically-higher HELOC rate)
// that funded the remodel reflected in the 2026 listing price above.
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
