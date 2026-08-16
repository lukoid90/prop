import { House, Buildings, SwimmingPool, HouseLine, Tree, Barbell } from '@phosphor-icons/react'
import { Tag, MoreTag } from './Tag'

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

export function SubjectDetails() {
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
            <Stat value="4" label="Bed" />
            <Stat value="4" label="Bath" />
            <Stat value="1,800" unit="ft²" label="Home" />
            <Stat value="1.24" unit="/ac" label="Lot" />
            <Stat value="$150" unit="/mo" label="HOA" />
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-1.5">
          <Tag icon={<House size={12} />} label="Single family" />
          <Tag icon={<Buildings size={12} />} label="Contemporary" />
          <Tag icon={<SwimmingPool size={12} />} label="Pool" />
          <Tag icon={<HouseLine size={12} />} label="ADU" />
          <Tag icon={<Buildings size={12} weight="bold" />} label="City View" />
          <Tag icon={<Tree size={12} />} label="Landscaped Garden" />
          <Tag icon={<Barbell size={12} />} label="Gym" />
          <MoreTag />
        </div>
      </div>

      <div
        className="flex w-full items-center justify-center rounded-2xl border-[0.5px] p-3"
        style={{ background: '#f5f0ee', borderColor: '#ead7d2' }}
      >
        <div className="flex min-w-0 flex-1 flex-col items-start">
          <p className="text-[14px] leading-[1.48] tracking-[0.25px] text-[var(--content-tertiary)]">Owner</p>
          <p className="text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]">Romelu Bayo</p>
        </div>
        <MoreTag />
      </div>

      <div className="flex w-full flex-col items-start gap-6">
        <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Listing</p>
        <div
          className="flex w-full flex-col items-center gap-0.5 rounded-2xl pb-3 pt-3"
          style={{ background: '#b9c9c3' }}
        >
          <div className="flex w-full items-center gap-2 px-4 text-[var(--content-primary)]">
            <ListingStat label="Listed for" value="$1,000,000" />
            <ListingStat label="Per /ft² Home" value="$879" />
            <ListingStat label="Per/ac Lot" value="$431" />
          </div>
          <div className="flex w-full items-center gap-2 px-4 text-[var(--content-primary)]">
            <ListingStat label="Listed on" value="May 28" />
            <ListingStat label="DOM" value="104" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ListingStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-[102px] shrink-0 flex-col items-start justify-center gap-px">
      <p className="text-[12px] leading-[1.48] tracking-[0.5px]">{label}</p>
      <p className="text-[16px] leading-[1.48] tracking-[0px]">{value}</p>
    </div>
  )
}
