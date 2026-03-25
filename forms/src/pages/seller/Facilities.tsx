import React from 'react'
import { useForm } from '../../context/FormContext'
import { useDevice } from '../../context/DeviceContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Dropdown } from '../../components/inputs/Dropdown'
import SegmentedControl from '../../components/inputs/SegmentedControl'

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

  const renderNumeric = (label: string, field: keyof typeof state.formData, placeholder = '0') => (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[0.78rem] font-semibold text-[#1C2A44] mb-0.5">{label}</label>
      <input
        type="number"
        className="form-input bg-white w-full border border-[var(--border-light)] rounded-[4px] px-2 text-[12px] text-[var(--text)] transition-all h-[32px] focus:border-[var(--accent-gold)] focus:outline-none"
        placeholder={placeholder}
        value={d[field] as string}
        onChange={e => onUpdate({ [field]: e.target.value })}
      />
    </div>
  )

  const renderVerticalBoolean = (label: string, field: keyof typeof state.formData) => {
    const control = (
      <SegmentedControl
        options={[{ label: 'Yes', value: 'Yes' }, { label: 'No', value: 'No' }]}
        value={(d[field] as string) || 'No'}
        onChange={v => onUpdate({ [field]: v })}
      />
    )

    if (isMobile) {
      return (
        <div className="flex items-center justify-between w-full py-1.5 px-0.5">
          <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
          <div className="w-[110px]">{control}</div>
        </div>
      )
    }

    return (
      <div className="flex flex-col gap-2 w-full py-1.5 px-0.5">
        <label className="text-[0.78rem] font-semibold text-[#1C2A44] pl-0.5">{label}</label>
        <div className="w-[110px]">{control}</div>
      </div>
    )
  }

  return (
    <FormPage title="Facilities" onBack={back} onNext={next}>
      <div className={`flex flex-col font-['Outfit'] pb-2 ${isMobile ? 'gap-3' : 'gap-4'}`}>

        {/* SECTION: Facilities - Parking */}
        {show.designatedParking && (
          <div className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-3'}`}>
            <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">Facilities - Parking</h2>
            {isMobile ? (
              <>
                {/* Mobile: boolean full-width, then paired 2-col row */}
                {renderVerticalBoolean('Designated parking', 'designatedParking')}
                <div className="grid grid-cols-2 gap-2">
                  {renderNumeric('No. of parkings', 'noOfParkings')}
                  <Dropdown
                    label="Visitor parking"
                    value={d.visitorParking}
                    options={['Yes', 'No', 'Limited']}
                    placeholder="Select"
                    onChange={v => onUpdate({ visitorParking: v })}
                  />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {renderVerticalBoolean('Designated parking', 'designatedParking')}
                <div className="w-2/3">
                  {renderNumeric('No. of parkings', 'noOfParkings')}
                </div>
              <div className="w-2/3">
                <Dropdown
                  label="Visitor parking"
                  value={d.visitorParking}
                  options={['Yes', 'No', 'Limited']}
                  placeholder="Select"
                  onChange={v => onUpdate({ visitorParking: v })}
                />
              </div>
            </div>
            )}
          </div>
        )}

        {/* SECTION: Facilities - Power */}
        <div className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-3'}`}>
          <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">Facilities - Power</h2>
          {isMobile ? (
            <>
              {/* Mobile: boolean full-width, then paired 2-col row */}
              {show.powerBackup && renderVerticalBoolean('Power backup', 'powerBackup')}
              <div className="grid grid-cols-2 gap-2">
                {renderNumeric('Power load (kW)', 'powerLoad')}
                <Dropdown
                  label="Power phase"
                  value={d.powerPhase}
                  options={['Single', 'Three']}
                  placeholder="Select"
                  onChange={v => onUpdate({ powerPhase: v })}
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {show.powerBackup && renderVerticalBoolean('Power backup', 'powerBackup')}
              <div className="w-2/3">
                {renderNumeric('Power load (kW)', 'powerLoad')}
              </div>
              <div className="w-2/3">
                <Dropdown
                  label="Power phase"
                  value={d.powerPhase}
                  options={['Single', 'Three']}
                  placeholder="Select"
                  onChange={v => onUpdate({ powerPhase: v })}
                />
              </div>
            </div>
          )}
        </div>

        {/* SECTIONS: Hygiene & Fire Safety — side by side on desktop */}
        {(show.washrooms || show.waterConnection || show.fireSprinklers) && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${isMobile ? 'gap-3' : 'gap-4'}`}>

            {/* Facilities - Hygiene & Utilities */}
            {(show.washrooms || show.waterConnection) && (
              <div className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-3'}`}>
                <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">Facilities - Hygiene & Utilities</h2>
                {show.washrooms && (
                  <div className="w-1/2">
                    <Dropdown
                      label="Washroom"
                      value={d.washrooms}
                      options={['Yes, within unit', 'No', 'Common with building']}
                      placeholder="Select setup"
                      onChange={v => onUpdate({ washrooms: v })}
                    />
                  </div>
                )}
                {show.waterConnection && renderVerticalBoolean('Water connection', 'waterConnection')}
              </div>
            )}

            {/* Facilities - Fire Safety */}
            {show.fireSprinklers && (
              <div className={`flex flex-col ${isMobile ? 'gap-1.5' : 'gap-3'}`}>
                <h2 className="text-[0.88rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-1 mb-0.5">Facilities - Fire Safety</h2>
                {isMobile ? (
                  <>
                    {renderVerticalBoolean('Fire sprinklers', 'fireSprinklers')}
                    {renderVerticalBoolean('Fire extinguishers', 'fireExtinguishers')}
                  </>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {renderVerticalBoolean('Fire sprinklers', 'fireSprinklers')}
                    {renderVerticalBoolean('Fire extinguishers', 'fireExtinguishers')}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>
    </FormPage>
  )
}

