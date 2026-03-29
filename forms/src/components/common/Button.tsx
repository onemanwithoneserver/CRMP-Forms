import React, { ReactNode } from 'react'

type Props = {
  variant?: 'primary' | 'secondary' | 'ghost'
  onClick?: () => void
  disabled?: boolean
  children: ReactNode
  fullWidth?: boolean
}

export default function Button({ variant = 'primary', onClick, disabled, children, fullWidth }: Props) {
  
  const baseClasses = `
    inline-flex items-center justify-center gap-[6px] py-[5px] px-[12px] 
    font-['Outfit',sans-serif] text-[0.85rem] font-medium rounded-[3px] border outline-none
    transition-all duration-250 ease-in-out cursor-pointer
    disabled:cursor-not-allowed disabled:opacity-40
    ${fullWidth ? 'w-full' : 'w-auto'}
  `

  const variantClasses = {
    primary: `
      bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] text-white 
      border-[#C89B3C]/40 enabled:hover:border-[#E6C36A] 
      shadow-[0_2px_6px_rgba(15,27,46,0.25),inset_0_1px_0_rgba(255,255,255,0.05)] disabled:shadow-none 
      enabled:hover:-translate-y-[1px]
    `,
    secondary: `
      bg-[#F5F7FA] text-[#1C2A44] border-[#E4E7EC] 
      enabled:hover:bg-white enabled:hover:border-[#C89B3C] 
      shadow-[0_1px_2px_rgba(15,27,46,0.05)] disabled:shadow-none
    `,
    ghost: `
      bg-transparent text-[#667085] border-transparent 
      enabled:hover:bg-[#F5F7FA] enabled:hover:text-[#1C2A44]
    `,
  }

  return (
    <button
      type="button"
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}