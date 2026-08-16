import { PropertyPhoto } from './PropertyPhoto'
import { PropertyNav } from './PropertyNav'
import { SubjectDetails } from './SubjectDetails'
import { ActiveSection } from './ActiveSection'
import { AlertsSection } from './AlertsSection'
import { SendToClientSection } from './SendToClientSection'
import { DigDeeperSection } from './DigDeeperSection'
import { NotesSection } from './NotesSection'
import { ExploreAreaSection } from './ExploreAreaSection'
import { SpecsSection } from './SpecsSection'
import type { Note, PriceDropAlertEntry } from '../types'

export function PropertyScreen({
  notes,
  onOpenAddNote,
  activeTab,
  onTabChange,
  priceDropAlerts,
  onOpenPriceDropAlert,
}: {
  notes: Note[]
  onOpenAddNote: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  priceDropAlerts: PriceDropAlertEntry[]
  onOpenPriceDropAlert: () => void
}) {
  if (activeTab === 'Specs') {
    return (
      <div className="flex flex-col pb-[120px]">
        <div style={{ height: 126 }} aria-hidden />
        <SpecsSection />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-[120px]">
      <PropertyPhoto />
      <PropertyNav active={activeTab} onChange={onTabChange} />
      <SubjectDetails />
      <div className="flex flex-col gap-8">
        <ActiveSection priceDropAlerts={priceDropAlerts} />
        <AlertsSection onOpenPriceDropAlert={onOpenPriceDropAlert} />
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
