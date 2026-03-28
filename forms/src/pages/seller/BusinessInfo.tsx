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
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
      <div className="relative w-full">
        {/* The 'peer' class on the input below allows us to style this prefix when the input is focused using 'peer-focus:' */}
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
            ${suffix ? 'pr-[28px]' : 'pr-[10px]'}
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

export default function BusinessInfo() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage title="Business Information" onBack={back} onNext={next}>
      <div className="max-w-[896px] mx-auto p-6 bg-white rounded border border-[#E4E7EC] shadow-[0_8px_32px_rgba(15,27,46,0.08),0_2px_8px_rgba(15,27,46,0.04)] font-['Outfit',sans-serif]">
        <div className="flex flex-col gap-6">

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <Dropdown
              label="Business Category"
              value={d.businessCategory}
              onChange={v => onUpdate({ businessCategory: v })}
              options={['Hostel / PG', 'Retail', 'Co-Working', 'Gym / Fitness', 'Restaurant / Cafe']}
              placeholder="Select category"
            />
          </div>

          <div className="h-px w-full bg-[#E4E7EC]" />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
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

          <div className="h-px w-full bg-[#E4E7EC]" />

          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
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
      </div>
    </FormPage>
  )
}