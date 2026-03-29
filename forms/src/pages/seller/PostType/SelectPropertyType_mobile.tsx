import React from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeMobileProps {
  propertyType: string | undefined
}

function PostTypeRadioOptionMobile({
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
      className="flex flex-row items-center gap-[5px] px-[8px] py-[5px] cursor-pointer bg-transparent border-none outline-none group active:scale-[0.98] transition-transform"
    >
      <div className={`w-[13px] h-[13px] rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
        selected ? 'border-[#C89B3C] bg-navy' : 'border-[#C4C9D4]'
      }`}>
        {selected && <div className="w-[4px] h-[4px] rounded-full bg-[#E6C36A]" />}
      </div>
      <span className={`text-[0.8rem] tracking-[-0.01em] transition-colors whitespace-nowrap ${
        selected ? 'font-semibold text-navy' : 'font-medium text-[#667085]'
      }`}>
        {option.label}
      </span>
    </button>
  )
}

export default function SelectPropertyTypeMobile({ propertyType }: SelectPropertyTypeMobileProps) {
  const { state, dispatch } = useForm()
  const { postType } = state.formData
  const noBuilding = propertyType === 'land' || !postType

  const unselected = PROPERTY_TYPE_CARDS.filter(t => t.id !== propertyType)
  const isOdd = unselected.length % 2 !== 0

  return (
    <div className="flex flex-col gap-[8px] font-outfit px-[4px]">
      {/* Unified unselected options grid for all states */}
      <div className={`grid gap-[6px] transition-all duration-300 ease-out ${noBuilding ? 'grid-cols-2' : 'grid-cols-4'}`}>
        {unselected.map((type, idx) => {
          const isLastLone = noBuilding && isOdd && idx === unselected.length - 1
          return (
            <div
              key={type.id}
              className={`${
                isLastLone ? 'col-span-2 flex justify-center' : noBuilding ? 'min-h-[80px]' : ''
              }`}
            >
              <div className={isLastLone ? 'w-[calc(50%-3px)] min-h-[80px]' : 'w-full h-full'}>
                <PropertyCard
                  icon={type.icon}
                  label={type.label}
                  selected={false}
                  compact={!noBuilding}
                  onClick={() => dispatch({
                    type: 'updateData',
                    payload: { propertyType: type.id, postType: '', postSubCategory: '' },
                  })}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Option — only rendered when a property type is chosen */}
      {propertyType && (
        <div className="transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] mt-[4px]">
          {PROPERTY_TYPE_CARDS.filter(t => t.id === propertyType).map(type => {
            const Icon = type.icon
            return (
              <div 
                key={type.id} 
                className={`relative flex items-center justify-between gap-[6px] px-[8px] rounded-[4px] border border-[#C89B3C] bg-white shadow-[0_2px_8px_rgba(15,27,46,0.06)] ${noBuilding ? 'min-h-[80px] py-0' : 'py-[6px]'}`}
              >
                {/* Outer Gold Checkmark */}
                <div 
                  className="absolute -top-[8px] -right-[8px] z-10 bg-white rounded-full flex items-center justify-center shadow-sm"
                  title="Selected Property Type"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#C89B3C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>

                {/* Left Side: Icon & Label */}
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'updateData', payload: { propertyType: '', postType: '', postSubCategory: '' } })}
                  className="flex flex-col items-center gap-[6px] flex-shrink-0 cursor-pointer bg-transparent border-none p-0 outline-none group min-w-[56px]"
                >
                  <div className="w-[32px] h-[32px] rounded-[3px] bg-navy border border-[#C89B3C] flex items-center justify-center flex-shrink-0 shadow-[0_2px_6px_rgba(15,27,46,0.25)]">
                    <Icon size={16} color="#E6C36A" />
                  </div>
                  <span className="text-[0.7rem] font-semibold text-navy text-center leading-tight">
                    {type.label}
                  </span>
                </button>

                {/* Vertical Separator Line */}
                <div className="w-px h-[24px] bg-border flex-shrink-0" />

                {/* Right Side: Radio Controls */}
                <div className="flex flex-col gap-[10px] min-w-0">
                  {SELLER_POST_TYPES.filter(option => 
                    option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
                  ).map(option => {
                    const selected = postType === option.value
                    return (
                      <PostTypeRadioOptionMobile
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
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}