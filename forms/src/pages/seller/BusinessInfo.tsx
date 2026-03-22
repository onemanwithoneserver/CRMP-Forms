import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SelectField from '../../components/inputs/SelectField'

export default function BusinessInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Business Information"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-4">
        
        <SelectField
          label="Business Category"
          value={d.businessCategory}
          onChange={v => onUpdate({ businessCategory: v })}
          options={[
            { value: 'Hostel / PG', label: 'Hostel / PG' },
            { value: 'Retail', label: 'Retail' },
            { value: 'Co-Working', label: 'Co-Working' },
            { value: 'Gym / Fitness', label: 'Gym / Fitness' },
            { value: 'Restaurant / Cafe', label: 'Restaurant / Cafe' },
          ]}
        />

        <hr style={{ borderColor: 'var(--border-light)', margin: '4px 0' }} />

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Monthly Revenue</span>
          <div style={{ width: '160px' }}>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="₹ 0" value={d.monthlyRevenue} onChange={e => onUpdate({ monthlyRevenue: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Monthly Expenses</span>
          <div style={{ width: '160px' }}>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="₹ 0" value={d.monthlyExpenses} onChange={e => onUpdate({ monthlyExpenses: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Occupancy Rate (%)</span>
          <div style={{ width: '160px' }}>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} type="number" placeholder="0%" value={d.occupancyRate} onChange={e => onUpdate({ occupancyRate: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Years in Operation</span>
          <div style={{ width: '160px' }}>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} type="number" placeholder="0" value={d.yearsInOperation} onChange={e => onUpdate({ yearsInOperation: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2 mb-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Rent Escalation (%)</span>
          <div style={{ width: '160px' }}>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} type="number" placeholder="0%" value={d.rentEscalation} onChange={e => onUpdate({ rentEscalation: e.target.value })} />
          </div>
        </div>

      </div>
    </FormPage>
  )
}
