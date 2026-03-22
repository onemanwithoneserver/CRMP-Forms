import React from 'react'

type Device = 'desktop' | 'tablet' | 'mobile'

type DeviceContextValue = {
  device: Device
  setDevice: (d: Device) => void
}

const DeviceContext = React.createContext<DeviceContextValue | undefined>(undefined)

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [device, setDevice] = React.useState<Device>('desktop')
  return <DeviceContext.Provider value={{ device, setDevice }}>{children}</DeviceContext.Provider>
}

export function useDevice() {
  const ctx = React.useContext(DeviceContext)
  if (!ctx) throw new Error('useDevice must be used within DeviceProvider')
  return ctx
}

export type { Device }
