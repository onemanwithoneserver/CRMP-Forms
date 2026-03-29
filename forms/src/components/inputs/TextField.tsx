import React from 'react'

type Props = {
  label: string
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  error?: string | null
  type?: string
  className?: string
}

export default function TextField({ label, value, onChange, placeholder, error, type = 'text', className }: Props) {
  return (
    <label className={`block w-full font-['Outfit',sans-serif] ${className || ''}`}>
      {label && (
        <div className="text-[0.8rem] font-semibold text-[#1C2A44] mb-1">
          {label}
        </div>
      )}
      
      <input
        type={type}
        value={value || ''}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
        className={`
          w-full h-[34px] px-[10px] text-[0.85rem] font-medium text-[#1C2A44] rounded-[3px] outline-none box-border
          transition-all duration-250 ease-in-out border
          ${error 
            ? 'bg-white border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
            : 'bg-[#F5F7FA] border-[#E4E7EC] hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]'
          }
        `}
      />
      
      {error && (
        <div className="text-[0.75rem] text-[#EF4444] mt-1 font-medium">
          {error}
        </div>
      )}
    </label>
  )
}