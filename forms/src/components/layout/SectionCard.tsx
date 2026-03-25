import React, { ReactNode } from 'react'

type Props = {
  title?: string
  children: ReactNode
}

export default function SectionCard({ title, children }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[var(--border-light)] overflow-hidden">
      {title && (
        <h2 className="text-[#C99E41] text-[16px] md:text-[18px] font-semibold px-[14px] py-[10px] m-0 border-t border-[#1C2943] rounded-t-[5px]">
          {title}
        </h2>
      )}
      <div className="p-1 md:p-1">
        {children}
      </div>
    </div>
  )
}
