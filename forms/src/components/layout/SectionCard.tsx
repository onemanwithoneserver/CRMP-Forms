import React, { ReactNode } from 'react'

type Props = {
  title?: string
  children: ReactNode
}

export default function SectionCard({ title, children }: Props) {
  return (
    <section className="section-card" style={{ marginBottom: '12px' }}>
      {title && <div className="section-title">{title}</div>}
      {children}
    </section>
  )
}
