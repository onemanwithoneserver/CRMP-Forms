import React from 'react'
import { CheckCircle2, LucideIcon } from 'lucide-react'
import { useDevice } from '../../context/DeviceContext'

export interface PropertyCardProps {
  label: string
  icon: LucideIcon
  selected: boolean
  compact?: boolean
  row?: boolean
  className?: string
  onClick: () => void
  children?: React.ReactNode
}

export function PropertyCard({ label, icon: Icon, selected, compact, row, className, onClick, children }: PropertyCardProps) {
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  // 1. SELECTED STATE (Premium layout with children support)
  if (selected) {
    return (
      <div
        className={`flex ${isMobile ? 'flex-col' : 'flex-row'} w-full rounded-[3px] border border-gold bg-white shadow-[0_4px_16px_rgba(15,27,46,0.08),0_2px_4px_rgba(200,155,60,0.05)] overflow-hidden transition-all duration-250 font-outfit ${className || ''}`}
      >
        {/* Left Side: Property Identifier */}
        <div
          onClick={onClick}
          className={`flex items-center ${isMobile ? 'flex-row' : 'flex-col'} ${isMobile ? 'justify-start' : 'justify-center'} relative cursor-pointer ${isMobile ? 'w-full min-h-0' : 'w-[150px] min-h-[130px]'} ${isMobile && children ? 'border-b border-border' : ''} ${!isMobile ? 'border-r border-border' : ''} ${isMobile ? 'px-[12px] py-[10px]' : 'p-[20px]'} bg-[#F5F7FA] flex-shrink-0`}
        >
          <div className={`flex items-center ${isMobile ? 'flex-row gap-[10px]' : 'flex-col gap-[12px]'}`}>
            <div
              className={`rounded-[3px] bg-gradient-to-br from-navy to-navy-dark border border-gold shadow-[0_2px_6px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)] flex items-center justify-center ${isMobile ? 'w-[32px] h-[32px]' : 'w-[48px] h-[48px]'}`}
            >
              <Icon size={isMobile ? 16 : 24} color="#E6C36A" />
            </div>
            <span className={`font-semibold text-navy ${isMobile ? 'text-[0.85rem]' : 'text-[0.95rem]'} text-center leading-[1.1] ${isMobile ? 'pr-[24px]' : ''}`}>
              {label}
            </span>
          </div>
          <div className={`absolute ${isMobile ? 'top-[10px] right-[12px]' : 'top-[12px] right-[12px]'}`}>
            <CheckCircle2 size={isMobile ? 16 : 18} color="#C89B3C" fill="#FFFFFF" />
          </div>
        </div>
        {/* Right Side / Bottom: Sub-options (Children) */}
        {children && (
          <div className={`flex-1 ${isMobile ? 'p-[12px]' : 'p-[16px]'} bg-white`}>
            {children}
          </div>
        )}
      </div>
    )
  }

  // 2. ROW STATE (Horizontal List Layout)
  if (row) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`group flex items-center gap-[10px] w-full px-[10px] py-[8px] rounded-[3px] border border-border bg-[#F5F7FA] hover:border-gold hover:bg-white hover:shadow-[0_2px_8px_rgba(15,27,46,0.08)] transition-all duration-250 cursor-pointer outline-none font-outfit ${className || ''}`}
      >
        <div className="w-[28px] h-[28px] rounded-[3px] bg-white border border-border group-hover:bg-[#F5F7FA] group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-all duration-250">
          {/* By passing text color via className, Lucide uses it as currentColor */}
          <Icon size={14} className="text-[#667085] group-hover:text-[#C89B3C] transition-colors duration-250 ease-in-out" />
        </div>
        <span className="font-medium text-text-tertiary group-hover:font-semibold group-hover:text-navy text-[0.85rem] text-left flex-1 transition-all duration-250">
          {label}
        </span>
      </button>
    )
  }

  // 3. DEFAULT STATE (Grid / Vertical Block Layout)
  return (
<button
  type="button"
  onClick={onClick}
  className={`group flex flex-col items-center justify-center w-full transition-all duration-250 cursor-pointer outline-none font-outfit
    ${compact ? 'px-[4px] py-[6px] gap-[4px]' : isMobile ? 'px-[8px] py-[10px] gap-[8px]' : 'px-[12px] py-[16px] gap-[12px]'}
    ${selected ? 'border-gold bg-white shadow-[0_4px_12px_rgba(15,27,46,0.08)] -translate-y-[1px]' : 'border-border bg-[#F5F7FA]'}
    hover:border-gold hover:bg-white hover:shadow-[0_4px_12px_rgba(15,27,46,0.08)] hover:-translate-y-[1px] rounded-[3px] border`}
>
  {/* Icon Container: 40px Desktop / 32px Mobile */}
  <div 
    className={`flex items-center justify-center transition-all duration-250 rounded-[3px] border
      ${compact ? 'w-[28px] h-[28px]' : isMobile ? 'w-[32px] h-[32px]' : 'w-[40px] h-[40px]'}
      ${selected 
        ? 'bg-gradient-to-br from-navy to-navy-dark border-gold shadow-[0_2px_4px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]' 
        : 'bg-white border-border group-hover:bg-gradient-to-br group-hover:from-navy group-hover:to-navy-dark group-hover:border-gold group-hover:shadow-[0_2px_4px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]'}
    `}
  >
    <Icon
      size={compact ? 14 : isMobile ? 16 : 20}
      className={`transition-colors duration-250 ease-in-out ${selected ? 'text-[#E6C36A]' : 'text-[#667085] group-hover:text-[#E6C36A]'}`}
    />
  </div>

  <span className={`text-center leading-[1.15] break-words tracking-[-0.01em] transition-colors duration-250
    ${compact ? (isMobile ? 'text-[0.65rem]' : 'text-[0.7rem]') : (isMobile ? 'text-[0.75rem]' : 'text-[0.85rem]')}
    ${selected ? 'font-semibold text-navy' : 'font-medium text-text-tertiary group-hover:font-semibold group-hover:text-navy'}
  `}>
    {label === 'Entire Building' && compact ? 'Building' : label}
  </span>
</button>
  )
}