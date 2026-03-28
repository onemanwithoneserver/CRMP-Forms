import React, { useState } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import { MapPin, Map } from 'lucide-react'

// Inline StringField to match the established premium design language
function StringField({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  let borderColor = '#E4E7EC'
  let background = '#F5F7FA'
  let shadow = 'none'

  if (error) {
    borderColor = '#EF4444'
    background = '#FFFFFF'
    shadow = isFocused ? '0 0 0 3px rgba(239, 68, 68, 0.1)' : 'none'
  } else if (isFocused) {
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
      <input
        type="text"
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
          padding: '0 10px',
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
      {error && (
        <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#EF4444' }}>{error}</span>
      )}
    </div>
  )
}

const CITY_OPTIONS = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad',
]

export default function LocationPref() {
  const { state, dispatch, next, back } = useForm()
  const { formData, errors } = state

  const update = (payload: Record<string, string>) =>
    dispatch({ type: 'updateData', payload })

  return (
    <FormPage
      title="Location Preference"
      subtitle="Where would you like the property to be?"
      onBack={back}
      onNext={next}
      icon={<MapPin size={20} color="#E6C36A" />}
    >
      <div style={{ maxWidth: '896px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Outfit', sans-serif" }}>
        <SectionCard title="Preferred Location" icon={<Map size={14} />}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <Dropdown
              label="Preferred City"
              value={formData.preferredCity}
              onChange={v => update({ preferredCity: v })}
              options={CITY_OPTIONS}
              placeholder="Select city"
            />
            <StringField
              label="Preferred Locality"
              value={formData.preferredLocality}
              onChange={v => update({ preferredLocality: v })}
              placeholder="e.g. Bandra West, Koramangala"
            />
          </div>
        </SectionCard>
      </div>
    </FormPage>
  )
}