import * as React from 'react'
import { FC } from 'react'
import { CharacterSettings } from 'services/characters/types'

import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import Dialog, { DialogProps } from '@mui/material/Dialog'

import { CustomButton } from '../Button'

interface IProps extends DialogProps {
  setDeleteCharacterModal: React.Dispatch<React.SetStateAction<boolean>>
  currentCharacter: CharacterSettings
  confirmTitle: string
  open: boolean
}

const ConfirmDeleteModal: FC<IProps> = ({
  open,
  setDeleteCharacterModal,
  currentCharacter,
  confirmTitle,
}) => {
  const theme = useTheme()
  const handleDelete = () => {
    console.log(currentCharacter.id + 'deleted')
    setDeleteCharacterModal(false)
  }
  return (
    <Dialog
      open={open}
      onClose={() => {
        setDeleteCharacterModal(false)
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
          border: '1px solid white',
        },
      }}
    >
      <IconButton
        edge="end"
        size="large"
        color="secondary"
        aria-label="close"
        onClick={() => {
          setDeleteCharacterModal(false)
        }}
        sx={{ alignSelf: 'end', width: '18px', height: '18px' }}
      >
        <CloseIcon sx={{ width: '18px', height: '18px' }} />
      </IconButton>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '20px',
            textAlign: 'center',
            color: theme.palette.text.primary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {confirmTitle}
        </Typography>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
          <CustomButton
            sx={{ px: '40px' }}
            type="submit"
            onClick={() => setDeleteCharacterModal(false)}
          >
            Cancel
          </CustomButton>
          <CustomButton
            sx={{ px: '40px', backgroundColor: '#e14848' }}
            color="warning"
            type="button"
            onClick={() => handleDelete()}
          >
            Delete
          </CustomButton>
        </Box>
      </Box>
    </Dialog>
  )
}

export default ConfirmDeleteModal
