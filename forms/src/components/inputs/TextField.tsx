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
      <div style={{
        fontSize: '0.78rem',
        fontWeight: 600,
        color: 'var(--text)',
        marginBottom: '6px',
      }}>
        {label}
      </div>
      <input
        type={type}
        className={`form-input ${error ? 'error' : ''}`}
        style={{ height: '32px', fontSize: '12px' }}
        value={value || ''}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
      />
      {error && (
        <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '2px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </label>
  )
}
