import React from 'react'

export default function DatePicker({label, value, onChange}:{
  label: string
  value?: string
  onChange?: (v:string)=>void
}){
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
      <input type="date" value={value || ''} onChange={e=>onChange && onChange(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-md" />
    </label>
  )
}
