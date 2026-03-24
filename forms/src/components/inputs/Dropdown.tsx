import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronDown, Search, Check, X } from 'lucide-react'

export interface DropdownProps {
  label?: string
  value: string
  options: string[]
  placeholder?: string
  searchable?: boolean
  onChange: (val: string) => void
  variant?: 'default' | 'compact'
}

export function Dropdown({ 
  label, 
  value, 
  options, 
  placeholder = 'Select...', 
  searchable = false, 
  onChange,
  variant = 'default'
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const [openUpward, setOpenUpward] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // Compute upward direction whenever the dropdown opens
  const computeDirection = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      setOpenUpward(spaceBelow < 220)
    }
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const filtered = searchable && search
    ? options.filter(o => o.toLowerCase().includes(search.toLowerCase()))
    : options

  useEffect(() => {
    if (isOpen) {
      computeDirection()
      setFocusedIndex(-1)
      if (searchable) {
        setTimeout(() => inputRef.current?.focus(), 50)
      }
    } else {
      setTimeout(() => setSearch(''), 200)
    }
  }, [isOpen, searchable, computeDirection])

  useEffect(() => {
    setFocusedIndex(0)
  }, [search])

  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[focusedIndex] as HTMLElement;
      if (activeEl) {
        const unscrollable = activeEl.offsetTop + activeEl.clientHeight > listRef.current.scrollTop + listRef.current.clientHeight;
        const above = activeEl.offsetTop < listRef.current.scrollTop;
        if (unscrollable) {
          listRef.current.scrollTop = activeEl.offsetTop + activeEl.clientHeight - listRef.current.clientHeight;
        } else if (above) {
          listRef.current.scrollTop = activeEl.offsetTop;
        }
      }
    }
  }, [focusedIndex])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        computeDirection()
        setIsOpen(true)
      }
      return
    }

    if (e.key === 'Escape') {
      setIsOpen(false)
      return
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex(prev => (prev < filtered.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (focusedIndex >= 0 && focusedIndex < filtered.length) {
        onChange(filtered[focusedIndex])
        setIsOpen(false)
      }
    }
  }

  // Dynamic border-radius for trigger button
  const triggerRadius = isOpen
    ? openUpward
      ? 'rounded-b-[6px] rounded-t-none'
      : 'rounded-t-[6px] rounded-b-none'
    : 'rounded-[6px]'

  // Dynamic panel positioning & border-radius
  const panelPositionClass = openUpward ? 'bottom-[100%]' : 'top-[100%]'
  const panelRadiusClass = openUpward
    ? 'rounded-t-[6px] rounded-b-none border-b-0 border-t border-x'
    : 'rounded-b-[6px] rounded-t-none border-t-0 border-b border-x'

  return (
    <div className="relative flex flex-col gap-1 w-full" ref={ref} onKeyDown={handleKeyDown}>
      {variant !== 'compact' && label && (
        <label className="text-xs font-semibold text-[#445069] pl-0.5 font-['Outfit']">
          {label}
        </label>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => { computeDirection(); setIsOpen(!isOpen); setSearch('') }}
        className={`
          w-full flex items-center justify-between gap-1.5 px-2.5 border text-left text-[13px] font-['Outfit'] transition-all duration-300 cursor-pointer
          ${variant === 'compact' ? 'h-[34px] py-1' : 'h-[34px] py-1.5'}
          ${triggerRadius}
          ${isOpen
            ? 'border-[#C89B3C] bg-white outline-none shadow-[0_0_0_3px_rgba(200,155,60,0.15)] relative z-10'
            : 'border-[var(--border)] bg-[rgba(255,255,255,0.7)] text-[#1C2A44] hover:border-[#C89B3C]/60 hover:bg-white shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]'
          }
        `}
      >
        <span className={value ? 'text-[#1C2A44] font-semibold truncate' : 'text-[#667085] font-medium truncate'}>
          {value || placeholder}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-[#C89B3C]' : 'text-[#667085]'}`} />
      </button>

      <div
        className={`
          absolute z-50 w-full ${panelPositionClass} bg-white ${panelRadiusClass} border-[#C89B3C] shadow-[0_8px_24px_-4px_rgba(200,155,60,0.15)] flex flex-col overflow-hidden
          transition-all duration-200
          ${openUpward ? 'origin-bottom' : 'origin-top'}
          ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 pointer-events-none'}
        `}
      >
        {searchable && (
          <div className="p-2 border-b border-[#e2e6ec] bg-[#f8f9fb]">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#a0a8b5]" />
              <input
                ref={inputRef}
                type="text"
                className="w-full pl-7 pr-2 py-1.5 text-[12px] rounded-[5px] border border-[#d0d4dc] bg-white font-['Outfit'] font-medium placeholder-[#a0a8b5] text-[#1C2A44] focus:outline-none focus:border-[#C89B3C] focus:shadow-[0_0_0_2px_rgba(200,155,60,0.1)] transition-all duration-200"
                placeholder={`Search...`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                tabIndex={isOpen ? 0 : -1}
              />
              {search && (
                <button onClick={() => setSearch('')} tabIndex={isOpen ? 0 : -1} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a0a8b5] hover:text-[#4a5568]">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="max-h-52 overflow-y-auto custom-scrollbar py-1" ref={listRef}>
          {filtered.length === 0 ? (
            <div className="px-3 py-4 text-center text-[12.5px] text-[#667085] font-semibold font-['Outfit']">No results</div>
          ) : (
            filtered.map((option, index) => (
              <button
                key={option}
                type="button"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => { onChange(option); setIsOpen(false); setSearch('') }}
                onMouseEnter={() => setFocusedIndex(index)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-left text-[13px] font-['Outfit'] transition-colors duration-150 cursor-pointer block
                  ${value === option
                    ? 'bg-[#FFFBF0] text-[#C89B3C] font-bold border-l-2 border-[#C89B3C]'
                    : focusedIndex === index
                      ? 'bg-[#f8f9fb] text-[#1C2A44] font-semibold border-l-2 border-transparent'
                      : 'text-[#4a5568] font-semibold hover:bg-[#f8f9fb] hover:text-[#1C2A44] border-l-2 border-transparent'
                  }
                `}
              >
                <span className="truncate">{option}</span>
                {value === option && <Check size={14} className="text-[#C89B3C] shrink-0 ml-2 drop-shadow-sm" />}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
