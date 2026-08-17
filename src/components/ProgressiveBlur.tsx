// Approximates a top-to-bottom variable blur by stacking several
// backdrop-blur layers, each masked to its own band via a linear "tent"
// gradient so the bands sum to full coverage.
const LAYER_COUNT = 6

export function ProgressiveBlur({
  className = '',
  startBlur = 8,
  endBlur = 0,
  yStart = 8,
  yEnd = 100,
}: {
  className?: string
  startBlur?: number
  endBlur?: number
  yStart?: number
  yEnd?: number
}) {
  const step = (yEnd - yStart) / (LAYER_COUNT - 1)
  const layers = Array.from({ length: LAYER_COUNT }, (_, i) => {
    const center = yStart + step * i
    const blur = startBlur + ((endBlur - startBlur) * i) / (LAYER_COUNT - 1)
    const bandStart = Math.max(0, center - step)
    const bandEnd = Math.min(100, center + step)
    return { blur, center, bandStart, bandEnd }
  })

  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {layers.map(({ blur, center, bandStart, bandEnd }, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            backdropFilter: blur > 0.1 ? `blur(${blur}px)` : undefined,
            WebkitBackdropFilter: blur > 0.1 ? `blur(${blur}px)` : undefined,
            maskImage: `linear-gradient(to bottom, transparent ${bandStart}%, black ${center}%, transparent ${bandEnd}%)`,
            WebkitMaskImage: `linear-gradient(to bottom, transparent ${bandStart}%, black ${center}%, transparent ${bandEnd}%)`,
          }}
        />
      ))}
    </div>
  )
}
