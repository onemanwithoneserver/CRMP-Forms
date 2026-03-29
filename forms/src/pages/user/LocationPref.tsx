import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import { MapPin, Map } from 'lucide-react'

// Inline StringField to match the established premium design language
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
      {label && <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>}
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
  'Ahmedabad',
]

export default function LocationPref() {
  const { state, dispatch, next, back } = useForm()
  const { formData, errors } = state

  const update = (payload: Record<string, string>) =>
    dispatch({ type: 'updateData', payload })

  return (
    <FormPage
      title="Location Preference"
      subtitle="Where would you like the property to be?"
      onBack={back}
      onNext={next}
      icon={<MapPin size={20} color="#E6C36A" />}
    >
      <div className="max-w-[896px] mx-auto flex flex-col  font-['Outfit',sans-serif]">
        <SectionCard title="Preferred Location" icon={<Map size={14} />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            <Dropdown
              label="Preferred City"
              value={formData.preferredCity}
              onChange={v => update({ preferredCity: v })}
              options={CITY_OPTIONS}
              placeholder="Select city"
            />
            <StringField
              label="Preferred Locality"
              value={formData.preferredLocality}
              onChange={v => update({ preferredLocality: v })}
              placeholder="e.g. Bandra West, Koramangala"
              error={errors?.preferredLocality}
            />
          </div>
        </SectionCard>
      </div>
    </FormPage>
  )
}