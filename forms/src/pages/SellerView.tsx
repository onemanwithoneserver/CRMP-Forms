import React from 'react'
import TextField from '../components/inputs/TextField'
import SelectField from '../components/inputs/SelectField'
import SectionCard from '../components/layout/SectionCard'
import { useForm } from '../context/FormContext'

export default function SellerView(){
  const {state, dispatch} = useForm()

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Seller Inputs</h2>

      <SectionCard title="What do you want to do?">
        <SelectField label="Action" value={state.seller?.category} options={[{value:'sale',label:'Property Sale'},{value:'lease',label:'Lease/Rent'},{value:'running',label:'Running Business'}]} onChange={v=>dispatch({type:'updateSeller', payload:{category:v}})} />
      </SectionCard>

      <SectionCard title="Sub-category">
        <TextField label="Sub-category" value={state.seller?.subcategory} onChange={v=>dispatch({type:'updateSeller', payload:{subcategory:v}})} placeholder="e.g. Vacant, Pre-leased" />
      </SectionCard>
    </div>
  )
}
