import React, { useRef, useEffect, useState } from 'react'
import {
  Building2,
  MapPin,
  Store,
  Map,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Save,
  Navigation,
  Landmark
} from 'lucide-react'
import { useForm, SELLER_POST_TYPES, SELLER_SUB_CATEGORIES } from '../../../context/FormContext'
import { Dropdown } from '../../../components/inputs/Dropdown'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { OptionButton } from '../../../components/inputs/OptionButton'
import { useDevice } from '../../../context/DeviceContext'

const PROPERTY_TYPE_CARDS = [
  { id: 'land', label: 'Land', icon: Map },
  { id: 'retail', label: 'Retail', icon: Store },
  { id: 'office', label: 'Office', icon: Building2 },
  { id: 'coworking', label: 'Coworking', icon: Building2 },
  { id: 'entire_building', label: 'Entire Building', icon: Landmark },
]

export default function PostType() {
  const { state, dispatch, next } = useForm()
  const { postType, postSubCategory, propertyType, city } = state.formData
  const { device } = useDevice()
  const isMobile = device === 'mobile'

  const [localLocation, setLocalLocation] = useState({
    latitude: '',
    longitude: '',
    state: '',
    pincode: '',
    microLocation: '',
    corporation: '',
    zone: '',
    circle: '',
    orrZoning: '',
    colony: '',
    buildingType: ''
  })

  // Conditional field rendering based on property type
  const showColony = propertyType === 'land' || propertyType === 'entire_building';
  const showBuildingType = ['retail', 'office', 'coworking', 'entire_building'].includes(propertyType || '');

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
    <div className="flex flex-col h-auto bg-[#fafafa]">
      <div className="flex-1 overflow-y-auto scroll-smooth">

        {/* ─── Hero ─── */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#1C2A44] via-[#243352] to-[#1a2740] pt-2 pb-4 rounded-b-[4px]">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C]" />
          <div className="relative max-w-3xl mx-auto text-center px-4">
            <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white font-['Outfit'] tracking-tight leading-snug`}>
              What type of property do you want to list?
            </h1>
          </div>
        </div>

        {/* ─── Select Property Type Card ─── */}
        <div ref={postTypeSectionRef} className={`relative -mt-4 ${isMobile ? 'px-2' : 'px-4'} w-full`}>
          <div className="bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[var(--border-light)] overflow-hidden">
            {/* Gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C]" />

            <div className={isMobile ? 'p-2' : 'p-3'}>
              {/* Section heading */}
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-5 h-5 rounded-[4px] bg-[#1C2A44] flex items-center justify-center">
                  <Building2 size={12} className="text-white" />
                </div>
                <h2 className="text-[0.85rem] font-bold text-[#1C2A44] font-['Outfit']">
                  Select Property Type
                </h2>
              </div>

              {/* Unselected Property Cards Wrapper */}
              <div className={propertyType
                ? 'flex flex-wrap justify-center gap-1.5 md:gap-2.5 w-[200px] h-full'
                : (isMobile
                  ? 'flex flex-wrap justify-center gap-1'
                  : 'grid grid-cols-5 gap-1.5')
              }>
                {PROPERTY_TYPE_CARDS.map((type, index) => {
                  if (propertyType === type.id) return null

                  const wrapClass = propertyType
                    ? "col-span-1"
                    : (isMobile ? "w-[calc(33.333%-4px)] flex-none" : "col-span-1")

                  return (
                    <div key={type.id} className={wrapClass}>
                      <PropertyCard
                        icon={type.icon}
                        label={type.label}
                        selected={false}
                        compact={!!propertyType}
                        onClick={() => dispatch({
                          type: 'updateData', payload: {
                            propertyType: type.id,
                            postType: '',
                            postSubCategory: ''
                          }
                        })}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Selected Property Card */}
              {propertyType && (
                <div className="mt-2 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                  {PROPERTY_TYPE_CARDS.filter(type => type.id === propertyType).map(type => (
                    <PropertyCard
                      key={type.id}
                      icon={type.icon}
                      label={type.label}
                      selected={true}
                      onClick={() => { }}
                    >
                      <p className="text-[11px] font-bold text-[#445069] font-['Outfit'] tracking-wide mb-1">
                        What do you want to do?
                      </p>

                      <div className={`grid gap-1 ${isMobile ? 'grid-cols-2' : 'grid-cols-4'}`}>
                        {SELLER_POST_TYPES.map(option => (
                          <OptionButton
                            key={option.value}
                            label={option.label}
                            selected={postType === option.value}
                            onClick={(e) => {
                              e.stopPropagation()
                              if (postType !== option.value) {
                                dispatch({ type: 'updateData', payload: { postType: option.value, postSubCategory: '' } })
                              }
                            }}
                          />
                        ))}
                      </div>

                      {/* Sub-category pills */}
                      {postType && SELLER_SUB_CATEGORIES[postType] && (
                        <div className="mt-1.5 pt-1.5 border-t border-[#C89B3C]/15">
                          <p className="text-[10px] font-bold text-[#445069] mb-1 font-['Outfit'] tracking-wide">
                            Select Category
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {SELLER_SUB_CATEGORIES[postType].map(sub => {
                              const isSubSelected = postSubCategory === sub
                              return (
                                <button
                                  key={sub}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    dispatch({ type: 'updateData', payload: { postSubCategory: sub } })
                                  }}
                                  className={`
                                    px-2 py-0.5 rounded-[4px] text-[10px] font-semibold font-['Outfit'] transition-all duration-200 border
                                    ${isSubSelected
                                      ? 'bg-[#C89B3C] text-white border-[#C89B3C] shadow-sm'
                                      : 'bg-white text-[#4a5568] border-[#D0D4DC] hover:border-[#C89B3C]/40 hover:bg-[#FFFBF0]/50'
                                    }
                                  `}
                                >
                                  {sub}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </PropertyCard>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Location Section ─── */}
        <div
          ref={locationSectionRef}
          className={`${isMobile ? 'px-2' : 'px-4'} mt-1.5 w-full`}
        >
          <div className="bg-white rounded-[8px] shadow-[0_1px_8px_rgba(0,0,0,0.06)] border border-[var(--border-light)] p-2">

            {/* Header */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <div className="w-5 h-5 rounded-[4px] bg-[#1C2A44] flex items-center justify-center">
                <MapPin size={11} className="text-white" />
              </div>
              <h2 className="text-[0.85rem] font-bold text-[#1C2A44] font-['Outfit']">Location</h2>
            </div>

            {/* Two-column layout: Map left · Form right */}
            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>

              {/* Left — Pin drop map */}
              <div className={`${isMobile ? 'w-full' : 'w-[36%] shrink-0'} flex flex-col`}>
                <div className="flex-1 min-h-[148px] bg-[#f5f6f8] rounded-[4px] relative overflow-hidden flex flex-col items-center justify-center border border-dashed border-[#dde0e7]">
                  <MapPin size={22} className="text-[#C89B3C] mb-1" />
                  <span className="text-[0.7rem] font-semibold text-[#a0a8b5] z-10 font-['Outfit'] text-center px-2 leading-snug">
                    Pin drop selector<br />will appear here
                  </span>
                  <button className="mt-1.5 z-10 px-2 py-1 bg-white rounded-[4px] shadow-sm text-[0.7rem] font-bold text-[#1C2A44] border border-[#e2e6ec] flex items-center gap-1 hover:bg-[#f8f9fb] transition-colors font-['Outfit']">
                    <Navigation size={9} className="text-[#3b82f6]" /> Auto-fetch
                  </button>
                </div>
              </div>

              {/* Right — Form fields, 3 per row */}
              <div className="flex-1 min-w-0">
                <div className={`grid gap-1 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>

                  {/* Row 1: Latitude · Longitude · Pincode */}
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">Latitude</label>
                    <input type="number" step="any" className="form-input" placeholder="e.g. 12.9716" value={localLocation.latitude} onChange={(e) => setLocalLocation(s => ({ ...s, latitude: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">Longitude</label>
                    <input type="number" step="any" className="form-input" placeholder="e.g. 77.5946" value={localLocation.longitude} onChange={(e) => setLocalLocation(s => ({ ...s, longitude: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">Pincode</label>
                    <input type="text" maxLength={6} className="form-input" placeholder="e.g. 560001" value={localLocation.pincode} onChange={(e) => setLocalLocation(s => ({ ...s, pincode: e.target.value }))} />
                  </div>

                  {/* Row 2: City · State · Micro Location */}
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">City</label>
                    <input type="text" className="form-input" placeholder="e.g. Bangalore" value={city || ''} onChange={(e) => dispatch({ type: 'updateData', payload: { city: e.target.value } })} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">State</label>
                    <input type="text" className="form-input" placeholder="e.g. Karnataka" value={localLocation.state} onChange={(e) => setLocalLocation(s => ({ ...s, state: e.target.value }))} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">Micro Location</label>
                    <input type="text" className="form-input" placeholder="Micro location..." value={localLocation.microLocation} onChange={(e) => setLocalLocation(s => ({ ...s, microLocation: e.target.value }))} />
                  </div>

                  {/* Row 3: Corporation · Zone · Circle */}
                  <Dropdown
                    label="Corporation"
                    value={localLocation.corporation}
                    options={['BBMP', 'BMA', 'BDA']}
                    placeholder="Select Corporation"
                    onChange={(val) => setLocalLocation(s => ({ ...s, corporation: val }))}
                  />
                  <Dropdown
                    label="Zone"
                    value={localLocation.zone}
                    options={['East Zone', 'West Zone', 'North Zone', 'South Zone']}
                    placeholder="Select Zone"
                    onChange={(val) => setLocalLocation(s => ({ ...s, zone: val }))}
                  />
                  <Dropdown
                    label="Circle"
                    value={localLocation.circle}
                    options={['Domlur', 'Indiranagar', 'Koramangala']}
                    placeholder="Select Circle"
                    searchable
                    onChange={(val) => setLocalLocation(s => ({ ...s, circle: val }))}
                  />

                  {/* Row 4: ORR Zoning + conditional Colony */}
                  <div className="flex flex-col gap-0.5">
                    <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">ORR Zoning</label>
                    <input type="text" className="form-input" placeholder="ORR Zoning (Optional)" value={localLocation.orrZoning} onChange={(e) => setLocalLocation(s => ({ ...s, orrZoning: e.target.value }))} />
                  </div>

                  {showColony && (
                    <div className={`flex flex-col gap-0.5 ${!isMobile ? 'col-span-2' : ''}`}>
                      <label className="text-[10px] font-semibold text-[#445069] pl-0.5 font-['Outfit']">Colony / Layout Name</label>
                      <input type="text" className="form-input border-dashed border-[#dde0e7]" placeholder="e.g. Defence Colony" value={localLocation.colony} onChange={(e) => setLocalLocation(s => ({ ...s, colony: e.target.value }))} />
                    </div>
                  )}

                  {/* Building Type — conditional, full row */}
                  {showBuildingType && (
                    <div className={!isMobile ? 'col-span-3' : ''}>
                      <Dropdown
                        label="Building / Building Type"
                        value={localLocation.buildingType}
                        options={[
                          'Standalone Building',
                          'Tech Park',
                          'Business Park',
                          'Mall',
                          'High Street',
                          'Shopping Complex',
                          'Independent House/Villa',
                          'Other'
                        ]}
                        placeholder="Select Building Type"
                        searchable
                        onChange={(val) => setLocalLocation(s => ({ ...s, buildingType: val }))}
                      />
                    </div>
                  )}
                </div>
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
  )
}
