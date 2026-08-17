import { useEffect, useRef, useState } from 'react'
import { X, TrendDown } from '@phosphor-icons/react'
import propertyPhoto from '../assets/images/property-photo.png'
import { GlassButton } from './GlassButton'
import type { PriceDropAlertEntry } from '../types'

const SHEET_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SHEET_DURATION_MS = 420

const LISTING_PRICE = 1_000_000

const PERCENT_PRESETS = [0.5, 1, 1.5, 2, 2.5]
const DOLLAR_PRESETS = [5000, 10000, 15000, 20000, 25000]

export interface PriceDropAlert {
  unit: '%' | '$'
  value: number
}

function formatUSD(n: number) {
  return `$${Math.round(n).toLocaleString('en-US')}`
}

function formatCompactUSD(n: number) {
  if (Math.abs(n) >= 1000) {
    const k = n / 1000
    return `-$${(Number.isInteger(k) ? k : k.toFixed(1)).toString()}k`
  }
  return `-${formatUSD(n)}`
}

export function AddAlertSheet({
  open,
  initialAlert,
  onClose,
  onSave,
  onRemove,
}: {
  open: boolean
  initialAlert?: PriceDropAlertEntry | null
  onClose: () => void
  onSave: (alert: PriceDropAlert) => void
  onRemove?: () => void
}) {
  const isEditing = !!initialAlert
  const [unit, setUnit] = useState<'%' | '$'>('%')
  const [presetIndex, setPresetIndex] = useState<number | null>(1)
  const [otherValue, setOtherValue] = useState('')
  const otherInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    if (initialAlert) {
      const presets = initialAlert.unit === '%' ? PERCENT_PRESETS : DOLLAR_PRESETS
      const idx = presets.indexOf(initialAlert.value)
      setUnit(initialAlert.unit)
      setPresetIndex(idx >= 0 ? idx : null)
      setOtherValue(idx >= 0 ? '' : String(initialAlert.value))
    } else {
      setUnit('%')
      setPresetIndex(1)
      setOtherValue('')
    }
  }, [open, initialAlert])

  const presets = unit === '%' ? PERCENT_PRESETS : DOLLAR_PRESETS
  const isOther = presetIndex === null
  const activeValue = isOther ? parseFloat(otherValue) || 0 : presets[presetIndex]
  const dropAmount = unit === '%' ? LISTING_PRICE * (activeValue / 100) : activeValue
  const alertPrice = Math.max(0, LISTING_PRICE - dropAmount)
  const canSave = activeValue > 0

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
            onClick={() => canSave && onSave({ unit, value: activeValue })}
            disabled={!canSave}
            className="h-10 px-4"
          >
            <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">
              {isEditing ? 'Update alert' : 'Set alert'}
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
          <TrendDown size={18} weight="bold" color="#c2185b" />
          <p className="text-[14px] font-bold leading-[1.6] tracking-[0.07px] text-[var(--content-secondary)]">
            Price Drop
          </p>
        </div>

        <div className="flex w-full shrink-0 flex-col items-center gap-4 px-4 py-2">
          <div className="flex w-full flex-col items-start gap-6 rounded-2xl border-[0.5px] border-[#cdc7c4] bg-[#fdfcfc] px-3 py-4">
            <div className="flex w-full items-center justify-center">
              <div className="flex items-center rounded-full bg-black/[0.06] p-[2px]">
                {(['%', '$'] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className="flex h-8 w-16 items-center justify-center rounded-full text-[14px] leading-[1.6] tracking-[0.07px] transition-colors"
                    style={
                      unit === u
                        ? { background: 'var(--surface-lighter)', color: '#111010' }
                        : { color: '#111010' }
                    }
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-wrap items-center justify-center gap-3">
              {presets.map((value, i) => {
                const active = presetIndex === i
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPresetIndex(i)}
                    className="flex min-w-[48px] items-center justify-center rounded-full border px-3 py-[9px] text-[15px] leading-[20px]"
                    style={
                      active
                        ? { background: '#111010', borderColor: '#111010', color: '#f9f9f9' }
                        : { background: 'transparent', borderColor: '#111010', color: '#111010' }
                    }
                  >
                    {unit === '%' ? value : `$${value / 1000}k`}
                  </button>
                )
              })}
              {isOther ? (
                <input
                  ref={otherInputRef}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  autoFocus
                  value={otherValue}
                  onChange={(e) => setOtherValue(e.target.value)}
                  placeholder={unit === '%' ? '%' : '$'}
                  className="w-[88px] appearance-none rounded-full border-[0.5px] px-4 py-[9px] text-center text-[15px] leading-[20px] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  style={{ background: '#f3f2f1', borderColor: 'rgba(13,12,12,0.24)', color: '#111010' }}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPresetIndex(null)}
                  className="flex min-w-[48px] items-center justify-center rounded-full border-[0.5px] px-4 py-[9px] text-[15px] leading-[20px]"
                  style={{ background: '#f3f2f1', borderColor: 'rgba(13,12,12,0.24)', color: '#72788c' }}
                >
                  Other
                </button>
              )}
            </div>
          </div>

          <div className="flex w-full items-center rounded-2xl border-[0.5px] border-[#cdc7c4] bg-[#ece1df] p-3">
            <div className="flex flex-1 flex-col items-center justify-center gap-1">
              <p className="text-[14px] leading-[1.6] tracking-[0.07px] text-[var(--content-secondary)]">Currently</p>
              <p className="text-[20px] font-bold leading-[1.5] text-[var(--content-secondary)]">
                {formatUSD(LISTING_PRICE)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 self-stretch px-2">
              <TrendDown size={18} weight="bold" color="#c2185b" />
              <p className="whitespace-nowrap text-[15px] leading-[20px] text-[#111010]">
                {formatCompactUSD(dropAmount)}
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-1">
              <p className="text-[14px] leading-[1.6] tracking-[0.07px] text-[var(--content-secondary)]">
                Alert when
              </p>
              <p className="text-[20px] font-bold leading-[1.5] text-[var(--content-secondary)]">
                {formatUSD(alertPrice)}
              </p>
            </div>
          </div>

          {isEditing && onRemove && (
            <button type="button" onClick={onRemove} className="pt-2 text-[15px] font-bold leading-[1.26] tracking-[-0.5px]" style={{ color: '#c34137' }}>
              Remove alert
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
