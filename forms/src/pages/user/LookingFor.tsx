import React from 'react'
import { useForm, USER_PROPERTY_TYPES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export default function LookingFor() {
  const { state, dispatch, next, back } = useForm()
  const selected = state.userData.lookingFor

  const toggle = (value: string) => {
    dispatch({ type: 'toggleUserLookingFor', value })
  }

  return (
    <FormPage
      title="I'm Looking For"
      subtitle="Select one or more property types you're interested in"
      onBack={back}
      onNext={next}
      backDisabled={true}
    >
      <div className="flex flex-col gap-2">
        {USER_PROPERTY_TYPES.map(option => {
          const isSelected = selected.includes(option.value)
          return (
            <button
              key={option.value}
              type="button"
              className={`selection-card ${isSelected ? 'selected' : ''}`}
              onClick={() => toggle(option.value)}
              aria-pressed={isSelected}
            >
              <div className={`custom-checkbox ${isSelected ? 'checked' : ''}`}>
                {isSelected && <CheckIcon />}
              </div>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: isSelected ? 600 : 400,
                color: 'var(--text)',
                flex: 1,
              }}>
                {option.label}
              </span>
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
