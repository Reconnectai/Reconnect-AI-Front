import { FC } from 'react'
import { Controller } from 'react-hook-form'

import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material'
import Box from '@mui/material/Box'

interface TextInputProps extends FormControlLabelProps {
  control: any
  name: string
  size?: 'medium' | 'small'
}

const CustomCheckbox: FC<TextInputProps> = ({ control, name, label, size, ...rest }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field: { value, onChange } }) => (
          <FormControlLabel
            label={label}
            {...rest}
            control={
              <Checkbox
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
                color="primary"
                size={size}
                sx={{
                  '& .MuiSvgIcon-root': {
                    border: '1px solid white',
                    borderRadius: '4px',
                  },
                  '&.Mui-checked': {
                    color: 'white',
                  },
                }}
              />
            }
            sx={{
              '& .MuiFormControlLabel-label': {
                color: 'white',
              },
            }}
          />
        )}
      />
    </Box>
  )
}

export default CustomCheckbox
