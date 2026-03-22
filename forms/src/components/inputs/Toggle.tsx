import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Toggle({ label, checked, onChange }: Props) {
  return (
    <div className="flex items-center justify-between py-3">
      <span style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)' }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: '52px',
          height: '32px',
          borderRadius: '4px',
          background: checked ? '#1C2A44' : 'rgba(9, 9, 11, 0.2)',
          position: 'relative',
          transition: 'background 300ms var(--ease-smooth)',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '26px',
          height: '26px',
          borderRadius: '4px',
          background: '#ffffff',
          position: 'absolute',
          top: '3px',
          left: checked ? '23px' : '3px',
          transition: 'left 300ms var(--ease-spring)',
          boxShadow: '0 2px 8px rgba(9, 9, 11, 0.15)'
        }} />
      </button>
    </div>
  )
}
