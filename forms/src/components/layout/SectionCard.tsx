import React from 'react'

interface SectionCardProps {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}

export default function SectionCard({ title, icon, children }: SectionCardProps) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: '4px',
        border: '1px solid #E4E7EC',
        boxShadow: '0 4px 12px rgba(15, 27, 46, 0.05)',
        overflow: 'hidden',
        marginBottom: '16px',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <div 
        style={{ 
          height: '6px', 
          width: '100%', 
          background: 'linear-gradient(90deg, #1C2A44 0%, #3b5998 50%, #C89B3C 100%)' 
        }} 
      />
      
      <div style={{ padding: '16px 20px' }}>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            marginBottom: '20px' 
          }}
        >
          {icon && (
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#C89B3C' 
              }}
            >
              {icon}
            </div>
          )}
          <h3 
            style={{ 
              fontSize: '0.9rem', 
              fontWeight: 700, 
              color: '#1C2A44', 
              margin: 0,
              letterSpacing: '-0.01em'
            }}
          >
            {title}
          </h3>
        </div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </div>
      
    </div>
  )
}