import React, { ReactNode, useState } from 'react'
import { useForm } from '../../context/FormContext'

const SaveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <polyline points="17,21 17,13 7,13 7,21" />
    <polyline points="7,3 7,8 15,8" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,18 9,12 15,6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9,6 15,12 9,18" />
  </svg>
)

type Props = {
  title: string
  subtitle?: string
  children: ReactNode
  onBack: () => void
  onNext: () => void
  onSaveDraft?: () => void
  backDisabled?: boolean
  nextLabel?: string
  isLastStep?: boolean
  icon?: ReactNode
}

export default function FormPage({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  onSaveDraft,
  backDisabled = false,
  nextLabel,
  isLastStep = false,
  icon,
}: Props) {
  const { state } = useForm()
  const isFirstStep = state.step === 1

  const [hoverSave, setHoverSave] = useState(false)
  const [hoverBack, setHoverBack] = useState(false)
  const [hoverNext, setHoverNext] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', background: '#F5F7FA', fontFamily: "'Outfit', sans-serif" }}>
      
      {/* Premium Header */}
      <div 
        style={{ 
          background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)',
          padding: '16px 20px 32px 20px',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          zIndex: 0
        }}
      >
        {/* Subtle dot pattern overlay */}
        <div 
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
            backgroundSize: '12px 12px',
            pointerEvents: 'none'
          }} 
        />
        {/* Premium Gold Accent Line */}
        <div 
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(200, 155, 60, 0.8) 50%, transparent 100%)',
          }} 
        />
        
        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '10px', letterSpacing: '-0.01em' }}>
            {icon && (
              <span 
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '28px', height: '28px', borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  color: '#E6C36A'
                }}
              >
                {icon}
              </span>
            )}
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', margin: '4px 0 0 0', fontWeight: 400 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        className="custom-scrollbar"
        style={{ 
          flex: 1, 
          overflowY: 'auto', 
          overflowX: 'hidden', 
          position: 'relative', 
          zIndex: 10,
          marginTop: '-16px' // Pull content up over the header slightly for depth
        }}
      >
        <div style={{ width: '100%', padding: '0 16px 80px 16px', position: 'relative', zIndex: 20 }}>
          {children}
        </div>
      </div>

      {/* Premium Footer Actions */}
      <div 
        style={{
          flexShrink: 0,
          background: '#FFFFFF',
          borderTop: '1px solid #E4E7EC',
          boxShadow: '0 -4px 16px rgba(15, 27, 46, 0.04)',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 30
        }}
      >
        <button
          type="button"
          onClick={onSaveDraft || (() => alert('Draft saved!'))}
          onMouseEnter={() => setHoverSave(true)}
          onMouseLeave={() => setHoverSave(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '6px 12px', borderRadius: '3px',
            background: hoverSave ? 'rgba(200, 155, 60, 0.1)' : 'transparent',
            border: `1px solid ${hoverSave ? '#C89B3C' : 'transparent'}`,
            color: '#C89B3C',
            fontSize: '0.8rem', fontWeight: 600,
            cursor: 'pointer', transition: 'all 200ms ease',
            outline: 'none'
          }}
        >
          <SaveIcon />
          <span>Save draft</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={onBack}
            disabled={backDisabled || isFirstStep}
            onMouseEnter={() => setHoverBack(true)}
            onMouseLeave={() => setHoverBack(false)}
            aria-label="Previous step"
            style={{
              width: '32px', height: '32px', borderRadius: '3px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: hoverBack && !(backDisabled || isFirstStep) ? '#F5F7FA' : '#FFFFFF',
              border: `1px solid ${hoverBack && !(backDisabled || isFirstStep) ? '#C89B3C' : '#E4E7EC'}`,
              color: (backDisabled || isFirstStep) ? '#A0AAB8' : '#1C2A44',
              cursor: (backDisabled || isFirstStep) ? 'not-allowed' : 'pointer',
              opacity: (backDisabled || isFirstStep) ? 0.6 : 1,
              transition: 'all 200ms ease',
              outline: 'none',
              boxShadow: hoverBack && !(backDisabled || isFirstStep) ? '0 2px 4px rgba(15, 27, 46, 0.05)' : 'none'
            }}
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={onNext}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            aria-label={isLastStep ? 'Submit' : 'Next step'}
            style={{
              height: '32px', borderRadius: '3px', border: 'none',
              background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)',
              color: '#FFFFFF',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              fontSize: '0.85rem', fontWeight: 600,
              cursor: 'pointer',
              padding: isLastStep ? '0 16px' : '0 12px',
              minWidth: isLastStep ? 'auto' : '48px',
              boxShadow: hoverNext 
                ? '0 4px 12px rgba(15, 27, 46, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                : '0 2px 6px rgba(15, 27, 46, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              transform: hoverNext ? 'translateY(-1px)' : 'translateY(0)',
              transition: 'all 200ms ease',
              outline: 'none'
            }}
          >
            {isLastStep ? (nextLabel || 'Submit') : <ChevronRight />}
          </button>
        </div>
      </div>
    </div>
  )
}