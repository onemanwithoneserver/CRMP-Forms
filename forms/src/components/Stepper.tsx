import React from 'react'

type StepperProps = {
  steps: string[]
}

export default function Stepper({ steps }: StepperProps) {
  const [current, setCurrent] = React.useState(0)

  const goNext = () => setCurrent((s) => Math.min(s + 1, steps.length - 1))
  const goPrev = () => setCurrent((s) => Math.max(s - 1, 0))

  return (
    <div className="w-full">
      <nav className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        {steps.map((label, i) => {
          const completed = i < current
          const active = i === current
          return (
            <div
              key={label}
              className={`flex items-center md:flex-col md:items-start gap-3 md:gap-2 flex-1`}
              aria-current={active ? 'step' : undefined}
            >
              <div className="flex items-center gap-3 md:flex-col md:gap-2 w-full">
                <div className="flex items-center w-full md:w-auto">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium text-white ${
                      active ? 'primary-gradient shadow' : completed ? 'bg-white text-gray-700 border border-gray-200' : 'bg-gray-200 text-gray-600'
                    }`}
                    style={active ? { boxShadow: '0 8px 20px rgba(79,70,229,0.18)' } : {}}
                  >
                    {completed ? '✓' : i + 1}
                  </div>

                  <div className="ml-3 md:ml-0 md:mt-1">
                    <div className={`text-sm font-semibold ${active ? 'text-[var(--on-surface)]' : 'text-[var(--on-surface-variant)]'}`}>
                      {label}
                    </div>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:block flex-1 h-0.5 bg-gray-200 ml-4 mr-4" />
                )}
              </div>
            </div>
          )
        })}
      </nav>

      <section className="mt-6 p-4 bg-[var(--surface-container-lowest)] ghost-border rounded-lg">
        <h3 className="text-lg font-semibold text-[var(--on-surface)]">Step {current + 1}: {steps[current]}</h3>
        <p className="mt-2 text-sm text-[var(--on-surface-variant)]">Fill the required details for this step. (Placeholder content)</p>

        <div className="mt-4 flex gap-2">
          <button onClick={goPrev} disabled={current === 0} className="px-3 py-2 rounded-md bg-white border border-gray-200 text-sm disabled:opacity-50">
            Previous
          </button>
          <button onClick={goNext} disabled={current === steps.length - 1} className="px-3 py-2 rounded-md text-white primary-gradient text-sm disabled:opacity-50">
            Next
          </button>
        </div>
      </section>
    </div>
  )
}
