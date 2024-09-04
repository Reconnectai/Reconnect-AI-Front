import React, { FC } from 'react'

import AddIcon from '@mui/icons-material/Add'
import { Box, IconButton, Typography, useTheme } from '@mui/material'

interface IProps {
  setOpenCreateCharacterDrawer: React.Dispatch<React.SetStateAction<boolean>>
  messagesStartRef: any
}

const AddCharacter: FC<IProps> = ({ setOpenCreateCharacterDrawer, messagesStartRef }) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        p: '20px 10px',
        gap: '20px',
        cursor: 'pointer',
        '&:hover': { backgroundColor: theme.palette.background.paper },
      }}
      onClick={() => {
        setOpenCreateCharacterDrawer(true)
      }}
      ref={messagesStartRef}
    >
      <IconButton
        edge="end"
        size="large"
        color="secondary"
        aria-label="menu"
        sx={{ borderRadius: '50%', border: `1px solid ${theme.palette.text.primary}` }}
      >
        <AddIcon sx={{ width: '20px', height: '20px' }} />
      </IconButton>
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: '20px',
          textAlign: 'left',
          color: theme.palette.text.primary,
        }}
      >
        Add character
      </Typography>
    </Box>
  )
}

export default AddCharacter
