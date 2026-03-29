import React, { useState, useRef, useEffect, useCallback } from 'react'
import ReactDOM from 'react-dom'
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
  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({})

  const ref = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const computeDirection = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const goUp = spaceBelow < 220
      setOpenUpward(goUp)
      
      const panelSpacing = 4 // Sharp 4px gap instead of attaching directly
      
      setPanelStyle({
        position: 'fixed',
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        ...(goUp
          ? { bottom: window.innerHeight - rect.top + panelSpacing }
          : { top: rect.bottom + panelSpacing }),
      })
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

  const panelEl = (
    <div
      style={panelStyle}
      className={`
        bg-white border border-[#E4E7EC] rounded-[3px] shadow-[0_8px_24px_rgba(15,27,46,0.15),0_2px_6px_rgba(15,27,46,0.08)] 
        flex flex-col overflow-hidden font-['Outfit',sans-serif] transition-all duration-200 ease
        ${openUpward ? 'origin-bottom' : 'origin-top'}
        ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
      `}
    >
      {searchable && (
        <div className="p-2 border-b border-[#E4E7EC] bg-[#F5F7FA]">
          <div className="relative">
            <Search size={14} color="#667085" className="absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              tabIndex={isOpen ? 0 : -1}
              className="w-full py-1.5 pl-7 pr-6 text-[0.8rem] font-medium rounded-[3px] border border-[#E4E7EC] bg-white text-[#1C2A44] outline-none transition-all duration-200 ease box-border focus:border-[#C89B3C] focus:shadow-[0_0_0_2px_rgba(200,155,60,0.1)]"
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                tabIndex={isOpen ? 0 : -1} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer p-0 flex items-center outline-none"
              >
                <X size={14} color="#667085" />
              </button>
            )}
          </div>
        </div>
      )}

      <div className="max-h-[200px] overflow-y-auto p-1" ref={listRef}>
        {filtered.length === 0 ? (
          <div className="p-3 text-center text-[0.8rem] text-[#667085] font-medium">No results</div>
        ) : (
          filtered.map((option, index) => {
            const isSelected = value === option;
            const isFocused = focusedIndex === index;
            
            let btnClass = "w-full flex items-center justify-between py-2 px-2.5 text-left text-[0.85rem] rounded-[3px] cursor-pointer border-none outline-none transition-all duration-150 ease "
            if (isSelected) {
              btnClass += "bg-[#C89B3C]/10 text-[#C89B3C] font-semibold"
            } else if (isFocused) {
              btnClass += "bg-[#F5F7FA] text-[#1C2A44] font-medium"
            } else {
              btnClass += "bg-transparent text-[#667085] font-medium"
            }

            return (
              <button
                key={option}
                type="button"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => { onChange(option); setIsOpen(false); setSearch('') }}
                onMouseEnter={() => setFocusedIndex(index)}
                className={btnClass}
              >
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">{option}</span>
                {isSelected && <Check size={14} color="#C89B3C" className="shrink-0 ml-2" />}
              </button>
            )
          })
        )}
      </div>
    </div>
  )

  return (
    <div ref={ref} className="relative w-full font-['Outfit',sans-serif]">
      {label && (
        <label className="block mb-1 text-[0.8rem] font-semibold text-[#1C2A44]">
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className={`
          group w-full flex items-center justify-between px-[10px] rounded-[3px] cursor-pointer outline-none transition-all duration-250 ease-in-out border
          ${variant === 'compact' ? 'h-[30px]' : 'h-[34px]'}
          ${isOpen 
            ? 'bg-[#F5F7FA] border-[#C89B3C] shadow-[0_2px_8px_rgba(15,27,46,0.08)]' 
            : 'bg-[#F5F7FA] border-[#E4E7EC] hover:bg-white hover:border-[#E6C36A]'
          }
        `}
      >
        <span className={`text-[0.85rem] font-medium whitespace-nowrap overflow-hidden text-ellipsis ${value ? 'text-[#1C2A44]' : 'text-[#667085]'}`}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={16} 
          className={`transition-all duration-250 ease-in-out ${isOpen ? 'text-[#C89B3C] rotate-180' : 'text-[#667085] group-hover:text-[#C89B3C] rotate-0'}`} 
        />
      </button>

      {/* Render the panel using a Portal so it doesn't get clipped by parents with overflow: hidden */}
      {typeof document !== 'undefined' && ReactDOM.createPortal(panelEl, document.body)}
    </div>
  )
}