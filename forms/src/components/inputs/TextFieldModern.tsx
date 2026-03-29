import React from 'react'

export interface TextFieldProps {
  label: string
  value: string
  placeholder?: string
  onChange: (val: string) => void
  readOnly?: boolean
  className?: string
}

export function TextFieldModern({ label, value, placeholder, onChange, readOnly, className }: TextFieldProps) {
  return (
    <div className={`flex flex-col gap-1 w-full font-['Outfit',sans-serif] ${className || ''}`}>
      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">
        {label}
      </label>
      <input
        type="text"
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`
          w-full h-[34px] px-[10px] text-[0.85rem] font-medium rounded-[3px] outline-none box-border
          transition-all duration-250 ease-in-out border
          ${readOnly 
            ? 'bg-[#F5F7FA] border-[#E4E7EC] text-[#667085] cursor-default' 
            : 'bg-[#F5F7FA] border-[#E4E7EC] text-[#1C2A44] cursor-text hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]'
          }
        `}
      />
    </div>
  )
}