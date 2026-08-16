import { PropertyPhoto } from './PropertyPhoto'
import { PropertyNav } from './PropertyNav'
import { SubjectDetails } from './SubjectDetails'
import { ActiveSection } from './ActiveSection'
import { AlertsSection } from './AlertsSection'
import { SendToClientSection } from './SendToClientSection'
import { DigDeeperSection } from './DigDeeperSection'
import { NotesSection } from './NotesSection'
import { ExploreAreaSection } from './ExploreAreaSection'

export function PropertyScreen() {
  return (
    <div className="flex flex-col gap-10 pb-[120px]">
      <PropertyPhoto />
      <PropertyNav />
      <SubjectDetails />
      <ActiveSection />
      <AlertsSection />
      <SendToClientSection />
      <DigDeeperSection />
      <NotesSection />
      <ExploreAreaSection />
    </div>
  )
}
