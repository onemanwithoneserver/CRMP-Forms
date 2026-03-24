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
        ${isMobile ? 'px-3 py-2.5 gap-2.5 min-h-[42px]' : 'px-4 py-4 gap-3.5 min-h-[54px]'}
        ${selected
          ? 'border-[#1C2A44] bg-[#1C2A44] text-white shadow-lg shadow-[#1C2A44]/15'
          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
        }
      `}
    >
      <div className={`
        rounded-full border-[2px] flex items-center justify-center transition-colors
        ${isMobile ? 'w-4 h-4 min-w-[16px]' : 'w-5 h-5 min-w-[20px]'}
        ${selected ? 'border-white' : 'border-[#CBD5E1] bg-white'}
      `}>
        {selected && (
          <div className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-white`} />
        )}
      </div>
      <span className={`font-bold font-['Outfit'] leading-tight ${selected ? 'text-white' : 'text-[#1C2A44]'} ${isMobile ? 'text-[12px]' : 'text-[14px]'}`}>
        {label}
      </span>
    </button>
  )
}
