import React, { createContext, useContext, useReducer, ReactNode } from 'react'

/* ─── Step Definitions ─── */
export const getSellerSteps = (data: SellerData) => [
  { key: 'post-type', label: 'Post Type' },
  { key: 'property-type', label: 'Property Type' },
  { key: 'property-details', label: 'Property Details' },
  data.buildingSelection === 'new'
    ? { key: 'building-info', label: 'Building Info' }
    : { key: 'location-pricing', label: 'Location & Pricing' },
  { key: 'review', label: 'Review' },
]

export const USER_STEPS = [
  { key: 'looking-for', label: 'Looking For' },
  { key: 'budget-area', label: 'Budget & Area' },
  { key: 'location-pref', label: 'Location' },
  { key: 'review', label: 'Review' },
] as const

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
export type Role = 'seller' | 'user'

type SellerData = {
  postType: string
  propertyType: string
  includeOperatingBusiness: boolean
  buildingSelection: string
  buildingName: string
  listingType: string
  transactionType: string
  furnishing: string
  propertyAge: string
  address: string
  city: string
  area: string
  price: string
  totalFloors: string
  underConstruction: string // maps to 'Year of Construction' Yes/No in design
  liftAvailable: boolean
  fireCompliant: boolean
  ownershipType: string
}

type UserData = {
  lookingFor: string[]
  budgetMin: string
  budgetMax: string
  areaMin: string
  areaMax: string
  preferredCity: string
  preferredLocality: string
}

type State = {
  role: Role | null
  step: number
  sellerData: SellerData
  userData: UserData
  errors: Record<string, string>
}

type Action =
  | { type: 'setRole'; role: Role }
  | { type: 'next' }
  | { type: 'back' }
  | { type: 'goToStep'; step: number }
  | { type: 'updateSeller'; payload: Partial<SellerData> }
  | { type: 'updateUser'; payload: Partial<UserData> }
  | { type: 'toggleUserLookingFor'; value: string }
  | { type: 'setError'; field: string; message: string }
  | { type: 'clearErrors' }
  | { type: 'reset' }

const initialSellerData: SellerData = {
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
}

const initialUserData: UserData = {
  lookingFor: [],
  budgetMin: '',
  budgetMax: '',
  areaMin: '',
  areaMax: '',
  preferredCity: '',
  preferredLocality: '',
}

const initialState: State = {
  role: null,
  step: 1,
  sellerData: { ...initialSellerData },
  userData: { ...initialUserData },
  errors: {},
}

function getTotalSteps(role: Role | null, sellerData?: SellerData): number {
  if (role === 'seller' && sellerData) return getSellerSteps(sellerData).length
  if (role === 'user') return USER_STEPS.length
  return 0
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setRole':
      return { ...state, role: action.role, step: 1, errors: {} }
    case 'next': {
      const total = getTotalSteps(state.role, state.sellerData)
      return { ...state, step: Math.min(total, state.step + 1), errors: {} }
    }
    case 'back':
      return { ...state, step: Math.max(1, state.step - 1), errors: {} }
    case 'goToStep':
      return { ...state, step: action.step, errors: {} }
    case 'updateSeller':
      return { ...state, sellerData: { ...state.sellerData, ...action.payload }, errors: {} }
    case 'updateUser':
      return { ...state, userData: { ...state.userData, ...action.payload }, errors: {} }
    case 'toggleUserLookingFor': {
      const current = state.userData.lookingFor
      const next = current.includes(action.value)
        ? current.filter(v => v !== action.value)
        : [...current, action.value]
      return { ...state, userData: { ...state.userData, lookingFor: next }, errors: {} }
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
function validateSellerStep(step: number, data: SellerData): Record<string, string> {
  const errors: Record<string, string> = {}
  if (step === 1 && !data.postType) {
    errors.postType = 'Please select what you want to post'
  }
  if (step === 2 && !data.propertyType) {
    errors.propertyType = 'Please select a property type'
  }
  if (step === 3 && !data.buildingSelection) {
    errors.buildingSelection = 'Please select a building option'
  }
  if (step === 4) {
    if (data.buildingSelection === 'new') {
      if (!data.buildingName) errors.buildingName = 'Building name is required'
      if (!data.city) errors.city = 'City is required'
    } else {
      if (!data.city) errors.city = 'City is required'
    }
  }
  return errors
}

function validateUserStep(step: number, data: UserData): Record<string, string> {
  const errors: Record<string, string> = {}
  if (step === 1 && data.lookingFor.length === 0) {
    errors.lookingFor = 'Please select at least one property type'
  }
  if (step === 3) {
    if (!data.preferredCity) errors.preferredCity = 'City is required'
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
  resetToRoleSelection: () => void
}

const FormContext = createContext<ContextValue>({
  state: initialState,
  dispatch: () => null,
  steps: [],
  totalSteps: 0,
  next: () => null,
  back: () => null,
  goToStep: () => null,
  resetToRoleSelection: () => null,
})

export function FormProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const steps = state.role === 'seller' ? getSellerSteps(state.sellerData)
    : state.role === 'user' ? USER_STEPS
    : []

  const totalSteps = getTotalSteps(state.role, state.sellerData)

  const next = () => {
    const errors = state.role === 'seller'
      ? validateSellerStep(state.step, state.sellerData)
      : state.role === 'user'
      ? validateUserStep(state.step, state.userData)
      : {}

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
  const resetToRoleSelection = () => dispatch({ type: 'reset' })

  return (
    <FormContext.Provider value={{ state, dispatch, steps, totalSteps, next, back, goToStep, resetToRoleSelection }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  return useContext(FormContext)
}

export default FormProvider
