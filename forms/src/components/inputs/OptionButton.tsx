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

  const btnClass = `
    group w-full flex items-center text-left font-['Outfit',sans-serif] 
    transition-all duration-250 ease-in-out rounded-[3px] cursor-pointer outline-none
    ${isMobile ? 'py-1.5 px-2 min-h-[32px] gap-1.5' : 'py-2 px-2.5 min-h-[36px] gap-2'}
    ${selected 
      ? 'bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border border-[#E6C36A] shadow-[0_2px_6px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]'
      : 'bg-[#F5F7FA] border border-[#E4E7EC] hover:bg-white hover:border-[#C89B3C] hover:shadow-[0_2px_8px_rgba(15,27,46,0.08)]'
    }
  `

  const boxClass = `
    shrink-0 rounded-[3px] flex items-center justify-center transition-all duration-250 ease-in-out
    ${isMobile ? 'w-[14px] h-[14px]' : 'w-4 h-4'}
    ${selected 
      ? 'bg-[#C89B3C] border border-transparent'
      : 'bg-white border border-[#E4E7EC] group-hover:bg-[#F5F7FA] group-hover:border-[#C89B3C]'
    }
  `

  const innerDotClass = `
    bg-white rounded-[1.5px] shadow-[0_0_4px_rgba(255,255,255,0.6)]
    ${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'}
  `

  const textClass = `
    transition-colors duration-250 ease-in-out leading-[1.2] break-words tracking-[-0.01em]
    ${isMobile ? 'text-[0.75rem]' : 'text-[0.85rem]'}
    ${selected 
      ? 'font-semibold text-white' 
      : 'font-medium text-[#667085] group-hover:text-[#1C2A44]'
    }
  `

  return (
    <button
      type="button"
      onClick={onClick}
      className={btnClass}
    >
      <div className={boxClass}>
        {selected && <div className={innerDotClass} />}
      </div>

      <span className={textClass}>
        {label}
      </span>
    </button>
  )
}