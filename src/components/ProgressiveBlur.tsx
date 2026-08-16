// Approximates a top-to-bottom variable blur (strong near the top, none by
// the bottom) by stacking several backdrop-blur layers, each masked to its
// own band via a linear "tent" gradient so the bands sum to full coverage.
const LAYER_COUNT = 6
const START_BLUR = 8
const END_BLUR = 0
const Y_START = 8
const Y_END = 100

const STEP = (Y_END - Y_START) / (LAYER_COUNT - 1)

const LAYERS = Array.from({ length: LAYER_COUNT }, (_, i) => {
  const center = Y_START + STEP * i
  const blur = START_BLUR + ((END_BLUR - START_BLUR) * i) / (LAYER_COUNT - 1)
  const bandStart = Math.max(0, center - STEP)
  const bandEnd = Math.min(100, center + STEP)
  return { blur, center, bandStart, bandEnd }
})

export function ProgressiveBlur({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`}>
      {LAYERS.map(({ blur, center, bandStart, bandEnd }, i) => (
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
