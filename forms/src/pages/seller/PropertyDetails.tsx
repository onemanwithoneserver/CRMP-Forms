import React, { useState } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import { Search, Building2, Plus, Building } from 'lucide-react'

function SelectionCard({
  title,
  icon: Icon,
  selected,
  onClick,
  isAdd = false
}: {
  title: string
  icon: React.ElementType
  selected: boolean
  onClick: () => void
  isAdd?: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  let bg = '#F5F7FA'
  let border = '1px solid #E4E7EC'
  let textColor = '#1C2A44'
  let iconColor = '#667085'
  let shadow = 'none'

  if (selected) {
    bg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)'
    border = '1px solid #C89B3C'
    textColor = '#FFFFFF'
    iconColor = '#E6C36A'
    shadow = '0 4px 12px rgba(15, 27, 46, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  } else if (isHovered) {
    bg = '#FFFFFF'
    border = '1px solid #E6C36A'
    iconColor = '#C89B3C'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.05)'
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
        gap: '16px',
        padding: '16px 20px',
        width: '100%',
        borderRadius: '4px',
        background: bg,
        border: border,
        boxShadow: shadow,
        cursor: 'pointer',
        transition: 'all 250ms ease',
        outline: 'none',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: selected ? '#C89B3C' : '#FFFFFF',
          border: selected ? '1px solid transparent' : `1px solid ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
          transition: 'all 200ms ease',
          boxShadow: selected ? '0 2px 4px rgba(200, 155, 60, 0.3)' : 'inset 0 1px 2px rgba(15,27,46,0.05)'
        }}
      >
        {selected && (
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
            }}
          />
        )}
      </div>

      <span
        style={{
          flex: 1,
          textAlign: 'left',
          fontSize: '0.95rem',
          fontWeight: 700,
          color: textColor,
          letterSpacing: '-0.01em',
          transition: 'color 200ms ease'
        }}
      >
        {title}
      </span>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', color: iconColor, transition: 'color 200ms ease' }}>
        <Icon size={24} strokeWidth={1.5} />
        {isAdd && (
          <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: selected ? '#C89B3C' : isHovered ? '#C89B3C' : '#E4E7EC', color: '#FFFFFF', borderRadius: '50%', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 200ms ease' }}>
            <Plus size={10} strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  )
}

export default function PropertyDetails() {
  const { state, dispatch, next, back } = useForm()
  const { buildingSelection, buildingName } = state.formData

  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Is this property in an existing building?"
      onBack={back}
      onNext={next}
      icon={<Building size={20} color="#E6C36A" />}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: "'Outfit', sans-serif" }}>
        
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type="text"
            placeholder="Search Building Name"
            value={buildingName}
            onChange={(e) => onUpdate({ buildingName: e.target.value })}
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            style={{
              width: '100%',
              height: '44px',
              padding: '0 44px 0 16px',
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#1C2A44',
              background: isSearchFocused ? '#FFFFFF' : isSearchHovered ? '#FFFFFF' : '#F5F7FA',
              border: `1px solid ${isSearchFocused ? '#C89B3C' : isSearchHovered ? '#E6C36A' : '#E4E7EC'}`,
              borderRadius: '4px',
              outline: 'none',
              transition: 'all 250ms ease-in-out',
              boxShadow: isSearchFocused ? '0 4px 12px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)' : isSearchHovered ? '0 2px 8px rgba(15, 27, 46, 0.05)' : 'inset 0 1px 3px rgba(15, 27, 46, 0.03)',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: isSearchFocused ? '#C89B3C' : '#667085', pointerEvents: 'none', transition: 'color 250ms ease', display: 'flex' }}>
            <Search size={18} strokeWidth={2} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <SelectionCard
            title="Select from Existing"
            icon={Building2}
            selected={buildingSelection === 'existing'}
            onClick={() => onUpdate({ buildingSelection: 'existing' })}
          />

          <SelectionCard
            title="Add New Building"
            icon={Building2}
            isAdd={true}
            selected={buildingSelection === 'new'}
            onClick={() => onUpdate({ buildingSelection: 'new' })}
          />
        </div>

        {state.errors.buildingSelection && (
          <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', color: '#EF4444', fontSize: '0.8rem', fontWeight: 500 }}>
            {state.errors.buildingSelection}
          </div>
        )}

      </div>
    </FormPage>
  )
}