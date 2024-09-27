import React, {FC} from 'react'

import { Box, Link, Typography, useTheme } from '@mui/material'
interface IProps {
}
const NotAuth : FC<IProps> = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!window.aptos && (
        <Typography
          sx={{
            color: theme.palette.text.primary,
            fontSize: '25px',
            textAlign: 'center',
          }}
        >
          To use the App please install
          <Link underline={'hover'} target="_blank" href={'https://petra.app/'}>
            <br />
            Petra Aptos Wallet
          </Link>
        </Typography>
      )}
    </Box>
  )
}

export default NotAuth
