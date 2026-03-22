import React from 'react'
import { useForm, SELLER_POST_TYPES, PROPERTY_TYPES } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

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
  const d = state.formData

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

        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Post Type</div>
            <button type="button" className="edit-link" onClick={() => goToStep(1)}>Edit</button>
          </div>
          <SummaryRow label="Type" value={findLabel(SELLER_POST_TYPES as any, d.postType)} />
          <SummaryRow label="Operating Business" value={d.includeOperatingBusiness ? 'Included' : 'Not Included'} />
        </div>


        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Property Type</div>
            <button type="button" className="edit-link" onClick={() => goToStep(2)}>Edit</button>
          </div>
          <SummaryRow label="Type" value={findLabel(PROPERTY_TYPES as any, d.propertyType)} />
        </div>


        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Property Details</div>
            <button type="button" className="edit-link" onClick={() => goToStep(3)}>Edit</button>
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


        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Unit Details</div>
            <button type="button" className="edit-link" onClick={() => goToStep(d.buildingSelection === 'new' ? 5 : 5)}>Edit</button>
          </div>
          <SummaryRow label="Unit Type" value={d.unitType || '—'} />
          <SummaryRow label="Total Built-up Area" value={d.totalBuiltUpArea ? `${d.totalBuiltUpArea} sqft` : '—'} />
          <SummaryRow label="Number of Rooms" value={d.numberOfRooms || '—'} />
          <SummaryRow label="Number of Beds" value={d.numberOfBeds || '—'} />
          <SummaryRow label="Attached Washrooms" value={d.attachedWashrooms || '—'} />
        </div>


        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Lease Information</div>
            <button type="button" className="edit-link" onClick={() => goToStep(6)}>Edit</button>
          </div>
          <SummaryRow label="Monthly Rent" value={d.monthlyRent ? `₹${d.monthlyRent}` : '—'} />
          <SummaryRow label="Security Deposit" value={d.securityDeposit ? `₹${d.securityDeposit}` : '—'} />
          <SummaryRow label="Remaining Tenure" value={d.remainingTenure || '—'} />
          <SummaryRow label="Lease Expiry Date" value={d.leaseExpiryDate || '—'} />
          <SummaryRow label="Lock-in Period" value={d.lockInPeriod || '—'} />
          <SummaryRow label="Furnishing Type" value={d.isFurnished || '—'} />
          <SummaryRow label="Power Backup" value={d.powerBackup || '—'} />
        </div>


        <div className="section-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div className="section-title" style={{ margin: 0 }}>Business Information</div>
            <button type="button" className="edit-link" onClick={() => goToStep(7)}>Edit</button>
          </div>
          <SummaryRow label="Business Category" value={d.businessCategory || '—'} />
          <SummaryRow label="Monthly Revenue" value={d.monthlyRevenue ? `₹${d.monthlyRevenue}` : '—'} />
          <SummaryRow label="Monthly Expenses" value={d.monthlyExpenses ? `₹${d.monthlyExpenses}` : '—'} />
          <SummaryRow label="Occupancy Rate" value={d.occupancyRate ? `${d.occupancyRate}%` : '—'} />
          <SummaryRow label="Years in Operation" value={d.yearsInOperation || '—'} />
          <SummaryRow label="Rent Escalation" value={d.rentEscalation ? `${d.rentEscalation}%` : '—'} />
        </div>
      </div>
    </FormPage>
  )
}
