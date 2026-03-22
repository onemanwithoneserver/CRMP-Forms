import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

/* ─── Inline Components ─── */
function Toggle({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: '56px',
          height: '32px',
          borderRadius: '8px',
          background: checked ? 'var(--accent)' : 'var(--text-tertiary)',
          position: 'relative',
          transition: 'background 200ms ease',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          background: 'white',
          position: 'absolute',
          top: '4px',
          left: checked ? '28px' : '4px',
          transition: 'left 200ms ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }} />
      </button>
    </div>
  )
}

function SegmentedControl({ options, value, onChange }: { options: {label: string, value: string}[], value: string, onChange: (v: string) => void }) {
  return (
    <div style={{
      display: 'flex',
      borderRadius: '8px',
      overflow: 'hidden',
      background: 'var(--surface-container)',
    }}>
      {options.map(opt => {
        const isSelected = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: '12px 0',
              background: isSelected ? 'var(--accent)' : '#e5e7eb',
              color: isSelected ? 'var(--text-inverse)' : 'var(--accent)',
              fontSize: '0.9rem',
              fontWeight: 500,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 150ms ease'
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export default function BuildingInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.sellerData

  const onUpdate = (payload: Partial<typeof state.sellerData>) => {
    dispatch({ type: 'updateSeller', payload })
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
            <select className="form-input form-select" style={{ height: '48px', borderColor: 'var(--accent)', borderWidth: '2px', fontWeight: 600, color: 'var(--text)' }} value={d.ownershipType} onChange={e => onUpdate({ ownershipType: e.target.value })}>
              <option value="Free Hold">Free Hold</option>
              <option value="Lease Hold">Lease Hold</option>
              <option value="Co-operative Society">Co-operative Society</option>
            </select>
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
