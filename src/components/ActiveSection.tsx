import { PencilSimple } from '@phosphor-icons/react'
import { NotepadRow } from './NotepadRow'

const ROW_BG = '#eff2f1'

export function ActiveSection() {
  return (
    <div className="flex w-full flex-col items-start gap-6 px-4">
      <p className="text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Active</p>
      <div className="flex w-full flex-col gap-4">
        <NotepadRow
          avatarSeed="agent-1"
          topLine={{ text: 'Yesterday', size: 'small' }}
          bottomLine={{ text: 'Status Change', size: 'large' }}
          background={ROW_BG}
          action={<PencilSimple size={20} />}
        />
        <NotepadRow
          avatarSeed="agent-2"
          topLine={{ text: 'Aug 14', size: 'small' }}
          bottomLine={{ text: '1% Price Drop', size: 'large' }}
          background={ROW_BG}
          action={<PencilSimple size={20} />}
        />
      </div>
    </div>
  )
}
