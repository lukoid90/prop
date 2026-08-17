import type { CSSProperties } from 'react'

// Matches Figma's "Active Pattern" fill: a continuous mountain-range/zigzag
// strip of triangle peaks in the brand green, repeated at 6.4x1.92px and
// shown at 12% opacity over the card surface. Built as an SVG data URI
// since the source PNG asset isn't fetchable from this environment.
const TILE_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='8' height='2.4' viewBox='0 0 8 2.4'><path d='M0 2.4L1 0L2 2.4L3 0L4 2.4L5 0L6 2.4L7 0L8 2.4Z' fill='%230d5739'/></svg>`

export const LISTING_PATTERN_STYLE: CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,${TILE_SVG}")`,
  backgroundSize: '6.4px 1.92px',
  backgroundPosition: 'top left',
  backgroundRepeat: 'repeat',
}
