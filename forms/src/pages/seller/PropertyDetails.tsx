import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

export default function PropertyDetails() {
  const { state, dispatch, next, back } = useForm()
  const { buildingSelection, buildingName } = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Is this property in an existing building?"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            className="form-input"
            style={{
              paddingRight: '48px',
              height: '54px',
              borderRadius: '8px',
              fontSize: '1rem',
              color: 'var(--text)',
              borderColor: 'var(--border-light)'
            }}
            placeholder="Search Building Name"
            value={buildingName}
            onChange={(e) => onUpdate({ buildingName: e.target.value })}
          />
          <div style={{ position: 'absolute', right: '16px', top: '15px', color: 'var(--text-tertiary)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>

        {/* Option: Select from Existing */}
        <button
          type="button"
          className={`selection-card ${buildingSelection === 'existing' ? 'selected' : ''}`}
          onClick={() => onUpdate({ buildingSelection: 'existing' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
            padding: '18px 20px',
            gap: '16px',
            borderRadius: '8px',
          }}
        >
          <div className={`radio-circle ${buildingSelection === 'existing' ? 'active' : ''}`} style={{ marginTop: 0 }} />
          <div style={{
            flex: 1,
            fontSize: '1rem',
            fontWeight: 800,
            color: 'var(--text)',
            textAlign: 'left'
          }}>
            Select from Existing
          </div>
          <div style={{ color: buildingSelection === 'existing' ? 'var(--text)' : 'var(--text-tertiary)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="8" height="14" rx="1" />
              <rect x="12" y="4" width="8" height="18" rx="1" />
              <path d="M6 12h4M6 16h4M14 8h4M14 12h4M14 16h4" />
            </svg>
          </div>
        </button>

        {/* Option: Add New Existing */}
        <button
          type="button"
          className={`selection-card ${buildingSelection === 'new' ? 'selected' : ''}`}
          onClick={() => onUpdate({ buildingSelection: 'new' })}
          style={{
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
            padding: '18px 20px',
            gap: '16px',
            borderRadius: '8px',
          }}
        >
          <div className={`radio-circle ${buildingSelection === 'new' ? 'active' : ''}`} style={{ marginTop: 0 }} />
          <div style={{
            flex: 1,
            fontSize: '1rem',
            fontWeight: 800,
            color: 'var(--text)',
            textAlign: 'left'
          }}>
            Add New Existing
          </div>
          <div style={{ color: buildingSelection === 'new' ? 'var(--text)' : 'var(--text-tertiary)', position: 'relative' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V7l14-4v18" />
              <path d="M9 9h6" />
              <path d="M9 13h6" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
              style={{ position: 'absolute', bottom: '-4px', right: '-4px', background: buildingSelection === 'new' ? 'var(--accent-gold)' : 'var(--surface-lowest)', borderRadius: '50%' }}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </button>
      </div>

      {state.errors.buildingSelection && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '12px' }}>
          {state.errors.buildingSelection}
        </div>
      )}
    </FormPage>
  )
}
