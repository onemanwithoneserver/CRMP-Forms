import React, { useState, useRef, useEffect } from 'react'
import {
  MapPin,
  Navigation,
  ChevronDown,
  Search,
  Globe,
  X,
  Compass,
  Check,
  Plus
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
const ZONES = ['East Zone', 'West Zone', 'North Zone', 'South Zone']
const CIRCLES = ['Circle 1', 'Circle 2', 'Circle 3', 'Circle 4', 'Circle 5']
const ORR_ZONING = ['ORR - Inner', 'ORR - Outer', 'ORR - On Ring Road', 'Beyond ORR']

interface LocationProps {
  sectionRef: React.RefObject<HTMLDivElement | null>
}

export default function Location({ sectionRef }: LocationProps) {
  const { state, dispatch } = useForm()
  const fd = state.formData

  const update = (payload: Record<string, string>) => {
    dispatch({ type: 'updateData', payload })
  }

  return (
    <div ref={sectionRef} className="px-2 md:px-3 mt-3 md:mt-4 max-w-6xl mx-auto w-full">
      <div className="bg-white rounded-[7px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#E2E8F0] overflow-hidden">

        <div className="bg-gradient-to-r from-[#F8FAFC] to-white border-b border-[#F1F5F9] px-3 py-2.5 md:px-4 md:py-3 flex items-center gap-2 md:gap-2.5">
          <div className="w-6 h-6 md:w-7 md:h-7 rounded-[7px] bg-white flex items-center justify-center border border-[#E2E8F0] shadow-sm">
            <Compass size={15} className="text-[#475569]" />
          </div>
          <div>
            <h2 className="text-[14px] font-semibold text-[#0F172A] font-['Outfit'] leading-tight">
              Estate Positioning
            </h2>
          </div>
        </div>

        <div className="p-3 md:p-4 space-y-3 md:space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 items-start">
            <div className="flex flex-col gap-2">
              <label className="text-[12px] font-medium text-[#475569] pl-0.5 font-['Outfit']">
                Select location from maps
              </label>
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-[7px] border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[12px] md:text-[13px] font-medium text-[#334155] font-['Outfit'] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors duration-200"
                >
                  <Globe size={15} className="text-[#3B82F6]" />
                  Open Google Maps
                </button>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-2.5 py-1.5 md:px-3 md:py-2 rounded-[7px] border border-[#E2E8F0] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-[12px] md:text-[13px] font-medium text-[#334155] font-['Outfit'] hover:bg-[#F8FAFC] hover:border-[#CBD5E1] transition-colors duration-200"
                >
                  <Navigation size={15} className="text-[#10B981]" />
                  Draw Polygon
                </button>
              </div>
            </div>

            <Dropdown
              label="Country"
              value={fd.country}
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
              placeholder="e.g. Nanakramguda"
              onChange={val => update({ city: val })}
            />
          </div>

          <div className="h-[1px] w-full bg-[#F1F5F9]"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
            <TextField
              label="District"
              value={fd.district}
              placeholder="Enter district"
              onChange={val => update({ district: val })}
            />
            <Dropdown
              label="Circle"
              value={fd.circle}
              options={CIRCLES}
              placeholder="Select Circle"
              onChange={val => update({ circle: val })}
            />
            <Dropdown
              label="Zone"
              value={fd.zone}
              options={ZONES}
              placeholder="Select zone"
              onChange={val => update({ zone: val })}
            />
            <TextField
              label="Location"
              value={fd.location}
              placeholder="e.g. Honeywell Driveway"
              onChange={val => update({ location: val })}
            />
            <TextField
              label="Micro location"
              value={fd.microLocation}
              placeholder="e.g. Financial District"
              onChange={val => update({ microLocation: val })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex flex-col gap-2 md:gap-2.5">
              <Dropdown
                label="ORR Zoning"
                value={fd.orrZoning}
                options={ORR_ZONING}
                placeholder="Select ORR zoning"
                onChange={val => update({ orrZoning: val })}
              />
              <button
                type="button"
                className="flex items-center justify-center gap-1.5 w-max px-3 py-1.5 rounded-[7px] bg-[#2563EB] text-white text-[12px] font-medium font-['Outfit'] hover:bg-[#1D4ED8] shadow-[0_1px_2px_rgba(37,99,235,0.2)] transition-colors duration-200"
              >
                <Plus size={14} />
                Add ORR Zoning
              </button>
            </div>

            <TextField
              label="Google location"
              value={fd.googleLocation}
              placeholder="Auto-populated via maps"
              readOnly
              onChange={() => { }}
            />
            <TextField
              label="Latitude"
              value={fd.latitude}
              placeholder="e.g. 17.41898801530468"
              onChange={val => update({ latitude: val })}
            />
            <TextField
              label="Longitude"
              value={fd.longitude}
              placeholder="e.g. 78.34377678293833"
              onChange={val => update({ longitude: val })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
            <TextField
              label="Pincode"
              value={fd.pincode}
              placeholder="e.g. 500032"
              onChange={val => update({ pincode: val })}
            />
          </div>

        </div>
      </div>
    </div>
  )
}