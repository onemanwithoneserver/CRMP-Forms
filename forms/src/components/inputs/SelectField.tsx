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
  const [openUpward, setOpenUpward] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

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

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setOpenUpward(window.innerHeight - rect.bottom < 250)
    }
    setOpen(!open)
  }

  return (
    <div className="block" ref={containerRef} style={{ position: 'relative' }}>
      {label && (
        <div style={{
          fontSize: '0.78rem',
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: '3px',
        }}>
          {label}
        </div>
      )}

      <div
        ref={triggerRef}
        className={`form-input ${error ? 'error' : ''}`}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', userSelect: 'none', height: '34px',
          borderColor: open ? 'var(--accent-gold)' : undefined,
          boxShadow: open ? '0 0 0 3px rgba(200, 155, 60, 0.15)' : undefined,
          borderRadius: open
            ? openUpward ? '0 0 6px 6px' : '6px 6px 0 0'
            : '6px',
        }}
        onClick={handleToggle}
      >
        <span style={{ color: selectedOption ? 'var(--text)' : 'var(--text-tertiary)', fontSize: '13px', fontWeight: selectedOption ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selectedOption ? selectedOption.label : (placeholder || 'Select...')}
        </span>
        <svg width="12" height="7" viewBox="0 0 12 7" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease', flexShrink: 0, marginLeft: '6px' }}>
          <path d="M1 1l5 5 5-5" stroke="#667085" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: openUpward ? 'auto' : '100%',
          bottom: openUpward ? '100%' : 'auto',
          left: 0, right: 0,
          background: '#fff',
          border: '1px solid var(--accent-gold)',
          borderTop: openUpward ? '1px solid var(--accent-gold)' : 'none',
          borderBottom: openUpward ? 'none' : '1px solid var(--accent-gold)',
          borderRadius: openUpward ? '6px 6px 0 0' : '0 0 6px 6px',
          boxShadow: '0 8px 24px -4px rgba(200,155,60,0.15)',
          zIndex: 50, overflow: 'hidden', padding: '2px'
        }}>
          {options.map(o => {
            const isSel = o.value === value
            return (
              <div
                key={o.value}
                onClick={() => { onChange?.(o.value); setOpen(false); }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '0.82rem',
                  fontWeight: isSel ? 700 : 500,
                  cursor: 'pointer',
                  background: isSel ? 'var(--accent-gold-subtle)' : 'transparent',
                  color: isSel ? 'var(--accent-gold)' : 'var(--text)',
                  borderLeft: isSel ? '2px solid var(--accent-gold)' : '2px solid transparent',
                  transition: 'all 150ms ease'
                }}
              >
                {o.label}
              </div>
            )
          })}
        </div>
      )}

      {error && (
        <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '2px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </div>
  )
}
