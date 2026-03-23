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
    <div className={`flex flex-col gap-1 w-full ${className || ''}`}>
      <label className="text-[12px] font-medium text-[#475569] pl-0.5 font-['Outfit']">
        {label}
      </label>
      <input
        type="text"
        readOnly={readOnly}
        className={`
          w-full px-3 py-2 rounded-[7px] border text-[13px] font-['Outfit'] transition-colors duration-200
          placeholder-[#94A3B8]
          ${readOnly
            ? 'border-[#F1F5F9] bg-[#F8FAFC] text-[#64748B] cursor-default'
            : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#CBD5E1] focus:outline-none focus:border-[#94A3B8]'
          }
        `}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
