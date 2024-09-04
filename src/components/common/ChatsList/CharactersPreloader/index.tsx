import React from 'react'

import { Box, Skeleton } from '@mui/material'

const CharactersPreloader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {Array.from({ length: 50 }).map((_, ind) => (
        <Box
          key={ind}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            p: '20px 10px',
            gap: '20px',
            width: '100%',
          }}
        >
          <Skeleton animation="pulse" variant="circular" width={50} height={50} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '80%',
              justifyContent: 'space-around',
            }}
          >
            <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="70%" style={{ marginBottom: 6 }} />
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default CharactersPreloader
