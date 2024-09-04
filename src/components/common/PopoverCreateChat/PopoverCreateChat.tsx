import React, { FC } from 'react'

import CachedIcon from '@mui/icons-material/Cached'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Typography, CircularProgress, useTheme } from '@mui/material'

import { useRegenerateCharacterMutation } from '../../../services/characters/api'
import { CustomButton } from '../Button'
import {AppDispatch} from "../../../store";
import {useDispatch} from "react-redux";
import {setCharacterListQuery} from "../../../store/reducers/characterListReducer";

interface IProps {
  confirmTitle: string
  error?: boolean
  characterId?: number
}

const PopoverCreateChat: FC<IProps> = ({ confirmTitle, error, characterId }) => {
  const [regenerateCharacter] =
    useRegenerateCharacterMutation()
  const theme = useTheme()
  const dispatch: AppDispatch = useDispatch()

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: '324px', sm: '412px' },
          p: { xs: '12px', sm: '24px' },
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
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
              fontSize: { xs: '16px', sm: '20px' },
              fontWeight: 700,
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
          {error ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              <ErrorOutlineIcon sx={{ alignSelf: 'center', color: 'orange', fontSize: '50px' }} />
              <CustomButton
                sx={{
                  fontSize: '18px',
                }}
                onClick={() => {
                  if (characterId) {
                    dispatch(setCharacterListQuery(false))
                    regenerateCharacter({ characterId })
                  }
                }}
              >
                Regenerate
                <CachedIcon
                  sx={{ alignSelf: 'center', color: 'white', fontSize: '30px' }}
                />
              </CustomButton>
            </Box>
          ) : (
            <CircularProgress sx={{ alignSelf: 'center', color: 'green' }} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default PopoverCreateChat
