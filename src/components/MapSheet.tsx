import mapSheet from '../assets/images/map-sheet.jpg'

const SHEET_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SHEET_DURATION_MS = 420

// Static preview of the full-screen map (node 2069:11838) — the sheet itself
// is one flattened image; only the close button is interactive.
export function MapSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div className={`absolute inset-0 flex flex-col justify-end ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-out"
        style={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
      />

      <div
        className="relative h-[calc(100%-24px)] w-full overflow-hidden rounded-t-[38px] shadow-[0_-16px_32px_rgba(18,18,18,0.08)] transition-transform"
        style={{
          transform: `translateY(${open ? '0%' : '100%'})`,
          transitionDuration: `${SHEET_DURATION_MS}ms`,
          transitionTimingFunction: SHEET_EASING,
        }}
      >
        <img src={mapSheet} alt="" className="absolute inset-0 size-full object-cover object-top" />
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute rounded-full"
          style={{ left: 16, top: 24, width: 40, height: 40 }}
        />
      </div>
    </div>
  )
}
