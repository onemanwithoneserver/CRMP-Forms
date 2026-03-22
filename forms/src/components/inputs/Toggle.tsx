import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Toggle({ label, checked, onChange }: Props) {
  return (
    <div className="flex items-center justify-between py-2">
      <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: '56px',
          height: '32px',
          borderRadius: '8px',
          background: checked ? 'var(--accent)' : 'var(--text-tertiary)',
          position: 'relative',
          transition: 'background 200ms ease',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          background: 'white',
          position: 'absolute',
          top: '4px',
          left: checked ? '28px' : '4px',
          transition: 'left 200ms ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }} />
      </button>
    </div>
  )
}
