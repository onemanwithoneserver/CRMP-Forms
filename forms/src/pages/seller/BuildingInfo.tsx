import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import Toggle from '../../components/inputs/Toggle'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import SelectField from '../../components/inputs/SelectField'

export default function BuildingInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Building Information"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-4">
        
        <div>
          <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Building Name</label>
          <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="Name of the" value={d.buildingName} onChange={e => onUpdate({ buildingName: e.target.value })} />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Address</label>
          <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="Name of the" value={d.address} onChange={e => onUpdate({ address: e.target.value })} />
        </div>

        <div>
           <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>City</label>
           <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="Name of the" value={d.city} onChange={e => onUpdate({ city: e.target.value })} />
        </div>

        <div>
           <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Area / Micro Market</label>
           <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="Name of the" value={d.area} onChange={e => onUpdate({ area: e.target.value })} />
        </div>

        <div className="flex gap-4">
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Total Floors</label>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="No.of floors" value={d.totalFloors} onChange={e => onUpdate({ totalFloors: e.target.value })} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Year of Construction</label>
            <SegmentedControl 
               options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
               value={d.underConstruction}
               onChange={v => onUpdate({ underConstruction: v })}
            />
          </div>
        </div>

        <Toggle label="Lift Available" checked={d.liftAvailable} onChange={v => onUpdate({ liftAvailable: v })} />
        
        <Toggle label="Fire Compliant" checked={d.fireCompliant} onChange={v => onUpdate({ fireCompliant: v })} />

        <div className="flex items-center justify-between py-2 mt-2">
          <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>Ownership Type</span>
          <div style={{ width: '180px' }}>
            <SelectField
              value={d.ownershipType}
              onChange={v => onUpdate({ ownershipType: v })}
              options={[
                { value: 'Free Hold', label: 'Free Hold' },
                { value: 'Lease Hold', label: 'Lease Hold' },
                { value: 'Co-operative Society', label: 'Co-operative Society' },
              ]}
            />
          </div>
        </div>

      </div>

      {state.errors.city && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '12px' }}>
          {state.errors.city}
        </div>
      )}
    </FormPage>
  )
}
