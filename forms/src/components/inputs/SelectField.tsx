import React, { useState, useRef, useEffect } from 'react'

type Option = { value: string; label: string }

type Props = {
  label?: string
  value?: string
  onChange?: (v: string) => void
  options: Option[]
  placeholder?: string
  error?: string | null
}

export default function SelectField({ label, value, onChange, options, placeholder, error }: Props) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find(o => o.value === value)

  return (
    <div className="block" ref={containerRef} style={{ position: 'relative' }}>
      {label && (
        <div style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: '8px',
        }}>
          {label}
        </div>
      )}
      
      <div 
        className={`form-input ${error ? 'error' : ''}`}
        style={{
           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
           cursor: 'pointer', userSelect: 'none',
           borderColor: open ? 'var(--accent-gold)' : undefined,
           boxShadow: open ? '0 0 0 3px rgba(200, 155, 60, 0.15)' : undefined
        }}
        onClick={() => {
          if (!open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            setPosition(spaceBelow < 250 && rect.top > spaceBelow ? 'top' : 'bottom')
          }
          setOpen(!open)
        }}
      >
        <span style={{ color: selectedOption ? 'var(--text)' : 'var(--text-tertiary)' }}>
           {selectedOption ? selectedOption.label : (placeholder || 'Select...')}
        </span>
        <svg width="12" height="7" viewBox="0 0 12 7" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }}>
           <path d="M1 1l5 5 5-5" stroke="#667085" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {open && (
        <div style={{
          position: 'absolute', 
          top: position === 'bottom' ? '100%' : 'auto', 
          bottom: position === 'top' ? '100%' : 'auto',
          marginTop: position === 'bottom' ? '4px' : 0,
          marginBottom: position === 'top' ? '4px' : 0,
          left: 0, right: 0,
          background: '#fff', border: '1px solid var(--border-light)',
          borderRadius: '12px', boxShadow: 'var(--shadow-lg)',
          zIndex: 50, overflow: 'hidden', padding: '4px'
        }}>
          {options.map(o => {
            const isSel = o.value === value
            return (
              <div
                key={o.value}
                onClick={() => { onChange?.(o.value); setOpen(false); }}
                style={{
                  padding: '12px 16px',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
                  fontWeight: isSel ? 600 : 500,
                  cursor: 'pointer',
                  background: isSel ? 'var(--accent)' : 'transparent',
                  color: isSel ? '#fff' : 'var(--text)',
                  transition: 'all 200ms ease'
                }}
              >
                {o.label}
              </div>
            )
          })}
        </div>
      )}

      {error && (
        <div style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '6px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </div>
  )
}
