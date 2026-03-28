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
  Building,
  Users,
  Globe,
  Navigation,
  X,
  Check,
  AlertCircle,
  LayoutGrid,
} from 'lucide-react'
import { useForm, SELLER_POST_TYPES, SELLER_SUB_CATEGORIES } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import { Dropdown } from '../../../components/inputs/Dropdown'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { OptionButton } from '../../../components/inputs/OptionButton'
import { TextFieldModern as TextField } from '../../../components/inputs/TextFieldModern'
import SelectPropertyType from './SelectPropertyType'
import { BuildingInfoPanel } from './BuildingInfo'

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
  }, [isOpen]) 

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
    <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(15, 27, 46, 0.6)', backdropFilter: 'blur(4px)', fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} />
      <div style={{ position: 'relative', width: '100%', maxWidth: '768px', background: '#FFFFFF', borderRadius: '4px', border: '1px solid #E4E7EC', boxShadow: '0 16px 48px rgba(15, 27, 46, 0.15)', display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 32px)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #E4E7EC', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#E6C36A', display: 'flex' }}><MapPin size={16} /></span>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>Select Location on Map</span>
          </div>
          <button type="button" onClick={onClose} style={{ width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', cursor: 'pointer', transition: 'all 200ms ease', outline: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }} aria-label="Close">
            <X size={14} />
          </button>
        </div>
        <div ref={mapRef} onClick={handleMapClick} style={{ position: 'relative', width: '100%', flex: 1, minHeight: '360px', background: '#F5F7FA', overflow: 'hidden', cursor: 'pointer', userSelect: 'none' }} role="application" aria-label="Map canvas">
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '20px 20px', opacity: 0.5 }} />
          {!pinPosition && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', pointerEvents: 'none', color: '#667085' }}>
              <span style={{ color: '#C89B3C', display: 'flex' }}><MapPin size={32} /></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Pin drop selector will appear here</span>
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
            <button type="button" onClick={e => { e.stopPropagation(); handleAutoFetch() }} disabled={fetching} style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '34px', padding: '0 16px', borderRadius: '17px', background: '#FFFFFF', border: '1px solid #E4E7EC', color: '#1C2A44', fontSize: '0.85rem', fontWeight: 600, cursor: fetching ? 'not-allowed' : 'pointer', boxShadow: '0 4px 12px rgba(15,27,46,0.1)', transition: 'all 200ms ease', opacity: fetching ? 0.7 : 1 }} onMouseEnter={(e) => { if(!fetching) { e.currentTarget.style.borderColor = '#C89B3C'; e.currentTarget.style.transform = 'translateY(-1px)' } }} onMouseLeave={(e) => { if(!fetching) { e.currentTarget.style.borderColor = '#E4E7EC'; e.currentTarget.style.transform = 'translateY(0)' } }}>
              <span style={{ display: 'flex' }}><Navigation size={14} className={fetching ? 'animate-spin text-[#C89B3C]' : 'text-[#C89B3C]'} /></span>
              {fetching ? 'Fetching Location...' : 'Auto-fetch Location'}
            </button>
          </div>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
            {pinPosition && (
              <g transform={`translate(${pinPosition.x}, ${pinPosition.y})`}>
                <ellipse cx="0" cy="4" rx="6" ry="3" fill="rgba(15,27,46,0.2)" />
                <path d="M0,-32 C-10,-32 -16,-22 -16,-14 C-16,0 0,4 0,4 C0,4 16,0 16,-14 C16,-22 10,-32 0,-32 Z" fill="#C89B3C" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="0" cy="-16" r="6" fill="#1C2A44" />
              </g>
            )}
          </svg>
        </div>
        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#FEF2F2', borderTop: '1px solid #FECACA', color: '#EF4444', fontSize: '0.8rem', fontWeight: 500, flexShrink: 0 }}>
            <span style={{ display: 'flex' }}><AlertCircle size={14} /></span>{error}
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', padding: '12px 16px', borderTop: '1px solid #E4E7EC', background: '#F5F7FA', flexShrink: 0 }}>
          <button type="button" onClick={onClose} style={{ height: '34px', padding: '0 16px', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 600, color: '#667085', background: '#FFFFFF', border: '1px solid #E4E7EC', cursor: 'pointer', transition: 'all 200ms ease', outline: 'none' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C89B3C'; e.currentTarget.style.color = '#1C2A44' }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E7EC'; e.currentTarget.style.color = '#667085' }}>Cancel</button>
          <button type="button" onClick={() => onConfirm(lat, lng)} disabled={!canConfirm} style={{ height: '34px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', border: '1px solid #E6C36A', cursor: !canConfirm ? 'not-allowed' : 'pointer', opacity: !canConfirm ? 0.5 : 1, boxShadow: !canConfirm ? 'none' : '0 2px 6px rgba(15,27,46,0.25)', transition: 'all 200ms ease', outline: 'none' }} onMouseEnter={(e) => { if (canConfirm) e.currentTarget.style.transform = 'translateY(-1px)' }} onMouseLeave={(e) => { if (canConfirm) e.currentTarget.style.transform = 'translateY(0)' }}>
            <span style={{ display: 'flex' }}><Check size={14} /></span> Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}

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
    buildingName: '',
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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F5F7FA', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>

          <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', paddingTop: '12px', paddingBottom: '32px' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)', backgroundSize: '12px 12px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, rgba(200, 155, 60, 0.8) 50%, transparent 100%)' }} />
            <div style={{ position: 'relative', maxWidth: '768px', margin: '0 auto', textAlign: 'center', padding: '0 16px' }}>
              <h1 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0 }}>
                What type of property do you want to list?
              </h1>
            </div>
          </div>

          <SelectPropertyType sectionRef={postTypeSectionRef} />

          <div ref={locationSectionRef} style={{ padding: isMobile ? '0 8px' : '0 16px', marginTop: '16px', width: '100%' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '4px', boxShadow: '0 4px 16px rgba(15, 27, 46, 0.04)', border: '1px solid #E4E7EC', overflow: 'hidden' }}>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', borderBottom: '1px solid rgba(200, 155, 60, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                  <MapPin size={14} color="#E6C36A" />
                </div>
                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0 }}>Location</h2>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>Map location <span style={{ color: '#EF4444' }}>*</span></label>
                    <button
                      type="button"
                      onClick={openMap}
                      style={{ height: '34px', width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', borderRadius: '3px', border: '1px solid #C89B3C', background: '#F5F7FA', color: '#1C2A44', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease', outline: 'none', boxShadow: '0 1px 3px rgba(15,27,46,0.05)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E6C36A' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = '#F5F7FA'; e.currentTarget.style.borderColor = '#C89B3C' }}
                    >
                      <span style={{ color: '#C89B3C', display: 'flex' }}><MapPin size={14} /></span>
                      {localLocation.latitude && localLocation.longitude ? `${localLocation.latitude}, ${localLocation.longitude}` : 'Select location on map'}
                    </button>
                  </div>
                  <TextField label="City *" value={city || ''} placeholder="e.g. Hyderabad" onChange={val => dispatch({ type: 'updateData', payload: { city: val } })} />
                  <TextField label="District" value={localLocation.district} placeholder="e.g. Rangareddy" onChange={val => setLocalLocation(s => ({ ...s, district: val }))} />
                  <TextField label="Location / Road" value={localLocation.location} placeholder="e.g. Honeywell Driveway" onChange={val => setLocalLocation(s => ({ ...s, location: val }))} />
                  <TextField label="Micro location" value={localLocation.microLocation} placeholder="e.g. Financial District" onChange={val => setLocalLocation(s => ({ ...s, microLocation: val }))} />
                  <TextField label="Building name" value={localLocation.buildingName || ''} placeholder="e.g. Infinity Towers" onChange={val => setLocalLocation(s => ({ ...s, buildingName: val }))} />
                  <TextField label="Colony / Layout name" value={localLocation.colonyLayout} placeholder="Optional" onChange={val => setLocalLocation(s => ({ ...s, colonyLayout: val }))} />
                  <TextField label="Pincode *" value={localLocation.pincode} placeholder="e.g. 500032" onChange={val => setLocalLocation(s => ({ ...s, pincode: val.replace(/\D/g, '').slice(0, 6) }))} />
                </div>
              </div>
            </div>
          </div>

          <div style={{ padding: isMobile ? '0 8px' : '0 16px', marginTop: '16px', width: '100%', marginBottom: '16px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '4px', boxShadow: '0 4px 16px rgba(15, 27, 46, 0.04)', border: '1px solid #E4E7EC', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', borderBottom: '1px solid rgba(200, 155, 60, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                  <Building2 size={14} color="#E6C36A" />
                </div>
                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0 }}>Building Information</h2>
              </div>
              <div style={{ padding: '8px' }}>
                <BuildingInfoPanel />
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', background: '#FFFFFF', borderTop: '1px solid #E4E7EC', padding: '10px 16px', zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 16px rgba(15, 27, 46, 0.04)', marginTop: 'auto', flexShrink: 0 }}>
          <button
            title="Save as Draft"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '3px', background: 'transparent', border: '1px solid transparent', color: '#C89B3C', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease', outline: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200, 155, 60, 0.1)'; e.currentTarget.style.borderColor = '#C89B3C' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
          >
            <span style={{ display: 'flex' }}><Save size={14} /></span>
            <span>Save draft</span>
          </button>

          <div style={{ display: 'flex', gap: '8px', items: 'center' }}>
            <button
              title="Back"
              disabled
              style={{ width: '32px', height: '32px', borderRadius: '3px', border: '1px solid #E4E7EC', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed', color: '#A0AAB8', outline: 'none' }}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={next}
              disabled={!postType || !propertyType || !city}
              title="Save & Next"
              style={{ height: '32px', minWidth: '48px', borderRadius: '3px', border: 'none', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: !postType || !propertyType || !city ? 'not-allowed' : 'pointer', opacity: !postType || !propertyType || !city ? 0.5 : 1, boxShadow: !postType || !propertyType || !city ? 'none' : '0 2px 6px rgba(15, 27, 46, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)', transition: 'all 200ms ease', outline: 'none' }}
              onMouseEnter={(e) => { if (!(!postType || !propertyType || !city)) e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { if (!(!postType || !propertyType || !city)) e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <ChevronRight size={16} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}