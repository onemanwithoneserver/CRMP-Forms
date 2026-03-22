import React, { ReactNode } from 'react'

const SaveIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
    <polyline points="17,21 17,13 7,13 7,21" />
    <polyline points="7,3 7,8 15,8" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,18 9,12 15,6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
  return (
    <div className="flex flex-col h-full page-enter">
      <div className="flex-1 overflow-y-auto px-5 pt-8 pb-5">
        <h1
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: '1.75rem',
            fontWeight: 800,
            color: 'var(--text)',
            marginBottom: subtitle ? '8px' : '24px',
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            marginBottom: '24px',
            lineHeight: 1.5,
            maxWidth: '600px',
          }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>

      <div className="bottom-nav">
        <button
          type="button"
          className="save-draft-btn"
          onClick={onSaveDraft || (() => alert('Draft saved!'))}
        >
          <SaveIcon />
          <span>Save draft</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="nav-btn back"
            onClick={onBack}
            disabled={backDisabled}
            aria-label="Previous step"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className="nav-btn next"
            onClick={onNext}
            aria-label={isLastStep ? 'Submit' : 'Next step'}
            style={isLastStep ? { width: 'auto', padding: '0 24px', fontSize: '0.95rem', fontWeight: 600 } : {}}
          >
            {isLastStep ? nextLabel || 'Submit' : <ChevronRight />}
          </button>
        </div>
      </div>
    </div>
  )
}
