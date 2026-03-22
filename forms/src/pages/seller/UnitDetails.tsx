import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import SectionCard from '../../components/layout/SectionCard'
import TextField from '../../components/inputs/TextField'
import SelectField from '../../components/inputs/SelectField'

const CITY_OPTIONS = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'pune', label: 'Pune' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
]

export default function UnitDetails() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
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
        
        <SectionCard title="Location">
          <div className="flex flex-col gap-3">
            <TextField
              label="Address"
              value={d.address}
              onChange={v => onUpdate({ address: v })}
              placeholder="Street address or landmark"
            />
            <SelectField
              label="City"
              value={d.city}
              onChange={v => onUpdate({ city: v })}
              options={CITY_OPTIONS}
              placeholder="Select city"
            />
          </div>
        </SectionCard>

        <SectionCard title="Area & Pricing">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Total Built-up Area (sqft)</label>
              <input className="form-input" style={{ borderColor: 'var(--border)' }} type="number" placeholder="e.g. 1200" value={d.totalBuiltUpArea} onChange={e => onUpdate({ totalBuiltUpArea: e.target.value })} />
            </div>
            
            <TextField
              label="Price (₹)"
              value={d.price}
              onChange={v => onUpdate({ price: v })}
              placeholder="e.g. 50,00,000"
            />
          </div>
        </SectionCard>

        <SectionCard title="Unit specifics">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>Unit Type</label>
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
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Number of Rooms</label>
              <input className="form-input" style={{ borderColor: 'var(--border)' }} type="number" placeholder="0" value={d.numberOfRooms} onChange={e => onUpdate({ numberOfRooms: e.target.value })} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Number of Beds</label>
              <input className="form-input" style={{ borderColor: 'var(--border)' }} type="number" placeholder="0" value={d.numberOfBeds} onChange={e => onUpdate({ numberOfBeds: e.target.value })} />
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
        </SectionCard>

      </div>
    </FormPage>
  )
}
