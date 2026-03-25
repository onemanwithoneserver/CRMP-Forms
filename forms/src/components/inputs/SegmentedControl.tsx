import React from 'react'

type Props = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  compact?: boolean
}

export default function SegmentedControl({ options, value, onChange, compact = false }: Props) {
  return (
    <div 
      className={`inline-flex rounded-[4px] overflow-hidden bg-[rgba(9,9,11,0.04)] p-[2px] gap-[2px] h-[32px] box-border ${
        compact ? 'w-fit min-w-[110px]' : 'w-full'
      }`}
    >
      {options.map(opt => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex-1 rounded-[3px] cursor-pointer transition-all duration-300 ease-in-out whitespace-nowrap text-[0.78rem] font-[600] border-none ${
              isSelected ? 'bg-[#1C2A44] text-white shadow-[0_2px_8px_rgba(9,9,11,0.08)]' : 'bg-transparent text-[var(--text-secondary)]'
            } ${
              compact ? 'flex-none min-w-[50px] px-[12px]' : 'flex-1 py-[5px]'
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
