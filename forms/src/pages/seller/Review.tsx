import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

function SummarySection({ title, stepIndex, children }: { title: string; stepIndex: number; children: React.ReactNode }) {
  const { goToStep } = useForm()
  return (
    <div className="flex flex-col gap-3">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #edf0f5', paddingBottom: '4px', marginBottom: '4px' }}>
        <h2 className="text-[0.88rem] font-bold text-[#1C2A44] m-0">
          {title}
        </h2>
        <button type="button" className="edit-link" onClick={() => goToStep(stepIndex)} style={{
          color: 'var(--accent-gold)', fontSize: '0.8rem', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px'
        }}>
          Edit
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: '#ffffff', borderRadius: '6px', padding: '8px 10px', border: '1px solid #edf0f5', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
        {children}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | boolean | null }) {
  const displayVal = value === true ? 'Yes' : value === false ? 'No' : (value || '—')
  if (!displayVal || displayVal === '—') return null
  return (
    <div className="summary-row">
      <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text)', textAlign: 'right', maxWidth: '55%' }}>{String(displayVal)}</span>
    </div>
  )
}

export default function Review() {
  const { state, steps, back } = useForm()
  const d = state.formData

  const getStepIndex = (key: string) => steps.findIndex(s => s.key === key) + 1

  const handleSubmit = () => {
    alert('Form submitted successfully!')
  }

  const isSale = d.postType === 'Property Sale'
  const isLease = d.postType === 'Lease/Rent Property'
  const pType = d.propertyType || 'office'
  const isLand = pType === 'land'
  const saleType = d.postSubCategory

  return (
    <FormPage
      title="Review & submit"
      subtitle="Verify your details before submitting"
      onBack={back}
      onNext={handleSubmit}
      isLastStep
      nextLabel="Submit listing"
    >
      <div className="flex flex-col gap-3 pb-2">

        {/* Post Type */}
        <SummarySection title="Post type" stepIndex={getStepIndex('post-type')}>
          <Row label="Property type" value={
            { land: 'Land', retail: 'Rental / Commercial', office: 'Office space', coworking: 'Co-working', entire_building: 'Entire building' }[pType]
          } />
          <Row label="Listing intent" value={d.postType} />
          {d.postSubCategory && <Row label="Sub-category" value={d.postSubCategory} />}
          <Row label="City" value={d.city} />
          <Row label="Micro location" value={d.microLocation} />
          <Row label="Zone" value={d.zone} />
          <Row label="Circle" value={d.circle} />
        </SummarySection>

        {/* Unit Details */}
        <SummarySection title="Unit details" stepIndex={getStepIndex('unit-details')}>
          <Row label="Unit type" value={d.unitType} />
          {!isLand && <Row label="Built-up area" value={d.totalBuiltUpArea ? `${d.totalBuiltUpArea} sq. ft` : null} />}
          {!isLand && <Row label="Carpet area" value={d.carpetArea ? `${d.carpetArea} sq. ft` : null} />}
          {isLand && <Row label="Plot size" value={d.plotSize ? `${d.plotSize} sq. yd` : null} />}
          <Row label="Unit facing" value={d.unitFacing} />
          {!isLand && <Row label="Floor" value={d.floor} />}
          {!isLand && <Row label="Total floors" value={d.totalFloors} />}
          <Row label="Ideal for" value={d.idealFor} />
          {d.frontage && <Row label="Frontage" value={`${d.frontage} ft`} />}
          {d.ceilingHeight && <Row label="Ceiling height" value={`${d.ceilingHeight} ft`} />}
          {d.cornerUnit && <Row label="Corner unit" value={true} />}
          {d.spaceCondition && <Row label="Space condition" value={d.spaceCondition} />}
          {d.partitionsType && <Row label="Partitions" value={d.partitionsType} />}
          {d.lighting && <Row label="Lighting" value={d.lighting} />}
          {d.meetingRooms && <Row label="Meeting rooms" value={d.meetingRooms} />}
          {d.workstations && <Row label="Workstations" value={d.workstations} />}
        </SummarySection>

        {/* Facilities */}
        <SummarySection title="Facilities" stepIndex={getStepIndex('facilities')}>
          {d.designatedParking && <Row label="Designated parking" value={d.designatedParking} />}
          {d.noOfParkings && <Row label="No. of parkings" value={d.noOfParkings} />}
          {d.visitorParking && <Row label="Visitor parking" value={d.visitorParking} />}
          {d.powerBackup && <Row label="Power backup" value={d.powerBackup} />}
          {d.powerLoad && <Row label="Power load" value={`${d.powerLoad} kW`} />}
          {d.powerPhase && <Row label="Power phase" value={d.powerPhase} />}
          {d.washrooms && <Row label="Washrooms" value={d.washrooms} />}
          {d.fireSprinklers && <Row label="Fire sprinklers" value={d.fireSprinklers} />}
          {d.fireExtinguishers && <Row label="Fire extinguishers" value={d.fireExtinguishers} />}
        </SummarySection>

        {/* Availability */}
        <SummarySection title="Unit availability" stepIndex={getStepIndex('unit-availability')}>
          <Row label="Immediately available" value={d.isImmediatelyAvailable} />
          {d.tentativeMonth && <Row label="Available from" value={d.tentativeMonth} />}
          {d.unitNo && <Row label="Unit no." value={d.unitNo} />}
          {d.numberOfUnitsAvailable && <Row label="No. of units" value={d.numberOfUnitsAvailable} />}
        </SummarySection>

        {/* Media */}
        <SummarySection title="Media" stepIndex={getStepIndex('upload-photos')}>
          <Row label="Photos" value={d.photosUploaded ? 'Uploaded' : 'Not uploaded'} />
        </SummarySection>

        {/* Sale: Transactional Details */}
        {isSale && (
          <SummarySection title="Transactional details" stepIndex={getStepIndex('transaction-details')}>
            {saleType && <Row label="Sale type" value={saleType} />}
            {d.askingPriceTotal && <Row label="Box price" value={`₹ ${Number(d.askingPriceTotal).toLocaleString('en-IN')}`} />}
            {d.pricePerSqFt && <Row label={isLand ? 'Price per sq. yd' : 'Price per sq. ft'} value={`₹ ${d.pricePerSqFt}`} />}
            {d.additionalCharges && <Row label="Additional charges" value={d.additionalCharges} />}
            {saleType === 'Vacant Space' && d.expectedRentalYield && <Row label="Expected rental yield" value={`${d.expectedRentalYield}%`} />}
            {saleType === 'Pre-Leased' && <Row label="Monthly rent" value={d.existingMonthlyRent ? `₹ ${d.existingMonthlyRent}` : null} />}
            {saleType === 'Pre-Leased' && <Row label="Lease tenure" value={d.existingLeaseTenure ? `${d.existingLeaseTenure} ${d.existingLeaseTenureUnit}` : null} />}
            {saleType === 'Pre-Leased' && <Row label="Tenant name" value={d.existingTenantCompany} />}
            {saleType === 'Pre-Leased' && <Row label="Tenant industry" value={d.tenantCategory} />}
            {saleType === 'Fractional' && d.minimumSqFt && <Row label="Min sq. ft" value={`${d.minimumSqFt} sq. ft`} />}
            {saleType === 'Fractional' && d.assuredMonthlyRent && <Row label="Assured rent" value={`₹ ${d.assuredMonthlyRent}`} />}
            {saleType === 'Fractional' && d.annualYield && <Row label="Annual yield" value={`${d.annualYield}%`} />}
          </SummarySection>
        )}

        {/* Lease: Lease Information */}
        {isLease && (
          <SummarySection title="Lease information" stepIndex={getStepIndex('lease-info')}>
            {d.leaseSubType && <Row label="Lease type" value={d.leaseSubType} />}
            {d.rentPricingMode && <Row label="Pricing mode" value={d.rentPricingMode} />}
            {d.monthlyRent && <Row label="Monthly rent" value={`₹ ${Number(d.monthlyRent).toLocaleString('en-IN')}`} />}
            {d.pricePerSqFt && <Row label="Rent per sq. ft" value={`₹ ${d.pricePerSqFt}`} />}
            {d.advanceDeposit && <Row label="Advance deposit" value={`₹ ${Number(d.advanceDeposit).toLocaleString('en-IN')}`} />}
            {d.rentEscalation && <Row label="Rent escalation" value={d.rentEscalation === 'Yes' ? `Yes – every ${d.rentEscalationEvery} ${d.rentEscalationEveryUnit}` : 'No'} />}
            {d.maintenanceCharges && <Row label="Maintenance charges" value={`₹ ${d.maintenanceCharges}`} />}
            {d.tenantIndustry && <Row label="Preferred industry" value={d.tenantIndustry} />}
            {d.subLeaseRemarks && <Row label="Sub-lease remarks" value={d.subLeaseRemarks} />}
          </SummarySection>
        )}

        {/* Submit hint */}
        <div style={{
          textAlign: 'center',
          padding: '8px',
          fontSize: '0.78rem',
          color: 'var(--text-tertiary)',
          lineHeight: 1.6,
        }}>
          By submitting, you agree to our listing terms and confirm all information is accurate.
        </div>

      </div>
    </FormPage>
  )
}
