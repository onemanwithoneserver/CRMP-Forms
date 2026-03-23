import React from 'react'

export interface OptionButtonProps {
  label: string
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}

export function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        text-left px-3 py-3 rounded-[7px] border transition-all duration-200 flex items-center gap-3 w-full min-h-[44px]
        ${selected
          ? 'border-[#1C2A44] bg-[#1C2A44] text-white shadow-md shadow-[#1C2A44]/10'
          : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
        }
      `}
    >
      <div className={`
        w-4 h-4 min-w-[16px] rounded-full border-[1.5px] flex items-center justify-center transition-colors
        ${selected ? 'border-white' : 'border-[#CBD5E1] bg-white'}
      `}>
        {selected && (
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        )}
      </div>
      <span className={`text-[12px] sm:text-[13px] font-semibold font-['Outfit'] leading-tight ${selected ? 'text-white' : 'text-[#1C2A44]'}`}>
        {label}
      </span>
    </button>
  )
}
