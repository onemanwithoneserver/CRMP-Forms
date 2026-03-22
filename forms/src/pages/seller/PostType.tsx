import React from 'react'
import { useForm, SELLER_POST_TYPES, SELLER_SUB_CATEGORIES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

export default function PostType() {
  const { state, dispatch, next, back } = useForm()
  const { postType, postSubCategory } = state.formData

  return (
    <FormPage
      title="What do you want to do?"
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
              onClick={() => {
                 if (!selected) {
                    dispatch({ type: 'updateData', payload: { postType: option.value, postSubCategory: '' } })
                 }
              }}
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

                {selected && SELLER_SUB_CATEGORIES[option.value] && (
                  <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {SELLER_SUB_CATEGORIES[option.value].map(sub => {
                      const isSubSelected = postSubCategory === sub
                      return (
                        <div
                          key={sub}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: 'updateData', payload: { postSubCategory: sub } })
                          }}
                          style={{
                            padding: '8px 16px',
                            borderRadius: '4px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            background: isSubSelected ? 'var(--accent-gold)' : 'rgba(28, 42, 68, 0.05)',
                            color: isSubSelected ? '#fff' : 'var(--text)',
                            border: `1px solid ${isSubSelected ? 'var(--accent-gold)' : 'rgba(28, 42, 68, 0.1)'}`,
                            transition: 'all 200ms ease'
                          }}
                        >
                          {sub}
                        </div>
                      )
                    })}
                  </div>
                )}

              </div>
            </button>
          )
        })}
      </div>

      {state.errors.postType && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '12px' }}>
          {state.errors.postType}
        </div>
      )}
    </FormPage>
  )
}
