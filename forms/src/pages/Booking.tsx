import React from 'react'
import Stepper from '../components/Stepper'

const steps = [
  'Select dates',
  'Choose room',
  'Guest details',
  'Add-ons',
  'Payment',
  'Review',
  'Confirm',
  'Receipt'
]

export default function Booking() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Booking — Stepper</h2>
      <div className="mb-4 text-sm text-[var(--on-surface-variant)]">This stepper adapts across Desktop, Tablet and Mobile — colors follow the design system.</div>
      <Stepper steps={steps} />
    </section>
  )
}
