import { useMemo } from 'react'

import { Theme, useMediaQuery } from '@mui/material'

interface MediaSize {
  buttonSize: 'small' | 'medium' | 'large'
  inputSize: 'small' | 'medium'
  isTablet: boolean
  isPhone: boolean
  isMobileDevice: boolean
  isDesktop: boolean
}

export const useMediaSize = () => {
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'))
  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.only('sm'))
  const isPhone = useMediaQuery<Theme>((theme) => theme.breakpoints.only('xs'))
  const inputSize = isPhone ? 'small' : 'medium'
  const buttonSize = isTablet ? 'large' : inputSize
  const isMobileDevice = isTablet || isPhone

  return useMemo(
    (): MediaSize => ({
      buttonSize,
      inputSize,
      isTablet,
      isPhone,
      isMobileDevice,
      isDesktop,
    }),
    [buttonSize, inputSize, isTablet, isPhone, isMobileDevice, isDesktop]
  )
}
