import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { AutocompleteOption } from 'services/characters/types'

import './style.css'

import { Autocomplete, AutocompleteProps, TextField, useTheme } from '@mui/material'

interface Props
  extends Omit<
    AutocompleteProps<any, any, any, any>,
    'options' | 'renderInput' | 'onChange' | 'value'
  > {
  control: any
  name: string
  value?: AutocompleteOption | AutocompleteOption[]
  errors?: any
  label?: string
  selectOptions?: AutocompleteOption[]
}

const ControlledSelectAutocomplete: FC<Props> = ({
  name,
  control,
  label,
  errors,
  selectOptions,
  ...rest
}) => {
  const options: AutocompleteOption[] = selectOptions || []
  const theme = useTheme()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: controlOnChange, value, ref, name } }) => {
        return (
          <Autocomplete
            {...rest}
            options={options}
            value={value || null}
            ref={ref}
            onChange={(_, newValue) => {
              if (newValue) controlOnChange(newValue)
              else
                controlOnChange({
                  value: '',
                  name: '',
                })
            }}
            getOptionLabel={(option) => option.name ?? ''}
            renderOption={(props, option) => {
              return (
                <li {...props} key={option.value} className={'listDrop'}>
                  {option.name}
                </li>
              )
            }}
            isOptionEqualToValue={(option, value) => {
              return option.value === value.value || true
            }}
            ChipProps={{
              size: 'small',
            }}
            noOptionsText={'No options'}
            sx={{
              width: '100%',
              color: theme.palette.text.secondary,
              '& .MuiAutocomplete-popupIndicator': {
                color:  theme.palette.text.primary,
              },
              '& .MuiAutocomplete-clearIndicator': {
                color:  theme.palette.text.primary,
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.text.primary,
                  // borderRadius: '16px',
                },
                '&:hover fieldset': {
                  borderColor:  theme.palette.text.primary,
                },
                '&.Mui-focused fieldset': {
                  borderColor:  theme.palette.text.primary,
                },
                '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
              },
            }}
            slotProps={{
              paper: {
                sx: {
                  mt: '5px',
                  // borderRadius: '16px',
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiAutocomplete-listbox': {
                    padding: '10px 0px',
                  },
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                name={name}
                label={label}
                error={typeof errors === 'string' ? !!errors : !!errors?.[name]?.value?.message}
                helperText={typeof errors === 'string' ? errors : errors?.[name]?.value?.message}
                // inputRef={ref}
                InputProps={{
                  ...params.InputProps,
                  sx: { borderColor: theme.palette.text.primary },
                }}
                sx={{
                  height: 'fit-content',
                  minHeight: '70px',
                  '& .MuiInputLabel-root': {
                    color: theme.palette.text.primary,
                  },
                  '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'gray',
                  },
                }}
              />
            )}
          />
        )
      }}
    />
  )
}
export default ControlledSelectAutocomplete
