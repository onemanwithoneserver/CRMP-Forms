import React, { useState, useRef, useEffect } from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import SelectField from '../../components/inputs/SelectField'

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
  </svg>
)
const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
)
const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
)
const LocationIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const BuildingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 22V12h6v10M3 9h18M3 15h18" />
  </svg>
)
const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)
const XIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const MapPinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

// ─── Building types ───────────────────────────────────────────────────────────
const BUILDING_TYPES = [
  { value: 'independent_commercial', label: 'Independent Commercial Building' },
  { value: 'semi_commercial',        label: 'Semi-Commercial / Residential' },
  { value: 'commercial_complex',     label: 'Commercial Complex' },
  { value: 'mall_retail',            label: 'Mall (Retail only)' },
  { value: 'mall_office',            label: 'Mall with Office' },
  { value: 'pure_office',            label: 'Pure Office Building' },
  { value: 'industrial',             label: 'Industrial / Warehouse Facility' },
  { value: 'institutional',          label: 'Institutional Building' },
  { value: 'institutional_mixed',    label: 'Institutional Mixed-Use Building' },
  { value: 'temporary',             label: 'Temporary Commercial Structure' },
]

// ─── Mock existing buildings ──────────────────────────────────────────────────
const MOCK_BUILDINGS = [
  { id: '1', name: 'Infinity Towers', type: 'pure_office',          address: 'BKC, Mumbai' },
  { id: '2', name: 'Phoenix Market City', type: 'mall_retail',      address: 'Whitefield, Bangalore' },
  { id: '3', name: 'DLF Cyber City', type: 'commercial_complex',    address: 'Gurgaon, Haryana' },
  { id: '4', name: 'Prestige Trade Tower', type: 'pure_office',     address: 'Cubbon Park, Bangalore' },
  { id: '5', name: 'Oberoi Commerz', type: 'commercial_complex',    address: 'Goregaon, Mumbai' },
]

// ─── Field status map (M = mandatory, O = optional, N = not required) ─────────
type Status = 'M' | 'O' | 'N'
type BType  = 'independent_commercial'|'semi_commercial'|'commercial_complex'|'mall_retail'|'mall_office'|'pure_office'|'industrial'|'institutional'|'institutional_mixed'|'temporary'

const ALL: Record<BType, Status> = {
  independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'M',
}
const FIELD_STATUS: Record<string, Record<BType, Status>> = {
  // Location
  buildingName:         ALL,
  address:              ALL,
  // Basic Essentials
  established:          { independent_commercial:'O',semi_commercial:'O',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'O',institutional:'M',institutional_mixed:'M',temporary:'O' },
  yearOfConstruction:   { independent_commercial:'O',semi_commercial:'O',commercial_complex:'O',mall_retail:'O',mall_office:'O',pure_office:'O',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'O' },
  totalFloors:          { independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'O' },
  basement:             { independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'N' },
  totalBuiltUpArea:     ALL,
  landArea:             { independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'O' },
  totalParking:         { independent_commercial:'O',semi_commercial:'O',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'N' },
  // Parking
  basementParking:      { independent_commercial:'O',semi_commercial:'O',commercial_complex:'O',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'N',institutional:'O',institutional_mixed:'O',temporary:'N' },
  // Facilities
  passengerLifts:       { independent_commercial:'O',semi_commercial:'O',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'N',institutional:'M',institutional_mixed:'M',temporary:'N' },
  serviceLifts:         { independent_commercial:'N',semi_commercial:'N',commercial_complex:'O',mall_retail:'M',mall_office:'M',pure_office:'O',industrial:'N',institutional:'N',institutional_mixed:'O',temporary:'N' },
  escalators:           { independent_commercial:'N',semi_commercial:'N',commercial_complex:'O',mall_retail:'M',mall_office:'M',pure_office:'O',industrial:'N',institutional:'N',institutional_mixed:'O',temporary:'N' },
  powerBackup:          { independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'O' },
  hvacCentralAC:        { independent_commercial:'O',semi_commercial:'O',commercial_complex:'O',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'N' },
  fireSafetySystem:     { independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'O' },
  waterSupply:          ALL,
  // Amenities
  publicWashrooms:      { independent_commercial:'O',semi_commercial:'O',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'O',institutional:'M',institutional_mixed:'M',temporary:'O' },
  // Security
  security24x7:         { independent_commercial:'O',semi_commercial:'O',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'O' },
  cctvSurveillance:     { independent_commercial:'O',semi_commercial:'O',commercial_complex:'O',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'O' },
  accessControlSystem:  { independent_commercial:'N',semi_commercial:'N',commercial_complex:'O',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'N' },
  // Compliance
  occupancyCertificate: { independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'N' },
  completionCertificate:{ independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'N' },
  fireNOC:              { independent_commercial:'M',semi_commercial:'M',commercial_complex:'M',mall_retail:'M',mall_office:'M',pure_office:'M',industrial:'M',institutional:'M',institutional_mixed:'M',temporary:'O' },
  // Industrial Specific
  dockDoors:            { independent_commercial:'N',semi_commercial:'N',commercial_complex:'N',mall_retail:'N',mall_office:'N',pure_office:'N',industrial:'M',institutional:'N',institutional_mixed:'N',temporary:'N' },
  clearHeight:          { independent_commercial:'N',semi_commercial:'N',commercial_complex:'N',mall_retail:'N',mall_office:'N',pure_office:'N',industrial:'M',institutional:'O',institutional_mixed:'O',temporary:'N' },
  truckAccess:          { independent_commercial:'N',semi_commercial:'N',commercial_complex:'N',mall_retail:'N',mall_office:'N',pure_office:'N',industrial:'M',institutional:'O',institutional_mixed:'O',temporary:'N' },
  // Institutional Specific
  institutionType:      { independent_commercial:'N',semi_commercial:'N',commercial_complex:'N',mall_retail:'N',mall_office:'N',pure_office:'N',industrial:'N',institutional:'M',institutional_mixed:'M',temporary:'N' },
  capacity:             { independent_commercial:'N',semi_commercial:'N',commercial_complex:'N',mall_retail:'N',mall_office:'N',pure_office:'N',industrial:'N',institutional:'M',institutional_mixed:'M',temporary:'N' },
  // Other
  maintenanceCharges:   { independent_commercial:'O',semi_commercial:'O',commercial_complex:'O',mall_retail:'O',mall_office:'O',pure_office:'O',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'O' },
  // Approval
  approvalAuth:         { independent_commercial:'O',semi_commercial:'O',commercial_complex:'O',mall_retail:'O',mall_office:'O',pure_office:'O',industrial:'O',institutional:'O',institutional_mixed:'O',temporary:'O' },
  rera:                 { independent_commercial:'N',semi_commercial:'N',commercial_complex:'N',mall_retail:'N',mall_office:'N',pure_office:'N',industrial:'N',institutional:'N',institutional_mixed:'N',temporary:'N' },
}

function getStatus(fieldKey: string, buildingType: string): Status {
  const map = FIELD_STATUS[fieldKey]
  if (!map || !buildingType) return 'O'
  return map[buildingType as BType] ?? 'O'
}

// ─── Types ────────────────────────────────────────────────────────────────────
type BFormData = {
  buildingType: string; address: string
  buildingName: string
  // visible location fields
  city: string; district: string; locationRoad: string; microLocation: string
  colonyLayout: string; pincode: string
  // dialog-only location fields
  latitude: string; longitude: string
  country: string; state: string; zone: string; corporation: string; circle: string
  established: string; yearOfConstruction: string; totalFloors: string
  basement: string; totalBuiltUpArea: string; landArea: string; totalParking: string
  basementParking: string; passengerLifts: string; serviceLifts: string
  escalators: string; powerBackup: string; hvacCentralAC: string
  fireSafetySystem: string; waterSupply: string; publicWashrooms: string
  security24x7: string; cctvSurveillance: string; accessControlSystem: string
  occupancyCertificate: string; completionCertificate: string; fireNOC: string
  dockDoors: string; clearHeight: string; truckAccess: string
  institutionType: string; capacity: string; maintenanceCharges: string
  approvalAuth: string; rera: string
}

const INIT: BFormData = {
  buildingType:'', address:'', buildingName:'',
  city:'', district:'', locationRoad:'', microLocation:'', colonyLayout:'', pincode:'',
  latitude:'', longitude:'', country:'India', state:'', zone:'', corporation:'', circle:'',
  established:'No', yearOfConstruction:'', totalFloors:'', basement:'No', totalBuiltUpArea:'', landArea:'', totalParking:'',
  basementParking:'', passengerLifts:'', serviceLifts:'No', escalators:'No', powerBackup:'No', hvacCentralAC:'No',
  fireSafetySystem:'No', waterSupply:'', publicWashrooms:'No', security24x7:'No', cctvSurveillance:'No', accessControlSystem:'No',
  occupancyCertificate:'No', completionCertificate:'No', fireNOC:'No',
  dockDoors:'No', clearHeight:'', truckAccess:'No', institutionType:'', capacity:'', maintenanceCharges:'',
  approvalAuth:'', rera:'No',
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FieldLabel({ label, status }: { label: string; status: Status }) {
  return (
    <div className="flex items-center gap-1 mb-[3px]">
      <span className="text-[0.75rem] font-[600] text-[var(--text)] leading-none">{label}</span>
      {status === 'M' && <span className="text-[#e53e3e] text-[10px] leading-none font-[700]">*</span>}
      {status === 'O' && <span className="text-[10px] leading-none text-[var(--text-tertiary)] font-[500]"></span>}
    </div>
  )
}

function TInput({ value, onChange, placeholder, type = 'text', disabled = false, isMobile = false }: {
  value: string; onChange?: (v: string) => void; placeholder?: string; type?: string; disabled?: boolean; isMobile?: boolean
}) {
  const widthClass = isMobile ? 'w-full' : 'w-2/3'
  return (
    <input
      type={type}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className={`${widthClass} h-[32px] px-2 text-[0.78rem] font-[500] text-[var(--text)] bg-white border border-[var(--border)] rounded-[4px] focus:border-[var(--accent-gold)] focus:outline-none transition-colors ${disabled ? 'bg-[var(--surface-container)] text-[var(--text-tertiary)] cursor-default' : ''}`}
    />
  )
}

function TTextArea({ value, onChange, placeholder, rows = 3, isMobile = false }: {
  value: string; onChange?: (v: string) => void; placeholder?: string; rows?: number; isMobile?: boolean
}) {
  const widthClass = isMobile ? 'w-full' : 'w-2/3'
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange?.(e.target.value)}
      className={`${widthClass} px-2 py-1.5 text-[0.78rem] font-[500] text-[var(--text)] bg-white border border-[var(--border)] rounded-[4px] focus:border-[var(--accent-gold)] focus:outline-none transition-colors resize-none`}
    />
  )
}

function YesNoField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <SegmentedControl
      compact
      options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
      value={value || 'No'}
      onChange={onChange}
    />
  )
}

function YesNoRow({ label, status, value, onChange, isMobile = false, colSpan = 1 }: {
  label: string; status: Status; value: string; onChange: (v: string) => void; isMobile?: boolean; colSpan?: 1|2|3|4
}) {
  if (isMobile) {
    return (
      <div className="col-span-4 flex items-center justify-between gap-3 py-[5px] last:border-b-0">
        <div className="flex items-center gap-1 min-w-0">
          <span className="text-[0.78rem] font-[600] text-[var(--text)] leading-snug">{label}</span>
          {status === 'M' && <span className="text-[#e53e3e] text-[10px] leading-none font-[700] flex-shrink-0">*</span>}
        </div>
        <div className="flex-shrink-0">
          <YesNoField value={value} onChange={onChange} />
        </div>
      </div>
    )
  }
  const spanClass = colSpan === 4 ? 'col-span-4' : colSpan === 3 ? 'col-span-3' : colSpan === 2 ? 'col-span-2' : 'col-span-1'
  return (
    <div className={`${spanClass} flex flex-col gap-1 py-1`}>
      <FieldLabel label={label} status={status} />
      <YesNoField value={value} onChange={onChange} />
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="col-span-4 flex items-center gap-2 pt-1 pb-0.5 mb-0 text-[0.95rem] font-bold tracking-wide text-[var(--text-primary)] font-['Outfit']">
      {/* Section icon (gray) */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A0AEC0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8M12 8v8" />
      </svg>
      {children}
    </h3>
  )
}

// ─── Section divider component ────────────────────────────────────────────────
function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="contents">
      <SectionHeading>{title}</SectionHeading>
      {children}
    </div>
  )
}

// ─── File upload widget ───────────────────────────────────────────────────────
function FileUploadField({ label, status, accept, multiple }: { label: string; status: Status; accept?: string; multiple?: boolean }) {
  const [files, setFiles] = useState<File[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files))
  }
  return (
    <div className="flex flex-col">
      <FieldLabel label={label} status={status} />
      <div
        className="border border-dashed border-[var(--border)] rounded-[4px] bg-[var(--surface-container)] h-[32px] flex items-center justify-center gap-1.5 cursor-pointer hover:border-[var(--accent-gold)] transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <UploadIcon />
        <span className="text-[0.73rem] text-[var(--text-tertiary)] font-[500]">
          {files.length > 0 ? `${files.length} file${files.length > 1 ? 's' : ''} selected` : 'click to upload'}
        </span>
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="hidden" onChange={handleFiles} aria-label={label} />
    </div>
  )
}

// ─── Reusable panel (embeddable without FormPage) ───────────────────────────
export function BuildingInfoPanel() {
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  // Local building form state
  const [form, setForm] = useState<BFormData>(INIT)
  const [formOpen, setFormOpen] = useState(false)
  const [mapDialogOpen, setMapDialogOpen] = useState(false)

  // Search state
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const up = (patch: Partial<BFormData>) => setForm(prev => ({ ...prev, ...patch }))

  const filteredBuildings = MOCK_BUILDINGS.filter(b =>
    searchQuery.trim().length > 0 &&
    (b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     b.address.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selectBuilding = (b: typeof MOCK_BUILDINGS[0]) => {
    const bt = BUILDING_TYPES.find(t => t.value === b.type)
    setForm(prev => ({ ...prev, buildingType: b.type, buildingName: b.name, address: b.address }))
    setSearchQuery(b.name)
    setShowSearchResults(false)
    setFormOpen(true)
  }

  const bt = form.buildingType as BType
  const show = (fieldKey: string) => getStatus(fieldKey, bt) !== 'N'
  const st   = (fieldKey: string): Status => getStatus(fieldKey, bt)

  const isIndustrial    = bt === 'industrial'
  const isInstitutional = bt === 'institutional' || bt === 'institutional_mixed'

  return (
    <div className="flex flex-col font-outfit">
      <div className={`bg-white rounded-[4px] p-[8px] flex ${isMobile ? 'flex-col items-stretch' : 'flex-row items-center'} gap-[8px] border border-border shadow-[0_2px_8px_rgba(15,27,46,0.04)]`}>
        <div className="flex flex-row items-center gap-[8px] flex-1">
          <div className="flex-1 relative" ref={searchRef}>
            <div className="relative">
              <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-text-tertiary flex">
                <SearchIcon />
              </span>
              <input
                type="text"
                placeholder="Search existing buildings..."
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setShowSearchResults(true) }}
                className="w-full h-[34px] pl-[28px] pr-[28px] text-[0.85rem] font-medium text-navy bg-[#F5F7FA] border border-border rounded-[3px] outline-none transition-all duration-200 box-border"
                style={{ fontWeight: 500 }}
                onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                // Tailwind can't animate border color on focus with custom colors, so keep logic in onFocus/onBlur if needed
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => { setSearchQuery(''); setShowSearchResults(false) }}
                  className="absolute right-[8px] top-1/2 -translate-y-1/2 text-text-tertiary bg-none border-none cursor-pointer p-0 flex"
                >
                  <XIcon />
                </button>
              )}
            </div>
            {showSearchResults && filteredBuildings.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-border rounded-[3px] shadow-[0_8px_24px_rgba(15,27,46,0.15),0_2px_6px_rgba(15,27,46,0.08)] z-50 overflow-hidden">
                {filteredBuildings.map(b => {
                  const typeLabel = BUILDING_TYPES.find(t => t.value === b.type)?.label ?? b.type
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => selectBuilding(b)}
                      className="w-full text-left px-[12px] py-[8px] bg-transparent border-0 border-b border-border flex flex-col gap-[2px] cursor-pointer transition-colors duration-150 hover:bg-[#F5F7FA]"
                    >
                      <span className="text-[0.85rem] font-semibold text-navy">{b.name}</span>
                      <span className="text-[0.75rem] text-text-tertiary flex items-center gap-[4px]">
                        <LocationIcon />
                        {b.address} · {typeLabel}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setFormOpen(o => !o)}
            title="Add building details"
            className={`flex items-center justify-center gap-[6px] h-[34px] px-[12px] rounded-[3px] text-[0.8rem] font-semibold transition-all duration-200 flex-shrink-0 cursor-pointer border ${formOpen ? 'border-gold bg-gradient-to-br from-navy to-navy-dark text-white shadow-[0_2px_6px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]' : 'border-border bg-white text-navy'} select-none`}
          >
            <PlusIcon />
            <span>Add building details</span>
            <span className={`flex transition-transform duration-200 ${formOpen ? 'rotate-180' : ''}`}>
              <ChevronDownIcon />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${formOpen ? 'max-h-[9000px] opacity-100 mt-[12px]' : 'max-h-0 opacity-0 mt-0'}`}
      >
        {form.buildingType && (
          <div className="flex items-center gap-[6px] mb-[8px]">
            <span className="text-gold flex"><BuildingIcon /></span>
            <span className="text-[0.85rem] font-bold text-navy">
              {BUILDING_TYPES.find(t => t.value === form.buildingType)?.label ?? 'Building details'}
            </span>
          </div>
        )}
        <div className="bg-white rounded-[4px] border border-border p-[16px] shadow-[0_4px_16px_rgba(15,27,46,0.04)]">
          <div className="grid grid-cols-4 gap-x-[16px] gap-y-[16px]">

            <SectionBlock title="Location">
              {isMobile ? (
                <div className="col-span-4 flex flex-col gap-3">
                  {/* Row 1: Map Location + Pincode */}
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="flex flex-col">
                      <FieldLabel label="Map location" status="M" />
                      <button
                        type="button"
                        onClick={() => setMapDialogOpen(true)}
                        style={{ height: '32px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 8px', borderRadius: '3px', border: '1px solid #C89B3C', background: '#F5F7FA', color: '#1C2A44', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease', width: '100%', boxShadow: '0 1px 2px rgba(15,27,46,0.05)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E6C36A' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#F5F7FA'; e.currentTarget.style.borderColor = '#C89B3C' }}
                      >
                        <span style={{ color: '#C89B3C', flexShrink: 0 }}><MapPinIcon /></span>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Select on map</span>
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Pincode" status="M" />
                      <TInput isMobile value={form.pincode} onChange={v => up({ pincode: v })} placeholder="e.g. 500032" />
                    </div>
                  </div>
                  {/* Row 2: City + District */}
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="flex flex-col">
                      <FieldLabel label="City" status="M" />
                      <TInput isMobile value={form.city} onChange={v => up({ city: v })} placeholder="e.g. Hyderabad" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="District" status="O" />
                      <TInput isMobile value={form.district} onChange={v => up({ district: v })} placeholder="e.g. Rangareddy" />
                    </div>
                  </div>
                  {/* Row 3: Location / Road + Micro Location */}
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="flex flex-col">
                      <FieldLabel label="Location / Road" status="O" />
                      <TInput isMobile value={form.locationRoad} onChange={v => up({ locationRoad: v })} placeholder="e.g. Honeywell Dwy" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Micro location" status="O" />
                      <TInput isMobile value={form.microLocation} onChange={v => up({ microLocation: v })} placeholder="e.g. Fin. District" />
                    </div>
                  </div>
                  {/* Row 4: Building Name + Colony / Layout Name */}
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="flex flex-col">
                      <FieldLabel label="Building name" status={st('buildingName')} />
                      <TInput isMobile value={form.buildingName} onChange={v => up({ buildingName: v })} placeholder="e.g. Infinity Towers" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Colony / Layout" status="O" />
                      <TInput isMobile value={form.colonyLayout} onChange={v => up({ colonyLayout: v })} placeholder="Optional" />
                    </div>
                  </div>
                  {/* Full-width: Address */}
                  <div className="flex flex-col">
                    <FieldLabel label="Address" status={st('address')} />
                    <TTextArea isMobile value={form.address} onChange={v => up({ address: v })} placeholder="Street address" rows={3} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="col-span-4 grid grid-cols-4 gap-x-4 gap-y-3">
                    <div className="flex flex-col">
                      <FieldLabel label="Map location" status="M" />
                      <button
                        type="button"
                        onClick={() => setMapDialogOpen(true)}
                        style={{ height: '32px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', borderRadius: '3px', border: '1px solid #C89B3C', background: '#F5F7FA', color: '#1C2A44', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease', width: '100%', boxShadow: '0 1px 2px rgba(15,27,46,0.05)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E6C36A' }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#F5F7FA'; e.currentTarget.style.borderColor = '#C89B3C' }}
                      >
                        <span style={{ color: '#C89B3C' }}><MapPinIcon /></span>
                        <span>Select location on map</span>
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="City" status="M" />
                      <TInput isMobile={isMobile} value={form.city} onChange={v => up({ city: v })} placeholder="e.g. Hyderabad" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="District" status="O" />
                      <TInput isMobile={isMobile} value={form.district} onChange={v => up({ district: v })} placeholder="e.g. Rangareddy" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Location / Road" status="O" />
                      <TInput isMobile={isMobile} value={form.locationRoad} onChange={v => up({ locationRoad: v })} placeholder="e.g. Honeywell Driveway" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Micro location" status="O" />
                      <TInput isMobile={isMobile} value={form.microLocation} onChange={v => up({ microLocation: v })} placeholder="e.g. Financial District" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Building name" status={st('buildingName')} />
                      <TInput isMobile={isMobile} value={form.buildingName} onChange={v => up({ buildingName: v })} placeholder="e.g. Infinity Towers" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Colony / Layout name" status="O" />
                      <TInput isMobile={isMobile} value={form.colonyLayout} onChange={v => up({ colonyLayout: v })} placeholder="Optional" />
                    </div>
                    <div className="flex flex-col">
                      <FieldLabel label="Pincode" status="M" />
                      <TInput isMobile={isMobile} value={form.pincode} onChange={v => up({ pincode: v })} placeholder="e.g. 500032" />
                    </div>
                  </div>
                  <div className="col-span-4 flex flex-col mt-1">
                    <FieldLabel label="Address" status={st('address')} />
                    <TTextArea isMobile={isMobile} value={form.address} onChange={v => up({ address: v })} placeholder="Street address" rows={3} />
                  </div>
                </>
              )}
            </SectionBlock>

            <SectionBlock title="Basic essentials">
              <div className={`col-span-4 grid gap-x-4 gap-y-3 grid-cols-2 ${!isMobile && 'md:grid-cols-4'}`}>
                {show('yearOfConstruction') && (
                  <div className="flex flex-col">
                    <FieldLabel label="Year of construction" status={st('yearOfConstruction')} />
                    <TInput isMobile={isMobile} type="number" value={form.yearOfConstruction} onChange={v => up({ yearOfConstruction: v })} placeholder="e.g. 2010" />
                  </div>
                )}
                {show('totalFloors') && (
                  <div className="flex flex-col">
                    <FieldLabel label="Total floors" status={st('totalFloors')} />
                    <TInput isMobile={isMobile} type="number" value={form.totalFloors} onChange={v => up({ totalFloors: v })} placeholder="e.g. 12" />
                  </div>
                )}
                {show('totalBuiltUpArea') && (
                  <div className="flex flex-col">
                    <FieldLabel label="Total built-up area (sq ft)" status={st('totalBuiltUpArea')} />
                    <TInput isMobile={isMobile} type="number" value={form.totalBuiltUpArea} onChange={v => up({ totalBuiltUpArea: v })} placeholder="e.g. 45000" />
                  </div>
                )}
                {show('landArea') && (
                  <div className="flex flex-col">
                    <FieldLabel label="Land area (yds / acres)" status={st('landArea')} />
                    <TInput isMobile={isMobile} type="number" value={form.landArea} onChange={v => up({ landArea: v })} placeholder="e.g. 2.5" />
                  </div>
                )}
              </div>

              {show('established') && (
                <YesNoRow isMobile={isMobile} colSpan={2} label="Established" status={st('established')} value={form.established} onChange={v => up({ established: v })} />
              )}
              {show('basement') && (
                <YesNoRow isMobile={isMobile} colSpan={2} label="Basement" status={st('basement')} value={form.basement} onChange={v => up({ basement: v })} />
              )}
            </SectionBlock>

            {show('basementParking') && (
              <SectionBlock title="Parking">
                <div className="col-span-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  {show('totalParking') && (
                    <div className="flex flex-col">
                      <FieldLabel label="Total parking" status={st('totalParking')} />
                      <TInput isMobile={isMobile} value={form.totalParking} onChange={v => up({ totalParking: v })} placeholder="e.g. 200 slots" />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <FieldLabel label="Basement parking" status={st('basementParking')} />
                    <TInput isMobile={isMobile} value={form.basementParking} onChange={v => up({ basementParking: v })} placeholder="No. of slots" />
                  </div>
                </div>
              </SectionBlock>
            )}

            <SectionBlock title="Facilities">
              {isMobile ? (
                <>
                  {/* Row: Passenger Lifts + Water Supply */}
                  <div className="col-span-4 grid grid-cols-2 gap-x-3 gap-y-3">
                    {show('passengerLifts') && (
                      <div className="flex flex-col">
                        <FieldLabel label="Passenger lifts" status={st('passengerLifts')} />
                        <TInput isMobile type="number" value={form.passengerLifts} onChange={v => up({ passengerLifts: v })} placeholder="Count" />
                      </div>
                    )}
                    {show('waterSupply') && (
                      <div className="flex flex-col">
                        <FieldLabel label="Water supply" status={st('waterSupply')} />
                        <SelectField
                          value={form.waterSupply}
                          onChange={v => up({ waterSupply: v })}
                          placeholder="Select source"
                          options={[
                            { value: 'bore',      label: 'Bore well' },
                            { value: 'municipal', label: 'Municipal' },
                            { value: 'both',      label: 'Both' },
                            { value: 'others',    label: 'Others' },
                          ]}
                        />
                      </div>
                    )}
                  </div>
                  {/* Remaining yes/no fields */}
                  {show('serviceLifts') && <YesNoRow isMobile={true} label="Service lifts" status={st('serviceLifts')} value={form.serviceLifts} onChange={v => up({ serviceLifts: v })} />}
                  {show('escalators') && <YesNoRow isMobile={true} label="Escalators" status={st('escalators')} value={form.escalators} onChange={v => up({ escalators: v })} />}
                  {show('powerBackup') && <YesNoRow isMobile={true} label="Power backup" status={st('powerBackup')} value={form.powerBackup} onChange={v => up({ powerBackup: v })} />}
                  {show('hvacCentralAC') && <YesNoRow isMobile={true} label="HVAC / Central AC" status={st('hvacCentralAC')} value={form.hvacCentralAC} onChange={v => up({ hvacCentralAC: v })} />}
                  {show('fireSafetySystem') && <YesNoRow isMobile={true} label="Fire safety system" status={st('fireSafetySystem')} value={form.fireSafetySystem} onChange={v => up({ fireSafetySystem: v })} />}
                </>
              ) : (
                <div className="col-span-4 grid grid-cols-5 gap-x-3">
                  {show('serviceLifts') && (
                    <div className="flex flex-col gap-1 py-1">
                      <FieldLabel label="Service lifts" status={st('serviceLifts')} />
                      <YesNoField value={form.serviceLifts} onChange={v => up({ serviceLifts: v })} />
                    </div>
                  )}
                  {show('escalators') && (
                    <div className="flex flex-col gap-1 py-1">
                      <FieldLabel label="Escalators" status={st('escalators')} />
                      <YesNoField value={form.escalators} onChange={v => up({ escalators: v })} />
                    </div>
                  )}
                  {show('powerBackup') && (
                    <div className="flex flex-col gap-1 py-1">
                      <FieldLabel label="Power backup" status={st('powerBackup')} />
                      <YesNoField value={form.powerBackup} onChange={v => up({ powerBackup: v })} />
                    </div>
                  )}
                  {show('hvacCentralAC') && (
                    <div className="flex flex-col gap-1 py-1">
                      <FieldLabel label="HVAC / Central AC" status={st('hvacCentralAC')} />
                      <YesNoField value={form.hvacCentralAC} onChange={v => up({ hvacCentralAC: v })} />
                    </div>
                  )}
                  {show('fireSafetySystem') && (
                    <div className="flex flex-col gap-1 py-1">
                      <FieldLabel label="Fire safety system" status={st('fireSafetySystem')} />
                      <YesNoField value={form.fireSafetySystem} onChange={v => up({ fireSafetySystem: v })} />
                    </div>
                  )}
                </div>
              )}

              {!isMobile && show('passengerLifts') && (
                <div className="col-span-4 flex flex-col">
                  <FieldLabel label="Passenger lifts" status={st('passengerLifts')} />
                  <TInput isMobile={isMobile} type="number" value={form.passengerLifts} onChange={v => up({ passengerLifts: v })} placeholder="Count" />
                </div>
              )}
              {!isMobile && show('waterSupply') && (
                <div className="col-span-2 flex flex-col">
                  <FieldLabel label="Water supply" status={st('waterSupply')} />
                  <div style={{ width: '50%' }}>
                    <SelectField
                      value={form.waterSupply}
                      onChange={v => up({ waterSupply: v })}
                      placeholder="Select source"
                      options={[
                        { value: 'bore',       label: 'Bore well' },
                        { value: 'municipal',  label: 'Municipal' },
                        { value: 'both',       label: 'Both' },
                        { value: 'others',     label: 'Others' },
                      ]}
                    />
                  </div>
                </div>
              )}
            </SectionBlock>

            <SectionBlock title="Amenities & security">
              {show('publicWashrooms') && (
                <YesNoRow isMobile={isMobile} label="Public washrooms" status={st('publicWashrooms')} value={form.publicWashrooms} onChange={v => up({ publicWashrooms: v })} />
              )}
              {show('security24x7') && (
                <YesNoRow isMobile={isMobile} label="24×7 security" status={st('security24x7')} value={form.security24x7} onChange={v => up({ security24x7: v })} />
              )}
              {show('cctvSurveillance') && (
                <YesNoRow isMobile={isMobile} label="CCTV surveillance" status={st('cctvSurveillance')} value={form.cctvSurveillance} onChange={v => up({ cctvSurveillance: v })} />
              )}
              {show('accessControlSystem') && (
                <YesNoRow isMobile={isMobile} label="Access control system" status={st('accessControlSystem')} value={form.accessControlSystem} onChange={v => up({ accessControlSystem: v })} />
              )}
            </SectionBlock>

            <SectionBlock title="Compliance">
              {show('occupancyCertificate') && (
                <YesNoRow isMobile={isMobile} label="Occupancy certificate" status={st('occupancyCertificate')} value={form.occupancyCertificate} onChange={v => up({ occupancyCertificate: v })} />
              )}
              {show('completionCertificate') && (
                <YesNoRow isMobile={isMobile} label="Completion certificate" status={st('completionCertificate')} value={form.completionCertificate} onChange={v => up({ completionCertificate: v })} />
              )}
              {show('fireNOC') && (
                <YesNoRow isMobile={isMobile} label="Fire NOC" status={st('fireNOC')} value={form.fireNOC} onChange={v => up({ fireNOC: v })} />
              )}
            </SectionBlock>

            {isIndustrial && (
              <SectionBlock title="Industrial / Warehouse specific">
                <YesNoRow isMobile={isMobile} label="Dock doors" status={st('dockDoors')} value={form.dockDoors} onChange={v => up({ dockDoors: v })} />
                <div className="col-span-2 flex flex-col">
                  <FieldLabel label="Clear height (ft)" status={st('clearHeight')} />
                  <TInput isMobile={isMobile} type="number" value={form.clearHeight} onChange={v => up({ clearHeight: v })} placeholder="e.g. 30" />
                </div>
                <YesNoRow isMobile={isMobile} label="Truck access" status={st('truckAccess')} value={form.truckAccess} onChange={v => up({ truckAccess: v })} />
              </SectionBlock>
            )}

            {isInstitutional && (
              <SectionBlock title="Institutional specific">
                <div className="col-span-2 flex flex-col">
                  <FieldLabel label="Institution type" status={st('institutionType')} />
                  <div style={{ width: isMobile ? '100%' : '80%' }}>
                    <SelectField
                      value={form.institutionType}
                      onChange={v => up({ institutionType: v })}
                      placeholder="Select type"
                      options={[
                        { value: 'hospital',    label: 'Hospital / Clinic' },
                        { value: 'school',      label: 'School / College' },
                        { value: 'hotel',       label: 'Hotel / Service Apt' },
                        { value: 'religious',   label: 'Religious / Temple' },
                        { value: 'government',  label: 'Government Office' },
                        { value: 'others',      label: 'Others' },
                      ]}
                    />
                  </div>
                </div>
                <div className="col-span-2 flex flex-col">
                  <FieldLabel label="Capacity (beds / students / rooms)" status={st('capacity')} />
                  <TInput isMobile={isMobile} type="number" value={form.capacity} onChange={v => up({ capacity: v })} placeholder="e.g. 200" />
                </div>
                {show('clearHeight') && (
                  <div className="col-span-2 flex flex-col">
                    <FieldLabel label="Clear height (ft)" status={st('clearHeight')} />
                    <TInput isMobile={isMobile} type="number" value={form.clearHeight} onChange={v => up({ clearHeight: v })} placeholder="e.g. 20" />
                  </div>
                )}
                {show('truckAccess') && (
                  <YesNoRow isMobile={isMobile} label="Truck access" status={st('truckAccess')} value={form.truckAccess} onChange={v => up({ truckAccess: v })} />
                )}
              </SectionBlock>
            )}

            <SectionBlock title="Other & approval">
              {isMobile ? (
                <div className="col-span-4 flex flex-col gap-3">
                  {/* Row 1: Maintenance Charges + Approval Authority */}
                  <div className="grid grid-cols-2 gap-x-3">
                    {show('maintenanceCharges') && (
                      <div className="flex flex-col">
                        <FieldLabel label="Maintenance charges" status={st('maintenanceCharges')} />
                        <TInput isMobile type="number" value={form.maintenanceCharges} onChange={v => up({ maintenanceCharges: v })} placeholder="e.g. 15000" />
                      </div>
                    )}
                    {show('approvalAuth') && (
                      <div className="flex flex-col">
                        <FieldLabel label="Approval authority" status={st('approvalAuth')} />
                        <SelectField
                          value={form.approvalAuth}
                          onChange={v => up({ approvalAuth: v })}
                          placeholder="Select"
                          options={[
                            { value: 'bmcda',  label: 'BMCDA' },
                            { value: 'ghmc',   label: 'GHMC' },
                            { value: 'mcgm',   label: 'MCGM' },
                            { value: 'dda',    label: 'DDA' },
                            { value: 'others', label: 'Others' },
                          ]}
                        />
                      </div>
                    )}
                  </div>
                  {/* Row 2: RERA Registered */}
                  {show('rera') && (
                    <YesNoRow isMobile={true} label="RERA registered" status={st('rera')} value={form.rera} onChange={v => up({ rera: v })} />
                  )}
                </div>
              ) : (
                <div className="col-span-3 grid grid-cols-3 gap-x-4 gap-y-3">
                  {show('maintenanceCharges') && (
                    <div className="flex flex-col">
                      <FieldLabel label="Maintenance charges" status={st('maintenanceCharges')} />
                      <TInput isMobile={isMobile} type="number" value={form.maintenanceCharges} onChange={v => up({ maintenanceCharges: v })} placeholder="e.g. 15000" />
                    </div>
                  )}
                  {show('approvalAuth') && (
                    <div className="flex flex-col">
                      <FieldLabel label="Approval authority" status={st('approvalAuth')} />
                      <SelectField
                        value={form.approvalAuth}
                        onChange={v => up({ approvalAuth: v })}
                        placeholder="Select authority"
                        options={[
                          { value: 'bmcda',  label: 'BMCDA' },
                          { value: 'ghmc',   label: 'GHMC' },
                          { value: 'mcgm',   label: 'MCGM' },
                          { value: 'dda',    label: 'DDA' },
                          { value: 'others', label: 'Others' },
                        ]}
                      />
                    </div>
                  )}
                  {show('rera') && (
                    <div className="flex flex-col gap-1 py-1">
                      <FieldLabel label="RERA registered" status={st('rera')} />
                      <YesNoField value={form.rera} onChange={v => up({ rera: v })} />
                    </div>
                  )}
                </div>
              )}
            </SectionBlock>

            <SectionBlock title="Media">
              {isMobile ? (
                <div className="col-span-4 flex flex-col gap-3">
                  {/* Row 1: Building Photos + Floor Plans */}
                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="flex flex-col">
                      <FileUploadField label="Building photos" status="M" accept="image/*" multiple />
                    </div>
                    <div className="flex flex-col">
                      <FileUploadField label="Floor plans" status="O" accept="image/*,application/pdf" multiple />
                    </div>
                  </div>
                  {/* Row 2: Video / Virtual Tour URL */}
                  <div className="flex flex-col">
                    <FieldLabel label="Video / Virtual tour URL" status="O" />
                    <TInput isMobile value="" placeholder="https://..." />
                  </div>
                </div>
              ) : (
                <div className="col-span-4 grid grid-cols-3 gap-x-4 gap-y-3">
                  <div className="flex flex-col">
                    <FileUploadField label="Building photos" status="M" accept="image/*" multiple />
                  </div>
                  <div className="flex flex-col">
                    <FileUploadField label="Floor plans" status="O" accept="image/*,application/pdf" multiple />
                  </div>
                  <div className="flex flex-col">
                    <FieldLabel label="Video / Virtual tour URL" status="O" />
                    <TInput isMobile={isMobile} value="" placeholder="https://..." />
                  </div>
                </div>
              )}
            </SectionBlock>

          </div>
        </div>
      </div>

      {mapDialogOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(15, 27, 46, 0.6)', backdropFilter: 'blur(4px)' }}
          onClick={e => { if (e.target === e.currentTarget) setMapDialogOpen(false) }}
        >
          <div style={{ background: '#FFFFFF', borderRadius: '4px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', fontFamily: "'Outfit', sans-serif", boxShadow: '0 16px 48px rgba(15, 27, 46, 0.15)', border: '1px solid #E4E7EC' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #E4E7EC' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#C89B3C', display: 'flex' }}><MapPinIcon /></span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1C2A44' }}>Select location on map</span>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setMapDialogOpen(false)}
                style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', border: '1px solid #E4E7EC', background: '#FFFFFF', color: '#667085', cursor: 'pointer', transition: 'all 200ms ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C89B3C'; e.currentTarget.style.color = '#1C2A44' }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E7EC'; e.currentTarget.style.color = '#667085' }}
              >
                <XIcon />
              </button>
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '100%', height: '200px', borderRadius: '3px', background: '#F5F7FA', border: '1px dashed #C89B3C', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#667085' }}>
                <span style={{ color: '#C89B3C' }}><MapPinIcon /></span>
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>Map integration coming soon — drop a pin to auto-fill coordinates</span>
              </div>

              <button
                type="button"
                onClick={() => setMapDialogOpen(false)}
                style={{ height: '36px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderRadius: '3px', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', border: '1px solid #E6C36A', color: '#FFFFFF', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 6px rgba(15,27,46,0.25)', transition: 'all 200ms ease' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <CheckIcon />
                <span>Confirm location</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default function BuildingInfo() {
  const { dispatch, next, back } = useForm()

  return (
    <FormPage title="Building Information" onBack={back} onNext={next}>
      <div style={{ maxWidth: '900px', margin: '0 auto', fontFamily: "'Outfit', sans-serif" }}>
        <BuildingInfoPanel />
      </div>
    </FormPage>
  )
}
