import React from 'react'

interface SectionCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export default function SectionCard({ title, icon, children }: SectionCardProps) {
  // Reusable gradient class for the top accent and the divider line
  const gradientClass = 'bg-[linear-gradient(90deg,#1C2A44_0%,#3b5998_50%,#C89B3C_100%)]'

  return (
    <div className="w-full mb-4 bg-white rounded border border-[#E4E7EC] shadow-[0_4px_12px_rgba(15,27,46,0.05)] overflow-hidden box-border font-['Outfit',sans-serif]">
      
      {/* Top Accent Line */}
      <div className={`h-[6px] w-full ${gradientClass}`} />
      
      {/* Header */}
      <div className="py-4 px-5">
        <div className="flex items-center gap-2.5">
          {icon && (
            <div className="flex items-center justify-center text-[#C89B3C]">
              {icon}
            </div>
          )}
          <h3 className="m-0 text-[0.9rem] font-bold text-[#1C2A44] tracking-[-0.01em]">
            {title}
          </h3>
        </div>
      </div>

      {/* Divider */}
      <div className={`h-[1.5px] w-full opacity-80 ${gradientClass}`} />
      
      {/* Content */}
      <div className="p-5">
        <div className="relative z-10">
          {children}
        </div>
      </div>
      
    </div>
  )
}