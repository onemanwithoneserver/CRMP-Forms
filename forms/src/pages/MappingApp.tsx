import React from 'react'
import { useForm } from '../context/FormContext'
import StepHeader from '../components/navigation/StepHeader'

import PostType from './seller/PostType/PostType'
import Review from './seller/Review'

import PropertyType from './seller/PropertyType'
import PropertyDetails from './seller/PropertyDetails'
import BuildingInfo from './seller/PostType/BuildingInfo'
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
      <div 
        style={{ 
          padding: '40px', 
          textAlign: 'center', 
          fontFamily: "'Outfit', sans-serif",
          color: '#667085',
          background: '#F5F7FA',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '4px', border: '1px solid #E4E7EC', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
           <strong>Configuration Error:</strong> Component not bound for key: <code style={{ color: '#C89B3C' }}>{currentStepData.key}</code>
        </div>
      </div>
    )
  }

  return (
    <div 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        overflow: 'hidden', 
        background: '#F5F7FA',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      {/* Premium Step Navigation Bar */}
      {!state.designStepOverride && (
        <div 
          style={{ 
            background: '#FFFFFF', 
            padding: '12px 16px', 
            borderBottom: '1px solid #E4E7EC',
            boxShadow: '0 2px 8px rgba(15, 27, 46, 0.03)',
            zIndex: 50
          }}
        >
          <div style={{ maxWidth: '896px', margin: '0 auto' }}>
            <StepHeader
              steps={steps}
              currentStep={state.step}
              onStepClick={goToStep}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div 
        style={{ 
          flex: 1, 
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <StepComponent key={state.step} />
      </div>
    </div>
  )
}