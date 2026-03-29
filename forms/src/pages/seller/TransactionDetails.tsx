import React from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import { Banknote, Tag } from 'lucide-react'

const SALE_TYPES = [
  { label: 'Vacant Space', value: 'Vacant Space' },
  { label: 'Pre-Leased', value: 'Pre-Leased' },
  { label: 'Fractional', value: 'Fractional' },
]

const PRICING_TYPES = [
  { label: 'Per Sq Ft', value: 'Per Sq Ft' },
  { label: 'Box Price', value: 'Box Price' },
]

const INDUSTRY_CATEGORIES = [
  'IT / Software', 'BFSI / Finance', 'Retail', 'Healthcare',
  'Education', 'Logistics', 'Manufacturing', 'Hospitality',
  'E-commerce', 'Real Estate', 'Telecom', 'Media', 'Others',
]

// Reusable numeric field with independent hover states
function NumericField({
  label,
  value,
  onChange,
  placeholder = '0',
  prefix,
  suffix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
}) {
  return (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      {label && <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>}
      <div className="relative w-full">
        {prefix && (
          <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#667085] text-[0.85rem] font-semibold pointer-events-none z-10 transition-colors duration-250 ease peer-focus:text-[#C89B3C]">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            peer w-full h-[34px] py-0 text-[0.85rem] font-medium text-[#1C2A44] bg-[#F5F7FA] 
            border border-[#E4E7EC] rounded-[3px] outline-none box-border
            transition-all duration-250 ease-in-out
            hover:bg-white hover:border-[#E6C36A] 
            focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]
            ${prefix ? 'pl-[24px]' : 'pl-[10px]'}
            ${suffix ? 'pr-[28px]' : 'pr-[10px]'}
          `}
        />
        {suffix && (
          <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#667085] text-[0.8rem] font-semibold pointer-events-none z-10 transition-colors duration-250 ease peer-focus:text-[#C89B3C]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function StringField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      {label && <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[34px] px-[10px] text-[0.85rem] font-medium text-[#1C2A44] bg-[#F5F7FA] border border-[#E4E7EC] rounded-[3px] outline-none box-border transition-all duration-250 ease-in-out hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]"
      />
    </div>
  )
}

export default function TransactionDetails() {
  const { state, dispatch, next, back } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const saleType = d.postSubCategory || 'Vacant Space'

  const renderNumericWithUnit = (label: string, valField: keyof typeof state.formData, unitField: keyof typeof state.formData) => (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <NumericField 
            label="" 
            value={d[valField] as string || ''} 
            onChange={v => onUpdate({ [valField]: v })} 
            placeholder="0" 
          />
        </div>
        <div className="w-[110px]">
          <Dropdown
            label=""
            value={(d[unitField] as string) || 'Months'}
            options={['Months', 'Years']}
            onChange={v => onUpdate({ [unitField]: v })}
          />
        </div>
      </div>
    </div>
  )

  const renderVerticalBoolean = (label: string, field: keyof typeof state.formData) => {
    const control = (
      <SegmentedControl
        compact={!isMobile}
        options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
        value={(d[field] as string) || 'No'}
        onChange={v => onUpdate({ [field]: v })}
      />
    )

    if (isMobile) {
      return (
        <div className="flex items-center justify-between w-full py-1.5 font-['Outfit',sans-serif]">
          <label className="text-[0.85rem] font-semibold text-[#1C2A44]">{label}</label>
          <div className="w-[120px]">{control}</div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-2 w-full font-['Outfit',sans-serif]">
        <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
        <div>{control}</div>
      </div>
    )
  }

  return (
    <FormPage title="Transactional Details" icon={<Banknote size={20} color="#E6C36A" />} onBack={back} onNext={next}>
      <div className="max-w-[896px] mx-auto flex flex-col  font-['Outfit',sans-serif]">
        
        <SectionCard title="Sale Type & Pricing" icon={<Tag size={14} />}>
          <div className="flex flex-col gap-6">
            
            {/* Availability Type */}
            <div className="flex flex-col gap-2 max-w-[400px]">
              <label className="text-[0.85rem] font-semibold text-[#1C2A44]">Availability Type</label>
              <SegmentedControl
                options={SALE_TYPES}
                value={saleType}
                onChange={v => onUpdate({ postSubCategory: v })}
              />
            </div>

            <div className="h-px w-full bg-[#E4E7EC]" />

            {/* Dynamic Details Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 items-end">
              
              {saleType === 'Vacant Space' && (
                <>
                  <NumericField label="Additional Charges" value={d.additionalCharges} onChange={v => onUpdate({ additionalCharges: v })} placeholder="e.g. 50000" prefix="₹" />
                  <NumericField label="Existing Monthly Rent" value={d.existingMonthlyRent} onChange={v => onUpdate({ existingMonthlyRent: v })} placeholder="e.g. 150000" prefix="₹" />
                  <NumericField label="Expected Rental Yield" value={d.expectedRentalYield} onChange={v => onUpdate({ expectedRentalYield: v })} placeholder="0" suffix="%" />
                  {renderNumericWithUnit('Existing Lease Tenure', 'existingLeaseTenure', 'existingLeaseTenureUnit')}
                  {renderNumericWithUnit('Remaining Tenure', 'remainingTenure', 'existingLeaseTenureUnit')}
                  <NumericField label="Rent Escalation" value={d.rentEscalation} onChange={v => onUpdate({ rentEscalation: v })} placeholder="0" suffix="%" />
                  {renderNumericWithUnit('Rent Escalation Every', 'rentEscalationEvery', 'rentEscalationEveryUnit')}
                </>
              )}

              {saleType === 'Pre-Leased' && (
                <>
                  <StringField label="Existing Tenant Company Name" value={d.existingTenantCompany} onChange={v => onUpdate({ existingTenantCompany: v })} placeholder="e.g. Google India" />
                  <Dropdown
                    label="Tenant Category"
                    value={d.tenantCategory}
                    options={INDUSTRY_CATEGORIES}
                    placeholder="Select industry"
                    onChange={v => onUpdate({ tenantCategory: v })}
                  />
                  <NumericField label="Existing Monthly Rent" value={d.existingMonthlyRent} onChange={v => onUpdate({ existingMonthlyRent: v })} placeholder="e.g. 150000" prefix="₹" />
                  {renderNumericWithUnit('Existing Lease Tenure', 'existingLeaseTenure', 'existingLeaseTenureUnit')}
                  {renderNumericWithUnit('Remaining Tenure', 'remainingTenure', 'existingLeaseTenureUnit')}
                  <NumericField label="Rent Escalation" value={d.rentEscalation} onChange={v => onUpdate({ rentEscalation: v })} placeholder="0" suffix="%" />
                  {renderNumericWithUnit('Rent Escalation Every', 'rentEscalationEvery', 'rentEscalationEveryUnit')}
                </>
              )}

              {saleType === 'Fractional' && (
                <>
                  <NumericField label="Minimum Sq Ft" value={d.minimumSqFt} onChange={v => onUpdate({ minimumSqFt: v })} placeholder="0" suffix="sq ft" />
                  <NumericField label="Assured Monthly Rent" value={d.assuredMonthlyRent} onChange={v => onUpdate({ assuredMonthlyRent: v })} placeholder="e.g. 50000" prefix="₹" />
                  <NumericField label="Annual Yield" value={d.annualYield} onChange={v => onUpdate({ annualYield: v })} placeholder="0" suffix="%" />
                  {renderVerticalBoolean('Is it Pre-Leased', 'isPreLeased')}
                </>
              )}
            </div>

            {saleType === 'Fractional' && (
              <div className="w-full mt-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[0.8rem] font-semibold text-[#1C2A44]">Remarks</label>
                  <textarea
                    value={d.fractionalRemarks || ''}
                    onChange={e => onUpdate({ fractionalRemarks: e.target.value })}
                    placeholder="Enter details about the fractional opportunity..."
                    className="w-full min-h-[80px] p-2.5 text-[0.85rem] font-medium text-[#1C2A44] bg-[#F5F7FA] border border-[#E4E7EC] rounded-[3px] outline-none resize-y font-['Outfit',sans-serif] transition-all duration-200 ease hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]"
                  />
                </div>
              </div>
            )}

            <div className="h-px w-full bg-[#E4E7EC]" />

            {/* Pricing Details */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 items-end">
              <div className="flex flex-col gap-2">
                <label className="text-[0.8rem] font-semibold text-[#1C2A44]">Pricing Type</label>
                <SegmentedControl
                  options={PRICING_TYPES}
                  value={d.rentPricingMode || 'Per Sq Ft'}
                  onChange={v => onUpdate({ rentPricingMode: v })}
                />
              </div>

              <NumericField
                label={d.rentPricingMode === 'Box Price' ? 'Total Asking Price (Box Price)' : 'Price Per Sq Ft / Sq.yd'}
                value={d.rentPricingMode === 'Box Price' ? d.askingPriceTotal : d.pricePerSqFt}
                onChange={v => onUpdate({ [d.rentPricingMode === 'Box Price' ? 'askingPriceTotal' : 'pricePerSqFt']: v })}
                placeholder="e.g. 50000000"
                prefix="₹"
              />
            </div>

          </div>
        </SectionCard>

      </div>
    </FormPage>
  )
}