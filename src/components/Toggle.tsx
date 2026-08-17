import { useState } from 'react'

const SWITCH_WIDTH = 64
const SWITCH_HEIGHT = 28
const KNOB_HEIGHT = 24
const KNOB_WIDTH = 38
const KNOB_INSET = 2
const KNOB_PRESSED_WIDTH = 46

export function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  const [pressed, setPressed] = useState(false)
  const knobWidth = pressed ? KNOB_PRESSED_WIDTH : KNOB_WIDTH
  const knobLeft = on ? SWITCH_WIDTH - knobWidth - KNOB_INSET : KNOB_INSET

  const release = () => setPressed(false)

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onChange}
      onPointerDown={() => setPressed(true)}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      className="relative shrink-0 rounded-full transition-colors duration-200 ease-out"
      style={{ width: SWITCH_WIDTH, height: SWITCH_HEIGHT, background: on ? 'var(--listing-active)' : '#e9e9ea' }}
    >
      <span
        className="absolute top-1/2 rounded-full shadow-[0_3px_1px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out"
        style={{
          width: knobWidth,
          height: KNOB_HEIGHT,
          left: knobLeft,
          transform: 'translateY(-50%)',
          background: 'var(--surface-lighter)',
        }}
      />
    </button>
  )
}
