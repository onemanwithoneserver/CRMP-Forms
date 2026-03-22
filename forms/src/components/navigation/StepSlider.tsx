import React from 'react'
import {useForm} from '../../context/FormContext'
import StepIndicator from './StepIndicator'
import ProgressBar from './ProgressBar'

export default function StepSlider(){
  const {state, dispatch} = useForm()
  const steps = [
    'Choose Role',
    'Seller Inputs',
    'Buyer Mapping',
    'Review & Submit'
  ]

  const progress = Math.round(((state.step - 1) / (state.totalSteps - 1)) * 100)

  return (
    <div className="mb-4">
      <div className="md:flex md:items-center md:gap-6 hidden">
        {steps.map((s, i) => (
          <div key={s} onClick={() => dispatch({type: 'setStep', step: i+1})} className="cursor-pointer">
            <StepIndicator index={i+1} label={s} active={state.step===i+1} completed={state.step>i+1} />
          </div>
        ))}
      </div>

      <div className="md:hidden">
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-medium">Step {state.step} of {state.totalSteps}</div>
        </div>
        <ProgressBar progress={progress} />
      </div>
    </div>
  )
}
