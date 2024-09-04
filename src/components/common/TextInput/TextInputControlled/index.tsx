import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from 'react'
import { Controller } from 'react-hook-form'

import { useTheme } from '@mui/material'
import TextField, { StandardTextFieldProps } from '@mui/material/TextField'

interface TextInputProps extends StandardTextFieldProps {
  control: any
  name: string
  label: string
  errors?: any
  autoFocus?: boolean
  onBlurHandler?: () => void
  onChangeHandler?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  disabled?: boolean
  size?: 'medium' | 'small'
  type?: HTMLInputTypeAttribute
}

const TextInputControlled: FC<TextInputProps> = ({
  control,
  errors,
  name,
  label,
  autoFocus,
  onBlurHandler,
  disabled,
  size = 'medium',
  type,
  sx,
  onChangeHandler,
  ...rest
}) => {
  const theme = useTheme()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, name, ref, onBlur } }) => (
        <TextField
          onChange={onChangeHandler ?? onChange}
          value={value ?? ''}
          name={name}
          inputRef={ref}
          label={label}
          onBlur={onBlurHandler ?? onBlur}
          autoFocus={autoFocus}
          error={typeof errors === 'string' ? !!errors : !!errors?.[name]}
          helperText={typeof errors === 'string' ? errors : errors?.[name]?.message}
          size={size}
          disabled={disabled}
          type={type}
          fullWidth
          {...rest}
          sx={{
            ...sx,
          }}
          InputLabelProps={{
            sx: {
              color: theme.palette.text.primary,
              '& .Mui-focused': {
                color: theme.palette.text.primary,
                borderColor: theme.palette.text.primary,
              },
            },
          }}
          InputProps={{
            sx: {
              background: theme.palette.background.default,
              color: theme.palette.text.primary,
              // borderRadius: '16px',
              minHeight: '50px',
              maxWidth: '100%',
              '&:hover': {
                borderColor: theme.palette.text.primary,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.text.primary,
              },
            },
          }}
        />
      )}
    />
  )
}

export default TextInputControlled
