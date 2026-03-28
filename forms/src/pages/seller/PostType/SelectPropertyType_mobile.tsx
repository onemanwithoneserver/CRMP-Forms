import React, { useState } from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeMobileProps {
  propertyType: string | undefined
}

// Ultra-premium radio component used inside the expanded card configuration.
function PostTypeOptionMobile({
  option,
  selected,
  onClick
}: {
  option: { value: string; label: string }
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}) {
  const [isActive, setIsActive] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={() => setIsActive(true)}
      onPointerUp={() => setIsActive(false)}
      onPointerLeave={() => setIsActive(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '12px 14px', width: '100%', textAlign: 'left',
        background: selected ? 'linear-gradient(135deg, rgba(28, 42, 68, 0.05) 0%, rgba(15, 27, 46, 0.02) 100%)' : '#FFFFFF',
        border: selected ? '1px solid rgba(200, 155, 60, 0.3)' : '1px solid #E4E7EC',
        borderRadius: '4px', cursor: 'pointer',
        transition: 'all 200ms ease',
        transform: isActive ? 'scale(0.98)' : 'scale(1)',
        outline: 'none',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div
        style={{
          width: '18px', height: '18px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          background: selected ? '#C89B3C' : '#F5F7FA',
          border: selected ? '1px solid transparent' : '1px solid #E4E7EC',
          transition: 'all 200ms ease',
          boxShadow: selected ? '0 2px 4px rgba(200, 155, 60, 0.3)' : 'none'
        }}
      >
        {selected && (
          <div
            style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#FFFFFF',
              boxShadow: '0 0 4px rgba(255, 255, 255, 0.8)'
            }}
          />
        )}
      </div>
      <span
        style={{
          fontSize: '0.9rem',
          fontWeight: selected ? 600 : 500,
          color: selected ? '#1C2A44' : '#445069',
          transition: 'color 200ms ease',
          letterSpacing: '-0.01em'
        }}
      >
        {option.label}
      </span>
    </button>
  )
}

export default function SelectPropertyTypeMobile({ propertyType }: SelectPropertyTypeMobileProps) {
  const { state, dispatch } = useForm()
  const { postType } = state.formData

  const selectedCardContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0', fontFamily: "'Outfit', sans-serif" }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1C2A44', margin: 0, letterSpacing: '-0.01em' }}>
          What do you want to do?
        </h2>
        <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, rgba(200, 155, 60, 0.3) 0%, transparent 100%)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SELLER_POST_TYPES.filter(option => {
          if (propertyType === 'land') {
            return option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
          }
          return true
        }).map(option => {
          const selected = postType === option.value
          return (
            <PostTypeOptionMobile
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

return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Outfit', sans-serif", padding: '0 8px' }}>
      {propertyType ? (
        <>
          {/* Active Handoff: Compact 4-Column Grid */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '8px',
              transition: 'all 300ms ease'
            }}
          >
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

          {/* Elevated Active Card below */}
          <div style={{ transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
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
          </div>
        </>
      ) : (
        /* Default View: Staggered Flex Layout (Centers the bottom 2) */
        <div 
          style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '8px',
            width: '100%',
            transition: 'all 300ms ease'
          }}
        >
          {PROPERTY_TYPE_CARDS.map((type) => (
            <div
              key={type.id}
              style={{
                width: 'calc(33.333% - 6px)',
              }}
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