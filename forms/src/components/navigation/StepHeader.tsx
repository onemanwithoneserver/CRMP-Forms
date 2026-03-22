import React from 'react'
import { useDevice } from '../../context/DeviceContext'

type Step = { key: string; label: string }

type Props = {
  steps: readonly Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

/* ─── SVG Icons ─── */
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

/* ─── Desktop Step Header ─── */
function DesktopHeader({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="step-header">
      {steps.map((step, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep

        return (
          <React.Fragment key={step.key}>
            <div
              className="step-item"
              style={{ cursor: onStepClick && isCompleted ? 'pointer' : 'default', opacity: isActive || isCompleted ? 1 : 0.5 }}
              onClick={() => isCompleted && onStepClick?.(stepNum)}
            >
              <div className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                {isCompleted ? <CheckIcon /> : stepNum}
              </div>
              <span className={`step-label ${isActive ? 'active' : ''}`}>
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`step-connector ${isCompleted ? 'active' : ''}`} />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

/* ─── Mobile Step Header ─── */
function MobileHeader({ steps, currentStep, onStepClick }: Props) {
  const current = steps[currentStep - 1]
  const prev = currentStep > 1 ? steps[currentStep - 2] : null

  return (
    <div style={{ background: 'white', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', padding: '0 16px' }}>
        
        {/* Left: Interactive Back Navigation */}
        <div 
          onClick={() => prev && onStepClick?.(currentStep - 1)}
          style={{ 
            position: 'absolute', 
            left: '16px', 
            color: 'var(--text-tertiary)', 
            fontSize: '1.25rem', // Larger arrow
            fontWeight: 500,
            cursor: prev ? 'pointer' : 'default', 
            visibility: prev ? 'visible' : 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px', // Larger hit area
            height: '32px'
          }}
        >
          ←
        </div>

        {/* Center: Current Step */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="step-circle active" style={{ 
            width: 32, height: 32, minWidth: 32, 
            fontSize: '0.9rem', 
            marginTop: 0 // Overriding global margin if any
          }}>
            {currentStep}
          </div>
          <span style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--accent)' }}>
            {current?.label}
          </span>
        </div>

      </div>

      {/* Progress Dots */}
      <div className="step-dots" style={{ padding: '0 16px', marginTop: '-4px' }}>
        {steps.map((_, i) => (
          <div
            key={i}
            className={`step-dot ${i + 1 === currentStep ? 'active' : ''} ${i + 1 < currentStep ? 'completed' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

/* ─── Main Export ─── */
export default function StepHeader(props: Props) {
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  return isMobile ? <MobileHeader {...props} /> : <DesktopHeader {...props} />
}
