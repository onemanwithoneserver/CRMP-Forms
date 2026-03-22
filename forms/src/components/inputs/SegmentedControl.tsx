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
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--surface-container)',
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
              padding: '12px 0',
              background: isSelected ? 'var(--accent)' : '#e5e7eb',
              color: isSelected ? 'var(--text-inverse)' : 'var(--accent)',
              fontSize: '0.9rem',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 150ms ease'
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
