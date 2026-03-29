import React, { ReactNode } from 'react'
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

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F5F7FA] font-['Outfit',sans-serif]">
      
      {/* Premium Header */}
      <div className="relative shrink-0 pt-4 px-5 pb-8 bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] overflow-hidden z-0">
        
        {/* Subtle dot pattern overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)',
            backgroundSize: '12px 12px',
          }} 
        />
        
        {/* Premium Gold Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent_0%,rgba(200,155,60,0.8)_50%,transparent_100%)]" />
        
        <div className="relative max-w-[720px] mx-auto flex flex-col items-center text-center">
          <h1 className="flex items-center gap-2.5 m-0 text-[1.2rem] font-bold text-white tracking-[-0.01em]">
            {icon && (
              <span className="flex items-center justify-center w-7 h-7 rounded bg-white/10 border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.2)] text-[#E6C36A]">
                {icon}
              </span>
            )}
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 mb-0 text-[0.85rem] font-normal text-white/70">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-10 -mt-4 custom-scrollbar">
        <div className="relative z-20 w-full px-4 pb-8">
          {children}
        </div>
      </div>

      {/* Premium Footer Actions */}
      <div className="relative z-30 shrink-0 flex items-center justify-between py-2.5 px-4 bg-white border-t border-[#E4E7EC] shadow-[0_-4px_16px_rgba(15,27,46,0.04)]">
        <button
          type="button"
          onClick={onSaveDraft || (() => alert('Draft saved!'))}
          className="flex items-center gap-1.5 py-1.5 px-3 rounded-[3px] bg-transparent border border-transparent text-[#C89B3C] text-[0.8rem] font-semibold cursor-pointer outline-none transition-all duration-200 ease hover:bg-[#C89B3C]/10 hover:border-[#C89B3C]"
        >
          <SaveIcon />
          <span>Save draft</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            disabled={backDisabled || isFirstStep}
            aria-label="Previous step"
            className="flex items-center justify-center w-8 h-8 rounded-[3px] outline-none transition-all duration-200 ease disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-white disabled:border-[#E4E7EC] disabled:text-[#A0AAB8] enabled:bg-white enabled:border-[#E4E7EC] enabled:text-[#1C2A44] enabled:cursor-pointer enabled:hover:bg-[#F5F7FA] enabled:hover:border-[#C89B3C] enabled:hover:shadow-[0_2px_4px_rgba(15,27,46,0.05)]"
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label={isLastStep ? 'Submit' : 'Next step'}
            className={`
              flex items-center justify-center gap-1.5 h-8 rounded-[3px] border-none bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] text-white text-[0.85rem] font-semibold cursor-pointer outline-none transition-all duration-200 ease
              shadow-[0_2px_6px_rgba(15,27,46,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]
              hover:shadow-[0_4px_12px_rgba(15,27,46,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-[1px]
              ${isLastStep ? 'px-4 min-w-auto' : 'px-3 min-w-[48px]'}
            `}
          >
            {isLastStep ? (nextLabel || 'Submit') : <ChevronRight />}
          </button>
        </div>
      </div>
    </div>
  )
}