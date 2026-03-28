import React, { useState } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import { Dropdown } from '../../components/inputs/Dropdown'

function NumericField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  let borderColor = '#E4E7EC'
  let background = '#F5F7FA'
  let shadow = 'none'

  if (isFocused) {
    borderColor = '#C89B3C'
    background = '#FFFFFF'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)'
  } else if (isHovered) {
    borderColor = '#E6C36A'
    background = '#FFFFFF'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
      <div style={{ position: 'relative', width: '100%' }}>
        {prefix && (
          <span 
            style={{ 
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', 
              color: isFocused ? '#C89B3C' : '#667085', fontSize: '0.85rem', fontWeight: 600, 
              pointerEvents: 'none', zIndex: 10, transition: 'color 250ms ease'
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            height: '34px',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: prefix ? '24px' : '10px',
            paddingRight: suffix ? '28px' : '10px',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#1C2A44',
            background: background,
            border: `1px solid ${borderColor}`,
            borderRadius: '3px',
            outline: 'none',
            transition: 'all 250ms ease-in-out',
            boxShadow: shadow,
            boxSizing: 'border-box',
          }}
        />
        {suffix && (
          <span 
            style={{ 
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
              color: isFocused ? '#C89B3C' : '#667085', fontSize: '0.8rem', fontWeight: 600, 
              pointerEvents: 'none', zIndex: 10, transition: 'color 250ms ease'
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export default function BusinessInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage title="Business Information" onBack={back} onNext={next}>
      <div 
        style={{ 
          maxWidth: '896px', 
          margin: '0 auto', 
          padding: '24px', 
          background: '#FFFFFF', 
          borderRadius: '4px', 
          border: '1px solid #E4E7EC', 
          boxShadow: '0 8px 32px rgba(15, 27, 46, 0.08), 0 2px 8px rgba(15, 27, 46, 0.04)',
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <Dropdown
              label="Business Category"
              value={d.businessCategory}
              onChange={v => onUpdate({ businessCategory: v })}
              options={['Hostel / PG', 'Retail', 'Co-Working', 'Gym / Fitness', 'Restaurant / Cafe']}
              placeholder="Select category"
            />
          </div>

          <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <NumericField
              label="Monthly Revenue"
              value={d.monthlyRevenue}
              onChange={v => onUpdate({ monthlyRevenue: v })}
              placeholder="0"
              prefix="₹"
            />
            <NumericField
              label="Monthly Expenses"
              value={d.monthlyExpenses}
              onChange={v => onUpdate({ monthlyExpenses: v })}
              placeholder="0"
              prefix="₹"
            />
          </div>

          <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <NumericField
              label="Occupancy Rate"
              value={d.occupancyRate}
              onChange={v => onUpdate({ occupancyRate: v })}
              placeholder="0"
              suffix="%"
            />
            <NumericField
              label="Rent Escalation"
              value={d.rentEscalation}
              onChange={v => onUpdate({ rentEscalation: v })}
              placeholder="0"
              suffix="%"
            />
            <NumericField
              label="Years in Operation"
              value={d.yearsInOperation}
              onChange={v => onUpdate({ yearsInOperation: v })}
              placeholder="0"
            />
          </div>

        </div>
      </div>
    </FormPage>
  )
}