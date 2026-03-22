import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SegmentedControl from '../../components/inputs/SegmentedControl'

export default function UnitDetails() {
  const { state, dispatch, next, back } = useForm()
  const d = state.sellerData

  const onUpdate = (payload: Partial<typeof state.sellerData>) => {
    dispatch({ type: 'updateSeller', payload })
  }

  const unitTypeOptions = [
    { label: 'Entire Building', value: 'Entire Building' },
    { label: 'Full Floor', value: 'Full Floor' },
    { label: 'Partial Floor', value: 'Partial Floor' }
  ]

  return (
    <FormPage
      title="Unit Details"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-5">
        
        {/* Unit Type Radio Cards */}
        <div className="flex flex-col gap-3">
          {unitTypeOptions.map(option => {
            const selected = d.unitType === option.value
            return (
              <button
                key={option.value}
                type="button"
                className={`selection-card ${selected ? 'selected' : ''}`}
                onClick={() => onUpdate({ unitType: option.value })}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
                  padding: '16px 20px',
                  gap: '16px',
                  borderRadius: '8px',
                }}
              >
                <div className={`radio-circle ${selected ? 'active' : ''}`} style={{ marginTop: 0 }} />
                <div style={{
                  flex: 1,
                  fontSize: '1rem',
                  fontWeight: selected ? 800 : 600,
                  color: 'var(--text)',
                  textAlign: 'left'
                }}>
                  {option.label}
                </div>
              </button>
            )
          })}
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Total Built-up Area (sqft)</label>
          <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} type="number" placeholder="0" value={d.totalBuiltUpArea} onChange={e => onUpdate({ totalBuiltUpArea: e.target.value })} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Number of Rooms</label>
          <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} type="number" placeholder="0" value={d.numberOfRooms} onChange={e => onUpdate({ numberOfRooms: e.target.value })} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Number of Beds</label>
          <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} type="number" placeholder="0" value={d.numberOfBeds} onChange={e => onUpdate({ numberOfBeds: e.target.value })} />
        </div>

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>Attached Washrooms</span>
          <div style={{ width: '120px' }}>
            <SegmentedControl 
               options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
               value={d.attachedWashrooms}
               onChange={v => onUpdate({ attachedWashrooms: v })}
            />
          </div>
        </div>

      </div>
    </FormPage>
  )
}
