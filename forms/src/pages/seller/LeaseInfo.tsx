import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SegmentedControl from '../../components/inputs/SegmentedControl'

export default function LeaseInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Lease Information"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-4">

        <div>
           <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Monthly Rent</label>
           <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="₹ 0" value={d.monthlyRent} onChange={e => onUpdate({ monthlyRent: e.target.value })} />
        </div>

        <div>
           <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>Security Deposit</label>
           <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="₹ 0" value={d.securityDeposit} onChange={e => onUpdate({ securityDeposit: e.target.value })} />
        </div>

        <div className="flex items-center justify-between py-2 mt-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Remaining Tenure</span>
          <div style={{ width: '160px' }}>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="e.g. 3 Years" value={d.remainingTenure} onChange={e => onUpdate({ remainingTenure: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Lease Expiry Date</span>
          <div style={{ width: '160px', position: 'relative' }}>
            <input type="date" className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} value={d.leaseExpiryDate} onChange={e => onUpdate({ leaseExpiryDate: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Lock-in Period</span>
          <div style={{ width: '160px' }}>
            <input className="form-input" style={{ height: '48px', borderColor: 'var(--border)' }} placeholder="Months/Years" value={d.lockInPeriod} onChange={e => onUpdate({ lockInPeriod: e.target.value })} />
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Furnishing Type</span>
          <div style={{ width: '160px' }}>
            <SegmentedControl 
               options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
               value={d.isFurnished}
               onChange={v => onUpdate({ isFurnished: v })}
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-2 mb-2">
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)' }}>Power Backup</span>
          <div style={{ width: '160px' }}>
            <SegmentedControl 
               options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
               value={d.powerBackup}
               onChange={v => onUpdate({ powerBackup: v })}
            />
          </div>
        </div>

      </div>
    </FormPage>
  )
}
