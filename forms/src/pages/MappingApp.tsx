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
    return (
      <div className="flex items-center justify-center h-screen w-full bg-[#F5F7FA] p-10 text-center font-['Outfit',sans-serif] text-[#667085]">
        <div className="bg-white p-6 rounded border border-[#E4E7EC] shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <strong className="font-bold">Configuration Error:</strong> Component not bound for key:{' '}
          <code className="text-[#C89B3C] font-mono">{currentStepData.key}</code>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F5F7FA] font-['Outfit',sans-serif]">
      {/* Premium Step Navigation Bar */}
      {!state.designStepOverride && (
        <div className="z-50 bg-white py-3 px-4 border-b border-[#E4E7EC] shadow-[0_2px_8px_rgba(15,27,46,0.03)]">
          <div className="max-w-[896px] mx-auto">
            <StepHeader
              steps={steps}
              currentStep={state.step}
              onStepClick={goToStep}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative flex-1 overflow-hidden">
        <StepComponent key={state.step} />
      </div>
    </div>
  )
}