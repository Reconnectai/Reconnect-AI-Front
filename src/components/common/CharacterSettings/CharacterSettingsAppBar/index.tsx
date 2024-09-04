import React, { FC } from 'react'
import { CharacterSettings } from 'services/characters/types'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton, Typography, useTheme } from '@mui/material'

interface IProps {
  setOpenCharacterSettingsDrawer: React.Dispatch<React.SetStateAction<boolean>>
  currentCharacter?: CharacterSettings
  isFullOpen?: boolean
}

const CharacterSettingsAppBar: FC<IProps> = ({
  setOpenCharacterSettingsDrawer,
  currentCharacter,
  isFullOpen,
}) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        p: '00px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '30px',
        height: '80px',
        width: '100%',
        boxSizing: 'border-box',
        borderBottom: '1px solid #858282',
      }}
    >
      <IconButton
        edge="end"
        size="large"
        color="secondary"
        aria-label="menu"
        onClick={() => setOpenCharacterSettingsDrawer(false)}
        sx={{ display: 'block' }}
      >
        <ArrowBackIcon
          sx={{
            width: '30px',
            height: '30px',
            transform: isFullOpen ? 'scaleX(-1)' : 'scaleX(1)',
          }}
        />
      </IconButton>
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 600,
          lineHeight: '20px',
          textAlign: 'center',
          color: theme.palette.text.primary,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {currentCharacter ? 'Edit character' : 'Create Character'}
      </Typography>
      <Box></Box>
    </Box>
  )
}

export default CharacterSettingsAppBar
