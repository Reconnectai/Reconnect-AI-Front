import { FC, ReactNode } from 'react'

import { Button as MuiButton, ButtonProps } from '@mui/material'

interface Props extends ButtonProps {
  children?: string | ReactNode
  type?: 'submit' | 'button' | 'reset'
  variant?: 'contained' | 'outlined' | 'text'
  disabled?: boolean
  loading?: boolean
}

export const CustomButton: FC<Props> = ({
  type = 'button',
  children,
  variant = 'contained',
  disabled,
  size = 'medium',
  ...rest
}) => {
  return (
    <MuiButton
      disabled={disabled}
      type={type}
      variant={variant}
      size={size}
      disableRipple={variant === 'text'}
      {...rest}
      sx={{
        // backgroundColor: '#4659b0',
        textTransform: 'none',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        gap: '13.6px',
        '&.Mui-disabled': {
          backgroundColor: '#a1a1a1',
        },
        ...rest['sx'],
      }}
    >
      {children}
    </MuiButton>
  )
}
