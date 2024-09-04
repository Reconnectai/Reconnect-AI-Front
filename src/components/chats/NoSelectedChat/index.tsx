import React from 'react'

import { Box, Typography, useTheme } from '@mui/material'

const NoSelectedChat = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        minHeight: '100%',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          theme.palette.mode === 'light'
            ? 'rgba(187,199,181,0.32)'
            : theme.palette.background.default,
      }}
    >
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 800,
          lineHeight: '20px',
          textAlign: 'center',
          color: theme.palette.text.primary,
          p: '10px',
          borderRadius: '24px',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        Choose a chat room to start chatting
      </Typography>
    </Box>
  )
}

export default NoSelectedChat
