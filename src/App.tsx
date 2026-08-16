import { useState } from 'react'
import { DeviceFrame } from './components/DeviceFrame'
import { Header } from './components/Header'
import { PropertyDock } from './components/PropertyDock'
import { PropertyScreen } from './components/PropertyScreen'
import { NoteSheet } from './components/NoteSheet'
import { AddAlertSheet, type PriceDropAlert } from './components/AddAlertSheet'
import { NAV_TABS } from './components/PropertyNav'
import type { Note } from './types'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [activeTab, setActiveTab] = useState(NAV_TABS[0])
  const [priceDropAlert, setPriceDropAlert] = useState<PriceDropAlert | null>(null)
  const [isAddingAlert, setIsAddingAlert] = useState(false)

  const handleSaveNote = (message: string) => {
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    setNotes((prev) => [{ id: crypto.randomUUID(), date, message }, ...prev])
    setIsAddingNote(false)
  }

  const handleSaveAlert = (alert: PriceDropAlert) => {
    setPriceDropAlert(alert)
    setIsAddingAlert(false)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-10">
      <DeviceFrame
        header={(scrollProgress) => (
          <Header scrollProgress={scrollProgress} activeTab={activeTab} onTabChange={setActiveTab} />
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
          priceDropAlert={priceDropAlert}
          onOpenPriceDropAlert={() => setIsAddingAlert(true)}
        />
      </DeviceFrame>
    </div>
  )
}

export default App
