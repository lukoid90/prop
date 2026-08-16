import type { ReactNode } from 'react'

const VARIANTS = {
  light: {
    lower: 'rgba(253,252,252,0.24)',
    upper: 'rgba(253,252,252,0.6)',
    color: 'var(--content-primary)',
  },
  dark: {
    lower: 'rgba(18,18,18,0.4)',
    upper: 'rgba(18,18,18,0.6)',
    color: 'var(--content-inverse)',
  },
} as const

export function GlassButton({
  variant = 'light',
  className = '',
  children,
}: {
  variant?: keyof typeof VARIANTS
  className?: string
  children: ReactNode
}) {
  const v = VARIANTS[variant]
  return (
    <div
      className={`relative flex items-center justify-center gap-1.5 overflow-hidden rounded-full backdrop-blur-md ${className}`}
      style={{
        color: v.color,
        boxShadow:
          '0 1px 1px rgba(18,18,18,0.04), 0 2px 2px rgba(18,18,18,0.06), inset 0 40px 10px -40px #282828, inset 0 -40px 10px -40px #282828, inset 0 40px 30px -40px #e6e6e6',
      }}
    >
      <div className="pointer-events-none absolute inset-0" style={{ background: v.lower }} />
      <div className="pointer-events-none absolute inset-0 mix-blend-luminosity" style={{ background: v.upper }} />
      <div className="relative flex items-center justify-center gap-1.5">{children}</div>
    </div>
  )
}
