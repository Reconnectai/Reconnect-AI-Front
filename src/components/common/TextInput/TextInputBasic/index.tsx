import React, { FC } from 'react'

import {StandardTextFieldProps, styled, TextField, useTheme} from '@mui/material'

interface IProps extends StandardTextFieldProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const StyledTextField = styled(TextField)({
  '& .MuiFilledInput-root': {
    backgroundColor: 'transparent'
  },
  '& .MuiFilledInput-underline:before': {
    borderBottomColor: 'gray',
  },
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#404e93',
  },
  '& .MuiFilledInput-underline:hover:not(.Mui-disabled):before': {
    borderBottomColor: '#d0cdcd',
  },
});
const TextInput: FC<IProps> = ({ value, handleInputChange, ...rest }) => {
  const theme = useTheme()
  return (
    <StyledTextField
      value={value}
      onChange={handleInputChange}
      id="filled-basic"
      label=""
      variant="filled"
      fullWidth
      InputLabelProps={{
        shrink: false,
        sx: {
          color: theme.palette.text.disabled,
          display: value ? 'none' : 'block',
          '&.Mui-focused': {
            color: theme.palette.text.disabled,
          },
        },
      }}
      InputProps={{
        sx: {
          color: theme.palette.text.primary,
          minHeight: '50px',
          width: '100%',
          p: 0,
          '& .MuiInputBase-input': {
            padding: '0 14px',
            boxSizing: 'border-box',
          },
          '&:hover': {
            borderColor: 'white',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'white',
          },
        },
      }}
      {...rest}
    />
  )
}

export default TextInput
