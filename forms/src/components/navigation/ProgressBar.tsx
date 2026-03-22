import React from 'react'

export default function ProgressBar({progress}:{
  progress:number
}){
  return (
    <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
      <div className="h-full bg-primary-600" style={{width: `${progress}%`}} />
    </div>
  )
}
