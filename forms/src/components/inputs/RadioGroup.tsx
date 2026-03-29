import React from 'react'

type Option = { value: string; label: string }

type Props = {
  label?: string
  options: readonly Option[] | Option[]
  value: string
  onChange: (value: string) => void
  error?: string | null
}

function RadioOption({
  option,
  selected,
  onClick
}: {
  option: Option
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center gap-2 w-full py-1.5 px-2.5 rounded-[3px] text-left cursor-pointer transition-all duration-250 ease-in-out outline-none
        ${selected 
          ? 'bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border border-[#E6C36A] shadow-[0_2px_6px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]' 
          : 'bg-[#F5F7FA] border border-[#E4E7EC] hover:bg-white hover:border-[#C89B3C] hover:shadow-[0_2px_8px_rgba(15,27,46,0.08)]'
        }
      `}
      aria-pressed={selected}
    >
      <div
        className={`
          w-[14px] h-[14px] rounded-full flex items-center justify-center shrink-0 transition-all duration-250 ease-in-out border
          ${selected 
            ? 'bg-[#C89B3C] border-transparent' 
            : 'bg-white border-[#E4E7EC] group-hover:bg-[#F5F7FA] group-hover:border-[#C89B3C]'
          }
        `}
      >
        {selected && (
          <div className="w-[6px] h-[6px] rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.6)]" />
        )}
      </div>
      <span
        className={`
          flex-1 text-[0.85rem] transition-colors duration-250 ease-in-out
          ${selected ? 'font-semibold text-white' : 'font-medium text-[#667085] group-hover:text-[#1C2A44]'}
        `}
      >
        {option.label}
      </span>
    </button>
  )
}

export default function RadioGroup({ label, options, value, onChange, error }: Props) {
  return (
    <div className="w-full font-['Outfit',sans-serif]">
      {label && (
        <div className="text-[0.8rem] font-semibold text-[#1C2A44] mb-1.5">
          {label}
        </div>
      )}
      <div className="flex flex-col gap-1">
        {options.map(option => (
          <RadioOption
            key={option.value}
            option={option}
            selected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
      {error && (
        <div className="text-[0.75rem] text-[#EF4444] mt-1 font-medium">
          {error}
        </div>
      )}
    </div>
  )
}