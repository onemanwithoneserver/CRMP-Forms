import React from 'react'

type Option = { value: string; label: string }

type Props = {
  label?: string
  options: readonly Option[] | Option[]
  value: string
  onChange: (value: string) => void
  error?: string | null
}

export default function RadioGroup({ label, options, value, onChange, error }: Props) {
  return (
    <div>
      {label && (
        <div className="section-title mb-2">{label}</div>
      )}
      <div className="flex flex-col gap-2">
        {options.map(option => {
          const selected = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`selection-card ${selected ? 'selected' : ''}`}
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
            >
              <div className={`radio-circle ${selected ? 'active' : ''}`} />
              <span className={`text-[0.85rem] flex-1 ${selected ? 'font-[600] text-[var(--text)]' : 'font-[500] text-[var(--text-secondary)]'}`}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </div>
  )
}
