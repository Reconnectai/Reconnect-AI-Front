import React, { FC, useState } from 'react'
import { CharacterSettings } from 'services/characters/types'

import { Drawer, useTheme } from '@mui/material'

import CharacterSettingPage from '../CharacterSettings'

interface IProps {
  currentCharacter?: CharacterSettings
  openEditCharacterDrawer: boolean
  setOpenEditCharacterDrawer: React.Dispatch<React.SetStateAction<boolean>>
  setGoToEnd?: React.Dispatch<React.SetStateAction<boolean>>
}

const EditCharacterDrawer: FC<IProps> = ({
  openEditCharacterDrawer,
  setOpenEditCharacterDrawer,
  currentCharacter,
  setGoToEnd,
}) => {
  const [isFullOpen, setIsFullOpen] = useState<boolean>(false)
  const handleClose = () => {
    setOpenEditCharacterDrawer(false)
    setIsFullOpen(false)
  }
  const theme = useTheme()
  return (
    <Drawer
      open={openEditCharacterDrawer}
      onTransitionEnd={() => setIsFullOpen(true)}
      onClose={handleClose}
      anchor={'right'}
      sx={{
        '.MuiDrawer-paper': {
          maxWidth: { xs: '100vw !important', md: '50vw !important' },
          width: '100%',
          backgroundColor: theme.palette.background.default,
          backgroundImage: 'none',
        },
      }}
    >
      <CharacterSettingPage
        currentCharacter={currentCharacter}
        setOpenCharacterSettingsDrawer={handleClose}
        isFullOpen={isFullOpen}
        setGoToEnd={setGoToEnd}
      />
    </Drawer>
  )
}

export default EditCharacterDrawer
