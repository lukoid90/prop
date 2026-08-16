import { useState } from 'react'
import { X } from '@phosphor-icons/react'
import propertyPhoto from '../assets/images/property-photo.png'

export function NoteSheet({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (message: string) => void
}) {
  const [text, setText] = useState('')

  return (
    <div className="absolute inset-0 flex flex-col justify-end">
      <button type="button" aria-label="Close" className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative flex h-[calc(100%-24px)] w-full flex-col overflow-hidden rounded-t-[38px] bg-[#f5f0ee] shadow-[0_-16px_32px_rgba(18,18,18,0.08)]">
        <div className="flex h-4 w-full shrink-0 items-center justify-center">
          <div className="h-1 w-12 rounded-full bg-[rgba(18,18,18,0.24)]" />
        </div>

        <div className="flex w-full shrink-0 items-center justify-between px-4 pb-3">
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full"
            style={{ background: 'rgba(253,252,252,0.6)' }}
          >
            <X size={17} color="var(--content-primary)" />
          </button>
          <button
            type="button"
            onClick={() => text.trim() && onSave(text.trim())}
            disabled={!text.trim()}
            className="flex h-10 items-center justify-center rounded-full px-4 disabled:opacity-40"
            style={{ background: 'rgba(18,18,18,0.6)' }}
          >
            <span className="text-[15px] font-bold leading-[1.26] tracking-[-0.5px] text-[var(--content-inverse)]">
              Save
            </span>
          </button>
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
            autoFocus
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
