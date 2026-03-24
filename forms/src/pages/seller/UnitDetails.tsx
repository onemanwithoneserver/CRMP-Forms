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

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const CURRENT_YEAR = new Date().getFullYear()
const MONTHS_OPTIONS = MONTHS.flatMap(m =>
  [CURRENT_YEAR, CURRENT_YEAR + 1, CURRENT_YEAR + 2].map(y => `${m} ${y}`)
)

export default function UnitDetails() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData
  const [isApplianceModalOpen, setIsApplianceModalOpen] = React.useState(false)

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

  const renderNumeric = (label: string, field: keyof typeof state.formData, placeholder = '0') => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
      <input
        type="number"
        className="form-input bg-white w-full border-[#e2e6ec] rounded-[6px] py-1.5 px-3 text-sm text-[#1C2A44] transition-all h-[34px]"
        placeholder={placeholder}
        value={d[field] as string}
        onChange={e => onUpdate({ [field]: e.target.value })}
      />
    </div>
  )

  const renderYesNo = (label: string, field: keyof typeof state.formData) => (
    <div className="flex items-center justify-between py-1.5 bg-white border border-[#edf0f5] px-3.5 rounded-lg">
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

  const renderVerticalBoolean = (label: string, field: keyof typeof state.formData) => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
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
      <div className="flex flex-col gap-2 sm:gap-3 font-['Outfit'] pb-2">

        {/* SECTION 0: Unit Type */}
        <SectionCard title="Unit type">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {UNIT_TYPES.map(ut => {
              const sel = d.unitType === ut.value
              return (
                <button
                  key={ut.value}
                  type="button"
                  onClick={() => onUpdate({ unitType: ut.value })}
                  aria-pressed={sel}
                  className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-md border transition-all"
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

        {/* SECTION 1: Unit Details - Size */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">
            Unit Details - Size
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
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
              <div className="lg:col-span-4 pt-1">
                <CheckboxField label="This is a corner unit" checked={d.cornerUnit} onChange={v => onUpdate({ cornerUnit: v })} />
              </div>
            )}
          </div>
        </div>

        {/* SECTION 2: Unit Specifications - Space Readiness */}
        {isBuiltSpace && (
          <div className="flex flex-col gap-2">
            <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">
              Unit Specifications - Space Readiness
            </h2>
            {/* Desktop/Tablet specialized layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {isVisible('spaceCondition') && <Dropdown label="Space condition" value={d.spaceCondition} options={['Bare shell', 'Warm shell', 'Semi-fitted', 'Fully fitted', 'Plug & play']} placeholder="Select condition" onChange={v => onUpdate({ spaceCondition: v })} />}
              {isVisible('flooring') && <Dropdown label="Flooring" value={d.flooring} options={['None', 'Basic', 'Premium']} placeholder="Select flooring" onChange={v => onUpdate({ flooring: v })} />}
              {isVisible('walls') && <Dropdown label="Walls" value={d.walls} options={['Bare', 'Painted', 'Panelled']} placeholder="Select wall finish" onChange={v => onUpdate({ walls: v })} />}
              {isVisible('electricals') && <Dropdown label="Electricals" value={d.electricals} options={['None', 'Basic', 'Fully wired']} placeholder="Select electricals" onChange={v => onUpdate({ electricals: v })} />}

              {isVisible('hvac') && <Dropdown label="HVAC (AC)" value={d.hvac} options={['None', 'Provision only', 'Installed']} placeholder="Select HVAC" onChange={v => onUpdate({ hvac: v })} />}
              {isVisible('lighting') && <Dropdown label="Lighting" value={d.lighting} options={['None', 'Basic', 'Designer']} placeholder="Select lighting" onChange={v => onUpdate({ lighting: v })} />}

              {/* Boolean Controls - Vertical Structure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:col-span-4 mt-1 border-t border-[#edf0f5] pt-3">
                {isVisible('glassFacade') && renderVerticalBoolean('Glass facade (suitable for external branding)', 'glassFacade')}
                {isVisible('compoundWall') && renderVerticalBoolean('Compound wall available', 'compoundWall')}
                {isVisible('waterConnection') && renderVerticalBoolean('Water connection available', 'waterConnection')}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: Unit Specifications - Interiors */}
        {isBuiltSpace && (
          <div className="flex flex-col gap-2">
            <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">
              Unit Specifications - Interiors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {isVisible('partitionsType') && <Dropdown label="Partitions type" value={d.partitionsType} options={['None', 'Glass', 'Gypsum', 'Wall']} placeholder="Select partitions" onChange={v => onUpdate({ partitionsType: v })} />}
              {isVisible('externalBranding') && <Dropdown label="External branding options" value={d.externalBranding} options={['Space available outside', 'Available inside building', 'Both']} placeholder="Select branding option" onChange={v => onUpdate({ externalBranding: v })} />}
              {isVisible('numberOfRooms') && renderNumeric('No. of rooms / partitions', 'numberOfRooms')}
              {isVisible('meetingRooms') && renderNumeric('No. of meeting rooms', 'meetingRooms')}
              {isVisible('storageSpace') && <TextField label="Storage space (describe)" value={d.storageSpace} onChange={v => onUpdate({ storageSpace: v })} placeholder="e.g. 50 sq ft separate pantry" />}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:col-span-4 mt-1 border-t border-[#edf0f5] pt-3">
                {isVisible('conferenceRoom') && renderVerticalBoolean('Conference room', 'conferenceRoom')}
                {isVisible('receptionArea') && renderVerticalBoolean('Reception area', 'receptionArea')}
                {isVisible('brandingSpace') && renderVerticalBoolean('Branding space available', 'brandingSpace')}
                {isVisible('falseCeiling') && renderVerticalBoolean('False ceiling installed', 'falseCeiling')}
                {isVisible('columnFree') && renderVerticalBoolean('Column-free layout', 'columnFree')}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: Unit Specifications - Furniture & Appliances */}
        {isBuiltSpace && (
          <div className="flex flex-col gap-2">
            <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">
              Unit Specifications - Furniture & Appliances
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {isVisible('workstations') && renderNumeric('Workstations / tables', 'workstations')}
              {isVisible('chairs') && renderNumeric('Chairs', 'chairs')}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:col-span-4 mt-1 border-t border-[#edf0f5] pt-3">
                {isVisible('storageCupboards') && renderVerticalBoolean('Storage / cupboards', 'storageCupboards')}
                {isVisible('sofaLounge') && renderVerticalBoolean('Sofa / lounge area', 'sofaLounge')}
                {isVisible('receptionDesk') && renderVerticalBoolean('Reception desk', 'receptionDesk')}
                {isVisible('pantryEquipment') && renderVerticalBoolean('Pantry equipment', 'pantryEquipment')}
              </div>

              {isVisible('appliances') && (
                <div className="lg:col-span-4 pt-2 border-t border-[#edf0f5]">
                  <button
                    type="button"
                    onClick={() => setIsApplianceModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1C2A44] text-white rounded-md text-sm font-semibold hover:bg-[#2a3f66] transition-all shadow-md"
                  >
                    <span>Add / Edit Appliances</span>
                  </button>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(d.appliances || []).map(app => (
                      <span key={app} className="px-2.5 py-1 bg-[#f0f4f8] text-[#445069] text-[12px] font-medium rounded-full border border-[#dbe3eb]">
                        {app}
                      </span>
                    ))}
                    {d.appliancesOthers && (
                      <span className="px-2.5 py-1 bg-[#fff8e6] text-[#c89b3c] text-[12px] font-medium rounded-full border border-[#fbebc3]">
                        Other: {d.appliancesOthers}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* APPLIANCE MODAL */}
        {isApplianceModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
              <div className="p-5 border-b border-[#edf0f5] flex items-center justify-between bg-[#fcfdfe]">
                <h3 className="text-lg font-bold text-[#1C2A44]">Add / Edit Appliances</h3>
                <button
                  onClick={() => setIsApplianceModalOpen(false)}
                  className="p-2 hover:bg-[#f0f4f8] rounded-full text-[#8993a4] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="text-[14px] font-bold text-[#1C2A44] mb-3 block">Select Available Appliances</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                      {APPLIANCE_LIST.map(app => (
                        <CheckboxField
                          key={app}
                          label={app}
                          checked={(d.appliances || []).includes(app)}
                          onChange={() => toggleAppliance(app)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#edf0f5]">
                    <TextField
                      label="Other Appliances (List any additional items)"
                      value={d.appliancesOthers}
                      onChange={v => onUpdate({ appliancesOthers: v })}
                      placeholder="e.g. Dishwasher, Wine cooler..."
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-[#edf0f5] flex justify-end gap-3 bg-[#fcfdfe]">
                <button
                  type="button"
                  onClick={() => setIsApplianceModalOpen(false)}
                  className="px-6 py-2 border border-[#e2e6ec] rounded-lg text-sm font-bold text-[#445069] hover:bg-[#f8fafc] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsApplianceModalOpen(false)}
                  className="px-8 py-2 bg-[#C89B3C] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#C89B3C]/20 hover:bg-[#b88a2c] transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: Unit Availability */}
        <div className="flex flex-col gap-2">
          <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">
            Unit Availability
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="sm:col-span-2 lg:col-span-2">
              {renderYesNo('Is it immediately available?', 'isImmediatelyAvailable')}
            </div>

            {d.isImmediatelyAvailable === 'No' && (
              <div className="sm:col-span-2 lg:col-span-2">
                <Dropdown
                  label="Tentative Available Month"
                  value={d.tentativeMonth}
                  options={MONTHS_OPTIONS}
                  placeholder="Select month"
                  onChange={v => onUpdate({ tentativeMonth: v })}
                />
              </div>
            )}

            {/* Use sm:col-span-2 md:col-span-2 to ensure 4-column alignment but still group nicely */}
            {['land', 'retail', 'office', 'coworking'].includes(pType) && (
              <div className="sm:col-span-2 lg:col-span-2">
                <TextField
                  label="Unit No. (If any)"
                  value={d.unitNo}
                  onChange={v => onUpdate({ unitNo: v })}
                  placeholder="e.g. A-204, Shop 12"
                />
              </div>
            )}

            {['retail', 'office', 'coworking'].includes(pType) && (
              <div className="sm:col-span-2 lg:col-span-2">
                {renderNumeric('No. of Units Available', 'numberOfUnitsAvailable', 'e.g. 3')}
              </div>
            )}

            {pType === 'land' && (
              <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-2">
                <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">
                  No. of Units Available
                </label>
                <div className="w-full">
                  <SegmentedControl
                    options={[
                      { label: 'Single', value: 'Single' },
                      { label: 'Multiple', value: 'Multiple' },
                    ]}
                    value={d.numberOfUnitsAvailable || 'Single'}
                    onChange={v => onUpdate({ numberOfUnitsAvailable: v })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </FormPage>
  )
}
