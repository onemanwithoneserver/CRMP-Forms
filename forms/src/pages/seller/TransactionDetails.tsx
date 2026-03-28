import React, { useState } from 'react'
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
            paddingRight: suffix ? '28px' : '10px',
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '6px 0', fontFamily: "'Outfit', sans-serif" }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
          <div style={{ width: '120px' }}>{control}</div>
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
        <div>{control}</div>
      </div>
    )
  }

  return (
    <FormPage title="Transactional Details" icon={<Banknote size={20} color="#E6C36A" />} onBack={back} onNext={next}>
      <div style={{ maxWidth: '896px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Outfit', sans-serif" }}>
        
        <SectionCard title="Sale Type & Pricing" icon={<Tag size={14} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Availability Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '400px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C2A44' }}>Availability Type</label>
              <SegmentedControl
                options={SALE_TYPES}
                value={saleType}
                onChange={v => onUpdate({ postSubCategory: v })}
              />
            </div>

            <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

            {/* Dynamic Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', alignItems: 'end' }}>
              
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
              <div style={{ width: '100%', marginTop: '8px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>Remarks</label>
                  <textarea
                    style={{
                      width: '100%',
                      minHeight: '80px',
                      padding: '10px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#1C2A44',
                      background: '#F5F7FA',
                      border: '1px solid #E4E7EC',
                      borderRadius: '3px',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: "'Outfit', sans-serif",
                      transition: 'all 200ms ease'
                    }}
                    onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C'; e.target.style.boxShadow = '0 2px 8px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)' }}
                    onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC'; e.target.style.boxShadow = 'none' }}
                    value={d.fractionalRemarks || ''}
                    onChange={e => onUpdate({ fractionalRemarks: e.target.value })}
                    placeholder="Enter details about the fractional opportunity..."
                  />
                </div>
              </div>
            )}

            <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

            {/* Pricing Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', alignItems: 'end' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>Pricing Type</label>
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