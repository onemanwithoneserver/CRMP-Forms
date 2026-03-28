import React, { useState } from 'react'

type Option = { label: string; value: string }

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  compact?: boolean
}

// Internal component to handle precise, independent hover states for each segment
function Segment({
  option,
  isSelected,
  onClick,
  compact
}: {
  option: Option
  isSelected: boolean
  onClick: () => void
  compact: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  let bg = 'transparent'
  let textColor = '#667085' // Text Gray
  let shadow = 'none'
  let fontWeight = 500
  let border = '1px solid transparent'

  if (isSelected) {
    bg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)' // Navy to Dark Navy
    textColor = '#FFFFFF'
    shadow = '0 2px 6px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
    fontWeight = 600
    border = '1px solid #C89B3C' // CREMP Gold outline
  } else if (isHovered) {
    bg = '#FFFFFF'
    textColor = '#1C2A44' // Navy text on hover
    shadow = '0 1px 4px rgba(15, 27, 46, 0.08)' // Subtle pop-out effect
    border = '1px solid #E4E7EC' // Border Gray
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: compact ? 'none' : 1,
        minWidth: compact ? '60px' : 'auto',
        padding: compact ? '4px 16px' : '4px 8px',
        borderRadius: '3px', // Sharp inner radius
        cursor: 'pointer',
        transition: 'all 250ms ease-in-out',
        whiteSpace: 'nowrap',
        fontSize: '0.8rem',
        fontWeight: fontWeight,
        color: textColor,
        background: bg,
        border: border,
        boxShadow: shadow,
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {option.label}
    </button>
  )
}

export default function SegmentedControl({ options, value, onChange, compact = false }: Props) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#F5F7FA', // Light Gray recessed track
        border: '1px solid #E4E7EC', // Border Gray
        padding: '2px', // Tight padding against the buttons
        gap: '2px',
        borderRadius: '4px', // 4px outer complements the 3px inner buttons perfectly
        boxSizing: 'border-box',
        minHeight: '34px',
        width: compact ? 'fit-content' : '100%',
        fontFamily: "'Outfit', sans-serif",
        boxShadow: 'inset 0 1px 3px rgba(15, 27, 46, 0.04)', // Subtle inner depth
      }}
    >
      {options.map(opt => (
        <Segment
          key={opt.value}
          option={opt}
          isSelected={value === opt.value}
          onClick={() => onChange(opt.value)}
          compact={compact}
        />
      ))}
    </div>
  )
}