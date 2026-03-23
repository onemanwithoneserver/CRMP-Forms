import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import TextField from '../../components/inputs/TextField'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'

// ─── Sale Type Card Selector ─────────────────────────────
const SALE_TYPES = [
  {
    value: 'Vacant Space',
    label: 'Vacant Space',
    desc: 'Property is empty and ready for immediate use',
  },
  {
    value: 'Pre-Leased',
    label: 'Pre-Leased',
    desc: 'Already leased with an existing tenant in place',
  },
  {
    value: 'Fractional',
    label: 'Fractional',
    desc: 'Selling a portion or share of the property',
  },
]

// ─── Helper renderers ─────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[13px] font-semibold text-[#445069] pl-0.5">
      {children}
    </label>
  )
}

function NumericInput({
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
    <div className="flex flex-col gap-1.5 w-full">
      <Label>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {prefix && (
          <span
            style={{
              padding: '0 10px',
              background: 'var(--surface-lowest)',
              border: '1px solid var(--border-light)',
              borderRight: 'none',
              borderRadius: '6px 0 0 6px',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={0}
          style={{
            borderRadius: prefix ? '0 6px 6px 0' : suffix ? '6px 0 0 6px' : '6px',
            flex: 1,
          }}
          className="form-input bg-white border-[#e2e6ec] focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C]/50 py-2.5 px-3 text-sm text-[#1C2A44] transition-all"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {suffix && (
          <span
            style={{
              padding: '0 10px',
              background: 'var(--surface-lowest)',
              border: '1px solid var(--border-light)',
              borderLeft: 'none',
              borderRadius: '0 6px 6px 0',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function TenureInput({
  label,
  value,
  unit,
  onValueChange,
  onUnitChange,
}: {
  label: string
  value: string
  unit: string
  onValueChange: (v: string) => void
  onUnitChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          min={0}
          className="form-input bg-white border-[#e2e6ec] focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C]/50 py-2.5 px-3 text-sm text-[#1C2A44] rounded-[6px] transition-all"
          style={{ flex: 1 }}
          placeholder="0"
          value={value}
          onChange={e => onValueChange(e.target.value)}
        />
        <div style={{ minWidth: '120px' }}>
          <SegmentedControl
            options={[
              { label: 'Months', value: 'Months' },
              { label: 'Years', value: 'Years' },
            ]}
            value={unit}
            onChange={onUnitChange}
          />
        </div>
      </div>
    </div>
  )
}

function YesNoRow({ label, field, value, onChange }: { label: string; field: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between py-1 bg-white border border-[#edf0f5] px-3.5 rounded-lg">
      <span className="text-[13.5px] font-medium text-[#1C2A44]">{label}</span>
      <div className="w-[110px]">
        <SegmentedControl
          options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  )
}

// ─── visibility helper ────────────────────────────────────
// Columns from spec: Land, Retail, Office, Coworking, Building
// Using propertyType keys: land, retail, office, coworking, entire_building
const ALL_COLS = ['land', 'retail', 'office', 'coworking', 'entire_building']

// Pre-Leased fields visibility per property type:
//   Vacant cols:       all YES
//   Pre-Leased section: Yes for all cols
//   Fractional - Min Sq Ft:  No for Land; Yes for rest
//   Fractional - Assured Rent: No for Land; Yes for rest
//   Fractional - Annual Yield: No for Land; Yes for rest
//   Fractional - Is Pre-Leased: No for Land; Yes for rest
//   Fractional - Remarks: No for Land; Yes for rest

const INDUSTRY_CATEGORIES = [
  'IT / Software', 'BFSI / Finance', 'Retail', 'Healthcare',
  'Education', 'Logistics', 'Manufacturing', 'Hospitality',
  'E-commerce', 'Real Estate', 'Telecom', 'Media', 'Others',
]

// ─── Main Component ───────────────────────────────────────
export default function TransactionDetails() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'
  const saleType = d.postSubCategory || 'Vacant Space'
  const isLand = pType === 'land'

  // ── Per Sq Ft label: "yard" for land
  const sqFtLabel = isLand ? 'Per Sq Yd (Price)' : 'Per Sq Ft (Price)'

  return (
    <FormPage title="Transactional Details" onBack={back} onNext={next}>
      <div className="flex flex-col gap-5 sm:gap-6 font-['Outfit'] pb-6">

        {/* ── SALE TYPE SELECTOR ──────────────────────────── */}
        <SectionCard title="Sale Type">
          <div className="flex flex-col gap-4">
            {SALE_TYPES.map(option => {
              const selected = saleType === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`selection-card ${selected ? 'selected' : ''}`}
                  onClick={() => onUpdate({ postSubCategory: option.value })}
                  aria-pressed={selected}
                  style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', gap: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.04)' }}
                >
                  <div className={`radio-circle ${selected ? 'active' : ''}`} style={{ marginTop: 0 }} />
                  <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text)' }}>{option.label}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: 2 }}>{option.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </SectionCard>

        {/* ── PRICING ─────────────────────────────────────── */}
        <SectionCard title="Pricing">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <NumericInput
                label="Box Price (Total Asking Price)"
                value={d.askingPriceTotal}
                onChange={v => onUpdate({ askingPriceTotal: v })}
                placeholder="e.g. 50000000"
                prefix="₹"
              />
            </div>
            <NumericInput
              label={sqFtLabel}
              value={d.pricePerSqFt}
              onChange={v => onUpdate({ pricePerSqFt: v })}
              placeholder="e.g. 8000"
              prefix="₹"
            />
            <TextField
              label="Additional Charges (excl. taxes)"
              value={d.additionalCharges}
              onChange={v => onUpdate({ additionalCharges: v })}
              placeholder="e.g. Parking, CAM charges"
            />
          </div>
        </SectionCard>

        {/* ── VACANT SECTION ──────────────────────────────── */}
        {saleType === 'Vacant Space' && (
          <SectionCard title="Vacant Space Details">
            <div className="flex flex-col gap-4">
              {/* Expected Rental Yield — NOT for Land */}
              {!isLand && (
                <NumericInput
                  label="Expected Rental Yield"
                  value={d.expectedRentalYield}
                  onChange={v => onUpdate({ expectedRentalYield: v })}
                  placeholder="e.g. 6"
                  suffix="%"
                />
              )}
            </div>
          </SectionCard>
        )}

        {/* ── PRE-LEASED SECTION ──────────────────────────── */}
        {saleType === 'Pre-Leased' && (
          <SectionCard title="Pre-Leased Details">
            <div className="flex flex-col gap-4">
              <NumericInput
                label="Existing Monthly Rent"
                value={d.existingMonthlyRent}
                onChange={v => onUpdate({ existingMonthlyRent: v })}
                placeholder="e.g. 150000"
                prefix="₹"
              />
              <TenureInput
                label="Existing Lease Tenure"
                value={d.existingLeaseTenure}
                unit={d.existingLeaseTenureUnit}
                onValueChange={v => onUpdate({ existingLeaseTenure: v })}
                onUnitChange={v => onUpdate({ existingLeaseTenureUnit: v })}
              />
              <TenureInput
                label="Remaining Tenure"
                value={d.remainingTenure}
                unit="Months"
                onValueChange={v => onUpdate({ remainingTenure: v })}
                onUnitChange={() => { }}
              />
              <YesNoRow
                label="Rent Escalation Clause"
                field="rentEscalation"
                value={d.rentEscalation || 'No'}
                onChange={v => onUpdate({ rentEscalation: v })}
              />
              {d.rentEscalation === 'Yes' && (
                <TenureInput
                  label="Rent Escalation Every"
                  value={d.rentEscalationEvery}
                  unit={d.rentEscalationEveryUnit}
                  onValueChange={v => onUpdate({ rentEscalationEvery: v })}
                  onUnitChange={v => onUpdate({ rentEscalationEveryUnit: v })}
                />
              )}
              <TextField
                label="Existing Tenant Company Name"
                value={d.existingTenantCompany}
                onChange={v => onUpdate({ existingTenantCompany: v })}
                placeholder="e.g. Infosys Ltd."
              />
              <Dropdown
                label="Tenant Category (Industry)"
                value={d.tenantCategory}
                options={INDUSTRY_CATEGORIES}
                placeholder="Select industry"
                onChange={v => onUpdate({ tenantCategory: v })}
              />
            </div>
          </SectionCard>
        )}

        {/* ── FRACTIONAL SECTION ──────────────────────────── */}
        {saleType === 'Fractional' && (
          <SectionCard title="Fractional Details">
            <div className="flex flex-col gap-4">
              {!isLand && (
                <>
                  <NumericInput
                    label="Minimum Sq. Ft."
                    value={d.minimumSqFt}
                    onChange={v => onUpdate({ minimumSqFt: v })}
                    placeholder="e.g. 500"
                    suffix="sq.ft"
                  />
                  <NumericInput
                    label="Assured Monthly Rent"
                    value={d.assuredMonthlyRent}
                    onChange={v => onUpdate({ assuredMonthlyRent: v })}
                    placeholder="e.g. 50000"
                    prefix="₹"
                  />
                  <NumericInput
                    label="Annual Yield"
                    value={d.annualYield}
                    onChange={v => onUpdate({ annualYield: v })}
                    placeholder="e.g. 8"
                    suffix="%"
                  />
                  <YesNoRow
                    label="Is it Pre-Leased?"
                    field="isPreLeased"
                    value={d.isPreLeased}
                    onChange={v => onUpdate({ isPreLeased: v })}
                  />
                </>
              )}
              <TextField
                label="Remarks"
                value={d.fractionalRemarks}
                onChange={v => onUpdate({ fractionalRemarks: v })}
                placeholder="Any additional remarks"
              />
            </div>
          </SectionCard>
        )}

      </div>
    </FormPage>
  )
}
