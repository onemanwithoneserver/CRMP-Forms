import React from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import TextField from '../../components/inputs/TextField'
import { Dropdown } from '../../components/inputs/Dropdown'

// ─── constants ────────────────────────────────────────────
const LEASE_SUB_TYPES = [
  { label: 'Full Lease', value: 'Full Lease' },
  { label: 'Sub Lease', value: 'Sub Lease' },
]

const RENT_PRICING_MODES = [
  { label: 'Per Sq Ft / Sq.yd', value: 'Per Sq Ft' },
  { label: 'Fixed Amount', value: 'Fixed Amount' },
]

const INDUSTRY_CATEGORIES = [
  'IT / Software', 'BFSI / Finance', 'Retail', 'Healthcare',
  'Education', 'Logistics', 'Manufacturing', 'Hospitality',
  'E-commerce', 'Real Estate', 'Telecom', 'Media', 'Others',
]

// ─── main component ───────────────────────────────────────
export default function LeaseInfo() {
  const { state, dispatch, next, back } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const isSubLease = d.leaseSubType === 'Sub Lease'

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
          value={d[field] as string}
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
          value={d[valField] as string}
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

  const renderVerticalBoolean = (label: string, field: keyof typeof state.formData) => (
    <div className="flex items-center justify-between w-full py-1.5 px-0.5">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
      <div className="w-[110px]">
        <SegmentedControl
          options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
          value={d[field] as string || 'No'}
          onChange={v => onUpdate({ [field]: v })}
        />
      </div>
    </div>
  )

  return (
    <FormPage title="Lease Information" onBack={back} onNext={next}>
      <div className={`flex flex-col font-['Outfit'] pb-4 ${isMobile ? 'gap-3' : 'gap-6'}`}>

        {/* SECTION 1: Lease Type & Pricing */}
        <div className={`flex flex-col ${isMobile ? 'gap-2' : 'gap-4'}`}>
          <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-1">
            Lease Type &amp; Pricing
          </h2>

          {isMobile ? (
            <>
              <div className="w-1/2">
                <Dropdown
                  label="Lease Type"
                  value={d.leaseSubType || 'Full Lease'}
                  options={LEASE_SUB_TYPES.map(t => t.value)}
                  onChange={v => onUpdate({ leaseSubType: v })}
                  placeholder="Select type"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Monthly Lease / Rent Type</label>
                <SegmentedControl
                  options={RENT_PRICING_MODES}
                  value={d.rentPricingMode || 'Per Sq Ft'}
                  onChange={v => onUpdate({ rentPricingMode: v })}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {renderNumeric(
                  d.rentPricingMode === 'Fixed Amount' ? 'Monthly Rent Value' : 'Rent Per Sq Ft',
                  d.rentPricingMode === 'Fixed Amount' ? 'monthlyRent' : 'pricePerSqFt',
                  'e.g. ₹ 150000',
                )}
                {renderNumeric('Advance Deposit', 'advanceDeposit', 'e.g. ₹ 300000')}
              </div>

              <div className="w-1/2">
                {renderNumeric('Maintenance (If any)', 'maintenanceCharges', 'e.g. ₹ 10000')}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="lg:col-span-1">
                <Dropdown
                  label="Lease Type"
                  value={d.leaseSubType || 'Full Lease'}
                  options={LEASE_SUB_TYPES.map(t => t.value)}
                  onChange={v => onUpdate({ leaseSubType: v })}
                  placeholder="Select type"
                />
              </div>

              <div className="sm:col-span-2 lg:col-span-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Monthly Lease / Rent Type</label>
                  <div className="w-full">
                    <SegmentedControl
                      options={RENT_PRICING_MODES}
                      value={d.rentPricingMode || 'Per Sq Ft'}
                      onChange={v => onUpdate({ rentPricingMode: v })}
                    />
                  </div>
                </div>
              </div>

              <div className="hidden lg:block"></div>

              {renderNumeric(
                d.rentPricingMode === 'Fixed Amount' ? 'Monthly Lease / Rent Value' : 'Rent Per Sq Ft / Sq.yd',
                d.rentPricingMode === 'Fixed Amount' ? 'monthlyRent' : 'pricePerSqFt',
                'e.g. ₹ 150000',
              )}
              {renderNumeric('Advance Deposit', 'advanceDeposit', 'e.g. ₹ 300000')}
              {renderNumeric('Maintenance Charges (If any)', 'maintenanceCharges', 'e.g. ₹ 10000')}
              <div className="hidden lg:block"></div>
            </div>
          )}
        </div>

        {/* SECTION 2: Financial & Terms */}
        <div className={`flex flex-col ${isMobile ? 'gap-2' : 'gap-4'}`}>
          <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-1">
            Financial &amp; Terms
          </h2>

          {isMobile ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Rent Escalation (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 px-3 pr-8 text-sm text-[#1C2A44] h-[34px] focus:outline-none"
                      value={d.rentEscalation}
                      onChange={e => onUpdate({ rentEscalation: e.target.value })}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">%</span>
                  </div>
                </div>
                {renderNumericWithUnit('Escalation Every', 'rentEscalationEvery', 'rentEscalationEveryUnit')}
              </div>

              {isSubLease && (
                <>
                  <div className="w-1/2">
                    <Dropdown
                      label="Existing Tenant (Industry)"
                      value={d.tenantIndustry}
                      options={INDUSTRY_CATEGORIES}
                      placeholder="Select industry"
                      onChange={v => onUpdate({ tenantIndustry: v })}
                    />
                  </div>
                  <TextField
                    label="Remarks"
                    value={d.subLeaseRemarks}
                    onChange={v => onUpdate({ subLeaseRemarks: v })}
                    placeholder="Any additional details about the sub-lease arrangement"
                  />
                </>
              )}
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="flex flex-col gap-1.5 w-full">
                <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">Rent Escalation (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 px-3 pr-8 text-sm text-[#1C2A44] h-[34px] focus:outline-none"
                    value={d.rentEscalation}
                    onChange={e => onUpdate({ rentEscalation: e.target.value })}
                    placeholder="0"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold">%</span>
                </div>
              </div>

              {renderNumericWithUnit('Rent Escalation Every', 'rentEscalationEvery', 'rentEscalationEveryUnit')}

              <div className="hidden lg:block lg:col-span-2"></div>

              {isSubLease && (
                <>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <Dropdown
                      label="Existing Tenant (Industry)"
                      value={d.tenantIndustry}
                      options={INDUSTRY_CATEGORIES}
                      placeholder="Select industry"
                      onChange={v => onUpdate({ tenantIndustry: v })}
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-2">
                    <TextField
                      label="Remarks"
                      value={d.subLeaseRemarks}
                      onChange={v => onUpdate({ subLeaseRemarks: v })}
                      placeholder="Any additional details about the sub-lease arrangement"
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

      </div>
    </FormPage>
  )
}
