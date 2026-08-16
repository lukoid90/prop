import { Notepad } from '@phosphor-icons/react'
import { NotepadRow } from './NotepadRow'

export function NotesSection() {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <p className="w-full text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Add notes</p>
      <NotepadRow
        avatarSeed="beth"
        topLine={{ text: 'Beth', size: 'large' }}
        bottomLine={{ text: 'Tap to leave a note', size: 'small' }}
        background="#f8f4f2"
        avatarSize={40}
        action={<Notepad size={28} />}
      />
    </div>
  )
}
