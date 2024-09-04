import * as React from 'react'
import { FC } from 'react'

import { Box, CircularProgress, Typography, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'

interface IProps {
  confirmTitle: string
}

const CreatingCharacterLoader: FC<IProps> = ({ confirmTitle }) => {
  const theme = useTheme()
  return (
    <Dialog
      open={!!confirmTitle}
      onClose={() => {}}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        },
      }}
      PaperProps={{
        sx: {
          maxWidth: { xs: '324px', sm: '412px' },
          p: {xs:'12px', sm:'24px'},
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
          boxShadow: '0 0 3px 1px grey',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: {xs:'16px', sm:'20px'},
            fontWeight: 500,
            lineHeight: '30px',
            textAlign: 'center',
            color: theme.palette.text.primary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {confirmTitle}
        </Typography>
        <CircularProgress sx={{ alignSelf: 'center' }} />
      </Box>
    </Dialog>
  )
}

export default CreatingCharacterLoader
