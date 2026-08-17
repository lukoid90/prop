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
import { RecordsSection } from './RecordsSection'
import type { Note, PriceDropAlertEntry, StatusAlertEntry } from '../types'

export function PropertyScreen({
  notes,
  onOpenAddNote,
  activeTab,
  onTabChange,
  priceDropAlert,
  onOpenPriceDropAlert,
  statusAlert,
  onOpenStatusAlert,
  onShareProperty,
  onAddToBuyerSearch,
  onOpenMap,
}: {
  notes: Note[]
  onOpenAddNote: () => void
  activeTab: string
  onTabChange: (tab: string) => void
  priceDropAlert: PriceDropAlertEntry | null
  onOpenPriceDropAlert: () => void
  statusAlert: StatusAlertEntry | null
  onOpenStatusAlert: () => void
  onShareProperty: () => void
  onAddToBuyerSearch: () => void
  onOpenMap: () => void
}) {
  if (activeTab === 'Specs') {
    return (
      <div className="flex flex-col pb-[120px]">
        <div style={{ height: 126 }} aria-hidden />
        <SpecsSection />
      </div>
    )
  }

  if (activeTab === 'Records') {
    return (
      <div className="flex flex-col pb-[120px]">
        <div style={{ height: 126 }} aria-hidden />
        <RecordsSection />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-[120px]">
      <PropertyPhoto />
      <PropertyNav active={activeTab} onChange={onTabChange} />
      <SubjectDetails />
      <div className="flex flex-col gap-8">
        <ActiveSection
          priceDropAlert={priceDropAlert}
          statusAlert={statusAlert}
          onEditPriceDropAlert={onOpenPriceDropAlert}
          onEditStatusAlert={onOpenStatusAlert}
        />
        <AlertsSection
          onOpenPriceDropAlert={onOpenPriceDropAlert}
          onOpenStatusAlert={onOpenStatusAlert}
          hasPriceDropAlert={!!priceDropAlert}
          hasStatusAlert={!!statusAlert}
        />
        <div className="flex flex-col gap-10">
          <SendToClientSection onShareProperty={onShareProperty} onAddToBuyerSearch={onAddToBuyerSearch} />
          <DigDeeperSection />
          <NotesSection notes={notes} onOpenAdd={onOpenAddNote} />
          <ExploreAreaSection onOpenMap={onOpenMap} />
        </div>
      </div>
    </div>
  )
}
