import React, { FC } from 'react'

import { Box, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'

interface IProps {
  setShowImg: React.Dispatch<React.SetStateAction<boolean>>
  url: string
}

const AvatarZoomDialog: FC<IProps> = ({ setShowImg, url }) => {
  const theme = useTheme()
  const open = true
  return (
    <Dialog
      open={open}
      onClose={() => {
        setShowImg(false)
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: '324px', sm: '412px' },
          borderRadius: '16px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default,
          border: '1px solid white',
        },
      }}
    >
      <Box
        component="img"
        src={url}
        alt="avatar"
        sx={{
          objectFit: 'cover',
          height: 'auto',
          maxWidth: { xs: '324px', sm: '412px' },
          width: '100%',
        }}
      />
    </Dialog>
  )
}

export default AvatarZoomDialog
