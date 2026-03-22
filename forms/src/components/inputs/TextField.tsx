import React from 'react'

type Props = {
  label: string
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  error?: string | null
}

export default function TextField({label, value, onChange, placeholder, error}: Props){
  return (
    <label className="block">
      <div className="text-sm font-medium mb-2">{label}</div>
      <input
        className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${error ? 'border-red-400 ring-red-100' : 'border-gray-200 ring-primary-200'}`}
        value={value || ''}
        placeholder={placeholder}
        onChange={e => onChange && onChange(e.target.value)}
      />
      {error ? <div className="text-xs text-red-600 mt-1">{error}</div> : null}
    </label>
  )
}
