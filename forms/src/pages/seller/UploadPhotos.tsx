import React, { useState } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

export default function UploadPhotos() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const [uploaded] = useState([1, 2, 3]) 

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  const handleNext = () => {
    onUpdate({ photosUploaded: true })
    next()
  }

  return (
    <FormPage
      title="Upload Photos"
      onBack={back}
      onNext={handleNext}
    >
      <div className="flex flex-col gap-6">
        
        <div style={{
          border: '1.5px dashed var(--text-tertiary)',
          borderRadius: '16px',
          padding: '40px 20px',
          textAlign: 'center',
          backgroundColor: 'var(--surface-lowest)',
          transition: 'all 300ms ease',
          cursor: 'pointer'
        }}
        >
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text)', marginBottom: '8px' }}>
            Drag & drop photos/videos here<br/>or <span style={{ color: 'var(--accent-gold)' }}>Browse Files</span>
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '12px' }}>
            JPG, PNG, MP4 formats | Max. 15 uploads
          </p>
        </div>

        <button className="save-draft-btn" style={{ justifyContent: 'center', width: '100%', padding: '14px', background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }}>
           + Add More Photos
        </button>

        <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
          Some tips: Add clear photos with good lighting.
        </p>


        <div className="flex gap-3 overflow-x-auto pb-2">
          {uploaded.map((i) => (
            <div key={i} style={{ 
              minWidth: '110px', height: '80px', 
              borderRadius: '8px', 
              background: 'var(--border-light)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--border-light)'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, #e4e4e7, #f4f4f5)' }} />
              <div style={{ 
                  position: 'absolute', top: 6, right: 6, width: 20, height: 20, 
                  background: 'rgba(28, 42, 68, 0.7)', color: '#fff', 
                  borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' 
              }}>✓</div>
            </div>
          ))}
        </div>

        <div style={{
          border: '1px solid var(--border)',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          background: 'var(--surface-lowest)',
          transition: 'all 300ms ease'
        }}
        >
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>+ Add More Photos/Videos</span>
          <span style={{ color: 'var(--text-tertiary)' }}>›</span>
        </div>

      </div>
    </FormPage>
  )
}
