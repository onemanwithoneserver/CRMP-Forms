import React from 'react'

type Props = {
  options: { label: string; value: string }[]
  value: string
  onChange: (value: string) => void
  compact?: boolean
}

export default function SegmentedControl({ options, value, onChange, compact = false }: Props) {
  return (
    <div style={{
      display: 'inline-flex',
      borderRadius: '4px',
      overflow: 'hidden',
      background: 'rgba(9, 9, 11, 0.04)',
      padding: '2px',
      gap: '2px',
      height: '34px',
      width: compact ? 'fit-content' : '100%',
      minWidth: compact ? '110px' : undefined,
      boxSizing: 'border-box',
    }}>
      {options.map(opt => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              flex: compact ? undefined : 1,
              minWidth: compact ? '50px' : undefined,
              padding: compact ? '0 12px' : '5px 0',
              background: isSelected ? '#1C2A44' : 'transparent',
              color: isSelected ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 300ms var(--ease-smooth)',
              boxShadow: isSelected ? '0 2px 8px rgba(9, 9, 11, 0.08)' : 'none',
              whiteSpace: 'nowrap',
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
