import React from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { OptionButton } from '../../../components/inputs/OptionButton'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeDesktopProps {
  propertyType: string | undefined
}

export default function SelectPropertyTypeDesktop({ propertyType }: SelectPropertyTypeDesktopProps) {
  const { state, dispatch } = useForm()
  const { postType } = state.formData

  const selectedCardContent = (
    <div className="flex flex-col gap-3 py-1">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <p className="text-[12px] font-extrabold text-[#445069] m-0 font-['Outfit'] tracking-wider leading-tight uppercase opacity-70">
            What do you want to do?
          </p>
          {postType && (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] bg-[#C89B3C]/10 border border-[#C89B3C]/20">
              <span className="text-[10px] font-bold text-[#C89B3C] uppercase tracking-wide leading-none">
                {SELLER_POST_TYPES.find(o => o.value === postType)?.label}
              </span>
            </div>
          )}
        </div>
      </div>

      <hr className="border-t border-[#C89B3C]/10 mb-1" />

      <div className="grid grid-cols-2 gap-x-8 gap-y-1">
        {SELLER_POST_TYPES.filter(option => {
          if (propertyType === 'land') {
            return option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
          }
          return true
        }).map(option => {
          const selected = postType === option.value
          return (
            <button
              key={option.value}
              type="button"
              className="flex items-center gap-3 py-2 w-full text-left transition-all duration-200 group"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                if (!selected) {
                  dispatch({ type: 'updateData', payload: { postType: option.value, postSubCategory: '' } })
                }
              }}
            >
              <div className={`radio-circle shrink-0 ${selected ? 'active scale-105' : 'border-[#E2E8F0] group-hover:border-[#C89B3C]/40'}`} />
              <span className={`text-[14px] font-['Outfit'] tracking-tight transition-colors ${selected ? 'font-bold text-[#1C2A44]' : 'font-medium text-[#667085] opacity-80'}`}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop/Tablet: compact row of unselected cards */}
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
  )
}
