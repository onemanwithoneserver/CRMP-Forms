import React from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { OptionButton } from '../../../components/inputs/OptionButton'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeMobileProps {
  propertyType: string | undefined
}

export default function SelectPropertyTypeMobile({ propertyType }: SelectPropertyTypeMobileProps) {
  const { state, dispatch } = useForm()
  const { postType } = state.formData

  const selectedCardContent = (
    <div className="flex flex-col gap-3 py-1">
      <div className="mb-1">
        <p className="text-[15px] font-bold text-[#445069] m-0 font-['Outfit'] tracking-tight opacity-90">
          What do you want to do?
        </p>
      </div>

      <div className="flex flex-col gap-1">
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
              className="flex items-center gap-3 py-2.5 w-full text-left transition-all duration-200 group active:scale-[0.98]"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                if (!selected) {
                  dispatch({ type: 'updateData', payload: { postType: option.value, postSubCategory: '' } })
                }
              }}
            >
              <div className={`radio-circle shrink-0 ${selected ? 'active scale-110' : 'group-hover:border-[#C89B3C]/50'}`} />
              <span className={`text-[14px] font-['Outfit'] tracking-tight transition-colors ${selected ? 'font-bold text-[#1C2A44]' : 'font-medium text-[#445069] opacity-80'}`}>
                {option.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="flex flex-col gap-4">
      {propertyType ? (
        <>
          {/* Top Row: Unselected items in a compact 4-col grid */}
          <div className="grid grid-cols-4 gap-2">
            {PROPERTY_TYPE_CARDS.filter(t => t.id !== propertyType).map(type => (
              <PropertyCard
                key={type.id}
                icon={type.icon}
                label={type.label}
                selected={false}
                compact={true}
                onClick={() => dispatch({
                  type: 'updateData',
                  payload: { propertyType: type.id, postType: '', postSubCategory: '' },
                })}
              />
            ))}
          </div>

          {/* Bottom Card: Selected item with configuration question */}
          {PROPERTY_TYPE_CARDS.filter(t => t.id === propertyType).map(type => (
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
        </>
      ) : (
        /* Default: 2-column grid for all items (2x3 feel) */
        <div className="grid grid-cols-2 gap-2">
          {PROPERTY_TYPE_CARDS.map((type, idx) => (
            <PropertyCard
              key={type.id}
              icon={type.icon}
              label={type.label}
              selected={false}
              className={idx === 4 ? 'col-span-2' : ''}
              onClick={() => dispatch({
                type: 'updateData',
                payload: { propertyType: type.id, postType: '', postSubCategory: '' },
              })}
            />
          ))}
        </div>
      )}
    </div>
  )
}
