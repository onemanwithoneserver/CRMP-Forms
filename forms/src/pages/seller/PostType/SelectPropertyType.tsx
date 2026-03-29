import React from 'react'
import { LayoutGrid } from 'lucide-react'
import { useForm } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import SelectPropertyTypeDesktop from './SelectPropertyType_desktop'
import SelectPropertyTypeMobile from './SelectPropertyType_mobile'

interface SelectPropertyTypeProps {
  sectionRef?: React.RefObject<HTMLDivElement | null>
  showBuildingInfo?: boolean
}

export default function SelectPropertyType({ sectionRef, showBuildingInfo }: SelectPropertyTypeProps) {
  const { state } = useForm()
  const { device } = useDevice()
  const { propertyType } = state.formData
  const isMobile = device === 'mobile'

  return (
    <div
      ref={sectionRef}
      className={`relative max-w-[724px] mx-auto transition-all duration-[500ms] ease-[cubic-bezier(0.4,0,0.2,1)] font-outfit z-20 ${
        !showBuildingInfo ? 'w-full aspect-[4/3]' : ''
      } ${isMobile ? '-mt-[24px] px-0' : '-mt-[32px] px-[16px]'}`}
    >
      <div
        // Removed `overflow-hidden` here so the absolutely positioned checkmarks don't get clipped
        className={`bg-white shadow-[0_8px_32px_rgba(15,27,46,0.08),0_2px_8px_rgba(15,27,46,0.04)] ${
          isMobile ? 'rounded-none border-y border-x-0 border-border' : 'rounded-[4px] border border-border'
        }`}
      >
        {/* Added dynamic rounding to the gradient bar so it matches the parent border radius */}
        <div className={`h-[4px] w-full bg-gradient-to-r from-navy to-gold ${isMobile ? '' : 'rounded-t-[3px]'}`} />
        
        <div className={isMobile ? 'p-[4px]' : 'py-[8px] px-[16px]'}>
          <div className="flex items-center gap-[4px] mb-[4px]">
            

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