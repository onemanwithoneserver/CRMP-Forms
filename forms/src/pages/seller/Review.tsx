import React from 'react'
import { useForm, SELLER_POST_TYPES, PROPERTY_TYPES } from '../../context/FormContext'
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
  const d = state.sellerData

  const handleSubmit = () => {
    alert('Form submitted successfully! (Integration point)')
  }

  return (
    <FormPage
      title="Review & Submit"
      subtitle="Verify your information before submitting"
      onBack={back}
      onNext={handleSubmit}
      isLastStep
      nextLabel="Submit"
    >
      <div className="flex flex-col gap-4">
        {/* Post Type */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Post Type</div>
            <Button variant="ghost" onClick={() => goToStep(1)}>Edit</Button>
          </div>
          <SummaryRow label="Type" value={findLabel(SELLER_POST_TYPES as any, d.postType)} />
          <SummaryRow label="Operating Business" value={d.includeOperatingBusiness ? 'Included' : 'Not Included'} />
        </div>

        {/* Property Type */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Property Type</div>
            <Button variant="ghost" onClick={() => goToStep(2)}>Edit</Button>
          </div>
          <SummaryRow label="Type" value={findLabel(PROPERTY_TYPES as any, d.propertyType)} />
        </div>

        {/* Property Details */}
        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Property Details</div>
            <Button variant="ghost" onClick={() => goToStep(3)}>Edit</Button>
          </div>
          <SummaryRow label="Building Option" value={d.buildingSelection === 'existing' ? 'Select from Existing' : d.buildingSelection === 'new' ? 'Add New Existing' : '—'} />
          <SummaryRow label="Building Name" value={d.buildingName || '—'} />
          
          {d.buildingSelection === 'new' && (
            <>
              <SummaryRow label="Address" value={d.address || '—'} />
              <SummaryRow label="City" value={d.city || '—'} />
              <SummaryRow label="Area / Micro Market" value={d.area || '—'} />
              <SummaryRow label="Total Floors" value={d.totalFloors || '—'} />
              <SummaryRow label="Under Construction" value={d.underConstruction || 'No'} />
              <SummaryRow label="Lift Available" value={d.liftAvailable ? 'Yes' : 'No'} />
              <SummaryRow label="Fire Compliant" value={d.fireCompliant ? 'Yes' : 'No'} />
              <SummaryRow label="Ownership Type" value={d.ownershipType || '—'} />
            </>
          )}
        </div>

        {/* Location & Pricing */}
        {d.buildingSelection === 'existing' && (
          <div className="section-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div className="section-title" style={{ margin: 0 }}>Location & Pricing</div>
              <Button variant="ghost" onClick={() => goToStep(4)}>Edit</Button>
            </div>
            <SummaryRow label="City" value={d.city} />
          </div>
        )}
      </div>
    </FormPage>
  )
}
