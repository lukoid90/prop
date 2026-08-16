import { House, UserCircle } from '@phosphor-icons/react'
import type { CSSProperties } from 'react'

const GRADIENTS = [
  'linear-gradient(135deg, #cfd9c9 0%, #a9bcb7 55%, #7f9a8f 100%)',
  'linear-gradient(135deg, #e8d9c9 0%, #d3b79a 55%, #a9825f 100%)',
  'linear-gradient(135deg, #d9c9d3 0%, #b79aac 55%, #8a5f79 100%)',
  'linear-gradient(135deg, #c9d3d9 0%, #9aacb7 55%, #5f7f9a 100%)',
]

function gradientFor(seed: string) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return GRADIENTS[hash % GRADIENTS.length]
}

/**
 * The real Figma photo assets live on figma.com's asset CDN, which this
 * environment's egress policy blocks — so photographic content is
 * represented with a styled placeholder instead of the real image.
 */
export function PhotoPlaceholder({
  seed,
  className = '',
  style,
  iconSize = 28,
}: {
  seed: string
  className?: string
  style?: CSSProperties
  iconSize?: number
}) {
  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{ background: gradientFor(seed), ...style }}
    >
      <House size={iconSize} weight="light" color="rgba(253,252,252,0.55)" />
    </div>
  )
}

export function AvatarPlaceholder({ seed, size = 44 }: { seed: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full"
      style={{ width: size, height: size, background: gradientFor(seed) }}
    >
      <UserCircle size={size * 0.78} weight="fill" color="rgba(253,252,252,0.75)" />
    </div>
  )
}
