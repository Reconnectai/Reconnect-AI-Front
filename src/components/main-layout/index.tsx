import { useMediaSize } from 'hooks/useDeviceDetector'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material'

import ChatsList from 'components/common/ChatsList'

import { useThemeContext } from '../../theme/themeContext'

const MainLayout = () => {
  const { isPhone } = useMediaSize()
  const { isLoadedTheme } = useThemeContext()
  if (isLoadedTheme) {
    return null
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', maxHeight: '100vh' }}>
      {!isPhone && <ChatsList />}
      <Box sx={{ width: '100%', minHeight: '100%' }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default MainLayout
