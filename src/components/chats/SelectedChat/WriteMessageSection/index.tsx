import React, { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import CloseIcon from '@mui/icons-material/Close'
import MicIcon from '@mui/icons-material/Mic'
import SendIcon from '@mui/icons-material/Send'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import { Box, IconButton, useTheme } from '@mui/material'

import TextInput from 'components/common/TextInput/TextInputBasic'
import AudioPlayer from 'components/common/VoicePlay'

interface IProps {
  openEditeCharacterDrawer: boolean
  isReceiveAnswer: boolean
  sendMessage: (message: string, audioBlob?: Blob) => void
}

const WriteMessageSection: FC<IProps> = ({
  openEditeCharacterDrawer,
  isReceiveAnswer,
  sendMessage,
}) => {
  const [audioURL, setAudioURL] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [msg, setMsg] = useState('')
  const [rec, setRec] = useState<boolean>(false)
  const msgRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const { chatId } = useParams()
  const theme = useTheme()
  useEffect(() => {
    msgRef?.current?.focus()
  }, [chatId, !openEditeCharacterDrawer, isReceiveAnswer])
  const {
    transcript,
    resetTranscript,
    // browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMsg(event.target.value)
  }
  const handleStartRecording = async () => {
    resetTranscript()
    setAudioBlob(null)
    setAudioURL(null)
    audioChunksRef.current = []
    await SpeechRecognition.startListening({ continuous: true, language: 'en-US' })

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioBlob(audioBlob)
        setAudioURL(audioUrl)
      }

      mediaRecorder.start()
    } catch (error) {
      console.error('Error accessing media devices.', error)
    }
  }

  const handleStopRecording = async () => {
    await SpeechRecognition.stopListening()
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
    }
  }

  return (
    <Box
      sx={{
        p: '10px 10px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: '30px',
        boxSizing: 'border-box',
        borderTop: '1px solid #858282',
        width: '100%',
        backgroundColor:
          theme.palette.mode === 'light'
            ? 'rgba(187,199,181,0.32)'
            : theme.palette.background.default,
        zIndex: 1,
        boxShadow: '0px -3px 5px rgba(0, 0, 0, 0.3)',
      }}
    >
      {transcript ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <TextInput
              handleInputChange={handleInputChange}
              value={transcript}
              multiline
              minRows={1}
              maxRows={6}
              fullWidth
              disabled
              inputRef={msgRef}
              label="Write a message..."
              sx={{ width: '100%' }}
            />
            {audioURL && (
              <AudioPlayer msgBackgroundColor={theme.palette.background.paper} src={audioURL} />
            )}
          </Box>

          <IconButton
            edge="end"
            size="small"
            color="secondary"
            aria-label="SettingsIcon"
            onClick={ async () => {
             await handleStartRecording()
            }}
          >
            <CloseIcon sx={{ width: '20px', height: '20px', m: '10px' }} />
          </IconButton>
        </Box>
      ) : (
        <TextInput
          onKeyDown={(e) => {
            if (e.key === 'Enter' && msg) {
              sendMessage(msg)
              setMsg('')
            }
          }}
          handleInputChange={handleInputChange}
          value={msg}
          multiline
          minRows={1}
          maxRows={6}
          fullWidth
          inputRef={msgRef}
          disabled={!isReceiveAnswer}
          label="Write a message..."
        />
      )}

      {msg ? (
        <IconButton
          disabled={!isReceiveAnswer}
          onClick={() => {
            sendMessage(msg)
            setMsg('')
          }}
          edge="end"
          size="small"
          color="secondary"
          aria-label="SettingsIcon"
        >
          <SendIcon sx={{ width: '20px', height: '20px', m: '5px' }} />
        </IconButton>
      ) : (
        <IconButton
          edge="end"
          size="small"
          color="secondary"
          aria-label="SettingsIcon"
          disabled={!isReceiveAnswer}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !rec && transcript && audioBlob) {
              sendMessage(transcript, audioBlob)
              resetTranscript()
              setAudioURL(null)
            }
          }}
          onClick={async () => {
            if (!rec && !transcript) {
              await handleStartRecording()
              setRec((prev) => !prev)
            } else if (rec) {
              await handleStopRecording()
              setRec((prev) => !prev)
            } else if (!rec && transcript && audioBlob) {
              sendMessage(transcript, audioBlob)
              resetTranscript()
              setAudioURL(null)
            }
          }}
        >
          {!rec ? (
            !transcript ? (
              <MicIcon sx={{ width: '30px', height: '30px', m: '5px' }} />
            ) : (
              <SendIcon sx={{ width: '20px', height: '20px', m: '5px' }} />
            )
          ) : (
            <StopCircleIcon sx={{ width: '30px', height: '30px', m: '5px', color: 'red' }} />
          )}
        </IconButton>
      )}
    </Box>
  )
}

export default WriteMessageSection
