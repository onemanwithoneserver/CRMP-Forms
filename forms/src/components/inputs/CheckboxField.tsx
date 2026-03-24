import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export default function CheckboxField({ label, checked, onChange }: Props) {
  return (
    <button
      type="button"
      className="flex items-center gap-2.5"
      onClick={() => onChange(!checked)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px 0', textAlign: 'left' }}
    >
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`}>
        {checked && <CheckIcon />}
      </div>
      <span style={{
        fontSize: '0.82rem',
        fontWeight: 500,
        color: checked ? 'var(--text)' : 'var(--text-secondary)',
        transition: 'color 300ms var(--ease-smooth)'
      }}>
        {label}
      </span>
    </button>
  )
}
