import React, { useState } from 'react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { PROPERTY_TYPE_CARDS } from './PropertySelectionConstants'

interface SelectPropertyTypeDesktopProps {
  propertyType: string | undefined
}

// Internal component for the custom radio options to handle independent hover states
function PostTypeOption({
  option,
  selected,
  onClick
}: {
  option: { value: string; label: string }
  selected: boolean
  onClick: (e: React.MouseEvent) => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 12px',
        width: '100%',
        textAlign: 'left',
        background: selected ? 'linear-gradient(135deg, rgba(28, 42, 68, 0.05) 0%, rgba(15, 27, 46, 0.02) 100%)' : isHovered ? '#F5F7FA' : 'transparent',
        border: selected ? '1px solid rgba(200, 155, 60, 0.3)' : `1px solid ${isHovered ? '#E4E7EC' : 'transparent'}`,
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        outline: 'none',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: selected ? '#C89B3C' : isHovered ? '#FFFFFF' : '#F5F7FA',
          border: selected ? '1px solid transparent' : `1px solid ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
          transition: 'all 200ms ease',
          boxShadow: selected ? '0 2px 4px rgba(200, 155, 60, 0.3)' : 'none'
        }}
      >
        {selected && (
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
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
          color: selected ? '#1C2A44' : isHovered ? '#1C2A44' : '#667085',
          transition: 'color 200ms ease',
          letterSpacing: '-0.01em'
        }}
      >
        {option.label}
      </span>
    </button>
  )
}

export default function SelectPropertyTypeDesktop({ propertyType }: SelectPropertyTypeDesktopProps) {
  const { state, dispatch } = useForm()
  const { postType } = state.formData

  const selectedCardContent = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '4px 0', fontFamily: "'Outfit', sans-serif" }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1C2A44', margin: 0, letterSpacing: '-0.01em' }}>
          What do you want to do?
        </h2>
        <div style={{ height: '1px', width: '100%', background: 'linear-gradient(90deg, rgba(200, 155, 60, 0.3) 0%, transparent 100%)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
        {SELLER_POST_TYPES.filter(option => {
          if (propertyType === 'land') {
            return option.label !== 'Offer Franchisee' && option.label !== 'Sell/Lease Running Business'
          }
          return true
        }).map(option => {
          const selected = postType === option.value
          return (
            <PostTypeOption
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
    <div style={{ fontFamily: "'Outfit', sans-serif" }}>
      {/* Desktop/Tablet: compact row of unselected cards */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: propertyType ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)', 
          gap: '12px',
          transition: 'all 300ms ease'
        }}
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

      {/* Selected Property Card (desktop / tablet) */}
      {propertyType && (
        <div style={{ marginTop: '16px', transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)' }}>
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
    </div>
  )
}