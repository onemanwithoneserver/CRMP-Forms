import React, { useState, useRef, useEffect } from 'react'
import { useForm } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import FormPage from '../../../components/layout/FormPage'
import SegmentedControl from '../../../components/inputs/SegmentedControl'
import SelectField from '../../../components/inputs/SelectField'

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
    <div className="flex flex-col font-['Outfit']">

        {/* ── Top bar: Building Type selector + Search + Add ── */}
        <div className={`bg-white rounded-[4px] p-2 flex gap-2 ${isMobile ? 'flex-col' : 'flex-row items-center'}`}>

          {/* Building Type label + dropdown — always one row */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[0.78rem] font-[700] text-[var(--text)] whitespace-nowrap">Building type</span>
            <div className={`${isMobile ? 'flex-1' : 'w-[220px]'}`}>
              <SelectField
                value={form.buildingType}
                onChange={v => { up({ buildingType: v }); setFormOpen(false) }}
                placeholder="Select type"
                options={BUILDING_TYPES}
              />
            </div>
          </div>

          {/* Divider — desktop only */}
          {!isMobile && <div className="w-px h-[28px] bg-[var(--border)] flex-shrink-0" />}

          {/* Search + Add: always one flex row */}
          <div className="flex flex-row items-center gap-2 flex-1">

            {/* Search existing buildings */}
            <div className="flex-1 relative" ref={searchRef}>
              <div className="relative">
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Search existing buildings..."
                  value={searchQuery}
                  onChange={e => { setSearchQuery(e.target.value); setShowSearchResults(true) }}
                  onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                  className="w-full h-[32px] pl-7 pr-2 text-[0.78rem] font-[500] text-[var(--text)] bg-[var(--surface-container)] border border-[var(--border)] rounded-[4px] focus:border-[var(--accent-gold)] focus:outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text)] transition-colors"
                    onClick={() => { setSearchQuery(''); setShowSearchResults(false) }}
                  >
                    <XIcon />
                  </button>
                )}
              </div>

              {/* Search results dropdown */}
              {showSearchResults && filteredBuildings.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-0.5 bg-white border border-[var(--border)] rounded-[4px] shadow-[var(--shadow-md)] z-50 overflow-hidden">
                  {filteredBuildings.map(b => {
                    const typeLabel = BUILDING_TYPES.find(t => t.value === b.type)?.label ?? b.type
                    return (
                      <button
                        key={b.id}
                        type="button"
                        className="w-full text-left px-3 py-2 hover:bg-[var(--accent-gold-subtle)] transition-colors last:border-b-0 flex flex-col gap-0.5"
                        onClick={() => selectBuilding(b)}
                      >
                        <span className="text-[0.78rem] font-[600] text-[var(--text)]">{b.name}</span>
                        <span className="text-[0.7rem] text-[var(--text-tertiary)] flex items-center gap-1">
                          <LocationIcon />
                          {b.address} · {typeLabel}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Add Building (+) button */}
            <button
              type="button"
              onClick={() => setFormOpen(o => !o)}
              title="Add building details"
              className={`flex items-center justify-center gap-1.5 px-3 h-[32px] rounded-[4px] border text-[0.78rem] font-[600] transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                formOpen
                  ? 'bg-[#1C2A44] text-white border-[#1C2A44]'
                  : 'bg-white text-[var(--text)] border-[var(--border)] hover:border-[#1C2A44]'
              }`}
            >
              <PlusIcon />
              <span>Add building details</span>
              <span className={`ml-0.5 transition-transform duration-200 ${formOpen ? 'rotate-180' : 'rotate-0'}`}>
                <ChevronDownIcon />
              </span>
            </button>

          </div>
        </div>

        {/* ── Expandable Building Details Form ── */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${formOpen ? 'max-h-[9000px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          {/* Section heading: Building Type name */}
          {form.buildingType && (
            <div className="flex items-center gap-2 mb-2">
              <BuildingIcon />
              <span className="text-[0.8rem] font-[700] text-[var(--text)]">
                {BUILDING_TYPES.find(t => t.value === form.buildingType)?.label ?? 'Building details'}
              </span>
            </div>
          )}

          {/* ── Main grid (4 cols always; col-span controls items-per-row) ── */}
          <div className="bg-white rounded-[4px] p-2">
            <div className="grid grid-cols-4 gap-x-2 gap-y-2">


              {/* ── Location (CREMP 4-col grid, 2 rows) ── */}
              <SectionBlock title="Location">
                <div className={`col-span-4 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2.5`}>
                  {/* Row 1 */}
                  <div className="flex flex-col">
                    <FieldLabel label="Map location" status="M" />
                    <button
                      type="button"
                      onClick={() => setMapDialogOpen(true)}
                      className="h-[32px] flex items-center gap-2 px-3 rounded-[4px] border border-[var(--border)] bg-[#EBF3FF] text-[#1952C4] text-[0.78rem] font-[600] hover:bg-[#dce9ff] transition-colors w-full"
                    >
                      <MapPinIcon />
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

                  {/* Row 2 */}
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

                <div className="col-span-4 flex flex-col">
                  <FieldLabel label="Address" status={st('address')} />
                  <TTextArea isMobile={isMobile} value={form.address} onChange={v => up({ address: v })} placeholder="Street address" rows={3} />
                </div>

              </SectionBlock>

              {/* ── Basic Essentials ── */}
              <SectionBlock title="Basic essentials">

                {/* Row 1 (desktop 4-col, mobile 2-col): Year | Floors | Total BUA | Land Area */}
                <div className={`col-span-4 grid gap-x-2 gap-y-2 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
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

                {/* Row 2 (desktop 2-col, mobile full-row): Established | Basement */}
                {show('established') && (
                  <YesNoRow isMobile={isMobile} colSpan={2} label="Established" status={st('established')} value={form.established} onChange={v => up({ established: v })} />
                )}
                {show('basement') && (
                  <YesNoRow isMobile={isMobile} colSpan={2} label="Basement" status={st('basement')} value={form.basement} onChange={v => up({ basement: v })} />
                )}

              </SectionBlock>

              {/* ── Parking ── */}
              {show('basementParking') && (
                <SectionBlock title="Parking">
                  <div className="col-span-4 grid grid-cols-2 gap-x-2">
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

              {/* ── Facilities ── */}
              <SectionBlock title="Facilities">

                {/* Row 1: 5 Yes/No fields — 1 row (grid-cols-5) on desktop, stacked on mobile */}
                {isMobile ? (
                  <>
                    {show('serviceLifts') && <YesNoRow isMobile={true} label="Service lifts" status={st('serviceLifts')} value={form.serviceLifts} onChange={v => up({ serviceLifts: v })} />}
                    {show('escalators') && <YesNoRow isMobile={true} label="Escalators" status={st('escalators')} value={form.escalators} onChange={v => up({ escalators: v })} />}
                    {show('powerBackup') && <YesNoRow isMobile={true} label="Power backup" status={st('powerBackup')} value={form.powerBackup} onChange={v => up({ powerBackup: v })} />}
                    {show('hvacCentralAC') && <YesNoRow isMobile={true} label="HVAC / Central AC" status={st('hvacCentralAC')} value={form.hvacCentralAC} onChange={v => up({ hvacCentralAC: v })} />}
                    {show('fireSafetySystem') && <YesNoRow isMobile={true} label="Fire safety system" status={st('fireSafetySystem')} value={form.fireSafetySystem} onChange={v => up({ fireSafetySystem: v })} />}
                  </>
                ) : (
                  <div className="col-span-4 grid grid-cols-5 gap-x-2">
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


                {show('passengerLifts') && (
                  <div className="col-span-43 flex flex-col">
                    <FieldLabel label="Passenger lifts" status={st('passengerLifts')} />
                    <TInput isMobile={isMobile} type="number" value={form.passengerLifts} onChange={v => up({ passengerLifts: v })} placeholder="Count" />
                  </div>
                )}
                {show('waterSupply') && (
                  <div className="col-span-2 flex flex-col">
                    <FieldLabel label="Water supply" status={st('waterSupply')} />
                    <div className={isMobile ? 'w-full' : 'w-1/3'}>
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

              {/* ── Amenities & Security ── */}
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

              {/* ── Compliance ── */}
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

              {/* ── Industrial Specific ── */}
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

              {/* ── Institutional Specific ── */}
              {isInstitutional && (
                <SectionBlock title="Institutional specific">
                  {/* Institution Type | Capacity — 2 per row */}
                  <div className="col-span-2 flex flex-col">
                    <FieldLabel label="Institution type" status={st('institutionType')} />
                    <SelectField
                      className={isMobile ? 'w-full' : 'w-2/3'}
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

                  <div className="col-span-2 flex flex-col">
                    <FieldLabel label="Capacity (beds / students / rooms)" status={st('capacity')} />
                    <TInput isMobile={isMobile} type="number" value={form.capacity} onChange={v => up({ capacity: v })} placeholder="e.g. 200" />
                  </div>

                  {/* Clear Height | (blank) — then Truck Access full row */}
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

              {/* ── Other & Approval ── */}
              <SectionBlock title="Other &amp; approval">
                {/* Single row: Maintenance | Approval Auth | RERA — col-span-1 each in the 4-col grid, wrapped in a col-span-4 3-col sub-grid */}
                <div className="col-span-3 grid grid-cols-3 gap-x-2 gap-y-2">
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
                        className={isMobile ? 'w-full' : 'w-2/3'}
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
              </SectionBlock>

              {/* ── Media ── */}
              <SectionBlock title="Media">
                {/* Single row (desktop 3-col, mobile 1-col): Photos | Floor Plans | Video URL */}
                <div className={`col-span-4 grid gap-x-2 gap-y-2 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
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
              </SectionBlock>

            </div>

            {/* Legend */}
            <div className="mt-2 pt-2 border-t border-[var(--border-light)] flex items-center gap-3 flex-wrap">              
              <span className="flex items-center gap-1 text-[0.68rem] text-[var(--text-secondary)]">
              </span>
            </div>
          </div>
        </div>

      {/* ── Select Location on Map Dialog ── */}
      {mapDialogOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 bg-[rgba(28,42,68,0.45)] backdrop-blur-[4px]"
          onClick={e => { if (e.target === e.currentTarget) setMapDialogOpen(false) }}
        >
          <div className="bg-white rounded-[4px] shadow-[var(--shadow-lg)] w-full max-w-[600px] max-h-[90vh] overflow-y-auto font-['Outfit']">
            {/* Dialog header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-light)]">
              <div className="flex items-center gap-2">
                <MapPinIcon />
                <span className="text-[0.85rem] font-[700] text-[var(--text)]">Select location on map</span>
              </div>
              <button
                type="button"
                aria-label="Close dialog"
                onClick={() => setMapDialogOpen(false)}
                className="w-[26px] h-[26px] flex items-center justify-center rounded-[4px] border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)] hover:border-[var(--text)] transition-colors"
              >
                <XIcon />
              </button>
            </div>

            <div className="p-3 flex flex-col gap-3">
              {/* Map placeholder */}
              <div className="w-full h-[180px] rounded-[4px] bg-[var(--surface-container)] border border-[var(--border)] flex flex-col items-center justify-center gap-2 text-[var(--text-tertiary)]">
                <MapPinIcon />
                <span className="text-[0.75rem] font-[500]">Map integration coming soon — drop a pin to auto-fill coordinates</span>
              </div>

              {/* Confirm button */}
              <button
                type="button"
                onClick={() => setMapDialogOpen(false)}
                className="mt-1 h-[34px] w-full flex items-center justify-center gap-2 rounded-[4px] bg-[#1C2A44] text-white text-[0.8rem] font-[600] hover:bg-[var(--accent-hover)] transition-colors"
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

// ─── Standalone page wrapper ───────────────────────────────────────────────────
export default function BuildingInfo() {
  const { dispatch, next, back } = useForm()

  return (
    <FormPage title="Building Information" onBack={back} onNext={next}>
      <div className="max-w-[900px] mx-auto">
        <BuildingInfoPanel />
      </div>
    </FormPage>
  )
}
