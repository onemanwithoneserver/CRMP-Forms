import React, { useState } from 'react'
import {
  MapPin,
  Navigation,
  Compass,
  Plus,
  Globe,
} from 'lucide-react'
import { useForm } from '../../../context/FormContext'
import { Dropdown } from '../../../components/inputs/Dropdown'
import { TextFieldModern as TextField } from '../../../components/inputs/TextFieldModern'

const COUNTRIES = ['India']
const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry',
]
const ZONES = ['East Zone', 'West Zone', 'North Zone', 'South Zone', 'Central Zone']
const CORPORATIONS = [
  'GHMC', 'HMDA', 'HUDA', 'BMC', 'BBMP', 'MCGM', 'MCD', 'NDMC',
  'AMC', 'KMC', 'PMC', 'CMC', 'NMMC', 'TMC',
]
const CIRCLES = ['Circle 1', 'Circle 2', 'Circle 3', 'Circle 4', 'Circle 5', 'Circle 6']
const ORR_ZONING_OPTIONS = ['ORR – Inner', 'ORR – Outer', 'ORR – On Ring Road', 'Beyond ORR']
const BUILDING_TYPES = [
  'Commercial Office', 'IT Park', 'Business Park', 'Retail Complex',
  'Mall', 'Mixed Use', 'Industrial', 'Warehouse', 'Residential Complex',
  'Standalone Building', 'SEZ',
]

interface LocationProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

export default function Location({ sectionRef }: LocationProps) {
  const { state, dispatch } = useForm()
  const fd = state.formData
  const [orrZoningList, setOrrZoningList] = useState<string[]>(ORR_ZONING_OPTIONS)

  const update = (payload: Record<string, string>) =>
    dispatch({ type: 'updateData', payload })

  const handleAddOrrZoning = () => {
    const name = window.prompt('Enter new ORR Zoning label:')
    if (name && name.trim()) {
      const trimmed = name.trim()
      if (!orrZoningList.includes(trimmed)) {
        setOrrZoningList(prev => [...prev, trimmed])
      }
      update({ orrZoning: trimmed })
    }
  }

  return (
    <div ref={sectionRef} className="px-2 md:px-3 mt-3 md:mt-4 max-w-6xl mx-auto w-full">
      <div className="bg-white rounded-[7px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#F8FAFC] to-white border-b border-[#F1F5F9] px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2 md:gap-2.5">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-[7px] bg-white flex items-center justify-center border border-[#E2E8F0] shadow-sm">
            <Compass size={15} className="text-[#475569]" />
          </div>
          <h2 className="text-[14px] font-semibold text-[#0F172A] font-['Outfit'] leading-tight">
            Estate Positioning
          </h2>
        </div>

        <div className="p-3 md:p-4 space-y-3 md:space-y-4">

          {/* Row 1 – Country / State / City / District */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            <Dropdown
              label="Country"
              value={fd.country || 'India'}
              options={COUNTRIES}
              placeholder="Select country"
              onChange={val => update({ country: val })}
            />
            <Dropdown
              label="State"
              value={fd.state}
              options={STATES}
              placeholder="Select state"
              searchable
              onChange={val => update({ state: val })}
            />
            <TextField
              label="City"
              value={fd.city}
              placeholder="e.g. Hyderabad"
              onChange={val => update({ city: val })}
            />
            <TextField
              label="District"
              value={fd.district}
              placeholder="e.g. Rangareddy"
              onChange={val => update({ district: val })}
            />
          </div>

          <div className="h-px w-full bg-[#F1F5F9]" />

          {/* Row 2 – Location / Micro Location / Zone / Corporation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            <TextField
              label="Location / Road"
              value={fd.location}
              placeholder="e.g. Honeywell Driveway"
              onChange={val => update({ location: val })}
            />
            <TextField
              label="Micro Location"
              value={fd.microLocation}
              placeholder="e.g. Financial District"
              onChange={val => update({ microLocation: val })}
            />
            <Dropdown
              label="Zone"
              value={fd.zone}
              options={ZONES}
              placeholder="Select zone"
              onChange={val => update({ zone: val })}
            />
            <Dropdown
              label="Corporation"
              value={fd.corporation}
              options={CORPORATIONS}
              placeholder="Select corporation"
              searchable
              onChange={val => update({ corporation: val })}
            />
          </div>

          <div className="h-px w-full bg-[#F1F5F9]" />

          {/* Row 3 – Circle / ORR Zoning / Add ORR Zoning / Pincode */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3 items-end">
            <Dropdown
              label="Circle"
              value={fd.circle}
              options={CIRCLES}
              placeholder="Select circle"
              onChange={val => update({ circle: val })}
            />
            <Dropdown
              label="ORR Zoning"
              value={fd.orrZoning}
              options={orrZoningList}
              placeholder="Select ORR zoning"
              onChange={val => update({ orrZoning: val })}
            />
            {/* Add ORR Zoning — inline action column */}
            <div className="flex flex-col gap-1 w-full">
              <label className="text-[12px] font-medium text-[#475569] pl-0.5 font-['Outfit'] invisible select-none">
                &nbsp;
              </label>
              <button
                type="button"
                onClick={handleAddOrrZoning}
                className="h-[34px] w-full flex items-center justify-center gap-1.5 px-3 rounded-[6px] border border-dashed border-[#94A3B8] bg-[#F8FAFC] text-[12px] font-semibold font-['Outfit'] text-[#475569] hover:border-[#C89B3C] hover:text-[#C89B3C] hover:bg-[#FFFBF0] transition-all duration-200"
              >
                <Plus size={13} />
                Add ORR Zoning
              </button>
            </div>
            <TextField
              label="Pincode"
              value={fd.pincode}
              placeholder="e.g. 500032"
              onChange={val => update({ pincode: val.replace(/\D/g, '').slice(0, 6) })}
            />
          </div>

          <div className="h-px w-full bg-[#F1F5F9]" />

          {/* Row 4 – Google Location / Latitude / Longitude / Building Type */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            <TextField
              label="Google Location"
              value={fd.googleLocation}
              placeholder="Auto-populated via map"
              readOnly
              onChange={() => {}}
            />
            <TextField
              label="Latitude"
              value={fd.latitude}
              placeholder="e.g. 17.41898"
              readOnly
              onChange={() => {}}
            />
            <TextField
              label="Longitude"
              value={fd.longitude}
              placeholder="e.g. 78.34377"
              readOnly
              onChange={() => {}}
            />
            <Dropdown
              label="Building Type"
              value={fd.buildingType}
              options={BUILDING_TYPES}
              placeholder="Select building type"
              onChange={val => update({ buildingType: val })}
            />
          </div>

          <div className="h-px w-full bg-[#F1F5F9]" />

          {/* Row 5 – Map trigger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[7px] border border-[#E2E8F0] bg-white text-[13px] font-semibold font-['Outfit'] text-[#334155] hover:bg-[#F0F9FF] hover:border-[#93C5FD] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200"
            >
              <Globe size={15} className="text-[#3B82F6]" />
              Select Location on Map
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-[7px] border border-[#E2E8F0] bg-white text-[13px] font-semibold font-['Outfit'] text-[#334155] hover:bg-[#F0FDF4] hover:border-[#86EFAC] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200"
            >
              <Navigation size={15} className="text-[#10B981]" />
              Draw Polygon on Map
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}