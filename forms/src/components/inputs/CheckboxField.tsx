import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

export default function CheckboxField({ label, checked, onChange }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="group flex items-center gap-[6px] bg-transparent border-none cursor-pointer py-0.5 text-left font-['Outfit',sans-serif] outline-none"
    >
      <div
        className={`
          w-4 h-4 rounded-[3px] flex items-center justify-center transition-all duration-[250ms] ease-in-out border
          ${checked
            ? 'bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border-[#C89B3C]/40 group-hover:border-[#E6C36A] shadow-[0_2px_4px_rgba(15,27,46,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]'
            : 'bg-[#F5F7FA] border-[#E4E7EC] group-hover:border-[#C89B3C] shadow-none group-hover:shadow-[0_1px_2px_rgba(15,27,46,0.05)]'
          }
        `}
      >
        {checked && <CheckIcon />}
      </div>
      <span
        className={`text-[0.85rem] font-medium transition-colors duration-[250ms] ease-in-out ${
          checked ? 'text-[#1C2A44]' : 'text-[#667085]'
        }`}
      >
        {label}
      </span>
    </button>
  )
}