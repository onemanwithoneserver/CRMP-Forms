import React, { useState } from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import { Settings, Car, Zap, Droplets, Flame } from 'lucide-react'

// Sub-component to manage independent hover states for the numeric fields
function NumericField({
  label,
  value,
  onChange,
  placeholder = '0',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  let borderColor = '#E4E7EC'
  let background = '#F5F7FA'
  let shadow = 'none'

  if (isFocused) {
    borderColor = '#C89B3C'
    background = '#FFFFFF'
    shadow = '0 2px 8px rgba(15, 27, 46, 0.08), 0 0 0 3px rgba(200, 155, 60, 0.1)'
  } else if (isHovered) {
    borderColor = '#E6C36A'
    background = '#FFFFFF'
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          height: '34px',
          padding: '0 10px',
          fontSize: '0.85rem',
          fontWeight: 500,
          color: '#1C2A44',
          background: background,
          border: `1px solid ${borderColor}`,
          borderRadius: '3px',
          outline: 'none',
          transition: 'all 250ms ease-in-out',
          boxShadow: shadow,
          boxSizing: 'border-box',
        }}
      />
    </div>
  )
}

export default function Facilities() {
  const { state, dispatch, next, back } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'

  const isBuiltSpace = pType !== 'land'
  const isBuiltOrLand = true // power shown for all

  const show = {
    designatedParking: isBuiltSpace,
    noOfParkings: isBuiltSpace,
    visitorParking: isBuiltSpace,
    powerBackup: isBuiltSpace,
    powerLoad: isBuiltOrLand,
    powerPhase: isBuiltOrLand,
    washrooms: isBuiltSpace,
    fireSprinklers: isBuiltSpace,
    fireExtinguishers: isBuiltSpace,
    waterConnection: pType === 'land',
  }

  const renderVerticalBoolean = (label: string, field: keyof typeof state.formData) => {
    const control = (
      <SegmentedControl
        compact={!isMobile}
        options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
        value={(d[field] as string) || 'No'}
        onChange={v => onUpdate({ [field]: v })}
      />
    )

    if (isMobile) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '6px 0', fontFamily: "'Outfit', sans-serif" }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
          <div style={{ width: '120px' }}>{control}</div>
        </div>
      )
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>
        <div>{control}</div>
      </div>
    )
  }

  return (
    <FormPage title="Facilities" icon={<Settings size={20} color="#E6C36A" />} onBack={back} onNext={next}>
      <div style={{ maxWidth: '896px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Outfit', sans-serif" }}>

        {/* SECTION: Facilities - Parking */}
        {show.designatedParking && (
          <SectionCard title="Parking Details" icon={<Car size={14} />}>
            {isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {renderVerticalBoolean('Designated parking', 'designatedParking')}
                
                <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <NumericField label="No. of parkings" value={d.noOfParkings} onChange={v => onUpdate({ noOfParkings: v })} />
                  <Dropdown
                    label="Visitor parking"
                    value={d.visitorParking}
                    options={['Yes', 'No', 'Limited']}
                    placeholder="Select"
                    onChange={v => onUpdate({ visitorParking: v })}
                  />
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {renderVerticalBoolean('Designated parking', 'designatedParking')}
                <NumericField label="No. of parkings" value={d.noOfParkings} onChange={v => onUpdate({ noOfParkings: v })} />
                <Dropdown
                  label="Visitor parking"
                  value={d.visitorParking}
                  options={['Yes', 'No', 'Limited']}
                  placeholder="Select"
                  onChange={v => onUpdate({ visitorParking: v })}
                />
              </div>
            )}
          </SectionCard>
        )}

        {/* SECTION: Facilities - Power */}
        <SectionCard title="Power & Electrical" icon={<Zap size={14} />}>
          {isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {show.powerBackup && renderVerticalBoolean('Power backup', 'powerBackup')}
              
              <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <NumericField label="Power load (kW)" value={d.powerLoad} onChange={v => onUpdate({ powerLoad: v })} />
                <Dropdown
                  label="Power phase"
                  value={d.powerPhase}
                  options={['Single', 'Three']}
                  placeholder="Select"
                  onChange={v => onUpdate({ powerPhase: v })}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {show.powerBackup && renderVerticalBoolean('Power backup', 'powerBackup')}
              <NumericField label="Power load (kW)" value={d.powerLoad} onChange={v => onUpdate({ powerLoad: v })} />
              <Dropdown
                label="Power phase"
                value={d.powerPhase}
                options={['Single', 'Three']}
                placeholder="Select"
                onChange={v => onUpdate({ powerPhase: v })}
              />
            </div>
          )}
        </SectionCard>

        {/* SECTIONS: Hygiene & Fire Safety — side by side on desktop */}
        {(show.washrooms || show.waterConnection || show.fireSprinklers) && (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px' }}>

            {/* Facilities - Hygiene & Utilities */}
            {(show.washrooms || show.waterConnection) && (
              <SectionCard title="Hygiene & Utilities" icon={<Droplets size={14} />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {show.washrooms && (
                    <Dropdown
                      label="Washroom Configuration"
                      value={d.washrooms}
                      options={['Yes, within unit', 'No', 'Common with building']}
                      placeholder="Select setup"
                      onChange={v => onUpdate({ washrooms: v })}
                    />
                  )}
                  {show.waterConnection && renderVerticalBoolean('Water connection', 'waterConnection')}
                </div>
              </SectionCard>
            )}

            {/* Facilities - Fire Safety */}
            {show.fireSprinklers && (
              <SectionCard title="Fire Safety" icon={<Flame size={14} />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {renderVerticalBoolean('Fire sprinklers', 'fireSprinklers')}
                  
                  {isMobile && <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />}
                  
                  {renderVerticalBoolean('Fire extinguishers', 'fireExtinguishers')}
                </div>
              </SectionCard>
            )}

          </div>
        )}

      </div>
    </FormPage>
  )
}