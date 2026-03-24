import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import TextField from '../../components/inputs/TextField'
import { Dropdown } from '../../components/inputs/Dropdown'
import CheckboxField from '../../components/inputs/CheckboxField'
import SegmentedControl from '../../components/inputs/SegmentedControl'

import iconEntireUnit from '../../assets/Unit Type/Entire Unit.svg'
import iconPartialFloor from '../../assets/Unit Type/Partial Floor.svg'
import iconFullFloor from '../../assets/Unit Type/Full Floor.svg'
import iconEntireBuilding from '../../assets/Unit Type/Entire Building.svg'
import iconShop from '../../assets/Unit Type/Shop.svg'

const UNIT_TYPES = [
  { value: 'Entire Unit', label: 'Entire unit', icon: iconEntireUnit },
  { value: 'Partial Floor', label: 'Partial floor', icon: iconPartialFloor },
  { value: 'Full Floor', label: 'Full floor', icon: iconFullFloor },
  { value: 'Entire Building', label: 'Entire building', icon: iconEntireBuilding },
  { value: 'Shop', label: 'Shop', icon: iconShop },
]

const APPLIANCE_LIST = ['AC', 'Fridge', 'Water dispenser', 'Microwave', 'Printer', 'Internet modem']

export default function UnitDetails() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'
  const isBuiltSpace = pType !== 'land'

  const isVisible = (field: string) => {
    switch (field) {
      case 'plotSize':        return ['land', 'entire_building'].includes(pType)
      case 'unitFacing':      return true
      case 'plotDimensions':  return pType === 'land'
      case 'builtUpArea':     return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)
      case 'layoutDimensions':return ['retail', 'office'].includes(pType)
      case 'carpetArea':      return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)
      case 'floor':           return ['retail', 'office', 'coworking'].includes(pType)
      case 'totalFloors':     return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)
      case 'idealFor':        return true
      case 'cornerUnit':      return ['land', 'retail', 'entire_building'].includes(pType)
      case 'frontage':        return ['land', 'retail'].includes(pType)
      case 'ceilingHeight':   return ['retail', 'office', 'coworking', 'entire_building'].includes(pType)

      case 'spaceCondition':  return isBuiltSpace
      case 'glassFacade':     return ['retail', 'office'].includes(pType)
      case 'flooring':        return isBuiltSpace
      case 'walls':           return isBuiltSpace
      case 'electricals':     return isBuiltSpace
      case 'hvac':            return isBuiltSpace
      case 'lighting':        return isBuiltSpace
      case 'compoundWall':    return true
      case 'waterConnection': return true

      case 'partitionsType':  return ['retail', 'office'].includes(pType)
      case 'numberOfRooms':   return isBuiltSpace
      case 'externalBranding':return ['retail', 'office', 'coworking'].includes(pType)
      case 'meetingRooms':    return pType === 'office'
      case 'conferenceRoom':  return ['office', 'coworking', 'entire_building'].includes(pType)
      case 'receptionArea':   return ['office', 'coworking', 'entire_building'].includes(pType)
      case 'brandingSpace':   return ['retail', 'office', 'coworking'].includes(pType)
      case 'falseCeiling':    return ['retail', 'office', 'entire_building'].includes(pType)
      case 'storageSpace':    return isBuiltSpace
      case 'columnFree':      return ['retail', 'office'].includes(pType)

      case 'workstations':        return isBuiltSpace
      case 'chairs':              return isBuiltSpace
      case 'storageCupboards':    return isBuiltSpace
      case 'sofaLounge':          return isBuiltSpace
      case 'receptionDesk':       return isBuiltSpace
      case 'pantryEquipment':     return isBuiltSpace
      case 'appliances':          return isBuiltSpace

      default: return false
    }
  }

  const toggleAppliance = (app: string) => {
    const arr = d.appliances || []
    onUpdate({ appliances: arr.includes(app) ? arr.filter(a => a !== app) : [...arr, app] })
  }

  const renderNumeric = (label: string, field: keyof typeof state.formData, placeholder = '0') => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-semibold text-[#445069] pl-0.5">{label}</label>
      <input
        type="number"
        className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-2.5 px-3 text-sm text-[#1C2A44] transition-all"
        placeholder={placeholder}
        value={d[field] as string}
        onChange={e => onUpdate({ [field]: e.target.value })}
      />
    </div>
  )

  const renderYesNo = (label: string, field: keyof typeof state.formData) => (
    <div className="flex items-center justify-between py-2 bg-white border border-[#edf0f5] px-3.5 rounded-lg">
      <span className="text-[13.5px] font-medium text-[#1C2A44]">{label}</span>
      <div className="w-[110px]">
        <SegmentedControl
          options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
          value={typeof d[field] === 'boolean' ? (d[field] ? 'Yes' : 'No') : ((d[field] as string) || 'No')}
          onChange={v => {
            const isBoolField = typeof d[field] === 'boolean'
            onUpdate({ [field]: isBoolField ? v === 'Yes' : v } as any)
          }}
        />
      </div>
    </div>
  )

  return (
    <FormPage title="Unit details" onBack={back} onNext={next}>
      <div className="flex flex-col gap-6 sm:gap-8 font-['Outfit'] pb-6">

        {/* SECTION 0: Unit Type */}
        <SectionCard title="Unit type">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
            {UNIT_TYPES.map(ut => {
              const sel = d.unitType === ut.value
              return (
                <button
                  key={ut.value}
                  type="button"
                  onClick={() => onUpdate({ unitType: ut.value })}
                  aria-pressed={sel}
                  className="flex flex-row sm:flex-col items-center justify-start sm:justify-center gap-3 sm:gap-2 p-3 sm:p-2.5 rounded-lg border transition-all"
                  style={{
                    borderColor: sel ? 'var(--accent-gold)' : 'var(--border)',
                    background: sel ? 'rgba(200,155,60,0.04)' : '#ffffff',
                    boxShadow: sel ? '0 2px 12px rgba(200,155,60,0.18)' : '0 1px 3px rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                  }}
                >
                  {ut.icon && (
                    <img
                      src={ut.icon}
                      alt={ut.label}
                      style={{
                        width: 24, height: 24,
                        opacity: sel ? 1 : 0.65,
                        transition: 'opacity 200ms',
                      }}
                    />
                  )}
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: sel ? 700 : 500,
                    color: sel ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}>
                    {ut.label}
                  </span>
                </button>
              )
            })}
          </div>
        </SectionCard>

        {/* SECTION 1: Dimensions & Layout */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Dimensions & layout
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isVisible('plotSize') && <TextField label="Plot size (sq. yards)" value={d.plotSize} onChange={v => onUpdate({ plotSize: v })} placeholder="e.g. 1200" />}
            {isVisible('plotDimensions') && renderNumeric('Plot dimensions (L × B in ft)', 'plotDimensions')}
            {isVisible('builtUpArea') && renderNumeric('Built-up area (sq. ft)', 'totalBuiltUpArea')}
            {isVisible('carpetArea') && renderNumeric('Carpet area (sq. ft)', 'carpetArea')}

            {isVisible('layoutDimensions') && (
              <>
                {renderNumeric('Layout length (ft)', 'layoutDimensionsLength')}
                {renderNumeric('Layout breadth (ft)', 'layoutDimensionsBreadth')}
              </>
            )}

            {isVisible('floor') && renderNumeric('Floor number', 'floor')}
            {isVisible('totalFloors') && renderNumeric('Total floors in building', 'totalFloors')}
            {isVisible('frontage') && renderNumeric('Frontage (ft)', 'frontage')}
            {isVisible('ceilingHeight') && renderNumeric('Ceiling height (ft)', 'ceilingHeight')}

            {isVisible('unitFacing') && (
              <Dropdown label="Unit facing" value={d.unitFacing} options={['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West']} placeholder="Select facing direction" onChange={v => onUpdate({ unitFacing: v })} />
            )}
            {isVisible('idealFor') && (
              <Dropdown label="Ideal for" value={d.idealFor} options={['Retail shop', 'Showroom', 'Office space', 'Restaurant', 'Clinic', 'Logistics / Warehouse', 'Education', 'Other']} placeholder="Select business category" onChange={v => onUpdate({ idealFor: v })} />
            )}

            {isVisible('cornerUnit') && (
              <div className="sm:col-span-2 pt-1">
                <CheckboxField label="This is a corner unit" checked={d.cornerUnit} onChange={v => onUpdate({ cornerUnit: v })} />
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Space Readiness */}
        {isBuiltSpace && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Space readiness
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('spaceCondition') && (
                <div className="sm:col-span-2">
                  <Dropdown label="Space condition" value={d.spaceCondition} options={['Bare shell', 'Warm shell', 'Semi-fitted', 'Fully fitted', 'Plug & play']} placeholder="Select condition" onChange={v => onUpdate({ spaceCondition: v })} />
                </div>
              )}
              {isVisible('flooring') && <Dropdown label="Flooring" value={d.flooring} options={['None', 'Basic', 'Premium']} placeholder="Select flooring" onChange={v => onUpdate({ flooring: v })} />}
              {isVisible('walls') && <Dropdown label="Walls" value={d.walls} options={['Bare', 'Painted', 'Panelled']} placeholder="Select wall finish" onChange={v => onUpdate({ walls: v })} />}
              {isVisible('electricals') && <Dropdown label="Electricals" value={d.electricals} options={['None', 'Basic', 'Fully wired']} placeholder="Select electricals" onChange={v => onUpdate({ electricals: v })} />}
              {isVisible('hvac') && <Dropdown label="HVAC (AC)" value={d.hvac} options={['None', 'Provision only', 'Installed']} placeholder="Select HVAC" onChange={v => onUpdate({ hvac: v })} />}
              {isVisible('lighting') && <Dropdown label="Lighting" value={d.lighting} options={['None', 'Basic', 'Designer']} placeholder="Select lighting" onChange={v => onUpdate({ lighting: v })} />}

              <div className="flex flex-col gap-2.5 sm:col-span-2 mt-1">
                {isVisible('glassFacade') && renderYesNo('Glass facade (suitable for external branding)', 'glassFacade')}
                {isVisible('compoundWall') && renderYesNo('Compound wall available', 'compoundWall')}
                {isVisible('waterConnection') && renderYesNo('Water connection available', 'waterConnection')}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Interiors */}
        {isBuiltSpace && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Interiors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('partitionsType') && <Dropdown label="Partitions type" value={d.partitionsType} options={['None', 'Glass', 'Gypsum', 'Wall']} placeholder="Select partitions" onChange={v => onUpdate({ partitionsType: v })} />}
              {isVisible('externalBranding') && <Dropdown label="External branding options" value={d.externalBranding} options={['Space available outside', 'Available inside building', 'Both']} placeholder="Select branding option" onChange={v => onUpdate({ externalBranding: v })} />}
              {isVisible('numberOfRooms') && renderNumeric('No. of rooms / partitions', 'numberOfRooms')}
              {isVisible('meetingRooms') && renderNumeric('No. of meeting rooms', 'meetingRooms')}
              {isVisible('storageSpace') && <TextField label="Storage space (describe)" value={d.storageSpace} onChange={v => onUpdate({ storageSpace: v })} placeholder="e.g. 50 sq ft separate pantry" />}

              <div className="flex flex-col gap-2.5 sm:col-span-2 mt-1">
                {isVisible('conferenceRoom') && renderYesNo('Conference room', 'conferenceRoom')}
                {isVisible('receptionArea') && renderYesNo('Reception area', 'receptionArea')}
                {isVisible('brandingSpace') && renderYesNo('Branding space available', 'brandingSpace')}
                {isVisible('falseCeiling') && renderYesNo('False ceiling installed', 'falseCeiling')}
                {isVisible('columnFree') && renderYesNo('Column-free layout', 'columnFree')}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Furniture & Appliances */}
        {isBuiltSpace && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Furniture & appliances
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('workstations') && renderNumeric('Workstations / tables', 'workstations')}
              {isVisible('chairs') && renderNumeric('Chairs', 'chairs')}

              <div className="flex flex-col gap-2.5 sm:col-span-2">
                {isVisible('storageCupboards') && renderYesNo('Storage / cupboards', 'storageCupboards')}
                {isVisible('sofaLounge') && renderYesNo('Sofa / lounge area', 'sofaLounge')}
                {isVisible('receptionDesk') && renderYesNo('Reception desk', 'receptionDesk')}
                {isVisible('pantryEquipment') && renderYesNo('Pantry equipment', 'pantryEquipment')}
              </div>

              {isVisible('appliances') && (
                <div className="sm:col-span-2 pt-3 border-t border-[#edf0f5]">
                  <label className="text-[13px] font-bold text-[#1C2A44] mb-3 block">Available appliances</label>
                  <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                    {APPLIANCE_LIST.map(app => (
                      <CheckboxField
                        key={app}
                        label={app}
                        checked={(d.appliances || []).includes(app)}
                        onChange={() => toggleAppliance(app)}
                      />
                    ))}
                  </div>
                  <div className="mt-4">
                    <TextField label="Other appliances" value={d.appliancesOthers} onChange={v => onUpdate({ appliancesOthers: v })} placeholder="List any additional items..." />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </FormPage>
  )
}
