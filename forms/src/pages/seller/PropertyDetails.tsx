import React from 'react'
import { useForm } from '../../context/FormContext'
import FormPage from '../../components/layout/FormPage'
import { Search, Building2, Plus, Building } from 'lucide-react'

function SelectionCard({
  title,
  icon: Icon,
  selected,
  onClick,
  isAdd = false
}: {
  title: string
  icon: React.ElementType
  selected: boolean
  onClick: () => void
  isAdd?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group flex items-center gap-4 px-2 py-2 w-full rounded outline-none cursor-pointer transition-all duration-250 ease font-['Outfit',sans-serif]
        ${selected 
          ? 'bg-[linear-gradient(135deg,#1C2A44_0%,#0F1B2E_100%)] border border-[#C89B3C] shadow-[0_4px_12px_rgba(15,27,46,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] text-white' 
          : 'bg-[#F5F7FA] border border-[#E4E7EC] hover:bg-white hover:border-[#E6C36A] hover:shadow-[0_2px_8px_rgba(15,27,46,0.05)] text-[#1C2A44]'
        }
      `}
    >
      <div
        className={`
          w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ease border
          ${selected 
            ? 'bg-[#C89B3C] border-transparent shadow-[0_2px_4px_rgba(200,155,60,0.3)]' 
            : 'bg-white border-[#E4E7EC] group-hover:border-[#C89B3C] shadow-[inset_0_1px_2px_rgba(15,27,46,0.05)]'
          }
        `}
      >
        {selected && (
          <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
        )}
      </div>

      <span className="flex-1 text-left text-[0.95rem] font-bold tracking-[-0.01em] transition-colors duration-200 ease">
        {title}
      </span>

      <div 
        className={`relative flex items-center justify-center w-7 h-7 transition-colors duration-200 ease ${
          selected ? 'text-[#E6C36A]' : 'text-[#667085] group-hover:text-[#C89B3C]'
        }`}
      >
        <Icon size={24} strokeWidth={1.5} />
        {isAdd && (
          <div 
            className={`absolute -bottom-1 -right-1 text-white rounded-full p-0.5 flex items-center justify-center transition-all duration-200 ease ${
              selected ? 'bg-[#C89B3C]' : 'bg-[#E4E7EC] group-hover:bg-[#C89B3C]'
            }`}
          >
            <Plus size={10} strokeWidth={3} />
          </div>
        )}
      </div>
    </button>
  )
}

export default function PropertyDetails() {
  const { state, dispatch, next, back } = useForm()
  const { buildingSelection, buildingName } = state.formData

  const onUpdate = (payload: Partial<typeof state.formData>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <FormPage
      title="Is this property in an existing building?"
      onBack={back}
      onNext={next}
      icon={<Building size={20} color="#E6C36A" />}
    >
      <div className="max-w-[720px] mx-auto flex flex-col gap-5 font-['Outfit',sans-serif]">
        
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search Building Name"
            value={buildingName}
            onChange={(e) => onUpdate({ buildingName: e.target.value })}
            className="peer w-full h-[44px] pl-4 pr-11 text-[0.95rem] font-medium text-[#1C2A44] bg-[#F5F7FA] border border-[#E4E7EC] rounded outline-none box-border transition-all duration-250 ease-in-out shadow-[inset_0_1px_3px_rgba(15,27,46,0.03)] hover:bg-white hover:border-[#E6C36A] hover:shadow-[0_2px_8px_rgba(15,27,46,0.05)] focus:bg-white focus:border-[#C89B3C] focus:shadow-[0_4px_12px_rgba(15,27,46,0.08),0_0_0_3px_rgba(200,155,60,0.1)]"
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex pointer-events-none transition-colors duration-250 ease text-[#667085] peer-focus:text-[#C89B3C]">
            <Search size={18} strokeWidth={2} />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <SelectionCard
            title="Select from Existing"
            icon={Building2}
            selected={buildingSelection === 'existing'}
            onClick={() => onUpdate({ buildingSelection: 'existing' })}
          />

          <SelectionCard
            title="Add New Building"
            icon={Building2}
            isAdd={true}
            selected={buildingSelection === 'new'}
            onClick={() => onUpdate({ buildingSelection: 'new' })}
          />
        </div>

        {state.errors.buildingSelection && (
          <div className="py-2.5 px-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded text-[#EF4444] text-[0.8rem] font-medium">
            {state.errors.buildingSelection}
          </div>
        )}

      </div>
    </FormPage>
  )
}