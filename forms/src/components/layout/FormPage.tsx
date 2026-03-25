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
    <div className="flex flex-col h-full overflow-hidden bg-[var(--surface)]">
      <div style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.05) 1px, transparent 0px)', backgroundSize: '16px 16px' }} className="bg-[#1C2A44] px-[20px] pt-[10px] pb-[40px] flex-shrink-0 relative overflow-hidden z-0">
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1C2A44] via-[#C89B3C] to-[#1C2A44] opacity-50" />
        <div className="relative max-w-[720px] mx-auto">
          <h1 className="font-['Outfit'] text-[1.15rem] flex justify-center items-center gap-2 font-[800] text-white m-0 leading-[1.2] tracking-[-0.02em]">
            {icon && (
              <span className="flex items-center justify-center w-8 h-8 rounded-[4px] bg-white/15 backdrop-blur-md border border-white/30 text-white shadow-[0_4px_12px_rgba(255,255,255,0.1)]">
                {icon}
              </span>
            )}
            {title}
          </h1>
          {subtitle && (
            <p className="text-[0.82rem] text-white/65 mt-[4px] font-['Outfit'] leading-[1.4]">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 -mt-8">
        <div className="w-full px-4 pb-20 relative z-20">
          {children}
        </div>
      </div>

      <div className="flex-shrink-0 bg-white border-t border-[#edf0f5] shadow-[0_-4px_20px_rgba(0,0,0,0.04)] p-[6px_10px] flex items-center justify-between">
        <button
          type="button"
          onClick={onSaveDraft || (() => alert('Draft saved!'))}
          className="flex items-center gap-[4px] p-[5px_10px] rounded-[4px] border-[1.5px] border-[#C89B3C]/50 bg-[#C89B3C]/5 text-[#C89B3C] font-['Outfit'] text-[0.8rem] font-[700] cursor-pointer transition-all duration-200"
        >
          <SaveIcon />
          <span>Save draft</span>
        </button>

        <div className="flex items-center gap-[8px]">
          <button
            type="button"
            onClick={onBack}
            disabled={backDisabled || isFirstStep}
            aria-label="Previous step"
            className={`w-[30px] h-[30px] rounded-[4px] border-[1.5px] border-[#e2e6ec] bg-white flex items-center justify-center transition-all duration-200 text-[#445069] ${(backDisabled || isFirstStep) ? 'opacity-[0.35] cursor-not-allowed' : 'opacity-100 cursor-pointer'}`}
          >
            <ChevronLeft />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label={isLastStep ? 'Submit' : 'Next step'}
            className={`h-[30px] rounded-[4px] border-none bg-gradient-to-br from-[#1C2A44] to-[#2a3f66] text-white flex items-center justify-center cursor-pointer font-['Outfit'] text-[0.85rem] font-[700] shadow-[0_4px_12px_rgba(28,42,68,0.25)] transition-all duration-200 gap-[6px] ${isLastStep ? 'min-w-auto px-[14px]' : 'min-w-[42px] px-0'}`}
          >
            {isLastStep ? (nextLabel || 'Submit') : <ChevronRight />}
          </button>
        </div>
      </div>
    </div>
  )
}