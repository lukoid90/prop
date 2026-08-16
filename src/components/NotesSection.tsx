import { NotepadRow } from './NotepadRow'
import avatarAgent from '../assets/images/avatar-agent.png'
import noteIcon from '../assets/images/note-icon.svg'
import type { Note } from '../types'

export function NotesSection({ notes, onOpenAdd }: { notes: Note[]; onOpenAdd: () => void }) {
  return (
    <div className="flex w-full flex-col items-center gap-4 px-4">
      <p className="w-full text-[20px] font-bold leading-[1.26] text-[var(--content-primary)]">Add notes</p>
      <button type="button" onClick={onOpenAdd} className="w-full cursor-pointer text-left">
        <NotepadRow
          avatarImage={avatarAgent}
          topLine={{ text: 'Beth', size: 'large' }}
          bottomLine={{ text: 'Tap to leave a note', size: 'small' }}
          background="#f8f4f2"
          avatarSize={40}
          action={<img src={noteIcon} alt="" width={28} height={28} />}
        />
      </button>
      {notes.map((note) => (
        <NotepadRow
          key={note.id}
          avatarImage={avatarAgent}
          topLine={{ text: note.date, size: 'small' }}
          bottomLine={{ text: note.message, size: 'large' }}
          background="#eff2f1"
          avatarSize={40}
        />
      ))}
    </div>
  )
}
