import React, { useState } from 'react'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { Box, IconButton, } from '@mui/material'

import { useThemeContext } from 'theme/themeContext'

const SwitchTheme = () => {
  const { toggleTheme } = useThemeContext()
  const [colorMode, setColorMode] = useState<string>(localStorage.getItem('themeMode')==='light' ? 'light' : 'dark')
  return (
    <Box>
      {colorMode === 'dark' ? (
        <IconButton
          edge="end"
          size="small"
          color="secondary"
          aria-label="SettingsIcon"
          onClick={() => {
            toggleTheme()
            setColorMode('light')
          }}
        >
          <DarkModeIcon sx={{ width: '35px', height: '35px' }} />
        </IconButton>
      ) : (
        <IconButton
          edge="end"
          size="small"
          color="secondary"
          aria-label="SettingsIcon"
          onClick={() => {
            toggleTheme()
            setColorMode('dark')
          }}
        >
          <LightModeIcon sx={{ width: '35px', height: '35px' }} />
        </IconButton>
      )}
    </Box>
  )
}

export default SwitchTheme
