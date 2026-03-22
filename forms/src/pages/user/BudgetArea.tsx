import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import TextField from '../../components/inputs/TextField'
import SectionCard from '../../components/layout/SectionCard'

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
    >
      <div className="flex flex-col gap-4">
        <SectionCard title="Budget Range (₹)">
          <div className="flex gap-3">
            <div style={{ flex: 1 }}>
              <TextField
                label="Min"
                value={formData.budgetMin}
                onChange={v => update({ budgetMin: v })}
                placeholder="e.g. 10,00,000"
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label="Max"
                value={formData.budgetMax}
                onChange={v => update({ budgetMax: v })}
                placeholder="e.g. 50,00,000"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Area Preference (sq ft)">
          <div className="flex gap-3">
            <div style={{ flex: 1 }}>
              <TextField
                label="Min"
                value={formData.areaMin}
                onChange={v => update({ areaMin: v })}
                placeholder="e.g. 500"
                type="number"
              />
            </div>
            <div style={{ flex: 1 }}>
              <TextField
                label="Max"
                value={formData.areaMax}
                onChange={v => update({ areaMax: v })}
                placeholder="e.g. 2000"
                type="number"
              />
            </div>
          </div>
        </SectionCard>
      </div>
    </FormPage>
  )
}
