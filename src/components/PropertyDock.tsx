import { GlassButton } from './GlassButton'

export function PropertyDock() {
  return (
    <div className="pointer-events-none flex flex-col items-center gap-2 pb-2">
      <div className="pointer-events-auto flex items-center gap-2 pb-[10px]">
        <GlassButton variant="dark" width={136} height={48} padding="14px 20px">
          <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)] whitespace-nowrap">
            Set an alert
          </span>
        </GlassButton>
        <GlassButton variant="dark" width={162} height={48} padding="14px 20px">
          <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)] whitespace-nowrap">
            Share property
          </span>
        </GlassButton>
      </div>
      <div className="h-[5px] w-[134px] rounded-full bg-[var(--content-primary)] opacity-40" />
    </div>
  )
}
