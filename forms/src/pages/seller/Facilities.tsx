import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'

import iconOffice from '../../assets/Select Property Type/Office Space.svg'
import iconRetail from '../../assets/Select Property Type/Rental  Commercial Space.svg'
import iconHostel from '../../assets/Select Property Type/Hostel.svg'
import iconLand from '../../assets/Select Property Type/Land.svg'
import iconCoworking from '../../assets/Select Property Type/Co-Working.svg'

const PROPERTY_TYPE_OPTIONS = [
  { value: 'office', label: 'Office Space', icon: iconOffice },
  { value: 'retail', label: 'Rental / Commercial Space', icon: iconRetail },
  { value: 'hostel', label: 'Hostel / PG', icon: iconHostel },
  { value: 'land', label: 'Land', icon: iconLand },
  { value: 'coworking', label: 'Co-Working', icon: iconCoworking },
]

export default function Facilities() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'

  const isVisible = (field: string) => {
    switch (field) {
      case 'designatedParking': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'noOfParkings': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'visitorParking': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);

      case 'powerBackup': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'powerLoad': return true; // Land, Retail, Office, Coworking, Entire Building
      case 'powerPhase': return true;

      case 'washrooms': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);

      case 'fireSprinklers': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);
      case 'fireExtinguishers': return ['retail', 'office', 'coworking', 'entire_building'].includes(pType);

      case 'waterConnection': return ['land'].includes(pType); // User specified YES only for Land

      default: return false;
    }
  }

  const isBuiltSpace = pType !== 'land';

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
          value={d[field] as string}
          onChange={v => onUpdate({ [field]: v })}
        />
      </div>
    </div>
  )

  return (
    <FormPage
      title="Facilities"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-5 sm:gap-6 font-['Outfit'] pb-2">

        {/* SECTION: Parking */}
        {isBuiltSpace && (
          <SectionCard title="Parking Facilities">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('designatedParking') && renderYesNo('Designated Parking', 'designatedParking')}
              {isVisible('noOfParkings') && renderNumeric('No. of Parkings', 'noOfParkings')}

              {isVisible('visitorParking') && (
                <div className="sm:col-span-2">
                  <Dropdown label="Visitor Parking" value={d.visitorParking} options={['Yes', 'No', 'Limited']} placeholder="Select Visitor Parking" onChange={v => onUpdate({ visitorParking: v })} />
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* SECTION: Power */}
        <SectionCard title="Power Setup">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isVisible('powerBackup') && renderYesNo('Power Backup Available', 'powerBackup')}

            {isVisible('powerLoad') && renderNumeric('Power Load (Sanctioned in kW/kVA)', 'powerLoad')}

            {isVisible('powerPhase') && (
              <Dropdown label="Power Phase" value={d.powerPhase} options={['Single', 'Three']} placeholder="Select Power Phase" onChange={v => onUpdate({ powerPhase: v })} />
            )}
          </div>
        </SectionCard>

        {/* SECTION: Washroom */}
        {isBuiltSpace && (
          <SectionCard title="Washroom Facilities">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('washrooms') && (
                <div className="sm:col-span-2">
                  <Dropdown label="Washrooms Setup" value={d.washrooms} options={['Yes, with in unit', 'No', 'Common with building']} placeholder="Select Washroom configuration" onChange={v => onUpdate({ washrooms: v })} />
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* SECTION: Fire Safety */}
        {isBuiltSpace && (
          <SectionCard title="Fire Safety">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isVisible('fireSprinklers') && renderYesNo('Fire Sprinklers Installed', 'fireSprinklers')}
              {isVisible('fireExtinguishers') && renderYesNo('Fire Extinguishers Present', 'fireExtinguishers')}
            </div>
          </SectionCard>
        )}

        {/* SECTION: Water (Land Specific) */}
        {isVisible('waterConnection') && (
          <SectionCard title="Water Access">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderYesNo('Water Connection Available', 'waterConnection')}
            </div>
          </SectionCard>
        )}

      </div>
    </FormPage>
  )
}
