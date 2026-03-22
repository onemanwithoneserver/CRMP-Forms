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
        <div className="section-title" style={{ marginBottom: '16px' }}>{label}</div>
      )}
      <div className="flex flex-col gap-3">
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
              <span style={{
                fontSize: '0.95rem',
                fontWeight: selected ? 600 : 500,
                color: selected ? 'var(--text)' : 'var(--text-secondary)',
                flex: 1,
              }}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
      {error && (
        <div style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '10px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </div>
  )
}
