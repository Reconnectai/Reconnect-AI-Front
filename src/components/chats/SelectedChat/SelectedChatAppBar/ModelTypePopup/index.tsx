import React, { FC } from 'react'
import { CharacterSettings } from 'services/characters/types'

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import VoiceChatIcon from '@mui/icons-material/VoiceChat'
import VoiceChatOutlinedIcon from '@mui/icons-material/VoiceChatOutlined'
import { Box, IconButton, Menu, Typography, useTheme } from '@mui/material'

interface IProps {
  chatType: 'TEXT' | 'VOICE' | 'VIDEO'
  setChatType: React.Dispatch<React.SetStateAction<'TEXT' | 'VOICE' | 'VIDEO'>>
  character?: CharacterSettings
}

const ModelTypePopup: FC<IProps> = ({ chatType, setChatType, character }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const theme = useTheme()
  return (
    <Box>
      <IconButton
        edge="end"
        size="small"
        color="secondary"
        aria-label="SettingsIcon"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {chatType === 'TEXT' && <ChatOutlinedIcon sx={{ width: '30px', height: '30px' }} />}
        {chatType === 'VOICE' && <VoiceChatIcon sx={{ width: '30px', height: '30px' }} />}
        {chatType === 'VIDEO' && <VoiceChatOutlinedIcon sx={{ width: '30px', height: '30px' }} />}
      </IconButton>
      <Menu
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiPaper-root': { mt: '0px', background: theme.palette.background.paper },
          '& .MuiList-root': {
            padding: 0,
          },
        }}
      >
        <Box
          onClick={() => setAnchorEl(null)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            boxSizing: 'border-box',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
              p: '5px 10px',
              '&:hover': {
                background: 'rgba(155,145,145,0.2)',
              },
            }}
            onClick={() => {
              setChatType('TEXT')
            }}
          >
            <ChatOutlinedIcon sx={{ width: '30px', height: '30px' }} />
            <Typography>Text chat</Typography>
          </Box>

          {character?.speechChatType && (
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                cursor: 'pointer',
                width: '100%',
                p: '5px 10px',
                '&:hover': {
                  background: 'rgba(155,145,145,0.2)',
                },
              }}
              onClick={() => {
                setChatType('VOICE')
              }}
            >
              <VoiceChatIcon sx={{ width: '30px', height: '30px' }} />
              <Typography>Voice chat</Typography>
            </Box>
          )}

          {character?.videoChatType && (
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                cursor: 'pointer',
                width: '100%',
                p: '5px 10px',
                '&:hover': {
                  background: 'rgba(155,145,145,0.2)',
                },
              }}
              onClick={() => {
                setChatType('VIDEO')
              }}
            >
              <VoiceChatOutlinedIcon sx={{ width: '30px', height: '30px' }} />
              <Typography>Video chat</Typography>
            </Box>
          )}
        </Box>
      </Menu>
    </Box>
  )
}

export default ModelTypePopup
