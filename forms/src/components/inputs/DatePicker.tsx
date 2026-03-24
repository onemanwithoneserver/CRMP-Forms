import React, { useState, useRef, useEffect } from 'react'

type Props = {
  value: string
  onChange: (d: string) => void
  placeholder?: string
  disablePast?: boolean
}

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay()

export default function DatePicker({ value, onChange, placeholder = 'DD-MM-YYYY', disablePast = false }: Props) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom')
  
  const [viewDate, setViewDate] = useState(() => {
    return value ? new Date(value) : new Date()
  })

  // Whenever opened, sync view Date to selected value to avoid jumping
  useEffect(() => {
    if (open && value) {
      setViewDate(new Date(value))
    }
  }, [open, value])

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

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
  }
  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation()
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  }

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const days: (number | null)[] = Array.from({ length: firstDay }, () => null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  const formatDate = (dateStr: string) => {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return dateStr
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <div
        onClick={() => {
          if (!open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            setPosition(spaceBelow < 350 && rect.top > spaceBelow ? 'top' : 'bottom')
          }
          setOpen(!open)
        }}
        className="form-input"
        style={{
          height: '34px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 8px', cursor: 'pointer', background: 'var(--surface-lowest)',
          borderColor: open ? 'var(--accent-gold)' : 'var(--border)',
          fontWeight: 600
        }}
      >
        <span style={{ color: value ? 'var(--text)' : 'var(--text-tertiary)' }}>
          {value ? formatDate(value) : placeholder}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      </div>

      {open && (
        <div style={{
          position: 'absolute',
          top: position === 'bottom' ? '100%' : 'auto',
          bottom: position === 'top' ? '100%' : 'auto',
          marginTop: position === 'bottom' ? '8px' : 0,
          marginBottom: position === 'top' ? '8px' : 0,
          right: 0, 
          width: '280px',
          background: '#fff',
          border: '1px solid var(--border-light)',
          borderRadius: '6px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 100,
          padding: '10px',
        }}>
          <div className="flex justify-between items-center mb-4">
            <button type="button" onClick={prevMonth} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>‹</button>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button type="button" onClick={nextMonth} style={{ background: 'transparent', border: 'none', fontSize: '1.2rem', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}>›</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-tertiary)' }}>{d}</div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
            {days.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />
              
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const isSelected = value === dateStr
              
              const todayStr = new Date().toISOString().split('T')[0]
              const isToday = todayStr === dateStr
              const isPast = dateStr < todayStr

              const disabled = disablePast && isPast
              
              return (
                <button
                  key={idx}
                  type="button"
                  disabled={disabled}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!disabled) {
                      onChange(dateStr)
                      setOpen(false)
                    }
                  }}
                  style={{
                    padding: '8px 0',
                    background: isSelected ? 'var(--accent)' : 'transparent',
                    color: isSelected ? '#fff' : (disabled ? 'var(--text-tertiary)' : (isToday ? 'var(--accent)' : 'var(--text)')),
                    border: isToday && !isSelected ? '1px solid var(--accent)' : '1px solid transparent',
                    borderRadius: '6px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.4 : 1,
                    fontSize: '0.85rem',
                    fontWeight: isSelected || isToday ? 700 : 500,
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
          
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
             <button type="button" onClick={(e) => { e.stopPropagation(); onChange(''); setOpen(false) }} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Clear</button>
             <button type="button" onClick={(e) => { e.stopPropagation(); onChange(new Date().toISOString().split('T')[0]); setOpen(false) }} style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)', background: 'transparent', border: 'none', cursor: 'pointer' }}>Today</button>
          </div>
        </div>
      )}
    </div>
  )
}
