import React from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeDesktopProps {
  propertyType: string | undefined
}

function PostTypeTabOption({
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
      className={`px-[16px] py-[4px] text-[0.85rem] tracking-[-0.01em] rounded-[4px] cursor-pointer transition-all duration-200 ease-out outline-none ${
        selected
          ? 'bg-navy text-white font-semibold shadow-[0_1px_3px_rgba(15,27,46,0.2)]'
          : 'bg-transparent text-text-tertiary font-medium hover:text-navy hover:bg-black/5'
      }`}
    >
      {option.label}
    </button>
  )
}

export default function SelectPropertyTypeDesktop({ propertyType }: SelectPropertyTypeDesktopProps) {
  const { state, dispatch } = useForm()
  const { postType } = state.formData

  return (
    <div className="font-outfit">
      <div
        className={`grid gap-[8px] transition-all duration-300 ease-out ${propertyType ? 'grid-cols-4' : 'grid-cols-5'}`}
      >
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
      {propertyType && (
        <div className="mt-[8px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]">
          {PROPERTY_TYPE_CARDS.filter(type => type.id === propertyType).map(type => {
            const Icon = type.icon
            return (
              <div
                key={type.id}
                className="flex items-center gap-[12px] px-[12px] py-[8px] rounded-[3px] border border-gold bg-white shadow-[0_2px_8px_rgba(15,27,46,0.06),0_1px_3px_rgba(200,155,60,0.08)] font-outfit"
              >
                {/* Selected property icon + label */}
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'updateData', payload: { propertyType: '', postType: '', postSubCategory: '' } })}
                  className="flex items-center gap-[8px] flex-shrink-0 cursor-pointer bg-transparent border-none p-0 group"
                  title="Change property type"
                >
                  <div className="w-[36px] h-[36px] rounded-[3px] bg-gradient-to-br from-navy to-navy-dark border border-gold shadow-[0_2px_6px_rgba(15,27,46,0.25)] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} color="#E6C36A" />
                  </div>
                  <span className="text-[0.85rem] font-semibold text-navy whitespace-nowrap leading-tight group-hover:text-gold-light transition-colors">
                    {type.label}
                  </span>
                </button>
                {/* Divider */}
                <div className="w-px h-[24px] bg-border flex-shrink-0" />
                {/* "What do you want to do?" + post-type buttons */}
                <div className="flex items-center justify-between gap-[16px] flex-1 min-w-0">
                  <h2 className="text-[0.88rem] font-bold text-navy m-0 tracking-[-0.01em] whitespace-nowrap">
                    What do you want to do?
                  </h2>
                  <div className="flex items-center bg-[#F5F7FA] p-[2px] rounded-[6px] border border-border flex-shrink-0">
                    {SELLER_POST_TYPES.filter(option =>
                      option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
                    ).map(option => {
                      const selected = postType === option.value
                      return (
                        <PostTypeTabOption
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
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}