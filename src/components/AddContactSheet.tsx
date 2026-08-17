import { useEffect, useState } from 'react'
import { X } from '@phosphor-icons/react'
import { GlassButton } from './GlassButton'
import { Toggle } from './Toggle'
import { AppleLogo } from './OwnerIcons'
import type { Owner } from '../types'

const SHEET_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SHEET_DURATION_MS = 420

export function AddContactSheet({ owner, onClose }: { owner: Owner | null; onClose: () => void }) {
  const open = !!owner
  const [includeAsProspect, setIncludeAsProspect] = useState(true)

  useEffect(() => {
    if (open) setIncludeAsProspect(true)
  }, [open])

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
        className="relative flex w-full flex-col overflow-hidden rounded-t-[38px] bg-[var(--surface-lighter)] shadow-[0_-16px_32px_rgba(18,18,18,0.08)] transition-transform"
        style={{
          transform: `translateY(${open ? '0%' : '100%'})`,
          transitionDuration: `${SHEET_DURATION_MS}ms`,
          transitionTimingFunction: SHEET_EASING,
        }}
      >
        <div className="flex h-4 w-full shrink-0 items-center justify-center">
          <div className="h-1 w-12 rounded-full bg-[rgba(18,18,18,0.24)]" />
        </div>

        <div className="relative flex h-11 w-full shrink-0 items-start justify-between px-4 pb-2">
          <GlassButton aria-label="Close" onClick={onClose} className="size-10">
            <X size={17} color="var(--content-primary)" />
          </GlassButton>
          <p className="absolute left-1/2 top-[3px] -translate-x-1/2 text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-primary)]">
            Please note
          </p>
        </div>

        {owner && (
          <div className="flex w-full flex-col items-start p-6">
            <p className="w-full text-[12px] leading-[1.26] tracking-[0.25px] text-[var(--content-tertiary)]">
              Before contacting ensure you have the appropriate consent and comply with all applicable TCPA and
              telemarketing requirements. Availability of a phone number does not indicate consent to receive calls
              or text messages.
            </p>

            <div className="flex w-full flex-col items-start justify-center py-4 text-[14px] leading-[1.26] text-[var(--content-primary)]">
              <p className="font-bold">{owner.name}</p>
              <p>{owner.phone}</p>
              <p>{owner.address}</p>
            </div>

            <div className="w-full py-4">
              <button
                type="button"
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--button-background-primary,#121212)] px-5 shadow-[0_1px_2px_rgba(18,18,18,0.04),0_2px_4px_rgba(18,18,18,0.06)]"
              >
                <AppleLogo size={18} />
                <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">
                  Add to contacts
                </span>
              </button>
            </div>

            <div className="flex w-full items-center gap-2 rounded-2xl bg-[var(--on-surface-dim,#f5f0ee)] p-3">
              <p className="flex-1 text-[16px] leading-[1.48] tracking-[0px] text-[var(--content-primary)]">
                Include as a prospect
              </p>
              <Toggle on={includeAsProspect} onChange={() => setIncludeAsProspect((v) => !v)} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
