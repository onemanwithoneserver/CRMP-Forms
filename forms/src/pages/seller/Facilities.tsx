import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'

export default function Facilities() {
  const { state, dispatch, next, back } = useForm()
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
          value={(d[field] as string) || 'No'}
          onChange={v => onUpdate({ [field]: v })}
        />
      </div>
    </div>
  )

  return (
    <FormPage title="Facilities" onBack={back} onNext={next}>
      <div className="flex flex-col gap-6 sm:gap-8 font-['Outfit'] pb-2">

        {/* SECTION: Parking */}
        {show.designatedParking && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Parking facilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">{renderYesNo('Designated parking', 'designatedParking')}</div>
              {renderNumeric('No. of designated parkings', 'noOfParkings')}
              <Dropdown
                label="Visitor parking"
                value={d.visitorParking}
                options={['Yes', 'No', 'Limited']}
                placeholder="Select visitor parking"
                onChange={v => onUpdate({ visitorParking: v })}
              />
            </div>
          </div>
        )}

        {/* SECTION: Power */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Power setup
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {show.powerBackup && (
              <div className="sm:col-span-2">{renderYesNo('Power backup available', 'powerBackup')}</div>
            )}
            {renderNumeric('Power load (kW / kVA)', 'powerLoad')}
            <Dropdown
              label="Power phase"
              value={d.powerPhase}
              options={['Single', 'Three']}
              placeholder="Select phase"
              onChange={v => onUpdate({ powerPhase: v })}
            />
          </div>
        </div>

        {/* SECTION: Washroom */}
        {show.washrooms && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Washroom facilities
            </h2>
            <Dropdown
              label="Washrooms"
              value={d.washrooms}
              options={['Yes, within unit', 'No', 'Common with building']}
              placeholder="Select washroom setup"
              onChange={v => onUpdate({ washrooms: v })}
            />
          </div>
        )}

        {/* SECTION: Fire Safety */}
        {show.fireSprinklers && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Fire safety
            </h2>
            <div className="flex flex-col gap-3">
              {renderYesNo('Fire sprinklers installed', 'fireSprinklers')}
              {renderYesNo('Fire extinguishers present', 'fireExtinguishers')}
            </div>
          </div>
        )}

        {/* SECTION: Water (Land only) */}
        {show.waterConnection && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Water access
            </h2>
            {renderYesNo('Water connection available', 'waterConnection')}
          </div>
        )}

      </div>
    </FormPage>
  )
}
