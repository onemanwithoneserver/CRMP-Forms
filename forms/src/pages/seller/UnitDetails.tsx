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
  return (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      {label && <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>}
      <div className="relative w-full">
        {prefix && (
          <span className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#667085] text-[0.85rem] font-semibold pointer-events-none z-10 transition-colors duration-250 ease peer-focus:text-[#C89B3C]">
            {prefix}
          </span>
        )}
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            peer w-full h-[34px] py-0 text-[0.85rem] font-medium text-[#1C2A44] bg-[#F5F7FA] 
            border border-[#E4E7EC] rounded-[3px] outline-none box-border
            transition-all duration-250 ease-in-out
            hover:bg-white hover:border-[#E6C36A] 
            focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]
            ${prefix ? 'pl-[24px]' : 'pl-[10px]'}
            ${suffix ? 'pr-[28px]' : 'pr-[10px]'}
          `}
        />
        {suffix && (
          <span className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[#667085] text-[0.8rem] font-semibold pointer-events-none z-10 transition-colors duration-250 ease peer-focus:text-[#C89B3C]">
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
  return (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      {label && <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[34px] px-[10px] text-[0.85rem] font-medium text-[#1C2A44] bg-[#F5F7FA] border border-[#E4E7EC] rounded-[3px] outline-none box-border transition-all duration-250 ease-in-out hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]"
      />
    </div>
  )
}

function PremiumCheckbox({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <label className="group flex items-center gap-2.5 cursor-pointer font-['Outfit',sans-serif] w-fit">
      <input 
        type="checkbox" 
        className="hidden" 
        checked={checked} 
        onChange={(e) => onChange(e.target.checked)} 
      />
      <div 
        className={`
          w-[18px] h-[18px] rounded-[3px] flex items-center justify-center transition-all duration-200 ease border
          ${checked 
            ? 'bg-[#C89B3C] border-[#C89B3C] shadow-[0_2px_4px_rgba(200,155,60,0.3)]' 
            : 'bg-white border-[#E4E7EC] group-hover:border-[#C89B3C]'
          }
        `}
      >
        {checked && <Check size={12} color="#FFFFFF" strokeWidth={3} />}
      </div>
      <span className={`text-[0.85rem] font-semibold transition-colors duration-200 ease ${checked ? 'text-[#1C2A44]' : 'text-[#445069] group-hover:text-[#1C2A44]'}`}>
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
        <div className="flex items-center justify-between w-full py-1.5 font-['Outfit',sans-serif]">
          <label className="text-[0.85rem] font-semibold text-[#1C2A44]">{label}</label>
          <div className="w-[120px]">{control}</div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-2 w-full font-['Outfit',sans-serif]">
        <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
        <div>{control}</div>
      </div>
    )
  }

  return (
    <FormPage title="Unit Details" icon={<LayoutGrid size={20} color="#E6C36A" />} onBack={back} onNext={next}>
      <div className="max-w-[896px] mx-auto flex flex-col gap-4 font-['Outfit',sans-serif]">

        <SectionCard title="Size & Dimensions" icon={<Ruler size={14} />}>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-end">
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
              <div className="mt-1">
                <PremiumCheckbox label="This is a corner unit" checked={!!d.cornerUnit} onChange={v => onUpdate({ cornerUnit: v })} />
              </div>
            )}
          </div>
        </SectionCard>

        {isBuiltSpace && (
          <SectionCard title="Space Readiness" icon={<Construction size={14} />}>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {isVisible('spaceCondition') && <Dropdown label="Space condition" value={d.spaceCondition} options={['Bare shell', 'Warm shell', 'Semi-fitted', 'Fully fitted', 'Plug & play']} placeholder="Select condition" onChange={v => onUpdate({ spaceCondition: v })} />}
                {isVisible('flooring') && <Dropdown label="Flooring" value={d.flooring} options={['None', 'Basic', 'Premium']} placeholder="Select flooring" onChange={v => onUpdate({ flooring: v })} />}
                {isVisible('walls') && <Dropdown label="Walls" value={d.walls} options={['Bare', 'Painted', 'Panelled']} placeholder="Select wall finish" onChange={v => onUpdate({ walls: v })} />}
                {isVisible('electricals') && <Dropdown label="Electricals" value={d.electricals} options={['None', 'Basic', 'Fully wired']} placeholder="Select electricals" onChange={v => onUpdate({ electricals: v })} />}
                {isVisible('hvac') && <Dropdown label="HVAC (AC)" value={d.hvac} options={['None', 'Provision only', 'Installed']} placeholder="Select HVAC" onChange={v => onUpdate({ hvac: v })} />}
                {isVisible('lighting') && <Dropdown label="Lighting" value={d.lighting} options={['None', 'Basic', 'Designer']} placeholder="Select lighting" onChange={v => onUpdate({ lighting: v })} />}
              </div>

              <div className="h-px w-full bg-[#E4E7EC]" />

              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                {isVisible('glassFacade') && renderBoolean('Glass facade (for external branding)', 'glassFacade')}
                {isVisible('compoundWall') && renderBoolean('Compound wall available', 'compoundWall')}
                {isVisible('waterConnection') && renderBoolean('Water connection available', 'waterConnection')}
              </div>
            </div>
          </SectionCard>
        )}

        {isBuiltSpace && (
          <SectionCard title="Interiors & Layout" icon={<Armchair size={14} />}>
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 items-end">
                {isVisible('partitionsType') && <Dropdown label="Partitions type" value={d.partitionsType} options={['None', 'Glass', 'Gypsum', 'Wall']} placeholder="Select partitions" onChange={v => onUpdate({ partitionsType: v })} />}
                {isVisible('externalBranding') && <Dropdown label="External branding options" value={d.externalBranding} options={['Space available outside', 'Available inside building', 'Both']} placeholder="Select branding option" onChange={v => onUpdate({ externalBranding: v })} />}
                {isVisible('numberOfRooms') && <NumericField label="No. of rooms / partitions" value={d.numberOfRooms} onChange={v => onUpdate({ numberOfRooms: v })} />}
                {isVisible('meetingRooms') && <NumericField label="No. of meeting rooms" value={d.meetingRooms} onChange={v => onUpdate({ meetingRooms: v })} />}
                {isVisible('storageSpace') && <StringField label="Storage space (describe)" value={d.storageSpace} onChange={v => onUpdate({ storageSpace: v })} placeholder="e.g. 50 sq ft separate pantry" />}
              </div>

              <div className="h-px w-full bg-[#E4E7EC]" />

              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
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
            <div className="flex flex-col gap-5">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {isVisible('workstations') && <NumericField label="Workstations / tables" value={d.workstations} onChange={v => onUpdate({ workstations: v })} />}
                {isVisible('chairs') && <NumericField label="Chairs" value={d.chairs} onChange={v => onUpdate({ chairs: v })} />}
              </div>

              <div className="h-px w-full bg-[#E4E7EC]" />

              <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
                {isVisible('storageCupboards') && renderBoolean('Storage / cupboards', 'storageCupboards')}
                {isVisible('sofaLounge') && renderBoolean('Sofa / lounge area', 'sofaLounge')}
                {isVisible('receptionDesk') && renderBoolean('Reception desk', 'receptionDesk')}
                {isVisible('pantryEquipment') && renderBoolean('Pantry equipment', 'pantryEquipment')}
              </div>

              {isVisible('appliances') && (
                <>
                  <div className="h-px w-full bg-[#E4E7EC]" />
                  <div>
                    <button
                      type="button"
                      onClick={() => setIsApplianceModalOpen(true)}
                      className="flex items-center gap-2 h-[36px] px-4 rounded-[3px] bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border border-[#E6C36A] text-white text-[0.85rem] font-semibold cursor-pointer shadow-[0_2px_6px_rgba(15,27,46,0.25)] transition-all duration-200 ease outline-none hover:-translate-y-[1px]"
                    >
                      <span>Add / Edit Appliances</span>
                    </button>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(d.appliances || []).map(app => (
                        <span key={app} className="py-1 px-2.5 bg-[#F5F7FA] text-[#1C2A44] text-[0.75rem] font-semibold rounded-[3px] border border-[#E4E7EC]">
                          {app}
                        </span>
                      ))}
                      {d.appliancesOthers && (
                        <span className="py-1 px-2.5 bg-[#C89B3C]/10 text-[#C89B3C] text-[0.75rem] font-semibold rounded-[3px] border border-[#C89B3C]/30">
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
          <div className="flex flex-col gap-4">
            <div className={`grid gap-4 items-end ${isMobile ? 'grid-cols-1' : 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'}`}>
              {renderBoolean('Is it immediately available?', 'isImmediatelyAvailable')}
              
              {d.isImmediatelyAvailable === 'No' && (
                <Dropdown label="Tentative Available Month" value={d.tentativeMonth} options={MONTHS_OPTIONS} placeholder="Select month" onChange={v => onUpdate({ tentativeMonth: v })} />
              )}
            </div>

            {(['land', 'retail', 'office', 'coworking'].includes(pType) || pType === 'land') && (
              <>
                <div className="h-px w-full bg-[#E4E7EC]" />
                <div className={`grid gap-4 items-end ${isMobile ? 'grid-cols-1' : 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'}`}>
                  {['land', 'retail', 'office', 'coworking'].includes(pType) && (
                    <StringField label="Unit No. (If any)" value={d.unitNo} onChange={v => onUpdate({ unitNo: v })} placeholder="e.g. A-204, Shop 12" />
                  )}

                  {['retail', 'office', 'coworking'].includes(pType) && (
                    <NumericField label="No. of Units Available" value={d.numberOfUnitsAvailable} onChange={v => onUpdate({ numberOfUnitsAvailable: v })} placeholder="0" />
                  )}

                  {pType === 'land' && (
                    <div className="flex flex-col gap-2">
                      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">No. of Units Available</label>
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F1B2E]/60 backdrop-blur-[4px] font-['Outfit',sans-serif]">
            <div className="absolute inset-0" onClick={() => setIsApplianceModalOpen(false)} />
            <div className="relative bg-white rounded flex flex-col w-full max-w-[720px] max-h-[90vh] shadow-[0_16px_48px_rgba(15,27,46,0.15)] border border-[#E4E7EC]">
              
              <div className="flex items-center justify-between py-4 px-5 border-b border-[#E4E7EC] bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] shrink-0">
                <h3 className="text-[1.05rem] font-bold text-white m-0 tracking-[-0.01em]">Add / Edit Appliances</h3>
                <button
                  onClick={() => setIsApplianceModalOpen(false)}
                  className="w-7 h-7 flex items-center justify-center rounded-[3px] border border-white/20 bg-white/10 text-white cursor-pointer transition-all duration-200 ease outline-none hover:bg-white/20"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-5 flex-1 overflow-y-auto">
                <label className="block text-[0.9rem] font-bold text-[#1C2A44] mb-4">Select Available Appliances</label>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
                  {APPLIANCE_LIST.map(app => (
                    <PremiumCheckbox
                      key={app}
                      label={app}
                      checked={(d.appliances || []).includes(app)}
                      onChange={() => toggleAppliance(app)}
                    />
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-[#E4E7EC]">
                  <StringField
                    label="Other Appliances (List any additional items)"
                    value={d.appliancesOthers}
                    onChange={v => onUpdate({ appliancesOthers: v })}
                    placeholder="e.g. Dishwasher, Wine cooler..."
                  />
                </div>
              </div>

              <div className="py-4 px-5 border-t border-[#E4E7EC] bg-[#F5F7FA] flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsApplianceModalOpen(false)}
                  className="h-[36px] px-5 rounded-[3px] text-[0.85rem] font-semibold text-[#667085] bg-white border border-[#E4E7EC] cursor-pointer transition-all duration-200 ease outline-none hover:border-[#C89B3C] hover:text-[#1C2A44]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsApplianceModalOpen(false)}
                  className="flex items-center gap-2 h-[36px] px-6 rounded-[3px] text-[0.85rem] font-semibold text-white bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border border-[#E6C36A] cursor-pointer shadow-[0_2px_6px_rgba(15,27,46,0.25)] transition-all duration-200 ease outline-none hover:-translate-y-[1px]"
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