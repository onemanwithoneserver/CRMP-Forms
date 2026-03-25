import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export type FormData = {
  // Global
  postType: string
  postSubCategory: string

  // Property / Building
  propertyType: string
  buildingSelection: string
  buildingName: string

  // Location & Pricing
  country: string
  state: string
  city: string
  district: string
  circle: string
  location: string
  microLocation: string
  zone: string
  corporation: string
  orrZoning: string
  colonyLayout: string
  buildingType: string
  googleLocation: string
  latitude: string
  longitude: string
  pincode: string
  nearestOrrExits: string
  listingType: string
  transactionType: string
  furnishing: string
  propertyAge: string
  address: string
  area: string
  price: string
  totalFloors: string
  underConstruction: string
  liftAvailable: boolean
  fireCompliant: boolean
  ownershipType: string

  // Transaction Setup
  askingPriceTotal: string
  askingPriceMonthly: string
  propertyOwnership: string
  transactionDetails: string
  pricePerSqFt: string
  additionalNotes: string
  additionalCharges: string
  expectedRentalYield: string
  existingMonthlyRent: string
  existingLeaseTenure: string
  existingLeaseTenureUnit: string
  rentEscalationEvery: string
  rentEscalationEveryUnit: string
  existingTenantCompany: string
  tenantCategory: string
  minimumSqFt: string
  assuredMonthlyRent: string
  annualYield: string
  isPreLeased: string
  fractionalRemarks: string

  // Unit Availability
  isImmediatelyAvailable: string
  tentativeMonth: string
  unitNo: string
  numberOfUnitsAvailable: string

  // Uploads
  photosUploaded: boolean

  // Unit Details
  totalBuiltUpArea: string
  numberOfRooms: string
  numberOfBeds: string
  attachedWashrooms: string
  plotSize: string
  unitFacing: string
  plotDimensions: string
  layoutDimensionsLength: string
  layoutDimensionsBreadth: string
  carpetArea: string
  floor: string
  idealFor: string
  cornerUnit: boolean
  frontage: string
  ceilingHeight: string
  spaceCondition: string
  glassFacade: boolean
  flooring: string
  walls: string
  electricals: string
  hvac: string
  lighting: string
  compoundWall: boolean
  waterConnection: boolean
  partitionsType: string
  externalBranding: string
  meetingRooms: string
  conferenceRoom: boolean
  receptionArea: boolean
  brandingSpace: boolean
  falseCeiling: boolean
  storageSpace: string
  columnFree: boolean
  workstations: string
  chairs: string
  storageCupboards: boolean
  sofaLounge: boolean
  receptionDesk: boolean
  pantryEquipment: boolean
  appliances: string[]
  appliancesOthers: string

  // Facilities
  designatedParking: string
  noOfParkings: string
  visitorParking: string
  powerLoad: string
  powerPhase: string
  washrooms: string
  fireSprinklers: string
  fireExtinguishers: string

  // Lease Information
  monthlyRent: string
  leaseSubType: string
  rentPricingMode: string
  advanceDeposit: string
  maintenanceCharges: string
  tenantIndustry: string
  subLeaseRemarks: string
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
  } else if (post) {
    // Seller/Landlord flows
    steps.push({ key: 'unit-details', label: 'Unit details' })
    steps.push({ key: 'facilities', label: 'Facilities' })
    steps.push({ key: 'upload-photos', label: 'Media' })
    
    if (post === 'Lease/Rent Property') {
      steps.push({ key: 'lease-info', label: 'Lease Information' })
    } else if (post === 'Running Business') {
      steps.push({ key: 'business-info', label: 'Business Info' })
      steps.push({ key: 'transaction-details', label: 'Transactional Details' })
    } else {
      steps.push({ key: 'transaction-details', label: 'Transactional Details' })
    }
  }

  steps.push({ key: 'review', label: 'Review' })
  return steps
}

/* ─── Options Data ─── */
export const SELLER_POST_TYPES = [
  { value: 'Property Sale', label: 'Sell Property' },
  { value: 'Lease/Rent Property', label: 'Lease/Rent Property' },
  { value: 'Offer Franchise', label: 'Offer Franchisee' },
  { value: 'Running Business', label: 'Sell/Lease Running Business' },
] as const

export const SELLER_SUB_CATEGORIES: Record<string, string[]> = {
  'Property Sale': ['Vacant Space', 'Pre-Leased', 'Fractional'],
  'Lease/Rent Property': ['Full Lease', 'Sub Lease'],
}

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
  { value: 'office', label: 'Office Space', icon: 'office' },
  { value: 'retail', label: 'Retail / Commercial', icon: 'retail' },
  { value: 'hostel', label: 'Hostel / PG', icon: 'hostel' },
  { value: 'land', label: 'Land', icon: 'land' },
  { value: 'coworking', label: 'Co-Working', icon: 'coworking' },
  { value: 'warehouse', label: 'Warehouse', icon: 'warehouse' },
] as const

/* ─── State ─── */
const initialFormData: FormData = {
  postType: '',
  postSubCategory: '',
  propertyType: '',
  buildingSelection: '',
  buildingName: '',
  country: 'India',
  state: '',
  city: '',
  district: '',
  circle: '',
  location: '',
  microLocation: '',
  zone: '',
  corporation: '',
  orrZoning: '',
  colonyLayout: '',
  buildingType: '',
  googleLocation: '',
  latitude: '',
  longitude: '',
  pincode: '',
  nearestOrrExits: '',
  listingType: '',
  transactionType: '',
  furnishing: '',
  propertyAge: '',
  address: '',
  area: '',
  price: '',
  totalFloors: '',
  underConstruction: 'No',
  liftAvailable: true,
  fireCompliant: true,
  ownershipType: 'Free Hold',

  isImmediatelyAvailable: 'Yes',
  tentativeMonth: '',
  unitNo: '',
  numberOfUnitsAvailable: '',

  photosUploaded: false,

  totalBuiltUpArea: '',
  numberOfRooms: '',
  numberOfBeds: '',
  attachedWashrooms: 'No',
  plotSize: '',
  unitFacing: '',
  plotDimensions: '',
  layoutDimensionsLength: '',
  layoutDimensionsBreadth: '',
  carpetArea: '',
  floor: '',
  idealFor: '',
  cornerUnit: false,
  frontage: '',
  ceilingHeight: '',
  spaceCondition: '',
  glassFacade: false,
  flooring: '',
  walls: '',
  electricals: '',
  hvac: '',
  lighting: '',
  compoundWall: false,
  waterConnection: false,
  partitionsType: '',
  externalBranding: '',
  meetingRooms: '',
  conferenceRoom: false,
  receptionArea: false,
  brandingSpace: false,
  falseCeiling: false,
  storageSpace: '',
  columnFree: false,
  workstations: '',
  chairs: '',
  storageCupboards: false,
  sofaLounge: false,
  receptionDesk: false,
  pantryEquipment: false,
  appliances: [],
  appliancesOthers: '',

  designatedParking: 'No',
  noOfParkings: '',
  visitorParking: 'No',
  powerLoad: '',
  powerPhase: 'Single',
  washrooms: 'No',
  fireSprinklers: 'No',
  fireExtinguishers: 'No',

  askingPriceTotal: '',
  askingPriceMonthly: '',
  propertyOwnership: '',
  transactionDetails: '',
  pricePerSqFt: '',
  additionalNotes: '',
  additionalCharges: '',
  expectedRentalYield: '',
  existingMonthlyRent: '',
  existingLeaseTenure: '',
  existingLeaseTenureUnit: 'Months',
  rentEscalationEvery: '',
  rentEscalationEveryUnit: 'Months',
  existingTenantCompany: '',
  tenantCategory: '',
  minimumSqFt: '',
  assuredMonthlyRent: '',
  annualYield: '',
  isPreLeased: 'No',
  fractionalRemarks: '',
  monthlyRent: '',
  leaseSubType: 'Full Lease',
  rentPricingMode: 'Fixed Amount',
  advanceDeposit: '',
  maintenanceCharges: '',
  tenantIndustry: '',
  subLeaseRemarks: '',
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
  designStepOverride: string | null
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
  | { type: 'setDesignOverride'; key: string | null }

const initialState: State = {
  step: 1,
  formData: { ...initialFormData },
  errors: {},
  designStepOverride: null,
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
    case 'setDesignOverride':
      return { ...state, designStepOverride: action.key }
    default:
      return state
  }
}

/* ─── Validation ─── */
function validateStep(step: number, data: FormData): Record<string, string> {
  const errors: Record<string, string> = {}
  
  const stepsList = getDynamicSteps(data)
  const currentStepKey = stepsList[step - 1]?.key

  if (currentStepKey === 'post-type') {
    if (!data.propertyType) {
      errors.propertyType = 'Please select a property type'
    } else if (!data.postType) {
      errors.postType = 'Please select what you want to do'
    } else if (SELLER_SUB_CATEGORIES[data.postType] && !data.postSubCategory) {
      errors.postType = 'Please select a sub-category to proceed'
    }
  }

  if (currentStepKey === 'unit-details') {
    const pType = data.propertyType || 'office'
    const isBuiltSpace = pType !== 'land'

    if (['land', 'entire_building'].includes(pType)) {
      if (!data.plotSize) errors.plotSize = 'Plot size is required'
    }
    
    if (isBuiltSpace) {
      if (!data.totalBuiltUpArea) errors.totalBuiltUpArea = 'Built up area is required'
    }
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
