import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Wallet, Banknote, Ruler } from 'lucide-react'

// Reusable numeric field with independent hover states and prefix/suffix support
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
            ${suffix ? 'pr-[44px]' : 'pr-[10px]'}
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

export default function BudgetArea() {
  const { state, dispatch, next, back } = useForm()
  const { formData } = state

  const update = (payload: Record<string, string>) =>
    dispatch({ type: 'updateData', payload })

  return (
    <FormPage
      title="Budget & Area"
      subtitle="Set your budget range and area preferences"
      onBack={back}
      onNext={next}
      icon={<Wallet size={20} color="#E6C36A" />}
    >
      <div className="max-w-[896px] mx-auto flex flex-col gap-4 font-['Outfit',sans-serif]">
        
        <SectionCard title="Budget Range" icon={<Banknote size={14} />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <NumericField
              label="Minimum Budget"
              value={formData.budgetMin}
              onChange={v => update({ budgetMin: v })}
              placeholder="e.g. 1000000"
              prefix="₹"
            />
            <NumericField
              label="Maximum Budget"
              value={formData.budgetMax}
              onChange={v => update({ budgetMax: v })}
              placeholder="e.g. 5000000"
              prefix="₹"
            />
          </div>
        </SectionCard>

        <SectionCard title="Area Preference" icon={<Ruler size={14} />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            <NumericField
              label="Minimum Area"
              value={formData.areaMin}
              onChange={v => update({ areaMin: v })}
              placeholder="e.g. 500"
              suffix="sq ft"
            />
            <NumericField
              label="Maximum Area"
              value={formData.areaMax}
              onChange={v => update({ areaMax: v })}
              placeholder="e.g. 2000"
              suffix="sq ft"
            />
          </div>
        </SectionCard>

      </div>
    </FormPage>
  )
}