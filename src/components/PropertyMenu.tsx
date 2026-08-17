import { PencilSimple, Bell, Export, Question } from '@phosphor-icons/react'

function MenuRow({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex h-[39px] w-full items-center gap-2">
      {icon}
      <span className="text-[14px] leading-[1.48] tracking-[0.25px] text-[var(--content-inverse)]">{label}</span>
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
        className="absolute right-3 flex w-[236px] flex-col gap-0 overflow-hidden rounded-[16px] p-4 transition-all duration-150 ease-out"
        style={{
          top: 62,
          background: 'rgba(253,252,252,0.06)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          boxShadow:
            'inset 0 40px 10px -40px #282828, inset 0 -40px 10px -40px #282828, inset 0 40px 30px -40px #e6e6e6, 0 16px 32px rgba(18,18,18,0.24)',
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
