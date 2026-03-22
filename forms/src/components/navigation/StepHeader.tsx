import React from 'react'
import { useDevice } from '../../context/DeviceContext'

type Step = { key: string; label: string }

type Props = {
  steps: readonly Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

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
              style={{ cursor: onStepClick && isCompleted ? 'pointer' : 'default', opacity: isActive || isCompleted ? 1 : 0.4 }}
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

function MobileHeader({ steps, currentStep, onStepClick }: Props) {
  const current = steps[currentStep - 1]
  const prev = currentStep > 1 ? steps[currentStep - 2] : null

  return (
    <div className="step-header-mobile" style={{ flexDirection: 'column', padding: '16px 0 0 0', display: 'flex' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px', width: '100%', padding: '0 24px' }}>

        <div
          onClick={() => prev && onStepClick?.(currentStep - 1)}
          className="step-mobile-prev"
          style={{
            position: 'absolute',
            left: '16px',
            fontSize: '1.75rem',
            color: '#1C2A44',
            cursor: prev ? 'pointer' : 'default',
            visibility: prev ? 'visible' : 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px'
          }}
        >
          ←
        </div>

        <div className="step-mobile-current">
          <div className="step-circle active" style={{
            width: 28, height: 28, minWidth: 28,
            fontSize: '0.85rem',
            marginTop: 0
          }}>
            {currentStep}
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>
            {current?.label}
          </span>
        </div>

      </div>

      <div className="step-dots" style={{ width: '100%' }}>
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

export default function StepHeader(props: Props) {
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  return isMobile ? <MobileHeader {...props} /> : <DesktopHeader {...props} />
}
