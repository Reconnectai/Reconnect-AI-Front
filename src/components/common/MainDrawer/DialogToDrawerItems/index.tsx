import React, { FC, ReactNode } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import Dialog from '@mui/material/Dialog'

interface IProps {
  title: string
  setCheckedItem: React.Dispatch<React.SetStateAction<string>>
  children: ReactNode
}

const DialogToDrawerItems: FC<IProps> = ({ title, setCheckedItem, children }) => {
  const theme = useTheme()
  return (
    <Dialog
      open={!!title}
      onClose={() => {
        setCheckedItem('')
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        },
      }}
      PaperProps={{
        sx: {
          width: { xs: '324px', sm: '412px' },
          borderRadius: '16px',
          p: '24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.default,
          boxShadow: `0 0 2px 3px ${theme.palette.background.paper}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: '50px', flexDirection: 'column', minHeight: '600px' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
          }}
        >
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
            {title}
          </Typography>
          <IconButton
            edge="end"
            size="large"
            color="secondary"
            aria-label="close"
            onClick={() => {
              setCheckedItem('')
            }}
            sx={{ alignSelf: 'end', width: '28px', height: '28px' }}
          >
            <CloseIcon sx={{ width: '28px', height: '28px' }} />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Dialog>
  )
}

export default DialogToDrawerItems
