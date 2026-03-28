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
    { key: 'building-info', label: '2. Building Info' },
    { key: 'unit-details', label: '3. Unit Details' },
    { key: 'facilities', label: '4. Facilities' },
    { key: 'upload-photos', label: '5. Media' },
    { key: 'lease-info', label: '6. Lease Information' },
    { key: 'transaction-details', label: '6. Transactional Details' },
    { key: 'review', label: '7. Review' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-[rgba(255,255,255,0.85)] backdrop-blur-[24px] backdrop-saturate-[150%] border-b border-[var(--border-light)]">
      <div className="max-w-[72rem] mx-auto p-[8px_16px] flex items-center justify-between">
        <h1 className="font-['Outfit'] font-[700] text-[1rem] text-[var(--text)] m-0 flex-1 tracking-[-0.02em]">
          CRMP Forms
        </h1>

        <div className="flex-1 flex justify-center items-center gap-4">
          <select
            value={state.designStepOverride || ''}
            onChange={(e) => {
              dispatch({ type: 'setDesignOverride', key: e.target.value || null })
            }}
            className={`p-[4px_10px] rounded-[6px] border border-[var(--border)] bg-[var(--surface-lowest)] font-['Outfit'] text-[0.85rem] font-[600] cursor-pointer outline-none ${state.designStepOverride ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'
              }`}
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
              className="bg-transparent border-none cursor-pointer text-[0.85rem] font-[600] text-[var(--text-tertiary)] font-['Outfit'] flex items-center p-1"
            >
              Start Over
            </button>
          )}
        </div>

        <div className="flex-1 flex items-center justify-end gap-1">
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
                className={`flex items-center justify-center w-[32px] h-[28px] rounded-[4px] cursor-pointer transition-all duration-200 p-0 border-[1.5px] ${isActive ? 'border-[var(--accent-gold)] bg-[var(--accent-gold-subtle)] text-[var(--accent-gold)]' : 'border-[var(--border)] bg-transparent text-[var(--text-tertiary)]'
                  }`}
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
    <div className="h-full flex flex-col overflow-hidden bg-[var(--surface)]">
      <Header />
      <main
        data-device={device}
        className={`flex-1 overflow-hidden flex flex-col ${device === 'desktop' ? 'max-w-5xl mx-auto w-full' :
            device === 'mobile' ? 'max-w-[430px] mx-auto w-full' : 'w-full'
          }`}
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
