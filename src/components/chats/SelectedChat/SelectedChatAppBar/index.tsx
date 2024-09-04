import EmptyAvatar from 'assets/testAvatar/emptyAvatar.png'
import React, {FC, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { CharacterSettings } from 'services/characters/types'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SettingsIcon from '@mui/icons-material/Settings'
import { Box, IconButton, Skeleton, Typography, useTheme } from '@mui/material'
import {preloadImages} from "utils/preloadingImages";

interface IProps {
  children: React.ReactNode
  character?: CharacterSettings
  isLoadingCharacter: boolean
  setOpenEditCharacterDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectedChatAppBar: FC<IProps> = ({
  character,
  isLoadingCharacter,
  children,
  setOpenEditCharacterDrawer,
}) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [shouldRenderAvatar, setShouldRenderAvatar] = useState(false)
  useEffect(() => {
    (async () => {
      if (character?.image) {
        await preloadImages([character.image])
        setShouldRenderAvatar(true)
      }
    })()})
  return (
    <Box
      sx={{
        p: '0px 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '30px',
        height: '80px',
        boxSizing: 'border-box',
        borderBottom: '1px solid #858282',
        zIndex: 1,
        boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1, minWidth: 0 }}>
        <IconButton
          edge="end"
          size="large"
          color="secondary"
          aria-label="menu"
          onClick={() => navigate(-1)}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          <ArrowBackIcon sx={{ width: '30px', height: '30px' }} />
        </IconButton>
        {!shouldRenderAvatar ? (
          <Skeleton animation="pulse" variant="circular" width={65} height={65} />
        ) : (
          <Box
            component="img"
            src={character?.image || EmptyAvatar}
            alt="avatar"
            width={65}
            height={65}
            onClick={() => setOpenEditCharacterDrawer(true)}
            sx={{ cursor: 'pointer', borderRadius: '50%', objectFit: 'cover' }}
          />
        )}
        {isLoadingCharacter ? (
          <Skeleton animation="wave" height={10} width="150px" style={{ marginBottom: 6 }} />
        ) : (
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: '20px',
              textAlign: 'left',
              color: theme.palette.text.primary,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flex: 1,
              minWidth: 0,
            }}
          >
            {character?.name || ''}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {children}
        <Box>
          <IconButton
            edge="end"
            size="small"
            color="secondary"
            aria-label="SettingsIcon"
            onClick={() => setOpenEditCharacterDrawer(true)}
          >
            <SettingsIcon sx={{ width: '30px', height: '30px' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default SelectedChatAppBar
