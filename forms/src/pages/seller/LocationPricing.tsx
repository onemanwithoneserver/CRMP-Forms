import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import { MapPin, Calculator } from 'lucide-react'

// Reuse the NumericField from BusinessInfo for premium numbers
function NumericField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
      <div className="relative w-full">
        {prefix && (
          <span 
            className={`absolute left-[10px] top-1/2 -translate-y-1/2 text-[0.85rem] font-semibold pointer-events-none z-10 transition-colors duration-250 ease ${
              error ? 'text-[#EF4444]' : 'text-[#667085] peer-focus:text-[#C89B3C]'
            }`}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            peer w-full h-[34px] py-0 text-[0.85rem] font-medium text-[#1C2A44] rounded-[3px] outline-none box-border
            transition-all duration-250 ease-in-out border
            ${prefix ? 'pl-[24px]' : 'pl-[10px]'}
            ${suffix ? 'pr-[28px]' : 'pr-[10px]'}
            ${error 
              ? 'bg-white border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
              : 'bg-[#F5F7FA] border-[#E4E7EC] hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]'
            }
          `}
        />
        {suffix && (
          <span 
            className={`absolute right-[10px] top-1/2 -translate-y-1/2 text-[0.8rem] font-semibold pointer-events-none z-10 transition-colors duration-250 ease ${
              error ? 'text-[#EF4444]' : 'text-[#667085] peer-focus:text-[#C89B3C]'
            }`}
          >
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <span className="text-[0.75rem] font-medium text-[#EF4444]">{error}</span>
      )}
    </div>
  )
}

// Inline TextField for string inputs to match the established design language
function StringField({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: string
}) {
  return (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full h-[34px] px-[10px] text-[0.85rem] font-medium text-[#1C2A44] rounded-[3px] outline-none box-border
          transition-all duration-250 ease-in-out border
          ${error 
            ? 'bg-white border-[#EF4444] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' 
            : 'bg-[#F5F7FA] border-[#E4E7EC] hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]'
          }
        `}
      />
      {error && (
        <span className="text-[0.75rem] font-medium text-[#EF4444]">{error}</span>
      )}
    </div>
  )
}

const CITY_OPTIONS = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Ahmedabad'
]

export default function LocationPricing() {
  const { state, dispatch, next, back } = useForm()
  const { formData, errors } = state

  const update = (payload: Record<string, string>) =>
    dispatch({ type: 'updateData', payload })

  return (
    <FormPage
      title="Location & Pricing"
      subtitle="Where is the property and what's the asking price?"
      onBack={back}
      onNext={next}
      icon={<MapPin size={20} color="#E6C36A" />}
    >
      <div className="max-w-[896px] mx-auto flex flex-col gap-4 font-['Outfit',sans-serif]">
        
        <SectionCard title="Location Details" icon={<MapPin size={14} />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <StringField
              label="Address"
              value={formData.address}
              onChange={v => update({ address: v })}
              placeholder="Street address or landmark"
              error={errors.address}
            />
            <Dropdown
              label="City"
              value={formData.city}
              onChange={v => update({ city: v })}
              options={CITY_OPTIONS}
              placeholder="Select city"
            />
          </div>
        </SectionCard>

        <SectionCard title="Area & Pricing" icon={<Calculator size={14} />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <NumericField
              label="Area"
              value={formData.area}
              onChange={v => update({ area: v })}
              placeholder="0"
              suffix="sq ft"
              error={errors.area}
            />
            <NumericField
              label="Asking Price"
              value={formData.price}
              onChange={v => update({ price: v })}
              placeholder="0"
              prefix="₹"
              error={errors.price}
            />
          </div>
        </SectionCard>

      </div>
    </FormPage>
  )
}