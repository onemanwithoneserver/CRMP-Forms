import React from 'react'

type Option = { value: string; label: string }

export default function SelectField({label, value, onChange, options}:{
  label: string
  value?: string
  onChange?: (v: string) => void
  options: Option[]
}){
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
      <select
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2"
      >
        <option value="">Select</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  )
}
