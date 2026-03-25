import React from 'react'
import { useDevice } from '../../context/DeviceContext'

export interface OptionButtonProps {
  label: string
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}

export function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        text-left rounded-[4px] border transition-all duration-300 flex items-center w-full
        ${isMobile ? 'px-1.5 py-1.5 gap-2 min-h-[34px]' : 'px-2.5 py-1.5 gap-2.5 min-h-[38px]'}
        ${selected
          ? 'border-[#1C2A44] bg-[#1C2A44] text-white shadow-md'
          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
        }
      `}
    >
      <div className={`
        rounded-[3px] border-[1.5px] flex items-center justify-center transition-colors shrink-0
        ${isMobile ? 'w-4 h-4' : 'w-4.5 h-4.5'}
        ${selected ? 'border-white bg-white/10' : 'border-[#CBD5E1] bg-white'}
      `}>
        {selected && (
          <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-[1px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]`} />
        )}
      </div>
      <span className={`
        font-bold font-['Outfit'] leading-tight break-words tracking-tight
        ${selected ? 'text-white' : 'text-[#1C2A44]'} 
        ${isMobile ? 'text-[11.5px]' : 'text-[13.5px]'}
      `}>
        {label}
      </span>
    </button>
  )
}