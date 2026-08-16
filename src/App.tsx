import { useState } from 'react'
import { DeviceFrame } from './components/DeviceFrame'
import { Header } from './components/Header'
import { PropertyDock } from './components/PropertyDock'
import { PropertyScreen } from './components/PropertyScreen'
import { NoteSheet } from './components/NoteSheet'
import { NAV_TABS } from './components/PropertyNav'
import type { Note } from './types'

function App() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isAddingNote, setIsAddingNote] = useState(false)
  const [activeTab, setActiveTab] = useState(NAV_TABS[0])

  const handleSaveNote = (message: string) => {
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    setNotes((prev) => [{ id: crypto.randomUUID(), date, message }, ...prev])
    setIsAddingNote(false)
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-10">
      <DeviceFrame
        header={(scrollProgress) => (
          <Header scrollProgress={scrollProgress} activeTab={activeTab} onTabChange={setActiveTab} />
        )}
        dock={<PropertyDock />}
        overlay={isAddingNote && <NoteSheet onClose={() => setIsAddingNote(false)} onSave={handleSaveNote} />}
      >
        <PropertyScreen
          notes={notes}
          onOpenAddNote={() => setIsAddingNote(true)}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </DeviceFrame>
    </div>
  )
}

export default App
