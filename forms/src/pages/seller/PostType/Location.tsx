import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  Compass,
  Globe,
  MapPin,
  Navigation,
  X,
  Check,
  AlertCircle,
} from 'lucide-react'
import { useForm } from '../../../context/FormContext'
import { Dropdown } from '../../../components/inputs/Dropdown'
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
const ORR_ZONING_OPTIONS = ['ORR – Inner', 'ORR – Outer', 'ORR – On Ring Road', 'Beyond ORR']

interface LocationProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

// ─── Map Dialog ───────────────────────────────────────────────────────────────

interface MapDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (lat: string, lng: string) => void
  initialLat: string
  initialLng: string
}

function MapDialog({
  isOpen,
  onClose,
  onConfirm,
  initialLat,
  initialLng,
}: MapDialogProps) {
  const [lat, setLat] = useState(initialLat)
  const [lng, setLng] = useState(initialLng)
  const [pinPosition, setPinPosition] = useState<{ x: number; y: number } | null>(null)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState('')
  const mapRef = useRef<HTMLDivElement>(null)

  // Reset state each time the dialog opens
  useEffect(() => {
    if (isOpen) {
      setLat(initialLat)
      setLng(initialLng)
      setPinPosition(null)
      setFetching(false)
      setError('')
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  // Lock body scroll while open
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
    // Map pixel position → pseudo lat/lng (Hyderabad-centered demo)
    const latVal = (17.385 + (0.5 - y / rect.height) * 0.25).toFixed(6)
    const lngVal = (78.487 + (x / rect.width - 0.5) * 0.25).toFixed(6)
    setLat(latVal)
    setLng(lngVal)
    setError('')
  }, [])

  if (!isOpen) return null

  const canConfirm = lat.trim() !== '' && lng.trim() !== ''

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-3xl bg-white rounded-[12px] shadow-2xl border border-[#E2E8F0] overflow-hidden flex flex-col max-h-[calc(100vh-48px)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#F1F5F9] bg-gradient-to-r from-[#F8FAFC] to-white shrink-0">
          <div className="flex items-center gap-2">
            <Globe size={15} className="text-[#3B82F6]" />
            <span className="text-[14px] font-semibold text-[#0F172A] font-['Outfit']">
              Select Location on Map
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-[6px] hover:bg-[#F1F5F9] transition-colors"
            aria-label="Close"
          >
            <X size={15} className="text-[#64748B]" />
          </button>
        </div>

        {/* Map Canvas */}
        <div
          ref={mapRef}
          onClick={handleMapClick}
          className="relative w-full h-64 overflow-hidden select-none flex-1 min-h-0 cursor-pointer"
          role="application"
          aria-label="Map canvas – click to place pin"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-[#EEF1F6]" />
          <div className="absolute inset-0 map-dot-bg" />

          {/* Empty state */}
          {!pinPosition && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 pointer-events-none">
              <MapPin size={34} className="text-[#C89B3C]" />
              <span className="text-[13px] font-medium font-['Outfit'] text-[#64748B]">
                Pin drop selector will appear here
              </span>
            </div>
          )}

          {/* Auto-fetch button */}
          <div className="absolute bottom-4 inset-x-0 flex justify-center z-10">
            <button
              type="button"
              onClick={e => { e.stopPropagation(); handleAutoFetch() }}
              disabled={fetching}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-[#E2E8F0] text-[13px] font-semibold font-['Outfit'] text-[#1C2A44] hover:bg-[#F8FAFC] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150"
            >
              <Navigation size={13} className={fetching ? 'animate-spin text-[#2563EB]' : 'text-[#2563EB]'} />
              {fetching ? 'Fetching…' : 'Auto-fetch Location'}
            </button>
          </div>

          {/* Pin Marker SVG overlay */}
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

        {/* Coordinate inputs */}
        <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#F1F5F9] shrink-0">
          {error && (
            <div className="flex items-center gap-1.5 mb-2.5 text-[12px] font-['Outfit'] text-[#DC2626]">
              <AlertCircle size={13} />
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#475569] font-['Outfit']">Latitude</label>
              <input
                type="text"
                value={lat}
                onChange={e => setLat(e.target.value)}
                placeholder="e.g. 17.418980"
                className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#E2E8F0] bg-white text-[13px] font-['Outfit'] text-[#0F172A] focus:outline-none focus:border-[#94A3B8] placeholder-[#94A3B8]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-[#475569] font-['Outfit']">Longitude</label>
              <input
                type="text"
                value={lng}
                onChange={e => setLng(e.target.value)}
                placeholder="e.g. 78.343770"
                className="w-full px-2.5 py-1.5 rounded-[6px] border border-[#E2E8F0] bg-white text-[13px] font-['Outfit'] text-[#0F172A] focus:outline-none focus:border-[#94A3B8] placeholder-[#94A3B8]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-[#F1F5F9] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-[6px] text-[13px] font-semibold font-['Outfit'] text-[#475569] border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(lat, lng)}
            disabled={!canConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-[13px] font-semibold font-['Outfit'] bg-[#0F172A] text-white hover:bg-[#1E293B] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Check size={13} />
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

  const handleMapConfirm = (lat: string, lng: string) => {
    update({ latitude: lat, longitude: lng })
    closeMap()
  }

  return (
    <>
      <MapDialog
        isOpen={mapOpen}
        onClose={closeMap}
        onConfirm={handleMapConfirm}
        initialLat={fd.latitude}
        initialLng={fd.longitude}
      />

      <div ref={sectionRef} className="px-2 md:px-3 mt-3 md:mt-4 w-full">
        <div className="bg-white rounded-[7px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#F8FAFC] to-white border-b border-[#F1F5F9] px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2 md:gap-2.5">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-[7px] bg-white flex items-center justify-center border border-[#E2E8F0] shadow-sm">
              <Compass size={15} className="text-[#475569]" />
            </div>
            <h2 className="text-[14px] font-semibold text-[#0F172A] font-['Outfit'] leading-tight">
              Estate Positioning
            </h2>
          </div>

          <div className="p-3 md:p-4 space-y-3 md:space-y-4">

            {/* ── Row 1 – Map Actions & Coordinates ─────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-3 items-end">

              {/* Open Google Maps */}
              <div className="flex flex-col gap-1 w-full">
                <label className="text-[12px] font-medium text-[#475569] pl-0.5 font-['Outfit']">
                  Map Location
                </label>
                <button
                  type="button"
                  onClick={openMap}
                  className="h-[34px] w-full flex items-center justify-center gap-1.5 px-3 rounded-[6px] border border-[#BFDBFE] bg-[#EFF6FF] text-[12px] font-semibold font-['Outfit'] text-[#2563EB] hover:bg-[#DBEAFE] hover:border-[#93C5FD] transition-all duration-200 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                >
                  <Globe size={13} className="shrink-0" />
                  Open Google Maps
                </button>
              </div>

              {/* Latitude */}
              <TextField
                label="Latitude"
                value={fd.latitude}
                placeholder="e.g. 17.41898"
                readOnly
                onChange={() => {}}
              />

              {/* Longitude */}
              <TextField
                label="Longitude"
                value={fd.longitude}
                placeholder="e.g. 78.34377"
                readOnly
                onChange={() => {}}
              />
            </div>

            <div className="h-px w-full bg-[#F1F5F9]" />

            {/* ── Row 2 – Administrative Details ────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
              <Dropdown
                label="Country"
                value={fd.country || 'India'}
                options={COUNTRIES}
                placeholder="Select country"
                onChange={val => update({ country: val })}
              />
              <Dropdown
                label="State"
                value={fd.state}
                options={STATES}
                placeholder="Select state"
                searchable
                onChange={val => update({ state: val })}
              />
              <TextField
                label="City"
                value={fd.city}
                placeholder="e.g. Hyderabad"
                onChange={val => update({ city: val })}
              />
              <TextField
                label="District"
                value={fd.district}
                placeholder="e.g. Rangareddy"
                onChange={val => update({ district: val })}
              />
            </div>

            <div className="h-px w-full bg-[#F1F5F9]" />

            {/* ── Row 3 – Location Details ───────────────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
              <TextField
                label="Location / Road"
                value={fd.location}
                placeholder="e.g. Honeywell Driveway"
                onChange={val => update({ location: val })}
              />
              <TextField
                label="Micro Location"
                value={fd.microLocation}
                placeholder="e.g. Financial District"
                onChange={val => update({ microLocation: val })}
              />
              <Dropdown
                label="Zone"
                value={fd.zone}
                options={ZONES}
                placeholder="Select zone"
                onChange={val => update({ zone: val })}
              />
              <Dropdown
                label="Corporation"
                value={fd.corporation}
                options={CORPORATIONS}
                placeholder="Select corporation"
                searchable
                onChange={val => update({ corporation: val })}
              />
            </div>

            <div className="h-px w-full bg-[#F1F5F9]" />

            {/* ── Row 4 – Additional Zoning Details ─────────────────────── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 items-end">
              <Dropdown
                label="ORR Zoning"
                value={fd.orrZoning}
                options={orrZoningList}
                placeholder="Select ORR zoning"
                onChange={val => update({ orrZoning: val })}
              />
              <TextField
                label="Colony / Layout Name"
                value={fd.colonyLayout}
                placeholder="Optional"
                onChange={val => update({ colonyLayout: val })}
              />
              <Dropdown
                label="Circle"
                value={fd.circle}
                options={CIRCLES}
                placeholder="Select circle"
                onChange={val => update({ circle: val })}
              />
              {/* Add ORR Zoning */}
              <TextField
                label="Pincode"
                value={fd.pincode}
                placeholder="e.g. 500032"
                onChange={val => update({ pincode: val.replace(/\D/g, '').slice(0, 6) })}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}