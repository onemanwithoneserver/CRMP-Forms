import React, { useState } from 'react'

type Props = {
  label: string
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  error?: string | null
  type?: string
  className?: string
}

export default function TextField({ label, value, onChange, placeholder, error, type = 'text', className }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  // Determine dynamic styling based on state and error presence
  let borderColor = '#E4E7EC'
  let background = '#F5F7FA'
  let shadow = 'none'

  if (error) {
    borderColor = '#EF4444'
    background = '#FFFFFF'
    shadow = isFocused ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
  } else if (isFocused) {
    borderColor = '#C89B3C'
    background = '#FFFFFF'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)'
  } else if (isHovered) {
    borderColor = '#E6C36A'
    background = '#FFFFFF'
  }

  return (
    <label 
      className={className} 
      style={{ 
        display: 'block', 
        width: '100%', 
        fontFamily: "'Outfit', sans-serif" 
      }}
    >
      {label && (
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44', marginBottom: '4px' }}>
          {label}
        </div>
      )}
      
      <input
        type={type}
        value={value || ''}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          height: '34px',
          padding: '0 10px',
          fontSize: '0.85rem',
          fontWeight: 500,
          color: '#1C2A44',
          background: background,
          border: `1px solid ${borderColor}`,
          borderRadius: '3px',
          outline: 'none',
          transition: 'all 250ms ease-in-out',
          boxShadow: shadow,
          boxSizing: 'border-box',
        }}
      />
      
      {error && (
        <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </label>
  )
}