import React from 'react'
import { useForm } from '../context/FormContext'
import StepHeader from '../components/navigation/StepHeader'
import RoleSelection from './RoleSelection'

/* ─── Seller Pages ─── */
import SellerPostType from './seller/PostType'
import SellerPropertyType from './seller/PropertyType'
import SellerPropertyDetails from './seller/PropertyDetails'
import SellerBuildingInfo from './seller/BuildingInfo'
import SellerLocationPricing from './seller/LocationPricing'
import SellerReview from './seller/Review'

/* ─── User Pages ─── */
import UserLookingFor from './user/LookingFor'
import UserBudgetArea from './user/BudgetArea'
import UserLocationPref from './user/LocationPref'
import UserReview from './user/Review'

const USER_PAGES = [UserLookingFor, UserBudgetArea, UserLocationPref, UserReview]

export default function MappingApp() {
  const { state, steps, goToStep } = useForm()
  const { role, step, sellerData } = state

  /* ─── No role selected → show role picker ─── */
  if (!role) {
    return <RoleSelection />
  }

  /* ─── Role selected → show step flow ─── */
  // Select the appropriate component based on role and step
  let StepComponent: React.ComponentType | null = null

  if (role === 'seller') {
    const pages = [
      SellerPostType,
      SellerPropertyType,
      SellerPropertyDetails,
      sellerData.buildingSelection === 'new' ? SellerBuildingInfo : SellerLocationPricing,
      SellerReview
    ]
    StepComponent = pages[step - 1]
  } else if (role === 'user') {
    StepComponent = USER_PAGES[step - 1]
  }

  if (!StepComponent) return null

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
