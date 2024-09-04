import React, { useState, useRef, useEffect } from 'react'

import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { IconButton, Box, Typography, Slider, useTheme } from '@mui/material'

interface IProps {
  src: string
  displayProgress?: boolean
  width?: number
  msgBackgroundColor?: string
  msgColor?: string
}

const AudioPlayer: React.FC<IProps> = ({
  src,
  displayProgress = false,
  width,
  msgBackgroundColor,
  msgColor,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const theme = useTheme()

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      if (audio.duration && audio.duration !== Infinity) {
        setDuration(audio.duration)
      }
    }

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime)
    }

    const handleAudioEnd = () => {
      setIsPlaying(false)
      setCurrentTime(0)
    }

    const handleError = () => {
      setIsPlaying(false)
      console.error('Error loading audio file')
    }

    audio.addEventListener('loadedmetadata', setAudioData)
    audio.addEventListener('canplaythrough', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', handleAudioEnd)
    audio.addEventListener('error', handleError)
    setIsPlaying(false)
    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData)
      audio.removeEventListener('canplaythrough', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', handleAudioEnd)
      audio.removeEventListener('error', handleError)
    }
  }, [src])

  const togglePlayPause = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      try {
        await audio.play()
      } catch (error) {
        console.error('Error playing audio file', error)
      }
    }
    setIsPlaying(prev =>!prev)
  }

  const handleSliderChange = (_: Event, newValue: number | number[]) => {
    if (audioRef.current && !isNaN(duration)) {
      const newTime = Array.isArray(newValue) ? newValue[0] : newValue
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: msgBackgroundColor ? msgBackgroundColor : theme.palette.background.paper,
        padding: '3px',
        borderRadius: '10px',
        maxWidth: width ? `${width}px` : '100px',
        width: '100%',
      }}
    >
      <IconButton
        onClick={togglePlayPause}
        sx={{
          backgroundColor: '#6e7ec9',
          color: 'white',
          padding: '10px',
          borderRadius: '50%',
          marginRight: '10px',
          '&:hover': {
            backgroundColor: '#6e7ec9',
          },
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      {displayProgress ? (
        <Box sx={{ flexGrow: 1, marginRight: '10px' }}>
          <Slider
            value={currentTime}
            max={duration}
            onChange={handleSliderChange}
            sx={{
              color: theme.palette.primary.main,
              '& .MuiSlider-thumb': {
                backgroundColor: '#6e7ec9',
              },
              '& .MuiSlider-rail': {
                backgroundColor: '#6e7ec9',
              },
            }}
          />
        </Box>
      ) : null}
      <Typography
        sx={{
          color: msgColor ? msgColor : '#6c757d',
          fontSize: '12px',
        }}
      >
        {formatTime(currentTime)}
      </Typography>
      <audio ref={audioRef} src={src} preload="auto" />
    </Box>
  )
}

export default AudioPlayer
