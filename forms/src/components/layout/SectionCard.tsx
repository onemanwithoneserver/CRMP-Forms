import React from 'react'

export default function SectionCard({title, children}:{title?:string; children:React.ReactNode}){
  return (
    <section className="mb-4 bg-white border border-gray-50 rounded-md p-4">
      {title ? <h3 className="text-sm font-semibold mb-3">{title}</h3> : null}
      {children}
    </section>
  )
}
