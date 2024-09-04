import React from 'react'
import { useParams } from 'react-router-dom'

import { Box, useTheme } from '@mui/material'

import NoSelectedChat from 'components/chats/NoSelectedChat'
import SelectedChat from 'components/chats/SelectedChat'

const ChatPage = () => {
  const { chatId } = useParams()
  const theme = useTheme()
  return (
    <Box
      sx={{
        height: '100vh',
        overflowY: 'hidden',
        flex: 6,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {chatId ? <SelectedChat key={chatId} chatId={chatId} /> : <NoSelectedChat />}
    </Box>
  )
}

export default ChatPage
