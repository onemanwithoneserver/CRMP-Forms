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
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => {
          if (!open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            setPosition(spaceBelow < 350 && rect.top > spaceBelow ? 'top' : 'bottom')
          }
          setOpen(!open)
        }}
        className={`form-input h-[34px] flex items-center justify-between px-2 cursor-pointer bg-[var(--surface-lowest)] font-[600] border ${
          open ? 'border-[var(--accent-gold)]' : 'border-[var(--border)]'
        }`}
      >
        <span className={value ? 'text-[var(--text)]' : 'text-[var(--text-tertiary)]'}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar size={18} className="text-[var(--text-tertiary)]" />
      </div>

      {open && (
        <div 
          className={`absolute right-0 w-[280px] bg-white border border-[var(--border-light)] rounded-[6px] shadow-[var(--shadow-lg)] z-[100] p-[10px] ${
            position === 'bottom' ? 'top-full mt-2' : 'bottom-full mb-2'
          }`}
        >
          <div className="flex justify-between items-center mb-4">
            <button 
              type="button" 
              onClick={prevMonth} 
              className="bg-transparent border-none text-[1.2rem] text-[var(--text-secondary)] cursor-pointer p-1 flex items-center justify-center h-8 w-8 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-[700] text-[0.95rem] text-[var(--text)]">
              {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              type="button" 
              onClick={nextMonth} 
              className="bg-transparent border-none text-[1.2rem] text-[var(--text-secondary)] cursor-pointer p-1 flex items-center justify-center h-8 w-8 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-[0.75rem] font-[600] text-[var(--text-tertiary)]">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
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
                  className={`p-[8px_0] rounded-[6px] transition-all duration-200 text-[0.85rem] ${
                    disabled ? 'opacity-40 cursor-not-allowed text-[var(--text-tertiary)]' : 'cursor-pointer'
                  } ${
                    isSelected 
                      ? 'bg-[var(--accent)] text-white font-[700]' 
                      : isToday 
                        ? 'border border-[var(--accent)] text-[var(--accent)] font-[700]' 
                        : 'bg-transparent text-[var(--text)] font-[500]'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
          
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
             <button type="button" onClick={(e) => { e.stopPropagation(); onChange(''); setOpen(false) }} className="text-[0.8rem] font-[600] text-[var(--text-secondary)] bg-transparent border-none cursor-pointer">Clear</button>
             <button type="button" onClick={(e) => { e.stopPropagation(); onChange(new Date().toISOString().split('T')[0]); setOpen(false) }} className="text-[0.8rem] font-[600] text-[var(--accent)] bg-transparent border-none cursor-pointer">Today</button>
          </div>
        </div>
      )}
    </div>
  )
}
