import React from 'react'
import { LayoutGrid } from 'lucide-react'
import { useForm } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import SelectPropertyTypeDesktop from './SelectPropertyType_desktop'
import SelectPropertyTypeMobile from './SelectPropertyType_mobile'

interface SelectPropertyTypeProps {
  sectionRef?: React.RefObject<HTMLDivElement | null>
}

export default function SelectPropertyType({ sectionRef }: SelectPropertyTypeProps) {
  const { state } = useForm()
  const { device } = useDevice()
  const { propertyType } = state.formData
  const isMobile = device === 'mobile'

  return (
    <div
      ref={sectionRef}
      className={`relative max-w-[896px] mx-auto w-full transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)] font-outfit z-20 ${isMobile ? '-mt-[24px] px-0' : '-mt-[32px] px-[16px]'}`}
    >
      <div
        className={`bg-white shadow-[0_8px_32px_rgba(15,27,46,0.08),0_2px_8px_rgba(15,27,46,0.04)] overflow-hidden ${isMobile ? 'rounded-none border-y border-x-0 border-border' : 'rounded-[4px] border border-border'}`}
      >
        <div className="h-[4px] w-full bg-gradient-to-r from-navy to-gold" />
        <div className={isMobile ? 'p-[16px]' : 'py-[8px] px-[16px]'}>
          <div className={`flex items-center gap-[12px] mb-[16px]`}>
            <div className={`rounded-[3px] bg-[#F5F7FA] border border-border flex items-center justify-center shadow-[inset_0_1px_0_#FFFFFF,0_1px_2px_rgba(15,27,46,0.05)] ${isMobile ? 'w-8 h-8' : 'w-9 h-9'}`}>
              <LayoutGrid size={isMobile ? 16 : 18} color="#1C2A44" />
            </div>
            <h2 className={`font-bold text-navy m-0 tracking-[-0.01em] ${isMobile ? 'text-[1.05rem]' : 'text-[1.15rem]'}`}>
              Select Property Type
            </h2>
          </div>
          {isMobile ? (
            <SelectPropertyTypeMobile propertyType={propertyType} />
          ) : (
            <SelectPropertyTypeDesktop propertyType={propertyType} />
          )}
        </div>
      </div>
    </div>
  )
}