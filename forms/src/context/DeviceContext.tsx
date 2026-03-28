import React, { useState, useEffect, useContext, createContext, useCallback } from 'react'

export type Device = 'desktop' | 'tablet' | 'mobile'

export type DeviceContextValue = {
  device: Device
  setDevice: (d: Device) => void
}

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined)

// Industry-standard breakpoints for crisp responsive handoffs
const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
}

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [device, setDevice] = useState<Device>('desktop')

  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return

    const width = window.innerWidth
    if (width < BREAKPOINTS.mobile) {
      setDevice((prev) => (prev !== 'mobile' ? 'mobile' : prev))
    } else if (width < BREAKPOINTS.tablet) {
      setDevice((prev) => (prev !== 'tablet' ? 'tablet' : prev))
    } else {
      setDevice((prev) => (prev !== 'desktop' ? 'desktop' : prev))
    }
  }, [])

  useEffect(() => {
    // Run once on mount to establish the initial correct state
    handleResize()

    // Listen for window resize events
    window.addEventListener('resize', handleResize)
    
    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  return (
    <DeviceContext.Provider value={{ device, setDevice }}>
      {children}
    </DeviceContext.Provider>
  )
}

export function useDevice() {
  const ctx = useContext(DeviceContext)
  if (!ctx) {
    throw new Error('useDevice must be used within a DeviceProvider')
  }
  return ctx
}