import React, { useRef } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'
import { useDevice } from '../../context/DeviceContext'
import UploadPhotosMobile from './UploadPhotosMobile'
import { Library, Camera, Plus, Upload, Image as ImageIcon, Video, FileText } from 'lucide-react'

interface UploadZoneProps {
  label: string
  description: string
  accept: string
  note?: string
  icon?: React.ReactNode
  isMultiple?: boolean
}

function UploadTile({ accept, index, type = 'image' }: { accept: string; index: number, type?: 'image' | 'video' | 'document' }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const isMain = index === 0

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`
        group relative flex flex-row items-center justify-center gap-2 h-[42px] rounded-[3px] cursor-pointer transition-all duration-200 ease
        ${isMain 
          ? 'bg-[rgba(200,155,60,0.05)] border border-dashed border-[#C89B3C]' 
          : 'bg-[#F5F7FA] border border-dashed border-[#E4E7EC] hover:bg-white hover:border-[#C89B3C] hover:shadow-[0_2px_8px_rgba(15,27,46,0.05)]'
        }
      `}
    >
      <input ref={inputRef} type="file" accept={accept} className="hidden" />
      <span className={`flex items-center justify-center transition-colors duration-200 ease ${isMain ? 'text-[#C89B3C]' : 'text-[#667085] group-hover:text-[#C89B3C]'}`}>
        {type === 'image' && <Camera size={16} strokeWidth={isMain ? 2.5 : 2} />}
        {type === 'video' && <Video size={16} strokeWidth={isMain ? 2.5 : 2} />}
        {type === 'document' && <FileText size={16} strokeWidth={isMain ? 2.5 : 2} />}
      </span>
      <span className={`
        text-[0.8rem] tracking-[-0.01em] transition-colors duration-200 ease
        ${isMain ? 'font-bold text-[#C89B3C]' : 'font-medium text-[#667085] group-hover:text-[#1C2A44]'}
      `}>
        {isMain ? 'Main Cover' : `Slot ${index + 1}`}
      </span>
    </div>
  )
}

function UploadZone({ label, description, accept, note, icon, isMultiple = true }: UploadZoneProps) {
  const addMoreRef = useRef<HTMLInputElement>(null)

  const type = accept.includes('video') ? 'video' : accept.includes('pdf') ? 'document' : 'image'

  return (
    <div className="flex flex-col gap-2 w-full font-['Outfit',sans-serif]">
      <div className="flex items-center gap-2">
        {icon && <span className="text-[#C89B3C] flex">{icon}</span>}
        <label className="text-[0.85rem] font-semibold text-[#1C2A44]">{label}</label>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
        {isMultiple ? (
          <>
            <UploadTile accept={accept} index={0} type={type} />
            <UploadTile accept={accept} index={1} type={type} />
          </>
        ) : (
          <div className="col-[1/-1]">
             <UploadTile accept={accept} index={0} type={type} />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => addMoreRef.current?.click()}
        className="group flex items-center justify-center gap-2 w-full h-[42px] rounded-[3px] bg-transparent border border-dashed border-[#E4E7EC] text-[#667085] text-[0.8rem] font-semibold cursor-pointer transition-all duration-200 ease outline-none hover:bg-white hover:border-[#C89B3C] hover:text-[#1C2A44] hover:shadow-[0_2px_8px_rgba(15,27,46,0.05)]"
      >
        <input ref={addMoreRef} type="file" accept={accept} multiple className="hidden" />
        <Plus size={16} strokeWidth={2.5} className="text-[#667085] transition-colors duration-200 ease group-hover:text-[#C89B3C]" />
        {description}
      </button>

      {note && (
        <p className="flex items-center gap-1 mt-1 mb-0 text-[0.75rem] font-medium text-[#A0AAB8]">
          <span className="inline-block w-1 h-1 rounded-full bg-[#C89B3C]" />
          {note}
        </p>
      )}
    </div>
  )
}

export default function UploadPhotos() {
  const { device } = useDevice()

  if (device === 'mobile') {
    return <UploadPhotosMobile />
  }

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
      <div className="max-w-[896px] mx-auto flex flex-col gap-4 font-['Outfit',sans-serif]">
        
        <SectionCard title="Media & Documentation" icon={<Upload size={14} />}>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            
            {/* IMAGES */}
            <div className="p-4 bg-white border border-[#E4E7EC] rounded shadow-[0_2px_8px_rgba(15,27,46,0.02)]">
              <UploadZone
                label="Property Photos"
                description="Upload additional photos"
                accept="image/jpeg,image/png,image/webp"
                note="JPG, PNG, WEBP (Max 15 images)"
                icon={<ImageIcon size={16} />}
              />
            </div>

            {/* VIDEO */}
            <div className="p-4 bg-white border border-[#E4E7EC] rounded shadow-[0_2px_8px_rgba(15,27,46,0.02)]">
              <UploadZone
                label="Walkthrough Video"
                description="Upload video tour"
                accept="video/mp4,video/webm,video/quicktime"
                note="MP4, MOV, WebM (Max 1 video, 200MB)"
                icon={<Video size={16} />}
                isMultiple={false}
              />
            </div>

            {/* FLOOR PLAN */}
            {showFloorPlan && (
              <div className="p-4 bg-white border border-[#E4E7EC] rounded shadow-[0_2px_8px_rgba(15,27,46,0.02)]">
                <UploadZone
                  label="Floor Plan"
                  description="Upload architectural plans"
                  accept="image/jpeg,image/png,application/pdf"
                  note="JPG, PNG, PDF (High resolution preferred)"
                  icon={<FileText size={16} />}
                  isMultiple={false}
                />
              </div>
            )}

            {/* LAYOUT PLAN */}
            {showLayoutPlan && (
              <div className="p-4 bg-white border border-[#E4E7EC] rounded shadow-[0_2px_8px_rgba(15,27,46,0.02)]">
                <UploadZone
                  label="Site / Layout Plan"
                  description="Upload demarcation or survey plan"
                  accept="image/jpeg,image/png,application/pdf"
                  note="JPG, PNG, PDF (Official documents preferred)"
                  icon={<FileText size={16} />}
                  isMultiple={false}
                />
              </div>
            )}

          </div>
        </SectionCard>

      </div>
    </FormPage>
  )
}