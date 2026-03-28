import React, { useState } from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Toggle({ label, checked, onChange }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  let trackBg = '#F5F7FA'
  let trackBorder = '1px solid #E4E7EC'
  let trackShadow = 'inset 0 1px 3px rgba(15, 27, 46, 0.05)'

  if (checked) {
    trackBg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)'
    trackBorder = `1px solid ${isHovered ? '#E6C36A' : '#C89B3C'}`
    trackShadow = '0 2px 6px rgba(15, 27, 46, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  } else if (isHovered) {
    trackBorder = '1px solid #C89B3C'
    trackBg = '#FFFFFF'
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: checked ? '#1C2A44' : '#667085', transition: 'color 250ms ease-in-out' }}>
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '42px',
          height: '24px',
          borderRadius: '4px',
          position: 'relative',
          cursor: 'pointer',
          border: trackBorder,
          background: trackBg,
          boxShadow: trackShadow,
          transition: 'all 250ms ease-in-out',
          outline: 'none',
          padding: 0,
          boxSizing: 'border-box',
          flexShrink: 0
        }}
      >
        <div
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '3px',
            background: '#FFFFFF',
            position: 'absolute',
            top: '3px',
            left: checked ? '21px' : '3px',
            boxShadow: checked 
              ? '0 2px 4px rgba(15, 27, 46, 0.25)' 
              : '0 1px 3px rgba(15, 27, 46, 0.15)',
            transition: 'all 250ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          }}
        />
      </button>
    </div>
  )
}