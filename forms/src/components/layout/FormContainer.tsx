import React from 'react'

export default function FormContainer({children}:{children:React.ReactNode}){
  return (
    <div className="bg-white border border-gray-100 rounded-md p-6 shadow-sm">
      {children}
    </div>
  )
}
