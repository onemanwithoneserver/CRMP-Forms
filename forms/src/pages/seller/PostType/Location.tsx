import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Building2,
  Compass,
  MapPin,
  Navigation,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { useForm } from '../../../context/FormContext'
import { Dropdown } from '../../../components/inputs/Dropdown'
import { TextFieldModern as TextField } from '../../../components/inputs/TextFieldModern'

const COUNTRIES = ['India', 'UAE', 'USA', 'UK', 'Others']
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
const ORR_ZONING_OPTIONS = ['ORR – Inner', 'ORR – Outer', 'ORR – On Ring Road', 'Beyond ORR']
const BUILDING_TYPE_LABELS: Record<string, string> = {
  independent_commercial: 'Independent Commercial Building',
  semi_commercial: 'Semi-Commercial / Residential',
  commercial_complex: 'Commercial Complex',
  mall_retail: 'Mall (Retail only)',
  mall_office: 'Mall with Office',
  pure_office: 'Pure Office Building',
  industrial: 'Industrial / Warehouse Facility',
  institutional: 'Institutional Building',
  institutional_mixed: 'Institutional Mixed-Use Building',
  temporary: 'Temporary Commercial Structure',
}

interface LocationProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

// ─── Map Dialog ───────────────────────────────────────────────────────────────

interface MapDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (lat: string, lng: string, country: string, state: string, zone: string, corporation: string, circle: string) => void
  initialLat: string
  initialLng: string
  initialCountry: string
  initialState: string
  initialZone: string
  initialCorporation: string
  initialCircle: string
}

function MapDialog({
  isOpen,
  onClose,
  onConfirm,
  initialLat,
  initialLng,
  initialCountry,
  initialState,
  initialZone,
  initialCorporation,
  initialCircle,
}: MapDialogProps) {
  const [lat, setLat] = useState(initialLat)
  const [lng, setLng] = useState(initialLng)
  const [country, setCountry] = useState(initialCountry)
  const [stateVal, setStateVal] = useState(initialState)
  const [zone, setZone] = useState(initialZone)
  const [corporation, setCorporation] = useState(initialCorporation)
  const [circle, setCircle] = useState(initialCircle)
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      setLat(initialLat)
      setLng(initialLng)
      setCountry(initialCountry)
      setStateVal(initialState)
      setZone(initialZone)
      setCorporation(initialCorporation)
      setCircle(initialCircle)
      setPinPosition(null)
      setFetching(false)
      setError('')
    }
  }, [isOpen]) 

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const handleAutoFetch = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setFetching(true)
    setError('')
    navigator.geolocation.getCurrentPosition(
      pos => {
        const fetchedLat = pos.coords.latitude.toFixed(6)
        const fetchedLng = pos.coords.longitude.toFixed(6)
        setLat(fetchedLat)
        setLng(fetchedLng)
        setFetching(false)
        if (mapRef.current) {
          const r = mapRef.current.getBoundingClientRect()
          setPinPosition({ x: r.width / 2, y: r.height / 2 })
        }
      },
      () => {
        setError('Unable to fetch location. Please allow location access.')
        setFetching(false)
      },
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
    setLat(latVal)
    setLng(lngVal)
    setError('')
  }, [])

  if (!isOpen) return null

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(15, 27, 46, 0.6)',
        backdropFilter: 'blur(4px)',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div 
        style={{
          position: 'absolute', inset: 0
        }}
        onClick={onClose}
      />

      <div 
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '768px',
          background: '#FFFFFF',
          borderRadius: '4px', // Standardized 4px outer
          border: '1px solid #E4E7EC',
          boxShadow: '0 16px 48px rgba(15, 27, 46, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: 'calc(100vh - 32px)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid #E4E7EC',
            background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', // Premium Navy Header
            flexShrink: 0
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#E6C36A', display: 'flex' }}><MapPin size={16} /></span>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Select Location on Map
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '3px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF',
              cursor: 'pointer', transition: 'all 200ms ease', outline: 'none'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
          >
            <X size={14} />
          </button>
        </div>

        {/* Map Canvas */}
        <div
          ref={mapRef}
          onClick={handleMapClick}
          style={{
            position: 'relative', width: '100%', flex: 1, minHeight: '260px',
            background: '#F5F7FA', overflow: 'hidden', cursor: 'pointer', userSelect: 'none'
          }}
        >
          <div 
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              opacity: 0.5
            }} 
          />

          {!pinPosition && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', pointerEvents: 'none', color: '#667085' }}>
              <span style={{ color: '#C89B3C', display: 'flex' }}><MapPin size={32} /></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                Click anywhere on the map to drop a pin
              </span>
            </div>
          )}

          <div style={{ position: 'absolute', bottom: '16px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
            <button
              type="button"
              onClick={e => { e.stopPropagation(); handleAutoFetch() }}
              disabled={fetching}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px', height: '34px', padding: '0 16px',
                borderRadius: '17px', background: '#FFFFFF', border: '1px solid #E4E7EC',
                color: '#1C2A44', fontSize: '0.85rem', fontWeight: 600, cursor: fetching ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(15,27,46,0.1)', transition: 'all 200ms ease', opacity: fetching ? 0.7 : 1
              }}
              onMouseEnter={(e) => { if(!fetching) { e.currentTarget.style.borderColor = '#C89B3C'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
              onMouseLeave={(e) => { if(!fetching) { e.currentTarget.style.borderColor = '#E4E7EC'; e.currentTarget.style.transform = 'translateY(0)' } }}
            >
              <span style={{ display: 'flex' }}>
                <Navigation size={14} className={fetching ? 'animate-spin text-[#C89B3C]' : 'text-[#C89B3C]'} />
              </span>
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

        {/* Location Fields Grid */}
        <div style={{ padding: '16px', borderTop: '1px solid #E4E7EC', background: '#FFFFFF', flexShrink: 0 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>Latitude</label>
              <input
                type="text"
                value={lat}
                onChange={e => { setLat(e.target.value); setError('') }}
                placeholder="e.g. 17.41898"
                style={{ height: '32px', width: '100%', padding: '0 8px', fontSize: '0.8rem', fontWeight: 500, color: '#1C2A44', background: '#F5F7FA', border: '1px solid #E4E7EC', borderRadius: '3px', outline: 'none', transition: 'all 200ms ease' }}
                onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C' }}
                onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>Longitude</label>
              <input
                type="text"
                value={lng}
                onChange={e => { setLng(e.target.value); setError('') }}
                placeholder="e.g. 78.34377"
                style={{ height: '32px', width: '100%', padding: '0 8px', fontSize: '0.8rem', fontWeight: 500, color: '#1C2A44', background: '#F5F7FA', border: '1px solid #E4E7EC', borderRadius: '3px', outline: 'none', transition: 'all 200ms ease' }}
                onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C' }}
                onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>Country</label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                style={{ height: '32px', width: '100%', padding: '0 8px', fontSize: '0.8rem', fontWeight: 500, color: '#1C2A44', background: '#F5F7FA', border: '1px solid #E4E7EC', borderRadius: '3px', outline: 'none', cursor: 'pointer', transition: 'all 200ms ease' }}
                onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C' }}
                onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC' }}
              >
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>State</label>
              <select
                value={stateVal}
                onChange={e => setStateVal(e.target.value)}
                style={{ height: '32px', width: '100%', padding: '0 8px', fontSize: '0.8rem', fontWeight: 500, color: '#1C2A44', background: '#F5F7FA', border: '1px solid #E4E7EC', borderRadius: '3px', outline: 'none', cursor: 'pointer', transition: 'all 200ms ease' }}
                onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C' }}
                onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC' }}
              >
                <option value="">Select state</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>Zone</label>
              <select
                value={zone}
                onChange={e => setZone(e.target.value)}
                style={{ height: '32px', width: '100%', padding: '0 8px', fontSize: '0.8rem', fontWeight: 500, color: '#1C2A44', background: '#F5F7FA', border: '1px solid #E4E7EC', borderRadius: '3px', outline: 'none', cursor: 'pointer', transition: 'all 200ms ease' }}
                onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C' }}
                onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC' }}
              >
                <option value="">Select zone</option>
                {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>Corporation</label>
              <select
                value={corporation}
                onChange={e => setCorporation(e.target.value)}
                style={{ height: '32px', width: '100%', padding: '0 8px', fontSize: '0.8rem', fontWeight: 500, color: '#1C2A44', background: '#F5F7FA', border: '1px solid #E4E7EC', borderRadius: '3px', outline: 'none', cursor: 'pointer', transition: 'all 200ms ease' }}
                onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C' }}
                onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC' }}
              >
                <option value="">Select corporation</option>
                {CORPORATIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>Circle</label>
              <select
                value={circle}
                onChange={e => setCircle(e.target.value)}
                style={{ height: '32px', width: '100%', padding: '0 8px', fontSize: '0.8rem', fontWeight: 500, color: '#1C2A44', background: '#F5F7FA', border: '1px solid #E4E7EC', borderRadius: '3px', outline: 'none', cursor: 'pointer', transition: 'all 200ms ease' }}
                onFocus={(e) => { e.target.style.background = '#FFFFFF'; e.target.style.borderColor = '#C89B3C' }}
                onBlur={(e) => { e.target.style.background = '#F5F7FA'; e.target.style.borderColor = '#E4E7EC' }}
              >
                <option value="">Select circle</option>
                {CIRCLES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#FEF2F2', borderTop: '1px solid #FECACA', color: '#EF4444', fontSize: '0.8rem', fontWeight: 500, flexShrink: 0 }}>
            <span style={{ display: 'flex' }}><AlertCircle size={14} /></span>
            {error}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px', padding: '12px 16px', borderTop: '1px solid #E4E7EC', background: '#F5F7FA', flexShrink: 0 }}>
          <button
            type="button"
            onClick={onClose}
            style={{ height: '34px', padding: '0 16px', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 600, color: '#667085', background: '#FFFFFF', border: '1px solid #E4E7EC', cursor: 'pointer', transition: 'all 200ms ease', outline: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C89B3C'; e.currentTarget.style.color = '#1C2A44' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E7EC'; e.currentTarget.style.color = '#667085' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(lat, lng, country, stateVal, zone, corporation, circle)}
            style={{ height: '34px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', border: '1px solid #E6C36A', cursor: 'pointer', boxShadow: '0 2px 6px rgba(15,27,46,0.25)', transition: 'all 200ms ease', outline: 'none' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span style={{ display: 'flex' }}><Check size={14} /></span>
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Location({ sectionRef }: LocationProps) {
  const { state, dispatch } = useForm()
  const fd = state.formData
  const [orrZoningList, setOrrZoningList] = useState<string[]>(ORR_ZONING_OPTIONS)
  const [mapOpen, setMapOpen] = useState(false)

  const update = (payload: Record<string, string>) =>
    dispatch({ type: 'updateData', payload })

  const openMap = () => { setMapOpen(true) }
  const closeMap = () => { setMapOpen(false) }

  const handleMapConfirm = (lat: string, lng: string, country: string, state: string, zone: string, corporation: string, circle: string) => {
    update({ latitude: lat, longitude: lng, country, state, zone, corporation, circle })
    closeMap()
  }

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      <MapDialog
        isOpen={mapOpen}
        onClose={closeMap}
        onConfirm={handleMapConfirm}
        initialLat={fd.latitude}
        initialLng={fd.longitude}
        initialCountry={fd.country || 'India'}
        initialState={fd.state}
        initialZone={fd.zone}
        initialCorporation={fd.corporation}
        initialCircle={fd.circle}
      />

      <div ref={sectionRef} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
        
        {/* Estate Positioning Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '4px', border: '1px solid #E4E7EC', boxShadow: '0 4px 16px rgba(15, 27, 46, 0.04)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', borderBottom: '1px solid rgba(200, 155, 60, 0.3)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
              <Compass size={14} color="#E6C36A" />
            </div>
            <h2 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Estate Positioning
            </h2>
          </div>

          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>Map Location</label>
              <button
                type="button"
                onClick={openMap}
                style={{ height: '34px', width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', borderRadius: '3px', border: '1px solid #C89B3C', background: '#F5F7FA', color: '#1C2A44', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease', outline: 'none', boxShadow: '0 1px 3px rgba(15,27,46,0.05)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E6C36A' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#F5F7FA'; e.currentTarget.style.borderColor = '#C89B3C' }}
              >
                <span style={{ color: '#C89B3C', display: 'flex' }}><MapPin size={14} /></span>
                Select Location on Map
              </button>
            </div>

            <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <TextField label="City" value={fd.city} placeholder="e.g. Hyderabad" onChange={val => update({ city: val })} />
              <TextField label="District" value={fd.district} placeholder="e.g. Rangareddy" onChange={val => update({ district: val })} />
            </div>

            <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <TextField label="Location / Road" value={fd.location} placeholder="e.g. Honeywell Driveway" onChange={val => update({ location: val })} />
              <TextField label="Micro Location" value={fd.microLocation} placeholder="e.g. Financial District" onChange={val => update({ microLocation: val })} />
            </div>

            <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', alignItems: 'flex-end' }}>
              <Dropdown label="ORR Zoning" value={fd.orrZoning} options={orrZoningList} placeholder="Select ORR zoning" onChange={val => update({ orrZoning: val })} />
              <TextField label="Colony / Layout Name" value={fd.colonyLayout} placeholder="Optional" onChange={val => update({ colonyLayout: val })} />
              <TextField label="Pincode" value={fd.pincode} placeholder="e.g. 500032" onChange={val => update({ pincode: val.replace(/\D/g, '').slice(0, 6) })} />
            </div>

          </div>
        </div>

        {/* Building Information Card */}
        <div style={{ background: '#FFFFFF', borderRadius: '4px', border: '1px solid #E4E7EC', boxShadow: '0 4px 16px rgba(15, 27, 46, 0.04)', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', borderBottom: '1px solid rgba(200, 155, 60, 0.3)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
              <Building2 size={14} color="#E6C36A" />
            </div>
            <h2 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em' }}>
              Building Information
            </h2>
          </div>
          
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              {[
                { label: 'Building Type', value: BUILDING_TYPE_LABELS[fd.buildingType] ?? fd.buildingType },
                { label: 'Building Name', value: fd.buildingName },
                { label: 'Total Floors',  value: fd.totalFloors },
                { label: 'Address',       value: fd.address },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#667085' }}>{label}</span>
                  <div 
                    style={{ 
                      height: '34px', padding: '0 10px', display: 'flex', alignItems: 'center', 
                      borderRadius: '3px', border: '1px solid #E4E7EC', fontSize: '0.85rem', 
                      background: value ? '#FFFFFF' : '#F5F7FA', 
                      color: value ? '#1C2A44' : '#A0AAB8', 
                      fontWeight: value ? 500 : 400,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                    }}
                  >
                    {value || '—'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}