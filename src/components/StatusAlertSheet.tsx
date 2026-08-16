import { useEffect, useState } from 'react'
import { X, Tag } from '@phosphor-icons/react'
import propertyPhoto from '../assets/images/property-photo.png'
import { GlassButton } from './GlassButton'

const SHEET_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SHEET_DURATION_MS = 420

const STATUS_OPTIONS = ['Pending', 'Sold', 'Withdrawn', 'Back on Market'] as const

export interface StatusAlert {
  statuses: string[]
  removeWhenSold: boolean
}

const SWITCH_WIDTH = 64
const SWITCH_HEIGHT = 28
const KNOB_SIZE = 24
const KNOB_INSET = 2
const KNOB_PRESSED_WIDTH = 32

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  const [pressed, setPressed] = useState(false)
  const knobWidth = pressed ? KNOB_PRESSED_WIDTH : KNOB_SIZE
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
        className="absolute top-1/2 rounded-full bg-white shadow-[0_3px_1px_rgba(0,0,0,0.06),0_3px_8px_rgba(0,0,0,0.15)] transition-all duration-200 ease-out"
        style={{ width: knobWidth, height: KNOB_SIZE, left: knobLeft, transform: 'translateY(-50%)' }}
      />
    </button>
  )
}

function ToggleRow({ label, on, onChange }: { label: string; on: boolean; onChange: () => void }) {
  return (
    <div className="flex h-10 w-full items-center gap-2 px-2">
      <p className="flex-1 text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]">{label}</p>
      <Toggle on={on} onChange={onChange} />
    </div>
  )
}

export function StatusAlertSheet({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose: () => void
  onSave: (alert: StatusAlert) => void
}) {
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(STATUS_OPTIONS.map((s) => [s, true])),
  )
  const [removeWhenSold, setRemoveWhenSold] = useState(true)

  useEffect(() => {
    if (!open) return
    setSelected(Object.fromEntries(STATUS_OPTIONS.map((s) => [s, true])))
    setRemoveWhenSold(true)
  }, [open])

  const canSave = STATUS_OPTIONS.some((s) => selected[s])

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
        className="relative flex h-[calc(100%-24px)] w-full flex-col overflow-hidden rounded-t-[38px] bg-[#f5f0ee] shadow-[0_-16px_32px_rgba(18,18,18,0.08)] transition-transform"
        style={{
          transform: `translateY(${open ? '0%' : '100%'})`,
          transitionDuration: `${SHEET_DURATION_MS}ms`,
          transitionTimingFunction: SHEET_EASING,
        }}
      >
        <div className="flex h-4 w-full shrink-0 items-center justify-center">
          <div className="h-1 w-12 rounded-full bg-[rgba(18,18,18,0.24)]" />
        </div>

        <div className="flex w-full shrink-0 items-center justify-between px-4 pb-3">
          <GlassButton aria-label="Close" onClick={onClose} className="size-10">
            <X size={17} color="var(--content-primary)" />
          </GlassButton>
          <GlassButton
            variant="dark"
            onClick={() =>
              canSave && onSave({ statuses: STATUS_OPTIONS.filter((s) => selected[s]), removeWhenSold })
            }
            disabled={!canSave}
            className="h-10 px-4"
          >
            <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">
              Set alert
            </span>
          </GlassButton>
        </div>

        <div className="flex w-full shrink-0 items-center gap-4 p-4">
          <img src={propertyPhoto} alt="" className="size-20 shrink-0 rounded-lg object-cover" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-[var(--content-primary)]">
            <p className="text-[14px] leading-[1.48] tracking-[0.25px]">Ozark Meadows</p>
            <div className="font-[family-name:var(--font-display)] text-[20px] leading-[1.26]">
              <p>780 Correa Way, Ozark,</p>
              <p>MO 42802</p>
            </div>
          </div>
        </div>

        <div className="w-full shrink-0 px-4 py-2">
          <div className="h-px w-full bg-[var(--border-dimmer)]" />
        </div>

        <div className="flex w-full shrink-0 items-center justify-center gap-2 p-4">
          <Tag size={16} weight="fill" color="#36312e" />
          <p className="text-[17px] font-bold leading-[1.26] tracking-[-0.5px] text-[#36312e]">Status Change</p>
        </div>

        <div className="flex w-full flex-col items-center gap-4 px-4 py-2">
          <div className="flex w-full flex-col gap-2 rounded-2xl border-[0.5px] border-[#cdc7c4] bg-[#fdfcfc] px-3 py-4">
            {STATUS_OPTIONS.map((status) => (
              <ToggleRow
                key={status}
                label={status}
                on={selected[status]}
                onChange={() => setSelected((prev) => ({ ...prev, [status]: !prev[status] }))}
              />
            ))}
          </div>

          <div className="flex w-full flex-col rounded-2xl border-[0.5px] border-[#cdc7c4] bg-[#f1e7e4] px-3 py-4">
            <ToggleRow label="Remove alert when sold" on={removeWhenSold} onChange={() => setRemoveWhenSold((v) => !v)} />
          </div>
        </div>
      </div>
    </div>
  )
}
