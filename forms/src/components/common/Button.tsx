import React, { ReactNode, useState } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  fullWidth?: boolean
}

export default function Button({ variant = 'primary', onClick, disabled, children, fullWidth }: Props) {
  // Added local state to handle the required Gold Highlight hover effects via inline styles
  const [isHovered, setIsHovered] = useState(false)

  const base: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.85rem',
    fontWeight: 500, // Slightly dialed back from 600 for a cleaner, premium typographic feel
    borderRadius: '3px', // Sharp, modern 3px radius
    padding: '5px 12px', // Tighter, more compact padding
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'all 250ms ease-in-out', // Smoother easing
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px', // Reduced gap for tighter alignment
    width: fullWidth ? '100%' : 'auto',
    outline: 'none',
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      // Soft gradient blending CREMP Navy into Dark Navy
      background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)',
      color: '#FFFFFF',
      // Subtle CREMP Gold border transitioning to Gold Highlight on hover
      border: `1px solid ${isHovered && !disabled ? '#E6C36A' : 'rgba(200, 155, 60, 0.4)'}`,
      // Subtle depth combining a soft Dark Navy drop shadow and a premium inner top highlight
      boxShadow: disabled 
        ? 'none' 
        : '0 2px 6px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      transform: isHovered && !disabled ? 'translateY(-1px)' : 'translateY(0)',
    },
    secondary: {
      ...base,
      background: isHovered && !disabled ? '#FFFFFF' : '#F5F7FA', // Light Gray default
      color: '#1C2A44', // CREMP Navy text
      border: `1px solid ${isHovered && !disabled ? '#C89B3C' : '#E4E7EC'}`, // Border Gray to CREMP Gold on hover
      boxShadow: disabled ? 'none' : '0 1px 2px rgba(15, 27, 46, 0.05)',
    },
    ghost: {
      ...base,
      background: isHovered && !disabled ? '#F5F7FA' : 'transparent',
      color: isHovered && !disabled ? '#1C2A44' : '#667085', // Text Gray transitioning to Navy
      border: '1px solid transparent',
    },
  }

  return (
    <button
      type="button"
      style={styles[variant]}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </button>
  )
}