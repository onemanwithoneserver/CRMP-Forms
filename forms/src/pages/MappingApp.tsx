import React from 'react'
import { FormProvider, useForm } from '../context/FormContext'
import StepSlider from '../components/navigation/StepSlider'
import FormContainer from '../components/layout/FormContainer'
import SellerView from './SellerView'
import BuyerView from './BuyerView'
import ReviewSubmit from './ReviewSubmit'
import Button from '../components/common/Button'

function Inner() {
  const {state, next, back} = useForm()

  return (
    <div>
      <StepSlider />
      <FormContainer>
        {state.step === 1 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Choose View</h2>
            <div className="flex gap-3">
              <button className="p-4 border rounded-md w-full" onClick={()=>{ /* set role */ (window as any).alert('Use Seller or Buyer view via step UI') }}>Seller View</button>
              <button className="p-4 border rounded-md w-full" onClick={()=>{ (window as any).alert('Use Buyer view via step UI') }}>Buyer View</button>
            </div>
          </div>
        )}

        {state.step === 2 && <SellerView />}
        {state.step === 3 && <BuyerView />}
        {state.step === 4 && <ReviewSubmit />}

        <div className="mt-6 flex justify-between">
          <Button variant="secondary" onClick={back}>Back</Button>
          <Button onClick={next}>Next</Button>
        </div>
      </FormContainer>
    </div>
  )
}

export default function MappingApp(){
  return (
    <FormProvider>
      <Inner />
    </FormProvider>
  )
}
