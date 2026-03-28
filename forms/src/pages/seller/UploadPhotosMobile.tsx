import React, { useRef, useState } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { Camera, Plus, Library, Image as ImageIcon, Video, FileText } from 'lucide-react'

interface UploadZoneProps {
  label: string
  description: string
  accept: string
  note?: string
  isMultiple?: boolean
}

function UploadTile({ accept, index, type = 'image' }: { accept: string; index: number, type?: 'image' | 'video' | 'document' }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const isMain = index === 0
  const [isHovered, setIsHovered] = useState(false)

  // Dynamic classes for border and background
  const borderColor = isMain ? 'border-[#C89B3C]' : isHovered ? 'border-[#C89B3C]' : 'border-[#E4E7EC]'
  const bgColor = isMain ? 'bg-[rgba(200,155,60,0.05)]' : isHovered ? 'bg-white' : 'bg-[#F5F7FA]'
  const boxShadow = isHovered && !isMain ? 'shadow-[0_2px_8px_rgba(15,27,46,0.05)]' : ''
  const iconColor = isMain ? 'text-[#C89B3C]' : isHovered ? 'text-[#C89B3C]' : 'text-[#667085]'
  const textColor = isMain ? 'text-[#C89B3C]' : isHovered ? 'text-[#1C2A44]' : 'text-[#667085]'
  const fontWeight = isMain ? 'font-bold' : 'font-medium'

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`border-dashed border ${borderColor} rounded-[3px] h-[42px] flex flex-row items-center justify-center gap-2 cursor-pointer ${bgColor} transition-all duration-200 relative ${boxShadow}`}
    >
      <input ref={inputRef} type="file" accept={accept} className="hidden" />
      <span className={`flex items-center justify-center ${iconColor} transition-colors duration-200`}>
        {type === 'image' && <Camera size={16} strokeWidth={isMain ? 2.5 : 2} />}
        {type === 'video' && <Video size={16} strokeWidth={isMain ? 2.5 : 2} />}
        {type === 'document' && <FileText size={16} strokeWidth={isMain ? 2.5 : 2} />}
      </span>
      <span className={`text-[0.8rem] ${fontWeight} ${textColor} tracking-[-0.01em] transition-colors duration-200`}>
        {isMain ? 'Main Cover' : `Slot ${index + 1}`}
      </span>
    </div>
  )
}

function UploadZone({ label, description, accept, note, isMultiple = true }: UploadZoneProps) {
  const addMoreRef = useRef<HTMLInputElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const type = accept.includes('video') ? 'video' : accept.includes('pdf') ? 'document' : 'image'
  const borderColor = isHovered ? 'border-[#C89B3C]' : 'border-[#E4E7EC]'
  const bgColor = isHovered ? 'bg-white' : 'bg-transparent'
  const textColor = isHovered ? 'text-[#1C2A44]' : 'text-[#667085]'
  const boxShadow = isHovered ? 'shadow-[0_2px_8px_rgba(15,27,46,0.05)]' : ''
  const plusColor = isHovered ? '#C89B3C' : '#667085'

  return (
    <div className="flex flex-col gap-3 w-full font-sans">
      <label className="text-[0.85rem] font-semibold text-[#1C2A44]">{label}</label>

      <div className="grid grid-cols-2 gap-2">
        {isMultiple ? (
          <>
            <UploadTile accept={accept} index={0} type={type} />
            <UploadTile accept={accept} index={1} type={type} />
          </>
        ) : (
          <div className="col-span-2">
            <UploadTile accept={accept} index={0} type={type} />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => addMoreRef.current?.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center justify-center gap-2 h-[42px] rounded-[3px] border-dashed border ${borderColor} ${bgColor} ${textColor} text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 w-full outline-none ${boxShadow}`}
      >
        <input ref={addMoreRef} type="file" accept={accept} multiple className="hidden" />
        <Plus size={16} strokeWidth={2.5} color={plusColor} style={{ transition: 'color 200ms ease' }} />
        {description}
      </button>

      {note && (
        <p className="text-[0.75rem] text-[#A0AAB8] m-0 font-medium flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-[#C89B3C]" />
          {note}
        </p>
      )}
    </div>
  )
}

export default function UploadPhotosMobile() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const pType = d.propertyType || 'office'

  const showFloorPlan = ['retail', 'office', 'coworking', 'entire_building'].includes(pType)
  const showLayoutPlan = pType === 'land'

  const handleNext = () => {
    onUpdate({ photosUploaded: true })
    next()
  }

  return (
    <FormPage title="Property Gallery" icon={<Library size={20} color="#E6C36A" />} onBack={back} onNext={handleNext}>
      <div className="flex flex-col gap-4 font-sans">
        {/* IMAGES */}
        <SectionCard title="Property Photos" icon={<ImageIcon size={14} />}>
          <UploadZone
            label="Image Gallery"
            description="Upload more photos"
            accept="image/jpeg,image/png,image/webp"
            note="JPG, PNG, WEBP (Max 15 images)"
          />
        </SectionCard>

        {/* VIDEO */}
        <SectionCard title="Walkthrough Video" icon={<Video size={14} />}>
          <UploadZone
            label="Video Tour"
            description="Upload a video tour"
            accept="video/mp4,video/webm,video/quicktime"
            note="MP4, MOV, WebM (Max 1 video, 200MB)"
            isMultiple={false}
          />
        </SectionCard>

        {/* FLOOR PLAN */}
        {showFloorPlan && (
          <SectionCard title="Architectural Documents" icon={<FileText size={14} />}>
            <UploadZone
              label="Floor Plan"
              description="Upload architectural plans"
              accept="image/jpeg,image/png,application/pdf"
              note="JPG, PNG, PDF (High resolution)"
              isMultiple={false}
            />
          </SectionCard>
        )}

        {/* LAYOUT PLAN */}
        {showLayoutPlan && (
          <SectionCard title="Site Documentation" icon={<FileText size={14} />}>
            <UploadZone
              label="Site / Layout Plan"
              description="Upload demarcation plan"
              accept="image/jpeg,image/png,application/pdf"
              note="JPG, PNG, PDF (Official documents)"
              isMultiple={false}
            />
          </SectionCard>
        )}
      </div>
    </FormPage>
  )
}