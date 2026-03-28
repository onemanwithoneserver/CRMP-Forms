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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '8px 10px',
        borderRadius: '3px',
        fontSize: '0.85rem',
        fontWeight: isSelected ? 600 : 500,
        color: isSelected ? '#C89B3C' : isHovered ? '#1C2A44' : '#667085',
        background: isSelected ? 'rgba(200, 155, 60, 0.08)' : isHovered ? '#F5F7FA' : 'transparent',
        cursor: 'pointer',
        transition: 'all 150ms ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {option.label}
      </span>
      {isSelected && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C89B3C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginLeft: '8px' }}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  )
}

export default function SelectField({ label, value, onChange, options, placeholder, error, className }: Props) {
  const [open, setOpen] = useState(false)
  const [openUpward, setOpenUpward] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
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

  const borderColor = error ? '#EF4444' : open ? '#C89B3C' : isHovered ? '#E6C36A' : '#E4E7EC'

  return (
    <div 
      className={className} 
      ref={containerRef} 
      style={{ position: 'relative', width: '100%', fontFamily: "'Outfit', sans-serif" }}
    >
      {label && (
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44', marginBottom: '4px' }}>
          {label}
        </div>
      )}

      <div
        ref={triggerRef}
        onClick={handleToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 10px',
          background: isHovered && !open ? '#FFFFFF' : '#F5F7FA',
          border: `1px solid ${borderColor}`,
          borderRadius: '3px',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'all 250ms ease-in-out',
          boxShadow: open ? '0 2px 8px rgba(15, 27, 46, 0.08)' : 'none',
        }}
      >
        <span style={{ 
          fontSize: '0.85rem', 
          fontWeight: selectedOption ? 600 : 500, 
          color: selectedOption ? '#1C2A44' : '#667085',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          transition: 'color 250ms ease-in-out'
        }}>
          {selectedOption ? selectedOption.label : (placeholder || 'Select...')}
        </span>
        <svg 
          width="12" height="7" viewBox="0 0 12 7" 
          style={{
            flexShrink: 0,
            marginLeft: '8px',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 250ms ease-in-out'
          }}
        >
          <path 
            d="M1 1l5 5 5-5" 
            stroke={open || isHovered ? '#C89B3C' : '#667085'} 
            strokeWidth="1.5" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ transition: 'stroke 250ms ease-in-out' }}
          />
        </svg>
      </div>

      {open && (
        <div 
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 50,
            background: '#FFFFFF',
            border: '1px solid #E4E7EC',
            borderRadius: '3px',
            boxShadow: '0 8px 24px rgba(15, 27, 46, 0.15), 0 2px 6px rgba(15, 27, 46, 0.08)',
            padding: '4px',
            marginTop: openUpward ? '0' : '4px',
            marginBottom: openUpward ? '4px' : '0',
            bottom: openUpward ? '100%' : 'auto',
            top: openUpward ? 'auto' : '100%',
            maxHeight: '220px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
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
        <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </div>
  )
}