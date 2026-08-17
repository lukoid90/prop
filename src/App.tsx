import { useState } from 'react'
import { DeviceFrame } from './components/DeviceFrame'
import { Header } from './components/Header'
import { PropertyDock } from './components/PropertyDock'
import { PropertyScreen } from './components/PropertyScreen'
import { NoteSheet } from './components/NoteSheet'
import { AddAlertSheet, type PriceDropAlert } from './components/AddAlertSheet'
import { StatusAlertSheet, type StatusAlert } from './components/StatusAlertSheet'
import { ShareSheet } from './components/ShareSheet'
import { NAV_TABS } from './components/PropertyNav'
import { formatEntryTimestamp } from './lib/formatEntryTimestamp'
import type { Note, PriceDropAlertEntry, StatusAlertEntry } from './types'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [activeTab, setActiveTab] = useState(NAV_TABS[0])
  const [priceDropAlert, setPriceDropAlert] = useState<PriceDropAlertEntry | null>(null)
  const [isAddingAlert, setIsAddingAlert] = useState(false)
  const [statusAlert, setStatusAlert] = useState<StatusAlertEntry | null>(null)
  const [isAddingStatusAlert, setIsAddingStatusAlert] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

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
        header={(scrollProgress) => (
          <Header
            scrollProgress={activeTab === 'Specs' || activeTab === 'Records' ? 1 : scrollProgress}
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
        />
      </DeviceFrame>
    </div>
  )
}

export default App
