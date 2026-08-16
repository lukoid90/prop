import { DeviceFrame } from './components/DeviceFrame'
import { Header } from './components/Header'
import { PropertyDock } from './components/PropertyDock'
import { PropertyScreen } from './components/PropertyScreen'

function App() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-10">
      <DeviceFrame header={<Header />} dock={<PropertyDock />}>
        <PropertyScreen />
      </DeviceFrame>
    </div>
  )
}

export default App
