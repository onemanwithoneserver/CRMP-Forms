import React from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeMobileProps {
  propertyType: string | undefined
}

function PostTypeTabOptionMobile({
  option,
  selected,
  onClick
}: {
  option: { value: string; label: string }
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-[12px] py-[4px] text-center text-[0.8rem] tracking-[-0.01em] rounded-[4px] cursor-pointer transition-all duration-200 ease-out active:scale-[0.98] outline-none ${
        selected
          ? 'bg-navy text-white font-semibold shadow-[0_1px_3px_rgba(15,27,46,0.2)]'
          : 'bg-transparent text-text-tertiary font-medium'
      }`}
    >
      {option.label}
    </button>
  )
}

import { ChevronRight } from 'lucide-react'

export default function SelectPropertyTypeMobile({ propertyType }: SelectPropertyTypeMobileProps) {
  const { state, dispatch, next } = useForm()
  const { postType } = state.formData

  const selectedCardContent = (
    <div className="flex items-center justify-between gap-[8px] py-[4px] px-[4px] font-outfit">
      {/* 1. Question Section */}
      <h2 className="text-[12px] font-bold text-navy m-0 tracking-[-0.01em] leading-tight">
        What do you want to do?
      </h2>
      {/* 2. Tab Controls Beside Question */}
      <div className="flex items-center shrink-0 bg-[#F5F7FA] p-[2px] rounded-[6px] border border-border">
        {SELLER_POST_TYPES.filter(option => 
          option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
        ).map(option => {
          const selected = postType === option.value
          return (
            <PostTypeTabOptionMobile
              key={option.value}
              option={option}
              selected={selected}
              onClick={(e) => {
                e.stopPropagation()
                if (!selected) {
                  dispatch({ type: 'updateData', payload: { postType: option.value, postSubCategory: '' } })
                }
              }}
            />
          )
        })}
      </div>
      {/* 3. Arrow Control to Advance Step */}
      <button
        type="button"
        aria-label="Next"
        className="ml-[8px] flex items-center justify-center w-[28px] h-[28px] rounded-full bg-gradient-to-br from-navy to-navy-dark border border-gold shadow-[0_2px_6px_rgba(15,27,46,0.10)] active:scale-95 transition"
        onClick={(e) => {
          e.stopPropagation()
          next()
        }}
      >
        <ChevronRight size={18} color="#E6C36A" />
      </button>
    </div>
  )

  return (
    <div className="flex flex-col gap-[8px] font-outfit px-[4px]">
      {propertyType ? (
        <>
          <div className="grid grid-cols-4 gap-[6px] transition-all duration-300 ease-out">
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
          <div className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
            {PROPERTY_TYPE_CARDS.filter(t => t.id === propertyType).map(type => (
              <PropertyCard
                key={type.id}
                icon={type.icon}
                label={type.label}
                selected={true}
                compact={true}
                onClick={() => { }}
              >
                {selectedCardContent}
              </PropertyCard>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap justify-center gap-[6px] w-full transition-all duration-300 ease-out">
          {PROPERTY_TYPE_CARDS.map((type) => (
            <div
              key={type.id}
              className="w-[calc(33.333%-4px)]"
            >
              <PropertyCard
                icon={type.icon}
                label={type.label}
                selected={false}
                compact={true}
                onClick={() => dispatch({
                  type: 'updateData',
                  payload: { propertyType: type.id, postType: '', postSubCategory: '' },
                })}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}