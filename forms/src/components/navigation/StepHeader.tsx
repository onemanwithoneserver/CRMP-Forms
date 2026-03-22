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
function MobileHeader({ steps, currentStep }: Props) {
  const current = steps[currentStep - 1]
  const prev = currentStep > 1 ? steps[currentStep - 2] : null
  const next = currentStep < steps.length ? steps[currentStep] : null

  return (
    <div>
      <div className="step-header-mobile">
        <div className="step-mobile-prev" style={{ visibility: prev ? 'visible' : 'hidden' }}>
          ← {prev?.label}
        </div>
        <div className="step-mobile-current">
          <div className="step-circle active" style={{ width: 24, height: 24, minWidth: 24, fontSize: '0.6875rem' }}>
            {currentStep}
          </div>
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
            {current?.label}
          </span>
        </div>
        <div className="step-mobile-next" style={{ visibility: next ? 'visible' : 'hidden', textAlign: 'right' }}>
          {next?.label} →
        </div>
      </div>
      <div className="step-dots">
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
