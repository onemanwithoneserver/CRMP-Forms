import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MappingApp from './pages/MappingApp'
import { DeviceProvider, useDevice } from './context/DeviceContext'
import { FormProvider, useForm } from './context/FormContext'

function Header() {
  const { device, setDevice } = useDevice()
  const { state, resetToRoleSelection } = useForm()

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(250,250,250,0.9)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: '1rem',
          color: 'var(--text)',
          margin: 0,
          flex: 1, // Add flex: 1 to ensure center alignment works
        }}>
          CRMP Forms
        </h1>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {state.role && (
            <button
              type="button"
              onClick={resetToRoleSelection}
              style={{
                background: 'var(--surface-low)',
                border: '1px solid var(--border-light)',
                borderRadius: '6px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                fontFamily: "'Outfit', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 150ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              ← {state.role === 'seller' ? 'Seller View' : 'User View'}
            </button>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map(d => (
            <button
              key={d}
              aria-pressed={device === d}
              onClick={() => setDevice(d)}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.75rem',
                fontWeight: device === d ? 600 : 400,
                padding: '6px 12px',
                borderRadius: '6px',
                border: device === d ? 'none' : '1px solid var(--border-light)',
                background: device === d ? 'var(--accent)' : 'transparent',
                color: device === d ? 'var(--text-inverse)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}

function InnerApp() {
  const { device } = useDevice()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--surface)' }}>
      <Header />
      <main
        data-device={device}
        className={device === 'desktop' ? 'max-w-4xl mx-auto' : ''}
      >
        <Routes>
          <Route path="/" element={<MappingApp />} />
          <Route path="/mapping" element={<MappingApp />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <DeviceProvider>
      <FormProvider>
        <InnerApp />
      </FormProvider>
    </DeviceProvider>
  )
}
