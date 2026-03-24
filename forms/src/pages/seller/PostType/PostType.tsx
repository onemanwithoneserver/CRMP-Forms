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

  const [localLocation, setLocalLocation] = useState({
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
        <div ref={postTypeSectionRef} className="relative -mt-4 px-2 md:px-4 max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[var(--border-light)] overflow-hidden">
            {/* Gradient accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C]" />

            <div className="p-3">
              {/* Section heading */}
              <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
                <div className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-[#1C2A44] flex items-center justify-center">
                  <Building2 size={14} className="text-white" />
                </div>
                <h2 className="text-[0.95rem] font-bold text-[#1C2A44] font-['Outfit']">
                  Select Property Type
                </h2>
              </div>

              {/* Unselected Property Cards Wrapper */}
              <div className={propertyType
                ? "grid grid-cols-4 gap-1.5 md:gap-2.5"
                : "flex flex-wrap justify-center gap-1.5 md:gap-2.5"
              }>
                {PROPERTY_TYPE_CARDS.map((type, index) => {
                  if (propertyType === type.id) return null

                  const layoutClass = propertyType
                    ? "col-span-1"
                    : "w-[calc(33.333%-4px)] flex-none md:flex-1 md:w-auto md:max-w-none"

                  return (
                    <PropertyCard
                      key={type.id}
                      icon={type.icon}
                      label={type.label}
                      selected={false}
                      className={layoutClass}
                      compact={!!propertyType}
                      onClick={() => dispatch({
                        type: 'updateData', payload: {
                          propertyType: type.id,
                          postType: '',
                          postSubCategory: ''
                        }
                      })}
                    />
                  )
                })}
              </div>

              {/* Selected Property Card */}
              {propertyType && (
                <div className="mt-3 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                  {PROPERTY_TYPE_CARDS.filter(type => type.id === propertyType).map(type => (
                    <PropertyCard
                      key={type.id}
                      icon={type.icon}
                      label={type.label}
                      selected={true}
                      onClick={() => { }}
                    >
                      <p className="text-[13px] font-bold text-[#445069] mb-3 mt-1 font-['Outfit'] tracking-wide">
                        What do you want to do?
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
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
                        <div className="mt-4 pt-4 border-t border-[#C89B3C]/15">
                          <p className="text-[12px] font-bold text-[#445069] mb-2.5 font-['Outfit'] tracking-wide">
                            Select Category
                          </p>
                          <div className="flex flex-wrap gap-2">
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
                                    px-3.5 py-1.5 rounded-[5px] text-[12px] sm:text-[13px] font-semibold font-['Outfit'] transition-all duration-200 border
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
          className="px-2 md:px-4 mt-2 max-w-3xl mx-auto w-full"
        >
          <div className="bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-[var(--border-light)] p-2">

            <div className="flex items-center gap-2 md:gap-2.5 mb-2 md:mb-1.5">
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-[#1C2A44] flex items-center justify-center">
                <MapPin size={14} className="text-white" />
              </div>
              <h2 className="text-[0.95rem] font-bold text-[#1C2A44] font-['Outfit']">
                Location
              </h2>
            </div>

            {/* Map placeholder */}
            <div className="w-full h-28 md:h-36 bg-[#f5f6f8] rounded-md mb-3 md:mb-4 relative overflow-hidden flex flex-col items-center justify-center border border-dashed border-[#dde0e7]">
              <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1C2A44 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              <MapPin size={28} className="text-[#C89B3C] mb-1.5" />
              <span className="text-[0.8rem] font-semibold text-[#a0a8b5] z-10 font-['Outfit']">Pin drop selector will appear here</span>
              <button className="mt-2.5 z-10 px-3 py-1.5 md:px-3.5 md:py-1.5 bg-white rounded-md shadow-sm text-[0.8rem] font-bold text-[#1C2A44] border border-[#e2e6ec] flex items-center gap-1.5 hover:bg-[#f8f9fb] transition-colors font-['Outfit']">
                <Navigation size={12} className="text-[#3b82f6]" /> Auto-fetch Location
              </button>
            </div>

            {/* Location Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 md:gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#445069] pl-0.5 font-['Outfit']">City</label>
                <input type="text" className="form-input" placeholder="e.g. Bangalore" value={city || ''} onChange={(e) => dispatch({ type: 'updateData', payload: { city: e.target.value } })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#445069] pl-0.5 font-['Outfit']">Micro Location</label>
                <input type="text" className="form-input" placeholder="Search micro location..." value={localLocation.microLocation} onChange={(e) => setLocalLocation(s => ({ ...s, microLocation: e.target.value }))} />
              </div>
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
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#445069] pl-0.5 font-['Outfit']">ORR Zoning</label>
                <input type="text" className="form-input" placeholder="Enter ORR Zoning (Optional)" value={localLocation.orrZoning} onChange={(e) => setLocalLocation(s => ({ ...s, orrZoning: e.target.value }))} />
              </div>
              {showColony && (
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs font-semibold text-[#445069] pl-0.5 font-['Outfit']">Colony / Layout Name (Optional)</label>
                  <input type="text" className="form-input bg-[rgba(255,255,255,0.5)] border-dashed border-[#dde0e7]" placeholder="e.g. Defence Colony" value={localLocation.colony} onChange={(e) => setLocalLocation(s => ({ ...s, colony: e.target.value }))} />
                </div>
              )}
              {showBuildingType && (
                <div className="md:col-span-2">
                  <Dropdown
                    label="Choose Building / Building Type"
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