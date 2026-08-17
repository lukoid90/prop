import type { ReactNode } from 'react'
import { ChatCircle, Copy, DotsThreeCircle, EnvelopeSimple, NotePencil, Printer, ShareNetwork } from '@phosphor-icons/react'
import propertyPhoto from '../assets/images/property-photo.png'

const SHEET_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SHEET_DURATION_MS = 420

function AppIcon({ label, bg, children }: { label: string; bg: string; children: ReactNode }) {
  return (
    <div className="flex w-16 shrink-0 flex-col items-center gap-1.5">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl" style={{ background: bg }}>
        {children}
      </div>
      <span className="text-center text-[12px] leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
        {label}
      </span>
    </div>
  )
}

function ActionRow({
  icon,
  label,
  border = true,
  onClick,
}: {
  icon: ReactNode
  label: string
  border?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[52px] w-full items-center gap-3 px-4 ${border ? 'border-b' : ''}`}
      style={border ? { borderColor: 'var(--border-dimmer)' } : undefined}
    >
      {icon}
      <span className="text-[16px] leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
        {label}
      </span>
    </button>
  )
}

export function ShareSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
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
        className="relative flex w-full flex-col gap-2 p-2 transition-transform"
        style={{
          transform: `translateY(${open ? '0%' : '100%'})`,
          transitionDuration: `${SHEET_DURATION_MS}ms`,
          transitionTimingFunction: SHEET_EASING,
        }}
      >
        <div className="flex w-full flex-col overflow-hidden rounded-[20px]" style={{ background: 'rgba(249,246,244,0.98)' }}>
          <div className="flex h-3.5 w-full shrink-0 items-center justify-center pt-2">
            <div className="h-1 w-9 rounded-full bg-[rgba(18,18,18,0.24)]" />
          </div>

          <div className="flex w-full shrink-0 items-center gap-3 px-4 py-3">
            <img src={propertyPhoto} alt="" className="size-10 shrink-0 rounded-lg object-cover" />
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-[13px] font-bold leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
                780 Correa Way, Ozark, MO 42802
              </p>
              <p className="truncate text-[13px] leading-[1.26] opacity-65" style={{ color: 'var(--content-primary)' }}>
                breezy.app
              </p>
            </div>
          </div>

          <div className="w-full shrink-0 px-4 pb-2">
            <div className="h-px w-full" style={{ background: 'var(--border-dimmer)' }} />
          </div>

          <div className="flex w-full shrink-0 gap-4 overflow-x-auto px-4 pb-4 pt-1 [scrollbar-width:none]">
            <AppIcon label="AirDrop" bg="linear-gradient(180deg,#3fa9f5,#1c7ed6)">
              <ShareNetwork size={26} weight="fill" color="white" />
            </AppIcon>
            <AppIcon label="Messages" bg="#34c759">
              <ChatCircle size={26} weight="fill" color="white" />
            </AppIcon>
            <AppIcon label="Mail" bg="linear-gradient(180deg,#5ac8fa,#0a84ff)">
              <EnvelopeSimple size={24} weight="fill" color="white" />
            </AppIcon>
            <AppIcon label="More" bg="rgba(18,18,18,0.06)">
              <DotsThreeCircle size={26} color="var(--content-primary)" />
            </AppIcon>
          </div>

          <div className="flex w-full flex-col">
            <ActionRow icon={<Copy size={20} color="var(--content-primary)" />} label="Copy Link" onClick={onClose} />
            <ActionRow icon={<NotePencil size={20} color="var(--content-primary)" />} label="Add to Notes" onClick={onClose} />
            <ActionRow icon={<Printer size={20} color="var(--content-primary)" />} label="Print" border={false} onClick={onClose} />
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-[52px] w-full shrink-0 items-center justify-center rounded-[20px]"
          style={{ background: 'rgba(249,246,244,0.98)' }}
        >
          <span className="text-[17px] font-bold leading-[1.26]" style={{ color: 'var(--content-primary)' }}>
            Cancel
          </span>
        </button>
      </div>
    </div>
  )
}
