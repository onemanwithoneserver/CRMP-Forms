import React, { ReactNode } from 'react'

type Props = {
  title?: string
  children: ReactNode
}

export default function SectionCard({ title, children }: Props) {
  return (
    <section style={{
      background: '#ffffff',
      border: '1px solid #edf0f5',
      borderRadius: '6px',
      padding: '8px 10px 8px',
      marginBottom: '4px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    }}>
      {title && (
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#8993a4',
          textTransform: 'none',
          letterSpacing: 0,
          marginBottom: '6px',
          textDecoration: 'none',
        }}>
          {title}
        </div>
      )}
      {children}
    </section>
  )
}
