import React from 'react'

export default function Button({children, variant='primary', onClick, disabled}:{
  children:React.ReactNode
  variant?: 'primary'|'secondary'
  onClick?: ()=>void
  disabled?: boolean
}){
  const base = 'px-4 py-2 rounded-md text-sm font-medium'
  const cls = variant==='primary' ? `${base} bg-primary-600 text-white` : `${base} border border-gray-200 bg-white`
  return (
    <button className={`${cls} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
