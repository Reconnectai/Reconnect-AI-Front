import pen from 'assets/pen.gif'
import rec from 'assets/rec.gif'
import EmptyAvatar from 'assets/testAvatar/emptyAvatar.png'
import React, { FC } from 'react'
import { CharacterSettings } from 'services/characters/types'

import { Box, Typography, useTheme } from '@mui/material'

interface IProps {
  character?: CharacterSettings
  setOpenEditCharacterDrawer: React.Dispatch<React.SetStateAction<boolean>>
  message: any
}

const RenderingMessageGeneration: FC<IProps> = ({
  character,
  message,
  setOpenEditCharacterDrawer,
}) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          mr: '15px',
          alignSelf: 'end',
          cursor: 'pointer',
          borderRadius: '50%',
          objectFit: 'cover',
        }}
        component="img"
        src={character?.image || EmptyAvatar}
        alt="avatar"
        width={35}
        height={35}
        onClick={() => setOpenEditCharacterDrawer(true)}
      />

      <Box
        sx={{
          mr: '15px',
          objectFit: 'cover',
          alignSelf: 'end',
          marginRight: '20px',
        }}
        component="img"
        src={message?.messageType === 'text' ? pen : rec}
        alt="avatar"
        width={35}
        height={35}
      />
      <Typography
        sx={{
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '20px',
          textAlign: 'left',
          color: theme.palette.text.disabled,
        }}
      >
        <>
          {character?.name}
          {message?.messageType === 'text' ? ' is writing...' : ' is recording...'}
        </>
      </Typography>
    </Box>
  )
}

export default RenderingMessageGeneration
