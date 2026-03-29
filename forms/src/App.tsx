import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MappingApp from './pages/MappingApp'
import { DeviceProvider, useDevice } from './context/DeviceContext'
import { FormProvider, useForm } from './context/FormContext'
import { Monitor, Tablet, Smartphone, RotateCcw, ChevronDown } from 'lucide-react'

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
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid #E4E7EC',
      fontFamily: "'Outfit', sans-serif"
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '8px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '0.95rem',
            fontWeight: 800,
            color: '#1C2A44',
            margin: 0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase'
          }}>
            CREMP <span style={{ color: '#C89B3C' }}>Forms</span>
          </h1>
        </div>

        <div style={{ flex: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select
              value={state.designStepOverride || ''}
              onChange={(e) => dispatch({ type: 'setDesignOverride', key: e.target.value || null })}
              style={{
                appearance: 'none',
                padding: '6px 32px 6px 12px',
                borderRadius: '4px',
                border: '1px solid #E4E7EC',
                background: '#F5F7FA',
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 600,
                color: state.designStepOverride ? '#C89B3C' : '#667085',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="">— Dynamic Flow (Default) —</option>
              {sellerPages.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '10px', pointerEvents: 'none', color: '#667085' }} />
          </div>

          {state.step > 1 && !state.designStepOverride && (
            <button
              type="button"
              onClick={resetToStart}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 700,
                color: '#EF4444',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map((d) => {
            const isActive = device === d
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                style={{
                  width: '36px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '3px',
                  border: `1px solid ${isActive ? '#C89B3C' : '#E4E7EC'}`,
                  background: isActive ? 'rgba(200, 155, 60, 0.05)' : '#FFFFFF',
                  color: isActive ? '#C89B3C' : '#667085',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {d === 'desktop' && <Monitor size={16} strokeWidth={isActive ? 2.5 : 2} />}
                {d === 'tablet' && <Tablet size={16} strokeWidth={isActive ? 2.5 : 2} />}
                {d === 'mobile' && <Smartphone size={16} strokeWidth={isActive ? 2.5 : 2} />}
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

  const getWidth = () => {
    if (device === 'mobile') return '414px'
    if (device === 'tablet') return '768px'
    return '100%'
  }

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: '#F5F7FA', 
      overflow: 'hidden' 
    }}>
      <Header />
      <div style={{ 
        flex: 1, 
        overflow: 'hidden', 
        display: 'flex', 
        padding: device === 'desktop' ? '0' : '20px 0' 
      }}>
        <main style={{ 
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          width: '100%',
          maxWidth: getWidth(),
          background: '#FFFFFF',
          position: 'relative',
          boxShadow: device !== 'desktop' ? '0 10px 40px rgba(15, 27, 46, 0.1)' : 'none',
          borderLeft: device !== 'desktop' ? '1px solid #E4E7EC' : 'none',
          borderRight: device !== 'desktop' ? '1px solid #E4E7EC' : 'none',
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <Routes>
            <Route path="/" element={<MappingApp />} />
            <Route path="/mapping" element={<MappingApp />} />
          </Routes>
        </main>
      </div>
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