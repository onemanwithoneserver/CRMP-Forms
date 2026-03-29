import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Toggle({ label, checked, onChange }: Props) {
  return (
    <div className="flex items-center justify-between py-1.5 w-full font-['Outfit',sans-serif]">
      <span className={`text-[0.85rem] font-semibold transition-colors duration-250 ease-in-out ${checked ? 'text-[#1C2A44]' : 'text-[#667085]'}`}>
        {label}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`
          relative w-[42px] h-[24px] rounded shrink-0 cursor-pointer p-0 box-border outline-none transition-all duration-250 ease-in-out border
          ${checked
            ? 'bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border-[#C89B3C] hover:border-[#E6C36A] shadow-[0_2px_6px_rgba(15,27,46,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]'
            : 'bg-[#F5F7FA] hover:bg-white border-[#E4E7EC] hover:border-[#C89B3C] shadow-[inset_0_1px_3px_rgba(15,27,46,0.05)] hover:shadow-none'
          }
        `}
      >
        <div
          className={`
            absolute top-[3px] w-4 h-4 bg-white rounded-[3px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)]
            ${checked 
              ? 'left-[21px] shadow-[0_2px_4px_rgba(15,27,46,0.25)]' 
              : 'left-[3px] shadow-[0_1px_3px_rgba(15,27,46,0.15)]'
            }
          `}
        />
      </button>
    </div>
  )
}