import { useMediaSize } from 'hooks/useDeviceDetector'
import React from 'react'

import { Box, useTheme } from '@mui/material'

import ChatsList from 'components/common/ChatsList'

import Chats from '../chats'

const MainPage = () => {
  const theme = useTheme()
  const { isPhone } = useMediaSize()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.palette.background.default,
        height: '100%',
      }}
    >
      {isPhone && <ChatsList />}
      {!isPhone && <Chats />}
    </Box>
  )
}

export default MainPage
