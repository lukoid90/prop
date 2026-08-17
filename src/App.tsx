import { useState } from 'react'
import { DeviceFrame } from './components/DeviceFrame'
import { Header } from './components/Header'
import { PropertyDock } from './components/PropertyDock'
import { PropertyScreen } from './components/PropertyScreen'
import { NoteSheet } from './components/NoteSheet'
import { AddAlertSheet, type PriceDropAlert } from './components/AddAlertSheet'
import { StatusAlertSheet, type StatusAlert } from './components/StatusAlertSheet'
import { ShareSheet } from './components/ShareSheet'
import { BuyerSearchSheet } from './components/BuyerSearchSheet'
import { MapSheet } from './components/MapSheet'
import { AddContactSheet } from './components/AddContactSheet'
import { PropertyMenu } from './components/PropertyMenu'
import { PhotoViewer } from './components/PhotoViewer'
import { NAV_TABS } from './components/PropertyNav'
import { CURRENT_OWNER } from './components/OwnersSection'
import { formatEntryTimestamp } from './lib/formatEntryTimestamp'
import { downloadRecordsCsv } from './lib/exportRecordsCsv'
import type { Note, Owner, PriceDropAlertEntry, StatusAlertEntry } from './types'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [activeTab, setActiveTab] = useState(NAV_TABS[0])
  const [priceDropAlert, setPriceDropAlert] = useState<PriceDropAlertEntry | null>(null)
  const [isAddingAlert, setIsAddingAlert] = useState(false)
  const [statusAlert, setStatusAlert] = useState<StatusAlertEntry | null>(null)
  const [isAddingStatusAlert, setIsAddingStatusAlert] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isAddingToBuyerSearch, setIsAddingToBuyerSearch] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [addContactOwner, setAddContactOwner] = useState<Owner | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false)
  const [bedrooms, setBedrooms] = useState('3')
  const [bathrooms, setBathrooms] = useState('2')
  const [homeSize, setHomeSize] = useState('2,000')
  const [lotSize, setLotSize] = useState('24,500')
  const [savedSpecs, setSavedSpecs] = useState({ bedrooms: '3', bathrooms: '2', homeSize: '2,000', lotSize: '24,500' })

  const specsDirty =
    bedrooms !== savedSpecs.bedrooms ||
    bathrooms !== savedSpecs.bathrooms ||
    homeSize !== savedSpecs.homeSize ||
    lotSize !== savedSpecs.lotSize

  const handleSaveChanges = () => {
    setSavedSpecs({ bedrooms, bathrooms, homeSize, lotSize })
  }

  const handleSaveNote = (message: string) => {
    const date = formatEntryTimestamp(new Date())
    setNotes((prev) => [{ id: crypto.randomUUID(), date, message }, ...prev])
    setIsAddingNote(false)
  }

  const handleSaveAlert = (alert: PriceDropAlert) => {
    const date = formatEntryTimestamp(new Date())
    setPriceDropAlert({ id: priceDropAlert?.id ?? crypto.randomUUID(), date, ...alert })
    setIsAddingAlert(false)
  }

  const handleRemoveAlert = () => {
    setPriceDropAlert(null)
    setIsAddingAlert(false)
  }

  const handleSaveStatusAlert = (alert: StatusAlert) => {
    const date = formatEntryTimestamp(new Date())
    setStatusAlert({ id: statusAlert?.id ?? crypto.randomUUID(), date, ...alert })
    setIsAddingStatusAlert(false)
  }

  const handleRemoveStatusAlert = () => {
    setStatusAlert(null)
    setIsAddingStatusAlert(false)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-10">
      <DeviceFrame
        header={(scrollProgress, contentScrolled) => (
          <Header
            scrollProgress={activeTab === 'Specs' || activeTab === 'Records' || activeTab === 'Owners' ? 1 : scrollProgress}
            contentScrolled={contentScrolled}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenMenu={() => setIsMenuOpen(true)}
            onDownload={downloadRecordsCsv}
            specsDirty={specsDirty}
            onSaveChanges={handleSaveChanges}
            onAddPrimaryContact={() => setAddContactOwner(CURRENT_OWNER)}
          />
        )}
        dock={<PropertyDock onShareProperty={() => setIsSharing(true)} />}
        overlay={
          <>
            <NoteSheet open={isAddingNote} onClose={() => setIsAddingNote(false)} onSave={handleSaveNote} />
            <AddAlertSheet
              open={isAddingAlert}
              initialAlert={priceDropAlert}
              onClose={() => setIsAddingAlert(false)}
              onSave={handleSaveAlert}
              onRemove={handleRemoveAlert}
            />
            <StatusAlertSheet
              open={isAddingStatusAlert}
              initialAlert={statusAlert}
              onClose={() => setIsAddingStatusAlert(false)}
              onSave={handleSaveStatusAlert}
              onRemove={handleRemoveStatusAlert}
            />
            <ShareSheet open={isSharing} onClose={() => setIsSharing(false)} />
            <BuyerSearchSheet open={isAddingToBuyerSearch} onClose={() => setIsAddingToBuyerSearch(false)} />
            <MapSheet open={isMapOpen} onClose={() => setIsMapOpen(false)} />
            <AddContactSheet owner={addContactOwner} onClose={() => setAddContactOwner(null)} />
            <PropertyMenu open={isMenuOpen} onClose={() => setIsMenuOpen(false)} onShareProperty={() => setIsSharing(true)} />
            <PhotoViewer open={isPhotoViewerOpen} onClose={() => setIsPhotoViewerOpen(false)} />
          </>
        }
      >
        <PropertyScreen
          notes={notes}
          onOpenAddNote={() => setIsAddingNote(true)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          priceDropAlert={priceDropAlert}
          onOpenPriceDropAlert={() => setIsAddingAlert(true)}
          statusAlert={statusAlert}
          onOpenStatusAlert={() => setIsAddingStatusAlert(true)}
          onShareProperty={() => setIsSharing(true)}
          onAddToBuyerSearch={() => setIsAddingToBuyerSearch(true)}
          onOpenMap={() => setIsMapOpen(true)}
          onAddContact={setAddContactOwner}
          onOpenPhotos={() => setIsPhotoViewerOpen(true)}
          bedrooms={bedrooms}
          onChangeBedrooms={setBedrooms}
          bathrooms={bathrooms}
          onChangeBathrooms={setBathrooms}
          homeSize={homeSize}
          onChangeHomeSize={setHomeSize}
          lotSize={lotSize}
          onChangeLotSize={setLotSize}
        />
      </DeviceFrame>
    </div>
  )
}

export default App
