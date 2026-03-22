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
    fontSize: '0.875rem',
    fontWeight: 600,
    borderRadius: '8px',
    padding: '10px 20px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'all 150ms ease',
    border: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    width: fullWidth ? '100%' : 'auto',
  }

  const styles: Record<string, React.CSSProperties> = {
    primary: {
      ...base,
      background: 'var(--accent)',
      color: 'var(--text-inverse)',
    },
    secondary: {
      ...base,
      background: 'transparent',
      color: 'var(--text)',
      border: '1.5px solid var(--border)',
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
