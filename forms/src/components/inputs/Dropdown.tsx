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
  
  const [isHovered, setIsHovered] = useState(false)

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
      style={{
        ...panelStyle,
        background: '#FFFFFF',
        border: '1px solid #E4E7EC',
        borderRadius: '3px',
        boxShadow: '0 8px 24px rgba(15, 27, 46, 0.15), 0 2px 6px rgba(15, 27, 46, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'opacity 200ms ease, transform 200ms ease',
        transformOrigin: openUpward ? 'bottom' : 'top',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scaleY(1) translateY(0)' : 'scaleY(0.95)',
        pointerEvents: isOpen ? 'auto' : 'none',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {searchable && (
        <div style={{ padding: '8px', borderBottom: '1px solid #E4E7EC', background: '#F5F7FA' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#667085" style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              ref={inputRef}
              type="text"
              style={{
                width: '100%',
                padding: '6px 24px 6px 28px',
                fontSize: '0.8rem',
                fontWeight: 500,
                borderRadius: '3px',
                border: '1px solid #E4E7EC',
                background: '#FFFFFF',
                color: '#1C2A44',
                outline: 'none',
                transition: 'border-color 200ms ease, box-shadow 200ms ease',
                boxSizing: 'border-box'
              }}
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              onFocus={(e) => {
                 e.target.style.borderColor = '#C89B3C';
                 e.target.style.boxShadow = '0 0 0 2px rgba(200,155,60,0.1)';
              }}
              onBlur={(e) => {
                 e.target.style.borderColor = '#E4E7EC';
                 e.target.style.boxShadow = 'none';
              }}
              tabIndex={isOpen ? 0 : -1}
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                tabIndex={isOpen ? 0 : -1} 
                style={{ 
                  position: 'absolute', 
                  right: '8px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={14} color="#667085" />
              </button>
            )}
          </div>
        </div>
      )}

      <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '4px' }} ref={listRef}>
        {filtered.length === 0 ? (
          <div style={{ padding: '12px', textAlign: 'center', fontSize: '0.8rem', color: '#667085', fontWeight: 500 }}>No results</div>
        ) : (
          filtered.map((option, index) => {
            const isSelected = value === option;
            const isFocused = focusedIndex === index;
            
            return (
              <button
                key={option}
                type="button"
                tabIndex={isOpen ? 0 : -1}
                onClick={() => { onChange(option); setIsOpen(false); setSearch('') }}
                onMouseEnter={() => setFocusedIndex(index)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  fontWeight: isSelected ? 600 : 500,
                  borderRadius: '3px',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  transition: 'all 150ms ease',
                  background: isSelected ? 'rgba(200, 155, 60, 0.08)' : isFocused ? '#F5F7FA' : 'transparent',
                  color: isSelected ? '#C89B3C' : isFocused ? '#1C2A44' : '#667085',
                }}
              >
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{option}</span>
                {isSelected && <Check size={14} color="#C89B3C" style={{ flexShrink: 0, marginLeft: '8px' }} />}
              </button>
            )
          })
        )}
      </div>
    </div>
  )

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>
          {label}
        </label>
      )}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: variant === 'compact' ? '30px' : '34px',
          padding: '0 10px',
          background: isHovered && !isOpen ? '#FFFFFF' : '#F5F7FA',
          border: `1px solid ${isOpen ? '#C89B3C' : isHovered ? '#E6C36A' : '#E4E7EC'}`,
          borderRadius: '3px',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 250ms ease-in-out',
          boxShadow: isOpen ? '0 2px 8px rgba(15, 27, 46, 0.08)' : 'none',
        }}
      >
        <span style={{ 
          fontSize: '0.85rem', 
          fontWeight: 500, 
          color: value ? '#1C2A44' : '#667085',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={16} 
          color={isOpen || isHovered ? '#C89B3C' : '#667085'} 
          style={{ 
            transition: 'all 250ms ease-in-out',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }} 
        />
      </button>

      {/* Render the panel using a Portal so it doesn't get clipped by parents with overflow: hidden */}
      {typeof document !== 'undefined' && ReactDOM.createPortal(panelEl, document.body)}
    </div>
  )
}