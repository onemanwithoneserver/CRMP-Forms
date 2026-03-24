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
        text-left rounded-[6px] border transition-all duration-200 flex items-center w-full
        ${isMobile ? 'px-1.5 py-1 gap-1.5 min-h-[32px]' : 'px-2 py-1 gap-1.5 min-h-[34px]'}
        ${selected
          ? 'border-[#1C2A44] bg-[#1C2A44] text-white shadow-sm'
          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
        }
      `}
    >
      <div className={`
        rounded-full border-[2px] flex items-center justify-center transition-colors shrink-0
        ${isMobile ? 'w-3.5 h-3.5' : 'w-4 h-4'}
        ${selected ? 'border-white' : 'border-[#CBD5E1] bg-white'}
      `}>
        {selected && (
          <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white`} />
        )}
      </div>
      <span className={`
        font-bold font-['Outfit'] leading-tight break-words
        ${selected ? 'text-white' : 'text-[#1C2A44]'} 
        ${isMobile ? 'text-[11px]' : 'text-[13px]'}
      `}>
        {label}
      </span>
    </button>
  )
}