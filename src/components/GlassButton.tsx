import type { ReactNode } from 'react'

const VARIANTS = {
  light: {
    background: 'rgba(253,252,252,0.45)',
    color: 'var(--content-primary)',
  },
  dark: {
    background: 'rgba(18,18,18,0.55)',
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
      className={`flex items-center justify-center gap-1.5 rounded-full backdrop-blur-md ${className}`}
      style={{
        background: v.background,
        color: v.color,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 2px rgba(18,18,18,0.06)',
      }}
    >
      {children}
    </div>
  )
}
