import React, { useState } from 'react'
import { useDevice } from '../../context/DeviceContext'
import { ChevronLeft } from 'lucide-react'

type Step = { key: string; label: string }

type Props = {
  steps: readonly Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

// Extracted Desktop Step to manage independent hover states
function DesktopStep({ 
  step, 
  stepNum, 
  isActive, 
  isCompleted, 
  onClick 
}: { 
  step: Step; 
  stepNum: number; 
  isActive: boolean; 
  isCompleted: boolean; 
  onClick?: () => void 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const isClickable = !!onClick && isCompleted

  let boxBg = '#FFFFFF'
  let boxBorder = '1px solid #E4E7EC'
  let boxColor = '#667085'
  let boxShadow = 'none'
  let fontWeight = 500

  if (isActive) {
    boxBg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)'
    boxBorder = '1px solid #E6C36A'
    boxColor = '#FFFFFF'
      fontWeight = 600
    boxShadow = '0 2px 6px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  } else if (isCompleted) {
    boxBg = isHovered && isClickable ? '#FFFFFF' : '#F5F7FA'
    boxBorder = `1px solid ${isHovered && isClickable ? '#E6C36A' : '#C89B3C'}`
    boxColor = '#C89B3C'
    fontWeight = 600
    boxShadow = isHovered && isClickable ? '0 2px 4px rgba(15, 27, 46, 0.05)' : 'none'
  }

  return (
    <div
      onClick={() => isClickable && onClick?.()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: isClickable ? 'pointer' : 'default',
        opacity: isActive || isCompleted ? 1 : 0.6,
        transition: 'all 250ms ease-in-out',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '3px', // Sharp, modern 3px radius
          background: boxBg,
          border: boxBorder,
          color: boxColor,
          boxShadow: boxShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.8rem',
          fontWeight: 700,
          transition: 'all 250ms ease-in-out',
        }}
      >
        {isCompleted ? <CheckIcon /> : stepNum}
      </div>
      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: fontWeight,
          color: isActive ? '#1C2A44' : isCompleted ? '#1C2A44' : '#667085',
          transition: 'color 250ms ease-in-out',
        }}
      >
        {step.label}
      </span>
    </div>
  )
}

function DesktopHeader({ steps, currentStep, onStepClick }: Props) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      {steps.map((step, i) => {
        const stepNum = i + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep

        return (
          <React.Fragment key={step.key}>
            <DesktopStep
              step={step}
              stepNum={stepNum}
              isActive={isActive}
              isCompleted={isCompleted}
              onClick={() => onStepClick?.(stepNum)}
            />
            {i < steps.length - 1 && (
              <div 
                style={{ 
                  flex: 1, 
                  height: '2px', 
                  background: isCompleted ? '#C89B3C' : '#E4E7EC', 
                  margin: '0 12px',
                  borderRadius: '1px',
                  transition: 'background 300ms ease-in-out'
                }} 
              />
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '12px', fontFamily: "'Outfit', sans-serif", padding: '8px 0' }}>
      
      {/* Top Row: Back Button & Current Step */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '34px', padding: '0 4px' }}>
        <button
          onClick={() => prev && onStepClick?.(currentStep - 1)}
          style={{
            position: 'absolute',
            left: '4px',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: prev ? '#F5F7FA' : 'transparent',
            border: prev ? '1px solid #E4E7EC' : 'none',
            borderRadius: '3px',
            color: '#1C2A44',
            visibility: prev ? 'visible' : 'hidden',
            cursor: 'pointer',
            transition: 'all 200ms ease',
            outline: 'none',
          }}
        >
          <ChevronLeft size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '3px',
              background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)',
              border: '1px solid #E6C36A',
              color: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(15, 27, 46, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.8rem',
              fontWeight: 700,
            }}
          >
            {currentStep}
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1C2A44', letterSpacing: '-0.01em' }}>
            {current?.label}
          </span>
        </div>
      </div>

      {/* Bottom Row: Segmented Progress Bar */}
      <div style={{ display: 'flex', gap: '4px', width: '100%', padding: '0 4px' }}>
        {steps.map((_, i) => {
          let barBg = '#E4E7EC' // Pending
          if (i + 1 === currentStep) barBg = 'linear-gradient(90deg, #1C2A44 0%, #0F1B2E 100%)' // Active
          else if (i + 1 < currentStep) barBg = '#C89B3C' // Completed

          return (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                height: '4px', 
                borderRadius: '2px', 
                background: barBg,
                transition: 'background 300ms ease-in-out'
              }} 
            />
          )
        })}
      </div>
    </div>
  )
}

export default function StepHeader(props: Props) {
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  return isMobile ? <MobileHeader {...props} /> : <DesktopHeader {...props} />
}