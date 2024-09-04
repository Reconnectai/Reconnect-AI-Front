import React, { FC, useState } from 'react'
import Cropper from 'react-easy-crop'
import { UseFormSetValue } from 'react-hook-form'
import { cropImage, urlToBlob } from 'utils/cropAvatar'

import {Box, Slider, Typography, useTheme} from '@mui/material'
import Dialog from '@mui/material/Dialog'

import { CustomButton } from '../Button'

interface IProps {
  image: string
  openCropDialog: boolean
  setOpenCropDialog: (value: boolean) => void
  setAvatarUrl: React.Dispatch<React.SetStateAction<string | null>>
  setValue: UseFormSetValue<any>
}

const CropAvatar: FC<IProps> = ({
  image,
  openCropDialog,
  setOpenCropDialog,
  setAvatarUrl,
  setValue,
}) => {
  const theme = useTheme()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    width: number
    height: number
    x: number
    y: number
  } | null>(null)
  const onCropComplete = (e: string) => {
    urlToBlob(e).then((data) => {
      const file = new File([data], 'avatar', {
        type: 'image/png',
        lastModified: Date.now(),
      })
      setValue('image', file)
      setAvatarUrl(URL.createObjectURL(data))
      setOpenCropDialog(false)
    })
  }

  return (
    <Dialog
      open={openCropDialog}
      onClose={() => {
        setOpenCropDialog(false)
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
          width: '70vw',
          height: '60vh',
          p: ' 0 0 24px 0' ,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: theme.palette.background.paper,
          backgroundImage: 'none',
          boxShadow: '0 0 3px 1px grey',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          width: '100%' ,
          height: '80%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={15 / 16}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels)
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: {xs:'16px', sm:'20px'},
          fontWeight: 400,
          lineHeight: '20px',
          textAlign: 'center',
          color: theme.palette.text.primary,
          p: '10px',
        }}
      >
        Eyebrows and mouth must be in the centre segment to display correctly
      </Typography>
      <Slider
        min={1}
        max={3}
        step={0.05}
        value={zoom}
        onChange={(_, zoom) => setZoom(zoom as number)}
        sx={{ width: '90%' }}
      />
      <CustomButton onClick={async () => {
        await cropImage(image, croppedAreaPixels, onCropComplete)
      }}>
        Apply
      </CustomButton>
    </Dialog>
  )
}

export default CropAvatar
