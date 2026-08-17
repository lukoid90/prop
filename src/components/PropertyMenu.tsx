import { PencilSimple, Bell, Export, Question } from '@phosphor-icons/react'

function MenuRow({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-12 w-full items-center gap-3 px-4">
      {icon}
      <span className="text-[16px] leading-[1.26] text-[var(--content-inverse)]">{label}</span>
    </button>
  )
}

export function PropertyMenu({
  open,
  onClose,
  onShareProperty,
}: {
  open: boolean
  onClose: () => void
  onShareProperty: () => void
}) {
  return (
    <div className={`absolute inset-0 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <button
        type="button"
        aria-label="Dismiss"
        className="absolute inset-0 transition-opacity duration-150 ease-out"
        style={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
      />

      <div
        className="absolute right-3 flex w-[236px] flex-col overflow-hidden rounded-[24px] shadow-[0_16px_32px_rgba(18,18,18,0.24)] backdrop-blur-2xl transition-all duration-150 ease-out"
        style={{
          top: 62,
          background: 'rgba(18,18,18,0.6)',
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-4px)',
          transformOrigin: 'top right',
        }}
      >
        <MenuRow icon={<PencilSimple size={20} color="var(--content-inverse)" />} label="Edit property data" onClick={onClose} />
        <MenuRow icon={<Bell size={20} color="var(--content-inverse)" />} label="Set an alert" onClick={onClose} />
        <MenuRow
          icon={<Export size={20} color="var(--content-inverse)" />}
          label="Share property"
          onClick={() => {
            onClose()
            onShareProperty()
          }}
        />
        <MenuRow icon={<Question size={20} color="var(--content-inverse)" />} label="Get help" onClick={onClose} />
      </div>
    </div>
  )
}
