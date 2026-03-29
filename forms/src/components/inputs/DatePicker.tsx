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

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && value) setViewDate(new Date(value))
  }, [open, value])

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
    <div ref={containerRef} className="relative w-full font-['Outfit',sans-serif]">
      <div
        onClick={() => {
          if (!open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            setPosition(spaceBelow < 350 && rect.top > spaceBelow ? 'top' : 'bottom')
          }
          setOpen(!open)
        }}
        className={`
          group h-[34px] flex items-center justify-between px-[10px] cursor-pointer rounded-[3px] transition-all duration-250 ease-in-out border outline-none
          ${open 
            ? 'bg-white border-[#C89B3C] shadow-[0_2px_8px_rgba(15,27,46,0.08)]' 
            : 'bg-[#F5F7FA] border-[#E4E7EC] hover:bg-white hover:border-[#E6C36A]'
          }
        `}
      >
        <span className={`text-[0.85rem] font-medium transition-colors duration-250 ease-in-out ${value ? 'text-[#1C2A44]' : 'text-[#667085]'}`}>
          {value ? formatDate(value) : placeholder}
        </span>
        <Calendar 
          size={16} 
          className={`transition-colors duration-250 ease-in-out ${open ? 'text-[#C89B3C]' : 'text-[#667085] group-hover:text-[#C89B3C]'}`} 
        />
      </div>

      {open && (
        <div 
          className={`
            absolute right-0 w-[260px] bg-white border border-[#E4E7EC] rounded-[5px] shadow-[0_8px_24px_rgba(15,27,46,0.15),0_2px_6px_rgba(15,27,46,0.08)] z-[100] p-3
            ${position === 'bottom' ? 'mt-1.5 top-full' : 'mb-1.5 bottom-full'}
          `}
        >
          <div className="flex justify-between items-center mb-3">
            <button 
              type="button" 
              onClick={prevMonth}
              className="flex items-center justify-center h-[26px] w-[26px] rounded-[3px] bg-transparent border-none text-[#667085] cursor-pointer transition-all duration-200 ease outline-none hover:bg-[#F5F7FA] hover:text-[#1C2A44]"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-semibold text-[0.9rem] text-[#1C2A44]">
              {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button 
              type="button" 
              onClick={nextMonth}
              className="flex items-center justify-center h-[26px] w-[26px] rounded-[3px] bg-transparent border-none text-[#667085] cursor-pointer transition-all duration-200 ease outline-none hover:bg-[#F5F7FA] hover:text-[#1C2A44]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-[0.7rem] font-semibold text-[#667085]">{d}</div>
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

              let btnClasses = "py-1.5 rounded-[3px] text-[0.8rem] transition-all duration-200 ease outline-none border "
              
              if (isSelected) {
                btnClasses += "bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] text-white border-[#E6C36A] shadow-[0_2px_4px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)] font-semibold"
              } else if (disabled) {
                btnClasses += "opacity-40 cursor-not-allowed text-[#667085] border-transparent bg-transparent"
              } else {
                btnClasses += "cursor-pointer hover:bg-[#F5F7FA] hover:border-[#C89B3C] "
                if (isToday) {
                  btnClasses += "border-[#E4E7EC] text-[#C89B3C] font-semibold"
                } else {
                  btnClasses += "bg-transparent text-[#1C2A44] font-medium border-transparent"
                }
              }

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
                  className={btnClasses}
                >
                  {day}
                </button>
              )
            })}
          </div>
          
          <div className="flex justify-between mt-3 pt-2.5 border-t border-[#E4E7EC]">
             <button 
               type="button" 
               onClick={(e) => { e.stopPropagation(); onChange(''); setOpen(false) }} 
               className="text-[0.75rem] font-semibold text-[#667085] bg-transparent border-none cursor-pointer transition-colors duration-200 ease outline-none px-1 hover:text-[#1C2A44]"
             >
               Clear
             </button>
             <button 
               type="button" 
               onClick={(e) => { e.stopPropagation(); onChange(new Date().toISOString().split('T')[0]); setOpen(false) }} 
               className="text-[0.75rem] font-semibold text-[#1C2A44] bg-transparent border-none cursor-pointer transition-colors duration-200 ease outline-none px-1 hover:text-[#E6C36A]"
             >
               Today
             </button>
          </div>
        </div>
      )}
    </div>
  )
}