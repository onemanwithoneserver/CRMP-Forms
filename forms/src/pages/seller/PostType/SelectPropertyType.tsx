import React from 'react'
import { LayoutGrid } from 'lucide-react'
import { useForm } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import SelectPropertyTypeDesktop from './SelectPropertyType_desktop'
import SelectPropertyTypeMobile from './SelectPropertyType_mobile'

interface SelectPropertyTypeProps {
  sectionRef?: React.RefObject<HTMLDivElement | null>
}

export default function SelectPropertyType({ sectionRef }: SelectPropertyTypeProps) {
  const { state } = useForm()
  const { device } = useDevice()
  const { propertyType } = state.formData
  const isMobile = device === 'mobile'

  return (
    <div 
      ref={sectionRef} 
      style={{
        position: 'relative',
        marginTop: isMobile ? '-24px' : '-32px',
        padding: isMobile ? '0' : '0 16px',
        maxWidth: '896px',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
        transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Outfit', sans-serif",
        zIndex: 20
      }}
    >
      <div 
        style={{
          background: '#FFFFFF',
          borderRadius: isMobile ? '0' : '4px',
          boxShadow: '0 8px 32px rgba(15, 27, 46, 0.08), 0 2px 8px rgba(15, 27, 46, 0.04)',
          border: isMobile ? 'none' : '1px solid #E4E7EC',
          borderTop: isMobile ? '1px solid #E4E7EC' : '1px solid #E4E7EC',
          borderBottom: isMobile ? '1px solid #E4E7EC' : '1px solid #E4E7EC',
          overflow: 'hidden'
        }}
      >
        <div 
          style={{ 
            height: '4px', 
            width: '100%', 
            background: 'linear-gradient(90deg, #1C2A44 0%, #C89B3C 100%)' 
          }} 
        />

        <div style={{ padding: isMobile ? '16px' : '24px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: isMobile ? '16px' : '24px' }}>
            <div 
              style={{ 
                width: isMobile ? '32px' : '36px', 
                height: isMobile ? '32px' : '36px', 
                borderRadius: '3px', 
                background: '#F5F7FA', 
                border: '1px solid #E4E7EC', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                boxShadow: 'inset 0 1px 0 #FFFFFF, 0 1px 2px rgba(15, 27, 46, 0.05)' 
              }}
            >
              <LayoutGrid size={isMobile ? 16 : 18} color="#1C2A44" />
            </div>
            <h2 style={{ fontSize: isMobile ? '1.05rem' : '1.15rem', fontWeight: 700, color: '#1C2A44', margin: 0, letterSpacing: '-0.01em' }}>
              Select Property Type
            </h2>
          </div>

          {isMobile ? (
            <SelectPropertyTypeMobile propertyType={propertyType} />
          ) : (
            <SelectPropertyTypeDesktop propertyType={propertyType} />
          )}
        </div>
      </div>
    </div>
  )
}