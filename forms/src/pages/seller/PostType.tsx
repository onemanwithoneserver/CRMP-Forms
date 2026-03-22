import React from 'react'
import { useForm, SELLER_POST_TYPES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

export default function PostType() {
  const { state, dispatch, next, back } = useForm()
  const { postType, includeOperatingBusiness } = state.formData

  return (
    <FormPage
      title="What do you want to Post?"
      onBack={back}
      onNext={next}
      backDisabled={true}
    >
      <div className="flex flex-col gap-4">
        {SELLER_POST_TYPES.map(option => {
          const selected = postType === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`selection-card ${selected ? 'selected' : ''}`}
              onClick={() => dispatch({ type: 'updateData', payload: { postType: option.value } })}
              aria-pressed={selected}
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
                padding: '18px 20px',
              }}
            >
              <div className={`radio-circle ${selected ? 'active' : ''}`} />
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--text)',
                  marginBottom: '6px',
                }}>
                  {option.label}
                </div>
                <div style={{
                  fontSize: '0.8125rem',
                  color: selected ? 'var(--text)' : 'var(--text-secondary)',
                  lineHeight: 1.5,
                  opacity: selected ? 0.8 : 0.9,
                }}>
                  {option.description}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div style={{ marginTop: '28px' }}>
        <button
          type="button"
          onClick={() => dispatch({ type: 'updateData', payload: { includeOperatingBusiness: !includeOperatingBusiness } })}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 0',
          }}
        >
          <div className={`custom-checkbox ${includeOperatingBusiness ? 'checked' : ''}`} style={{ 
            width: '20px',
            height: '20px',
            borderWidth: '2px',
            borderColor: includeOperatingBusiness ? 'var(--accent)' : '#6B7280',
            borderRadius: '4px'
          }}>
             {includeOperatingBusiness && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
             )}
          </div>
          <span style={{
            fontSize: '0.95rem',
            color: 'var(--text-secondary)',
            fontFamily: "'Outfit', sans-serif",
          }}>
            Include Operating Business ?
          </span>
        </button>
      </div>

      {state.errors.postType && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '12px' }}>
          {state.errors.postType}
        </div>
      )}
    </FormPage>
  )
}
