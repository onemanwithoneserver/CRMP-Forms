import React, { useState, useRef, useEffect } from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

const InlineDropdown = ({ value, options, onChange }: { value: string, options: string[], onChange: (v: string) => void }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<'bottom' | 'top'>('bottom')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '180px' }}>
      <div
        onClick={() => {
          if (!open && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect()
            const spaceBelow = window.innerHeight - rect.bottom
            setPosition(spaceBelow < 200 && rect.top > spaceBelow ? 'top' : 'bottom')
          }
          setOpen(!open)
        }}
        className="form-input"
        style={{
          height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 12px', fontWeight: 600, cursor: 'pointer',
          borderColor: open ? 'var(--accent-gold)' : undefined,
        }}
      >
        <span>{value || 'Select...'}</span>
        <svg width="10" height="6" viewBox="0 0 12 7" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 200ms ease' }}>
          <path d="M1 1l5 5 5-5" stroke="#667085" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open && (
        <div style={{
          position: 'absolute', 
          top: position === 'bottom' ? '100%' : 'auto',
          bottom: position === 'top' ? '100%' : 'auto',
          marginTop: position === 'bottom' ? '4px' : 0,
          marginBottom: position === 'top' ? '4px' : 0,
          left: 0, right: 0,
          background: '#fff', border: '1px solid var(--border-light)',
          borderRadius: '8px', boxShadow: 'var(--shadow-lg)',
          zIndex: 50, overflow: 'hidden', padding: '4px'
        }}>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: value === opt ? 600 : 500,
                cursor: 'pointer',
                background: value === opt ? 'var(--accent)' : 'transparent',
                color: value === opt ? '#fff' : 'var(--text)',
                transition: 'all 200ms ease'
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function TransactionDetails() {
  const { state, dispatch, next, back } = useForm()
  const d = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Add Transactional Details"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-6">

        <div className="flex flex-col gap-3">
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
            {d.postType?.includes('sell') ? 'Total Selling Price' : 'Asking Price'}
          </label>
          <div className="flex gap-4">
            <input
              className="form-input flex-1"
              placeholder={d.postType?.includes('sell') ? "₹ 5,00,00,000" : "₹ 1,20,00,000"}
              value={d.askingPriceTotal}
              onChange={e => onUpdate({ askingPriceTotal: e.target.value })}
              style={{ fontWeight: 600 }}
            />
            {!d.postType?.includes('sell') && (
              <input
                className="form-input flex-1"
                placeholder="₹ 75,000/mo"
                value={d.askingPriceMonthly}
                onChange={e => onUpdate({ askingPriceMonthly: e.target.value })}
                style={{ color: 'var(--text)', fontWeight: 700 }}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-0 border-t border-gray-100 mt-2">

          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Property Ownership:</span>
            <InlineDropdown
              value={d.propertyOwnership}
              options={['Freehold', 'Leasehold']}
              onChange={v => onUpdate({ propertyOwnership: v })}
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Transaction Details:</span>
            <InlineDropdown
              value={d.transactionDetails}
              options={
                d.postType?.includes('sell') ? ['Outright Sale', 'Joint Venture'] : ['100% Equity Sale', 'Partial Equity Sale']
              }
              onChange={v => onUpdate({ transactionDetails: v })}
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Price Per Sq. Ft.</span>
            <input
              className="form-input"
              style={{ width: '140px', height: '40px', textAlign: 'right', fontWeight: 700, paddingRight: '12px' }}
              placeholder="₹ 8,000"
              value={d.pricePerSqFt}
              onChange={e => onUpdate({ pricePerSqFt: e.target.value })}
            />
          </div>

          <div className="flex items-center justify-between py-4 border-b border-gray-100">
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Additional Notes</span>
            <div style={{ width: '180px' }}>
              <input
                className="form-input"
                style={{ height: '40px', padding: '0 10px' }}
                placeholder="Write notes"
                value={d.additionalNotes}
                onChange={e => onUpdate({ additionalNotes: e.target.value })}
              />
            </div>
          </div>

        </div>

      </div>
    </FormPage>
  )
}
