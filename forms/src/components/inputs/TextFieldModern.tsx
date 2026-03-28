import React, { useState } from 'react'

export interface TextFieldProps {
  label: string
  value: string
  placeholder?: string
  onChange: (val: string) => void
  readOnly?: boolean
  className?: string
}

export function TextFieldModern({ label, value, placeholder, onChange, readOnly, className }: TextFieldProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  let borderColor = '#E4E7EC'
  let background = '#F5F7FA'
  let shadow = 'none'
  let textColor = '#1C2A44'

  if (readOnly) {
    borderColor = '#E4E7EC'
    background = '#F5F7FA'
    textColor = '#667085'
  } else if (isFocused) {
    borderColor = '#C89B3C'
    background = '#FFFFFF'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)'
  } else if (isHovered) {
    borderColor = '#E6C36A'
    background = '#FFFFFF'
  }

  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '100%',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>
        {label}
      </label>
      <input
        type="text"
        readOnly={readOnly}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onMouseEnter={() => !readOnly && setIsHovered(true)}
        onMouseLeave={() => !readOnly && setIsHovered(false)}
        onFocus={() => !readOnly && setIsFocused(true)}
        onBlur={() => !readOnly && setIsFocused(false)}
        style={{
          width: '100%',
          height: '34px',
          padding: '0 10px',
          fontSize: '0.85rem',
          fontWeight: 500,
          color: textColor,
          background: background,
          border: `1px solid ${borderColor}`,
          borderRadius: '3px',
          outline: 'none',
          transition: 'all 250ms ease-in-out',
          boxShadow: shadow,
          boxSizing: 'border-box',
          cursor: readOnly ? 'default' : 'text'
        }}
      />
    </div>
  )
}