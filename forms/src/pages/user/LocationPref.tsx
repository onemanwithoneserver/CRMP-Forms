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

export default function LocationPref() {
  const { state, dispatch, next, back } = useForm()
  const { userData, errors } = state

  const update = (payload: Record<string, string>) =>
    dispatch({ type: 'updateUser', payload })

  return (
    <FormPage
      title="Location Preference"
      subtitle="Where would you like the property to be?"
      onBack={back}
      onNext={next}
    >
      <SectionCard title="Preferred Location">
        <div className="flex flex-col gap-3">
          <SelectField
            label="Preferred City"
            value={userData.preferredCity}
            onChange={v => update({ preferredCity: v })}
            options={CITY_OPTIONS}
            placeholder="Select city"
            error={errors.preferredCity}
          />
          <TextField
            label="Preferred Locality"
            value={userData.preferredLocality}
            onChange={v => update({ preferredLocality: v })}
            placeholder="e.g. Bandra West, Koramangala"
          />
        </div>
      </SectionCard>
    </FormPage>
  )
}
