import { useEffect, useRef, useState } from 'react'
import { X } from '@phosphor-icons/react'
import propertyPhoto from '../assets/images/property-photo.png'
import { GlassButton } from './GlassButton'

const SHEET_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SHEET_DURATION_MS = 420

export function NoteSheet({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose: () => void
  onSave: (message: string) => void
}) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!open) return
    setText('')
    const id = setTimeout(() => textareaRef.current?.focus(), SHEET_DURATION_MS)
    return () => clearTimeout(id)
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
            onClick={() => text.trim() && onSave(text.trim())}
            disabled={!text.trim()}
            className="h-10 px-4"
          >
            <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">
              Save
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

        <div className="min-h-0 flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Leave a note about the property..."
            className="size-full resize-none bg-transparent p-4 text-[15px] leading-[1.26] tracking-[-0.5px] text-[var(--content-primary)] outline-none placeholder:text-[rgba(18,18,18,0.24)]"
            style={{ caretColor: '#7f5a90' }}
          />
        </div>
      </div>
    </div>
  )
}
