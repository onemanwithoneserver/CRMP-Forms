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
  { value: 'Entire Unit', label: 'Entire Unit', icon: iconEntireUnit },
  { value: 'Partial Floor', label: 'Partial Floor', icon: iconPartialFloor },
  { value: 'Full Floor', label: 'Full Floor', icon: iconFullFloor },
  { value: 'Entire Building', label: 'Entire Building', icon: iconEntireBuilding },
  { value: 'Shop', label: 'Shop', icon: iconShop },
]

export default function UnitDetails() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office' // default fallback if accessed directly

  const isVisible = (field: string) => {
    switch (field) {
      // SECTION 1: Unit Details
      case 'plotSize': return ['land', 'entire_building'].includes(pType);
      case 'unitFacing': return true;
      case 'plotDimensions': return ['land'].includes(pType);
      case 'builtUpArea': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'layoutDimensions': return ['retail', 'office'].includes(pType);
      case 'carpetArea': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'floor': return ['retail', 'office', 'coworking'].includes(pType);
      case 'totalFloors': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'idealFor': return true;
      case 'cornerUnit': return ['land', 'retail', 'entire_building'].includes(pType);
      case 'frontage': return ['land', 'retail'].includes(pType);
      case 'ceilingHeight': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);

      // SECTION 2: Space Readiness
      case 'spaceCondition': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'glassFacade': return ['retail', 'office'].includes(pType);
      case 'flooring': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'walls': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'electricals': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'hvac': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'lighting': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'compoundWall': return true;
      case 'waterConnection': return true;

      // SECTION 3: Interiors
      case 'partitionsType': return ['retail', 'office'].includes(pType);
      case 'numberOfRooms': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'externalBranding': return ['retail', 'office', 'coworking'].includes(pType);
      case 'meetingRooms': return ['office'].includes(pType);
      case 'conferenceRoom': return ['office', 'coworking', 'entire_building'].includes(pType);
      case 'receptionArea': return ['office', 'coworking', 'entire_building'].includes(pType);
      case 'brandingSpace': return ['retail', 'office', 'coworking'].includes(pType);
      case 'falseCeiling': return ['retail', 'office', 'entire_building'].includes(pType);
      case 'storageSpace': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'columnFree': return ['retail', 'office'].includes(pType);

      // SECTION 4: Furniture & Appliances
      case 'workstations': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'chairs': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'storageCupboards': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'sofaLounge': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'receptionDesk': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'pantryEquipment': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'appliances': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);

      default: return false;
    }
  }

  const isBuiltSpace = pType !== 'land';

  const toggleAppliance = (app: string) => {
    const arr = d.appliances || []
    if (arr.includes(app)) {
      onUpdate({ appliances: arr.filter(a => a !== app) })
    } else {
      onUpdate({ appliances: [...arr, app] })
    }
  }

  const APPLIANCE_LIST = ['AC', 'Fridge', 'Water Dispenser', 'Microwave', 'Printer', 'Internet Modem']

  const renderNumeric = (label: string, field: keyof typeof state.formData, placeholder = '0') => (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-[13px] font-semibold text-[#445069] pl-0.5">{label}</label>
      <input type="number" className="form-input bg-white w-full border-[#e2e6ec] focus:border-[#C89B3C] focus:ring-1 focus:ring-[#C89B3C]/50 rounded-[6px] py-2.5 px-3 text-sm text-[#1C2A44] transition-all" placeholder={placeholder} value={d[field] as string} onChange={e => onUpdate({ [field]: e.target.value })} />
    </div>
  )

  const renderYesNo = (label: string, field: keyof typeof state.formData) => (
    <div className="flex items-center justify-between py-1 bg-white border border-[#edf0f5] px-3.5 rounded-lg">
      <span className="text-[13.5px] font-medium text-[#1C2A44]">{label}</span>
      <div className="w-[110px]">
        <SegmentedControl
          options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
          value={d[field] ? 'Yes' : 'No'}
          onChange={v => onUpdate({ [field]: v === 'Yes' })}
        />
      </div>
    </div>
  )

  return (
    <FormPage
      title="Unit Details"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-5 sm:gap-6 font-['Outfit'] pb-6">

        {/* SECTION 1: Unit Details */}
        <SectionCard title="1. Unit Dimensions & Layout">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isVisible('plotSize') && <TextField label="Plot Size (Sq. yards)" value={d.plotSize} onChange={v => onUpdate({ plotSize: v })} placeholder="e.g. 1200" />}
            {isVisible('plotDimensions') && renderNumeric('Plot Dimensions', 'plotDimensions')}
            {isVisible('builtUpArea') && renderNumeric('Built Up Area (Sq. ft)', 'totalBuiltUpArea')}
            {isVisible('carpetArea') && renderNumeric('Carpet Area (Sq. ft)', 'carpetArea')}

            {isVisible('layoutDimensions') && (
              <>
                {renderNumeric('Layout Length (ft)', 'layoutDimensionsLength')}
                {renderNumeric('Layout Breadth (ft)', 'layoutDimensionsBreadth')}
              </>
            )}

            {isVisible('floor') && renderNumeric('Floor Number', 'floor')}
            {isVisible('totalFloors') && renderNumeric('Total Floors', 'totalFloors')}
            {isVisible('frontage') && renderNumeric('Frontage (ft)', 'frontage')}
            {isVisible('ceilingHeight') && renderNumeric('Ceiling Height (ft)', 'ceilingHeight')}

            {isVisible('unitFacing') && (
              <Dropdown label="Unit Facing" value={d.unitFacing} options={['North', 'East', 'South', 'West']} placeholder="Select Facing" onChange={v => onUpdate({ unitFacing: v })} />
            )}
            {isVisible('idealFor') && (
              <Dropdown label="Ideal For" value={d.idealFor} options={['Retail Shop', 'Showroom', 'Office Space', 'Restaurant', 'Clinic', 'Other']} placeholder="Select Business Category" onChange={v => onUpdate({ idealFor: v })} />
            )}

            {isVisible('cornerUnit') && (
              <div className="sm:col-span-2 pt-2">
                <CheckboxField label="This is a Corner Unit" checked={d.cornerUnit} onChange={v => onUpdate({ cornerUnit: v })} />
              </div>
            )}
          </div>
        </SectionCard>

        {/* SECTION 2: Space Readiness */}
        {isBuiltSpace && (
          <SectionCard title="2. Unit Specifications - Space Readiness">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('spaceCondition') && (
                <div className="sm:col-span-2">
                  <Dropdown label="Space Condition" value={d.spaceCondition} options={['Bare Shell', 'Warm Shell', 'Semi-Fitted', 'Fully Fitted', 'Plug & Play']} placeholder="Select Condition" onChange={v => onUpdate({ spaceCondition: v })} />
                </div>
              )}

              {isVisible('flooring') && (
                <Dropdown label="Flooring" value={d.flooring} options={['None', 'Basic', 'Premium']} placeholder="Select Flooring" onChange={v => onUpdate({ flooring: v })} />
              )}
              {isVisible('walls') && (
                <Dropdown label="Walls" value={d.walls} options={['Bare', 'Painted', 'Panelled']} placeholder="Select Wall Condition" onChange={v => onUpdate({ walls: v })} />
              )}
              {isVisible('electricals') && (
                <Dropdown label="Electricals" value={d.electricals} options={['None', 'Basic', 'Fully Wired']} placeholder="Select Electricals" onChange={v => onUpdate({ electricals: v })} />
              )}
              {isVisible('hvac') && (
                <Dropdown label="HVAC (AC)" value={d.hvac} options={['None', 'Provision', 'Installed']} placeholder="Select HVAC" onChange={v => onUpdate({ hvac: v })} />
              )}
              {isVisible('lighting') && (
                <Dropdown label="Lighting" value={d.lighting} options={['None', 'Basic', 'Designer']} placeholder="Select Lighting" onChange={v => onUpdate({ lighting: v })} />
              )}

              <div className="flex flex-col gap-2.5 sm:col-span-2 mt-2">
                {isVisible('glassFacade') && renderYesNo('Glass Facade (Suitable for External Branding)', 'glassFacade')}
                {isVisible('compoundWall') && renderYesNo('Compound Wall Available', 'compoundWall')}
                {isVisible('waterConnection') && renderYesNo('Water Connection Available', 'waterConnection')}
              </div>
            </div>
          </SectionCard>
        )}

        {/* SECTION 3: Interiors */}
        {isBuiltSpace && (
          <SectionCard title="3. Unit Specifications - Interiors">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('partitionsType') && (
                <Dropdown label="Partitions Type" value={d.partitionsType} options={['None', 'Glass', 'Gypsum', 'Wall']} placeholder="Select Partitions" onChange={v => onUpdate({ partitionsType: v })} />
              )}
              {isVisible('externalBranding') && (
                <Dropdown label="External Branding Options" value={d.externalBranding} options={['Space available outside', 'Available inside building']} placeholder="Select Branding Option" onChange={v => onUpdate({ externalBranding: v })} />
              )}

              {isVisible('numberOfRooms') && renderNumeric('No. of Rooms/Partitions', 'numberOfRooms')}
              {isVisible('meetingRooms') && renderNumeric('No. of Meeting Rooms', 'meetingRooms')}

              {isVisible('storageSpace') && (
                <TextField label="Storage Space (Describe)" value={d.storageSpace} onChange={v => onUpdate({ storageSpace: v })} placeholder="e.g. 50 sq ft separate pantry" />
              )}

              <div className="flex flex-col gap-2.5 sm:col-span-2 mt-2">
                {isVisible('conferenceRoom') && renderYesNo('Conference Room', 'conferenceRoom')}
                {isVisible('receptionArea') && renderYesNo('Reception Area', 'receptionArea')}
                {isVisible('brandingSpace') && renderYesNo('Branding Space Available', 'brandingSpace')}
                {isVisible('falseCeiling') && renderYesNo('False Ceiling Installed', 'falseCeiling')}
                {isVisible('columnFree') && renderYesNo('Column Free Layout', 'columnFree')}
              </div>
            </div>
          </SectionCard>
        )}

        {/* SECTION 4: Furniture & Appliances */}
        {isBuiltSpace && (
          <SectionCard title="4. Furniture & Appliances">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('workstations') && renderNumeric('Workstations / Tables', 'workstations')}
              {isVisible('chairs') && renderNumeric('Chairs', 'chairs')}

              <div className="flex flex-col gap-2.5 sm:col-span-2">
                {isVisible('storageCupboards') && renderYesNo('Storage / Cupboards', 'storageCupboards')}
                {isVisible('sofaLounge') && renderYesNo('Sofa / Lounge', 'sofaLounge')}
                {isVisible('receptionDesk') && renderYesNo('Reception Desk', 'receptionDesk')}
                {isVisible('pantryEquipment') && renderYesNo('Pantry Equipment', 'pantryEquipment')}
              </div>

              {isVisible('appliances') && (
                <div className="sm:col-span-2 pt-2 border-t border-[#edf0f5]">
                  <label className="text-[14px] font-bold text-[#1C2A44] mb-3 block">Available Appliances</label>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
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
                    <TextField label="Other Appliances" value={d.appliancesOthers} onChange={v => onUpdate({ appliancesOthers: v })} placeholder="List any additional items..." />
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        )}

      </div>
    </FormPage>
  )
}
