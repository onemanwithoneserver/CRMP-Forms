import React from 'react'
import { useForm } from '../context/FormContext'
import StepHeader from '../components/navigation/StepHeader'

import PostType from './seller/PostType/PostType'
import Review from './seller/Review'

import PropertyType from './seller/PropertyType'
import PropertyDetails from './seller/PropertyDetails'
import BuildingInfo from './seller/BuildingInfo'
import LocationPricing from './seller/LocationPricing'

import UnitDetails from './seller/UnitDetails'
import Facilities from './seller/Facilities'
import UnitAvailability from './seller/UnitAvailability'
import LeaseInfo from './seller/LeaseInfo'
import BusinessInfo from './seller/BusinessInfo'
import TransactionDetails from './seller/TransactionDetails'
import UploadPhotos from './seller/UploadPhotos'

import UserLookingFor from './user/LookingFor'
import UserBudgetArea from './user/BudgetArea'
import UserLocationPref from './user/LocationPref'

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  'post-type': PostType,

  'property-type': PropertyType,
  'property-details': PropertyDetails,
  'building-info': BuildingInfo,
  'location-pricing': LocationPricing,
  'unit-details': UnitDetails,
  'facilities': Facilities,
  'unit-availability': UnitAvailability,
  'lease-info': LeaseInfo,
  'business-info': BusinessInfo,
  'transaction-details': TransactionDetails,
  'upload-photos': UploadPhotos,

  'looking-for': UserLookingFor,
  'budget-area': UserBudgetArea,
  'location-pref': UserLocationPref,

  'review': Review,
}

export default function MappingApp() {
  const { state, steps, goToStep } = useForm()
  const { step } = state

  const currentStepData = state.designStepOverride
    ? { key: state.designStepOverride, label: 'Design Preview' }
    : steps[step - 1]

  if (!currentStepData) return null

  const StepComponent = COMPONENT_MAP[currentStepData.key]

  if (!StepComponent) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Component not bound: {currentStepData.key}</div>
  }

  return (
    <div className="flex flex-col h-auto">
      {!state.designStepOverride && (
        <StepHeader
          steps={steps}
          currentStep={state.step}
          onStepClick={goToStep}
        />
      )}

      <div className="flex-1 overflow-hidden">
        <StepComponent key={state.step} />
      </div>
    </div>
  )
}
