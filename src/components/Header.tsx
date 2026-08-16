import { ArrowLeft, DotsThree } from '@phosphor-icons/react'
import { StatusBar } from './StatusBar'
import { GlassButton } from './GlassButton'

export function Header() {
  return (
    <div className="relative w-full">
      <div
        className="absolute inset-0 backdrop-blur-[4px]"
        style={{
          background: 'linear-gradient(to bottom, rgba(18,18,18,0.16), rgba(18,18,18,0.06) 79%, transparent)',
        }}
      />
      <div className="relative flex flex-col">
        <StatusBar />
        <div className="flex h-[44px] items-center justify-between px-2 pb-2">
          <GlassButton className="pointer-events-auto size-10">
            <ArrowLeft size={17} color="var(--content-inverse)" />
          </GlassButton>
          <div className="flex flex-col items-center gap-0.5 text-center text-[var(--content-inverse)]">
            <p className="text-[14px] font-bold leading-[1.26] tracking-[-0.5px]">780 Correa Way, MO 42802</p>
            <p className="text-[14px] leading-[1.26] tracking-[-0.5px]">Listed for $1m • May 28</p>
          </div>
          <GlassButton className="pointer-events-auto size-10">
            <DotsThree size={17} weight="bold" color="var(--content-inverse)" />
          </GlassButton>
        </div>
      </div>
    </div>
  )
}
