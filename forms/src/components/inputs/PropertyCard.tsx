import React from 'react'
import { CheckCircle2, LucideIcon } from 'lucide-react'

export interface PropertyCardProps {
  label: string
  icon: LucideIcon
  selected: boolean
  compact?: boolean
  className?: string
  onClick: () => void
  children?: React.ReactNode
}

export function PropertyCard({ label, icon: Icon, selected, compact, className, onClick, children }: PropertyCardProps) {
  if (selected) {
    return (
      <div className={`w-full flex flex-col rounded-[7px] border border-[#C89B3C] bg-[#FFFBF0] shadow-[0_4px_12px_rgba(200,155,60,0.08)] overflow-hidden transition-all duration-300 ${className || ''}`}>
        <div className="flex items-center px-4 py-3 relative cursor-pointer" onClick={onClick}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[7px] bg-[#C89B3C]/15 flex items-center justify-center">
              <Icon size={18} className="text-[#C89B3C]" />
            </div>
            <span className="text-[15px] font-semibold text-[#1C2A44] font-['Outfit'] leading-none mt-0.5">{label}</span>
          </div>
          <div className="absolute top-3 right-3">
            <CheckCircle2 size={16} className="text-[#C89B3C] fill-[#C89B3C] stroke-[#FFFBF0]" />
          </div>
        </div>
        {children && (
           <div className="px-4 pb-4 bg-transparent border-t border-[#C89B3C]/20 pt-3 mt-1">
             {children}
           </div>
        )}
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        w-full h-full flex flex-col items-center justify-center transition-all duration-200 cursor-pointer rounded-[7px] border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] shadow-[0_1px_2px_rgba(0,0,0,0.02)]
        ${compact 
          ? 'gap-1.5 py-2 px-1' 
          : 'gap-1.5 py-2.5 px-1 md:py-3 md:px-2 md:min-w-[84px]'}
        ${className || ''}
      `}
    >
      <div className={`
        rounded-[7px] bg-white border border-[#F1F5F9] shadow-sm flex items-center justify-center
        ${compact ? 'w-6 h-6 mb-0' : 'w-8 h-8 mb-0.5'}
      `}>
        <Icon size={compact ? 14 : 16} className="text-[#64748B]" />
      </div>
      <span className={`
        font-semibold text-[#475569] font-['Outfit'] text-center w-full px-0.5 break-words
        ${compact ? 'text-[10px] leading-[1.1] line-clamp-2' : 'text-[10.5px] sm:text-[11px] md:text-[12px] leading-[1.2]'}
      `}>
        {label === 'Entire Building' && compact ? 'Building' : label}
      </span>
    </button>
  )
}
