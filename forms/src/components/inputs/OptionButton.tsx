import React, { useState } from 'react'
import { useDevice } from '../../context/DeviceContext'

export interface OptionButtonProps {
  label: string
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}

export function OptionButton({ label, selected, onClick }: OptionButtonProps) {
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const [isHovered, setIsHovered] = useState(false)

  let bg = '#F5F7FA'
  let border = '1px solid #E4E7EC'
  let textColor = '#667085'
  let shadow = 'none'
  let fontWeight = 500

  if (selected) {
    bg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)'
    border = '1px solid #E6C36A'
    textColor = '#FFFFFF'
    shadow = '0 2px 6px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    fontWeight = 600
  } else if (isHovered) {
    bg = '#FFFFFF'
    border = '1px solid #C89B3C'
    textColor = '#1C2A44'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08)'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'left',
        fontFamily: "'Outfit', sans-serif",
        transition: 'all 250ms ease-in-out',
        borderRadius: '3px',
        cursor: 'pointer',
        outline: 'none',
        padding: isMobile ? '6px 8px' : '8px 10px',
        minHeight: isMobile ? '32px' : '36px',
        gap: isMobile ? '6px' : '8px',
        background: bg,
        border: border,
        boxShadow: shadow,
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: isMobile ? '14px' : '16px',
          height: isMobile ? '14px' : '16px',
          borderRadius: '3px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 250ms ease-in-out',
          background: selected ? '#C89B3C' : isHovered ? '#F5F7FA' : '#FFFFFF',
          border: selected ? '1px solid transparent' : `1px solid ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
        }}
      >
        {selected && (
          <div 
            style={{
              width: isMobile ? '6px' : '8px',
              height: isMobile ? '6px' : '8px',
              borderRadius: '1.5px',
              background: '#FFFFFF',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)'
            }} 
          />
        )}
      </div>

      <span
        style={{
          fontSize: isMobile ? '0.75rem' : '0.85rem',
          fontWeight: fontWeight,
          color: textColor,
          transition: 'color 250ms ease-in-out',
          lineHeight: 1.2,
          wordBreak: 'break-word',
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </span>
    </button>
  )
}