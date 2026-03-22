import React from 'react'

type Props = {
  label: string
  value?: string
  onChange?: (v: string) => void
  error?: string | null
}

export default function DatePicker({ label, value, onChange, error }: Props) {
  return (
    <label className="block">
      <div style={{
        fontSize: '0.8125rem',
        fontWeight: 500,
        color: 'var(--text)',
        marginBottom: '6px',
      }}>
        {label}
      </div>
      <input
        type="date"
        className={`form-input ${error ? 'error' : ''}`}
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
      />
      {error && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </label>
  )
}
