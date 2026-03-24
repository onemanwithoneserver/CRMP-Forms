import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import { Dropdown } from '../../components/inputs/Dropdown'

function NumericField({
  label,
  value,
  onChange,
  placeholder,
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
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44]">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-[0.8rem] font-medium pointer-events-none z-10">
            {prefix}
          </span>
        )}
        <input
          type="number"
          className={`form-input bg-white w-full border-[var(--border)] rounded-[6px] text-[13px] text-[var(--text)] h-[34px] focus:border-[var(--accent-gold)] focus:outline-none transition-all ${prefix ? 'pl-6 pr-3' : suffix ? 'pl-3 pr-8' : 'px-3'}`}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        {suffix && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] text-xs font-bold pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

export default function BusinessInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage title="Business Information" onBack={back} onNext={next}>
      <div className="flex flex-col gap-4 font-['Outfit']">

        {/* Row 1: Business Category – takes 1 of 2 cols so it's proportional */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Dropdown
            label="Business Category"
            value={d.businessCategory}
            onChange={v => onUpdate({ businessCategory: v })}
            options={['Hostel / PG', 'Retail', 'Co-Working', 'Gym / Fitness', 'Restaurant / Cafe']}
            placeholder="Select category"
          />
        </div>

        <div className="border-t border-[#edf0f5]" />

        {/* Row 2: Revenue + Expenses in 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <NumericField
            label="Monthly Revenue"
            value={d.monthlyRevenue}
            onChange={v => onUpdate({ monthlyRevenue: v })}
            placeholder="0"
            prefix="₹"
          />
          <NumericField
            label="Monthly Expenses"
            value={d.monthlyExpenses}
            onChange={v => onUpdate({ monthlyExpenses: v })}
            placeholder="0"
            prefix="₹"
          />
        </div>

        {/* Row 3: Occupancy + Escalation + Years in 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <NumericField
            label="Occupancy Rate"
            value={d.occupancyRate}
            onChange={v => onUpdate({ occupancyRate: v })}
            placeholder="0"
            suffix="%"
          />
          <NumericField
            label="Rent Escalation"
            value={d.rentEscalation}
            onChange={v => onUpdate({ rentEscalation: v })}
            placeholder="0"
            suffix="%"
          />
          <NumericField
            label="Years in Operation"
            value={d.yearsInOperation}
            onChange={v => onUpdate({ yearsInOperation: v })}
            placeholder="0"
          />
        </div>

      </div>
    </FormPage>
  )
}
