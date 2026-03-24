import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import TextField from '../../components/inputs/TextField'
import { Dropdown } from '../../components/inputs/Dropdown'

// ─── constants ────────────────────────────────────────────
const LEASE_SUB_TYPES = ['Full Lease', 'Sub Lease']

const RENT_PRICING_MODES = [
  { value: 'Fixed Amount',  label: 'Fixed Amount' },
  { value: 'Per Sq Ft',     label: 'Per Sq Ft / Sq Yd' },
]

const INDUSTRY_CATEGORIES = [
  'IT / Software', 'BFSI / Finance', 'Retail', 'Healthcare',
  'Education', 'Logistics', 'Manufacturing', 'Hospitality',
  'E-commerce', 'Real Estate', 'Telecom', 'Media', 'Others',
]

// ─── small reusable components ────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[13px] font-semibold text-[#445069] pl-0.5">
      {children}
    </label>
  )
}

function NumericInput({
  label, value, onChange, placeholder = '0', prefix, suffix,
}: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; prefix?: string; suffix?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label>{label}</Label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {prefix && (
          <span style={{
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
          }}>{prefix}</span>
        )}
        <input
          type="number"
          min={0}
          style={{
            borderRadius: prefix ? '0 6px 6px 0' : suffix ? '6px 0 0 6px' : '6px',
            flex: 1,
          }}
          className="form-input bg-white border-[#e2e6ec] focus:border-[#C89B3C] py-2.5 px-3 text-sm text-[#1C2A44] transition-all"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {suffix && (
          <span style={{
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
          }}>{suffix}</span>
        )}
      </div>
    </div>
  )
}

function TenureInput({
  label, value, unit, onValueChange, onUnitChange,
}: {
  label: string; value: string; unit: string
  onValueChange: (v: string) => void; onUnitChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label>{label}</Label>
      <div className="flex gap-2 items-center">
        <input
          type="number"
          min={0}
          className="form-input bg-white border-[#e2e6ec] focus:border-[#C89B3C] py-2.5 px-3 text-sm text-[#1C2A44] rounded-[6px] transition-all"
          style={{ flex: 1 }}
          placeholder="0"
          value={value}
          onChange={e => onValueChange(e.target.value)}
        />
        <div style={{ minWidth: '128px' }}>
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

function YesNoRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
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

// ─── main component ───────────────────────────────────────
export default function LeaseInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const isSubLease = d.leaseSubType === 'Sub Lease'

  return (
    <FormPage title="Lease Information" onBack={back} onNext={next}>
      <div className="flex flex-col gap-6 sm:gap-8 font-['Outfit'] pb-6">

        {/* ── LEASE TYPE ─────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Lease Type
          </h2>
          <div className="flex flex-col gap-4">
            {LEASE_SUB_TYPES.map(option => {
              const selected = d.leaseSubType === option
              return (
                <button
                  key={option}
                  type="button"
                  className={`selection-card ${selected ? 'selected' : ''}`}
                  onClick={() => onUpdate({ leaseSubType: option })}
                  aria-pressed={selected}
                  style={{ display: 'flex', alignItems: 'center', padding: '18px 20px', gap: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.04)' }}
                >
                  <div className={`radio-circle ${selected ? 'active' : ''}`} style={{ marginTop: 0 }} />
                  <div style={{ flex: 1, fontSize: '1rem', fontWeight: 800, color: 'var(--text)', textAlign: 'left' }}>
                    {option}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── RENT / LEASE PRICING ───────────────────────── */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Rent / Lease Pricing
          </h2>
          <div className="flex flex-col gap-4">

            {/* Radio: pricing mode */}
            <div className="flex flex-col gap-1.5">
              <Label>Monthly Lease / Rent (Pricing Mode)</Label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '2px' }}>
                {RENT_PRICING_MODES.map(mode => {
                  const sel = d.rentPricingMode === mode.value
                  return (
                    <button
                      key={mode.value}
                      type="button"
                      className={`selection-card ${sel ? 'selected' : ''}`}
                      onClick={() => onUpdate({ rentPricingMode: mode.value })}
                      style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', gap: '12px', boxShadow: 'none' }}
                    >
                      <div className={`radio-circle ${sel ? 'active' : ''}`} style={{ marginTop: 0 }} />
                      <span style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.9rem' }}>{mode.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Fixed amount input */}
            {d.rentPricingMode === 'Fixed Amount' && (
              <NumericInput
                label="Monthly Rent (Fixed Amount)"
                value={d.monthlyRent}
                onChange={v => onUpdate({ monthlyRent: v })}
                placeholder="e.g. 150000"
                prefix="₹"
              />
            )}

            {/* Per Sq Ft input */}
            {d.rentPricingMode === 'Per Sq Ft' && (
              <NumericInput
                label="Rent Per Sq Ft / Sq Yd"
                value={d.pricePerSqFt}
                onChange={v => onUpdate({ pricePerSqFt: v })}
                placeholder="e.g. 80"
                prefix="₹"
                suffix="/ sq.ft"
              />
            )}

            <NumericInput
              label="Advance Deposit"
              value={d.advanceDeposit}
              onChange={v => onUpdate({ advanceDeposit: v })}
              placeholder="e.g. 300000"
              prefix="₹"
            />
          </div>
        </div>

        {/* ── ESCALATION ─────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Rent Escalation
          </h2>
          <div className="flex flex-col gap-4">
            <YesNoRow
              label="Rent Escalation Clause?"
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
          </div>
        </div>

        {/* ── RENT/LEASE DETAILS ─────────────────────────── */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Rent / Lease Details
          </h2>
          <div className="flex flex-col gap-4">
            <NumericInput
              label="Maintenance Charges (If any)"
              value={d.maintenanceCharges}
              onChange={v => onUpdate({ maintenanceCharges: v })}
              placeholder="e.g. 10000"
              prefix="₹"
            />
            <Dropdown
              label="Existing Tenant (Industry)"
              value={d.tenantIndustry}
              options={INDUSTRY_CATEGORIES}
              placeholder="Select industry"
              onChange={v => onUpdate({ tenantIndustry: v })}
            />
          </div>
        </div>

        {/* ── SUB LEASE REMARKS ──────────────────────────── */}
        {isSubLease && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Sub Lease
            </h2>
            <TextField
              label="Remarks"
              value={d.subLeaseRemarks}
              onChange={v => onUpdate({ subLeaseRemarks: v })}
              placeholder="Any additional details about the sub-lease arrangement"
            />
          </div>
        )}

      </div>
    </FormPage>
  )
}
