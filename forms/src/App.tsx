import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MappingApp from './pages/MappingApp'
import { DeviceProvider, useDevice } from './context/DeviceContext'
import { FormProvider, useForm } from './context/FormContext'

function Header() {
  const { device, setDevice } = useDevice()
  const { state, resetToStart, dispatch } = useForm()

  const sellerPages = [
    { key: 'post-type', label: '1. Post Type' },
    { key: 'unit-details', label: '2. Unit Details' },
    { key: 'facilities', label: '3. Facilities' },
    { key: 'upload-photos', label: '4. Media' },
    { key: 'lease-info', label: '5. Lease Information' },
    { key: 'transaction-details', label: '5. Transactional Details' },
    { key: 'review', label: '6. Review' },
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
        padding: '8px 16px',
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
              padding: '4px 10px',
              borderRadius: '6px',
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
            <option value="">— Dynamic Flow (Default) —</option>
            {sellerPages.map(p => (
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

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map((d) => {
            const icons: Record<string, React.ReactElement> = {
              desktop: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="2" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 14h6M8 12v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ),
              tablet: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="3.5" y="1" width="9" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8" cy="13" r="0.75" fill="currentColor" />
                </svg>
              ),
              mobile: (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="5" y="1" width="6" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="8" cy="13" r="0.75" fill="currentColor" />
                </svg>
              ),
            }
            const isActive = device === d
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                title={d.charAt(0).toUpperCase() + d.slice(1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '28px',
                  borderRadius: '4px',
                  border: isActive ? '1.5px solid var(--accent-gold)' : '1.5px solid var(--border)',
                  background: isActive ? 'var(--accent-gold-subtle)' : 'transparent',
                  color: isActive ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                  padding: 0,
                }}
              >
                {icons[d]}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}

function InnerApp() {
  const { device } = useDevice()

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--surface)' }}>
      <Header />
      <main
        data-device={device}
        className={
          device === 'desktop' ? 'max-w-5xl mx-auto w-full' :
            device === 'mobile' ? 'max-w-[430px] mx-auto w-full' : 'w-full'
        }
        style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
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
