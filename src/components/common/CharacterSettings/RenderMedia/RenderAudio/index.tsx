import React, { FC } from 'react'
import { CharacterSettings } from 'services/characters/types'

import GraphicEqIcon from '@mui/icons-material/GraphicEq'
import { Box, IconButton, Typography, useTheme } from '@mui/material'

import AudioPlayer from 'components/common/VoicePlay'

interface IProps {
  fileRef: any
  url: string | null
  errors?: any
  currentCharacter?: CharacterSettings
}

const RenderAudio: FC<IProps> = ({ errors, fileRef, url, currentCharacter }) => {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px', minWidth: 0 }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {url ? (
            <AudioPlayer msgBackgroundColor={theme.palette.background.default} src={url} />
          ) : (
            <IconButton
              edge="end"
              size="large"
              color="secondary"
              aria-label="menu"
              sx={{
                borderRadius: '16px',
                border: `2px solid ${theme.palette.text.primary}`,
              }}
              onClick={() => {
                fileRef?.current?.click()
              }}
            >
              <GraphicEqIcon sx={{ width: '40px', height: '40px' }} />
            </IconButton>
          )}
        </Box>
        <Typography
          component="label"
          htmlFor="voiceExampleInput"
          sx={{
            fontSize: '18px',
            fontWeight: 800,
            lineHeight: '20px',
            textAlign: 'center',
            color: theme.palette.text.primary,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {currentCharacter?.audio ? 'Edit voice' : 'Add voice'}
        </Typography>
      </Box>
      <Box>
        {errors?.audio && (
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: 1.66,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#FC395C',
              mt: '3px',
            }}
          >
            {errors?.audio?.message && typeof errors.audio.message === 'string'
              ? errors.audio.message
              : ''}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default RenderAudio
