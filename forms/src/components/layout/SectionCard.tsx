import React, { ReactNode } from 'react'

type Props = {
  title?: string
  icon?: ReactNode
  children: ReactNode
}

export default function SectionCard({ title, icon, children }: Props) {
  return (
    <div className="bg-white rounded-[5px] shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[var(--border-light)] mb-4">
      {title && (
        <h2 className="bg-[#1C2A44] text-[#FFFFFF] text-[12px] md:text-[14px] font-semibold px-[14px] py-[10px] m-0 border-b border-[#1C2943] rounded-t-[5px] flex items-center gap-2">
          {icon && (
            <span className="flex items-center justify-center w-7 h-7 rounded-[4px] bg-white/10 backdrop-blur-md border border-white/20 text-white mr-1 shadow-[0_2px_8px_rgba(255,255,255,0.05)]">
              {React.cloneElement(icon as any, { size: 14 })}
            </span>
          )}
          {title}
        </h2>
      )}
      <div className="p-4 md:p-4">
        {children}
      </div>
    </div>
  )
}
