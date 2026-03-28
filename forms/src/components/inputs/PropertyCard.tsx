import React, { useState } from 'react'
import { CheckCircle2, LucideIcon } from 'lucide-react'
import { useDevice } from '../../context/DeviceContext'

export interface PropertyCardProps {
  label: string
  icon: LucideIcon
  selected: boolean
  compact?: boolean
  row?: boolean
  className?: string
  onClick: () => void
  children?: React.ReactNode
}

export function PropertyCard({ label, icon: Icon, selected, compact, row, className, onClick, children }: PropertyCardProps) {
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const [isHovered, setIsHovered] = useState(false)

  // 1. SELECTED STATE (Premium layout with children support)
  if (selected) {
    return (
      <div 
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          width: '100%',
          borderRadius: '3px',
          border: '1px solid #C89B3C',
          background: '#FFFFFF',
          boxShadow: '0 4px 16px rgba(15, 27, 46, 0.08), 0 2px 4px rgba(200, 155, 60, 0.05)',
          overflow: 'hidden',
          transition: 'all 250ms ease-in-out',
          fontFamily: "'Outfit', sans-serif"
        }}
        className={className}
      >
        {/* Left Side: Property Identifier */}
        <div
          onClick={onClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: isMobile ? 'flex-start' : 'center',
            position: 'relative',
            cursor: 'pointer',
            width: isMobile ? '100%' : '150px',
            minHeight: isMobile ? 'auto' : '130px',
            borderRight: isMobile ? 'none' : '1px solid #E4E7EC',
            borderBottom: isMobile && children ? '1px solid #E4E7EC' : 'none',
            padding: isMobile ? '10px 12px' : '20px',
            background: '#F5F7FA', // Subtle Light Gray contrast
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', flexDirection: isMobile ? 'row' : 'column', gap: isMobile ? '10px' : '12px' }}>
            <div 
              style={{
                width: isMobile ? '32px' : '48px',
                height: isMobile ? '32px' : '48px',
                borderRadius: '3px',
                background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', // Premium Navy Gradient
                border: '1px solid #E6C36A',
                boxShadow: '0 2px 6px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon size={isMobile ? 16 : 24} color="#E6C36A" />
            </div>
            <span style={{
              fontWeight: 600,
              color: '#1C2A44',
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              textAlign: 'center',
              lineHeight: 1.1,
              paddingRight: isMobile ? '24px' : '0' // space for checkmark
            }}>
              {label}
            </span>
          </div>
          <div style={{ position: 'absolute', top: isMobile ? '10px' : '12px', right: isMobile ? '12px' : '12px' }}>
            <CheckCircle2 size={isMobile ? 16 : 18} color="#C89B3C" fill="#FFFFFF" />
          </div>
        </div>

        {/* Right Side / Bottom: Sub-options (Children) */}
        {children && (
          <div style={{ flex: 1, padding: isMobile ? '12px' : '16px', background: '#FFFFFF' }}>
            {children}
          </div>
        )}
      </div>
    )
  }

  // 2. ROW STATE (Horizontal List Layout)
  if (row) {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          padding: '8px 10px',
          borderRadius: '3px',
          border: `1px solid ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
          background: isHovered ? '#FFFFFF' : '#F5F7FA',
          boxShadow: isHovered ? '0 2px 8px rgba(15, 27, 46, 0.08)' : 'none',
          transition: 'all 250ms ease-in-out',
          cursor: 'pointer',
          outline: 'none',
          fontFamily: "'Outfit', sans-serif"
        }}
      >
        <div style={{
          width: '28px', height: '28px', borderRadius: '3px',
          background: isHovered ? '#F5F7FA' : '#FFFFFF',
          border: `1px solid ${isHovered ? '#E6C36A' : '#E4E7EC'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          transition: 'all 250ms ease-in-out'
        }}>
          <Icon size={14} color={isHovered ? '#C89B3C' : '#667085'} style={{ transition: 'color 250ms ease-in-out' }} />
        </div>
        <span style={{
          fontWeight: isHovered ? 600 : 500,
          color: isHovered ? '#1C2A44' : '#667085',
          fontSize: '0.85rem',
          textAlign: 'left',
          flex: 1,
          transition: 'color 250ms ease-in-out'
        }}>
          {label}
        </span>
      </button>
    )
  }

  // 3. DEFAULT STATE (Grid / Vertical Block Layout)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: compact ? '6px 4px' : (isMobile ? '10px 8px' : '16px 12px'),
        gap: compact ? '4px' : (isMobile ? '6px' : '10px'),
        borderRadius: '3px',
        border: `1px solid ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
        background: isHovered ? '#FFFFFF' : '#F5F7FA',
        boxShadow: isHovered ? '0 4px 12px rgba(15, 27, 46, 0.08)' : 'none',
        transform: isHovered ? 'translateY(-1px)' : 'none',
        transition: 'all 250ms ease-in-out',
        cursor: 'pointer',
        outline: 'none',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div style={{
        width: compact ? '24px' : (isMobile ? '28px' : '40px'),
        height: compact ? '24px' : (isMobile ? '28px' : '40px'),
        borderRadius: '3px',
        background: isHovered ? 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)' : '#FFFFFF',
        border: `1px solid ${isHovered ? '#E6C36A' : '#E4E7EC'}`,
        boxShadow: isHovered ? '0 2px 4px rgba(15, 27, 46, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.05)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 250ms ease-in-out'
      }}>
        <Icon 
          size={compact ? 12 : (isMobile ? 14 : 18)} 
          color={isHovered ? '#E6C36A' : '#667085'} 
          style={{ transition: 'color 250ms ease-in-out' }} 
        />
      </div>
      <span style={{
        fontWeight: isHovered ? 600 : 500,
        color: isHovered ? '#1C2A44' : '#667085',
        fontSize: compact ? (isMobile ? '0.65rem' : '0.7rem') : (isMobile ? '0.75rem' : '0.85rem'),
        textAlign: 'center',
        lineHeight: 1.15,
        wordBreak: 'break-word',
        letterSpacing: '-0.01em',
        transition: 'color 250ms ease-in-out'
      }}>
        {label === 'Entire Building' && compact ? 'Building' : label}
      </span>
    </button>
  )
}