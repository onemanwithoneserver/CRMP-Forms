import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export default function CheckboxField({ label, checked, onChange }: Props) {
  return (
    <button
      type="button"
      className="flex items-center gap-3"
      onClick={() => onChange(!checked)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`}>
        {checked && <CheckIcon />}
      </div>
      <span style={{
        fontSize: '0.875rem',
        fontWeight: 400,
        color: 'var(--text)',
      }}>
        {label}
      </span>
    </button>
  )
}
