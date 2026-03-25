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

  if (selected) {
    return (
      <div className={`w-full flex flex-col rounded-[4px] border border-[#C89B3C] bg-[#FFFBF0] shadow-[0_4px_20px_rgba(200,155,60,0.12)] overflow-hidden transition-all duration-500 scale-[1.01] ${className || ''}`}>
        <div
          className={`flex items-center relative cursor-pointer ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'}`}
          onClick={onClick}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-[4px] bg-[#C89B3C]/15 backdrop-blur-md border border-[#C89B3C]/20 flex items-center justify-center shadow-[0_2px_8px_rgba(200,155,60,0.1)] ${isMobile ? 'w-8 h-8' : 'w-9 h-9'}`}>
              <Icon size={isMobile ? 16 : 18} className="text-[#C89B3C]" />
            </div>
            <span className={`font-bold text-[#1C2A44] font-['Outfit'] leading-none tracking-tight ${isMobile ? 'text-[14px]' : 'text-[16px]'}`}>{label}</span>
          </div>
          <div className={`absolute ${isMobile ? 'top-2.5 right-3' : 'top-3 right-4'}`}>
            <CheckCircle2 size={isMobile ? 16 : 18} className="text-[#C89B3C] fill-[#C89B3C] stroke-[#FFFBF0]" />
          </div>
        </div>
        {children && (
          <div className={`bg-white/40 border-t border-[#C89B3C]/15 backdrop-blur-sm ${isMobile ? 'px-3 pb-4 pt-3' : 'px-4 pb-4 pt-3'}`}>
            {children}
          </div>
        )}
      </div>
    )
  }

  if (row) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`
          w-full flex items-center gap-3 px-3 py-2.5 rounded-[4px] border border-[#E2E8F0] bg-white
          hover:border-[#C89B3C]/40 hover:bg-[#FFFBF0]/40 hover:scale-[1.02] hover:shadow-md
          shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-pointer
          ${className || ''}
        `}
      >
        <div className="w-8 h-8 rounded-[4px] bg-[#1C2A44]/5 border border-[#1C2A44]/10 shadow-sm flex items-center justify-center flex-shrink-0">
          <Icon size={16} className="text-[#445069]" />
        </div>
        <span className="font-bold text-[#445069] font-['Outfit'] text-[13px] text-left flex-1 leading-tight tracking-tight">
          {label}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
       w-auto h-auto flex flex-col items-center justify-center transition-all duration-300 cursor-pointer rounded-[4px] border border-[#E2E8F0] bg-white 
       hover:border-[#C89B3C]/40 hover:shadow-xl hover:scale-[1.05] relative z-10
        ${compact
          ? 'gap-1 py-1.5 px-0.5'
          : (isMobile ? 'gap-2 py-3 px-2' : 'gap-3 py-6 px-4 min-w-auto')}
        ${className || ''}
      `}
    >
      <div className={`
        rounded-[4px] bg-[#1C2A44]/5 border border-[#1C2A44]/10 shadow-sm flex items-center justify-center transition-colors
        ${compact
          ? 'w-7 h-7 mb-0'
          : (isMobile ? 'w-8 h-8 mb-0.5' : 'w-11 h-11 mb-1.5')}
      `}>
        <Icon size={compact ? 14 : (isMobile ? 18 : 22)} className="text-[#445069]" />
      </div>
      <span className={`
        font-bold text-[#445069] font-['Outfit'] text-center w-full px-0.5 break-words tracking-tight
        ${compact
          ? (isMobile ? 'text-[10px] leading-[1.1] line-clamp-2' : 'text-[11px] leading-[1.1] line-clamp-2')
          : (isMobile ? 'text-[12px] leading-[1.2]' : 'text-[15px] leading-[1.2]')}
      `}>
        {label === 'Entire Building' && compact ? 'Building' : label}
      </span>
    </button>
  )
}
