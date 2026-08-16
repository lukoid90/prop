import LiquidGlass from 'liquid-glass-react'
import type { ReactNode } from 'react'

export function GlassButton({
  variant = 'light',
  width,
  height,
  padding = '10px',
  cornerRadius = 999,
  className = '',
  children,
}: {
  variant?: 'light' | 'dark'
  width: number
  height: number
  padding?: string
  cornerRadius?: number
  className?: string
  children: ReactNode
}) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width, height }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: cornerRadius,
          background: variant === 'dark' ? 'rgba(18,18,18,0.4)' : 'rgba(253,252,252,0.3)',
        }}
      />
      <LiquidGlass
        style={{ position: 'absolute' }}
        padding={padding}
        cornerRadius={cornerRadius}
        overLight={false}
        blurAmount={0.12}
        saturation={variant === 'dark' ? 115 : 150}
        aberrationIntensity={1.5}
        elasticity={0.15}
      >
        <div className="flex items-center justify-center gap-1.5">{children}</div>
      </LiquidGlass>
    </div>
  )
}
