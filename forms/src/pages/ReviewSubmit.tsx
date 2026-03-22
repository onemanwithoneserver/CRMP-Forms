import React from 'react'
import { useForm } from '../context/FormContext'
import SectionCard from '../components/layout/SectionCard'
import Button from '../components/common/Button'

export default function ReviewSubmit(){
  const {state} = useForm()

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Review & Submit</h2>

      <SectionCard title="Summary">
        <dl className="grid grid-cols-1 gap-2 text-sm">
          <div><strong>Role:</strong> {state.role || '—'}</div>
          <div><strong>Seller Category:</strong> {state.seller?.category || '—'}</div>
          <div><strong>Seller Sub:</strong> {state.seller?.subcategory || '—'}</div>
          <div><strong>Buyer Main:</strong> {state.buyerMapping?.main || '—'}</div>
          <div><strong>Buyer Sub:</strong> {state.buyerMapping?.sub || '—'}</div>
        </dl>
      </SectionCard>

      <div className="mt-4">
        <Button onClick={()=>alert('Submit placeholder — integrate API here')}>Submit</Button>
      </div>
    </div>
  )
}
