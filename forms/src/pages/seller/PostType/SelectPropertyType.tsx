import React from 'react'
import {
  Building2,
  Store,
  Map,
  CheckCircle2,
  Landmark
} from 'lucide-react'
import { useForm, SELLER_POST_TYPES, SELLER_SUB_CATEGORIES } from '../../../context/FormContext'
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
  const { postType, postSubCategory, propertyType } = state.formData

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
            <div className="mt-4 sm:mt-5 transition-all duration-300 animate-in fade-in slide-in-from-top-2">
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
                        onClick={(e: React.MouseEvent) => {
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
  )
}