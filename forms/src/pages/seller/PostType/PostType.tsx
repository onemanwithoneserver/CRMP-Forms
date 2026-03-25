import React, { useRef, useEffect, useState, useCallback } from 'react'
import {
  Building2,
  MapPin,
  Store,
  Map,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Save,
  Landmark,
  Globe,
  Navigation,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { useForm, SELLER_POST_TYPES, SELLER_SUB_CATEGORIES } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import { Dropdown } from '../../../components/inputs/Dropdown'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { OptionButton } from '../../../components/inputs/OptionButton'
import { TextFieldModern as TextField } from '../../../components/inputs/TextFieldModern'

const COUNTRIES = ['India']
const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry',
]
const ZONES = ['East Zone', 'West Zone', 'North Zone', 'South Zone', 'Central Zone']
const CORPORATIONS = [
  'GHMC', 'HMDA', 'HUDA', 'BMC', 'BBMP', 'MCGM', 'MCD', 'NDMC',
  'AMC', 'KMC', 'PMC', 'CMC', 'NMMC', 'TMC',
]
const CIRCLES = ['Circle 1', 'Circle 2', 'Circle 3', 'Circle 4', 'Circle 5', 'Circle 6']

// ─── Map Dialog ────────────────────────────────────────────────────────────────────────────────
interface MapDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (lat: string, lng: string) => void
  initialLat: string
  initialLng: string
}

function MapDialog({
  isOpen, onClose, onConfirm, initialLat, initialLng,
}: MapDialogProps) {
  const [lat, setLat] = useState(initialLat)
  const [lng, setLng] = useState(initialLng)
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setLat(initialLat); setLng(initialLng)
      setPinPosition(null)
      setFetching(false); setError('')
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = '' }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleAutoFetch = useCallback(() => {
    if (!navigator.geolocation) { setError('Geolocation not supported.'); return }
    setFetching(true); setError('')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const fLat = pos.coords.latitude.toFixed(6)
        const fLng = pos.coords.longitude.toFixed(6)
        setLat(fLat); setLng(fLng); setFetching(false)
        if (mapRef.current) {
          const r = mapRef.current.getBoundingClientRect()
          setPinPosition({ x: r.width / 2, y: r.height / 2 })
        }
      },
      () => { setError('Unable to fetch location. Allow location access.'); setFetching(false) },
      { timeout: 10000 }
    )
  }, [])

  const handleMapClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return
    const rect = mapRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPinPosition({ x, y })
    const latVal = (17.385 + (0.5 - y / rect.height) * 0.25).toFixed(6)
    const lngVal = (78.487 + (x / rect.width - 0.5) * 0.25).toFixed(6)
    setLat(latVal); setLng(lngVal); setError('')
  }, [])

  if (!isOpen) return null
  const canConfirm = lat.trim() !== '' && lng.trim() !== ''

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-[12px] shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[calc(100vh-48px)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0">
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-[#C89B3C]" />
            <span className="text-[14px] font-semibold text-[#0F172A] font-['Outfit']">Select Location on Map</span>
          </div>
          <button type="button" onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[#F1F5F9] transition-colors" aria-label="Close">
            <X size={15} className="text-[#64748B]" />
          </button>
        </div>
        {/* Map Canvas */}
        <div ref={mapRef} onClick={handleMapClick}
          className="relative w-full overflow-hidden select-none cursor-pointer flex-1 min-h-[360px]"
          role="application" aria-label="Map canvas">
          <div className="absolute inset-0 bg-[#EEF1F6]" />
          <div className="absolute inset-0 map-dot-bg" />
          {!pinPosition && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 pointer-events-none">
              <MapPin size={34} className="text-[#C89B3C]" />
              <span className="text-[13px] font-medium font-['Outfit'] text-[#64748B]">
                Pin drop selector will appear here
              </span>
            </div>
          )}
          <div className="absolute bottom-4 inset-x-0 flex justify-center z-10">
            <button type="button" onClick={e => { e.stopPropagation(); handleAutoFetch() }} disabled={fetching}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[#E2E8F0] text-[13px] font-semibold font-['Outfit'] text-[#1C2A44] hover:bg-[#F8FAFC] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150">
              <Navigation size={13} className={fetching ? 'animate-spin text-[#2563EB]' : 'text-[#2563EB]'} />
              {fetching ? 'Fetching…' : 'Auto-fetch Location'}
            </button>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {pinPosition && (
              <g transform={`translate(${pinPosition.x}, ${pinPosition.y})`}>
                <ellipse cx="0" cy="4" rx="5" ry="2" fill="rgba(0,0,0,0.18)" />
                <path d="M0,-28 C-9,-28 -14,-20 -14,-13 C-14,0 0,4 0,4 C0,4 14,0 14,-13 C14,-20 9,-28 0,-28 Z" fill="#EF4444" stroke="#fff" strokeWidth="1.5" />
                <circle cx="0" cy="-14" r="5" fill="white" opacity="0.9" />
              </g>
            )}
          </svg>
        </div>
        {error && (
          <div className="flex items-center gap-1.5 px-4 py-2 bg-[#FEF2F2] border-t border-[#FECACA] text-[12px] font-['Outfit'] text-[#DC2626] shrink-0">
            <AlertCircle size={13} />{error}
          </div>
        )}
        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#F1F5F9] shrink-0">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-[6px] text-[13px] font-semibold font-['Outfit'] text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">Cancel</button>
          <button type="button" onClick={() => onConfirm(lat, lng)} disabled={!canConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-[13px] font-semibold font-['Outfit'] bg-[#0F172A] text-white hover:bg-[#1E293B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
            <Check size={13} /> Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}

const PROPERTY_TYPE_CARDS = [
  { id: 'land', label: 'Land', icon: Map },
  { id: 'retail', label: 'Retail', icon: Store },
  { id: 'office', label: 'Office', icon: Building2 },
  { id: 'coworking', label: 'Coworking', icon: Building2 },
  { id: 'entire_building', label: 'Entire Building', icon: Landmark },
]

export default function PostType() {
  const { state, dispatch, next } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const { postType, postSubCategory, propertyType, city } = state.formData

  const [localLocation, setLocalLocation] = useState({
    microLocation: '',
    corporation: '',
    zone: '',
    circle: '',
    orrZoning: '',
    colony: '',
    colonyLayout: '',
    buildingType: '',
    latitude: '',
    longitude: '',
    country: 'India',
    state: '',
    district: '',
    location: '',
    pincode: '',
  })
  const [mapOpen, setMapOpen] = useState(false)

  const openMap = () => setMapOpen(true)
  const closeMap = () => setMapOpen(false)
  const handleMapConfirm = (lat: string, lng: string) => {
    setLocalLocation(s => ({ ...s, latitude: lat, longitude: lng }))
    closeMap()
  }

  const postTypeSectionRef = useRef<HTMLDivElement>(null)
  const locationSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (propertyType && postTypeSectionRef.current) {
      setTimeout(() => {
        postTypeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    }
  }, [propertyType])

  useEffect(() => {
    if (postType && locationSectionRef.current) {
      const hasSubCats = !!SELLER_SUB_CATEGORIES[postType]
      if (!hasSubCats) {
        setTimeout(() => {
          locationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 350)
      }
    }
  }, [postType])

  useEffect(() => {
    if (postSubCategory && locationSectionRef.current) {
      setTimeout(() => {
        locationSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    }
  }, [postSubCategory])

  return (
    <>
      <MapDialog
        isOpen={mapOpen}
        onClose={closeMap}
        onConfirm={handleMapConfirm}
        initialLat={localLocation.latitude}
        initialLng={localLocation.longitude}
      />
      <div className="flex flex-col h-full bg-[#fafafa]">
      <div className="flex-1 overflow-y-auto scroll-smooth">

        {/* ─── Hero ─── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1C2A44] via-[#243352] to-[#1a2740] pt-3 pb-8 rounded-b-[4px]">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C]" />
          <div className="relative max-w-3xl mx-auto text-center px-4">
            <h1 className="text-xl md:text-2xl font-bold text-white font-['Outfit'] tracking-tight leading-snug">
              What type of property do you want to list?
            </h1>
          </div>
        </div>

        {/* ─── Select Property Type Card ─── */}
        <div ref={postTypeSectionRef} className="relative -mt-4 px-2 md:px-4 w-full">
        <div className="bg-white md:rounded-[4px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-y md:border border-[var(--border-light)] overflow-hidden">
          {/* Premium Gradient accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C] shadow-sm" />

            <div className="p-3">
              {/* Section heading */}
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-[4px] bg-[#1C2A44]/5 backdrop-blur-md border border-[#1C2A44]/15 flex items-center justify-center shadow-sm">
                  <Building2 size={18} className="text-[#1C2A44]" />
                </div>
                <h2 className="text-[1.1rem] font-bold text-[#1C2A44] font-['Outfit'] tracking-tight">
                  Select Property Type
                </h2>
              </div>

              {/* ── Mobile layout ── */}
              {isMobile ? (
                <div className="flex flex-col gap-2">
                  {/* All unselected cards — 3-col grid (default) / 2-col grid (selection active) */}
                  <div className={propertyType ? 'grid grid-cols-2 gap-2' : 'grid grid-cols-2 gap-2'}>
                    {PROPERTY_TYPE_CARDS.filter(t => t.id !== propertyType).map(type => (
                      <PropertyCard
                        key={type.id}
                        icon={type.icon}
                        label={type.label}
                        selected={false}
                        onClick={() => dispatch({ type: 'updateData', payload: { propertyType: type.id, postType: '', postSubCategory: '' } })}
                      />
                    ))}
                  </div>
                  {/* Selected card — full width, at the bottom */}
                  {propertyType && PROPERTY_TYPE_CARDS.filter(t => t.id === propertyType).map(type => (
                    <PropertyCard
                      key={type.id}
                      icon={type.icon}
                      label={type.label}
                      selected={true}
                      onClick={() => dispatch({ type: 'updateData', payload: { propertyType: type.id, postType: '', postSubCategory: '' } })}
                    >
                      <p className="text-[11px] font-bold text-[#445069] mb-1 mt-0 font-['Outfit'] tracking-wide">
                        What do you want to do?
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-1.5 sm:gap-1">
                        {SELLER_POST_TYPES.filter(option => {
                          if (type.id === 'land') {
                            return option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
                          }
                          return true
                        }).map(option => (
                          <OptionButton
                            key={option.value}
                            label={option.label}
                            selected={postType === option.value}
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation()
                              if (postType !== option.value) {
                                dispatch({ type: 'updateData', payload: { postType: option.value, postSubCategory: '' } })
                              }
                            }}
                          />
                        ))}
                      </div>
                    </PropertyCard>
                  ))}
                </div>
              ) : (
                <>
                  {/* ── Desktop/Tablet: compact row of unselected cards ── */}
                  <div className={propertyType ? 'grid grid-cols-4 gap-2' : 'grid grid-cols-5 gap-2'}>
                    {PROPERTY_TYPE_CARDS.map(type => {
                      if (propertyType === type.id) return null
                      return (
                        <PropertyCard
                          key={type.id}
                          icon={type.icon}
                          label={type.label}
                          selected={false}
                          compact={!!propertyType}
                          onClick={() => dispatch({ type: 'updateData', payload: { propertyType: type.id, postType: '', postSubCategory: '' } })}
                        />
                      )
                    })}
                  </div>
                  {/* Selected card — full width below */}
                  {propertyType && (
                    <div className="mt-3 transition-all duration-300">
                      {PROPERTY_TYPE_CARDS.filter(type => type.id === propertyType).map(type => (
                        <PropertyCard
                          key={type.id}
                          icon={type.icon}
                          label={type.label}
                          selected={true}
                          onClick={() => dispatch({ type: 'updateData', payload: { propertyType: type.id, postType: '', postSubCategory: '' } })}
                        >
                          <p className="text-[11px] font-bold text-[#445069] mb-1 mt-0 font-['Outfit'] tracking-wide">
                            What do you want to do?
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-1.5 sm:gap-1">
                            {SELLER_POST_TYPES.filter(option => {
                              if (type.id === 'land') {
                                return option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
                              }
                              return true
                            }).map(option => (
                              <OptionButton
                                key={option.value}
                                label={option.label}
                                selected={postType === option.value}
                                onClick={(e: React.MouseEvent) => {
                                  e.stopPropagation()
                                  if (postType !== option.value) {
                                    dispatch({ type: 'updateData', payload: { postType: option.value, postSubCategory: '' } })
                                  }
                                }}
                              />
                            ))}
                          </div>
                        </PropertyCard>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* ─── Location Section ─── */}
        <div
          ref={locationSectionRef}
          className="px-2 md:px-4 mt-2 w-full"
        >
          <div className="bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[var(--border-light)] overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#1C2A44]">
              <div className="w-8 h-8 md:w-9 md:h-9 rounded-[4px] bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-sm">
                <MapPin size={18} className="text-white" />
              </div>
              <h2 className="text-[1.1rem] font-bold text-white font-['Outfit'] tracking-tight">Location</h2>
            </div>

            <div className="p-3 space-y-3">

              {/* Row 1 – Map Actions & Coordinates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 items-end">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-xs font-semibold text-[#445069] pl-0.5 font-['Outfit']">Map Location</label>
                  <button
                    type="button"
                    onClick={openMap}
                    className="h-[34px] w-full flex items-center gap-2 px-3 rounded-[6px] border border-[#BFDBFE] bg-[#EFF6FF] text-[13px] font-semibold font-['Outfit'] text-[#2563EB] hover:bg-[#DBEAFE] hover:border-[#93C5FD] transition-all duration-150"
                  >
                    <MapPin size={14} className="shrink-0 text-[#C89B3C]" />
                    {localLocation.latitude && localLocation.longitude
                      ? `${localLocation.latitude}, ${localLocation.longitude}`
                      : 'Select Location on Map'}
                    {localLocation.latitude && localLocation.longitude && (
                      <span className="ml-auto text-[11px] font-normal text-[#64748B]">Change</span>
                    )}
                  </button>
                </div>
                <TextField label="Latitude" value={localLocation.latitude} placeholder="e.g. 17.41898" onChange={val => setLocalLocation(s => ({ ...s, latitude: val }))} />
                <TextField label="Longitude" value={localLocation.longitude} placeholder="e.g. 78.34377" onChange={val => setLocalLocation(s => ({ ...s, longitude: val }))} />
              </div>

              <div className="h-px w-full bg-[#F1F5F9]" />

              {/* Row 2 – Administrative Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                <Dropdown label="Country" value={localLocation.country || 'India'} options={COUNTRIES} placeholder="Select country"
                  onChange={val => setLocalLocation(s => ({ ...s, country: val }))} />
                <Dropdown label="State" value={localLocation.state} options={STATES} placeholder="Select state" searchable
                  onChange={val => setLocalLocation(s => ({ ...s, state: val }))} />
                <TextField label="City" value={city || ''} placeholder="e.g. Hyderabad"
                  onChange={val => dispatch({ type: 'updateData', payload: { city: val } })} />
                <TextField label="District" value={localLocation.district} placeholder="e.g. Rangareddy"
                  onChange={val => setLocalLocation(s => ({ ...s, district: val }))} />
              </div>

              <div className="h-px w-full bg-[#F1F5F9]" />

              {/* Row 3 – Location Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                <TextField label="Location / Road" value={localLocation.location} placeholder="e.g. Honeywell Driveway"
                  onChange={val => setLocalLocation(s => ({ ...s, location: val }))} />
                <TextField label="Micro Location" value={localLocation.microLocation} placeholder="e.g. Financial District"
                  onChange={val => setLocalLocation(s => ({ ...s, microLocation: val }))} />
                <Dropdown label="Zone" value={localLocation.zone} options={ZONES} placeholder="Select zone"
                  onChange={val => setLocalLocation(s => ({ ...s, zone: val }))} />
                <Dropdown label="Corporation" value={localLocation.corporation} options={CORPORATIONS} placeholder="Select corporation" searchable
                  onChange={val => setLocalLocation(s => ({ ...s, corporation: val }))} />
              </div>

              <div className="h-px w-full bg-[#F1F5F9]" />

              {/* Row 4 – Zoning Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                <Dropdown label="Building Type" value={localLocation.buildingType}
                  options={['Standalone Building', 'Tech Park', 'Business Park', 'Mall', 'High Street', 'Shopping Complex', 'Independent House/Villa', 'Other']}
                  placeholder="Select Building Type" searchable
                  onChange={val => setLocalLocation(s => ({ ...s, buildingType: val }))} />
                <TextField label="Colony / Layout Name" value={localLocation.colonyLayout} placeholder="Optional"
                  onChange={val => setLocalLocation(s => ({ ...s, colonyLayout: val }))} />
                <Dropdown label="Circle" value={localLocation.circle} options={CIRCLES} placeholder="Select circle"
                  onChange={val => setLocalLocation(s => ({ ...s, circle: val }))} />
                <TextField label="Pincode" value={localLocation.pincode} placeholder="e.g. 500032"
                  onChange={val => setLocalLocation(s => ({ ...s, pincode: val.replace(/\D/g, '').slice(0, 6) }))} />
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* ─── Bottom Footer (unified with FormPage) ─── */}
      <div className="w-full bg-white border-t border-[#edf0f5] px-3.5 py-2.5 z-50 flex justify-between items-center shadow-[0_-4px_20px_rgba(0,0,0,0.04)] mt-auto">
        <button
          title="Save as Draft"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '6px',
            border: '1.5px solid rgba(200,155,60,0.5)',
            background: 'rgba(200,155,60,0.05)',
            color: '#C89B3C',
            fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Save size={14} />
          <span>Save draft</span>
        </button>

        <div className="flex gap-2 items-center">
          <button
            title="Back"
            disabled
            style={{
              width: '34px', height: '34px', borderRadius: '6px',
              border: '1.5px solid #e2e6ec', background: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: 0.35, cursor: 'not-allowed', color: '#445069',
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={next}
            disabled={!postType || !propertyType || !city}
            title="Save & Next"
            style={{
              height: '34px', minWidth: '48px',
              borderRadius: '6px', border: 'none',
              background: 'linear-gradient(135deg, #1C2A44 0%, #2a3f66 100%)',
              color: '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: !postType || !propertyType || !city ? 'not-allowed' : 'pointer',
              opacity: !postType || !propertyType || !city ? 0.5 : 1,
              boxShadow: '0 4px 12px rgba(28,42,68,0.25)',
              transition: 'all 200ms ease',
            }}
          >
            <ChevronRight size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
    </>
  )
}