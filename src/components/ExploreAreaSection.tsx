import { ArrowsOutSimple, GraduationCap, TrainSimple, AirplaneTilt } from '@phosphor-icons/react'
import { GlassButton } from './GlassButton'
import { PhotoPlaceholder } from './Placeholders'

const PINS: { icon: 'grad' | 'train' | 'plane'; left: string; top: string }[] = [
  { icon: 'grad', left: '56.5%', top: '16.3%' },
  { icon: 'grad', left: '18.4%', top: '28.1%' },
  { icon: 'grad', left: '67.6%', top: '63.7%' },
  { icon: 'train', left: '23.8%', top: '67.4%' },
  { icon: 'plane', left: '11.1%', top: '75.6%' },
  { icon: 'train', left: '76.2%', top: '35.6%' },
]

function PinIcon({ icon }: { icon: (typeof PINS)[number]['icon'] }) {
  if (icon === 'grad') return <GraduationCap size={13} weight="fill" color="#184762" />
  if (icon === 'train') return <TrainSimple size={13} weight="fill" color="#0d5739" />
  return <AirplaneTilt size={13} weight="fill" color="var(--content-primary)" />
}

export function ExploreAreaSection() {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Explore the area</p>
      <div
        className="relative h-[270px] w-full overflow-hidden rounded-2xl border border-[var(--border-dimmer)]"
        style={{
          background:
            'repeating-linear-gradient(0deg, #efe9e5 0 38px, #e7e0db 38px 39px), repeating-linear-gradient(90deg, #efe9e5 0 38px, #e7e0db 38px 39px)',
        }}
      >
        {PINS.map((pin, i) => (
          <div
            key={i}
            className="absolute flex size-8 items-center justify-center rounded-full bg-[var(--surface-lighter)] shadow-[0_1px_2px_rgba(18,18,18,0.06),0_2px_4px_rgba(18,18,18,0.04)]"
            style={{ left: pin.left, top: pin.top, transform: 'translate(-50%,-50%)' }}
          >
            <PinIcon icon={pin.icon} />
          </div>
        ))}

        <div
          className="absolute size-8 overflow-hidden rounded-full border-4 border-[var(--border-default)] shadow-[0_8px_16px_rgba(0,0,0,0.08)]"
          style={{ left: '45.4%', top: '43.7%', transform: 'translate(-50%,-50%)' }}
        >
          <PhotoPlaceholder seed="property-hero" className="size-full" iconSize={16} />
        </div>

        <GlassButton className="absolute right-[15px] top-[15px] size-8">
          <ArrowsOutSimple size={13} color="var(--content-primary)" />
        </GlassButton>
      </div>
    </div>
  )
}
