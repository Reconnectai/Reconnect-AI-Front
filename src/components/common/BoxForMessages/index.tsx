import JW from 'assets/testAvatar/JohnnieWilliams.jpg'
import React from 'react'
import { localDateTime } from 'utils/formatDate'

import CachedIcon from '@mui/icons-material/Cached'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Skeleton, Tooltip, Typography, useTheme } from '@mui/material'

import VideoPlayer from '../VideoPlayer'
import AudioPlayer from '../VoicePlay'

interface IProps {
  textAnswer: string | null
  audioAnswer: string | null
  videoAnswer: string | null
  messageType: string
  isSender: boolean
  characterAvatar?: string
  setOpenEditCharacterDrawer: React.Dispatch<React.SetStateAction<boolean>>
  createdAt: string
  shouldRenderAvatar: boolean
  messageError?: string | null
  messageId?: string
  regenerateMessageHandler?: (lastMessageId: string) => void
}

const Message: React.FC<IProps> = ({
  textAnswer,
  audioAnswer,
  videoAnswer,
  messageType,
  isSender,
  characterAvatar,
  setOpenEditCharacterDrawer,
  createdAt,
  shouldRenderAvatar,
  messageError,
  messageId,
  regenerateMessageHandler,
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isSender ? 'flex-end' : 'flex-start',
      }}
    >
      {!isSender &&
        (shouldRenderAvatar ? (
          <Box
            sx={{
              mr: '15px',
              alignSelf: 'end',
              cursor: 'pointer',
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            component="img"
            src={characterAvatar}
            alt="avatar"
            width={35}
            height={35}
            onClick={() => setOpenEditCharacterDrawer(true)}
          />
        ) : (
          <Skeleton
            animation="pulse"
            variant="circular"
            width={35}
            height={35}
            sx={{
              mr: '15px',
              alignSelf: 'end',
              cursor: 'pointer',
              borderRadius: '50%',
            }}
            onClick={() => setOpenEditCharacterDrawer(true)}
          />
        ))}
      {messageType === 'video' && videoAnswer ? (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <VideoPlayer message={videoAnswer} />
          <Typography
            sx={{
              color: theme.palette.grey[500],
              fontSize: '12px',
              fontWeight: 500,
              alignSelf: 'end',
            }}
          >
            {localDateTime(createdAt)}
          </Typography>
          {messageError && (
            <Tooltip
              title="Error occurred, the message was not sent"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: theme.palette.background.default,
                    fontSize: '14px',
                  },
                },
              }}
            >
              <ErrorOutlineIcon sx={{ color: theme.palette.warning.main, cursor: 'pointer' }} />
            </Tooltip>
          )}
        </Box>
      ) : (
        <Box
          sx={{
            position: 'relative',
            maxWidth: messageType === 'text' ? '500px' : '250px',
            width: messageType === 'text' ? 'fit-content' : '100%',
            padding: '5px 15px',
            borderRadius: '15px',
            ml: isSender ? '50px' : '0px',
            mr: isSender ? '0px' : '50px',
            backgroundColor: isSender ? '#add0e0' : '#404e93',
            color: isSender ? '#000' : '#fff',
            boxShadow: `0 2px 3px rgba(0, 0, 0, 0.3)`,

            '&::after': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: isSender ? '10px 0 10px 15px' : '10px 15px 10px 0',
              borderColor: isSender
                ? 'transparent transparent transparent #add0e0'
                : 'transparent #404e93 transparent transparent',
              right: isSender ? '-7px' : 'auto',
              left: isSender ? 'auto' : '-7px',
              bottom: '5px',
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {messageType === 'audio' && audioAnswer && (
              <Box
                sx={{
                  maxWidth: '250px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: isSender ? 'flex-end' : 'flex-start',
                }}
              >
                <AudioPlayer
                  src={audioAnswer}
                  width={250}
                  displayProgress={true}
                  msgBackgroundColor={isSender ? '#add0e0' : '#404e93'}
                  msgColor={isSender ? '#404e93' : '#d1f4ff'}
                />
              </Box>
            )}
            {messageType === 'text' && textAnswer && (
              <Typography
                sx={{
                  color: isSender ? '#000000' : '#ffffff',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {textAnswer}
              </Typography>
            )}
            <Typography
              sx={{
                color: theme.palette.grey[500],
                fontSize: '12px',
                fontWeight: 500,
                alignSelf: 'end',
              }}
            >
              {localDateTime(createdAt)}
            </Typography>
            {messageError && (
              <Box sx={{ display: 'flex', gap: '10px' }}>
                <Tooltip
                  title="Error occurred, the message was not sent"
                  componentsProps={{
                    tooltip: {
                      sx: {
                        bgcolor: theme.palette.background.default,
                        fontSize: '14px',
                      },
                    },
                  }}
                >
                  <ErrorOutlineIcon sx={{ color: theme.palette.warning.main, cursor: 'pointer' }} />
                </Tooltip>
                {messageId && (
                  <Tooltip
                    title="Press to regenerate message"
                    componentsProps={{
                      tooltip: {
                        sx: {
                          bgcolor: theme.palette.background.default,
                          fontSize: '14px',
                        },
                      },
                    }}
                  >
                    <CachedIcon
                      onClick={() => {
                        regenerateMessageHandler && regenerateMessageHandler(messageId)
                      }}
                      sx={{ alignSelf: 'center', color: 'green', cursor: 'pointer' }}
                    />
                  </Tooltip>
                )}
              </Box>
            )}
          </Box>
        </Box>
      )}
      {isSender && (
        <Box
          sx={{ ml: '15px', alignSelf: 'end', borderRadius: '50%' }}
          component="img"
          src={JW}
          alt="avatar"
          width={35}
          height={35}
        />
      )}
    </Box>
  )
}

export default Message
