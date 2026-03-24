import React, { useRef } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import SectionCard from '../../components/layout/SectionCard'

import iconOffice from '../../assets/Select Property Type/Office Space.svg'
import iconRetail from '../../assets/Select Property Type/Rental  Commercial Space.svg'
import iconHostel from '../../assets/Select Property Type/Hostel.svg'
import iconLand from '../../assets/Select Property Type/Land.svg'
import iconCoworking from '../../assets/Select Property Type/Co-Working.svg'

const PROPERTY_TYPE_OPTIONS = [
  { value: 'office', label: 'Office Space', icon: iconOffice },
  { value: 'retail', label: 'Rental / Commercial Space', icon: iconRetail },
  { value: 'hostel', label: 'Hostel / PG', icon: iconHostel },
  { value: 'land', label: 'Land', icon: iconLand },
  { value: 'coworking', label: 'Co-Working', icon: iconCoworking },
  { value: 'entire_building', label: 'Entire Building', icon: iconOffice },
]



interface UploadZoneProps {
  label: string
  description: string
  accept: string
  note?: string
}

function UploadTile({ accept, index }: { accept: string; index: number }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const isMain = index === 0
  return (
    <div
      onClick={() => inputRef.current?.click()}
      style={{
        border: `1.5px dashed ${isMain ? 'var(--accent-gold)' : 'var(--border)'}`,
        borderRadius: '8px',
        height: '48px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        cursor: 'pointer',
        background: isMain ? 'rgba(200,155,60,0.04)' : 'var(--surface-lowest)',
        transition: 'border-color 200ms ease, background 200ms ease',
        position: 'relative',
      }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--accent-gold)'
        ;(e.currentTarget as HTMLDivElement).style.background = 'rgba(200,155,60,0.06)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = isMain ? 'var(--accent-gold)' : 'var(--border)'
        ;(e.currentTarget as HTMLDivElement).style.background = isMain ? 'rgba(200,155,60,0.04)' : 'var(--surface-lowest)'
      }}
    >
      <input ref={inputRef} type="file" accept={accept} style={{ display: 'none' }} />
      {/* Camera / image icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke={isMain ? 'var(--accent-gold)' : 'var(--text-tertiary)'}
        strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
      <span style={{
        fontSize: '0.75rem',
        fontWeight: isMain ? 700 : 500,
        color: isMain ? 'var(--accent-gold)' : 'var(--text-tertiary)',
        letterSpacing: '0.01em',
      }}>
        {isMain ? 'Main Photo' : `Photo ${index + 1}`}
      </span>
    </div>
  )
}

function UploadZone({ label, description, accept, note }: UploadZoneProps) {
  const addMoreRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col gap-3">
      <label className="text-[13px] font-semibold text-[#445069] pl-0.5">{label}</label>

      {/* 1×2 grid of upload tiles (responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {[0, 1].map(i => (
          <UploadTile key={i} accept={accept} index={i} />
        ))}
      </div>

      {/* Add more button */}
      <button
        type="button"
        onClick={() => addMoreRef.current?.click()}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          height: '48px', borderRadius: '8px',
          border: '1.5px dashed var(--border)',
          background: 'transparent',
          color: 'var(--text-secondary)',
          fontSize: '0.8rem', fontWeight: 600,
          cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
          transition: 'border-color 200ms ease, color 200ms ease',
          width: '100%',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-gold)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-gold)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'
        }}
      >
        <input ref={addMoreRef} type="file" accept={accept} multiple style={{ display: 'none' }} />
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        {description}
      </button>

      {note && (
        <p style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)', textAlign: 'center', marginTop: '-4px' }}>{note}</p>
      )}
    </div>
  )
}

export default function UploadPhotos() {
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
    <FormPage title="Media" onBack={back} onNext={handleNext}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 font-['Outfit'] pb-4">

        {/* IMAGES */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Images
          </h2>
          <UploadZone
            label="Upload Images"
            description="Drag & drop photos here"
            accept="image/jpeg,image/png,image/webp"
            note="JPG, PNG, WEBP — Max 15 images"
          />
        </div>

        {/* VIDEO */}
        <div className="flex flex-col gap-3">
          <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
            Video
          </h2>
          <UploadZone
            label="Upload Video"
            description="Drag & drop a walkthrough video here"
            accept="video/mp4,video/webm,video/quicktime"
            note="MP4, MOV, WebM — Max 1 video, up to 200 MB"
          />
        </div>

        {/* FLOOR PLAN — Retail, Office, Coworking, Entire Building */}
        {showFloorPlan && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Floor Plan
            </h2>
            <UploadZone
              label="Upload Floor Plan"
              description="Drag & drop floor plan here"
              accept="image/jpeg,image/png,application/pdf"
              note="JPG, PNG, PDF — architectural or space layout"
            />
          </div>
        )}

        {/* LAYOUT PLAN — Land only */}
        {showLayoutPlan && (
          <div className="flex flex-col gap-3">
            <h2 className="text-[1.05rem] font-bold text-[#1C2A44] border-b border-[#edf0f5] pb-2 mb-2">
              Layout Plan
            </h2>
            <UploadZone
              label="Upload Layout Plan"
              description="Drag & drop your layout / site plan here"
              accept="image/jpeg,image/png,application/pdf"
              note="JPG, PNG, PDF — demarcation or survey plan"
            />
          </div>
        )}

      </div>
    </FormPage>
  )
}
