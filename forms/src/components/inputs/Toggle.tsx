import React from 'react'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Toggle({ label, checked, onChange }: Props) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-[0.85rem] font-[600] text-[var(--text)]">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-[42px] h-[26px] rounded-[4px] relative transition-colors duration-300 border-none cursor-pointer ${
          checked ? 'bg-[#1C2A44]' : 'bg-[rgba(9,9,11,0.2)]'
        }`}
      >
        <div 
          className={`w-[20px] h-[20px] rounded-[3px] bg-white absolute top-[3px] transition-all duration-300 shadow-[0_2px_8px_rgba(9,9,11,0.15)] ${
            checked ? 'left-[19px]' : 'left-[3px]'
          }`}
        />
      </button>
    </div>
  )
}
