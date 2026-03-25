import React from 'react'

type Props = {
  label: string
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  error?: string | null
  type?: string
}

export default function TextField({ label, value, onChange, placeholder, error, type = 'text' }: Props) {
  return (
    <label className="block">
      <div className="text-[0.78rem] font-[600] text-[var(--text)] mb-[6px]">
        {label}
      </div>
      <input
        type={type}
        className={`form-input ${error ? 'error' : ''} h-[32px] text-[12px]`}
        value={value || ''}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
      />
      {error && (
        <div className="text-[0.75rem] text-[#ef4444] mt-[2px] font-[500]">
          {error}
        </div>
      )}
    </label>
  )
}
