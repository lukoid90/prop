import type { ReactNode } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

export function Tag({ icon, label, onClick }: { icon?: ReactNode; label: string; onClick?: () => void }) {
  const Wrapper = onClick ? 'button' : 'div'
  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className="flex h-6 shrink-0 items-center justify-center gap-[2px] rounded-full border-[0.5px] border-[var(--border-resting)] bg-[var(--surface-lighter)] py-1 pl-[7px] pr-2"
    >
      {icon}
      <span className="text-[12px] leading-[1.26] tracking-[0.25px] text-[var(--content-primary)]">{label}</span>
    </Wrapper>
  )
}

export function MoreTag({
  label = 'More',
  variant = 'default',
  onClick,
}: {
  label?: string
  variant?: 'default' | 'success'
  onClick?: () => void
}) {
  const color = variant === 'success' ? '#469b70' : 'var(--content-primary)'
  const Wrapper = onClick ? 'button' : 'div'
  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className="flex h-6 shrink-0 items-center justify-center gap-[2px] rounded-full border-[0.5px] py-1 pl-[10px] pr-2"
      style={{ borderColor: color }}
    >
      <span className="text-[12px] leading-[1.26] tracking-[0.25px]" style={{ color }}>
        {label}
      </span>
      <ArrowRight size={13} color={color} />
    </Wrapper>
  )
}
