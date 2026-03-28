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
      className={`relative max-w-[896px] mx-auto w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] font-['Outfit',_sans-serif] z-20 ${
        isMobile ? '-mt-6 px-0' : '-mt-8 px-4'
      }`}
    >
      <div 
        className={`bg-white shadow-[0_8px_32px_rgba(15,27,46,0.08),0_2px_8px_rgba(15,27,46,0.04)]  overflow-hidden ${
          isMobile 
            ? 'rounded-none border-y border-x-0 border-[#E4E7EC]' 
            : 'rounded-[4px] border border-[#E4E7EC]'
        }`}
      >
        <div className="h-1 w-full bg-gradient-to-r from-[#1C2A44] to-[#C89B3C]" />

        <div className={isMobile ? 'p-4' : 'py-2 px-4'}>
          <div className={`flex items-center gap-3 ${isMobile ? 'mb-4' : 'mb-4'}`}>
            <div 
              className={`rounded-[3px] bg-[#F5F7FA] border border-[#E4E7EC] flex items-center justify-center shadow-[inset_0_1px_0_#FFFFFF,0_1px_2px_rgba(15,27,46,0.05)] ${
                isMobile ? 'w-8 h-8' : 'w-9 h-9'
              }`}
            >
              <LayoutGrid size={isMobile ? 16 : 18} color="#1C2A44" />
            </div>
            <h2 className={`font-bold text-[#1C2A44] m-0 tracking-[-0.01em] ${
              isMobile ? 'text-[1.05rem]' : 'text-[1.15rem]'
            }`}>
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