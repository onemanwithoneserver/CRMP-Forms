import React from 'react'
import { useForm, USER_PROPERTY_TYPES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import Button from '../../components/common/Button'

function findLabel(options: readonly { value: string; label: string }[], value: string): string {
  return options.find(o => o.value === value)?.label || '—'
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="summary-row">
      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)' }}>{value || '—'}</span>
    </div>
  )
}

export default function Review() {
  const { state, back, goToStep } = useForm()
  const d = state.userData

  const handleSubmit = () => {
    alert('Search preferences submitted! (Integration point)')
  }

  return (
    <FormPage
      title="Review & Submit"
      subtitle="Verify your preferences before submitting"
      onBack={back}
      onNext={handleSubmit}
      isLastStep
      nextLabel="Submit"
    >
      <div className="flex flex-col gap-4">
        {/* Looking For */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Looking For</div>
            <Button variant="ghost" onClick={() => goToStep(1)}>Edit</Button>
          </div>
          <SummaryRow
            label="Property Types"
            value={d.lookingFor.map(v => findLabel(USER_PROPERTY_TYPES, v)).join(', ') || '—'}
          />
        </div>

        {/* Budget & Area */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Budget & Area</div>
            <Button variant="ghost" onClick={() => goToStep(2)}>Edit</Button>
          </div>
          <SummaryRow label="Budget" value={d.budgetMin || d.budgetMax ? `₹${d.budgetMin || '—'} – ₹${d.budgetMax || '—'}` : '—'} />
          <SummaryRow label="Area" value={d.areaMin || d.areaMax ? `${d.areaMin || '—'} – ${d.areaMax || '—'} sq ft` : '—'} />
        </div>

        {/* Location */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Location</div>
            <Button variant="ghost" onClick={() => goToStep(3)}>Edit</Button>
          </div>
          <SummaryRow label="City" value={d.preferredCity} />
          <SummaryRow label="Locality" value={d.preferredLocality} />
        </div>
      </div>
    </FormPage>
  )
}
