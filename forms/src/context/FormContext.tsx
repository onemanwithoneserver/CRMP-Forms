import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export type FormData = {
  // Global
  postType: string

  // Property / Building
  propertyType: string
  includeOperatingBusiness: boolean
  buildingSelection: string
  buildingName: string

  // Location & Pricing
  listingType: string
  transactionType: string
  furnishing: string
  propertyAge: string
  address: string
  city: string
  area: string
  price: string
  totalFloors: string
  underConstruction: string
  liftAvailable: boolean
  fireCompliant: boolean
  ownershipType: string
  
  // Unit Details
  unitType: string
  totalBuiltUpArea: string
  numberOfRooms: string
  numberOfBeds: string
  attachedWashrooms: string

  // Lease Information
  monthlyRent: string
  securityDeposit: string
  remainingTenure: string
  leaseExpiryDate: string
  lockInPeriod: string
  isFurnished: string
  powerBackup: string

  // Business Information
  businessCategory: string
  monthlyRevenue: string
  monthlyExpenses: string
  occupancyRate: string
  yearsInOperation: string
  rentEscalation: string

  // Tenant / Buyer Specific (User Flow)
  lookingFor: string[]
  budgetMin: string
  budgetMax: string
  areaMin: string
  areaMax: string
  preferredCity: string
  preferredLocality: string
}

export const getDynamicSteps = (data: FormData) => {
  const steps = [
    { key: 'post-type', label: 'Post Type' }
  ]

  const post = data.postType

  if (post === 'rent_property') {
    steps.push({ key: 'looking-for', label: 'Looking For' })
    steps.push({ key: 'budget-area', label: 'Budget & Area' })
    steps.push({ key: 'location-pref', label: 'Location' })
  } else {
    // Seller/Landlord flows
    steps.push({ key: 'property-type', label: 'Property Type' })
    steps.push({ key: 'property-details', label: 'Building Selection' })
    
    if (data.buildingSelection === 'new') {
      steps.push({ key: 'building-info', label: 'Building Info' })
    } else {
      steps.push({ key: 'location-pricing', label: 'Location & Pricing' })
    }

    if (post === 'sell_property') {
      steps.push({ key: 'unit-details', label: 'Unit Details' })
      if (data.includeOperatingBusiness) {
        steps.push({ key: 'business-info', label: 'Business Information' })
      }
    } else if (post === 'lease_property') {
      steps.push({ key: 'unit-details', label: 'Unit Details' })
      steps.push({ key: 'lease-info', label: 'Lease Information' })
      if (data.includeOperatingBusiness) {
        steps.push({ key: 'business-info', label: 'Business Information' })
      }
    } else if (post === 'sell_business') {
      steps.push({ key: 'business-info', label: 'Business Information' })
    } else {
      steps.push({ key: 'unit-details', label: 'Unit Details' })
    }
  }

  steps.push({ key: 'review', label: 'Review' })
  return steps
}

/* ─── Options Data ─── */
export const SELLER_POST_TYPES = [
  { value: 'sell_property', label: 'Sell Property', description: 'List a residential or commercial asset for direct purchase.' },
  { value: 'lease_property', label: 'Lease property', description: 'Find long-term tenants for your managed spaces.' },
  { value: 'sell_business', label: 'Sell Operating Business', description: 'List a residential or commercial asset for direct purchase.' },
  { value: 'rent_property', label: 'Rent property', description: 'Short-term vacation rentals or seasonal stays.' },
] as const

export const PROPERTY_TYPES = [
  { value: 'office', label: 'Office Space', icon: 'office' },
  { value: 'retail', label: 'Rental / Commercial Space', icon: 'retail' },
  { value: 'hostel', label: 'Hostel /PG', icon: 'hostel' },
  { value: 'land', label: 'Land', icon: 'land' },
  { value: 'coworking', label: 'Co-Working', icon: 'coworking' },
] as const

export const LISTING_TYPES = [
  { value: 'sale', label: 'Sale' },
  { value: 'lease', label: 'Lease / Rent' },
  { value: 'pg', label: 'PG / Hostel' },
] as const

export const TRANSACTION_TYPES = [
  { value: 'fresh', label: 'Fresh Property' },
  { value: 'resale', label: 'Resale' },
] as const

export const FURNISHING_OPTIONS = [
  { value: 'fully', label: 'Fully Furnished' },
  { value: 'semi', label: 'Semi-Furnished' },
  { value: 'unfurnished', label: 'Unfurnished' },
] as const

export const PROPERTY_AGE_OPTIONS = [
  { value: 'under-construction', label: 'Under Construction' },
  { value: 'less-1', label: 'Less than 1 Year' },
  { value: '1-5', label: '1 – 5 Years' },
  { value: '5-10', label: '5 – 10 Years' },
  { value: '10+', label: '10+ Years' },
] as const

export const USER_PROPERTY_TYPES = [
  { value: 'office', label: 'Office Space' },
  { value: 'retail', label: 'Retail / Commercial' },
  { value: 'hostel', label: 'Hostel / PG' },
  { value: 'land', label: 'Land' },
  { value: 'coworking', label: 'Co-Working' },
  { value: 'warehouse', label: 'Warehouse' },
] as const

/* ─── State ─── */
const initialFormData: FormData = {
  postType: '',
  propertyType: '',
  includeOperatingBusiness: false,
  buildingSelection: '',
  buildingName: '',
  listingType: '',
  transactionType: '',
  furnishing: '',
  propertyAge: '',
  address: '',
  city: '',
  area: '',
  price: '',
  totalFloors: '',
  underConstruction: 'No',
  liftAvailable: true,
  fireCompliant: true,
  ownershipType: 'Free Hold',

  unitType: 'Entire Building',
  totalBuiltUpArea: '',
  numberOfRooms: '',
  numberOfBeds: '',
  attachedWashrooms: 'No',

  monthlyRent: '',
  securityDeposit: '',
  remainingTenure: '',
  leaseExpiryDate: '',
  lockInPeriod: '',
  isFurnished: 'No',
  powerBackup: 'No',

  businessCategory: 'Hostel / PG',
  monthlyRevenue: '',
  monthlyExpenses: '',
  occupancyRate: '',
  yearsInOperation: '',
  rentEscalation: '',

  lookingFor: [],
  budgetMin: '',
  budgetMax: '',
  areaMin: '',
  areaMax: '',
  preferredCity: '',
  preferredLocality: '',
}

type State = {
  step: number
  formData: FormData
  errors: Record<string, string>
}

type Action =
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'goToStep'; step: number }
  | { type: 'updateData'; payload: Partial<FormData> }
  | { type: 'toggleLookingFor'; value: string }
  | { type: 'setError'; field: string; message: string }
  | { type: 'clearErrors' }
  | { type: 'reset' }

const initialState: State = {
  step: 1,
  formData: { ...initialFormData },
  errors: {},
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'next': {
      const total = getDynamicSteps(state.formData).length
      return { ...state, step: Math.min(total, state.step + 1), errors: {} }
    }
    case 'back':
      return { ...state, step: Math.max(1, state.step - 1), errors: {} }
    case 'goToStep':
      return { ...state, step: action.step, errors: {} }
    case 'updateData':
      return { ...state, formData: { ...state.formData, ...action.payload }, errors: {} }
    case 'toggleLookingFor': {
      const current = state.formData.lookingFor
      const next = current.includes(action.value)
        ? current.filter(v => v !== action.value)
        : [...current, action.value]
      return { ...state, formData: { ...state.formData, lookingFor: next }, errors: {} }
    }
    case 'setError':
      return { ...state, errors: { ...state.errors, [action.field]: action.message } }
    case 'clearErrors':
      return { ...state, errors: {} }
    case 'reset':
      return { ...initialState }
    default:
      return state
  }
}

/* ─── Validation ─── */
function validateStep(step: number, data: FormData): Record<string, string> {
  const errors: Record<string, string> = {}
  if (step === 1 && !data.postType) {
    errors.postType = 'Please select what you want to post'
  }
  return errors
}

/* ─── Context ─── */
type ContextValue = {
  state: State
  dispatch: React.Dispatch<Action>
  steps: readonly { key: string; label: string }[]
  totalSteps: number
  next: () => void
  back: () => void
  goToStep: (step: number) => void
  resetToStart: () => void
}

const FormContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => null,
  steps: [],
  totalSteps: 0,
  next: () => null,
  back: () => null,
  goToStep: () => null,
  resetToStart: () => null,
})

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const steps = getDynamicSteps(state.formData)
  const totalSteps = steps.length

  const next = () => {
    const errors = validateStep(state.step, state.formData)

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        dispatch({ type: 'setError', field, message })
      })
      return
    }
    dispatch({ type: 'next' })
  }

  const back = () => dispatch({ type: 'back' })
  const goToStep = (step: number) => dispatch({ type: 'goToStep', step })
  const resetToStart = () => dispatch({ type: 'reset' })

  return (
    <FormContext.Provider value={{ state, dispatch, steps, totalSteps, next, back, goToStep, resetToStart }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  return useContext(FormContext)
}

export default FormProvider
