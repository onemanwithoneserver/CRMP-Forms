import React from 'react'

export default function CheckboxGroup({label, options, selected = [], onChange}:{
  label: string
  options: {value:string;label:string}[]
  selected?: string[]
  onChange?: (s: string[]) => void
}){
  const toggle = (v: string) => {
    const next = selected.includes(v) ? selected.filter(x=>x!==v) : [...selected, v]
    onChange && onChange(next)
  }

  return (
    <fieldset>
      <legend className="text-sm font-medium mb-2">{label}</legend>
      <div className="flex flex-col gap-2">
        {options.map(o => (
          <label key={o.value} className="inline-flex items-center gap-2">
            <input type="checkbox" checked={selected.includes(o.value)} onChange={() => toggle(o.value)} />
            <span className="text-sm">{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
