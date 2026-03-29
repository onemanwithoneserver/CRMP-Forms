import React from 'react'
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
  return (
    <div className="flex flex-col gap-1 w-full font-['Outfit',sans-serif]">
      <label className="text-[0.8rem] font-semibold text-[#1C2A44]">{label}</label>
      <input
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[34px] px-[10px] text-[0.85rem] font-medium text-[#1C2A44] bg-[#F5F7FA] border border-[#E4E7EC] rounded-[3px] outline-none box-border transition-all duration-250 ease-in-out hover:bg-white hover:border-[#E6C36A] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_2px_8px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]"
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
    <FormPage title="Facilities" icon={<Settings size={20} color="#E6C36A" />} onBack={back} onNext={next}>
      <div className="max-w-[896px] mx-auto flex flex-col  font-['Outfit',sans-serif]">

        {/* SECTION: Facilities - Parking */}
        {show.designatedParking && (
          <SectionCard title="Parking Details" icon={<Car size={14} />}>
            {isMobile ? (
              <div className="flex flex-col gap-3">
                {renderVerticalBoolean('Designated parking', 'designatedParking')}
                
                <div className="h-px w-full bg-[#E4E7EC]" />
                
                <div className="grid grid-cols-2 gap-3">
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
              <div className="grid grid-cols-3 gap-4">
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
            <div className="flex flex-col gap-3">
              {show.powerBackup && renderVerticalBoolean('Power backup', 'powerBackup')}
              
              <div className="h-px w-full bg-[#E4E7EC]" />
              
              <div className="grid grid-cols-2 gap-3">
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
            <div className="grid grid-cols-3 gap-4">
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
          <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>

            {/* Facilities - Hygiene & Utilities */}
            {(show.washrooms || show.waterConnection) && (
              <SectionCard title="Hygiene & Utilities" icon={<Droplets size={14} />}>
                <div className="flex flex-col gap-3">
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
                <div className="flex flex-col gap-3">
                  {renderVerticalBoolean('Fire sprinklers', 'fireSprinklers')}
                  
                  {isMobile && <div className="h-px w-full bg-[#E4E7EC]" />}
                  
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