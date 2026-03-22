import React from 'react'

export default function StepIndicator({index, label, active, completed}:{
  index:number, label:string, active?:boolean, completed?:boolean
}){
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${active ? 'bg-primary-600 text-white' : completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
        {completed ? '✓' : index}
      </div>
      <div className="hidden md:block text-sm">{label}</div>
    </div>
  )
}
