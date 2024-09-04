import EmptyAvatar from 'assets/testAvatar/emptyAvatar.png'
import React, { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Character } from 'services/characters/types'
import { AppDispatch } from 'store'
import { setCharacterListQuery } from 'store/reducers/characterListReducer'

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Tooltip, Typography, useTheme } from '@mui/material'

interface IProps {
  chat: Character
  setSelectedChat: React.Dispatch<React.SetStateAction<number | null>>
  selectedChat: number | null
  chatId?: string
}

const CharacterItem: FC<IProps> = ({ chat, setSelectedChat, selectedChat, chatId }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  return (
    <Box
      onClick={() => {
        navigate(`/chat/${chat?.id}`, { replace: !!chatId })
        setSelectedChat(chat?.id)
        dispatch(setCharacterListQuery(true))
      }}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        p: '20px 10px',
        gap: '20px',
        cursor: 'pointer',
        backgroundColor: selectedChat === chat?.id ? theme.palette.background.paper : '',
        '&:hover': { backgroundColor: theme.palette.background.paper },
      }}
    >
      <Box
        component="img"
        src={chat?.image || EmptyAvatar}
        alt="avatar"
        width={45}
        height={45}
        sx={{ borderRadius: '50%', objectFit: 'cover' }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '20px',
            textAlign: 'left',
            color: theme.palette.text.primary,
          }}
        >
          {chat?.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {chat?.error && (
            <Tooltip
              title="Some error occured"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: theme.palette.background.default,
                    fontSize: '14px',
                  },
                },
              }}
            >
              <ErrorOutlineIcon sx={{ color: 'orange', cursor: 'pointer' }} />
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default CharacterItem
