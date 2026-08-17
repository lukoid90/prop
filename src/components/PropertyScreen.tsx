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
import { OwnersSection } from './OwnersSection'
import type { Note, Owner, PriceDropAlertEntry, StatusAlertEntry } from '../types'

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
  onAddContact,
  onOpenPhotos,
  bedrooms,
  onChangeBedrooms,
  bathrooms,
  onChangeBathrooms,
  homeSize,
  onChangeHomeSize,
  lotSize,
  onChangeLotSize,
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
  onAddContact: (owner: Owner) => void
  onOpenPhotos: () => void
  bedrooms: string
  onChangeBedrooms: (value: string) => void
  bathrooms: string
  onChangeBathrooms: (value: string) => void
  homeSize: string
  onChangeHomeSize: (value: string) => void
  lotSize: string
  onChangeLotSize: (value: string) => void
}) {
  if (activeTab === 'Specs') {
    return (
      <div className="flex flex-col pb-[120px]">
        <div style={{ height: 178 }} aria-hidden />
        <SpecsSection
          bedrooms={bedrooms}
          onChangeBedrooms={onChangeBedrooms}
          bathrooms={bathrooms}
          onChangeBathrooms={onChangeBathrooms}
          homeSize={homeSize}
          onChangeHomeSize={onChangeHomeSize}
          lotSize={lotSize}
          onChangeLotSize={onChangeLotSize}
        />
      </div>
    )
  }

  if (activeTab === 'Records') {
    return (
      <div className="flex flex-col pb-[120px]">
        <div style={{ height: 178 }} aria-hidden />
        <RecordsSection />
      </div>
    )
  }

  if (activeTab === 'Owners') {
    return (
      <div className="flex flex-col pb-[120px]">
        <div style={{ height: 178 }} aria-hidden />
        <OwnersSection onAddContact={onAddContact} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-[120px]">
      <PropertyPhoto onOpen={onOpenPhotos} />
      <PropertyNav active={activeTab} onChange={onTabChange} />
      <SubjectDetails bedrooms={bedrooms} bathrooms={bathrooms} homeSize={homeSize} lotSize={lotSize} />
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
