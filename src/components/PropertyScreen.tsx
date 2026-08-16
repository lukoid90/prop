import { PropertyPhoto } from './PropertyPhoto'
import { PropertyNav } from './PropertyNav'
import { SubjectDetails } from './SubjectDetails'
import { ActiveSection } from './ActiveSection'
import { AlertsSection } from './AlertsSection'
import { SendToClientSection } from './SendToClientSection'
import { DigDeeperSection } from './DigDeeperSection'
import { NotesSection } from './NotesSection'
import { ExploreAreaSection } from './ExploreAreaSection'
import type { Note } from '../types'

export function PropertyScreen({
  notes,
  onOpenAddNote,
  activeTab,
  onTabChange,
}: {
  notes: Note[]
  onOpenAddNote: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}) {
  return (
    <div className="flex flex-col gap-6 pb-[120px]">
      <PropertyPhoto />
      <PropertyNav active={activeTab} onChange={onTabChange} />
      <SubjectDetails />
      <div className="flex flex-col gap-8">
        <ActiveSection />
        <AlertsSection />
        <div className="flex flex-col gap-10">
          <SendToClientSection />
          <DigDeeperSection />
          <NotesSection notes={notes} onOpenAdd={onOpenAddNote} />
          <ExploreAreaSection />
        </div>
      </div>
    </div>
  )
}
