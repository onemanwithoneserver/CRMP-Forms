import React, { useRef, useEffect } from 'react'
import {
  Building2,
  Store,
  Map,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Save,
  Landmark,
  Building,
  Users,
  Globe,
  LayoutGrid,
} from 'lucide-react'
import { useForm, SELLER_POST_TYPES } from '../../../context/FormContext'
import { useDevice } from '../../../context/DeviceContext'
import { Dropdown } from '../../../components/inputs/Dropdown'
import { PropertyCard } from '../../../components/inputs/PropertyCard'
import { OptionButton } from '../../../components/inputs/OptionButton'
import SelectPropertyType from './SelectPropertyType'
import { BuildingInfoPanel } from '../BuildingInfo'

export default function PostType() {
  const { state, next } = useForm()
  const { device } = useDevice()
  const isMobile = device === 'mobile'
  const { postType, propertyType } = state.formData

  const postTypeSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (propertyType && postTypeSectionRef.current) {
      setTimeout(() => {
        postTypeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 350)
    }
  }, [propertyType])

  return (
    <>
      <div className="flex flex-col h-full bg-[#F5F7FA] font-['Outfit',sans-serif]">
        <div className="flex-1 overflow-y-auto scroll-smooth flex flex-col">

          {/* CHANGED: Replaced py-8 with pt-8 pb-12 to add extra space below the title */}
          <div className="relative overflow-hidden bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] pt-4 pb-12 mb-[2px]">
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)', 
                backgroundSize: '12px 12px' 
              }} 
            />
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[linear-gradient(90deg,transparent_0%,rgba(200,155,60,0.8)_50%,transparent_100%)]" />
            
            <div className="relative max-w-[768px] mx-auto text-center px-1 z-10">
              <h1 className={`font-bold text-white tracking-[-0.01em] leading-[1.2] m-0 ${isMobile ? 'text-[1.2rem]' : 'text-[1.5rem]'}`}>
                Select Property Type
              </h1>
            </div>
          </div>

          <div
            className={
              propertyType !== 'land' && !!postType
                ? isMobile
                  ? 'h-[400px] sm:h-[500px]'
                  : 'h-[1900px] xl:h-[900px]'
                : 'flex-1'
            }
          >
            <SelectPropertyType sectionRef={postTypeSectionRef} />
          </div>

          {/* The rest remains tightly packed at 2px as requested */}
          {propertyType !== 'land' && !!postType && <div className={`w-full max-w-[896px] h-auto mx-auto mt-[2px] mb-[2px] ${isMobile ? 'px-0' : 'px-[2px]'}`}>
            <div className={`bg-white shadow-[0_4px_16px_rgba(15,27,46,0.04)] border border-[#E4E7EC] overflow-hidden ${isMobile ? 'rounded-none' : 'rounded-[4px]'}`}>
              <div className="flex items-center gap-[2px] p-[2px] bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border-b border-[rgba(200,155,60,0.3)]">
                <div className="flex items-center justify-center w-[26px] h-[26px] rounded-[3px] bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <Building2 size={14} color="#E6C36A" />
                </div>
                <h2 className="text-[0.9rem] font-semibold text-white tracking-[-0.01em] m-0">
                  Building Information
                </h2>
              </div>
              <div className="p-[2px]">
                <BuildingInfoPanel />
              </div>
            </div>
          </div>}
        </div>

        <div className="w-full bg-white border-t border-[#E4E7EC] p-[2px] z-50 flex justify-between items-center shadow-[0_-4px_16px_rgba(15,27,46,0.04)] mt-auto shrink-0">
          <button
            title="Save as Draft"
            className="flex items-center gap-[2px] p-[2px] rounded-[3px] bg-transparent border border-transparent text-[#C89B3C] text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 ease outline-none hover:bg-[#C89B3C]/10 hover:border-[#C89B3C]"
          >
            <span className="flex"><Save size={14} /></span>
            <span>Save draft</span>
          </button>

          <div className="flex items-center gap-[2px]">
            <button
              title="Back"
              disabled
              className="w-8 h-8 rounded-[3px] border border-[#E4E7EC] bg-white flex items-center justify-center opacity-60 cursor-not-allowed text-[#A0AAB8] outline-none"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={next}
              disabled={!propertyType}
              title="Save & Next"
              className={`
                flex items-center justify-center h-8 min-w-[48px] rounded-[3px] border-none bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] text-white transition-all duration-200 ease outline-none
                ${!propertyType 
                  ? 'opacity-50 cursor-not-allowed shadow-none' 
                  : 'opacity-100 cursor-pointer shadow-[0_2px_6px_rgba(15,27,46,0.2),inset_0_1px_0_rgba(255,255,255,0.05)] enabled:hover:-translate-y-[1px]'
                }
              `}
            >
              <ChevronRight size={16} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}