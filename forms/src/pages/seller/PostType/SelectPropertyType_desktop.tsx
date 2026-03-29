import React from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeDesktopProps {
  propertyType: string | undefined
}

function PostTypeRadioOption({
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
      className="flex flex-row items-center gap-[2px] px-[4px] py-[2px] cursor-pointer bg-transparent border-none outline-none group"
    >
      <div className={`w-[12px] h-[12px] rounded-full border-2 flex items-end justify-end shrink-0 transition-all duration-200 ${
        selected ? 'border-[#C89B3C] bg-navy' : 'border-[#C4C9D4] group-hover:border-navy'
      }`}>
        {selected && <div className="w-[5px] h-[5px] rounded-full bg-[#E6C36A]" />}
      </div>
      <span className={`text-[0.85rem] tracking-[-0.01em] transition-colors whitespace-nowrap ${
        selected ? 'font-semibold text-navy' : 'font-medium text-[#667085] group-hover:text-navy'
      }`}>
        {option.label}
      </span>
    </button>
  )
}

export default function SelectPropertyTypeDesktop({ propertyType }: SelectPropertyTypeDesktopProps) {
  const { state, dispatch } = useForm()
  const { postType } = state.formData
  const noBuilding = propertyType === 'land' || !postType

  const unselected = PROPERTY_TYPE_CARDS.filter(type => type.id !== propertyType)
  const isOdd = unselected.length % 2 !== 0

  return (
    <div className="font-outfit">
      <div
        className={`grid gap-[8px] transition-all duration-300 ease-out ${
          noBuilding ? 'grid-cols-2' : (propertyType ? 'grid-cols-4' : 'grid-cols-5')
        }`}
      >
        {unselected.map((type, idx) => {
          const isLastLone = noBuilding && isOdd && idx === unselected.length - 1
          return (
            <div
              key={type.id}
              className={`${
                isLastLone ? 'col-span-2 flex justify-center' : noBuilding ? 'min-h-[100px]' : ''
              }`}
            >
              <div className={isLastLone ? 'w-[calc(50%-4px)] min-h-[100px]' : 'w-full h-full'}>
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
      {propertyType && (
        <div className="mt-[2px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
          {PROPERTY_TYPE_CARDS.filter(type => type.id === propertyType).map(type => {
            const Icon = type.icon
            return (
              <div
                key={type.id}
                className={`relative flex justify-end px-[12px] rounded-[3px] border border-gold bg-white shadow-[0_2px_8px_rgba(15,27,46,0.06),0_1px_3px_rgba(200,155,60,0.08)] font-outfit ${noBuilding ? 'min-h-[100px] py-0 items-center' : 'py-[8px]'}`}
                style={{ gap: '72%' }}
              >
                <div 
                  className="absolute -top-[10px] -right-[10px] bg-white rounded-full flex items-center justify-center shadow-sm"
                  title="Selected Property Type"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" className="fill-navy" />
                    <path d="M8 12.5L10.5 15L16 9" stroke="#E6C36A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                {/* -------------------------------- */}

                {/* Selected property icon + label */}
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'updateData', payload: { propertyType: '', postType: '', postSubCategory: '' } })}
                  className="flex flex-col items-center gap-[6px] flex-shrink-0 cursor-pointer bg-transparent border-none p-0 group min-w-[64px]"
                  title="Change property type"
                >
                  <div className="w-[36px] h-[36px] rounded-[3px] bg-gradient-to-br from-navy to-navy-dark border border-gold shadow-[0_2px_6px_rgba(15,27,46,0.25)] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} color="#E6C36A" />
                  </div>
                  <span className="text-[0.72rem] font-semibold text-navy text-center leading-tight group-hover:text-gold-light transition-colors">
                    {type.label}
                  </span>
                </button>
           
                <div className="flex flex-col gap-[12px] flex-1 min-w-0">
                  {SELLER_POST_TYPES.filter(option =>
                    option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
                  ).map(option => {
                    const selected = postType === option.value
                    return (
                      <PostTypeRadioOption
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