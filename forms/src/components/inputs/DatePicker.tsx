import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'

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
  const [viewDate, setViewDate] = useState(() => value ? new Date(value) : new Date())

  const [isInputHovered, setIsInputHovered] = useState(false)
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [hoveredPrev, setHoveredPrev] = useState(false)
  const [hoveredNext, setHoveredNext] = useState(false)
  const [hoveredClear, setHoveredClear] = useState(false)
  const [hoveredToday, setHoveredToday] = useState(false)

  useEffect(() => {
    if (open && value) setViewDate(new Date(value))
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
    <div ref={containerRef} style={{ position: 'relative', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <div
        onClick={() => {
          if (!open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            setPosition(spaceBelow < 350 && rect.top > spaceBelow ? 'top' : 'bottom')
          }
          setOpen(!open)
        }}
        onMouseEnter={() => setIsInputHovered(true)}
        onMouseLeave={() => setIsInputHovered(false)}
        style={{
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          cursor: 'pointer',
          background: isInputHovered && !open ? '#FFFFFF' : '#F5F7FA',
          border: `1px solid ${open ? '#C89B3C' : isInputHovered ? '#E6C36A' : '#E4E7EC'}`,
          borderRadius: '3px',
          transition: 'all 250ms ease-in-out',
          boxShadow: open ? '0 2px 8px rgba(15, 27, 46, 0.08)' : 'none',
        }}
      >
        <span style={{ 
          fontSize: '0.85rem', 
          fontWeight: 500, 
          color: value ? '#1C2A44' : '#667085',
          transition: 'color 250ms ease-in-out'
        }}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar size={16} color={open || isInputHovered ? '#C89B3C' : '#667085'} style={{ transition: 'color 250ms ease-in-out' }} />
      </div>

      {open && (
        <div 
          style={{
            position: 'absolute',
            right: 0,
            width: '260px',
            background: '#FFFFFF',
            border: '1px solid #E4E7EC',
            borderRadius: '5px',
            boxShadow: '0 8px 24px rgba(15, 27, 46, 0.15), 0 2px 6px rgba(15, 27, 46, 0.08)',
            zIndex: 100,
            padding: '12px',
            marginTop: position === 'bottom' ? '6px' : '0',
            marginBottom: position === 'top' ? '6px' : '0',
            top: position === 'bottom' ? '100%' : 'auto',
            bottom: position === 'top' ? '100%' : 'auto',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <button 
              type="button" 
              onClick={prevMonth}
              onMouseEnter={() => setHoveredPrev(true)}
              onMouseLeave={() => setHoveredPrev(false)}
              style={{
                background: hoveredPrev ? '#F5F7FA' : 'transparent',
                border: 'none',
                color: hoveredPrev ? '#1C2A44' : '#667085',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '26px',
                width: '26px',
                borderRadius: '3px',
                transition: 'all 200ms ease',
                outline: 'none',
              }}
            >
              <ChevronLeft size={16} />
            </button>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#1C2A44' }}>
              {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              type="button" 
              onClick={nextMonth}
              onMouseEnter={() => setHoveredNext(true)}
              onMouseLeave={() => setHoveredNext(false)}
              style={{
                background: hoveredNext ? '#F5F7FA' : 'transparent',
                border: 'none',
                color: hoveredNext ? '#1C2A44' : '#667085',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '26px',
                width: '26px',
                borderRadius: '3px',
                transition: 'all 200ms ease',
                outline: 'none',
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} style={{ fontSize: '0.7rem', fontWeight: 600, color: '#667085' }}>{d}</div>
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
              const isHovered = hoveredDay === day && !disabled

              let bg = 'transparent'
              let fontColor = '#1C2A44'
              let border = '1px solid transparent'
              let shadow = 'none'
              let weight = 500

              if (isSelected) {
                bg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)'
                fontColor = '#FFFFFF'
                border = '1px solid #E6C36A'
                shadow = '0 2px 4px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                weight = 600
              } else if (disabled) {
                fontColor = '#667085'
              } else if (isHovered) {
                bg = '#F5F7FA'
                border = '1px solid #C89B3C'
              } else if (isToday) {
                border = '1px solid #E4E7EC'
                fontColor = '#C89B3C'
                weight = 600
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={disabled}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (!disabled) {
                      onChange(dateStr)
                      setOpen(false)
                    }
                  }}
                  style={{
                    padding: '6px 0',
                    borderRadius: '3px',
                    fontSize: '0.8rem',
                    fontWeight: weight,
                    color: fontColor,
                    background: bg,
                    border: border,
                    boxShadow: shadow,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.4 : 1,
                    transition: 'all 200ms ease',
                    outline: 'none',
                  }}
                >
                  {day}
                </button>
              )
            })}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E4E7EC' }}>
             <button 
               type="button" 
               onMouseEnter={() => setHoveredClear(true)}
               onMouseLeave={() => setHoveredClear(false)}
               onClick={(e) => { e.stopPropagation(); onChange(''); setOpen(false) }} 
               style={{ 
                 fontSize: '0.75rem', 
                 fontWeight: 600, 
                 color: hoveredClear ? '#1C2A44' : '#667085', 
                 background: 'transparent', 
                 border: 'none', 
                 cursor: 'pointer',
                 transition: 'color 200ms ease',
                 outline: 'none',
                 padding: '0 4px',
               }}
             >
               Clear
             </button>
             <button 
               type="button" 
               onMouseEnter={() => setHoveredToday(true)}
               onMouseLeave={() => setHoveredToday(false)}
               onClick={(e) => { e.stopPropagation(); onChange(new Date().toISOString().split('T')[0]); setOpen(false) }} 
               style={{ 
                 fontSize: '0.75rem', 
                 fontWeight: 600, 
                 color: hoveredToday ? '#E6C36A' : '#1C2A44', 
                 background: 'transparent', 
                 border: 'none', 
                 cursor: 'pointer',
                 transition: 'color 200ms ease',
                 outline: 'none',
                 padding: '0 4px',
               }}
             >
               Today
             </button>
          </div>
        </div>
      )}
    </div>
  )
}