import React from 'react'
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

// Extracted Desktop Step to manage independent hover states via Tailwind groups
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
  const isClickable = !!onClick && isCompleted

  let boxClass = 'w-7 h-7 rounded-[3px] flex items-center justify-center text-[0.8rem] font-bold transition-all duration-250 ease-in-out border '
  
  if (isActive) {
    boxClass += 'bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border-[#E6C36A] text-white shadow-[0_2px_6px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]'
  } else if (isCompleted) {
    boxClass += 'text-[#C89B3C] '
    if (isClickable) {
      boxClass += 'bg-[#F5F7FA] border-[#C89B3C] group-hover:bg-white group-hover:border-[#E6C36A] group-hover:shadow-[0_2px_4px_rgba(15,27,46,0.05)]'
    } else {
      boxClass += 'bg-[#F5F7FA] border-[#C89B3C]'
    }
  } else {
    boxClass += 'bg-white border-[#E4E7EC] text-[#667085]'
  }

  return (
    <div
      onClick={() => isClickable && onClick?.()}
      className={`
        flex items-center gap-2 transition-opacity duration-250 ease-in-out
        ${isActive || isCompleted ? 'opacity-100' : 'opacity-60'}
        ${isClickable ? 'group cursor-pointer' : 'cursor-default'}
      `}
    >
      <div className={boxClass}>
        {isCompleted ? <CheckIcon /> : stepNum}
      </div>
      <span className={`
        text-[0.85rem] transition-colors duration-250 ease-in-out
        ${isActive || isCompleted ? 'font-semibold text-[#1C2A44]' : 'font-medium text-[#667085]'}
      `}>
        {step.label}
      </span>
    </div>
  )
}

function DesktopHeader({ steps, currentStep, onStepClick }: Props) {
  return (
    <div className="flex items-center w-full font-['Outfit',sans-serif]">
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
                className={`
                  flex-1 h-[2px] mx-3 rounded-[1px] transition-colors duration-300 ease-in-out
                  ${isCompleted ? 'bg-[#C89B3C]' : 'bg-[#E4E7EC]'}
                `} 
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
    <div className="flex flex-col w-full gap-3 py-2 font-['Outfit',sans-serif]">
      
      {/* Top Row: Back Button & Current Step */}
      <div className="flex items-center justify-center relative h-[34px] px-1">
        <button
          onClick={() => prev && onStepClick?.(currentStep - 1)}
          className={`
            absolute left-1 w-[34px] h-[34px] flex items-center justify-center rounded-[3px] text-[#1C2A44] transition-all duration-200 ease outline-none
            ${prev ? 'bg-[#F5F7FA] border border-[#E4E7EC] visible cursor-pointer hover:bg-white hover:border-[#C89B3C]' : 'invisible'}
          `}
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-[26px] h-[26px] rounded-[3px] bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border border-[#E6C36A] text-white shadow-[0_2px_6px_rgba(15,27,46,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center text-[0.8rem] font-bold">
            {currentStep}
          </div>
          <span className="text-[0.9rem] font-semibold text-[#1C2A44] tracking-[-0.01em]">
            {current?.label}
          </span>
        </div>
      </div>

      {/* Bottom Row: Segmented Progress Bar */}
      <div className="flex gap-1 w-full px-1">
        {steps.map((_, i) => {
          let barBg = 'bg-[#E4E7EC]' // Pending
          if (i + 1 === currentStep) barBg = 'bg-[linear-gradient(90deg,#1C2A44_0%,#0F1B2E_100%)]' // Active
          else if (i + 1 < currentStep) barBg = 'bg-[#C89B3C]' // Completed

          return (
            <div 
              key={i} 
              className={`flex-1 h-1 rounded-[2px] transition-all duration-300 ease-in-out ${barBg}`} 
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