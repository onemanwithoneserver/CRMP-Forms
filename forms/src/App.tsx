import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MappingApp from './pages/MappingApp'
import { DeviceProvider, useDevice } from './context/DeviceContext'
import { FormProvider, useForm } from './context/FormContext'

function Header() {
  const { device, setDevice } = useDevice()
  const { state, resetToStart, dispatch } = useForm()

  const allPages = [
    { key: '', label: 'Dynamic Flow (Default)' },
    { key: 'post-type', label: '1. What to post?' },
    { key: 'property-type', label: '2. Property Type' },
    { key: 'property-details', label: '3. Building Selection' },
    { key: 'building-info', label: '4. Building Info' },
    { key: 'unit-details', label: '5. Unit Details' },
    { key: 'lease-info', label: '6. Lease Information' },
    { key: 'business-info', label: '7. Business Information' },
    { key: 'transaction-details', label: '8. Transaction Details' },
    { key: 'upload-photos', label: '9. Upload Photos' },
    { key: 'looking-for', label: 'B1. Looking For (Tenant/Buyer)' },
    { key: 'budget-area', label: 'B2. Budget (Tenant/Buyer)' },
    { key: 'location-pref', label: 'B3. Location (Tenant/Buyer)' },
    { key: 'review', label: 'Final. Review Setup' },
  ]

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      background: 'rgba(255,255,255,0.85)',
      backdropFilter: 'blur(24px) saturate(150%)',
      WebkitBackdropFilter: 'blur(24px) saturate(150%)',
      borderBottom: '1px solid var(--border-light)',
    }}>
      <div style={{
        maxWidth: '72rem',
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <h1 style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 700,
          fontSize: '1.125rem',
          color: 'var(--text)',
          margin: 0,
          flex: 1,
          letterSpacing: '-0.02em'
        }}>
          CRMP Forms
        </h1>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <select 
             value={state.designStepOverride || ''}
             onChange={(e) => {
               dispatch({ type: 'setDesignOverride', key: e.target.value || null })
             }}
             style={{
               padding: '8px 16px',
               borderRadius: '8px',
               border: '1px solid var(--border)',
               background: 'var(--surface-lowest)',
               fontFamily: "'Outfit', sans-serif",
               fontSize: '0.85rem',
               fontWeight: 600,
               color: state.designStepOverride ? 'var(--accent)' : 'var(--text-secondary)',
               cursor: 'pointer',
               outline: 'none',
             }}
          >
            {allPages.map(p => (
              <option key={p.key} value={p.key}>{p.label}</option>
            ))}
          </select>

          {state.step > 1 && !state.designStepOverride && (
            <button
              type="button"
              onClick={resetToStart}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--text-tertiary)',
                fontFamily: "'Outfit', sans-serif",
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              Start Over
            </button>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map(d => (
            <button
              key={d}
              aria-pressed={device === d}
              onClick={() => setDevice(d)}
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.8125rem',
                fontWeight: device === d ? 600 : 500,
                padding: '8px 16px',
                borderRadius: '8px',
                border: device === d ? 'none' : '1px solid var(--border-light)',
                background: device === d ? 'var(--accent)' : 'transparent',
                color: device === d ? 'var(--text-inverse)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 300ms ease',
                boxShadow: device === d ? '0 4px 12px rgba(9, 9, 11, 0.15)' : 'none'
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
        className={device === 'desktop' ? 'max-w-5xl mx-auto' : ''}
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
