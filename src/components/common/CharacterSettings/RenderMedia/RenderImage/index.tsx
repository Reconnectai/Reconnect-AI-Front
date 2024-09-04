import React, { FC } from 'react'
import { CharacterSettings } from 'services/characters/types'

import AddIcon from '@mui/icons-material/Add'
import { Box, IconButton, Typography, useTheme } from '@mui/material'

interface IProps {
  url: string | null
  errors?: any
  currentCharacter?: CharacterSettings
  setShowImg: React.Dispatch<React.SetStateAction<boolean>>
  fileRef: any
}

const RenderImage: FC<IProps> = ({ errors, url, currentCharacter, setShowImg, fileRef }) => {
  const theme = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '40px', minWidth: 0 }}>
        <Box
          sx={{
            borderRadius: '50%',
            border: `2px solid ${url ? theme.palette.grey[300] : theme.palette.text.primary}`,
            minWidth: '70px',
            width: '70px',
            height: '70px',
            minHeight: '70px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {url ? (
            <Box
              component="img"
              sx={{ width: '100%', objectFit: 'cover' }}
              src={url}
              onClick={() => {
                setShowImg(true)
              }}
            />
          ) : (
            <IconButton
              size="small"
              color="secondary"
              aria-label="add"
              onClick={() => {
                fileRef?.current?.click()
              }}
            >
              <AddIcon sx={{ width: '50px', height: '50px' }} />
            </IconButton>
          )}
        </Box>
        <Typography
          component="label"
          htmlFor="avatarInput"
          sx={{
            fontSize: '18px',
            fontWeight: 800,
            lineHeight: '20px',
            textAlign: 'center',
            color: theme.palette.text.primary,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {currentCharacter?.image ? 'Edit avatar' : 'Add avatar'}
        </Typography>
      </Box>
      <Box>
        {errors?.image && (
          <Typography
            sx={{
              fontSize: '0.75rem',
              fontWeight: 400,
              lineHeight: 1.66,
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#FC395C',
              mt: '3px',
            }}
          >
            {errors?.image?.message && typeof errors.image.message === 'string'
              ? errors.image.message
              : ''}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default RenderImage
