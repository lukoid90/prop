import { GlassButton } from './GlassButton'

export function PropertyDock({ onShareProperty }: { onShareProperty: () => void }) {
  return (
    <div className="pointer-events-none relative h-[74px] w-full">
      <div className="pointer-events-auto absolute inset-x-0 top-0 flex items-center justify-center gap-3">
        <GlassButton variant="dark" className="h-10 w-[132px] px-4">
          <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">
            Set an alert
          </span>
        </GlassButton>
        <GlassButton variant="dark" onClick={onShareProperty} className="h-10 whitespace-nowrap px-4">
          <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">
            Share property
          </span>
        </GlassButton>
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-center">
        <div className="h-[5px] w-[134px] rounded-full bg-[var(--content-primary)] opacity-40" />
      </div>
    </div>
  )
}
