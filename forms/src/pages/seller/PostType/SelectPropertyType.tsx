import React from 'react'
import {
  Building2,
  Store,
  Map,
  Landmark
} from 'lucide-react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { OptionButton } from '../../../components/inputs/OptionButton'

const PROPERTY_TYPE_CARDS = [
  { id: 'land', label: 'Land', icon: Map },
  { id: 'retail', label: 'Retail', icon: Store },
  { id: 'office', label: 'Office', icon: Building2 },
  { id: 'coworking', label: 'Coworking', icon: Building2 },
  { id: 'entire_building', label: 'Entire Building', icon: Landmark },
]

interface SelectPropertyTypeProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

export default function SelectPropertyType({ sectionRef }: SelectPropertyTypeProps) {
  const { state, dispatch } = useForm()
  const { device } = useDevice()
  const { postType, postSubCategory, propertyType } = state.formData
  const isMobile = device === 'mobile'

  // Shared children rendered inside the expanded selected card
  const selectedCardContent = (
    <>
      <p className="text-[11px] font-bold text-[#445069] mb-1 mt-0 font-['Outfit'] tracking-wide">
        What do you want to do?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-1.5 sm:gap-1">
        {SELLER_POST_TYPES.map(option => (
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
    </>
  )

  return (
    <div ref={sectionRef} className="relative -mt-4 md:-mt-6 px-0 md:px-4 max-w-3xl mx-auto w-full">
      <div className="bg-white md:rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.06)] border-y md:border border-[var(--border-light)] overflow-hidden">
        {/* Gradient accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C]" />

        <div className="p-4">
          {/* Section heading */}
          <div className="flex items-center gap-2 md:gap-2.5 mb-3 md:mb-4">
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-md bg-[#1C2A44] flex items-center justify-center">
              <Building2 size={14} className="text-white" />
            </div>
            <h2 className="text-[0.95rem] font-bold text-[#1C2A44] font-['Outfit']">
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
                    onClick={() => dispatch({
                      type: 'updateData',
                      payload: { propertyType: type.id, postType: '', postSubCategory: '' },
                    })}
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
                  onClick={() => dispatch({
                    type: 'updateData',
                    payload: { propertyType: type.id, postType: '', postSubCategory: '' },
                  })}
                >
                  {selectedCardContent}
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
                      onClick={() => dispatch({
                        type: 'updateData',
                        payload: { propertyType: type.id, postType: '', postSubCategory: '' },
                      })}
                    />
                  )
                })}
              </div>

              {/* Selected Property Card (desktop / tablet) */}
              {propertyType && (
                <div className="mt-3 transition-all duration-300">
                  {PROPERTY_TYPE_CARDS.filter(type => type.id === propertyType).map(type => (
                    <PropertyCard
                      key={type.id}
                      icon={type.icon}
                      label={type.label}
                      selected={true}
                      onClick={() => { }}
                    >
                      {selectedCardContent}
                    </PropertyCard>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}