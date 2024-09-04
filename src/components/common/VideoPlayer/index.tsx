import React, { useEffect, useRef, useState } from 'react'

import { Box, Skeleton, Typography, useTheme } from '@mui/material'

interface IProps {
  message: string
}

const VideoPlayer: React.FC<IProps> = ({ message }) => {
  const [shouldRender, setShouldRender] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [remainingTime, setRemainingTime] = useState<string>('0:00')
  const theme = useTheme()
  const handleVideoClick = async () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        await videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }
  const formatTime = (seconds: number) => {
    const minutes = isNaN(Math.floor(seconds / 60)) ? 0 : Math.floor(seconds / 60)
    const secs = isNaN(Math.floor(seconds % 60)) ? 0 : Math.floor(seconds % 60)
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
  }
  const updateProgress = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration
      const currentTime = videoRef.current.currentTime
      setRemainingTime(formatTime(duration - currentTime))
    }
  }

  const handleBlur = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }
  const handleVideoEnd = () => {
  }
  useEffect(() => {
    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener('timeupdate', updateProgress)
      videoElement.addEventListener('ended', handleVideoEnd)

      const container = videoElement.parentElement
      if (container) {
        container.addEventListener('focusout', handleBlur)
      }

      return () => {
        videoElement.removeEventListener('timeupdate', updateProgress)
        if (container) {
          container.removeEventListener('focusout', handleBlur)
        }
        videoElement.removeEventListener('ended', handleVideoEnd)
      }
    }
  }, [])
  return (
    <Box>
      <Box
        tabIndex={0}
        sx={{
          outline: 'none',
          position: 'relative',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: shouldRender ? theme.palette.background.paper : 'transparent',
          cursor: 'pointer',
        }}
        onClick={handleVideoClick}
      >
        {!shouldRender && <Skeleton variant="circular" width={220} height={220} animation="wave" />}
        <video
          style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            pointerEvents: 'none',
            display: shouldRender ? 'block' : 'none',
          }}
          controls={false}
          ref={videoRef}
          onCanPlayThrough={() => {
            setShouldRender(true)
          }}
          src={message}
        />
      </Box>
      <Typography
        sx={{
          color: theme.palette.mode !== 'light' ? '#add0e0' : '#404e93',
          fontSize: '14px',
          fontWeight: 600,
          ml: '20px',
        }}
      >
        {remainingTime}
      </Typography>
    </Box>
  )
}

export default VideoPlayer
