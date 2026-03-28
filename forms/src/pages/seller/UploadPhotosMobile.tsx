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

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `1px dashed ${isMain ? '#C89B3C' : isHovered ? '#C89B3C' : '#E4E7EC'}`,
        borderRadius: '3px',
        height: '42px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
        background: isMain ? 'rgba(200,155,60,0.05)' : isHovered ? '#FFFFFF' : '#F5F7FA',
        transition: 'all 200ms ease',
        position: 'relative',
        boxShadow: isHovered && !isMain ? '0 2px 8px rgba(15, 27, 46, 0.05)' : 'none'
      }}
    >
      <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} />
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: isMain ? '#C89B3C' : isHovered ? '#C89B3C' : '#667085', transition: 'color 200ms ease' }}>
        {type === 'image' && <Camera size={16} strokeWidth={isMain ? 2.5 : 2} />}
        {type === 'video' && <Video size={16} strokeWidth={isMain ? 2.5 : 2} />}
        {type === 'document' && <FileText size={16} strokeWidth={isMain ? 2.5 : 2} />}
      </span>
      <span style={{
        fontSize: '0.8rem',
        fontWeight: isMain ? 700 : 500,
        color: isMain ? '#C89B3C' : isHovered ? '#1C2A44' : '#667085',
        letterSpacing: '-0.01em',
        transition: 'color 200ms ease'
      }}>
        {isMain ? 'Main Cover' : `Slot ${index + 1}`}
      </span>
    </div>
  )
}

function UploadZone({ label, description, accept, note, isMultiple = true }: UploadZoneProps) {
  const addMoreRef = useRef<HTMLInputElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const type = accept.includes('video') ? 'video' : accept.includes('pdf') ? 'document' : 'image'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', fontFamily: "'Outfit', sans-serif" }}>
      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1C2A44' }}>{label}</label>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
        {isMultiple ? (
          <>
            <UploadTile accept={accept} index={0} type={type} />
            <UploadTile accept={accept} index={1} type={type} />
          </>
        ) : (
          <div style={{ gridColumn: '1 / -1' }}>
            <UploadTile accept={accept} index={0} type={type} />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => addMoreRef.current?.click()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          height: '42px', borderRadius: '3px',
          border: `1px dashed ${isHovered ? '#C89B3C' : '#E4E7EC'}`,
          background: isHovered ? '#FFFFFF' : 'transparent',
          color: isHovered ? '#1C2A44' : '#667085',
          fontSize: '0.8rem', fontWeight: 600,
          cursor: 'pointer', transition: 'all 200ms ease',
          width: '100%', outline: 'none',
          boxShadow: isHovered ? '0 2px 8px rgba(15, 27, 46, 0.05)' : 'none'
        }}
      >
        <input ref={addMoreRef} type="file" accept={accept} multiple style={{ display: 'none' }} />
        <Plus size={16} strokeWidth={2.5} color={isHovered ? '#C89B3C' : '#667085'} style={{ transition: 'color 200ms ease' }} />
        {description}
      </button>

      {note && (
        <p style={{ fontSize: '0.75rem', color: '#A0AAB8', margin: '0', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: '#C89B3C' }} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: "'Outfit', sans-serif" }}>

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