import React from 'react'
import { useForm, USER_PROPERTY_TYPES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

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
    >
      <div className="flex flex-col gap-3">
        {USER_PROPERTY_TYPES.map(option => {
          const isSelected = selected.includes(option.value)
          // `icon` is injected into type but technically TypeScript might complain if we aren't careful, but we typecast here
          const iconSrc = icons[(option as any).icon]
          
          return (
            <button
              key={option.value}
              type="button"
              className={`selection-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggle(option.value)}
              aria-pressed={isSelected}
              style={{
                 display: 'flex',
                 alignItems: 'center',
                 padding: '16px 20px',
                 gap: '16px',
                 borderRadius: '8px',
                 boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className={`radio-circle ${isSelected ? 'active' : ''}`} style={{ marginTop: 0 }} />
              <span style={{
                fontSize: '0.875rem',
                fontWeight: isSelected ? 600 : 400,
                color: 'var(--text)',
                flex: 1,
                textAlign: 'left'
              }}>
                {option.label}
              </span>
              
              {iconSrc && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                  <img src={iconSrc} alt={option.label} style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
                </div>
              )}
            </button>
          )
        })}
      </div>
      {state.errors.lookingFor && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '8px' }}>
          {state.errors.lookingFor}
        </div>
      )}
    </FormPage>
  )
}
