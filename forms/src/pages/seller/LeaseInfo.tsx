import React, { useState } from 'react'
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
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  let borderColor = '#E4E7EC'
  let background = '#F5F7FA'
  let shadow = 'none'

  if (isFocused) {
    borderColor = '#C89B3C'
    background = '#FFFFFF'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)'
  } else if (isHovered) {
    borderColor = '#E6C36A'
    background = '#FFFFFF'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
      <div style={{ position: 'relative', width: '100%' }}>
        {prefix && (
          <span 
            style={{ 
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', 
              color: isFocused ? '#C89B3C' : '#667085', fontSize: '0.85rem', fontWeight: 600, 
              pointerEvents: 'none', zIndex: 10, transition: 'color 250ms ease'
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: '100%',
            height: '34px',
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: prefix ? '24px' : '10px',
            paddingRight: suffix ? '30px' : '10px',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#1C2A44',
            background: background,
            border: `1px solid ${borderColor}`,
            borderRadius: '3px',
            outline: 'none',
            transition: 'all 250ms ease-in-out',
            boxShadow: shadow,
            boxSizing: 'border-box',
          }}
        />
        {suffix && (
          <span 
            style={{ 
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
              color: isFocused ? '#C89B3C' : '#667085', fontSize: '0.8rem', fontWeight: 600, 
              pointerEvents: 'none', zIndex: 10, transition: 'color 250ms ease'
            }}
          >
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
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  let borderColor = '#E4E7EC'
  let background = '#F5F7FA'
  let shadow = 'none'

  if (isFocused) {
    borderColor = '#C89B3C'
    background = '#FFFFFF'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)'
  } else if (isHovered) {
    borderColor = '#E6C36A'
    background = '#FFFFFF'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          height: '34px',
          padding: '0 10px',
          fontSize: '0.85rem',
          fontWeight: 500,
          color: '#1C2A44',
          background: background,
          border: `1px solid ${borderColor}`,
          borderRadius: '3px',
          outline: 'none',
          transition: 'all 250ms ease-in-out',
          boxShadow: shadow,
          boxSizing: 'border-box',
        }}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ flex: 1 }}>
          <NumericField 
            label="" 
            value={d[valField] as string || ''} 
            onChange={v => onUpdate({ [valField]: v })} 
            placeholder="0" 
          />
        </div>
        <div style={{ width: '110px' }}>
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
      <div style={{ maxWidth: '896px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Outfit', sans-serif" }}>

        <SectionCard title="Lease Type & Pricing" icon={<Handshake size={14} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: '16px', alignItems: 'end' }}>
              <Dropdown
                label="Lease Type"
                value={d.leaseSubType || 'Full Lease'}
                options={LEASE_SUB_TYPES}
                onChange={v => onUpdate({ leaseSubType: v })}
                placeholder="Select type"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>Monthly Lease / Rent Type</label>
                <SegmentedControl
                  options={RENT_PRICING_MODES}
                  value={d.rentPricingMode || 'Per Sq Ft'}
                  onChange={v => onUpdate({ rentPricingMode: v })}
                />
              </div>
            </div>

            <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
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
              <div style={{ gridColumn: isMobile ? 'span 2' : 'auto' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '16px', alignItems: 'end' }}>
              <NumericField
                label="Rent Escalation"
                value={d.rentEscalation as string}
                onChange={v => onUpdate({ rentEscalation: v })}
                placeholder="0"
                suffix="%"
              />
              <div style={{ gridColumn: isMobile ? 'span 2' : 'auto' }}>
                {renderNumericWithUnit('Escalation Cycle', 'rentEscalationEvery', 'rentEscalationEveryUnit')}
              </div>
            </div>

            {isSubLease && (
              <>
                <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: '16px' }}>
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