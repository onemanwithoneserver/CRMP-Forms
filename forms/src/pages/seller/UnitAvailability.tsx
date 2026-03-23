import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import TextField from '../../components/inputs/TextField'

import iconOffice from '../../assets/Select Property Type/Office Space.svg'
import iconRetail from '../../assets/Select Property Type/Rental  Commercial Space.svg'
import iconHostel from '../../assets/Select Property Type/Hostel.svg'
import iconLand from '../../assets/Select Property Type/Land.svg'
import iconCoworking from '../../assets/Select Property Type/Co-Working.svg'

const PROPERTY_TYPE_OPTIONS = [
  { value: 'office',    label: 'Office Space',              icon: iconOffice },
  { value: 'retail',    label: 'Rental / Commercial Space', icon: iconRetail },
  { value: 'hostel',    label: 'Hostel / PG',               icon: iconHostel },
  { value: 'land',      label: 'Land',                      icon: iconLand },
  { value: 'coworking', label: 'Co-Working',                icon: iconCoworking },
]

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CURRENT_YEAR = new Date().getFullYear()
const MONTHS_OPTIONS = MONTHS.flatMap(m =>
  [CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2].map(y => `${m} ${y}`)
)

export default function UnitAvailability() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'

  // Based on the table:
  // isImmediatelyAvailable — all property types
  // tentativeMonth         — all property types (shown only if not immediately available)
  // unitNo                 — Land, Retail, Office, Coworking (NOT Building/entire_building)
  // numberOfUnitsAvailable — Land: Single/Multiple | Retail/Office/Coworking: numeric | Building: hidden

  const showUnitNo            = ['land', 'retail', 'office', 'coworking'].includes(pType)
  const showUnitsCount        = ['retail', 'office', 'coworking'].includes(pType)
  const showUnitsLandMode     = pType === 'land'
  const isNotImmediatelyAvail = d.isImmediatelyAvailable === 'No'

  const renderYesNo = (label: string, field: keyof typeof state.formData) => (
    <div className="flex items-center justify-between py-1 bg-white border border-[#edf0f5] px-3.5 rounded-lg">
      <span className="text-[13.5px] font-medium text-[#1C2A44]">{label}</span>
      <div className="w-[110px]">
        <SegmentedControl
          options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
          value={d[field] as string}
          onChange={v => onUpdate({ [field]: v })}
        />
      </div>
    </div>
  )

  return (
    <FormPage title="Unit Availability" onBack={back} onNext={next}>
      <div className="flex flex-col gap-5 sm:gap-6 font-['Outfit'] pb-6">

        {/* PROPERTY TYPE SELECTOR */}
        <SectionCard title="Property Type">
          <div className="flex flex-col gap-4">
            {PROPERTY_TYPE_OPTIONS.map(option => {
              const selected = d.propertyType === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  className={`selection-card ${selected ? 'selected' : ''}`}
                  onClick={() => onUpdate({ propertyType: option.value })}
                  aria-pressed={selected}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.04)',
                    padding: '18px 20px',
                    gap: '16px',
                  }}
                >
                  <div className={`radio-circle ${selected ? 'active' : ''}`} style={{ marginTop: 0 }} />
                  <div style={{ flex: 1, fontSize: '1rem', fontWeight: 800, color: 'var(--text)', textAlign: 'left' }}>
                    {option.label}
                  </div>
                  {option.icon && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
                      <img src={option.icon} alt={option.label} style={{ width: '100%', height: 'auto', opacity: 0.9 }} />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </SectionCard>

        {/* AVAILABILITY */}
        <SectionCard title="Availability">
          <div className="flex flex-col gap-4">
            {renderYesNo('Is it immediately available?', 'isImmediatelyAvailable')}

            {isNotImmediatelyAvail && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-[#445069] pl-0.5">
                  Tentative Available Month
                </label>
                <select
                  className="form-input bg-white w-full border border-[#e2e6ec] focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C]/50 rounded-[6px] py-2.5 px-3 text-sm text-[#1C2A44] transition-all"
                  value={d.tentativeMonth}
                  onChange={e => onUpdate({ tentativeMonth: e.target.value })}
                >
                  <option value="">Select month</option>
                  {MONTHS_OPTIONS.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </SectionCard>

        {/* UNIT DETAILS */}
        {(showUnitNo || showUnitsCount || showUnitsLandMode) && (
          <SectionCard title="Unit Information">
            <div className="flex flex-col gap-4">

              {showUnitNo && (
                <TextField
                  label="Unit No. (If any)"
                  value={d.unitNo}
                  onChange={v => onUpdate({ unitNo: v })}
                  placeholder="e.g. A-204, Shop 12"
                />
              )}

              {/* Land: Single / Multiple toggle */}
              {showUnitsLandMode && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#445069] pl-0.5">
                    No. of Units Available
                  </label>
                  <div className="w-full">
                    <SegmentedControl
                      options={[
                        { label: 'Single', value: 'Single' },
                        { label: 'Multiple', value: 'Multiple' },
                      ]}
                      value={d.numberOfUnitsAvailable || 'Single'}
                      onChange={v => onUpdate({ numberOfUnitsAvailable: v })}
                    />
                  </div>
                </div>
              )}

              {/* Retail / Office / Coworking: numeric count */}
              {showUnitsCount && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-[#445069] pl-0.5">
                    No. of Units Available
                  </label>
                  <input
                    type="number"
                    min={1}
                    className="form-input bg-white w-full border border-[#e2e6ec] focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C]/50 rounded-[6px] py-2.5 px-3 text-sm text-[#1C2A44] transition-all"
                    placeholder="e.g. 3"
                    value={d.numberOfUnitsAvailable}
                    onChange={e => onUpdate({ numberOfUnitsAvailable: e.target.value })}
                  />
                </div>
              )}

            </div>
          </SectionCard>
        )}

      </div>
    </FormPage>
  )
}
