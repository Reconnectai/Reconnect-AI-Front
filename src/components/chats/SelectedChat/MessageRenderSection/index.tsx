import EmptyAvatar from 'assets/testAvatar/emptyAvatar.png'
import React, { FC, useEffect, useRef, UIEvent, useState } from 'react'
import { CharacterSettings } from 'services/characters/types'
import { preloadImages } from 'utils/preloadingImages'

import { Box, useTheme } from '@mui/material'

import Message from 'components/common/BoxForMessages'
import PopoverCreateChat from 'components/common/PopoverCreateChat/PopoverCreateChat'

import RenderingMessageGeneration from './RenderingMessageGeneration'
import {IMessage} from "services/messages/types";

interface IProps {
  isLoadingCharacter: boolean
  character?: CharacterSettings
  setOpenEditCharacterDrawer: React.Dispatch<React.SetStateAction<boolean>>
  messages: IMessage[] | null
  isMessageBatchLoading: boolean
  handleScroll: (event: UIEvent<HTMLDivElement>) => void
  goToEnd: boolean
  isChat: boolean
  regenerateMessageHandler: (lastMessageId:string)=>void
}

const MessageRenderSection: FC<IProps> = ({
  isLoadingCharacter = false,
  setOpenEditCharacterDrawer,
  character,
  messages,
  isMessageBatchLoading,
  handleScroll,
  goToEnd,
  isChat,
                                            regenerateMessageHandler
}) => {
  const theme = useTheme()
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const chatBoxRef = useRef<HTMLDivElement | null>(null)
  const scrollPositionRef = useRef<number>(0)
  const [shouldRenderAvatar, setShouldRenderAvatar] = useState(false)
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ block: 'end' })
    }
  }
  useEffect(() => {
    (async () => {
      if (character?.image) {
        await preloadImages([character.image])
        setShouldRenderAvatar(true)
      }
    })()
  }, [character])

  useEffect(() => {
    if (chatBoxRef.current && scrollPositionRef.current !== 0 && !goToEnd) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight - scrollPositionRef.current
    } else if (goToEnd) {
      scrollToBottom()
    }
  }, [messages, goToEnd])

  const handleScrollWithSave = (event: UIEvent<HTMLDivElement>) => {
    if (chatBoxRef.current) {
      const { scrollTop, scrollHeight } = chatBoxRef.current
      if (scrollTop === 0 && !isMessageBatchLoading) {
        scrollPositionRef.current = scrollHeight
      }
      handleScroll(event)
    }
  }
  return (
    <Box
      ref={chatBoxRef}
      sx={{
        flex: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor:
          theme.palette.mode === 'light'
            ? 'rgba(187,199,181,0.32)'
            : theme.palette.background.default,
        gap: '20px',
        px: '20px',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0, 0, 0, 0)',
          borderRadius: '#101638',
        },
        '&:hover::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(106, 106, 106, 0.6)',
        },
      }}
      onScroll={handleScrollWithSave}
    >
      {character && !isLoadingCharacter && !isChat && !character?.error && (
        <PopoverCreateChat confirmTitle="Wait, character creation in progress..." />
      )}
      {character && !isLoadingCharacter && character?.error && (
        <PopoverCreateChat confirmTitle="Some error occured" error={true} characterId={character?.id} />
      )}
      {!isLoadingCharacter && isChat && !character?.error && (
        <Box
          sx={{
            py: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {messages &&
            messages.map((message, ind) => {
              return (
                <Box
                  key={ind}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <Message
                    setOpenEditCharacterDrawer={setOpenEditCharacterDrawer}
                    characterAvatar={character?.image || EmptyAvatar}
                    textAnswer={message?.content}
                    audioAnswer={null}
                    videoAnswer={null}
                    isSender={true}
                    createdAt={message?.createdAt}
                    messageType="text"
                    shouldRenderAvatar={true}
                    messageError={message?.error}
                    regenerateMessageHandler={regenerateMessageHandler}
                    messageId={messages.length-1===ind && message?.id || ''}
                  />
                  {message?.[message?.messageType + 'Answer' as 'videoAnswer' | 'audioAnswer' | 'textAnswer'] ? (
                    <Message
                      setOpenEditCharacterDrawer={setOpenEditCharacterDrawer}
                      characterAvatar={character?.image || EmptyAvatar}
                      textAnswer={message?.textAnswer}
                      audioAnswer={message?.audioAnswer}
                      videoAnswer={message?.videoAnswer}
                      messageType={message?.messageType}
                      isSender={false}
                      createdAt={message?.textAnsweredAt || message?.audioAnsweredAt || message?.videoAnsweredAt || ''}
                      shouldRenderAvatar={shouldRenderAvatar}
                    />
                  ) : !message?.error ? (
                    <RenderingMessageGeneration
                      message={message}
                      character={character}
                      setOpenEditCharacterDrawer={setOpenEditCharacterDrawer}
                    />
                  ) : (
                    <></>
                  )}
                </Box>
              )
            })}
        </Box>
      )}
      <Box ref={messagesEndRef} />
    </Box>
  )
}
export default MessageRenderSection
