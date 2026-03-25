import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'

export default function PropertyDetails() {
  const { state, dispatch, next, back } = useForm()
  const { buildingSelection, buildingName } = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Is this property in an existing building?"
      onBack={back}
      onNext={next}
    >
      <div className="flex flex-col gap-4">

        <div className="relative">
          <input
            type="text"
            className="form-input pr-[48px] h-[54px] rounded-[8px] text-[1rem] text-[var(--text)] border-[var(--border-light)]"
            placeholder="Search Building Name"
            value={buildingName}
            onChange={(e) => onUpdate({ buildingName: e.target.value })}
          />
          <div className="absolute right-[16px] top-[15px] text-[var(--text-tertiary)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>


        <button
          type="button"
          className={`selection-card ${buildingSelection === 'existing' ? 'selected' : ''} flex items-center shadow-[0_4px_10px_rgba(0,0,0,0.04)] p-[18px_20px] gap-[16px] rounded-[8px]`}
          onClick={() => onUpdate({ buildingSelection: 'existing' })}
        >
          <div className={`radio-circle ${buildingSelection === 'existing' ? 'active' : ''} !mt-0`} />
          <div className="flex-1 text-[1rem] font-[800] text-[var(--text)] text-left">
            Select from Existing
          </div>
          <div className={buildingSelection === 'existing' ? 'text-[var(--text)]' : 'text-[var(--text-tertiary)]'}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="8" width="8" height="14" rx="1" />
              <rect x="12" y="4" width="8" height="18" rx="1" />
              <path d="M6 12h4M6 16h4M14 8h4M14 12h4M14 16h4" />
            </svg>
          </div>
        </button>


        <button
          type="button"
          className={`selection-card ${buildingSelection === 'new' ? 'selected' : ''} flex items-center shadow-[0_4px_10px_rgba(0,0,0,0.04)] p-[18px_20px] gap-[16px] rounded-[8px]`}
          onClick={() => onUpdate({ buildingSelection: 'new' })}
        >
          <div className={`radio-circle ${buildingSelection === 'new' ? 'active' : ''} !mt-0`} />
          <div className="flex-1 text-[1rem] font-[800] text-[var(--text)] text-left">
            Add New Existing
          </div>
          <div className={`relative ${buildingSelection === 'new' ? 'text-[var(--text)]' : 'text-[var(--text-tertiary)]'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21h18" />
              <path d="M5 21V7l14-4v18" />
              <path d="M9 9h6" />
              <path d="M9 13h6" />
            </svg>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" 
              className={`absolute bottom-[-4px] right-[-4px] rounded-full ${buildingSelection === 'new' ? 'bg-[var(--accent-gold)]' : 'bg-[var(--surface-lowest)]'}`}>
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
        </button>
      </div>
      {state.errors.buildingSelection && (
        <div className="text-[0.75rem] text-[#d32f2f] mt-[12px]">
          {state.errors.buildingSelection}
        </div>
      )}
    </FormPage>
  )
}
