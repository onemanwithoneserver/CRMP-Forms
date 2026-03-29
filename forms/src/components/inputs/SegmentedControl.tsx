import React from 'react'

type Option = { label: string; value: string }

type Props = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  compact?: boolean
}

// Internal component handling precise styles natively via Tailwind pseudo-classes
function Segment({
  option,
  isSelected,
  onClick,
  compact
}: {
  option: Option
  isSelected: boolean
  onClick: () => void
  compact: boolean
}) {
  
  const baseClasses = "flex items-center justify-center rounded-[3px] cursor-pointer transition-all duration-250 ease-in-out whitespace-nowrap text-[0.8rem] outline-none border"
  const sizeClasses = compact ? "flex-none min-w-[60px] py-1 px-4" : "flex-1 py-1 px-2"
  
  const stateClasses = isSelected
    ? "bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] text-white font-semibold border-[#C89B3C] shadow-[0_2px_6px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]"
    : "bg-transparent text-[#667085] font-medium border-transparent hover:bg-white hover:text-[#1C2A44] hover:shadow-[0_1px_4px_rgba(15,27,46,0.08)] hover:border-[#E4E7EC]"

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${stateClasses}`}
    >
      {option.label}
    </button>
  )
}

export default function SegmentedControl({ options, value, onChange, compact = false }: Props) {
  return (
    <div
      className={`
        inline-flex items-center bg-[#F5F7FA] border border-[#E4E7EC] p-[2px] gap-[2px] 
        rounded-[4px] box-border min-h-[34px] font-['Outfit',sans-serif] 
        shadow-[inset_0_1px_3px_rgba(15,27,46,0.04)]
        ${compact ? 'w-fit' : 'w-full'}
      `}
    >
      {options.map(opt => (
        <Segment
          key={opt.value}
          option={opt}
          isSelected={value === opt.value}
          onClick={() => onChange(opt.value)}
          compact={compact}
        />
      ))}
    </div>
  )
}