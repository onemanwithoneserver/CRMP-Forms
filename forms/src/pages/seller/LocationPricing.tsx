import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import TextField from '../../components/inputs/TextField'
import SelectField from '../../components/inputs/SelectField'
import SectionCard from '../../components/layout/SectionCard'

const CITY_OPTIONS = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'pune', label: 'Pune' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
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
    >
      <div className="flex flex-col gap-4">
        <SectionCard title="Location">
          <div className="flex flex-col gap-3">
            <TextField
              label="Address"
              value={formData.address}
              onChange={v => update({ address: v })}
              placeholder="Street address or landmark"
            />
            <SelectField
              label="City"
              value={formData.city}
              onChange={v => update({ city: v })}
              options={CITY_OPTIONS}
              placeholder="Select city"
              error={errors.city}
            />
          </div>
        </SectionCard>

        <SectionCard title="Area & Pricing">
          <div className="flex flex-col gap-3">
            <TextField
              label="Area (sq ft)"
              value={formData.area}
              onChange={v => update({ area: v })}
              placeholder="e.g. 1200"
              type="number"
            />
            <TextField
              label="Price (₹)"
              value={formData.price}
              onChange={v => update({ price: v })}
              placeholder="e.g. 50,00,000"
            />
          </div>
        </SectionCard>
      </div>
    </FormPage>
  )
}
