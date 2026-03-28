import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import { ClipboardCheck, Edit2 } from 'lucide-react'

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 py-1 px-2.5 bg-transparent hover:bg-[#C89B3C]/10 border border-transparent rounded-[3px] text-[#C89B3C] hover:text-[#E6C36A] text-[0.75rem] font-bold cursor-pointer transition-all duration-200 ease outline-none"
    >
      <Edit2 size={12} />
      Edit
    </button>
  )
}

function SummarySection({ title, stepIndex, children }: { title: string; stepIndex: number; children: React.ReactNode }) {
  const { goToStep } = useForm()
  
  return (
    <div className="flex flex-col bg-white rounded border border-[#E4E7EC] shadow-[0_2px_8px_rgba(15,27,46,0.04)] overflow-hidden font-['Outfit',sans-serif]">
      <div className="flex justify-between items-center bg-[#F5F7FA] py-2.5 px-3.5 border-b border-[#E4E7EC]">
        <h2 className="text-[0.9rem] font-bold text-[#1C2A44] m-0 tracking-[-0.01em]">
          {title}
        </h2>
        <EditButton onClick={() => goToStep(stepIndex)} />
      </div>
      <div className="py-1 px-3.5">
        {children}
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | boolean | null }) {
  const displayVal = value === true ? 'Yes' : value === false ? 'No' : (value || '—')
  
  if (!displayVal || displayVal === '—') return null
  
  return (
    <div className="flex justify-between items-start py-2 border-b border-[#E4E7EC]/50">
      <span className="text-[0.8rem] font-medium text-[#667085] shrink-0">
        {label}
      </span>
      <span className="text-[0.85rem] font-semibold text-[#1C2A44] text-right pl-4 break-words">
        {String(displayVal)}
      </span>
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
      title="Review & Submit"
      subtitle="Verify your details before submitting"
      icon={<ClipboardCheck size={20} color="#E6C36A" />}
      onBack={back}
      onNext={handleSubmit}
      isLastStep
      nextLabel="Submit listing"
    >
      <div className="max-w-[896px] mx-auto flex flex-col gap-4 font-['Outfit',sans-serif]">
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
          
          <SummarySection title="Post Type & Location" stepIndex={getStepIndex('post-type')}>
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

          <SummarySection title="Unit Details" stepIndex={getStepIndex('unit-details')}>
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

          <SummarySection title="Unit Availability" stepIndex={getStepIndex('unit-availability')}>
            <Row label="Immediately available" value={d.isImmediatelyAvailable} />
            {d.tentativeMonth && <Row label="Available from" value={d.tentativeMonth} />}
            {d.unitNo && <Row label="Unit no." value={d.unitNo} />}
            {d.numberOfUnitsAvailable && <Row label="No. of units" value={d.numberOfUnitsAvailable} />}
          </SummarySection>

          <SummarySection title="Property Gallery" stepIndex={getStepIndex('upload-photos')}>
            <Row label="Photos" value={d.photosUploaded ? 'Uploaded' : 'Not uploaded'} />
          </SummarySection>

          {isSale && (
            <SummarySection title="Transactional Details" stepIndex={getStepIndex('transaction-details')}>
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

          {isLease && (
            <SummarySection title="Lease Information" stepIndex={getStepIndex('lease-info')}>
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

        </div>

        <div className="text-center p-4 text-[0.8rem] font-medium text-[#667085] leading-[1.6] mt-2">
          By submitting, you agree to our listing terms and confirm all information is accurate.
        </div>

      </div>
    </FormPage>
  )
}