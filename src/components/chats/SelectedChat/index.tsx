import { enqueueSnackbar } from 'notistack'
import React, { FC, UIEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useGetCharacterQuery, useGetCharactersQuery } from 'services/characters/api'
import { MessageType } from 'services/characters/types'
import {
  useGetHistoryQuery,
  useCreateNewMessageMutation,
  useRegenerateMessageMutation,
} from 'services/messages/api'
import { IMessage } from 'services/messages/types'
import { createSocketChatConnection, createSocketMessageConnection } from 'services/socket/socket'
import { IException, ISocketMessage } from 'services/socket/types'
import { Socket } from 'socket.io-client'
import { AppDispatch } from 'store'
import { setCharacterListQuery } from 'store/reducers/characterListReducer'

import { Box } from '@mui/material'

import EditCharacterDrawer from 'components/common/EditCharacterDrawer'

import NoSelectedChat from '../NoSelectedChat'
import MessageRenderSection from './MessageRenderSection'
import SelectedChatAppBar from './SelectedChatAppBar'
import ModelTypePopup from './SelectedChatAppBar/ModelTypePopup'
import WriteMessageSection from './WriteMessageSection'

interface IProps {
  chatId: string
}

const SelectedChat: FC<IProps> = ({ chatId }) => {
  const [toDatetime, setToDatetime] = useState<string>('')
  const dispatch: AppDispatch = useDispatch()
  const { data: character, isFetching: isLoadingCharacter } = useGetCharacterQuery({
    characterId: chatId || '',
  })
  const { refetch } = useGetCharactersQuery({
    page: 0,
    pageSize: 20,
    query: '',
  })
  const [regenerate] = useRegenerateMessageMutation()
  const [createNewMessage] = useCreateNewMessageMutation()
  const { data: history, isLoading } = useGetHistoryQuery(
    {
      page: 0,
      pageSize: 20,
      chatId,
      toDatetime: toDatetime,
    },
    { refetchOnMountOrArgChange: true }
  )
  const [openEditeCharacterDrawer, setOpenEditCharacterDrawer] = useState<boolean>(false)
  const [chatType, setChatType] = useState<'TEXT' | 'VOICE' | 'VIDEO'>('TEXT')
  const [isReceiveAnswer, setIsReceiveAnswer] = useState<boolean>(false)
  const [isMessageBatchLoading, setIsMessageBatchLoading] = useState<boolean>(false)
  const [messages, setMessages] = useState<IMessage[]>([])
  const [isChat, setIsChat] = useState<boolean>(false)
  const [isFirstMessage, setIsFirstMessage] = useState<boolean>(true)
  const [goToEnd, setGoToEnd] = useState<boolean>(true)
  const [socketMessage, setSocketMessage] = useState<Socket | null>(null)
  const [socketChat, setSocketChat] = useState<Socket | null>(null)
  useEffect(() => {
    async function setupSockets() {
      if (!isLoadingCharacter) {
        const msgSocket = await createSocketMessageConnection(chatId || '')
        setSocketMessage(msgSocket)
        if (
          character?.textDeployedAt &&
          (character?.speechChatType === null || character?.audioDeployedAt)
        ) {
          setIsChat(true)
        } else {
          const chatSocket = await createSocketChatConnection(chatId || '')
          setSocketChat(chatSocket)
        }
      }
    }

    setupSockets()
  }, [chatId, character, isLoadingCharacter])
  useEffect(() => {
    if (history && !isLoading && Array.isArray(history.content)) {
      let messages = [...history.content]
      let lastMessage: IMessage | undefined = messages[0]
      if (messages) {
        !toDatetime
          ? setMessages(messages.reverse())
          : setMessages((prev) => [...messages.reverse(), ...prev])
        setIsMessageBatchLoading(false)
        // if (lastMessage?.error) {
        //   !historyTotalPages && regenerateMessageHandler(lastMessage?.id)
        // }
        // else
        if (
          lastMessage?.[
            (lastMessage?.messageType + 'Answer') as 'videoAnswer' | 'audioAnswer' | 'textAnswer'
          ] === null
        ) {
          socketMessage?.emit('answer', { id: lastMessage?.id })
        } else {
          setIsReceiveAnswer(true)
        }
      }
    } else if (!isLoading && typeof history?.content === 'string' && !history) {
      enqueueSnackbar('Something went wrong. Try again later', {
        variant: 'error',
        autoHideDuration: 3000,
      })
    }
  }, [history, isLoading, socketMessage])

  useEffect(() => {
    if (socketMessage) {
      socketMessage.on('answer', (data) => {
        let answer: ISocketMessage = JSON.parse(data)
        let exception: IException = JSON.parse(data)?.exception
        if (answer?.id) {
          setIsReceiveAnswer(true)
          setMessages((prevState) => {
            return [
              ...prevState.slice(0, prevState.length - 1),
              {
                audioAnswer: answer?.audio_answer,
                audioAnsweredAt: answer?.audio_answered_at,
                content: answer?.content,
                voiceContent: answer?.voice_content,
                createdAt: answer?.created_at,
                error: answer?.error,
                id: answer?.id,
                messageType: answer?.message_type,
                textAnswer: answer?.text_answer,
                textAnsweredAt: answer?.text_answered_at,
                videoAnswer: answer?.video_answer,
                videoAnsweredAt: answer?.video_answered_at,
              },
            ]
          })
        } else {
          console.log(exception)
          enqueueSnackbar('Something went wrong. Try again later', {
            variant: 'error',
            autoHideDuration: 3000,
          })
          setIsReceiveAnswer(true)
        }
      })
      return () => {
        socketMessage.off()
        socketMessage.disconnect()
      }
    }
  }, [socketMessage])

  useEffect(() => {
    if (socketChat) {
      socketChat.on('chat', (data) => {
        if (JSON.parse(data)?.id) {
          setIsChat(true)
        }
      })
      socketChat.emit('chat', {})
      return () => {
        socketChat.off()
        socketChat.disconnect()
      }
    }
  }, [socketChat])

  const regenerateMessageHandler = (lastMessageId: string) => {
    regenerate({
      messageId: lastMessageId,
    })
      .unwrap()
      .then((data) => {
        setMessages((prevState) => {
          socketMessage?.emit('answer', { id: lastMessageId })
          return [...prevState.slice(0, prevState.length - 1), data]
        })
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong. Try again later', {
          variant: 'error',
          autoHideDuration: 3000,
        })
        console.log('Error. Try again later')
        setIsReceiveAnswer(true)
      })
  }

  const createNewMessageHandler = ({
    characterId,
    content,
    message_type,
    voice_message,
  }: {
    characterId: string
    content: string
    message_type: 'TEXT' | 'VOICE' | 'VIDEO'
    voice_message?: Blob
  }) => {
    const formData = new FormData()
    formData.append('character_id ', characterId)
    formData.append('content ', content)
    formData.append('message_type ', MessageType[message_type])
    if (voice_message) {
      const file = new File([voice_message], 'voice_question', {
        type: 'audio/wav',
        lastModified: Date.now(),
      })
      formData.append('voice_message', file)
    }
    createNewMessage({
      formData,
    })
      .unwrap()
      .then((data) => {
        setMessages((prevState) => {
          return [...prevState.slice(0, prevState.length), data]
        })
        if (isFirstMessage && data.id) {
          dispatch(setCharacterListQuery(false))
          refetch()
          setIsFirstMessage(false)
        }
        socketMessage?.emit('answer', { id: data.id })
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong. Try again later', {
          variant: 'error',
          autoHideDuration: 3000,
        })
        console.log('Error. Try again later')
        setIsReceiveAnswer(true)
      })
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    if (event.currentTarget.scrollTop === 0 && messages.length) {
      setGoToEnd(false)
      setIsMessageBatchLoading(true)
      setToDatetime(messages[0]?.createdAt)
    }
  }
  const sendMessage = (message: string, audioBlob?: Blob) => {
    setGoToEnd(true)
    setIsReceiveAnswer(false)
    createNewMessageHandler({
      characterId: chatId,
      content: message,
      message_type: chatType,
      voice_message: audioBlob,
    })
  }
  if (!character && !isLoadingCharacter) {
    return <NoSelectedChat />
  }
  return (
    <Box sx={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <SelectedChatAppBar
        isLoadingCharacter={isLoadingCharacter}
        character={character}
        setOpenEditCharacterDrawer={setOpenEditCharacterDrawer}
      >
        <ModelTypePopup character={character} chatType={chatType} setChatType={setChatType} />
      </SelectedChatAppBar>
      <MessageRenderSection
        goToEnd={goToEnd}
        setOpenEditCharacterDrawer={setOpenEditCharacterDrawer}
        character={character}
        isLoadingCharacter={isLoadingCharacter}
        isMessageBatchLoading={isMessageBatchLoading}
        messages={messages}
        handleScroll={handleScroll}
        isChat={isChat}
        regenerateMessageHandler={regenerateMessageHandler}
        socketChat={socketChat}
      />
      <WriteMessageSection
        sendMessage={sendMessage}
        isReceiveAnswer={isReceiveAnswer && isChat && !character?.error}
        openEditeCharacterDrawer={openEditeCharacterDrawer}
      />
      <EditCharacterDrawer
        currentCharacter={character}
        openEditCharacterDrawer={openEditeCharacterDrawer}
        setOpenEditCharacterDrawer={setOpenEditCharacterDrawer}
        setGoToEnd={setGoToEnd}
      />
    </Box>
  )
}

export default SelectedChat
