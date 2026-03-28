import React, { useState } from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'
import { LayoutGrid, Ruler, Construction, Armchair, Monitor, Calendar, X, Check } from 'lucide-react'

const APPLIANCE_LIST = ['AC', 'Fridge', 'Water dispenser', 'Microwave', 'Printer', 'Internet modem']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CURRENT_YEAR = new Date().getFullYear()
const MONTHS_OPTIONS = MONTHS.flatMap(m =>
  [CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2].map(y => `${m} ${y}`)
)

function NumericField({
  label,
  value,
  onChange,
  placeholder = '0',
  prefix,
  suffix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  prefix?: string
  suffix?: string
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
      <div style={{ position: 'relative', width: '100%' }}>
        {prefix && (
          <span 
            style={{ 
              position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', 
              color: isFocused ? '#C89B3C' : '#667085', fontSize: '0.85rem', fontWeight: 600, 
              pointerEvents: 'none', zIndex: 10, transition: 'color 250ms ease'
            }}
          >
            {prefix}
          </span>
        )}
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
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: prefix ? '24px' : '10px',
            paddingRight: suffix ? '28px' : '10px',
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
        {suffix && (
          <span 
            style={{ 
              position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', 
              color: isFocused ? '#C89B3C' : '#667085', fontSize: '0.8rem', fontWeight: 600, 
              pointerEvents: 'none', zIndex: 10, transition: 'color 250ms ease'
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function StringField({
  label,
  value,
  onChange,
  placeholder,
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
        type="text"
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

function PremiumCheckbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <label 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", width: 'fit-content' }}
    >
      <div 
        style={{
          width: '18px', height: '18px', borderRadius: '3px',
          background: checked ? '#C89B3C' : '#FFFFFF',
          border: checked ? '1px solid #C89B3C' : `1px solid ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 200ms ease',
          boxShadow: checked ? '0 2px 4px rgba(200, 155, 60, 0.3)' : 'none'
        }}
      >
        {checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
      </div>
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: checked ? '#1C2A44' : '#445069', transition: 'color 200ms ease' }}>
        {label}
      </span>
    </label>
  )
}

export default function UnitDetails() {
  const { state, dispatch, next, back } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const d = state.formData
  const [isApplianceModalOpen, setIsApplianceModalOpen] = useState(false)

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'
  const isBuiltSpace = pType !== 'land'

  const isVisible = (field: string) => {
    switch (field) {
      case 'plotSize': return ['land', 'entire_building'].includes(pType)
      case 'unitFacing': return true
      case 'plotDimensions': return pType === 'land'
      case 'builtUpArea': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)
      case 'layoutDimensions': return ['retail', 'office'].includes(pType)
      case 'carpetArea': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)
      case 'floor': return ['retail', 'office', 'coworking'].includes(pType)
      case 'totalFloors': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)
      case 'idealFor': return true
      case 'cornerUnit': return ['land', 'retail', 'entire_building'].includes(pType)
      case 'frontage': return ['land', 'retail'].includes(pType)
      case 'ceilingHeight': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)

      case 'spaceCondition': return isBuiltSpace
      case 'glassFacade': return ['retail', 'office'].includes(pType)
      case 'flooring': return isBuiltSpace
      case 'walls': return isBuiltSpace
      case 'electricals': return isBuiltSpace
      case 'hvac': return isBuiltSpace
      case 'lighting': return isBuiltSpace
      case 'compoundWall': return true
      case 'waterConnection': return true

      case 'partitionsType': return ['retail', 'office'].includes(pType)
      case 'numberOfRooms': return isBuiltSpace
      case 'externalBranding': return ['retail', 'office', 'coworking'].includes(pType)
      case 'meetingRooms': return pType === 'office'
      case 'conferenceRoom': return ['office', 'coworking', 'entire_building'].includes(pType)
      case 'receptionArea': return ['office', 'coworking', 'entire_building'].includes(pType)
      case 'brandingSpace': return ['retail', 'office', 'coworking'].includes(pType)
      case 'falseCeiling': return ['retail', 'office', 'entire_building'].includes(pType)
      case 'storageSpace': return isBuiltSpace
      case 'columnFree': return ['retail', 'office'].includes(pType)

      case 'workstations': return isBuiltSpace
      case 'chairs': return isBuiltSpace
      case 'storageCupboards': return isBuiltSpace
      case 'sofaLounge': return isBuiltSpace
      case 'receptionDesk': return isBuiltSpace
      case 'pantryEquipment': return isBuiltSpace
      case 'appliances': return isBuiltSpace

      default: return false
    }
  }

  const toggleAppliance = (app: string) => {
    const arr = d.appliances || []
    onUpdate({ appliances: arr.includes(app) ? arr.filter(a => a !== app) : [...arr, app] })
  }

  const renderBoolean = (label: string, field: keyof typeof state.formData) => {
    const control = (
      <SegmentedControl
        compact={!isMobile}
        options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
        value={typeof d[field] === 'boolean' ? (d[field] ? 'Yes' : 'No') : ((d[field] as string) || 'No')}
        onChange={v => {
          const isBoolField = typeof d[field] === 'boolean'
          onUpdate({ [field]: isBoolField ? v === 'Yes' : v } as any)
        }}
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
    <FormPage title="Unit Details" icon={<LayoutGrid size={20} color="#E6C36A" />} onBack={back} onNext={next}>
      <div style={{ maxWidth: '896px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Outfit', sans-serif" }}>

        <SectionCard title="Size & Dimensions" icon={<Ruler size={14} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
              {isVisible('plotSize') && <NumericField label="Plot size" value={d.plotSize} onChange={v => onUpdate({ plotSize: v })} placeholder="e.g. 1200" suffix="sq. yds" />}
              {isVisible('plotDimensions') && <StringField label="Plot dimensions (L × B)" value={d.plotDimensions} onChange={v => onUpdate({ plotDimensions: v })} placeholder="e.g. 40x30" />}
              {isVisible('builtUpArea') && <NumericField label="Built-up area" value={d.totalBuiltUpArea} onChange={v => onUpdate({ totalBuiltUpArea: v })} placeholder="0" suffix="sq. ft" />}
              {isVisible('carpetArea') && <NumericField label="Carpet area" value={d.carpetArea} onChange={v => onUpdate({ carpetArea: v })} placeholder="0" suffix="sq. ft" />}
              
              {isVisible('layoutDimensions') && (
                <>
                  <NumericField label="Layout length" value={d.layoutDimensionsLength} onChange={v => onUpdate({ layoutDimensionsLength: v })} placeholder="0" suffix="ft" />
                  <NumericField label="Layout breadth" value={d.layoutDimensionsBreadth} onChange={v => onUpdate({ layoutDimensionsBreadth: v })} placeholder="0" suffix="ft" />
                </>
              )}

              {isVisible('floor') && <NumericField label="Floor number" value={d.floor} onChange={v => onUpdate({ floor: v })} placeholder="0" />}
              {isVisible('totalFloors') && <NumericField label="Total floors in building" value={d.totalFloors} onChange={v => onUpdate({ totalFloors: v })} placeholder="0" />}
              {isVisible('frontage') && <NumericField label="Frontage" value={d.frontage} onChange={v => onUpdate({ frontage: v })} placeholder="0" suffix="ft" />}
              {isVisible('ceilingHeight') && <NumericField label="Ceiling height" value={d.ceilingHeight} onChange={v => onUpdate({ ceilingHeight: v })} placeholder="0" suffix="ft" />}
              
              {isVisible('unitFacing') && (
                <Dropdown label="Unit facing" value={d.unitFacing} options={['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West']} placeholder="Select facing direction" onChange={v => onUpdate({ unitFacing: v })} />
              )}
              {isVisible('idealFor') && (
                <Dropdown label="Ideal for" value={d.idealFor} options={['Retail shop', 'Showroom', 'Office space', 'Restaurant', 'Clinic', 'Logistics / Warehouse', 'Education', 'Other']} placeholder="Select business category" onChange={v => onUpdate({ idealFor: v })} />
              )}
            </div>

            {isVisible('cornerUnit') && (
              <div style={{ marginTop: '4px' }}>
                <PremiumCheckbox label="This is a corner unit" checked={!!d.cornerUnit} onChange={v => onUpdate({ cornerUnit: v })} />
              </div>
            )}
          </div>
        </SectionCard>

        {isBuiltSpace && (
          <SectionCard title="Space Readiness" icon={<Construction size={14} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {isVisible('spaceCondition') && <Dropdown label="Space condition" value={d.spaceCondition} options={['Bare shell', 'Warm shell', 'Semi-fitted', 'Fully fitted', 'Plug & play']} placeholder="Select condition" onChange={v => onUpdate({ spaceCondition: v })} />}
                {isVisible('flooring') && <Dropdown label="Flooring" value={d.flooring} options={['None', 'Basic', 'Premium']} placeholder="Select flooring" onChange={v => onUpdate({ flooring: v })} />}
                {isVisible('walls') && <Dropdown label="Walls" value={d.walls} options={['Bare', 'Painted', 'Panelled']} placeholder="Select wall finish" onChange={v => onUpdate({ walls: v })} />}
                {isVisible('electricals') && <Dropdown label="Electricals" value={d.electricals} options={['None', 'Basic', 'Fully wired']} placeholder="Select electricals" onChange={v => onUpdate({ electricals: v })} />}
                {isVisible('hvac') && <Dropdown label="HVAC (AC)" value={d.hvac} options={['None', 'Provision only', 'Installed']} placeholder="Select HVAC" onChange={v => onUpdate({ hvac: v })} />}
                {isVisible('lighting') && <Dropdown label="Lighting" value={d.lighting} options={['None', 'Basic', 'Designer']} placeholder="Select lighting" onChange={v => onUpdate({ lighting: v })} />}
              </div>

              <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {isVisible('glassFacade') && renderBoolean('Glass facade (for external branding)', 'glassFacade')}
                {isVisible('compoundWall') && renderBoolean('Compound wall available', 'compoundWall')}
                {isVisible('waterConnection') && renderBoolean('Water connection available', 'waterConnection')}
              </div>
            </div>
          </SectionCard>
        )}

        {isBuiltSpace && (
          <SectionCard title="Interiors & Layout" icon={<Armchair size={14} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
                {isVisible('partitionsType') && <Dropdown label="Partitions type" value={d.partitionsType} options={['None', 'Glass', 'Gypsum', 'Wall']} placeholder="Select partitions" onChange={v => onUpdate({ partitionsType: v })} />}
                {isVisible('externalBranding') && <Dropdown label="External branding options" value={d.externalBranding} options={['Space available outside', 'Available inside building', 'Both']} placeholder="Select branding option" onChange={v => onUpdate({ externalBranding: v })} />}
                {isVisible('numberOfRooms') && <NumericField label="No. of rooms / partitions" value={d.numberOfRooms} onChange={v => onUpdate({ numberOfRooms: v })} />}
                {isVisible('meetingRooms') && <NumericField label="No. of meeting rooms" value={d.meetingRooms} onChange={v => onUpdate({ meetingRooms: v })} />}
                {isVisible('storageSpace') && <StringField label="Storage space (describe)" value={d.storageSpace} onChange={v => onUpdate({ storageSpace: v })} placeholder="e.g. 50 sq ft separate pantry" />}
              </div>

              <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {isVisible('conferenceRoom') && renderBoolean('Conference room', 'conferenceRoom')}
                {isVisible('receptionArea') && renderBoolean('Reception area', 'receptionArea')}
                {isVisible('brandingSpace') && renderBoolean('Branding space available', 'brandingSpace')}
                {isVisible('falseCeiling') && renderBoolean('False ceiling installed', 'falseCeiling')}
                {isVisible('columnFree') && renderBoolean('Column-free layout', 'columnFree')}
              </div>
            </div>
          </SectionCard>
        )}

        {isBuiltSpace && (
          <SectionCard title="Furniture & Appliances" icon={<Monitor size={14} />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {isVisible('workstations') && <NumericField label="Workstations / tables" value={d.workstations} onChange={v => onUpdate({ workstations: v })} />}
                {isVisible('chairs') && <NumericField label="Chairs" value={d.chairs} onChange={v => onUpdate({ chairs: v })} />}
              </div>

              <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {isVisible('storageCupboards') && renderBoolean('Storage / cupboards', 'storageCupboards')}
                {isVisible('sofaLounge') && renderBoolean('Sofa / lounge area', 'sofaLounge')}
                {isVisible('receptionDesk') && renderBoolean('Reception desk', 'receptionDesk')}
                {isVisible('pantryEquipment') && renderBoolean('Pantry equipment', 'pantryEquipment')}
              </div>

              {isVisible('appliances') && (
                <>
                  <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsApplianceModalOpen(true)}
                      style={{
                        height: '36px', padding: '0 16px', borderRadius: '3px',
                        background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)',
                        border: '1px solid #E6C36A', color: '#FFFFFF',
                        fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                        boxShadow: '0 2px 6px rgba(15,27,46,0.25)', transition: 'all 200ms ease',
                        outline: 'none', display: 'flex', alignItems: 'center', gap: '8px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <span>Add / Edit Appliances</span>
                    </button>
                    <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {(d.appliances || []).map(app => (
                        <span key={app} style={{ padding: '4px 10px', background: '#F5F7FA', color: '#1C2A44', fontSize: '0.75rem', fontWeight: 600, borderRadius: '3px', border: '1px solid #E4E7EC' }}>
                          {app}
                        </span>
                      ))}
                      {d.appliancesOthers && (
                        <span style={{ padding: '4px 10px', background: 'rgba(200, 155, 60, 0.1)', color: '#C89B3C', fontSize: '0.75rem', fontWeight: 600, borderRadius: '3px', border: '1px solid rgba(200, 155, 60, 0.3)' }}>
                          Other: {d.appliancesOthers}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </SectionCard>
        )}

        <SectionCard title="Unit Availability" icon={<Calendar size={14} />}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', alignItems: 'end' }}>
              {renderBoolean('Is it immediately available?', 'isImmediatelyAvailable')}
              
              {d.isImmediatelyAvailable === 'No' && (
                <Dropdown label="Tentative Available Month" value={d.tentativeMonth} options={MONTHS_OPTIONS} placeholder="Select month" onChange={v => onUpdate({ tentativeMonth: v })} />
              )}
            </div>

            {(['land', 'retail', 'office', 'coworking'].includes(pType) || pType === 'land') && (
              <>
                <div style={{ height: '1px', width: '100%', background: '#E4E7EC' }} />
                <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', alignItems: 'end' }}>
                  {['land', 'retail', 'office', 'coworking'].includes(pType) && (
                    <StringField label="Unit No. (If any)" value={d.unitNo} onChange={v => onUpdate({ unitNo: v })} placeholder="e.g. A-204, Shop 12" />
                  )}

                  {['retail', 'office', 'coworking'].includes(pType) && (
                    <NumericField label="No. of Units Available" value={d.numberOfUnitsAvailable} onChange={v => onUpdate({ numberOfUnitsAvailable: v })} placeholder="0" />
                  )}

                  {pType === 'land' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1C2A44' }}>No. of Units Available</label>
                      <SegmentedControl
                        options={[{ label: 'Single', value: 'Single' }, { label: 'Multiple', value: 'Multiple' }]}
                        value={d.numberOfUnitsAvailable || 'Single'}
                        onChange={v => onUpdate({ numberOfUnitsAvailable: v })}
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </SectionCard>

        {isApplianceModalOpen && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(15, 27, 46, 0.6)', backdropFilter: 'blur(4px)', fontFamily: "'Outfit', sans-serif" }}>
            <div style={{ position: 'absolute', inset: 0 }} onClick={() => setIsApplianceModalOpen(false)} />
            <div style={{ position: 'relative', background: '#FFFFFF', borderRadius: '4px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 16px 48px rgba(15, 27, 46, 0.15)', border: '1px solid #E4E7EC', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid #E4E7EC', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', flexShrink: 0 }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#FFFFFF', margin: 0, letterSpacing: '-0.01em' }}>Add / Edit Appliances</h3>
                <button
                  onClick={() => setIsApplianceModalOpen(false)}
                  style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '3px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', cursor: 'pointer', transition: 'all 200ms ease', outline: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
                >
                  <X size={14} />
                </button>
              </div>

              <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1C2A44', marginBottom: '16px', display: 'block' }}>Select Available Appliances</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
                  {APPLIANCE_LIST.map(app => (
                    <PremiumCheckbox
                      key={app}
                      label={app}
                      checked={(d.appliances || []).includes(app)}
                      onChange={() => toggleAppliance(app)}
                    />
                  ))}
                </div>

                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #E4E7EC' }}>
                  <StringField
                    label="Other Appliances (List any additional items)"
                    value={d.appliancesOthers}
                    onChange={v => onUpdate({ appliancesOthers: v })}
                    placeholder="e.g. Dishwasher, Wine cooler..."
                  />
                </div>
              </div>

              <div style={{ padding: '16px 20px', borderTop: '1px solid #E4E7EC', background: '#F5F7FA', display: 'flex', justifyContent: 'flex-end', gap: '12px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => setIsApplianceModalOpen(false)}
                  style={{ height: '36px', padding: '0 20px', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 600, color: '#667085', background: '#FFFFFF', border: '1px solid #E4E7EC', cursor: 'pointer', transition: 'all 200ms ease', outline: 'none' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#C89B3C'; e.currentTarget.style.color = '#1C2A44' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#E4E7EC'; e.currentTarget.style.color = '#667085' }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsApplianceModalOpen(false)}
                  style={{ height: '36px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 24px', borderRadius: '3px', fontSize: '0.85rem', fontWeight: 600, color: '#FFFFFF', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', border: '1px solid #E6C36A', cursor: 'pointer', boxShadow: '0 2px 6px rgba(15,27,46,0.25)', transition: 'all 200ms ease', outline: 'none' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </FormPage>
  )
}