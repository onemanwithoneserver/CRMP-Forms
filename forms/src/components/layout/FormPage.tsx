import React, { ReactNode } from 'react'
import { useForm } from '../../context/FormContext'

const SaveIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <polyline points="17,21 17,13 7,13 7,21" />
    <polyline points="7,3 7,8 15,8" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,18 9,12 15,6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
}: Props) {
  const { state } = useForm()
  const isFirstStep = state.step === 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* ── Dark hero header (matches PostType style) ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1C2A44 0%, #243352 60%, #1a2740 100%)',
        padding: '8px 12px 12px',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* subtle dot-grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }} />
        {/* accent bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, #1C2A44, #3b5998, #C89B3C)',
        }} />
        <div style={{ position: 'relative', maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.15rem',
            fontWeight: 800,
            color: '#ffffff',
            margin: 0,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: '0.82rem',
              color: 'rgba(255,255,255,0.65)',
              marginTop: '4px',
              fontFamily: "'Outfit', sans-serif",
              lineHeight: 1.4,
            }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '6px 8px 4px' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </div>

      {/* ── Sticky footer ── */}
      <div style={{
        flexShrink: 0,
        background: '#ffffff',
        borderTop: '1px solid #edf0f5',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
        padding: '6px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Save draft */}
        <button
          type="button"
          onClick={onSaveDraft || (() => alert('Draft saved!'))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '5px 10px',
            borderRadius: '4px',
            border: '1.5px solid rgba(200,155,60,0.5)',
            background: 'rgba(200,155,60,0.05)',
            color: '#C89B3C',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '0.8rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
        >
          <SaveIcon />
          <span>Save draft</span>
        </button>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Back */}
          <button
            type="button"
            onClick={onBack}
            disabled={backDisabled || isFirstStep}
            aria-label="Previous step"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '4px',
              border: '1.5px solid #e2e6ec',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: (backDisabled || isFirstStep) ? 'not-allowed' : 'pointer',
              opacity: (backDisabled || isFirstStep) ? 0.35 : 1,
              transition: 'all 200ms ease',
              color: '#445069',
            }}
          >
            <ChevronLeft />
          </button>

          {/* Next / Submit */}
          <button
            type="button"
            onClick={onNext}
            aria-label={isLastStep ? 'Submit' : 'Next step'}
            style={{
              height: '30px',
              minWidth: isLastStep ? 'auto' : '42px',
              padding: isLastStep ? '0 14px' : '0',
              borderRadius: '4px',
              border: 'none',
              background: 'linear-gradient(135deg, #1C2A44 0%, #2a3f66 100%)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(28,42,68,0.25)',
              transition: 'all 200ms ease',
              gap: '6px',
            }}
          >
            {isLastStep ? (nextLabel || 'Submit') : <ChevronRight />}
          </button>
        </div>
      </div>

    </div>
  )
}
