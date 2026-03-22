import React from 'react'

type Option = { value: string; label: string }

type Props = {
  label: string
  value?: string
  onChange?: (v: string) => void
  options: Option[]
  placeholder?: string
  error?: string | null
}

export default function SelectField({ label, value, onChange, options, placeholder, error }: Props) {
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
      <select
        className={`form-input form-select ${error ? 'error' : ''}`}
        value={value || ''}
        onChange={e => onChange?.(e.target.value)}
      >
        <option value="">{placeholder || 'Select'}</option>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '4px' }}>
          {error}
        </div>
      )}
    </label>
  )
}
