import React, { useState, useRef, useEffect } from 'react'

type Option = { value: string; label: string }

type Props = {
  label?: string
  value?: string
  onChange?: (v: string) => void
  options: Option[]
  placeholder?: string
  error?: string | null
  className?: string
}

export default function SelectField({ label, value, onChange, options, placeholder, error, className }: Props) {
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
    <div className={`block relative${className ? ` ${className}` : ''}`} ref={containerRef}>
      {label && (
        <div className="text-[0.78rem] font-[600] text-[var(--text)] mb-[3px]">
          {label}
        </div>
      )}

      <div
        ref={triggerRef}
        className={`form-input ${error ? 'error' : ''} flex items-center justify-between cursor-pointer select-none h-[34px] ${
          open ? 'border-[var(--accent-gold)] shadow-[0_0_0_3px_rgba(200,155,60,0.15)]' : ''
        } ${
          open 
            ? openUpward ? 'rounded-b-[6px] rounded-t-0' : 'rounded-t-[6px] rounded-b-0'
            : 'rounded-[6px]'
        }`}
        onClick={handleToggle}
      >
        <span className={`text-[13px] ${selectedOption ? 'text-[var(--text)] font-[600]' : 'text-[var(--text-tertiary)] font-[400]'} overflow-hidden text-ellipsis whitespace-nowrap`}>
          {selectedOption ? selectedOption.label : (placeholder || 'Select...')}
        </span>
        <svg 
          width="12" height="7" viewBox="0 0 12 7" 
          className={`transition-transform duration-200 ease-in-out shrink-0 ml-[6px] ${open ? 'rotate-180' : 'rotate-0'}`}
        >
          <path d="M1 1l5 5 5-5" stroke="#667085" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {open && (
        <div 
          className={`absolute left-0 right-0 bg-white border border-[var(--accent-gold)] shadow-[0_8px_24px_-4px_rgba(200,155,60,0.15)] z-[50] overflow-hidden p-[2px] ${
            openUpward ? 'bottom-full rounded-t-[6px] border-b-0' : 'top-full rounded-b-[6px] border-t-0'
          }`}
        >
          {options.map(o => {
            const isSel = o.value === value
            return (
              <div
                key={o.value}
                onClick={() => { onChange?.(o.value); setOpen(false); }}
                className={`p-[8px_12px] rounded-[4px] text-[0.82rem] cursor-pointer transition-all duration-150 ease-in-out border-l-2 ${
                  isSel 
                    ? 'font-[700] bg-[var(--accent-gold-subtle)] text-[var(--accent-gold)] border-[var(--accent-gold)]' 
                    : 'font-[500] bg-transparent text-[var(--text)] border-transparent'
                }`}
              >
                {o.label}
              </div>
            )
          })}
        </div>
      )}

      {error && (
        <div className="text-[0.75rem] text-[#ef4444] mt-[2px] font-[500]">
          {error}
        </div>
      )}
    </div>
  )
}
