const spacing = {
  '3xs': 2,
  '2xs': 4,
  'xs': 6,
  
  'sm': 8,
  'md': 12,
  
  'lg': 16,
  'xl': 24,
  
  
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const


export const space = (size: keyof typeof spacing): string => `${spacing[size]}px`

export default spacing