import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'
import MappingApp from './pages/MappingApp'
import { DeviceProvider, useDevice } from './context/DeviceContext'

function Header() {
  const { device, setDevice } = useDevice()
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-4xl mx-auto p-3 flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold">forms</h1>

        <div className="flex items-center gap-2">
          <span className="sr-only">Viewport</span>
          <button
            aria-pressed={device === 'desktop'}
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1 rounded-md text-sm ${device === 'desktop' ? 'primary-gradient text-white' : 'bg-white border border-gray-200'}`}>
            Desktop
          </button>
          <button
            aria-pressed={device === 'tablet'}
            onClick={() => setDevice('tablet')}
            className={`px-3 py-1 rounded-md text-sm ${device === 'tablet' ? 'primary-gradient text-white' : 'bg-white border border-gray-200'}`}>
            Tablet
          </button>
          <button
            aria-pressed={device === 'mobile'}
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1 rounded-md text-sm ${device === 'mobile' ? 'primary-gradient text-white' : 'bg-white border border-gray-200'}`}>
            Mobile
          </button>
        </div>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <DeviceProvider>
      <InnerApp />
    </DeviceProvider>
  )
}

function InnerApp() {
  const { device } = useDevice()
  const containerClass = device === 'desktop' ? 'max-w-4xl' : device === 'tablet' ? 'max-w-2xl' : 'max-w-md'

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className={`${containerClass} mx-auto p-4`} data-device={device}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/mapping" element={<MappingApp />} />
        </Routes>
      </main>
    </div>
  )
}
