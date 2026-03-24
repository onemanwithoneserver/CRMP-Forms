import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import SelectField from '../../components/inputs/SelectField'

// Shared label + input helper
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44]">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      className="form-input bg-white border-[var(--border)] rounded-[6px] px-2.5 text-[13px] text-[var(--text)] h-[34px] focus:border-[var(--accent-gold)] focus:outline-none transition-all"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}

export default function BuildingInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage title="Building Information" onBack={back} onNext={next}>
      <div className="flex flex-col gap-4 font-['Outfit']">

        {/* Row 1: Building Name – full width */}
        <Field label="Building Name">
          <TextInput value={d.buildingName} onChange={v => onUpdate({ buildingName: v })} placeholder="e.g. Infinity Towers" />
        </Field>

        {/* Row 2: Address – full width */}
        <Field label="Address">
          <TextInput value={d.address} onChange={v => onUpdate({ address: v })} placeholder="Street address or landmark" />
        </Field>

        {/* Row 3: City + Area in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="City">
            <TextInput value={d.city} onChange={v => onUpdate({ city: v })} placeholder="e.g. Mumbai" />
          </Field>
          <Field label="Area / Micro Market">
            <TextInput value={d.area} onChange={v => onUpdate({ area: v })} placeholder="e.g. BKC, Whitefield" />
          </Field>
        </div>

        {/* Row 4: Total Floors + Under Construction in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Total Floors">
            <input
              type="number"
              className="form-input bg-white border-[var(--border)] rounded-[6px] px-2.5 text-[13px] text-[var(--text)] h-[34px] focus:border-[var(--accent-gold)] focus:outline-none transition-all"
              placeholder="e.g. 12"
              value={d.totalFloors}
              onChange={e => onUpdate({ totalFloors: e.target.value })}
            />
          </Field>
          <Field label="Under Construction">
            <div className="h-[34px] flex items-center">
              <SegmentedControl
                compact
                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                value={d.underConstruction || 'No'}
                onChange={v => onUpdate({ underConstruction: v })}
              />
            </div>
          </Field>
        </div>

        {/* Row 5: Lift + Fire Compliance + Ownership in 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Lift Available">
            <div className="h-[34px] flex items-center">
              <SegmentedControl
                compact
                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                value={d.liftAvailable ? 'Yes' : 'No'}
                onChange={v => onUpdate({ liftAvailable: v === 'Yes' })}
              />
            </div>
          </Field>
          <Field label="Fire Compliant">
            <div className="h-[34px] flex items-center">
              <SegmentedControl
                compact
                options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
                value={d.fireCompliant ? 'Yes' : 'No'}
                onChange={v => onUpdate({ fireCompliant: v === 'Yes' })}
              />
            </div>
          </Field>
          <SelectField
            label="Ownership Type"
            value={d.ownershipType}
            onChange={v => onUpdate({ ownershipType: v })}
            options={[
              { value: 'Free Hold', label: 'Free Hold' },
              { value: 'Lease Hold', label: 'Lease Hold' },
              { value: 'Co-operative Society', label: 'Co-operative Society' },
            ]}
          />
        </div>

      </div>

      {state.errors.city && (
        <div style={{ fontSize: '0.75rem', color: '#d32f2f', marginTop: '12px' }}>
          {state.errors.city}
        </div>
      )}
    </FormPage>
  )
}
