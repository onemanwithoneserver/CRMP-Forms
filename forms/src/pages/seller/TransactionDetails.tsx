import React from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import TextField from '../../components/inputs/TextField'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'

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

export default function TransactionDetails() {
  const { state, dispatch, next, back } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'
  const saleType = d.postSubCategory || 'Vacant Space'

  const renderNumeric = (label: string, field: keyof typeof state.formData, placeholder = '0', prefix?: string) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
      <div className="relative group">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[0.8rem] font-medium pointer-events-none z-10">
            {prefix}
          </span>
        )}
        <input
          type="number"
          className={`form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 ${prefix ? 'pl-6' : 'px-3'} pr-3 text-sm text-[#1C2A44] h-[34px] focus:outline-none focus:border-[#3525cd] transition-all`}
          value={d[field] as string || ''}
          onChange={e => onUpdate({ [field]: e.target.value })}
          placeholder={placeholder}
        />
      </div>
    </div>
  )

  const renderNumericWithUnit = (label: string, valField: keyof typeof state.formData, unitField: keyof typeof state.formData) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          className="form-input bg-white w-20 border-[#e2e6ec] rounded-[6px] py-1.5 px-3 text-sm text-[#1C2A44] h-[34px] focus:outline-none focus:border-[#3525cd] transition-all"
          value={d[valField] as string || ''}
          onChange={e => onUpdate({ [valField]: e.target.value })}
          placeholder="0"
        />
        <div className="flex-1 min-w-[100px]">
          <Dropdown
            value={(d[unitField] as string) || 'Months'}
            options={['Months', 'Years']}
            onChange={v => onUpdate({ [unitField]: v })}
            variant="compact"
          />
        </div>
      </div>
    </div>
  )

  const renderVerticalBoolean = (label: string, field: keyof typeof state.formData) => {
    const control = (
      <SegmentedControl
        options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
        value={d[field] as string || 'No'}
        onChange={v => onUpdate({ [field]: v })}
      />
    )

    if (isMobile) {
      return (
        <div className="flex flex-col items-start justify-start w-full py-1.5 px-0.5">
          <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
          <div className="w-[110px]">{control}</div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-2 w-full py-1.5 px-0.5">
        <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
        <div className="w-[110px]">{control}</div>
      </div>
    )
  }

  return (
    <FormPage title="Transactional Details" onBack={back} onNext={next}>
      <div className="flex flex-col gap-[2px] font-['Outfit'] pb-4">
        
        <SectionCard title="Sale Type & Pricing">
          {isMobile ? (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Availability Type</label>
                <div className="h-[32px] flex items-center">
                  <SegmentedControl
                    options={SALE_TYPES}
                    value={saleType}
                    onChange={v => onUpdate({ postSubCategory: v })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-end">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Pricing Type</label>
                  <div className="h-[32px] flex items-center">
                    <SegmentedControl
                      options={PRICING_TYPES}
                      value={d.rentPricingMode || 'Per Sq Ft'}
                      onChange={v => onUpdate({ rentPricingMode: v })}
                    />
                  </div>
                </div>

                {renderNumeric(
                  d.rentPricingMode === 'Box Price' ? 'Total Asking Price (Box Price)' : 'Price Per Sq Ft / Sq.yd',
                  d.rentPricingMode === 'Box Price' ? 'askingPriceTotal' : 'pricePerSqFt',
                  'e.g. ₹50000000'
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-end">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Availability Type</label>
                <div className="h-[32px] flex items-center">
                  <SegmentedControl
                    options={SALE_TYPES}
                    value={saleType}
                    onChange={v => onUpdate({ postSubCategory: v })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Pricing Type</label>
                <div className="h-[32px] flex items-center">
                  <SegmentedControl
                    options={PRICING_TYPES}
                    value={d.rentPricingMode || 'Per Sq Ft'}
                    onChange={v => onUpdate({ rentPricingMode: v })}
                  />
                </div>
              </div>

              {renderNumeric(
                d.rentPricingMode === 'Box Price' ? 'Total Asking Price (Box Price)' : 'Price Per Sq Ft / Sq.yd',
                d.rentPricingMode === 'Box Price' ? 'askingPriceTotal' : 'pricePerSqFt',
                'e.g. ₹50000000'
              )}
            </div>
          )}
        </SectionCard>

        <SectionCard>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            
            {saleType === 'Vacant Space' && (
              <>
                {renderNumeric('Additional Charges', 'additionalCharges', 'e.g. ₹ 50000')}
                {renderNumeric('Existing Monthly Rent', 'existingMonthlyRent', 'e.g. ₹ 150000')}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Expected Rental Yield (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 px-3 pr-8 text-sm text-[#1C2A44] h-[34px] focus:outline-none focus:border-[#3525cd] transition-all"
                      value={d.expectedRentalYield || ''}
                      onChange={e => onUpdate({ expectedRentalYield: e.target.value })}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold pointer-events-none">%</span>
                  </div>
                </div>
                <div className="hidden lg:block"></div>

                {renderNumericWithUnit('Existing Lease Tenure', 'existingLeaseTenure', 'existingLeaseTenureUnit')}
                {renderNumericWithUnit('Remaining Tenure', 'remainingTenure', 'existingLeaseTenureUnit')}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Rent Escalation (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 px-3 pr-8 text-sm text-[#1C2A44] h-[34px] focus:outline-none focus:border-[#3525cd] transition-all"
                      value={d.rentEscalation || ''}
                      onChange={e => onUpdate({ rentEscalation: e.target.value })}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold pointer-events-none">%</span>
                  </div>
                </div>
                {renderNumericWithUnit('Rent Escalation Every', 'rentEscalationEvery', 'rentEscalationEveryUnit')}
              </>
            )}

            {saleType === 'Pre-Leased' && (
              <>
                <div className="sm:col-span-2">
                  <TextField
                    label="Existing Tenant Company Name"
                    value={d.existingTenantCompany}
                    onChange={v => onUpdate({ existingTenantCompany: v })}
                    placeholder="e.g. Google India"
                  />
                </div>
                <Dropdown
                  label="Tenant Category"
                  value={d.tenantCategory}
                  options={INDUSTRY_CATEGORIES}
                  placeholder="Select industry"
                  onChange={v => onUpdate({ tenantCategory: v })}
                />
                {renderNumeric('Existing Monthly Rent', 'existingMonthlyRent', 'e.g. ₹ 150000')}

                {renderNumericWithUnit('Existing Lease Tenure', 'existingLeaseTenure', 'existingLeaseTenureUnit')}
                {renderNumericWithUnit('Remaining Tenure', 'remainingTenure', 'existingLeaseTenureUnit')}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Rent Escalation (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 px-3 pr-8 text-sm text-[#1C2A44] h-[34px] focus:outline-none focus:border-[#3525cd] transition-all"
                      value={d.rentEscalation || ''}
                      onChange={e => onUpdate({ rentEscalation: e.target.value })}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold pointer-events-none">%</span>
                  </div>
                </div>
                {renderNumericWithUnit('Rent Escalation Every', 'rentEscalationEvery', 'rentEscalationEveryUnit')}
              </>
            )}

            {saleType === 'Fractional' && (
              <>
                {renderNumeric('Minimum Sq Ft', 'minimumSqFt', 'e.g. ₹ 500')}
                {renderNumeric('Assured Monthly Rent', 'assuredMonthlyRent', 'e.g. ₹ 50000')}
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Annual Yield (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 px-3 pr-8 text-sm text-[#1C2A44] h-[34px] focus:outline-none focus:border-[#3525cd] transition-all"
                      value={d.annualYield || ''}
                      onChange={e => onUpdate({ annualYield: e.target.value })}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold pointer-events-none">%</span>
                  </div>
                </div>
                {renderVerticalBoolean('Is it Pre-Leased', 'isPreLeased')}
              </>
            )}
          </div>

          {saleType === 'Fractional' && (
            <div className="mt-2 w-full sm:col-span-2 lg:col-span-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Remarks</label>
                <textarea
                  className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-2 px-3 text-sm text-[#1C2A44] min-h-[80px] focus:outline-none"
                  value={d.fractionalRemarks || ''}
                  onChange={e => onUpdate({ fractionalRemarks: e.target.value })}
                  placeholder="Enter details about the fractional opportunity..."
                />
              </div>
            </div>
          )}
        </SectionCard>

      </div>
    </FormPage>
  )
}