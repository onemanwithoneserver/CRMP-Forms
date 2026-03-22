import React from 'react'
import SelectField from '../components/inputs/SelectField'
import SectionCard from '../components/layout/SectionCard'
import { useForm } from '../context/FormContext'

export default function BuyerView(){
  const {state, dispatch} = useForm()

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Buyer Mapping</h2>

      <SectionCard title="Map to Main Category">
        <SelectField label="Main Category" value={state.buyerMapping?.main} options={[{value:'buy',label:'Buy'},{value:'lease',label:'Lease/Rent'},{value:'business',label:'Business Opportunities'}]} onChange={v=>dispatch({type:'updateBuyer', payload:{main:v}})} />
      </SectionCard>

      <SectionCard title="Map to Sub Category">
        <SelectField label="Sub Category" value={state.buyerMapping?.sub} options={[{value:'vacant',label:'Vacant for Sale'},{value:'preleased',label:'Pre-leased'},{value:'fractional',label:'Fractional'}]} onChange={v=>dispatch({type:'updateBuyer', payload:{sub:v}})} />
      </SectionCard>

      <SectionCard title="Secondary Mapping">
        <SelectField label="Secondary" value={state.buyerMapping?.secondary} options={[{value:'none',label:'None'},{value:'opportunities',label:'Business Opportunities'}]} onChange={v=>dispatch({type:'updateBuyer', payload:{secondary:v}})} />
      </SectionCard>
    </div>
  )
}
