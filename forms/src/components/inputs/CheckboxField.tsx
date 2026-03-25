import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export default function CheckboxField({ label, checked, onChange }: Props) {
  return (
    <button
      type="button"
      className="flex items-center gap-2.5 bg-none border-none cursor-pointer py-[2px] text-left"
      onClick={() => onChange(!checked)}
    >
      <div className={`custom-checkbox ${checked ? 'checked' : ''}`}>
        {checked && <CheckIcon />}
      </div>
      <span className={`text-[0.82rem] font-[500] transition-colors duration-300 ${
        checked ? 'text-[var(--text)]' : 'text-[var(--text-secondary)]'
      }`}>
        {label}
      </span>
    </button>
  )
}
