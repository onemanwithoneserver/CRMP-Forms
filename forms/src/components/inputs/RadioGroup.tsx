import React, { useState } from 'react'

type Option = { value: string; label: string }

type Props = {
  label?: string
  options: readonly Option[] | Option[]
  value: string
  onChange: (value: string) => void
  error?: string | null
}

function RadioOption({
  option,
  selected,
  onClick
}: {
  option: Option
  selected: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  let bg = '#F5F7FA'
  let border = '1px solid #E4E7EC'
  let textColor = '#667085'
  let shadow = 'none'
  let fontWeight = 500

  if (selected) {
    bg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)'
    border = '1px solid #E6C36A'
    textColor = '#FFFFFF'
    shadow = '0 2px 6px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    fontWeight = 600
  } else if (isHovered) {
    bg = '#FFFFFF'
    border = '1px solid #C89B3C'
    textColor = '#1C2A44'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08)'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        padding: '6px 10px',
        borderRadius: '3px',
        background: bg,
        border: border,
        boxShadow: shadow,
        cursor: 'pointer',
        transition: 'all 250ms ease-in-out',
        outline: 'none',
        textAlign: 'left',
      }}
      aria-pressed={selected}
    >
      <div
        style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 250ms ease-in-out',
          background: selected ? '#C89B3C' : isHovered ? '#F5F7FA' : '#FFFFFF',
          border: selected ? '1px solid transparent' : `1px solid ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
        }}
      >
        {selected && (
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.6)'
            }}
          />
        )}
      </div>
      <span
        style={{
          fontSize: '0.85rem',
          fontWeight: fontWeight,
          color: textColor,
          flex: 1,
          transition: 'color 250ms ease-in-out',
        }}
      >
        {option.label}
      </span>
    </button>
  )
}

export default function RadioGroup({ label, options, value, onChange, error }: Props) {
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", width: '100%' }}>
      {label && (
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44', marginBottom: '6px' }}>
          {label}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {options.map(option => (
          <RadioOption
            key={option.value}
            option={option}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
      {error && (
        <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '4px', fontWeight: 500 }}>
          {error}
        </div>
      )}
    </div>
  )
}