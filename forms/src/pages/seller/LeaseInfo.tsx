import React from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import { Dropdown } from '../../components/inputs/Dropdown'
import { Handshake, Coins } from 'lucide-react'

const LEASE_SUB_TYPES = ['Full Lease', 'Sub Lease']

const RENT_PRICING_MODES = [
  { label: 'Per Sq Ft / Sq.yd', value: 'Per Sq Ft' },
  { label: 'Fixed Amount', value: 'Fixed Amount' },
]

const INDUSTRY_CATEGORIES = [
  'IT / Software', 'BFSI / Finance', 'Retail', 'Healthcare',
  'Education', 'Logistics', 'Manufacturing', 'Hospitality',
  'E-commerce', 'Real Estate', 'Telecom', 'Media', 'Others',
]

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
            ${suffix ? 'pr-[30px]' : 'pr-[10px]'}
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
      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
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

export default function LeaseInfo() {
  const { state, dispatch, next, back } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const isSubLease = d.leaseSubType === 'Sub Lease'

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

  return (
    <FormPage title="Lease Information" icon={<Handshake size={20} color="#E6C36A" />} onBack={back} onNext={next}>
      <div className="max-w-[896px] mx-auto flex flex-col gap-4 font-['Outfit',sans-serif]">

        <SectionCard title="Lease Type & Pricing" icon={<Handshake size={14} />}>
          <div className="flex flex-col gap-5">
            
            <div className={`grid gap-4 items-end ${isMobile ? 'grid-cols-1' : 'grid-cols-[1fr_2fr]'}`}>
              <Dropdown
                label="Lease Type"
                value={d.leaseSubType || 'Full Lease'}
                options={LEASE_SUB_TYPES}
                onChange={v => onUpdate({ leaseSubType: v })}
                placeholder="Select type"
              />
              <div className="flex flex-col gap-2">
                <label className="text-[0.8rem] font-semibold text-[#1C2A44]">Monthly Lease / Rent Type</label>
                <SegmentedControl
                  options={RENT_PRICING_MODES}
                  value={d.rentPricingMode || 'Per Sq Ft'}
                  onChange={v => onUpdate({ rentPricingMode: v })}
                />
              </div>
            </div>

            <div className="h-px w-full bg-[#E4E7EC]" />

            <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <NumericField
                label={d.rentPricingMode === 'Fixed Amount' ? 'Monthly Lease Value' : 'Rent Per Sq Ft / Sq.yd'}
                value={d.rentPricingMode === 'Fixed Amount' ? (d.monthlyRent as string) : (d.pricePerSqFt as string)}
                onChange={v => onUpdate({ [d.rentPricingMode === 'Fixed Amount' ? 'monthlyRent' : 'pricePerSqFt']: v })}
                placeholder="0"
                prefix="₹"
              />
              <NumericField
                label="Advance Deposit"
                value={d.advanceDeposit as string}
                onChange={v => onUpdate({ advanceDeposit: v })}
                placeholder="0"
                prefix="₹"
              />
              <div className={isMobile ? 'col-span-2' : ''}>
                <NumericField
                  label="Maintenance (If any)"
                  value={d.maintenanceCharges as string}
                  onChange={v => onUpdate({ maintenanceCharges: v })}
                  placeholder="0"
                  prefix="₹"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Financial & Terms" icon={<Coins size={14} />}>
          <div className="flex flex-col gap-5">
            <div className={`grid gap-4 items-end ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <NumericField
                label="Rent Escalation"
                value={d.rentEscalation as string}
                onChange={v => onUpdate({ rentEscalation: v })}
                placeholder="0"
                suffix="%"
              />
              <div className={isMobile ? 'col-span-2' : ''}>
                {renderNumericWithUnit('Escalation Cycle', 'rentEscalationEvery', 'rentEscalationEveryUnit')}
              </div>
            </div>

            {isSubLease && (
              <>
                <div className="h-px w-full bg-[#E4E7EC]" />
                <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-[1fr_2fr]'}`}>
                  <Dropdown
                    label="Existing Tenant (Industry)"
                    value={d.tenantIndustry}
                    options={INDUSTRY_CATEGORIES}
                    placeholder="Select industry"
                    onChange={v => onUpdate({ tenantIndustry: v })}
                  />
                  <StringField
                    label="Sub-Lease Remarks"
                    value={d.subLeaseRemarks as string}
                    onChange={v => onUpdate({ subLeaseRemarks: v })}
                    placeholder="Any additional details about the sub-lease arrangement"
                  />
                </div>
              </>
            )}
          </div>
        </SectionCard>

      </div>
    </FormPage>
  )
}