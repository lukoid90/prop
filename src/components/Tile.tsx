import type { ReactNode } from 'react'

export function Tile({
  width,
  imgHeight,
  image,
  alt,
  eyebrow,
  title,
  icon,
  className = '',
  onClick,
}: {
  width: number
  imgHeight: number
  image: string
  alt: string
  eyebrow?: string
  title: ReactNode
  icon: ReactNode
  className?: string
  onClick?: () => void
}) {
  const Wrapper = onClick ? 'button' : 'div'
  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex shrink-0 flex-col items-start overflow-hidden rounded-2xl border border-[var(--border-dimmer)] text-left ${className}`}
      style={{ width }}
    >
      <img src={image} alt={alt} className="w-full object-cover" style={{ height: imgHeight }} />
      <div className="flex h-16 w-full items-center justify-center gap-[2px] rounded-b-2xl rounded-tr-[9px] p-3">
        <div className="flex min-w-0 flex-1 flex-col items-start">
          {eyebrow && (
            <p className="w-full truncate text-[14px] leading-[1.48] tracking-[0.25px] text-[var(--content-tertiary)]">
              {eyebrow}
            </p>
          )}
          <div className="w-full truncate text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]">
            {title}
          </div>
        </div>
        <div className="shrink-0 text-[var(--content-primary)]">{icon}</div>
      </div>
    </Wrapper>
  )
}
