import React, { ReactNode } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  fullWidth?: boolean
}

export default function Button({ variant = 'primary', onClick, disabled, children, fullWidth }: Props) {
  const base: React.CSSProperties = {
    fontFamily: "'Outfit', sans-serif",
    fontSize: '0.95rem',
    fontWeight: 600,
    borderRadius: '10px',
    padding: '10px 20px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'all 300ms var(--ease-smooth)',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: fullWidth ? '100%' : 'auto',
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      background: 'var(--accent)',
      color: 'var(--text-inverse)',
      boxShadow: disabled ? 'none' : '0 4px 12px rgba(9, 9, 11, 0.1)',
      transform: 'translateY(0)',
    },
    secondary: {
      ...base,
      background: 'transparent',
      color: 'var(--text)',
      border: '1px solid var(--border)',
    },
    ghost: {
      ...base,
      background: 'transparent',
      color: 'var(--text-secondary)',
    },
  }

  return (
    <button
      type="button"
      style={styles[variant]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
