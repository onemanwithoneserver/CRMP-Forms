import React from 'react'
import { useForm, PROPERTY_TYPES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

/* ─── Asset Icons ─── */
// Assuming Vite converts string imports to base URLs or we can load them
import iconOffice from '../../assets/Select Property Type/Office Space.svg'
import iconRetail from '../../assets/Select Property Type/Rental  Commercial Space.svg'
import iconHostel from '../../assets/Select Property Type/Hostel.svg'
import iconLand from '../../assets/Select Property Type/Land.svg'
import iconCoworking from '../../assets/Select Property Type/Co-Working.svg'

const icons: Record<string, string> = {
  office: iconOffice,
  retail: iconRetail,
  hostel: iconHostel,
  land: iconLand,
  coworking: iconCoworking,
}

export default function PropertyType() {
  const { state, dispatch, next, back } = useForm()
  const { propertyType } = state.formData

  return (
    <FormPage
      title="Select Property Type"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-4">
        {PROPERTY_TYPES.map(option => {
          const selected = propertyType === option.value
          const iconSrc = icons[option.icon]
          
          return (
            <button
              key={option.value}
              type="button"
              className={`selection-card ${selected ? 'selected' : ''}`}
              onClick={() => dispatch({ type: 'updateData', payload: { propertyType: option.value } })}
              aria-pressed={selected}
              style={{
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
                padding: '18px 20px',
                gap: '16px'
              }}
            >
              <div className={`radio-circle ${selected ? 'active' : ''}`} style={{ marginTop: 0 }} />
              
              <div style={{
                flex: 1,
                fontSize: '1rem',
                fontWeight: 800,
                color: 'var(--text)',
                textAlign: 'left'
              }}>
                {option.label}
              </div>
              
              {iconSrc && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                  <img src={iconSrc} alt={option.label} style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {state.errors.propertyType && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '12px' }}>
          {state.errors.propertyType}
        </div>
      )}
    </FormPage>
  )
}
