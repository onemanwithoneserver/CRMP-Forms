import React from 'react'

interface SectionCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export default function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <div className="relative mt-10 mb-6 w-full font-outfit">
      <div className="absolute -top-[22px] left-0 bg-[#1C2A44] px-5 py-2 flex items-center gap-3 z-10 border-t-[3px] border-[#C89B3C] shadow-md rounded-t-[8px]">
        {icon && (
          <div className="text-[#C89B3C] flex items-center justify-center">
            {icon}
          </div>
        )}
        <h2 className="text-[0.95rem] font-bold text-white m-0 tracking-tight whitespace-nowrap">
          {title}
        </h2>
      </div>

      <div className="bg-white rounded-[8px] pt-10 pb-6 px-6 relative shadow-sm overflow-hidden">
        <div className="absolute top-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C] opacity-60" />
        
        <div className="relative z-[1]">
          {children}
        </div>

        <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C] opacity-60" />
      </div>
    </div>
  )
}