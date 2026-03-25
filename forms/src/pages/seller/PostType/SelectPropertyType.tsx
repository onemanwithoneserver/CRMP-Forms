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
    <div ref={sectionRef} className="relative -mt-6 md:-mt-8 px-0 md:px-4 max-w-4xl mx-auto w-full transition-all duration-500">
      <div className="bg-white md:rounded-[4px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] border-y md:border border-[var(--border-light)] overflow-hidden">
        {/* Premium Gradient accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1C2A44] via-[#3b5998] to-[#C89B3C] shadow-sm" />

        <div className="p-4">
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-[4px] bg-[#1C2A44]/5 backdrop-blur-md border border-[#1C2A44]/15 flex items-center justify-center shadow-sm">
              <LayoutGrid size={18} className="text-[#1C2A44]" />
            </div>
            <h2 className="text-[1.1rem] font-bold text-[#1C2A44] font-['Outfit'] tracking-tight">
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