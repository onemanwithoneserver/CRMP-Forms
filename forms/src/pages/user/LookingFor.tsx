import React, { useState } from 'react'
import { useForm, USER_PROPERTY_TYPES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import { Search } from 'lucide-react'

import iconOffice from '../../assets/Select Property Type/Office Space.svg'
import iconRetail from '../../assets/Select Property Type/Rental  Commercial Space.svg'
import iconHostel from '../../assets/Select Property Type/Hostel.svg'
import iconLand from '../../assets/Select Property Type/Land.svg'
import iconCoworking from '../../assets/Select Property Type/Co-Working.svg'
import iconWarehouse from '../../assets/Select Property Type/Warehouse.svg'

const icons: Record<string, string> = {
  office: iconOffice,
  retail: iconRetail,
  hostel: iconHostel,
  land: iconLand,
  coworking: iconCoworking,
  warehouse: iconWarehouse,
}

function SelectionCard({
  label,
  iconSrc,
  selected,
  onClick
}: {
  label: string
  iconSrc: string
  selected: boolean
  onClick: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  let bg = '#F5F7FA'
  let border = '1px solid #E4E7EC'
  let textColor = '#1C2A44'
  let shadow = 'none'

  if (selected) {
    bg = 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)'
    border = '1px solid #C89B3C'
    textColor = '#FFFFFF'
    shadow = '0 4px 12px rgba(15, 27, 46, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
  } else if (isHovered) {
    bg = '#FFFFFF'
    border = '1px solid #E6C36A'
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
        padding: '12px 16px',
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
        {label}
      </span>

      {iconSrc && (
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            width: '28px', 
            height: '28px',
            background: selected ? 'rgba(255,255,255,0.1)' : '#FFFFFF',
            borderRadius: '3px',
            padding: '4px',
            boxShadow: selected ? 'none' : '0 1px 3px rgba(0,0,0,0.05)',
            border: selected ? '1px solid rgba(255,255,255,0.2)' : '1px solid #E4E7EC'
          }}
        >
          <img 
            src={iconSrc} 
            alt="" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: selected ? 'brightness(0) invert(1)' : 'none',
              opacity: selected ? 1 : 0.8
            }} 
          />
        </div>
      )}
    </button>
  )
}

export default function LookingFor() {
  const { state, dispatch, next, back } = useForm()
  const selected = state.formData.lookingFor

  const toggle = (value: string) => {
    dispatch({ type: 'updateData', payload: { lookingFor: [value] } })
  }

  return (
    <FormPage
      title="I'm Looking For"
      subtitle="Select the property type you're interested in"
      onBack={back}
      onNext={next}
      backDisabled={true}
      icon={<Search size={20} color="#E6C36A" />}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: "'Outfit', sans-serif" }}>
        {USER_PROPERTY_TYPES.map(option => {
          const isSelected = selected.includes(option.value)
          const iconSrc = icons[(option as any).icon]
          
          return (
            <SelectionCard
              key={option.value}
              label={option.label}
              iconSrc={iconSrc}
              selected={isSelected}
              onClick={() => toggle(option.value)}
            />
          )
        })}

        {state.errors.lookingFor && (
          <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '4px', color: '#EF4444', fontSize: '0.8rem', fontWeight: 500, marginTop: '8px' }}>
            {state.errors.lookingFor}
          </div>
        )}
      </div>
    </FormPage>
  )
}