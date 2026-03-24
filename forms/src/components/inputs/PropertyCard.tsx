import React from 'react'
import { CheckCircle2, LucideIcon } from 'lucide-react'
import { useDevice } from '../../context/DeviceContext'

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
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  if (selected) {
    return (
      <div className={`w-full flex flex-col rounded-[8px] border border-[#C89B3C] bg-[#FFFBF0] shadow-[0_4px_12px_rgba(200,155,60,0.08)] overflow-hidden transition-all duration-300 ${className || ''}`}>
        <div
          className={`flex items-center relative cursor-pointer ${isMobile ? 'px-3 py-2.5' : 'px-4 py-3'}`}
          onClick={onClick}
        >
          <div className={`flex items-center ${isMobile ? 'gap-2.5' : 'gap-3.5'}`}>
            <div className={`rounded-[6px] bg-[#C89B3C]/15 flex items-center justify-center ${isMobile ? 'w-8 h-8' : 'w-10 h-10'}`}>
              <Icon size={isMobile ? 18 : 22} className="text-[#C89B3C]" />
            </div>
            <span className={`font-bold text-[#1C2A44] font-['Outfit'] leading-none mt-0.5 ${isMobile ? 'text-[15px]' : 'text-[17px]'}`}>{label}</span>
          </div>
          <div className={`absolute ${isMobile ? 'top-2.5 right-2.5' : 'top-3.5 right-4'}`}>
            <CheckCircle2 size={isMobile ? 16 : 18} className="text-[#C89B3C] fill-[#C89B3C] stroke-[#FFFBF0]" />
          </div>
        </div>
        {children && (
          <div className={`bg-transparent border-t border-[#C89B3C]/20 ${isMobile ? 'px-3 pb-3.5 pt-2 mt-0.5' : 'px-4 pb-4 pt-3 mt-1'}`}>
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
       w-auto h-auto flex flex-col items-center justify-center transition-all duration-200 cursor-pointer rounded-[6px] border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] shadow-[0_1px_3px_rgba(0,0,0,0.04)]
        ${compact
          ? 'gap-1 py-1.5 px-0.5'
          : (isMobile ? 'gap-1.5 py-2.5 px-1.5' : 'gap-2.5 py-5 px-3 min-w-auto')}
        ${className || ''}
      `}
    >
      <div className={`
        rounded-[6px] bg-white border border-[#F1F5F9] shadow-sm flex items-center justify-center
        ${compact
          ? 'w-6 h-6 mb-0'
          : (isMobile ? 'w-7 h-7 mb-0' : 'w-10 h-10 mb-1')}
      `}>
        <Icon size={compact ? 13 : (isMobile ? 16 : 20)} className="text-[#64748B]" />
      </div>
      <span className={`
        font-bold text-[#475569] font-['Outfit'] text-center w-full px-0.5 break-words
        ${compact
          ? (isMobile ? 'text-[10px] leading-[1.1] line-clamp-2' : 'text-[11px] leading-[1.1] line-clamp-2')
          : (isMobile ? 'text-[11px] leading-[1.1]' : 'text-[14px] leading-[1.2]')}
      `}>
        {label === 'Entire Building' && compact ? 'Building' : label}
      </span>
    </button>
  )
}
