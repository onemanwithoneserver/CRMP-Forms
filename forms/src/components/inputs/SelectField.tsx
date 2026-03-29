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

function SelectOption({
  option,
  isSelected,
  onClick
}: {
  option: Option
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center justify-between px-2.5 py-2 rounded-[3px] text-[0.85rem] cursor-pointer transition-all duration-150 ease
        ${isSelected 
          ? 'font-semibold text-[#C89B3C] bg-[rgba(200,155,60,0.08)]' 
          : 'font-medium text-[#667085] bg-transparent hover:bg-[#F5F7FA] hover:text-[#1C2A44]'
        }
      `}
    >
      <span className="whitespace-nowrap overflow-hidden text-ellipsis">
        {option.label}
      </span>
      {isSelected && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 ml-2">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  )
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
    <div 
      className={`relative w-full font-['Outfit',sans-serif] ${className || ''}`} 
      ref={containerRef} 
    >
      {label && (
        <div className="text-[0.8rem] font-semibold text-[#1C2A44] mb-1">
          {label}
        </div>
      )}

      <div
        ref={triggerRef}
        onClick={handleToggle}
        className={`
          group h-[34px] flex items-center justify-between px-[10px] rounded-[3px] cursor-pointer select-none transition-all duration-250 ease-in-out border
          ${error 
            ? 'border-[#EF4444]' 
            : open 
              ? 'border-[#C89B3C] shadow-[0_2px_8px_rgba(15,27,46,0.08)] bg-[#F5F7FA]' 
              : 'border-[#E4E7EC] bg-[#F5F7FA] hover:bg-white hover:border-[#E6C36A]'
          }
        `}
      >
        <span className={`
          text-[0.85rem] whitespace-nowrap overflow-hidden text-ellipsis transition-colors duration-250 ease-in-out
          ${selectedOption ? 'font-semibold text-[#1C2A44]' : 'font-medium text-[#667085]'}
        `}>
          {selectedOption ? selectedOption.label : (placeholder || 'Select...')}
        </span>
        
        {/* SVG Arrow */}
        <svg 
          width="12" height="7" viewBox="0 0 12 7" 
          className={`shrink-0 ml-2 transition-transform duration-250 ease-in-out ${open ? 'rotate-180' : 'rotate-0'}`}
        >
          <path 
            d="M1 1l5 5 5-5" 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-colors duration-250 ease-in-out ${open ? 'stroke-[#C89B3C]' : 'stroke-[#667085] group-hover:stroke-[#C89B3C]'}`}
          />
        </svg>
      </div>

      {open && (
        <div 
          className={`
            absolute left-0 right-0 z-50 bg-white border border-[#E4E7EC] rounded-[3px] shadow-[0_8px_24px_rgba(15,27,46,0.15),0_2px_6px_rgba(15,27,46,0.08)] p-1 flex flex-col gap-0.5 max-h-[220px] overflow-y-auto
            ${openUpward ? 'mb-1 bottom-full auto-top' : 'mt-1 top-full auto-bottom'}
          `}
        >
          {options.map(o => (
            <SelectOption
              key={o.value}
              option={o}
              isSelected={o.value === value}
              onClick={() => {
                if (onChange) onChange(o.value)
                setOpen(false)
              }}
            />
          ))}
        </div>
      )}

      {error && (
        <div className="text-[0.75rem] text-[#EF4444] mt-1 font-medium">
          {error}
        </div>
      )}
    </div>
  )
}