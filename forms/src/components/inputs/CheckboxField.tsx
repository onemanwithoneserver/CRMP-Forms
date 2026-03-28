import React, { useState } from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export default function CheckboxField({ label, checked, onChange }: Props) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px 0',
        textAlign: 'left',
        fontFamily: "'Outfit', sans-serif",
        outline: 'none',
      }}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 250ms ease-in-out',
          background: checked ? 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)' : '#F5F7FA',
          border: `1px solid ${
            checked
              ? isHovered ? '#E6C36A' : 'rgba(200, 155, 60, 0.4)'
              : isHovered ? '#C89B3C' : '#E4E7EC'
          }`,
          boxShadow: checked
            ? '0 2px 4px rgba(15, 27, 46, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            : isHovered ? '0 1px 2px rgba(15, 27, 46, 0.05)' : 'none',
        }}
      >
        {checked && <CheckIcon />}
      </div>
      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: 500,
          transition: 'color 250ms ease-in-out',
          color: checked ? '#1C2A44' : '#667085',
        }}
      >
        {label}
      </span>
    </button>
  )
}