import React, { FC, useState } from 'react'

import { Drawer, useTheme } from '@mui/material'

import CharacterSettingPage from '../CharacterSettings'

interface IProps {
  openCreateCharacterDrawer: boolean
  setOpenCreateCharacterDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCharacterDrawer: FC<IProps> = ({
  openCreateCharacterDrawer,
  setOpenCreateCharacterDrawer,
}) => {
  const [isFullOpen, setIsFullOpen] = useState<boolean>(false)
  const theme = useTheme()
  const handleClose = () => {
    setOpenCreateCharacterDrawer(false)
    setIsFullOpen(false)
  }
  return (
    <Drawer
      open={openCreateCharacterDrawer}
      onTransitionEnd={() => setIsFullOpen(true)}
      onClose={handleClose}
      anchor={'right'}
      sx={{
        '.MuiDrawer-paper': {
          maxWidth: { xs: '100vw !important', md: '50vw !important' },
          width: '100%',
          backgroundColor: theme.palette.background.default,
          backgroundImage:'none'
        },
      }}
    >
      <CharacterSettingPage setOpenCharacterSettingsDrawer={handleClose} isFullOpen={isFullOpen} />
    </Drawer>
  )
}

export default CreateCharacterDrawer
