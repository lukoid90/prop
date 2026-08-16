import { useState } from 'react'
import { DeviceFrame } from './components/DeviceFrame'
import { Header } from './components/Header'
import { PropertyDock } from './components/PropertyDock'
import { PropertyScreen } from './components/PropertyScreen'
import { NoteSheet } from './components/NoteSheet'
import { AddAlertSheet, type PriceDropAlert } from './components/AddAlertSheet'
import { NAV_TABS } from './components/PropertyNav'
import { formatEntryTimestamp } from './lib/formatEntryTimestamp'
import type { Note, PriceDropAlertEntry } from './types'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [activeTab, setActiveTab] = useState(NAV_TABS[0])
  const [priceDropAlerts, setPriceDropAlerts] = useState<PriceDropAlertEntry[]>([])
  const [isAddingAlert, setIsAddingAlert] = useState(false)

  const handleSaveNote = (message: string) => {
    const date = formatEntryTimestamp(new Date())
    setNotes((prev) => [{ id: crypto.randomUUID(), date, message }, ...prev])
    setIsAddingNote(false)
  }

  const handleSaveAlert = (alert: PriceDropAlert) => {
    const date = formatEntryTimestamp(new Date())
    setPriceDropAlerts((prev) => [{ id: crypto.randomUUID(), date, ...alert }, ...prev])
    setIsAddingAlert(false)
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
        dock={<PropertyDock />}
        overlay={
          <>
            <NoteSheet open={isAddingNote} onClose={() => setIsAddingNote(false)} onSave={handleSaveNote} />
            <AddAlertSheet open={isAddingAlert} onClose={() => setIsAddingAlert(false)} onSave={handleSaveAlert} />
          </>
        }
      >
        <PropertyScreen
          notes={notes}
          onOpenAddNote={() => setIsAddingNote(true)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          priceDropAlerts={priceDropAlerts}
          onOpenPriceDropAlert={() => setIsAddingAlert(true)}
        />
      </DeviceFrame>
    </div>
  )
}

export default App
