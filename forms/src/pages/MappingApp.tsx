import React from 'react'
import { useForm } from '../context/FormContext'
import StepHeader from '../components/navigation/StepHeader'

/* ─── Core / Shared Pages ─── */
import PostType from './seller/PostType'
import Review from './seller/Review' // Unified review for now

/* ─── Property & Listing Pages ─── */
import PropertyType from './seller/PropertyType'
import PropertyDetails from './seller/PropertyDetails'
import BuildingInfo from './seller/BuildingInfo'
import LocationPricing from './seller/LocationPricing'

import UnitDetails from './seller/UnitDetails'
import LeaseInfo from './seller/LeaseInfo'
import BusinessInfo from './seller/BusinessInfo'

/* ─── Tenant / Buyer Pages ─── */
import UserLookingFor from './user/LookingFor'
import UserBudgetArea from './user/BudgetArea'
import UserLocationPref from './user/LocationPref'

const COMPONENT_MAP: Record<string, React.ComponentType> = {
  'post-type': PostType,
  
  // Seller / Landlord Specific
  'property-type': PropertyType,
  'property-details': PropertyDetails,
  'building-info': BuildingInfo,
  'location-pricing': LocationPricing,
  'unit-details': UnitDetails,
  'lease-info': LeaseInfo,
  'business-info': BusinessInfo,

  // Tenant / Buyer Specific
  'looking-for': UserLookingFor,
  'budget-area': UserBudgetArea,
  'location-pref': UserLocationPref,

  // Shared
  'review': Review,
}

export default function MappingApp() {
  const { state, steps, goToStep } = useForm()
  const { step } = state

  const currentStepData = steps[step - 1]
  if (!currentStepData) return null

  const StepComponent = COMPONENT_MAP[currentStepData.key]

  if (!StepComponent) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Component not bound: {currentStepData.key}</div>
  }

  return (
    <div className="flex flex-col h-full">
      {/* ─── Step Header ─── */}
      <StepHeader
        steps={steps}
        currentStep={state.step}
        onStepClick={goToStep}
      />

      {/* ─── Step Content ─── */}
      <div className="flex-1 overflow-hidden">
        <StepComponent key={state.step} />
      </div>
    </div>
  )
}
