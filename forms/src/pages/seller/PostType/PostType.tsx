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
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F5F7FA', fontFamily: "'Outfit', sans-serif" }}>
        <div style={{ flex: 1, overflowY: 'auto', scrollBehavior: 'smooth' }}>

          <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', paddingTop: '12px', paddingBottom: '32px' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)', backgroundSize: '12px 12px', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent 0%, rgba(200, 155, 60, 0.8) 50%, transparent 100%)' }} />
            <div style={{ position: 'relative', maxWidth: '768px', margin: '0 auto', textAlign: 'center', padding: '0 16px' }}>
              <h1 style={{ fontSize: isMobile ? '1.2rem' : '1.5rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1.2, margin: 0 }}>
                What type of property do you want to list?
              </h1>
            </div>
          </div>

          <SelectPropertyType sectionRef={postTypeSectionRef} />

          <div style={{ padding: isMobile ? '0' : '0 16px', marginTop: '16px', width: '100%', marginBottom: '16px', maxWidth: '896px', marginLeft: 'auto', marginRight: 'auto' }}>
            <div style={{ background: '#FFFFFF', borderRadius: isMobile ? '0' : '4px', boxShadow: '0 4px 16px rgba(15, 27, 46, 0.04)', border: '1px solid #E4E7EC', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', borderBottom: '1px solid rgba(200, 155, 60, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(255, 255, 255, 0.12)', boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)' }}>
                  <Building2 size={14} color="#E6C36A" />
                </div>
                <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#FFFFFF', letterSpacing: '-0.01em', margin: 0 }}>Building Information</h2>
              </div>
              <div style={{ padding: '8px' }}>
                <BuildingInfoPanel />
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', background: '#FFFFFF', borderTop: '1px solid #E4E7EC', padding: '10px 16px', zIndex: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 -4px 16px rgba(15, 27, 46, 0.04)', marginTop: 'auto', flexShrink: 0 }}>
          <button
            title="Save as Draft"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '3px', background: 'transparent', border: '1px solid transparent', color: '#C89B3C', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 200ms ease', outline: 'none' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200, 155, 60, 0.1)'; e.currentTarget.style.borderColor = '#C89B3C' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}
          >
            <span style={{ display: 'flex' }}><Save size={14} /></span>
            <span>Save draft</span>
          </button>

          <div style={{ display: 'flex', gap: '8px', items: 'center' }}>
            <button
              title="Back"
              disabled
              style={{ width: '32px', height: '32px', borderRadius: '3px', border: '1px solid #E4E7EC', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed', color: '#A0AAB8', outline: 'none' }}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              onClick={next}
              disabled={!propertyType}
              title="Save & Next"
              style={{ height: '32px', minWidth: '48px', borderRadius: '3px', border: 'none', background: 'linear-gradient(135deg, #1C2A44 0%, #0F1B2E 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: !propertyType ? 'not-allowed' : 'pointer', opacity: !propertyType ? 0.5 : 1, boxShadow: !propertyType ? 'none' : '0 2px 6px rgba(15, 27, 46, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)', transition: 'all 200ms ease', outline: 'none' }}
              onMouseEnter={(e) => { if (!(!propertyType)) e.currentTarget.style.transform = 'translateY(-1px)' }}
              onMouseLeave={(e) => { if (!(!propertyType)) e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <ChevronRight size={16} color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}