import React from 'react'

type Props = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
}

export default function SegmentedControl({ options, value, onChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      borderRadius: '4px',
      overflow: 'hidden',
      background: 'rgba(9, 9, 11, 0.04)',
      padding: '2px',
      gap: '2px'
    }}>
      {options.map(opt => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '5px 0',
              background: isSelected ? '#1C2A44' : 'transparent',
              color: isSelected ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 300ms var(--ease-smooth)',
              boxShadow: isSelected ? '0 2px 8px rgba(9, 9, 11, 0.08)' : 'none'
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
